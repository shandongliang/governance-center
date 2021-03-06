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
		goToAndClose(path, "????????????");
  };
  // getProtocol = values => {
  //   const { protocolList } = this.state;
  //   if (protocolList.length === 0) {
  //     message.warning("??????????????????????????????");
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
  //         message.error("??????????????????????????????!");
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
          //????????????
          this.setState({
            loading: false
          });
          if (res.reply.returnCode.type == "S") {
            const resultMessage = res.reply.result.resultList.length > 0 ? res.reply.result.resultList[0].result : "S"
            if(resultMessage !== "S"){
              Modal.error({
                title: "????????????",
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
            message.info("????????????");
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
            <TabPane tab="????????????" key="1">
              <div className="portlet-body">
                <Form>
                  <Collapse defaultActiveKey={["1", "2"]}>
                    <Panel header="????????????" key="1">
                      <Row style={{ marginTop: 10 }}>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="????????????">
                            {getFieldDecorator("moduleCode", {
                              initialValue: this.props.moduleCode,
                              rules: [
                                { required: true, message: "?????????????????????" }
                              ]
                            })(<Input disabled={Boolean(this.props.moduleCode)} />)}
                          </FormItem>
                        </Col>
                        {/* <Col span={12}>
                          <FormItem {...formItemLayout} label="????????????">
                            {getFieldDecorator("onlineStatus", {
                              rules: [
                                { required: true, message: "?????????????????????" }
                              ]
                            })(
                              <Select>
                                <Select.Option value="0">?????????</Select.Option>
                                <Select.Option value="1">?????????</Select.Option>
                                <Select.Option value="2">?????????</Select.Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col> */}
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="????????????">
                            {getFieldDecorator("publishDate", {
                              rules: [
                                { required: true, message: "?????????????????????" }
                              ]
                            })(<DatePicker style={{ width: "100%" }} />)}
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
                          <FormItem {...formItemLayout} label="??????uri">
                            {getFieldDecorator("checkUri", {
                              rules: [
                                { required: true, message: "???????????????uri" }
                              ]
                            })(<Input />)}
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
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="????????????">
                            {getFieldDecorator("changeType", {
                              initialValue: "00",
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
                              initialValue: "",
                              rules: [
                                { required: true, message: "?????????????????????	" }
                              ]
                            })(<Input.TextArea />)}
                          </FormItem>
                        </Col>
                      </Row>
                    </Panel>
                    {/* <Panel header="?????? ??????????????????-??????URL??????" key="2">
                      <Protocol
                        form={form}
                        returnProtocol={protocolList => {
                          this.setState({ protocolList });
                        }}
                      />
                    </Panel> */}
                    <Panel header="????????????" key="3">
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
                      ??????
                    </Button>
                    {this.props.returnProfile?null:<Button
                      onClick={this.toIndex}
                    >
                      ??????
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
