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
  querySgServiceApproveList,
  queryLDCList,
  editSgServiceApproves,
  querySgSubmoduleBusinessConfigApproveList
} from "../request/service";
import "./../../../common/style/index.less";
import moment from "moment";
import { queryAllModuleAndSubmodule } from "../request/common";
import {
  Protocol,
  ServiceConcurrentControlPolicy,
  ServiceFlowControlPolicy,
  MultiActivePolicy,
  MultiActiveConfig,
  LoadBalancePolicy,
  AccessInfoConfig
} from "../../../../component/policy/index";
import { goTo, goToAndClose } from '../../../../util/tabRouter';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Option = Select.Option;
const Panel = Collapse.Panel;

class ServiceApproveEdit extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      serviceDetail: {},
      ldcList: [],
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
      isAccessActiveConfig: true
    };
  }
  async componentDidMount() {
    const { id } = this.props.location.state;
    this.queryServiceDeatil(id);
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
  queryServiceDeatil = id => {
    let data = {
      sgServiceApproveVo: {
        id
      }
    };
    querySgServiceApproveList(data).then(res => {
      if (
        res.reply.returnCode.type === "S" &&
        res.reply.result.sgServiceApproveList.length > 0
      ) {
        let serviceDetail = res.reply.result.sgServiceApproveList[0];
        this.setState({
          serviceDetail
        });
        this.querySubModuleList(serviceDetail.subModuleCode);
      }
    });
  };
  querySubModuleList = subModuleCode => {
    let data = {
      sgSubmoduleBusinessConfigApproveVo: {
        subModuleCode
      }
    };
    querySgSubmoduleBusinessConfigApproveList(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        let subModule = res.reply.result.list[0];
        this.setState({
          subModuleConGroupList:
            subModule.concurrentControlPolicy.groupPolicyList,
          subModuleFlowGroupList: subModule.flowControlPolicy.groupPolicyList
        });
      }
    });
  };
  toIndex = () => {
    let path = {
			pathname: '/approve/service/index'
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
        if (this.state.protocolList.length === 0) {
          message.warning("??????????????????????????????");
          return;
        }
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
          approveStatus: "0",
          publishDate: values.publishDate.format("YYYY-MM-DD"),
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
          accessInfoConfig
        };
        let data = {
          list: [param]
        };
        editSgServiceApproves(data).then(res => {
          //????????????
          this.setState({
            loading: false
          });
          if (res.reply.returnCode.type == "S") {
            const resultMessage = res.reply.result.length > 0 ? res.reply.result[0].result : "S"
            if(resultMessage !== "S"){
              Modal.error({
                title: "????????????",
                content: resultMessage
              });
              return;
            }
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
      serviceDetail,
      isMultiActive,
      ldcList,
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
                  <Collapse defaultActiveKey={["1"]}>
                    <Panel header="????????????" key="1">
                      <Form>
                        <Row style={{ marginTop: 10 }}>
                          <Col span={12}>
                            <FormItem {...formItemLayout} label="????????????">
                              {getFieldDecorator("moduleCode", {
                                initialValue: serviceDetail.moduleCode,
                                rules: [
                                  { required: true, message: "?????????????????????" }
                                ]
                              })(<Input disabled />)}
                            </FormItem>
                          </Col>
                          <Col span={12}>
                            <FormItem {...formItemLayout} label="??????????????????">
                              {getFieldDecorator("subModuleCode", {
                                initialValue: serviceDetail.subModuleCode,
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
                            <FormItem {...formItemLayout} label="?????????">
                              {getFieldDecorator("serviceCode", {
                                initialValue: serviceDetail.serviceCode,
                                rules: [
                                  { required: true, message: "??????????????????" }
                                ]
                              })(<Input disabled />)}
                            </FormItem>
                          </Col>
                          <Col span={12}>
                            <FormItem {...formItemLayout} label="????????????">
                              {getFieldDecorator("serviceName", {
                                initialValue: serviceDetail.serviceName,
                                rules: [
                                  { required: true, message: "?????????????????????" }
                                ]
                              })(<Input disabled />)}
                            </FormItem>
                          </Col>
                          <Col span={12}>
                          <FormItem {...formItemLayout} label="??????">
                            {getFieldDecorator("serviceVersion", {
                              initialValue: serviceDetail.serviceVersion || "1.0",
                              rules: [
                                { required: true, message: "???????????????" }
                              ]
                            })(<Input/>)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="??????">
                            {getFieldDecorator("status", {
                              initialValue: serviceDetail.status || "0",
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
                              {getFieldDecorator("onlineStatus", {
                                initialValue: serviceDetail.onlineStatus,
                                rules: [
                                  { required: true, message: "?????????????????????" }
                                ]
                              })(
                                <Select>
                                  <Select.Option value="0">
                                    ?????????
                                  </Select.Option>
                                  <Select.Option value="1">
                                    ?????????
                                  </Select.Option>
                                  <Select.Option value="2">
                                    ?????????
                                  </Select.Option>
                                </Select>
                              )}
                            </FormItem>
                          </Col>
                          <Col span={12}>
                            <FormItem {...formItemLayout} label="????????????">
                              {getFieldDecorator("publishDate", {
                                initialValue: moment(serviceDetail.publishDate),
                                rules: [
                                  { required: true, message: "?????????????????????" }
                                ]
                              })(<DatePicker style={{ width: "100%" }} />)}
                            </FormItem>
                          </Col>
                          <Col span={12}>
                            <FormItem {...formItemLayout} label="????????????">
                              {getFieldDecorator("readOrWrite", {
                                initialValue: serviceDetail.readOrWrite
                              })(
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
                                initialValue: serviceDetail.isBackUpLdc,
                                rules: [
                                  {
                                    required: true,
                                    message: "?????????????????????ldc"
                                  }
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
                                initialValue: serviceDetail.isMultiActive,
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
                                initialValue: serviceDetail.fixLdcId,
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
                                initialValue: serviceDetail.unitType,
                                rules: [
                                  {
                                    required:
                                      isMultiActive == "Y" ? true : false,
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
                          <Col span={12}>
                            <FormItem {...formItemLayout} label="????????????">
                              {getFieldDecorator("changeType", {
                                initialValue: serviceDetail.changeType,
                                rules: [
                                  { required: true, message: "?????????????????????" }
                                ]
                              })(
                                <Select>
                                  <Select.Option value="00">??????</Select.Option>
                                  <Select.Option value="01">??????</Select.Option>
                                  <Select.Option value="10">??????</Select.Option>
                                </Select>
                              )}
                            </FormItem>
                          </Col>
                          <Col span={12}>
                            <FormItem {...formItemLayout} label="????????????">
                              {getFieldDecorator("changeDescribe", {
                                initialValue: serviceDetail.changeDescribe,
                                rules: [
                                  { required: true, message: "?????????????????????	" }
                                ]
                              })(<Input.TextArea />)}
                            </FormItem>
                          </Col>
                        </Row>
                      </Form>
                    </Panel>
                    <Panel header="?????? ??????????????????-??????URL??????" key="2">
                      <Protocol
                        form={form}
                        returnProtocol={protocolList => {
                          this.setState({ protocolList });
                        }}
                        protocolsSubmitList={serviceDetail.protocolsSubmitList}
                      />
                    </Panel>
                    <Panel header="????????????" key="3">
                      <MultiActivePolicy
                        form={form}
                        multiActivePolicy={serviceDetail.multiActivePolicy}
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
                        multiActiveConfig={serviceDetail.multiActiveConfig}
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
                        accessInfoConfig={serviceDetail.accessInfoConfig}
                        allModuleAndSubModule={allModuleAndSubModule}
                        moduleCode={serviceDetail.moduleCode}
                        returnAccessInfoConfig={(whiteAccess, blackAccess) => {
                          this.setState({ whiteAccess, blackAccess });
                        }}
                        isAccessActiveChange={isAccessActiveConfig => {
                          this.setState({ isAccessActiveConfig });
                        }}
                      />
                      <ServiceConcurrentControlPolicy
                        form={form}
                        concurrentControlPolicy={
                          serviceDetail.concurrentControlPolicy
                        }
                        subModuleConGroupList={subModuleConGroupList}
                        concurrentControlPolicyChange={concurrentControlPolicyStatus => {
                          this.setState({ concurrentControlPolicyStatus });
                        }}
                      />
                      <ServiceFlowControlPolicy
                        form={form}
                        flowControlPolicy={serviceDetail.flowControlPolicy}
                        subModuleFlowGroupList={subModuleFlowGroupList}
                        flowControlPolicyPolicyChange={flowControlPolicyStatus => {
                          this.setState({ flowControlPolicyStatus });
                        }}
                      />
                      <LoadBalancePolicy
                        form={form}
                        loadBalancePolicy={serviceDetail.loadBalancePolicy}
                        loadBalancePolicyChange={loadBalancePolicyStatus => {
                          this.setState({ loadBalancePolicyStatus });
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
export default Form.create()(ServiceApproveEdit);
