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
  querySgServiceList,
  queryLDCList,
  editSgServices,
  querySgSubmoduleBusinessConfigList,
  querySgModuleCodeAndServiceUnitCodeList
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
  AccessInfoConfig,
  PolicyConfig
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
      isAccessActiveConfig: true,
      sentinelConfigZk: {}
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
      sgServiceVo: {
        id
      }
    };
    querySgServiceList(data).then(res => {
      if (
        res.reply.returnCode.type === "S" &&
        res.reply.result.sgServiceList.length > 0
      ) {
        let serviceDetail = res.reply.result.sgServiceList[0];
        this.setState({
          serviceDetail,
          sentinelConfigZk: serviceDetail.sentinelConfigZk
        });
        this.querySubModuleList(serviceDetail.subModuleCode);
      }
    });
  };
  querySubModuleList = subModuleCode => {
    let data = {
      sgSubmoduleBusinessConfigVo: {
        subModuleCode
      }
    };
    querySgSubmoduleBusinessConfigList(data).then(res => {
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
			pathname: '/gateway/service/index'
		};
		goToAndClose(path, "服务查询");
  };
  getProtocol = values => {
    const { protocolList } = this.state;
    if (protocolList.length === 0) {
      // message.warning("请至少配置一条协议！");
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
          message.error("发布服务协议不能重复!");
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
          message.warning("请至少配置一条协议！");
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
          id: this.state.serviceDetail.id,
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
        editSgServices(data).then(res => {
          //返回信息
          this.setState({
            loading: false
          });
          if (res.reply.returnCode.type == "S") {
            message.info("编辑成功");
            this.toIndex();
          } else {
            message.info("编辑失败");
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
            <TabPane tab="服务详情" key="1">
              <div className="portlet-body">
                <Form>
                  <Collapse defaultActiveKey={["1","2"]}>
                    <Panel header="基础配置" key="1">
                      <Row style={{ marginTop: 10 }}>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="模块编码">
                            {getFieldDecorator("moduleCode", {
                              initialValue: serviceDetail.moduleCode,
                              rules: [
                                { required: true, message: "请选择模块编码" }
                              ]
                            })(<Input disabled />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="服务单元编码">
                            {getFieldDecorator("subModuleCode", {
                              initialValue: serviceDetail.subModuleCode,
                              rules: [
                                {
                                  required: true,
                                  message: "请选择服务单元编码"
                                }
                              ]
                            })(<Input disabled />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="服务码">
                            {getFieldDecorator("serviceCode", {
                              initialValue: serviceDetail.serviceCode,
                              rules: [
                                { required: true, message: "请输入服务码" }
                              ]
                            })(<Input disabled />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="服务名称">
                            {getFieldDecorator("serviceName", {
                              initialValue: serviceDetail.serviceName,
                              rules: [
                                { required: true, message: "请输入服务名称" }
                              ]
                            })(<Input disabled />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="版本">
                            {getFieldDecorator("serviceVersion", {
                              initialValue: serviceDetail.serviceVersion || "1.0",
                              rules: [
                                { required: true, message: "请输入版本" }
                              ]
                            })(<Input/>)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="状态">
                            {getFieldDecorator("status", {
                              initialValue: serviceDetail.status || "0",
                              rules: [
                                { required: true, message: "请选择状态" }
                              ]
                            })(
                              <Select>
                                <Option value="0">生效</Option>
                                <Option value="1">失效</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="服务类型">
                            {getFieldDecorator("readOrWrite", {
                              initialValue: serviceDetail.readOrWrite
                            })(
                              <Select>
                                <Option value="0">读服务</Option>
                                <Option value="1">写服务</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="备份ldc">
                            {getFieldDecorator("isBackUpLdc", {
                              initialValue: serviceDetail.isBackUpLdc,
                              rules: [
                                { required: true, message: "请选择是否备份ldc" }
                              ]
                            })(
                              <Select>
                                <Option value="Y">是</Option>
                                <Option value="N">否</Option>
                                <Option value="Z">复用上级</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="是否多活架构">
                            {getFieldDecorator("isMultiActive", {
                              initialValue: serviceDetail.isMultiActive,
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
                                <Option value="Z">复用上级</Option>
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
                              initialValue: serviceDetail.fixLdcId,
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
                              initialValue: serviceDetail.unitType,
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
                    </Panel>
                    <Panel header="发布服务协议-协议URL模版" key="2">
                      <Protocol
                        form={form}
                        returnProtocol={protocolList => {
                          this.setState({ protocolList });
                        }}
                        protocolsSubmitList={serviceDetail.protocolsSubmitList}
                      />
                    </Panel>
                    <Panel header="更多配置" key="3">
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
                        queryAllModuleAndServiceUnit={querySgModuleCodeAndServiceUnitCodeList}
                        moduleCode={serviceDetail.moduleCode}
                        isAccessActiveChange={isAccessActiveConfig => {
                          this.setState({ isAccessActiveConfig });
                        }}
                        returnAccessInfoConfig={(whiteAccess, blackAccess) => {
                          this.setState({ whiteAccess, blackAccess });
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
                      <PolicyConfig 
                        fromPageType="service"
                        sentinelConfigZk={serviceDetail.sentinelConfigZk}
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
                      提交
                    </Button>
                    <Button onClick={this.toIndex}>取消</Button>
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
