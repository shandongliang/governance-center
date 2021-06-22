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
  querySgSubmoduleBusinessConfigApproveList,
  queryLDCList,
  editSgSubmoduleBusinessConfigApprove
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
  AccessInfoConfig
} from "../../../../component/policy/index";
import { goTo, goToAndClose } from '../../../../util/tabRouter';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Option = Select.Option;
const Panel = Collapse.Panel;

class SubModuleApproveEdit extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      allModuleAndSubModule: [],
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
      isAccessActiveConfig: true
    };
  }
  async componentDidMount() {
    const { subModuleId } = this.props.location.state;
    this.querySubModuleDetail(subModuleId);
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
  querySubModuleDetail = subModuleId => {
    let data = {
      sgSubmoduleBusinessConfigApproveVo: {
        id: subModuleId
      }
    };
    querySgSubmoduleBusinessConfigApproveList(data).then(res => {
      if (
        res.reply.returnCode.type === "S" &&
        res.reply.result.list.length > 0
      ) {
        let subModuleDetail = res.reply.result.list[0];
        this.setState({
          subModuleDetail: res.reply.result.list[0],
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
        //   message.warning("请至少配置一条协议！");
        //   return;
        // }
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
        let loadBalancePolicy = this.getLoadBalancePolicy(values);
        let multiActiveConfig = this.getMultiActiveConfig(values);
        let param = {
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
          publishDate: values.publishDate.format("YYYY-MM-DD"),
          updUserName: JSON.parse(
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
        editSgSubmoduleBusinessConfigApprove(data).then(res => {
          //返回信息
          this.setState({
            loading: false
          });
          if (res.reply.returnCode.type == "S") {
            const resultMessage = res.reply.result.approveResultList.length > 0 ? res.reply.result.approveResultList[0].result : "S"
            if(resultMessage !== "S"){
              Modal.error({
                title: "异常信息",
                content: resultMessage
              });
              return;
            }
            message.info("编辑成功");
            this.toIndex();
          } else {
            message.info("编辑失败");
          }
        });
      }
    });
  };
  toIndex = () => {
    let path = {
			pathname: '/approve/subModule/index'
		};
		goToAndClose(path, "服务单元查询");
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

  render() {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { subModuleDetail, ldcList, isMultiActive, allModuleAndSubModule } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="编辑服务单元" key="1">
              <div className="portlet-body">
                <Form>
                  <Collapse defaultActiveKey={["1"]}>
                    <Panel header="基础配置" key="1">
                      <Row style={{ marginTop: 10 }}>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="模块编码">
                            {getFieldDecorator("moduleCode", {
                              initialValue: subModuleDetail.moduleCode,
                              rules: [
                                { required: true, message: "请输入模块编码" }
                              ]
                            })(<Input disabled />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="服务单元编码">
                            {getFieldDecorator("subModuleCode", {
                              initialValue: subModuleDetail.subModuleCode,
                              rules: [
                                {
                                  required: true,
                                  message: "请输入服务单元编码"
                                }
                              ]
                            })(<Input disabled />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="上线状态">
                            {getFieldDecorator("onlineStatus", {
                              initialValue: subModuleDetail.onlineStatus,
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
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="上线日期">
                            {getFieldDecorator("publishDate", {
                              initialValue: moment(subModuleDetail.publishDate),
                              rules: [
                                { required: true, message: "请选择上线日期" }
                              ]
                            })(<DatePicker style={{ width: "100%" }} />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="备份ldc">
                            {getFieldDecorator("isBackUpLdc", {
                              initialValue: subModuleDetail.isBackUpLdc,
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
                              initialValue: subModuleDetail.checkUri,
                              rules: [
                                { required: true, message: "请输入探活uri" }
                              ]
                            })(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="是否多活架构">
                            {getFieldDecorator("isMultiActive", {
                              initialValue: subModuleDetail.isMultiActive,
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
                              initialValue: subModuleDetail.fixLdcId,
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
                              initialValue: subModuleDetail.unitType,
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
                              initialValue: subModuleDetail.changeType,
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
                              initialValue: subModuleDetail.changeDescribe,
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
                        protocolsSubmitList={
                          subModuleDetail.protocolsSubmitList
                        }
                        returnProtocol={protocolList => {
                          this.setState({ protocolList });
                        }}
                      />
                    </Panel> */}
                    <Panel header="更多配置" key="3">
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
                        allModuleAndSubModule={allModuleAndSubModule}
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
                    </Panel>
                  </Collapse>
                </Form>
                <Row type="flex">
                  <FormItem
                    wrappercol={{ span: 19, offset: 5 }}
                    style={{ marginTop: 18, marginLeft: 30 }}
                  >
                    <Button type="primary" onClick={this.handleSubmit}>提交</Button>
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
export default Form.create()(SubModuleApproveEdit);
