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
import SelectSubModule from "../../../../component/selectSubModule/selectCommonSubModule";
import { createEdaConsumer } from "../request/service";
import "./../../../common/style/index.less";
import moment from "moment";
import { goTo, goToAndClose } from "../../../../util/tabRouter";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class ConsumerCreate extends React.Component {
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
      pathname: "/eventDriven/consumer/index"
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
              consumerId: `${submoduleId}${values.consumerId}`,
              createUserId: JSON.parse(
                sessionStorage.getItem("$pandora_auth.user_info")
              ).userId
            }
          ]
        };
        createEdaConsumer(data).then(res => {
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
export default Form.create()(ConsumerCreate);
