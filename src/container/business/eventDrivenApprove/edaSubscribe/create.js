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
  createEdaTopicSubscribeRelationshipApprove,
  queryEdaTopicConsumerApproveList,
  queryEdaTopicApproveList
} from "../request/service";
import "./../../../common/style/index.less";
import moment from "moment";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class SubscribeApproveCreate extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor() {
    super();
    this.state = {
      topicList: [],
      consumerList: []
    };
  }

  componentDidMount() {
    this.queryConsumer();
    this.queryTopic();
  }

  // 查询主题
  queryTopic = () => {
    let data = {
      edaTopicApproveVo: {
        page: {
          doPagination: false
        }
      }
    };
    queryEdaTopicApproveList(data).then(res => {
      let topicList = res.reply.result.list;
      this.setState({
        topicList
      });
    });
  };

  // 查询消费者
  queryConsumer = () => {
    let data = {
      edaTopicConsumerApproveVo: {
        page: {
          doPagination: false
        }
      }
    };
    queryEdaTopicConsumerApproveList(data).then(res => {
      let consumerList = res.reply.result.list;
      this.setState({
        consumerList
      });
    });
  };
  //返回
  toIndex = () => {
    let path = {
			pathname: '/eventDrivenApprove/edaSubscribe/index'
		};
		goToAndClose(path, "订阅关系查询");
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
              onlineStatus: "0",
              createUserName: JSON.parse(
                sessionStorage.getItem("$pandora_auth.user_info")
              ).userId,
              publishDate: values.publishDate.format("YYYY-MM-DD")
            }
          ]
        };
        createEdaTopicSubscribeRelationshipApprove(data).then(res => {
          //返回信息
          this.setState({
            loading: false
          });
          if (res.reply.returnCode.type === "S") {
            const resultMessage = res.reply.result.resultList.length > 0 ? res.reply.result.resultList[0].result : "S"
            if(resultMessage !== "S"){
              Modal.error({
                title: "异常信息",
                content: resultMessage
              });
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
    const { topicList, consumerList } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="创建订阅关系" key="1">
              <Form>
                <Row style={{ marginTop: 10 }}>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="主题名称">
                      {getFieldDecorator("topicName", {
                        rules: [{ required: true, message: "请选择主题名称" }]
                      })(
                        <Select showSearch>
                          {topicList.map(item => (
                            <Select.Option key={item.id} value={item.topicName}>
                              {item.topicName}
                            </Select.Option>
                          ))}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="消费者ID">
                      {getFieldDecorator("consumerId", {
                        rules: [{ required: true, message: "请选择消费者ID" }]
                      })(
                        <Select showSearch>
                          {consumerList.map(item => (
                            <Select.Option
                              key={item.id}
                              value={item.consumerId}
                            >
                              {item.consumerId}
                            </Select.Option>
                          ))}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="是否幂等">
                      {getFieldDecorator("idempotent", {
                        rules: [{ required: true, message: "请选择是否幂等" }]
                      })(
                        <Select>
                          <Select.Option value="Y">是</Select.Option>
                          <Select.Option value="N">否</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="获取消息模式">
                      {getFieldDecorator("consumeMode", {
                        // rules: [{ required: true, message: "请选择获取消息模式" }]
                      })(
                        <Select>
                          <Select.Option value="earliest">最早</Select.Option>
                          <Select.Option value="latest">最新</Select.Option>
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
                    <FormItem {...formItemLayout} label="负责人">
                      {getFieldDecorator("principalPerson", {
                        rules: [{ required: true, message: "请输入负责人" }]
                      })(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="负责人邮箱">
                      {getFieldDecorator("principalPersonMail", {
                        rules: [{ required: true, message: "请输入负责人邮箱" }]
                      })(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="负责人电话">
                      {getFieldDecorator("principalPersonPhone", {
                        rules: [{ required: true, message: "请输入负责人电话" }]
                      })(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="运维负责人">
                      {getFieldDecorator("operateAndMaitenPerson", {
                        rules: [{ required: true, message: "请输入运维负责人" }]
                      })(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="运维负责人电话">
                      {getFieldDecorator("operateAndMaitenPersonPhone", {
                        rules: [
                          { required: true, message: "请输入运维负责人电话" }
                        ]
                      })(<Input />)}
                    </FormItem>
                  </Col>
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
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="使用场景">
                      {getFieldDecorator("usageScenarios", {
                        rules: [{ required: true, message: "请选择使用场景" }]
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
export default Form.create()(SubscribeApproveCreate);
