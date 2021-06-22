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
import { querySgModuleBusinessConfigList } from "../request/service";
import "./../../../common/style/index.less";
import moment from "moment";
import { Protocol, AccessInfoConfig, MultiActiveConfig } from "../../../../component/policy/index";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Option = Select.Option;
const Panel = Collapse.Panel;

class ModuleSgDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      moduleDetail: {}
    };
  }
  componentDidMount() {
    const { moduleId } = this.props.location.state;
    this.queryModuleDetail(moduleId);
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
          moduleDetail: res.reply.resultList[0]
        })
      }
    })
  }
  toIndex = () => {
    let path = {
			pathname: '/gateway/module/index'
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
    const { moduleDetail } = this.state;
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
                          <FormItem {...formItemLayout} label="备份ldc">
                            {getFieldDecorator("isBackUpLdc", {
                              initialValue: moduleDetail.isBackUpLdc,
                              rules: [
                                { required: true, message: "请选择是否备份ldc" }
                              ]
                            })(
                              <Select disabled>
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
                            })(<Input disabled />)}
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
                              disabled
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
                            moduleDetail.isMultiActive === "N"
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
                                  moduleDetail.isMultiActive === "N"
                                      ? true
                                      : false,
                                  message: "请选择所属ldcId"
                                }
                              ]
                            })(<Input disabled/>)}
                          </FormItem>
                        </Col>
                        <Col
                          span={12}
                          style={{
                            display:
                            moduleDetail.isMultiActive === "Y"
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
                                  moduleDetail.isMultiActive === "Y"
                                      ? true
                                      : false,
                                  message: "请选择多活架构下单元类型"
                                }
                              ]
                            })(
                              <Select disabled>
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
                      </Row>
                    </Form>
                  </Panel>
                  {/* <Panel header="添加 发布服务协议-协议URL模版" key="2">
                    <Protocol />
                  </Panel> */}
                  <Panel header="更多配置" key="3">
                    <MultiActiveConfig 
                      disabled={true}
                      moduleType="module"
                      form={this.props.form}
                      multiActiveConfig={moduleDetail.multiActiveConfig}
                    />
                    <AccessInfoConfig
                      form={this.props.form}
                      moduleType="module"
                      disabled={true}
                      accessInfoConfig={moduleDetail.accessInfoConfig}
                    />
                  </Panel>
                </Collapse>
                <Row type="flex">
                  <FormItem
                    wrappercol={{ span: 19, offset: 5 }}
                    style={{ marginTop: 18, marginLeft: 30 }}
                  >
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
export default Form.create()(ModuleSgDetail);
