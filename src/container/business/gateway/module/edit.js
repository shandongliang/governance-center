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
import { querySgModuleBusinessConfigList, queryLDCList, editSgModuleBusinessConfig, querySgModuleCodeAndServiceUnitCodeList } from "../request/service";
import { queryAllModuleAndSubmodule } from "../request/common";
import "./../../../common/style/index.less";
import moment from "moment";
import { Protocol, AccessInfoConfig, MultiActiveConfig } from "../../../../component/policy/index";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Option = Select.Option;
const Panel = Collapse.Panel;

class ModuleSgEdit extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isMultiActive: "",
      moduleDetail: {},
      ldcList: [],
      blackAccess: [],
      whiteAccess: [],
      allModuleAndSubModule: [],
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
      sgModuleBusinessConfigVo: {
        moduleId
      }
    };
    querySgModuleBusinessConfigList(data).then(res=>{
      if(res.reply.returnCode.type === "S" && res.reply.resultList.length>0){
        this.setState({
          moduleDetail: res.reply.resultList[0],
          isMultiActive: res.reply.resultList[0].isMultiActive
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
          updateUserName: JSON.parse(sessionStorage.getItem("$pandora_auth.user_info")).userId,
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
        editSgModuleBusinessConfig(data).then(res => {
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
  toIndex = () => {
    let path = {
			pathname: '/gateway/module/index'
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
                      </Row>
                    </Form>
                  </Panel>
                  {/* <Panel header="?????? ??????????????????-??????URL??????" key="2">
                    <Protocol />
                  </Panel> */}
                  <Panel header="????????????" key="3">
                    <MultiActiveConfig 
                      form={this.props.form}
                      moduleType="module"
                      multiActiveConfig={moduleDetail.multiActiveConfig}
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
                      accessInfoConfig={moduleDetail.accessInfoConfig}
                      queryAllModuleAndServiceUnit={querySgModuleCodeAndServiceUnitCodeList}
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
export default Form.create()(ModuleSgEdit);
