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
import { querySgServiceApproveList, querySgSubmoduleBusinessConfigApproveList } from "../request/service";
import moment from "moment";
import "./../../../common/style/index.less";
import {
  Protocol,
  ServiceConcurrentControlPolicy,
  ServiceFlowControlPolicy,
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

class ServiceApproveDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      serviceDetail: {},
      subModuleConGroupList: [],
      subModuleFlowGroupList: []
    };
  }
  componentDidMount() {
    const { id } = this.props.location.state;
    this.queryServiceDeatil(id);
  }
  queryServiceDeatil = id => {
    let data = {
      sgServiceApproveVo: {
        id
      }
    };
    querySgServiceApproveList(data).then(res => {
      if (
        res.reply.returnCode.type === "S" &&
        res.reply.result.sgServiceApproveList.length > 0
      ) {
        let serviceDetail = res.reply.result.sgServiceApproveList[0]
        this.setState({
          serviceDetail
        });
        this.querySubModuleList(serviceDetail.subModuleCode)
      }
    });
  };

  querySubModuleList = subModuleCode => {
    let data = {
      sgSubmoduleBusinessConfigApproveVo: {
        subModuleCode
      }
    };
    querySgSubmoduleBusinessConfigApproveList(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        let subModule = res.reply.result.list[0];
        this.setState({
          subModuleConGroupList: subModule.concurrentControlPolicy.groupPolicyList,
          subModuleFlowGroupList: subModule.flowControlPolicy.groupPolicyList
        });
      }
    });
  };
  toIndex = () => {
    let path = {
			pathname: '/approve/service/index'
		};
		goToAndClose(path, "????????????");
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
            <TabPane tab="????????????" key="1">
              <div className="portlet-body">
                <Form>
                  <Collapse defaultActiveKey={["1"]}>
                    <Panel header="????????????" key="1">
                      <Row style={{ marginTop: 10 }}>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="????????????">
                            {getFieldDecorator("moduleCode", {
                              initialValue: serviceDetail.moduleCode,
                              rules: [
                                { required: true, message: "?????????????????????" }
                              ]
                            })(<Input disabled />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="??????????????????">
                            {getFieldDecorator("subModuleCode", {
                              initialValue: serviceDetail.subModuleCode,
                              rules: [
                                {
                                  required: true,
                                  message: "???????????????????????????"
                                }
                              ]
                            })(<Input disabled />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="?????????">
                            {getFieldDecorator("serviceCode", {
                              initialValue: serviceDetail.serviceCode,
                              rules: [
                                { required: true, message: "??????????????????" }
                              ]
                            })(<Input disabled />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="????????????">
                            {getFieldDecorator("serviceName", {
                              initialValue: serviceDetail.serviceName,
                              rules: [
                                { required: true, message: "?????????????????????" }
                              ]
                            })(<Input disabled />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="??????">
                            {getFieldDecorator("serviceVersion", {
                              initialValue: serviceDetail.serviceVersion || "1.0",
                              rules: [
                                { required: true, message: "???????????????" }
                              ]
                            })(<Input disabled />)}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="??????">
                            {getFieldDecorator("status", {
                              initialValue: serviceDetail.status || "0",
                              rules: [
                                { required: true, message: "???????????????" }
                              ]
                            })(
                              <Select disabled>
                                <Option value="0">??????</Option>
                                <Option value="1">??????</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="????????????">
                            {getFieldDecorator("onlineStatus", {
                              initialValue: serviceDetail.onlineStatus,
                              rules: [
                                { required: true, message: "?????????????????????" }
                              ]
                            })(
                              <Select disabled>
                                <Select.Option value="0">?????????</Select.Option>
                                <Select.Option value="1">?????????</Select.Option>
                                <Select.Option value="2">?????????</Select.Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="????????????">
                            {getFieldDecorator("publishDate", {
                              initialValue: moment(serviceDetail.publishDate),
                              rules: [
                                { required: true, message: "?????????????????????" }
                              ]
                            })(
                              <DatePicker disabled style={{ width: "100%" }} />
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="????????????">
                            {getFieldDecorator("readOrWrite", {
                              initialValue: serviceDetail.readOrWrite
                            })(
                              <Select disabled>
                                <Option value="0">?????????</Option>
                                <Option value="1">?????????</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="??????ldc">
                            {getFieldDecorator("isBackUpLdc", {
                              initialValue: serviceDetail.isBackUpLdc,
                              rules: [
                                { required: true, message: "?????????????????????ldc" }
                              ]
                            })(
                              <Select disabled>
                                <Option value="Y">???</Option>
                                <Option value="N">???</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem {...formItemLayout} label="??????????????????">
                            {getFieldDecorator("isMultiActive", {
                              initialValue: serviceDetail.isMultiActive,
                              rules: [
                                {
                                  required: true,
                                  message: "???????????????????????????"
                                }
                              ]
                            })(
                              <Select
                                disabled
                                onChange={val => {
                                  this.setState({ isMultiActive: val });
                                }}
                              >
                                <Option value="Y">???</Option>
                                <Option value="N">???</Option>
                                <Option value="Z">????????????</Option>
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
                          <FormItem {...formItemLayout} label="??????ldcId">
                            {getFieldDecorator("fixLdcId", {
                              initialValue: serviceDetail.fixLdcId,
                              rules: [
                                {
                                  required:
                                    serviceDetail.isMultiActive === "N"
                                      ? true
                                      : false,
                                  message: "???????????????ldcId"
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
                            label="???????????????????????????"
                          >
                            {getFieldDecorator("unitType", {
                              initialValue: serviceDetail.unitType,
                              rules: [
                                {
                                  required:
                                    serviceDetail.isMultiActive == "Y"
                                      ? true
                                      : false,
                                  message: "????????????????????????????????????"
                                }
                              ]
                            })(
                              <Select disabled>
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
                              initialValue: serviceDetail.changeType,
                              rules: [
                                { required: true, message: "?????????????????????" }
                              ]
                            })(
                              <Select disabled>
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
                              initialValue: serviceDetail.changeDescribe,
                              rules: [
                                { required: true, message: "?????????????????????	" }
                              ]
                            })(<Input.TextArea disabled />)}
                          </FormItem>
                        </Col>
                      </Row>
                    </Panel>
                    <Panel header="?????? ??????????????????-??????URL??????" key="2">
                      <Protocol
                        form={form}
                        disabled={true}
                        protocolsSubmitList={serviceDetail.protocolsSubmitList}
                      />
                    </Panel>
                    <Panel header="????????????" key="3">
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
                        moduleType="service"
                        form={form}
                        disabled={true}
                        accessInfoConfig={serviceDetail.accessInfoConfig}
                      />
                      <ServiceConcurrentControlPolicy
                        form={form}
                        disabled={true}
                        subModuleConGroupList={subModuleConGroupList}
                        concurrentControlPolicy={serviceDetail.concurrentControlPolicy}
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
export default Form.create()(ServiceApproveDetail);
