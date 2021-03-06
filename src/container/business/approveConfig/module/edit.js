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
import { querySgModuleBusinessConfigApproveList, queryLDCList, editSgModuleBusinessConfigApprove } from "../request/service";
import "./../../../common/style/index.less";
import moment from "moment";
import { Protocol, AccessInfoConfig, MultiActiveConfig } from "../../../../component/policy/index";
import { goTo, goToAndClose } from '../../../../util/tabRouter';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Option = Select.Option;
const Panel = Collapse.Panel;

class ModuleApproveEdit extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isMultiActive: "",
      moduleDetail: {},
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
    const { moduleId } = this.props.location.state;
    this.queryModuleDetail(moduleId);
    this.queryLDC();
    let allModuleAndSubModule = await queryAllModuleAndSubmodule();
    this.setState({
      allModuleAndSubModule
    });
  }
  queryLDC = () => {
    queryLDCList().then(res=>{
      if(res.reply.returnCode.type === "S"){
        let ldcList = res.reply.result.map(item=>{
          return item.ldcId
        })
        this.setState({
          ldcList
        })
      }
    })
  }
  queryModuleDetail = moduleId => {
    let data = {
      sgModuleBusinessConfigApproveVo: {
        moduleId
      }
    };
    querySgModuleBusinessConfigApproveList(data).then(res=>{
      if(res.reply.returnCode.type === "S" && res.reply.result.resultList.length>0){
        this.setState({
          moduleDetail: res.reply.result.resultList[0],
          isMultiActive: res.reply.result.resultList[0].isMultiActive
        })
      }
    })
  }
  handleSubmit = e => {
    
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let accessInfoConfig = this.getAccessInfoConfig(values);
        let multiActiveConfig = this.getMultiActiveConfig(values);
        let param = {
          ...this.state.moduleDetail,
          ...values,
          accessInfoConfig,
          multiActiveConfig,
          publishDate: values.publishDate.format("YYYY-MM-DD"),
          updateUserName: JSON.parse(sessionStorage.getItem("$pandora_auth.user_info")).userId,
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
        editSgModuleBusinessConfigApprove(data).then(res => {
          //????????????
          this.setState({
            loading: false
          });
          if (res.reply.returnCode.type == "S") {
            this.toIndex();
          } else {
            message.info("????????????");
          }
        });
      }
    });
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
  toIndex = () => {
    let path = {
			pathname: '/approve/module/index'
		};
		goToAndClose(path, "????????????");
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
    const { moduleDetail, ldcList, isMultiActive, allModuleAndSubModule } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="????????????" key="1">
              <div className="portlet-body">
                <Collapse defaultActiveKey={['1','2']}>
                  <Panel header="????????????" key="1">
                    <Form>
                      <Row style={{ marginTop: 10 }}>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="????????????">
                            {getFieldDecorator("moduleCode", {
                              initialValue: moduleDetail.moduleCode,
                              rules: [
                                { required: true, message: "?????????????????????" }
                              ]
                            })(<Input disabled />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                    <FormItem {...formItemLayout} label="????????????">
                      {getFieldDecorator("onlineStatus", {
                        initialValue: moduleDetail.onlineStatus,
                        rules: [{ required: true, message: "?????????????????????" }]
                      })(<Select>
                          <Select.Option value="0">?????????</Select.Option>
                          <Select.Option value="1">?????????</Select.Option>
                          <Select.Option value="2">?????????</Select.Option>
                        </Select>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="????????????">
                      {getFieldDecorator("publishDate", {
                        initialValue: moment(moduleDetail.publishDate),
                        rules: [{ required: true, message: "?????????????????????" }]
                      })(<DatePicker  style={{width: "100%"}}/>)}
                    </FormItem>
                  </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="??????ldc">
                            {getFieldDecorator("isBackUpLdc", {
                              initialValue: moduleDetail.isBackUpLdc,
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
                              initialValue: moduleDetail.checkUri,
                              rules: [
                                { required: true, message: "???????????????uri" }
                              ]
                            })(<Input/>)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="??????????????????">
                            {getFieldDecorator("isMultiActive", {
                              initialValue: moduleDetail.isMultiActive,
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
                            display:
                              isMultiActive === "N"
                                ? "block"
                                : "none"
                          }}
                        >
                          <FormItem {...formItemLayout} label="??????ldcId">
                            {getFieldDecorator("fixLdcId", {
                              initialValue: moduleDetail.fixLdcId,
                              rules: [
                                {
                                  required:
                                    isMultiActive === "N"
                                      ? true
                                      : false,
                                  message: "???????????????ldcId"
                                }
                              ]
                            })(<Select>
                              {ldcList.map(item=>(
                                <Option value={item} key={item}>{item}</Option>
                              ))}
                            </Select>)}
                          </FormItem>
                        </Col>
                        <Col
                          span={12}
                          style={{
                            display:
                              isMultiActive === "Y"
                                ? "block"
                                : "none"
                          }}
                        >
                          <FormItem
                            {...formItemLayout}
                            label="???????????????????????????"
                          >
                            {getFieldDecorator("unitType", {
                              initialValue: moduleDetail.unitType,
                              rules: [
                                {
                                  required:
                                    isMultiActive == "Y"
                                      ? true
                                      : false,
                                  message: "????????????????????????????????????"
                                }
                              ]
                            })(
                              <Select >
                                <Option value="0">????????????</Option>
                                <Option value="1">??????????????????</Option>
                                <Option value="2">????????????</Option>
                                <Option value="3">
                                  ????????????
                                </Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                    <FormItem {...formItemLayout} label="????????????">
                      {getFieldDecorator("changeType", {
                        initialValue: moduleDetail.changeType,
                        rules: [{ required: true, message: "?????????????????????" }]
                      })(<Select>
                          <Select.Option value="00">??????</Select.Option>
                          <Select.Option value="01">??????</Select.Option>
                          <Select.Option value="10">??????</Select.Option>
                        </Select>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="????????????">
                      {getFieldDecorator("changeDescribe", {
                        initialValue: moduleDetail.changeDescribe,
                        rules: [{ required: true, message: "?????????????????????	" }]
                      })(<Input.TextArea/>)}
                    </FormItem>
                  </Col>
                      </Row>
                    </Form>
                  </Panel>
                  {/* <Panel header="?????? ??????????????????-??????URL??????" key="2">
                    <Protocol />
                  </Panel> */}
                  <Panel header="????????????" key="3">
                    <MultiActiveConfig 
                      moduleType="module"
                      form={this.props.form}
                      multiActiveConfig={moduleDetail.multiActiveConfig}
                      returnMultiActiveConfig={registryGroupList => {
                        this.setState({ registryGroupList });
                      }}
                      isMultiActiveChange={isMultiActiveConfig => {
                        this.setState({ isMultiActiveConfig });
                      }}
                    />
                    <AccessInfoConfig
                      moduleType="module"
                      form={this.props.form}
                      accessInfoConfig={moduleDetail.accessInfoConfig}
                      allModuleAndSubModule={allModuleAndSubModule}
                      moduleCode={moduleDetail.moduleCode}
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
                      ??????
                    </Button>
                    <Button
                      onClick={this.toIndex}
                      className="cancelBtn"
                      style={buttonStyle}
                    >
                      ??????
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
export default Form.create()(ModuleApproveEdit);
