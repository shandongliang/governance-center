import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Breadcrumb,
  Icon,
  Button,
  Select,
  message,
  Tabs,
  Modal,
  Form,
  Row,
  Col,
  Input,
  DatePicker,
  InputNumber
} from "antd";
import {
  queryEdaConsumerList
} from "../request/service";
import CheckClusterModal from '../../../../component/check-cluster-modal/index';
import { queryEdaClusterList, checkTopicExist, reCreateTopic } from '../service/service';
import "./../../../common/style/index.less";
import moment from "moment";
import { goTo, goToAndClose } from '../../../../util/tabRouter';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class ConsumerDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor() {
    super();
    this.state = {
      consumerDetail: {},
      visible: false,
      isCheckModal: true,
      env: "",
      physicClusterName: "",
      isExist: true
    };
  }

  componentDidMount(){
    const { id } = this.props.location.state
    this.queryConsumerDetail(id);
    this.queryEdaMiddlewareName();
  }
  //根据Id查询详情
  queryConsumerDetail = id => {
    let data = {
      edaConsumer: {
        // page: {
        //   doPagination: false
        // },
        id
      }
    };
    queryEdaConsumerList(data).then(res=>{
      if(res.reply.returnCode.type === "S" && res.reply.consumerList.resultList.length>0){
        this.setState({
          consumerDetail: res.reply.consumerList.resultList[0]
        })
      }
    })
  }
  //返回
  toIndex = () => {
    let path = {
			pathname: '/eventDriven/consumer/index'
		};
		goToAndClose(path, "消费者查询");
  };

  queryEdaMiddlewareName = () => {
    queryEdaClusterList().then(res => {
      let clusterList = [];
      clusterList = res.reply.queryClusterList.clusterList.map(item => {
        return item.clusterName;
      });
      this.setState({
        clusterList
      });
    });
  }
  
  // 查询主题是否在集群创建
  checkCluster = () => {
    const { consumerDetail, env, physicClusterName } = this.state;
    if(physicClusterName === ""){
      message.warning("请选择物理集群！");
      return;
    }
    let data = {
      topicName: `DEAD-${consumerDetail.consumerId}`,
      physicClusterName
    };
    checkTopicExist(data).then(res=>{
      if(res.reply.returnCode.type === "S"){
        Modal.info({
          title: "消费者",
          content: `消费者${res.reply.result?"已":"未"}在集群创建！`
        })
        this.setState({
          visible: false,
          env: "",
          physicClusterName: "",
          isExist: res.reply.result
        })
      }
    })
  }
  // 补创主题
  addTopic = () => {
    const { consumerDetail, env, physicClusterName } = this.state;
    const { consumerId } = consumerDetail;
    if(physicClusterName === ""){
      message.warning("请选择物理集群！");
      return;
    }
    let data = {
      topicName: `DEAD-${consumerId}`,
      physicClusterId: physicClusterName,
      partitionNum: "16",
      replicasNum: "3"
    };
    reCreateTopic(data).then(res=>{
      if(res.reply.result){
        this.setState({
          visible: false,
          physicClusterName: "",
          env: ""
        })
        message.success("补创成功！");
      } else {
        message.success("补创失败！");
      }
    })
  }
  
  cancleModal = () => {
    this.setState({
      visible: false,
      env: "",
      physicClusterName: ""
    });
  };
  envChange = value => {
    this.setState({
      env: value
    })
  }
  clusterChange = value => {
    this.setState({
      physicClusterName: value
    })
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const { getFieldDecorator } = this.props.form;
    const buttonStyle = {
      marginLeft: 50,
      width: 88,
      fontSize: 16,
      borderRadius: 5
    };
    const { consumerDetail, clusterList, visible, isCheckModal, isExist } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          {visible?<CheckClusterModal
            visible = {visible}
            title = {isCheckModal?"查询主题是否在集群创建":"补创主题"}
            clusterList = {clusterList}
            onCancel = {this.cancleModal}
            onOk = {isCheckModal?this.checkCluster:this.addTopic}
            envChange = {this.envChange}
            clusterChange = {this.clusterChange}
          />:null}
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="消费者详情" key="1">
              <Form>
                <Row style={{ marginTop: 10 }}>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="消费者ID">
                      {getFieldDecorator("consumerId", {
                        initialValue: consumerDetail.consumerId,
                        rules: [{ required: true, message: "请输入主题名称" }]
                      })(<Input disabled/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="服务单元">
                      {getFieldDecorator("submoduleId", {
                        initialValue: consumerDetail.submoduleId,
                        rules: [{ required: true, message: "请输入服务单元" }]
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="消费者类型">
                      {getFieldDecorator("consumerType", {
                        initialValue: consumerDetail.consumerType,
                        // rules: [{ required: true, message: "请输入主题名称" }]
                      })(<Input disabled/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="消费方式">
                      {getFieldDecorator("consumeMode", {
                        initialValue: consumerDetail.consumeMode,
                        // rules: [{ required: true, message: "请选择消费方式" }]
                      })(
                        <Select disabled>
                          <Select.Option value="earliest">最早</Select.Option>
                          <Select.Option value="lastest">最新</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="版本">
                      {getFieldDecorator("version", {
                        initialValue: consumerDetail.version,
                        rules: [{ required: true, message: "请输入版本" }]
                      })(<InputNumber disabled min={0} style={{ width: "100%" }} />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="状态">
                      {getFieldDecorator("status", {
                        initialValue: consumerDetail.status || "Y",
                        rules: [{ required: true, message: "请选择状态" }]
                      })(
                        <Select disabled>
                          <Select.Option value="Y">生效</Select.Option>
                          <Select.Option value="N">失效</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
              <Row type="flex">
                <Button type="primary" onClick={()=>{this.setState({visible: true, isCheckModal: true})}} style={buttonStyle} className="subBtn" >查询</Button>
                <Button type="primary" onClick={()=>{this.setState({visible: true, isCheckModal: false})}} style={buttonStyle} className="subBtn" disabled={isExist}>补创主题</Button>
                <Button
                  onClick={this.toIndex}
                  className="cancelBtn"
                  style={buttonStyle}
                >
                  取消
                </Button>
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default Form.create()(ConsumerDetail);
