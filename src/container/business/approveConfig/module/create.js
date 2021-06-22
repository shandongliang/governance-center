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
import {
  createSgModuleBusinessConfigApprove,
  queryLDCList
} from "../request/service";
import { queryAllModuleAndSubmodule } from "../request/common";
import "./../../../common/style/index.less";
import {
  Protocol,
  LoadBalancePolicy,
  MultiActivePolicy,
  MultiActiveConfig,
  AccessInfoConfig
} from "../../../../component/policy/index";
import { goTo, goToAndClose } from '../../../../util/tabRouter';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Option = Select.Option;
const Panel = Collapse.Panel;

class ModuleApproveCreate extends React.Component {
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
      // protocolList: [],
      // tableData: [],
      // ldcData: [],
      // keyData: [],
      // systemData: [],
      // ipData: [],
      // loadBalancePolicyStatus: "Z",
      // multiActivePolicyStatus: "Z",
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
			pathname: '/approve/module/index'
		};
		goToAndClose(path, "模块查询");
  };
  // getProtocol = values => {
  //   const { protocolList } = this.state;
  //   if (protocolList.length === 0) {
  //     message.warning("请至少配置一条协议！");
  //   }
  //   let protocolsSubmitList = [];
  //   protocolList.map((item, index) => {
  //     protocolsSubmitList.push({
  //       protocolUrlTemplate: values[`protocolUrlTemplate${item.key}`],
  //       protocolMessageType: values[`protocolMessageType${item.key}`],
  //       protocol: values[`protocol${item.key}`],
  //       protocolUrl: values[`protocolUrl${item.key}`]
  //     });
  //   });

  //   let isSameService = [];
  //   if (protocolsSubmitList.length > 1) {
  //     for (let i = 0; i < protocolsSubmitList.length; i++) {
  //       if (isSameService.indexOf(protocolsSubmitList[i].type) === -1) {
  //         isSameService.push(protocolsSubmitList[i].type);
  //       } else {
  //         message.error("发布服务协议不能重复!");
  //         return;
  //       }
  //     }
  //   }
  //   return protocolsSubmitList;
  // };

  // getMultiActivePolicy = values => {
  //   const { tableData, ldcData, keyData } = this.state;
  //   let backupLdcList = [];
  //   let specialKeySubmitList = [];
  //   let tableLdcList = [];
  //   ldcData.map((item, index) => {
  //     backupLdcList.push({
  //       key: values[`ldcNo${item.key}`],
  //       val: values[`carryLdc${item.key}`]
  //     });
  //   });
  //   keyData.map((item, index) => {
  //     specialKeySubmitList.push({
  //       key: values[`keyword${item.key}`],
  //       val: values[`keyLdc${item.key}`]
  //     });
  //   });
  //   tableData.map((item, index) => {
  //     tableLdcList.push({
  //       key: values[`tableStart${item.key}`],
  //       val: values[`tableEnd${item.key}`],
  //       type: values[`tableLdc${item.key}`]
  //     });
  //   });

  //   let multiActivePolicy = {
  //     status: this.state.multiActivePolicyStatus,
  //     backupLdcList,
  //     specialKeySubmitList,
  //     tableLdcList,
  //     writeLdcId: values.writeLdcId
  //   };
  //   return multiActivePolicy;
  // };

  // getLoadBalancePolicy = values => {
  //   let loadBalancePolicy = {
  //     loadBalanceStrategy: values.loadBalanceStrategy,
  //     status: this.state.loadBalancePolicyStatus
  //   };
  //   return loadBalancePolicy;
  // };

  getAccessInfoConfig = values => {
    const { blackAccess, whiteAccess, isAccessActiveConfig } = this.state;
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let accessInfoConfig = this.getAccessInfoConfig(values);
        let multiActiveConfig = this.getMultiActiveConfig(values);
        let param = {
          ...values,
          accessInfoConfig,
          onlineStatus: "0",
          approveStatus: "0",
          publishDate: values.publishDate.format("YYYY-MM-DD"),
          updateUserName: JSON.parse(
            sessionStorage.getItem("$pandora_auth.user_info")
          ).userId,
          multiActiveConfig,
          multiActivePolicy: {
            writeLdcId: values.writeLdcId,
            specialKeySubmitList: [],
            tableLdcList: [],
            backupLdcList: [],
            status: "N"
          },
          loadBalancePolicy: {
            loadBalanceStrategy: values.loadBalanceStrategy,
            status: "N"
          },
          approveCode: this.props.approveCode
        };
        let data = {
          list: [param]
        };
        createSgModuleBusinessConfigApprove(data).then(res => {
          //返回信息
          this.setState({
            loading: false
          });
          if (res.reply.returnCode.type == "S") {
            const resultMessage = res.reply.result.resultList.length > 0 ? res.reply.result.resultList[0].result : "S"
            if(resultMessage !== "S"){
              Modal.error({
                title: "异常信息",
                content: resultMessage
              });
              return;
            }
            if(this.props.returnProfile){
              this.props.returnProfile(values.moduleCode);
              return;
            }
            this.toIndex();
          } else {
            message.info("创建失败");
          }
        });
      }
    });
  };
  render() {
    const { form } = this.props;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const { getFieldDecorator } = form;
    const { ldcList, isMultiActive, allModuleAndSubModule } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="创建模块" key="1">
              <div className="portlet-body">
                <Form>
                  <Collapse defaultActiveKey={["1", "2"]}>
                    <Panel header="基础配置" key="1">
                      <Row style={{ marginTop: 10 }}>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="模块编码">
                            {getFieldDecorator("moduleCode", {
                              initialValue: this.props.moduleCode,
                              rules: [
                                { required: true, message: "请输入模块编码" }
                              ]
                            })(<Input disabled={Boolean(this.props.moduleCode)} />)}
                          </FormItem>
                        </Col>
                        {/* <Col span={12}>
                          <FormItem {...formItemLayout} label="上线状态">
                            {getFieldDecorator("onlineStatus", {
                              rules: [
                                { required: true, message: "请选择上线状态" }
                              ]
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
                              rules: [
                                { required: true, message: "请选择上线日期" }
                              ]
                            })(<DatePicker style={{ width: "100%" }} />)}
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
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="修改类型">
                            {getFieldDecorator("changeType", {
                              initialValue: "00",
                              rules: [
                                { required: true, message: "请选择修改类型" }
                              ]
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
                              rules: [
                                { required: true, message: "请输入修改描述	" }
                              ]
                            })(<Input.TextArea />)}
                          </FormItem>
                        </Col>
                      </Row>
                    </Panel>
                    {/* <Panel header="添加 发布服务协议-协议URL模版" key="2">
                      <Protocol
                        form={form}
                        returnProtocol={protocolList => {
                          this.setState({ protocolList });
                        }}
                      />
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
                        moduleType="module"
                        accessInfoConfig={{
                          accessControlType: "MOUDLE_INNER_VISIBLE"
                        }}
                        allModuleAndSubModule={allModuleAndSubModule}
                        moduleCode={""}
                        isAccessActiveChange={isAccessActiveConfig => {
                          this.setState({ isAccessActiveConfig });
                        }}
                        returnAccessInfoConfig={(whiteAccess, blackAccess) => {
                          this.setState({ whiteAccess, blackAccess });
                        }}
                      />
                    </Panel>
                  </Collapse>
                </Form>
                <Row type="flex">
                  <FormItem
                    wrappercol={{ span: 19, offset: 5 }}
                    style={{ marginTop: 18, marginLeft: 30 }}
                  >
                    <Button
                      onClick={this.handleSubmit}
                      type="primary"
                    >
                      提交
                    </Button>
                    {this.props.returnProfile?null:<Button
                      onClick={this.toIndex}
                    >
                      取消
                    </Button>}
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
export default Form.create()(ModuleApproveCreate);
