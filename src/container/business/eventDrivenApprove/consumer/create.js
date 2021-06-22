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
  InputNumber,
  Tooltip
} from "antd";
import SelectSubModule from "../../../../component/selectSubModule/selectSubModule";
import { createEdaTopicConsumerApprove } from "../request/service";
import "./../../../common/style/index.less";
import moment from "moment";
import { goTo, goToAndClose } from "../../../../util/tabRouter";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class ConsumerApproveCreate extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor() {
    super();
    this.state = {
      submoduleId: ""
    };
  }

  componentDidMount() {}
  //返回
  toIndex = () => {
    let path = {
      pathname: "/eventDrivenApprove/consumer/index"
    };
    goToAndClose(path, "消费者查询");
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });
        const { submoduleId } = this.state;
        let data = {
          list: [
            {
              ...values,
              submoduleId,
              onlineStatus: "0",
              consumerId: `${submoduleId}${values.consumerId}`,
              createUserName: JSON.parse(
                sessionStorage.getItem("$pandora_auth.user_info")
              ).userId,
              publishDate: values.publishDate.format("YYYY-MM-DD"),
              approveCode: this.props.approveCode
            }
          ]
        };
        createEdaTopicConsumerApprove(data).then(res => {
          //返回信息
          this.setState({
            loading: false
          });
          if (res.reply.returnCode.type === "S") {
            const resultMessage =
              res.reply.result.list.length > 0
                ? res.reply.result.list[0].result
                : "S";
            if (resultMessage !== "S") {
              Modal.error({
                title: "异常信息",
                content: resultMessage
              });
              return;
            }
            if (this.props.returnProfile) {
              this.props.returnProfile(`${submoduleId}${values.consumerId}`);
              return;
            }
            message.info("创建成功");
            this.toIndex();
          } else {
            message.info("创建失败");
          }
        });
      }
    });
  };

  onChildQuery = submoduleId => {
    this.setState({
      submoduleId
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
    const { clusterList, submoduleId } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="创建消费者" key="1">
              <SelectSubModule callbackParent={this.onChildQuery} />
              <Form>
                <Row style={{ marginTop: 10 }}>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="消费者ID">
                      {getFieldDecorator("consumerId", {
                        initialValue: "Consumer",
                        rules: [{ required: true, message: "请输入消费者ID" }]
                      })(
                        <Input
                          addonBefore={submoduleId}
                          addonAfter={
                            <Tooltip title="若无特殊需求，请勿改变该值！">
                              <Icon type="question" />
                            </Tooltip>
                          }
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="消费者类型">
                      {getFieldDecorator("consumerType", {
                        // rules: [{ required: true, message: "请输入主题名称" }]
                      })(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="消费方式">
                      {getFieldDecorator("consumeMode", {
                        // rules: [{ required: true, message: "请选择消费方式" }]
                      })(
                        <Select>
                          <Select.Option value="earliest">最早</Select.Option>
                          <Select.Option value="lastest">最新</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  {/* <Col span={12}>
                    <FormItem {...formItemLayout} label="版本">
                      {getFieldDecorator("version", {
                        rules: [{ required: true, message: "请输入版本" }]
                      })(<InputNumber min={0} style={{ width: "100%" }} />)}
                    </FormItem>
                  </Col> */}
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="状态">
                      {getFieldDecorator("status", {
                        initialValue: "Y",
                        rules: [{ required: true, message: "请选择状态" }]
                      })(
                        <Select>
                          <Select.Option value="Y">生效</Select.Option>
                          <Select.Option value="N">失效</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  {/* <Col span={12}>
                    <FormItem {...formItemLayout} label="上线状态">
                      {getFieldDecorator("onlineStatus", {
                        rules: [{ required: true, message: "请选择上线状态" }]
                      })(
                        <Select>
                          <Select.Option value="0">未上线</Select.Option>
                          <Select.Option value="1">上线中</Select.Option>
                          <Select.Option value="2">已上线</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col> */}
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="上线日期">
                      {getFieldDecorator("publishDate", {
                        rules: [{ required: true, message: "请选择上线日期" }]
                      })(<DatePicker style={{ width: "100%" }} />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="修改类型">
                      {getFieldDecorator("changeType", {
                        initialValue: "00",
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
                        initialValue: "",
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
                {this.props.returnProfile ? null : (
                  <Button
                    onClick={this.toIndex}
                    className="cancelBtn"
                    style={buttonStyle}
                  >
                    取消
                  </Button>
                )}
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default Form.create()(ConsumerApproveCreate);
