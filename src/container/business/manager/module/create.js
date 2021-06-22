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
  DatePicker
} from "antd";
import { createSgModuleCommonConfig } from "../request/service";
import "./../../../common/style/index.less";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class ModuleManagerCreate extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor() {
    super();
    this.state = {};
  }
  //返回
  toIndex = () => {
    let path = {
			pathname: '/manager/module/index'
		};
		goToAndClose(path, "模块查询");
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });
        let data = {
          list: [
            {
              ...values,
              updUserName: JSON.parse(sessionStorage.getItem("$pandora_auth.user_info")).userId,
            }
          ]
        };
        createSgModuleCommonConfig(data).then(res => {
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

    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="创建模块" key="1">
              <Form>
                <Row style={{ marginTop: 10 }}>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="模块编码">
                      {getFieldDecorator("moduleCode", {
                        rules: [{ required: true, message: "请输入模块编码" }]
                      })(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="模块名称">
                      {getFieldDecorator("moduleName", {
                        rules: [{ required: true, message: "请输入模块名称" }]
                      })(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="模块状态">
                      {getFieldDecorator("moduleStatus", {
                        rules: [{ required: true, message: "请选择模块状态" }]
                      })(
                        <Select>
                          <Select.Option value="0">生效</Select.Option>
                          <Select.Option value="1">失效</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="负责人">
                      {getFieldDecorator("leader", {
                        // rules: [{ required: true, message: "请输入负责人" }]
                      })(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="员工编号">
                      {getFieldDecorator("leaderNo", {
                        // rules: [{ required: true, message: "请输入负责人" }]
                      })(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="联系方式">
                      {getFieldDecorator("mobile", {
                        // rules: [{ required: true, message: "请输入联系方式" }]
                      })(<Input />)}
                    </FormItem>
                  </Col>

                  <Col span={12}>
                    <FormItem {...formItemLayout} label="功能描述">
                      {getFieldDecorator("functionDescription", {
                        initialValue: ""
                        // rules: [{ required: true, message: "请输入描述" }]
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
export default Form.create()(ModuleManagerCreate);
