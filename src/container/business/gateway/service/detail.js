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
import { querySgServiceList, querySgSubmoduleBusinessConfigList } from "../request/service";
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

class ServiceSgDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      serviceDetail: {},
      subModuleConGroupList: [],
      subModuleFlowGroupList: [],
      sentinelConfigZk: {}
    };
  }
  componentDidMount() {
    const { id } = this.props.location.state;
    this.queryServiceDeatil(id);
  }
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
        this.querySubModuleList(serviceDetail.subModuleCode)
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
          subModuleConGroupList: subModule.concurrentControlPolicy.groupPolicyList,
          subModuleFlowGroupList: subModule.flowControlPolicy.groupPolicyList
        });sisiwi
      }
    });
  };
  toIndex = () => {
    let path = {
			pathname: '/gateway/service/index'
		};
		goToAndClose(path, "服务查询");
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { serviceDetail, subModuleConGroupList, subModuleFlowGroupList } = this.state;
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
                            })(<Input disabled />)}
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
                              <Select disabled>
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
                              <Select disabled>
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
                              <Select disabled>
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
                              serviceDetail.isMultiActive === "N"
                                ? "block"
                                : "none"
                          }}
                        >
                          <FormItem {...formItemLayout} label="所属ldcId">
                            {getFieldDecorator("fixLdcId", {
                              initialValue: serviceDetail.fixLdcId,
                              rules: [
                                {
                                  required:
                                    serviceDetail.isMultiActive === "N"
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
                              serviceDetail.isMultiActive === "Y"
                                ? "block"
                                : "none"
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
                                  required:
                                    serviceDetail.isMultiActive == "Y"
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
                    <Panel header="发布服务协议-协议URL模版" key="2">
                      <Protocol
                        form={form}
                        disabled={true}
                        protocolsSubmitList={
                          serviceDetail.protocolsSubmitList
                        }
                      />
                    </Panel>
                    <Panel header="更多配置" key="3">
                      <MultiActivePolicy
                        form={form}
                        disabled={true}
                        multiActivePolicy={serviceDetail.multiActivePolicy}
                        isMultiActive={serviceDetail.isMultiActive}
                      />
                      <MultiActiveConfig 
                        disabled={true}
                        form={this.props.form}
                        multiActiveConfig={serviceDetail.multiActiveConfig}
                      />
                      <AccessInfoConfig
                        form={form}
                        moduleType="service"
                        disabled={true}
                        accessInfoConfig={serviceDetail.accessInfoConfig}
                      />
                      <ServiceConcurrentControlPolicy
                        form={form}
                        disabled={true}
                        subModuleConGroupList={subModuleConGroupList}
                        concurrentControlPolicy={
                          serviceDetail.concurrentControlPolicy
                        }
                      />
                      <ServiceFlowControlPolicy
                        form={form}
                        disabled={true}
                        subModuleFlowGroupList={subModuleFlowGroupList}
                        flowControlPolicy={serviceDetail.flowControlPolicy}
                      />
                      <LoadBalancePolicy
                        form={form}
                        disabled={true}
                        loadBalancePolicy={serviceDetail.loadBalancePolicy}
                      />
                      <PolicyConfig 
                        disabled={true}
                        fromPageType="service"
                        sentinelConfigZk={serviceDetail.sentinelConfigZk}
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
export default Form.create()(ServiceSgDetail);
