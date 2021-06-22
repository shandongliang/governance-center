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
import SelectSubModule from  "../../../../component/selectSubModule/selectSubModule";
import {
  editEdaTopicProducerApprove,
  queryEdaTopicProducerApproveList
} from "../request/service";
import "./../../../common/style/index.less";
import moment from "moment";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class ProducerApproveEdit extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor() {
    super();
    this.state = {
      producerDetail: {}
    };
  }

  componentDidMount(){
    const { id } = this.props.location.state
    this.queryProducerDetail(id);
  }
  //根据Id查询详情
  queryProducerDetail = id => {
    let data = {
      edaTopicProducerApproveVo: {
        // page: {
        //   doPagination: false
        // },
        id
      }
    };
    queryEdaTopicProducerApproveList(data).then(res=>{
      if(res.reply.returnCode.type === "S" && res.reply.result.list.length>0){
        this.setState({
          producerDetail: res.reply.result.list[0]
        })
      }
    })
  }
  //返回
  toIndex = () => {
    let path = {
			pathname: '/eventDrivenApprove/producer/index'
		};
		goToAndClose(path, "生产者查询");
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });
        const { producerDetail } = this.state;
        let data = {
          list: [
            {
              ...values,
              id: producerDetail.id,
              updateUserName: JSON.parse(
                sessionStorage.getItem("$pandora_auth.user_info")
              ).userId,
              publishDate: values.publishDate.format("YYYY-MM-DD")
            }
          ]
        };
        editEdaTopicProducerApprove(data).then(res => {
          //返回信息
          this.setState({
            loading: false
          });
          if (res.reply.returnCode.type === "S") {
            const resultMessage = res.reply.result.approveResultList.length > 0 ? res.reply.result.approveResultList[0].result : "S"
            if(resultMessage !== "S"){
              Modal.error({
                title: "异常信息",
                content: resultMessage
              });
              return;
            }
            message.info("编辑成功");
            this.toIndex();
          } else {
            message.info("编辑失败");
          }
        });
      }
    });
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
    const { producerDetail } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="修改生产者" key="1">
              <Form>
                <Row style={{ marginTop: 10 }}>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="生产者ID">
                      {getFieldDecorator("consumerId", {
                        initialValue: producerDetail.producerId,
                        rules: [{ required: true, message: "请输入生产者ID" }]
                      })(<Input disabled/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="服务单元">
                      {getFieldDecorator("submoduleId", {
                        initialValue: producerDetail.submoduleId,
                        rules: [{ required: true, message: "请输入服务单元" }]
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  {/* <Col span={12}>
                    <FormItem {...formItemLayout} label="生产者类型">
                      {getFieldDecorator("producerType", {
                        initialValue: producerDetail.producerType,
                        // rules: [{ required: true, message: "请输入主题名称" }]
                      })(<Input/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="分库分表类型">
                      {getFieldDecorator("databaseType", {
                        initialValue: producerDetail.databaseType,
                        // rules: [{ required: true, message: "请选择消费方式" }]
                      })(
                        <Select>
                          <Select.Option value="NDNT">不分库不分表</Select.Option>
                          <Select.Option value="NDYT">不分库分表</Select.Option>
                          <Select.Option value="YDNT">分库不分表</Select.Option>
                          <Select.Option value="YDYT">分库分表</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="通信密钥">
                      {getFieldDecorator("accessKey", {
                        initialValue: producerDetail.accessKey,
                        // rules: [{ required: true, message: "请输入主题名称" }]
                      })(<Input/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="密钥类型">
                      {getFieldDecorator("accessKeyType", {
                        initialValue: producerDetail.accessKeyType,
                        // rules: [{ required: true, message: "请选择消费方式" }]
                      })(<Input/>)}
                    </FormItem>
                  </Col> */}
                  {/* <Col span={12}>
                    <FormItem {...formItemLayout} label="版本">
                      {getFieldDecorator("version", {
                        initialValue: producerDetail.version,
                        rules: [{ required: true, message: "请输入版本" }]
                      })(<InputNumber min={0} style={{ width: "100%" }} />)}
                    </FormItem>
                  </Col> */}
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="状态">
                      {getFieldDecorator("status", {
                        initialValue: producerDetail.status || "Y",
                        rules: [{ required: true, message: "请选择状态" }]
                      })(
                        <Select>
                          <Select.Option value="Y">生效</Select.Option>
                          <Select.Option value="N">失效</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="上线状态">
                      {getFieldDecorator("onlineStatus", {
                        initialValue: producerDetail.onlineStatus,
                        rules: [{ required: true, message: "请选择上线状态" }]
                      })(
                        <Select>
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
                        initialValue: moment(producerDetail.publishDate),
                        rules: [{ required: true, message: "请选择上线日期" }]
                      })(<DatePicker style={{ width: "100%" }} />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="修改类型">
                      {getFieldDecorator("changeType", {
                        initialValue: producerDetail.changeType,
                        rules: [{ required: true, message: "请选择修改类型" }]
                      })(
                        <Select>
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
                        initialValue: producerDetail.changeDescribe,
                        rules: [{ required: true, message: "请输入修改描述	" }]
                      })(<Input.TextArea />)}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
              <Row type="flex">
                <Button
                  type="primary"
                  className="subBtn"
                  className="operatorBtn"
                  style={buttonStyle}
                  onClick={this.handleSubmit}
                >
                  提交
                </Button>
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
export default Form.create()(ProducerApproveEdit);
