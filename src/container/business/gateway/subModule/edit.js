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
import { queryAllModuleAndSubmodule } from "../request/common";
import {
  querySgSubmoduleBusinessConfigList,
  queryLDCList,
  querySgModuleBusinessConfigList,
  editSgSubmoduleBusinessConfig,
  querySgServiceList,
  querySgModuleCodeAndServiceUnitCodeList
} from "../request/service";
import "./../../../common/style/index.less";
import moment from "moment";
import {
  Protocol,
  SubModuleConcurrentControlPolicy,
  SubModuleFlowControlPolicy,
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

class SubModuleSgEdit extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      allModuleAndSubModule: [],
      moduleList: [],
      subModuleDetail: {},
      isMultiActive: "",
      ldcList: [],
      protocolList: [],
      tableData: [],
      ldcData: [],
      keyData: [],
      systemData: [],
      ipData: [],
      conData: [],
      flowData: [],
      blackAccess: [],
      whiteAccess: [],
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
    const { id } = this.props.location.state;
    this.querySubModuleDetail(id);
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
      sgModuleBusinessConfigVo: {
        page: {
          doPagination: false
        }
      }
    };
    querySgModuleBusinessConfigList(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        this.setState({
          moduleList: res.reply.resultList
        });
      }
    });
  };
  querySubModuleDetail = id => {
    let data = {
      sgSubmoduleBusinessConfigVo: {
        id: id
      }
    };
    querySgSubmoduleBusinessConfigList(data).then(res => {
      if (
        res.reply.returnCode.type === "S" &&
        res.reply.result.list.length > 0
      ) {
        let subModuleDetail = res.reply.result.list[0];
        this.setState({
          subModuleDetail: res.reply.result.list[0],
          sentinelConfigZk: subModuleDetail.sentinelConfigZk,
          isMultiActive: subModuleDetail.isMultiActive,
          loadBalancePolicyStatus: subModuleDetail.loadBalancePolicy.status,
          multiActivePolicyStatus: subModuleDetail.multiActivePolicy.status,
          flowControlPolicyStatus: subModuleDetail.flowControlPolicy.status,
          concurrentControlPolicyStatus:
            subModuleDetail.concurrentControlPolicy.status
        });
      }
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // if (this.state.protocolList.length === 0) {
        //   message.warning("??????????????????????????????");
        //   return;
        // }
        const { sentinelConfigZk } = this.state;
        const {
          moduleCode,
          subModuleCode,
          onlineStatus,
          writeLdcId,
          unitType,
          isBackUpLdc,
          isMultiActive,
          checkUri,
          changeType,
          changeDescribe,
          fixLdcId
        } = values;
        let protocolsSubmitList = this.getProtocol(values);
        let concurrentControlPolicy = this.getConcurrentControlPolicy(values);
        let flowControlPolicy = this.getFlowControlPolicy(values);
        let accessInfoConfig = this.getAccessInfoConfig(values);
        let multiActivePolicy = this.getMultiActivePolicy(values);
        let multiActiveConfig = this.getMultiActiveConfig(values);
        let loadBalancePolicy = this.getLoadBalancePolicy(values);
        let param = {
          id: this.state.subModuleDetail.id,
          moduleCode,
          subModuleCode,
          onlineStatus,
          writeLdcId,
          unitType,
          isBackUpLdc,
          isMultiActive,
          checkUri,
          changeType,
          changeDescribe,
          fixLdcId,
          approveStatus: "0",
          updUserName: JSON.parse(
            sessionStorage.getItem("$pandora_auth.user_info")
          ).userId,
          protocolsSubmitList,
          concurrentControlPolicy,
          flowControlPolicy,
          accessInfoConfig,
          multiActivePolicy,
          multiActiveConfig,
          loadBalancePolicy,
          sentinelConfigZk
        };
        let data = {
          list: [param]
        };
        editSgSubmoduleBusinessConfig(data).then(res => {
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
  toIndex = () => {
    let path = {
			pathname: '/gateway/subModule/index'
		};
		goToAndClose(path, "??????????????????");
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
    const { conData, concurrentControlPolicyStatus } = this.state;
    let groupPolicyList = [];
    if (concurrentControlPolicyStatus === "Y") {
      conData.map((item, index) => {
        groupPolicyList.push({
          groupName: values[`conGroupName${item.key}`],
          type: values[`conType${item.key}`],
          value: values[`conValue${item.key}`]
        });
      });
    }
    let concurrentControlPolicy = {
      status: concurrentControlPolicyStatus,
      groupPolicyList
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
    const { flowData, flowControlPolicyStatus } = this.state;
    let groupPolicyList = [];
    if (flowControlPolicyStatus === "Y") {
      flowData.map((item, index) => {
        groupPolicyList.push({
          groupName: values[`flowGroupName${item.key}`],
          type: values[`flowType${item.key}`],
          value: values[`flowValue${item.key}`]
        });
      });
    }
    let flowControlPolicy = {
      status: flowControlPolicyStatus,
      groupPolicyList
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

  render() {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { subModuleDetail, ldcList, isMultiActive, allModuleAndSubModule, moduleList } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="??????????????????" key="1">
              <div className="portlet-body">
                <Form>
                  <Collapse defaultActiveKey={["1"]}>
                    <Panel header="????????????" key="1">
                      <Row style={{ marginTop: 10 }}>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="????????????">
                            {getFieldDecorator("moduleCode", {
                              initialValue: subModuleDetail.moduleCode,
                              rules: [
                                { required: true, message: "?????????????????????" }
                              ]
                            })(<Input disabled />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="??????????????????">
                            {getFieldDecorator("subModuleCode", {
                              initialValue: subModuleDetail.subModuleCode,
                              rules: [
                                {
                                  required: true,
                                  message: "???????????????????????????"
                                }
                              ]
                            })(<Input disabled />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="??????ldc">
                            {getFieldDecorator("isBackUpLdc", {
                              initialValue: subModuleDetail.isBackUpLdc,
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
                          <FormItem {...formItemLayout} label="??????uri">
                            {getFieldDecorator("checkUri", {
                              initialValue: subModuleDetail.checkUri,
                              rules: [
                                { required: true, message: "???????????????uri" }
                              ]
                            })(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="??????????????????">
                            {getFieldDecorator("isMultiActive", {
                              initialValue: subModuleDetail.isMultiActive,
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
                              initialValue: subModuleDetail.fixLdcId,
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
                              initialValue: subModuleDetail.unitType,
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
                    {/* <Panel header="?????? ??????????????????-??????URL??????" key="2">
                      <Protocol
                        form={form}
                        protocolsSubmitList={
                          subModuleDetail.protocolsSubmitList
                        }
                        returnProtocol={protocolList => {
                          this.setState({ protocolList });
                        }}
                      />
                    </Panel> */}
                    <Panel header="????????????" key="3">
                      <MultiActivePolicy
                        form={form}
                        multiActivePolicy={subModuleDetail.multiActivePolicy}
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
                        multiActiveConfig={subModuleDetail.multiActiveConfig}
                        returnMultiActiveConfig={registryGroupList => {
                          this.setState({ registryGroupList });
                        }}
                        isMultiActiveChange={isMultiActiveConfig => {
                          this.setState({ isMultiActiveConfig });
                        }}
                      />
                      <AccessInfoConfig
                        form={form}
                        accessInfoConfig={subModuleDetail.accessInfoConfig}
                        queryAllModuleAndServiceUnit={querySgModuleCodeAndServiceUnitCodeList}
                        moduleCode={subModuleDetail.moduleCode}
                        returnAccessInfoConfig={(whiteAccess, blackAccess) => {
                          this.setState({ whiteAccess, blackAccess });
                        }}
                        isAccessActiveChange={isAccessActiveConfig => {
                          this.setState({ isAccessActiveConfig });
                        }}
                      />
                      <SubModuleConcurrentControlPolicy
                        form={form}
                        concurrentControlPolicy={
                          subModuleDetail.concurrentControlPolicy
                        }
                        concurrentControlPolicyChange={concurrentControlPolicyStatus => {
                          this.setState({ concurrentControlPolicyStatus });
                        }}
                        returnConcurrentControlPolicy={conData => {
                          this.setState({ conData });
                        }}
                      />
                      <SubModuleFlowControlPolicy
                        form={form}
                        flowControlPolicy={subModuleDetail.flowControlPolicy}
                        flowControlPolicyPolicyChange={flowControlPolicyStatus => {
                          this.setState({ flowControlPolicyStatus });
                        }}
                        returnFlowControlPolicyPolicy={flowData => {
                          this.setState({ flowData });
                        }}
                      />
                      <LoadBalancePolicy
                        form={form}
                        loadBalancePolicy={subModuleDetail.loadBalancePolicy}
                        loadBalancePolicyChange={loadBalancePolicyStatus => {
                          this.setState({ loadBalancePolicyStatus });
                        }}
                      />
                      <PolicyConfig 
                        moduleList={moduleList}
                        sentinelConfigZk={subModuleDetail.sentinelConfigZk}
                        querySgSubmoduleBusinessConfigList={querySgSubmoduleBusinessConfigList}
                        querySgServiceList={querySgServiceList}
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
                    <Button type="primary" onClick={this.handleSubmit}>??????</Button>
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
export default Form.create()(SubModuleSgEdit);
