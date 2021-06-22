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
import { createEdaProducer } from "../request/service";
import "./../../../common/style/index.less";
import moment from "moment";
import { goTo, goToAndClose } from "../../../../util/tabRouter";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class ProducerCreate extends React.Component {
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
      pathname: "/eventDriven/producer/index"
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
        const { submoduleId } = this.state;
        let data = {
          list: [
            {
              ...values,
              submoduleId,
              producerId: `${submoduleId}${values.producerId}`,
              createUserId: JSON.parse(
                sessionStorage.getItem("$pandora_auth.user_info")
              ).userId
            }
          ]
        };
        createEdaProducer(data).then(res => {
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
            <TabPane tab="创建生产者" key="1">
              <SelectSubModule callbackParent={this.onChildQuery} />
              <Form>
                <Row style={{ marginTop: 10 }}>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="生产者ID">
                      {getFieldDecorator("producerId", {
                        initialValue: "Producer",
                        rules: [{ required: true, message: "请输入生产者ID" }]
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
export default Form.create()(ProducerCreate);
