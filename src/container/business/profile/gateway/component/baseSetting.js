import { Input, Button, Form, Modal, Select, Row, Col, message } from "antd";
import React, { Component } from "react";
import Drawer from "../../../../../component/drawer/drawer";
import {
  querySgModuleBusinessConfigApproveList,
  querySgSubmoduleBusinessConfigApproveList,
  createSgModuleBusinessConfigApprove,
  createSgSubmoduleBusinessConfigApprove
} from "../../../approveConfig/request/service";
import {
  querySgModuleCommonConfigApproveList,
  querySgSubmoduleCommonConfigApproveList
} from "../../../managerApprove/request/service";
import "../../../style/index.less";
import ModuleCreate from "../../../approveConfig/module/create";
import SubModuleCreate from "../../../approveConfig/subModule/create";

const FormItem = Form.Item;
const Option = Select.Option;

class BaseSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleList: [],
      subModuleList: [],
      subModuleDisabled: true,
      moduleCode: "",
      subModuleCode: "",
      moduleDrawerVisible: false,
      subModuleDrawerVisible: false
    };
  }

  async componentDidMount() {
    this.queryModuleList();
  }
  // 查询非业务审核模块
  queryModuleList = () => {
    let data = {
      sgModuleCommonConfigApproveVo: {
        page: {
          doPagination: false
        }
      }
    };
    querySgModuleCommonConfigApproveList(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        this.setState({
          moduleList: res.reply.result.configList
        });
      }
    });
  };
  // 查询非业务审核服务单元
  querySubModuleList = moduleCode => {
    let data = {
      sgSubmoduleCommonConfigApproveVo: {
        moduleCode,
        page: {
          doPagination: false
        }
      }
    };
    querySgSubmoduleCommonConfigApproveList(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        this.setState({
          subModuleList: res.reply.result.list,
          subModuleDisabled: false
        });
      }
    });
  };
  // 查询业务审核模块
  queryBusinessModuleList = moduleCode => {
    let data = {
      sgModuleBusinessConfigApproveVo: {
        moduleCode
      }
    };
    querySgModuleBusinessConfigApproveList(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        let businessModule = res.reply.result.resultList[0];
        if (businessModule) {
          this.props.form.resetFields(["subModuleCode"]);
          this.querySubModuleList(moduleCode);
        } else {
          let _this = this;
          Modal.confirm({
            title: "提示",
            content: "该模块服务治理初次接入,请创建模块相关配置!",
            onOk: () => {
              _this.setState({ moduleDrawerVisible: true });
            },
            onCancel: () => {
              _this.props.form.resetFields(["moduleCode"]);
              _this.setState({
                subModuleDisabled: true
              })
            }
          });
        }
      }
    });
  };
  // 查询业务审核服务单元
  queryBusinessSubModuleList = subModuleCode => {
    let data = {
      sgSubmoduleBusinessConfigApproveVo: {
        subModuleCode
      }
    };
    querySgSubmoduleBusinessConfigApproveList(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        let businessSubModule = res.reply.result.list[0];
        if (businessSubModule) {
          this.props.subModuleChange(businessSubModule);
        } else {
          let _this = this;
          Modal.confirm({
            title: "提示",
            content: "该模块服务治理初次接入,请创建服务单元相关配置!",
            onOk: () => {
              _this.setState({ subModuleDrawerVisible: true });
            },
            onCancel: () => {
              _this.props.form.resetFields(["subModuleCode"]);
            }
          });
        }
      }
    });
  };
  // 模块改变
  moduleChange = moduleCode => {
    this.setState({
      subModuleDisabled: true,
      moduleCode
    })
    this.queryBusinessModuleList(moduleCode);
    this.props.getModuleCode(moduleCode)
  };
  // 服务单元改变
  subModuleChange = subModuleCode => {
    this.setState({
      subModuleCode
    })
    this.queryBusinessSubModuleList(subModuleCode);
  };

  // 创建模块
  returnModule = async val => {
    await this.queryModuleList();
    this.props.form.setFieldsValue({ moduleCode: val });
    this.props.form.resetFields(["subModuleCode"]);
    this.querySubModuleList(val);
    this.setState({
      moduleCode: val,
      moduleDrawerVisible: false
    });
  };

  // 创建服务单元
  returnSubModule = async val => {
    await this.querySubModuleList(this.state.moduleCode);
    this.props.form.setFieldsValue({ subModuleCode: val.subModuleCode });
    this.setState({
      subModuleDrawerVisible: false
    });
    this.props.subModuleChange(val);
  };

  render() {
    const {
      moduleList,
      subModuleDisabled,
      subModuleList,
      moduleDrawerVisible,
      subModuleDrawerVisible,
      moduleCode,
      subModuleCode
    } = this.state;
    const { form, approveCode } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const drawerWidth = document.body.clientWidth - 224;
    return (
      <div style={{marginTop: 10}}>
        <Drawer
          onClose={() => {
            this.props.form.resetFields(["moduleCode"])
            this.setState({ moduleDrawerVisible: false, subModuleDisabled: true });
          }}
          width={drawerWidth}
          visible={moduleDrawerVisible}
        >
          {moduleDrawerVisible ? (
            <ModuleCreate
              returnProfile={this.returnModule}
              moduleCode={moduleCode}
              approveCode={approveCode}
            />
          ) : null}
        </Drawer>
        <Drawer
          onClose={() => {
            this.props.form.resetFields(["subModuleCode"])
            this.setState({ subModuleDrawerVisible: false });
          }}
          width={drawerWidth}
          visible={subModuleDrawerVisible}
        >
          {subModuleDrawerVisible ? (
            <SubModuleCreate
              returnProfile={this.returnSubModule}
              moduleCode={moduleCode}
              subModuleCode={subModuleCode}
              approveCode={approveCode}
            />
          ) : null}
        </Drawer>
        {/* <Form> */}
          <Row>
            <Col span={11}>
              <FormItem {...formItemLayout} label="模块编码">
                {getFieldDecorator("moduleCode", {
                  rules: [{ required: true }]
                })(
                  <Select onChange={this.moduleChange} showSearch style={{width: "100%"}}>
                    {moduleList.map(item => (
                      <Select.Option
                        key={item.moduleId}
                        value={item.moduleCode}
                      >{`${item.moduleName}(${
                        item.moduleCode
                      })`}</Select.Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={1}>
              <Button
                size="small"
                icon="plus"
                shape="circle"
                className="plusBtn"
                onClick={() => {
                  this.setState({ moduleDrawerVisible: true, moduleCode: "" });
                }}
              />
            </Col>
            <Col span={11}>
              <FormItem {...formItemLayout} label="服务单元">
                {getFieldDecorator("subModuleCode", {
                  rules: [{ required: true }]
                })(
                  <Select
                    onChange={this.subModuleChange}
                    disabled={subModuleDisabled}
                    showSearch
                    style={{width: "100%"}}
                  >
                    {subModuleList.map(item => (
                      <Select.Option
                        key={item.subModuleId}
                        value={item.subModuleCode}
                      >{`${item.subModuleName}(${
                        item.subModuleCode
                      })`}</Select.Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={1}>
              <Button
                size="small"
                icon="plus"
                shape="circle"
                className="plusBtn"
                disabled={subModuleDisabled}
                onClick={() => {
                  this.setState({
                    subModuleDrawerVisible: true,
                    subModuleCode: ""
                  });
                }}
              />
            </Col>
          </Row>
        {/* </Form> */}
      </div>
    );
  }
}

export default Form.create()(BaseSetting);
