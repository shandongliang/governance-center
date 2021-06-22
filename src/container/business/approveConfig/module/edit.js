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
          //返回信息
          this.setState({
            loading: false
          });
          if (res.reply.returnCode.type == "S") {
            this.toIndex();
          } else {
            message.info("创建失败");
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
		goToAndClose(path, "模块查询");
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
            <TabPane tab="创建模块" key="1">
              <div className="portlet-body">
                <Collapse defaultActiveKey={['1','2']}>
                  <Panel header="基础配置" key="1">
                    <Form>
                      <Row style={{ marginTop: 10 }}>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="模块编码">
                            {getFieldDecorator("moduleCode", {
                              initialValue: moduleDetail.moduleCode,
                              rules: [
                                { required: true, message: "请输入模块编码" }
                              ]
                            })(<Input disabled />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                    <FormItem {...formItemLayout} label="上线状态">
                      {getFieldDecorator("onlineStatus", {
                        initialValue: moduleDetail.onlineStatus,
                        rules: [{ required: true, message: "请选择上线状态" }]
                      })(<Select>
                          <Select.Option value="0">未上线</Select.Option>
                          <Select.Option value="1">上线中</Select.Option>
                          <Select.Option value="2">已上线</Select.Option>
                        </Select>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="上线日期">
                      {getFieldDecorator("publishDate", {
                        initialValue: moment(moduleDetail.publishDate),
                        rules: [{ required: true, message: "请选择上线日期" }]
                      })(<DatePicker  style={{width: "100%"}}/>)}
                    </FormItem>
                  </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="备份ldc">
                            {getFieldDecorator("isBackUpLdc", {
                              initialValue: moduleDetail.isBackUpLdc,
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
                              initialValue: moduleDetail.checkUri,
                              rules: [
                                { required: true, message: "请输入探活uri" }
                              ]
                            })(<Input/>)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="是否多活架构">
                            {getFieldDecorator("isMultiActive", {
                              initialValue: moduleDetail.isMultiActive,
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
                            display:
                              isMultiActive === "N"
                                ? "block"
                                : "none"
                          }}
                        >
                          <FormItem {...formItemLayout} label="所属ldcId">
                            {getFieldDecorator("fixLdcId", {
                              initialValue: moduleDetail.fixLdcId,
                              rules: [
                                {
                                  required:
                                    isMultiActive === "N"
                                      ? true
                                      : false,
                                  message: "请选择所属ldcId"
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
                            label="多活架构下单元类型"
                          >
                            {getFieldDecorator("unitType", {
                              initialValue: moduleDetail.unitType,
                              rules: [
                                {
                                  required:
                                    isMultiActive == "Y"
                                      ? true
                                      : false,
                                  message: "请选择多活架构下单元类型"
                                }
                              ]
                            })(
                              <Select >
                                <Option value="0">互备模式</Option>
                                <Option value="1">机房负载模式</Option>
                                <Option value="2">广播模式</Option>
                                <Option value="3">
                                  分区单元
                                </Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                    <FormItem {...formItemLayout} label="修改类型">
                      {getFieldDecorator("changeType", {
                        initialValue: moduleDetail.changeType,
                        rules: [{ required: true, message: "请选择修改类型" }]
                      })(<Select>
                          <Select.Option value="00">增加</Select.Option>
                          <Select.Option value="01">删除</Select.Option>
                          <Select.Option value="10">修改</Select.Option>
                        </Select>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="修改描述">
                      {getFieldDecorator("changeDescribe", {
                        initialValue: moduleDetail.changeDescribe,
                        rules: [{ required: true, message: "请输入修改描述	" }]
                      })(<Input.TextArea/>)}
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
export default Form.create()(ModuleApproveEdit);
