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
  createSgServices,
  queryLDCList,
  querySgModuleBusinessConfigList,
  querySgSubmoduleBusinessConfigList,
  querySgModuleCodeAndServiceUnitCodeList
} from "../request/service";
import { queryAllModuleAndSubmodule } from "../request/common";
import "./../../../common/style/index.less";
import {
  Protocol,
  ServiceConcurrentControlPolicy,
  ServiceFlowControlPolicy,
  MultiActivePolicy,
  MultiActiveConfig,
  LoadBalancePolicy,
  AccessInfoConfig,
  PolicyConfig
} from "../../../../component/policy/index";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Option = Select.Option;
const Panel = Collapse.Panel;

class ServiceSgCreate extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      moduleCode: "",
      isMultiActive: "",
      ldcList: [],
      moduleList: [],
      subModuleList: [],
      subModuleDisabled: true,
      protocolList: [],
      tableData: [],
      ldcData: [],
      keyData: [],
      systemData: [],
      ipData: [],
      blackAccess: [],
      whiteAccess: [],
      allModuleAndSubModule: [],
      subModuleConGroupList: [],
      subModuleFlowGroupList: [],
      loadBalancePolicyStatus: "Z",
      multiActivePolicyStatus: "Z",
      flowControlPolicyStatus: "N",
      concurrentControlPolicyStatus: "N",
      registryGroupList: [],
      isMultiActiveConfig: true,
      isAccessActiveConfig: true,
      sentinelConfigZk: {}
    };
  }
  async componentDidMount() {
    this.queryModuleList();
    this.queryLDC();
    let allModuleAndSubModule = await queryAllModuleAndSubmodule();
    this.setState({
      allModuleAndSubModule
    })
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
  queryModuleList = () => {
    let data = {
      sgModuleBusinessConfigVo: {}
    };
    querySgModuleBusinessConfigList(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        this.setState({
          moduleList: res.reply.resultList
        });
      }
    });
  };
  querySubModuleList = moduleCode => {
    let data = {
      sgSubmoduleBusinessConfigVo: {
        moduleCode
      }
    };
    querySgSubmoduleBusinessConfigList(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        this.setState({
          subModuleList: res.reply.result.list,
          subModuleDisabled: false
        });
      }
    });
  };
  moduleChange = value => {
    this.setState({
      subModuleDisabled: true,
      moduleCode: value
    });
    this.props.form.resetFields(["subModuleCode"]);
    this.querySubModuleList(value);
  };
  subModuleChange = value => {
    let subModule = this.state.subModuleList.filter(
      item => item.subModuleCode === value
    )[0];
    this.setState({
      subModuleConGroupList: subModule.concurrentControlPolicy.groupPolicyList,
      subModuleFlowGroupList: subModule.flowControlPolicy.groupPolicyList
    });
  };
  toIndex = () => {
    let path = {
			pathname: '/gateway/service/index'
		};
		goToAndClose(path, "????????????");
  };

  getProtocol = values => {
    const { protocolList } = this.state;
    if (protocolList.length === 0) {
      // message.warning("??????????????????????????????");
      return;
    }
    let protocolsSubmitList = [];
    protocolList.map((item, index) => {
      protocolsSubmitList.push({
        key: values[`protocolUrlTemplate${item.key}`],
        msgType: values[`protocolMessageType${item.key}`],
        type: values[`protocol${item.key}`],
        val: values[`protocolUrl${item.key}`]
      });
    });

    let isSameService = [];
    if (protocolsSubmitList.length > 1) {
      for (let i = 0; i < protocolsSubmitList.length; i++) {
        if (isSameService.indexOf(protocolsSubmitList[i].type) === -1) {
          isSameService.push(protocolsSubmitList[i].type);
        } else {
          message.error("??????????????????????????????!");
          return;
        }
      }
    }
    return protocolsSubmitList;
  };

  getConcurrentControlPolicy = values => {
    const { concurrentControlPolicyStatus } = this.state;
    let concurrentControlPolicy = {
      status: concurrentControlPolicyStatus,
      maxConcurrency: values.maxConcurrency,
      singlePolicyValue: values.maxConcurrency,
      groupList: values.concurrentGroupList
    };
    return concurrentControlPolicy;
  };

  getMultiActivePolicy = values => {
    const { tableData, ldcData, keyData, multiActivePolicyStatus } = this.state;
    let backupLdcList = [];
    let specialKeySubmitList = [];
    let tableLdcList = [];
    if (multiActivePolicyStatus === "Y") {
      ldcData.map((item, index) => {
        backupLdcList.push({
          key: values[`ldcNo${item.key}`],
          val: values[`carryLdc${item.key}`]
        });
      });
      keyData.map((item, index) => {
        specialKeySubmitList.push({
          key: values[`keyword${item.key}`],
          val: values[`keyLdc${item.key}`]
        });
      });
      tableData.map((item, index) => {
        tableLdcList.push({
          key: values[`tableStart${item.key}`],
          val: values[`tableEnd${item.key}`],
          type: values[`tableLdc${item.key}`]
        });
      });
    }

    let multiActivePolicy = {
      status: multiActivePolicyStatus,
      backupLdcList,
      specialKeySubmitList,
      tableLdcList,
      writeLdcId: values.writeLdcId
    };
    return multiActivePolicy;
  };

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

  getFlowControlPolicy = values => {
    const { flowControlPolicyStatus } = this.state;
    let flowControlPolicy = {
      maxFlow: values.maxFlow,
      status: flowControlPolicyStatus,
      singlePolicyValue: values.maxFlow,
      groupList: values.flowGroupList
    };
    return flowControlPolicy;
  };

  getLoadBalancePolicy = values => {
    let loadBalancePolicy = {
      loadBalanceStrategy: values.loadBalanceStrategy,
      status: this.state.loadBalancePolicyStatus
    };
    return loadBalancePolicy;
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
        if (this.state.protocolList.length === 0) {
          message.warning("??????????????????????????????");
          return;
        }
        const { sentinelConfigZk } = this.state;
        const {
          moduleCode,
          subModuleCode,
          serviceCode,
          serviceName,
          serviceVersion,
          status,
          readOrWrite,
          isBackUpLdc,
          onlineStatus,
          unitType,
          isMultiActive,
          changeType,
          changeDescribe,
          fixLdcId
        } = values;
        let protocolsSubmitList = this.getProtocol(values);
        let concurrentControlPolicy = this.getConcurrentControlPolicy(values);
        let flowControlPolicy = this.getFlowControlPolicy(values);
        let accessInfoConfig = this.getAccessInfoConfig(values);
        let multiActivePolicy = this.getMultiActivePolicy(values);
        let loadBalancePolicy = this.getLoadBalancePolicy(values);
        let multiActiveConfig = this.getMultiActiveConfig(values);
        let param = {
          moduleCode,
          subModuleCode,
          serviceCode,
          serviceName,
          serviceVersion,
          status,
          readOrWrite,
          isBackUpLdc,
          onlineStatus,
          unitType,
          isMultiActive,
          changeType,
          changeDescribe,
          fixLdcId,
          applicantId: JSON.parse(
            sessionStorage.getItem("$pandora_auth.user_info")
          ).userId,
          createUser: JSON.parse(
            sessionStorage.getItem("$pandora_auth.user_info")
          ).userId,
          protocolsSubmitList,
          concurrentControlPolicy,
          flowControlPolicy,
          multiActivePolicy,
          multiActiveConfig,
          loadBalancePolicy,
          accessInfoConfig,
          sentinelConfigZk
        };
        let data = {
          list: [param]
        };
        createSgServices(data).then(res => {
          //????????????
          this.setState({
            loading: false
          });
          if (res.reply.returnCode.type == "S") {
            message.info("????????????");
            this.toIndex();
          } else {
            message.info("????????????");
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
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const {
      moduleCode,
      ldcList,
      moduleList,
      isMultiActive,
      subModuleDisabled,
      subModuleList,
      allModuleAndSubModule,
      subModuleConGroupList,
      subModuleFlowGroupList
    } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="????????????" key="1">
              <div className="portlet-body">
                <Form>
                  <Collapse defaultActiveKey={["1", "2"]}>
                    <Panel header="????????????" key="1">
                      <Row style={{ marginTop: 10 }}>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="????????????">
                            {getFieldDecorator("moduleCode", {
                              rules: [
                                { required: true, message: "?????????????????????" }
                              ]
                            })(
                              <Select onChange={this.moduleChange} showSearch>
                                {moduleList.map(item => (
                                  <Option
                                    value={item.moduleCode}
                                    key={item.moduleCode}
                                  >
                                    {item.moduleCode}
                                  </Option>
                                ))}
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="??????????????????">
                            {getFieldDecorator("subModuleCode", {
                              rules: [
                                {
                                  required: true,
                                  message: "???????????????????????????"
                                }
                              ]
                            })(
                              <Select onChange={this.subModuleChange} disabled={subModuleDisabled} showSearch>
                                {subModuleList.map(item => (
                                  <Option
                                    value={item.subModuleCode}
                                    key={item.subModuleCode}
                                  >
                                    {item.subModuleCode}
                                  </Option>
                                ))}
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="?????????">
                            {getFieldDecorator("serviceCode", {
                              rules: [
                                { required: true, message: "??????????????????" }
                              ]
                            })(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="????????????">
                            {getFieldDecorator("serviceName", {
                              rules: [
                                { required: true, message: "?????????????????????" }
                              ]
                            })(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="??????">
                            {getFieldDecorator("serviceVersion", {
                              initialValue: "1.0",
                              rules: [
                                { required: true, message: "???????????????" }
                              ]
                            })(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="??????">
                            {getFieldDecorator("status", {
                              initialValue: "0",
                              rules: [
                                { required: true, message: "???????????????" }
                              ]
                            })(
                              <Select>
                                <Option value="0">??????</Option>
                                <Option value="1">??????</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="????????????">
                            {getFieldDecorator("readOrWrite", {})(
                              <Select>
                                <Option value="0">?????????</Option>
                                <Option value="1">?????????</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="??????ldc">
                            {getFieldDecorator("isBackUpLdc", {
                              rules: [
                                { required: true, message: "?????????????????????ldc" }
                              ]
                            })(
                              <Select>
                                <Option value="Y">???</Option>
                                <Option value="N">???</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="??????????????????">
                            {getFieldDecorator("isMultiActive", {
                              rules: [
                                {
                                  required: true,
                                  message: "???????????????????????????"
                                }
                              ]
                            })(
                              <Select
                                onChange={val => {
                                  this.setState({ isMultiActive: val });
                                }}
                              >
                                <Option value="Y">???</Option>
                                <Option value="N">???</Option>
                                <Option value="Z">????????????</Option>
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
                          <FormItem {...formItemLayout} label="??????ldcId">
                            {getFieldDecorator("fixLdcId", {
                              rules: [
                                {
                                  required:
                                    isMultiActive === "N" ? true : false,
                                  message: "???????????????ldcId"
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
                            label="???????????????????????????"
                          >
                            {getFieldDecorator("unitType", {
                              rules: [
                                {
                                  required: isMultiActive == "Y" ? true : false,
                                  message: "????????????????????????????????????"
                                }
                              ]
                            })(
                              <Select>
                                <Option value="0">????????????</Option>
                                <Option value="1">??????????????????</Option>
                                <Option value="2">????????????</Option>
                                <Option value="3">????????????</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                    </Panel>
                    <Panel header="?????? ??????????????????-??????URL??????" key="2">
                      <Protocol
                        form={form}
                        returnProtocol={protocolList => {
                          this.setState({ protocolList });
                        }}
                      />
                    </Panel>
                    <Panel header="????????????" key="3">
                      <MultiActivePolicy
                        form={form}
                        multiActivePolicy={{ status: "Z" }}
                        isMultiActive={isMultiActive}
                        returnMultiActivePolicy={(
                          tableData,
                          keyData,
                          ldcData
                        ) => {
                          this.setState({ tableData, keyData, ldcData });
                        }}
                        multiActivePolicyChange={multiActivePolicyStatus => {
                          this.setState({ multiActivePolicyStatus });
                        }}
                      />
                      <MultiActiveConfig 
                        form={this.props.form}
                        returnMultiActiveConfig={registryGroupList => {
                          this.setState({ registryGroupList });
                        }}
                        isMultiActiveChange={isMultiActiveConfig => {
                          this.setState({ isMultiActiveConfig });
                        }}
                      />
                      <AccessInfoConfig
                        form={form}
                        moduleType="service"
                        accessInfoConfig={{ accessControlType: "MOUDLE_INNER_VISIBLE", coveredAccess: true }}
                        queryAllModuleAndServiceUnit={querySgModuleCodeAndServiceUnitCodeList}
                        moduleCode={moduleCode}
                        returnAccessInfoConfig={(whiteAccess, blackAccess) => {
                          this.setState({ whiteAccess, blackAccess });
                        }}
                        isAccessActiveChange={isAccessActiveConfig => {
                          this.setState({ isAccessActiveConfig });
                        }}
                      />
                      <ServiceConcurrentControlPolicy
                        form={form}
                        concurrentControlPolicy={{ status: "N" }}
                        subModuleConGroupList={subModuleConGroupList}
                        concurrentControlPolicyChange={concurrentControlPolicyStatus => {
                          this.setState({ concurrentControlPolicyStatus });
                        }}
                      />
                      <ServiceFlowControlPolicy
                        form={form}
                        flowControlPolicy={{ status: "N" }}
                        subModuleFlowGroupList={subModuleFlowGroupList}
                        flowControlPolicyPolicyChange={flowControlPolicyStatus => {
                          this.setState({ flowControlPolicyStatus });
                        }}
                      />
                      <LoadBalancePolicy
                        form={form}
                        loadBalancePolicy={{ status: "Z" }}
                        loadBalancePolicyChange={loadBalancePolicyStatus => {
                          this.setState({ loadBalancePolicyStatus });
                        }}
                      />
                      <PolicyConfig 
                        fromPageType="service"
                        returnSentinelConfig={sentinelConfigZk => this.setState({sentinelConfigZk})}
                      />
                    </Panel>
                  </Collapse>
                </Form>
                <Row type="flex">
                  <FormItem
                    wrappercol={{ span: 19, offset: 5 }}
                    style={{ marginTop: 18, marginLeft: 30 }}
                  >
                    <Button onClick={this.handleSubmit} type="primary">
                      ??????
                    </Button>
                    <Button onClick={this.toIndex}>??????</Button>
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
export default Form.create()(ServiceSgCreate);
