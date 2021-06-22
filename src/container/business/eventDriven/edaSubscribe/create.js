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
  createEdaSubscribe,
  queryEdaConsumerList,
  queryEdaTopicList
} from "../request/service";
import "./../../../common/style/index.less";
import moment from "moment";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class SubscribeCreate extends React.Component {
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
      edaTopic: {
        page: {
          doPagination: false
        }
      }
    };
    queryEdaTopicList(data).then(res => {
      let topicList = res.reply.topicList.list;
      this.setState({
        topicList
      });
    });
  };

  // 查询消费者
  queryConsumer = () => {
    let data = {
      edaConsumer: {
        page: {
          doPagination: false
        }
      }
    };
    queryEdaConsumerList(data).then(res => {
      let consumerList = res.reply.consumerList.resultList;
      this.setState({
        consumerList
      });
    });
  };
  //返回
  toIndex = () => {
    let path = {
      pathname: '/eventDriven/edaSubscribe/index'
    };
    goToAndClose(path, "服务订阅查询");
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
              createUserId: JSON.parse(
                sessionStorage.getItem("$pandora_auth.user_info")
              ).userId
            }
          ]
        };
        createEdaSubscribe(data).then(res => {
          //返回信息
          this.setState({
            loading: false
          });
          if (res.reply.returnCode.type === "S") {
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
export default Form.create()(SubscribeCreate);
