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
  queryEdaTopicConsumerApproveList,
  editEdaTopicConsumerApprove
} from "../request/service";
import "./../../../common/style/index.less";
import moment from "moment";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class ConsumerApproveDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor() {
    super();
    this.state = {
      consumerDetail: {}
    };
  }

  componentDidMount(){
    const { id } = this.props.location.state
    this.queryConsumerDetail(id);
  }
  //根据Id查询详情
  queryConsumerDetail = id => {
    let data = {
      edaTopicConsumerApproveVo: {
        // page: {
        //   doPagination: false
        // },
        id
      }
    };
    queryEdaTopicConsumerApproveList(data).then(res=>{
      if(res.reply.returnCode.type === "S" && res.reply.result.list.length>0){
        this.setState({
          consumerDetail: res.reply.result.list[0]
        })
      }
    })
  }
  //返回
  toIndex = () => {
    let path = {
			pathname: '/eventDrivenApprove/consumer/index'
		};
		goToAndClose(path, "消费者查询");
  };

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
    const { consumerDetail } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
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
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="上线状态">
                      {getFieldDecorator("onlineStatus", {
                        initialValue: consumerDetail.onlineStatus,
                        rules: [{ required: true, message: "请选择上线状态" }]
                      })(
                        <Select disabled>
                          <Select.Option value="0">未上线</Select.Option>
                          <Select.Option value="1">上线中</Select.Option>
                          <Select.Option value="2">已上线</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="上线日期">
                      {getFieldDecorator("publishDate", {
                        initialValue: moment(consumerDetail.publishDate),
                        rules: [{ required: true, message: "请选择上线日期" }]
                      })(<DatePicker disabled style={{ width: "100%" }} />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="修改类型">
                      {getFieldDecorator("changeType", {
                        initialValue: consumerDetail.changeType,
                        rules: [{ required: true, message: "请选择修改类型" }]
                      })(
                        <Select disabled>
                          <Select.Option value="00">增加</Select.Option>
                          <Select.Option value="01">删除</Select.Option>
                          <Select.Option value="10">修改</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="修改描述">
                      {getFieldDecorator("changeDescribe", {
                        initialValue: consumerDetail.changeDescribe,
                        rules: [{ required: true, message: "请输入修改描述	" }]
                      })(<Input.TextArea disabled />)}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
              <Row type="flex">
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
export default Form.create()(ConsumerApproveDetail);
