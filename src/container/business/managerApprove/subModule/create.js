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
import {
  createSgSubmoduleCommonConfigApprove,
  querySgModuleCommonConfigApproveList
} from "../request/service";
import "./../../../common/style/index.less";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class SubModuleManagerApproveCreate extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor() {
    super();
    this.state = {
      moduleList: []
    };
  }
  componentDidMount() {
    this.fetchModule();
  }
  // 查询模块
  fetchModule = () => {
    let data = {
      sgModuleCommonConfigApproveVo: {}
    };
    querySgModuleCommonConfigApproveList(data).then(res => {
      this.setState({
        moduleList: res.reply.result.configList
      });
    });
  };
  //返回
  toIndex = () => {
    let path = {
			pathname: '/managerApprove/subModule/index'
		};
		goToAndClose(path, "服务单元查询");
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
              onlineStatus: "0",
              status: values.status ? values.status : "Y",
              updUserName: JSON.parse(sessionStorage.getItem("$pandora_auth.user_info")).userId,
              publishDate: values.publishDate.format("YYYY-MM-DD"),
              approveCode: this.props.approveCode
            }
          ]
        };
        createSgSubmoduleCommonConfigApprove(data).then(res => {
          //返回信息
          this.setState({
            loading: false
          });
          if (res.reply.returnCode.type === "S") {
            if(this.props.returnProfile){
              this.props.returnProfile(values.subModuleCode);
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
    const { moduleList } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="创建服务单元" key="1">
              <Form>
                <Row style={{ marginTop: 10 }}>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="模块编码">
                      {getFieldDecorator("moduleCode", {
                        rules: [{ required: true, message: "请选择模块编码" }]
                      })(
                        <Select onChange={this.moduleChange} showSearch>
                          {moduleList.map(item => (
                            <Select.Option
                              key={item.moduleCode}
                              value={item.moduleCode}
                            >{`${item.moduleName}(${
                              item.moduleCode
                            })`}</Select.Option>
                          ))}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="服务单元编码">
                      {getFieldDecorator("subModuleCode", {
                        rules: [
                          { required: true, message: "请输入服务单元编码" }
                        ]
                      })(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="服务单元名称">
                      {getFieldDecorator("subModuleName", {
                        rules: [
                          { required: true, message: "请输入服务单元名称" }
                        ]
                      })(<Input />)}
                    </FormItem>
                  </Col>
                  {this.props.returnProfile?null:<Col span={12}>
                    <FormItem {...formItemLayout} label="服务单元状态">
                      {getFieldDecorator("status", {
                        rules: [
                          { required: true, message: "请选择服务单元状态" }
                        ]
                      })(
                        <Select>
                          <Select.Option value="0">生效</Select.Option>
                          <Select.Option value="1">失效</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>}
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
                  className="subBtn"
                  className="operatorBtn"
                  style={buttonStyle}
                  onClick={this.handleSubmit}
                  type="primary"
                >
                  提交
                </Button>
                {this.props.returnProfile?null:<Button
                  onClick={this.toIndex}
                  className="cancelBtn"
                  style={buttonStyle}
                >
                  取消
                </Button>}
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default Form.create()(SubModuleManagerApproveCreate);
