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
import { querySgSubmoduleBusinessConfigList } from "../request/service";
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

class SubModuleSgDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      subModuleDetail: {}
    };
  }
  componentDidMount() {
    const { id } = this.props.location.state;
    this.querySubModuleDetail(id);
  }
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
        this.setState({
          subModuleDetail: res.reply.result.list[0],
          sentinelConfigZk: res.reply.result.list[0].sentinelConfigZk
        });
      }
    });
  };
  toIndex = () => {
    let path = {
			pathname: '/gateway/subModule/index'
		};
		goToAndClose(path, "服务单元查询");
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { subModuleDetail } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="创建模块" key="1">
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
                                  message: "请输入服务员单元编码"
                                }
                              ]
                            })(<Input disabled />)}
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
                              initialValue: subModuleDetail.checkUri,
                              rules: [
                                { required: true, message: "请输入探活uri" }
                              ]
                            })(<Input disabled />)}
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
                                disabled
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
                            display:
                              subModuleDetail.isMultiActive === "N"
                                ? "block"
                                : "none"
                          }}
                        >
                          <FormItem {...formItemLayout} label="所属ldcId">
                            {getFieldDecorator("fixLdcId", {
                              initialValue: subModuleDetail.fixLdcId,
                              rules: [
                                {
                                  required:
                                    subModuleDetail.isMultiActive === "N"
                                      ? true
                                      : false,
                                  message: "请选择所属ldcId"
                                }
                              ]
                            })(<Input disabled />)}
                          </FormItem>
                        </Col>
                        <Col
                          span={12}
                          style={{
                            display:
                              subModuleDetail.isMultiActive === "Y"
                                ? "block"
                                : "none"
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
                                  required:
                                    subModuleDetail.isMultiActive == "Y"
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
                                <Option value="3">分区单元</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                    </Panel>
                    {/* <Panel header="添加 发布服务协议-协议URL模版" key="2">
                      <Protocol
                        form={form}
                        disabled={true}
                        protocolsSubmitList={
                          subModuleDetail.protocolsSubmitList
                        }
                      />
                    </Panel> */}
                    <Panel header="更多配置" key="3">
                      <MultiActivePolicy
                        form={form}
                        disabled={true}
                        multiActivePolicy={subModuleDetail.multiActivePolicy}
                        isMultiActive={subModuleDetail.isMultiActive}
                      />
                      <MultiActiveConfig 
                        disabled={true}
                        form={this.props.form}
                        multiActiveConfig={subModuleDetail.multiActiveConfig}
                      />
                      <AccessInfoConfig
                        form={form}
                        disabled={true}
                        accessInfoConfig={subModuleDetail.accessInfoConfig}
                      />
                      <SubModuleConcurrentControlPolicy
                        form={form}
                        disabled={true}
                        concurrentControlPolicy={
                          subModuleDetail.concurrentControlPolicy
                        }
                      />
                      <SubModuleFlowControlPolicy
                        form={form}
                        disabled={true}
                        flowControlPolicy={subModuleDetail.flowControlPolicy}
                      />
                      <LoadBalancePolicy
                        form={form}
                        disabled={true}
                        loadBalancePolicy={subModuleDetail.loadBalancePolicy}
                      />
                      <PolicyConfig 
                        sentinelConfigZk={subModuleDetail.sentinelConfigZk}
                        disabled={true}
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
                      onClick={this.toIndex}
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
export default Form.create()(SubModuleSgDetail);
