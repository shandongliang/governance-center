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
import { querySgSubmoduleBusinessConfigApproveList } from "../request/service";
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

class SubModuleApproveDetail extends React.Component {
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
    const { subModuleId } = this.props.location.state;
    this.querySubModuleDetail(subModuleId);
  }
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
        this.setState({
          subModuleDetail: res.reply.result.list[0]
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
                              initialValue: subModuleDetail.moduleCode,
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
                          <FormItem {...formItemLayout} label="上线状态">
                            {getFieldDecorator("onlineStatus", {
                              initialValue: subModuleDetail.onlineStatus,
                              rules: [
                                { required: true, message: "请选择上线状态" }
                              ]
                            })(
                              <Select disabled>
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
                            })(
                              <DatePicker style={{ width: "100%" }} disabled />
                            )}
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
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="修改类型">
                            {getFieldDecorator("changeType", {
                              initialValue: subModuleDetail.changeType,
                              rules: [
                                { required: true, message: "请选择修改类型" }
                              ]
                            })(
                              <Select disabled>
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
                            })(<Input.TextArea disabled />)}
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
export default Form.create()(SubModuleApproveDetail);
