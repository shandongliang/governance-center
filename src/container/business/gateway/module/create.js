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
  Collapse,
  DatePicker
} from "antd";
import { createSgModuleBusinessConfig, queryLDCList, querySgModuleCodeAndServiceUnitCodeList } from "../request/service";
import { queryAllModuleAndSubmodule } from "../request/common";
import "./../../../common/style/index.less";
import { goTo, goToAndClose } from "../../../../util/tabRouter";
import { AccessInfoConfig, MultiActiveConfig } from "../../../../component/policy/index";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Option = Select.Option;
const Panel = Collapse.Panel;

class ModuleSgCreate extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isMultiActive: "",
      blackAccess: [],
      whiteAccess: [],
      allModuleAndSubModule: [],
      ldcList: [],
      registryGroupList: [],
      isMultiActiveConfig: true,
      isAccessActiveConfig: true
    };
  }
  async componentDidMount() {
    this.queryLDC();
    let allModuleAndSubModule = await queryAllModuleAndSubmodule();
    this.setState({
      allModuleAndSubModule
    });
  }
  queryLDC = () => {
    queryLDCList().then(res => {
      if (res.reply.returnCode.type === "S") {
        let ldcList = res.reply.result.map(item => {
          return item.ldcId;
        });
        this.setState({
          ldcList
        });
      }
    });
  };
  toIndex = () => {
    let path = {
      pathname: "/gateway/module/index"
    };
    goToAndClose(path, "模块查询");
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let accessInfoConfig = this.getAccessInfoConfig(values);
        let multiActiveConfig = this.getMultiActiveConfig(values);
        let param = {
          ...values,
          updateUserName: JSON.parse(
            sessionStorage.getItem("$pandora_auth.user_info")
          ).userId,
          accessInfoConfig,
          multiActiveConfig,
          multiActivePolicy: {
            writeLdcId: values.writeLdcId,
            specialKeySubmitList: [],
            tableLdcList: [],
            backupLdcList: [],
            status: "N"
          },
          agencyPolicy: {
            ldcComputeType: values.ldcComputeType,
            ldcComputeUrl: values.ldcComputeUrl,
            ldcComputeBean: values.ldcComputeBean,
            status: "N",
            requestLdcTokenConfigList: []
          },
          loadBalancePolicy: {
            loadBalanceStrategy: values.loadBalanceStrategy,
            status: "N"
          }
        };
        let data = {
          list: [param]
        };
        createSgModuleBusinessConfig(data).then(res => {
          //返回信息
          this.setState({
            loading: false
          });
          if (res.reply.returnCode.type == "S") {
            message.info("创建成功");
            this.toIndex();
          } else {
            message.info("创建失败");
          }
        });
      }
    });
  };

  getAccessInfoConfig = values => {
    const { blackAccess, whiteAccess, isAccessActiveConfig } = this.state;
    console.log(blackAccess, whiteAccess)
    const { accessControlType, coveredAccess } = values;
    let accessInfoConfig = {
      isAccessActive: isAccessActiveConfig,
      accessControlType,
      coveredAccess,
      blackAccess,
      whiteAccess
    };
    return accessInfoConfig;
  };

  getMultiActiveConfig = values => {
    const { registryGroupList, isMultiActiveConfig } = this.state;
    const { visitType } = values;
    let registryGroupConfigs = [];
    if (isMultiActiveConfig) {
      registryGroupList.map((item, index) => {
        registryGroupConfigs.push({
          groupName: values[`groupName${item.key}`],
          backUpGroupName: values[`backUpGroupName${item.key}`]
        });
      });
    }
    let multiActiveConfig = {
      registryGroupConfigs,
      isMultiActive: isMultiActiveConfig,
      visitType
    };
    return multiActiveConfig;
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
    const { ldcList, isMultiActive, allModuleAndSubModule } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="创建模块" key="1">
              <div className="portlet-body">
                <Collapse defaultActiveKey={["1", "2"]}>
                  <Panel header="基础配置" key="1">
                    <Form>
                      <Row style={{ marginTop: 10 }}>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="模块编码">
                            {getFieldDecorator("moduleCode", {
                              rules: [
                                { required: true, message: "请输入模块编码" }
                              ]
                            })(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="备份ldc">
                            {getFieldDecorator("isBackUpLdc", {
                              rules: [
                                { required: true, message: "请选择是否备份ldc" }
                              ]
                            })(
                              <Select>
                                <Option value="Y">是</Option>
                                <Option value="N">否</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="探活uri">
                            {getFieldDecorator("checkUri", {
                              rules: [
                                { required: true, message: "请输入探活uri" }
                              ]
                            })(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="是否多活架构">
                            {getFieldDecorator("isMultiActive", {
                              rules: [
                                {
                                  required: true,
                                  message: "请选择是否多活架构"
                                }
                              ]
                            })(
                              <Select
                                onChange={val => {
                                  this.setState({ isMultiActive: val });
                                }}
                              >
                                <Option value="Y">是</Option>
                                <Option value="N">否</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col
                          span={12}
                          style={{
                            display: isMultiActive === "N" ? "block" : "none"
                          }}
                        >
                          <FormItem {...formItemLayout} label="所属ldcId">
                            {getFieldDecorator("fixLdcId", {
                              rules: [
                                {
                                  required:
                                    isMultiActive === "N" ? true : false,
                                  message: "请选择所属ldcId"
                                }
                              ]
                            })(
                              <Select>
                                {ldcList.map(item => (
                                  <Option value={item} key={item}>
                                    {item}
                                  </Option>
                                ))}
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col
                          span={12}
                          style={{
                            display: isMultiActive === "Y" ? "block" : "none"
                          }}
                        >
                          <FormItem
                            {...formItemLayout}
                            label="多活架构下单元类型"
                          >
                            {getFieldDecorator("unitType", {
                              rules: [
                                {
                                  required: isMultiActive == "Y" ? true : false,
                                  message: "请选择多活架构下单元类型"
                                }
                              ]
                            })(
                              <Select>
                                <Option value="0">互备模式</Option>
                                <Option value="1">机房负载模式</Option>
                                <Option value="2">广播模式</Option>
                                <Option value="3">分区单元</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                    </Form>
                  </Panel>
                  {/* <Panel header="添加 发布服务协议-协议URL模版" key="2">
                    <Protocol />
                  </Panel> */}
                  <Panel header="更多配置" key="3">
                    <MultiActiveConfig 
                      form={this.props.form}
                      moduleType="module"
                      returnMultiActiveConfig={registryGroupList => {
                        this.setState({ registryGroupList });
                      }}
                      isMultiActiveChange={isMultiActiveConfig => {
                        this.setState({ isMultiActiveConfig });
                      }}
                    />
                    <AccessInfoConfig
                      form={this.props.form}
                      accessInfoConfig={{
                        accessControlType: "MOUDLE_INNER_VISIBLE"
                      }}
                      moduleType="module"
                      allModuleAndSubModule={allModuleAndSubModule}
                      queryAllModuleAndServiceUnit={querySgModuleCodeAndServiceUnitCodeList}
                      moduleCode={""}
                      returnAccessInfoConfig={(whiteAccess, blackAccess) => {
                        this.setState({ whiteAccess, blackAccess });
                      }}
                      isAccessActiveChange={isAccessActiveConfig => {
                        this.setState({ isAccessActiveConfig });
                      }}
                    />
                  </Panel>
                </Collapse>
                <Row type="flex">
                  <FormItem
                    wrappercol={{ span: 19, offset: 5 }}
                    style={{ marginTop: 18, marginLeft: 30 }}
                  >
                    <Button
                      onClick={this.handleSubmit}
                      className="subBtn"
                      className="operatorBtn"
                      style={buttonStyle}
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
                  </FormItem>
                </Row>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default Form.create()(ModuleSgCreate);
