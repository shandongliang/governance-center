import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Form,
  Tabs,
  Input,
  Select,
  Button,
  message,
  Spin,
  DatePicker,
  Collapse
} from "antd";
import Drawer from "../../../../component/drawer/drawer";
import {
  querySgModuleCommonConfigApproveList,
  querySgSubmoduleCommonConfigApproveList
} from "../../managerApprove/request/service";
import {
  queryEdaTopicApproveList,
  queryEdaTopicConsumerApproveList,
  queryEdaTopicProducerApproveList,
  createEdaTopicProducerRelationshipApprove,
  createEdaTopicSubscribeRelationshipApprove,
  getSequenceGenerator
} from "../../eventDrivenApprove/request/service";
import { getApproveCode } from "../request/common";
import TopicCreate from "../../eventDrivenApprove/topic/create";
import ConsumerCreate from "../../eventDrivenApprove/consumer/create";
import ProducerCreate from "../../eventDrivenApprove/producer/create";
import ModuleCreate from "../../managerApprove/module/create";
import SubModuleCreate from "../../managerApprove/subModule/create";
import { goTo, goToAndClose } from '../../../../util/tabRouter';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
class EventDrivenProfile extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      type: "producer",
      moduleCodeList: [],
      subModuleCodeList: [],
      consumerList: [],
      producerList: [],
      topicList: [],
      moduleDrawerVisible: false,
      subModuleDrawerVisible: false,
      topicDrawerVisible: false,
      consumerDrawerVisible: false,
      producerDrawerVisible: false,
      moduleCode: "",
      subModuleCode: "",
      subModuleDisabled: true,
      approveCode: ""
    };
  }

  async componentDidMount() {
    this.queryAllModule();
    this.queryAllTopic();
    let approveCode = await getApproveCode("EDA");
    this.setState({
      approveCode
    })
  }
  // ??????????????????
  queryAllModule = () => {
    let data = {
      sgModuleCommonConfigApproveVo: {
        page: {
          doPagination: false
        }
      }
    };
    querySgModuleCommonConfigApproveList(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        this.setState({
          moduleCodeList: res.reply.result.configList
        });
      }
    });
  };

  // ??????????????????????????????
  querySubModuleByModule = moduleCode => {
    let data = {
      sgSubmoduleCommonConfigApproveVo: {
        moduleCode,
        page: {
          doPagination: false
        }
      }
    };
    querySgSubmoduleCommonConfigApproveList(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        this.setState({
          subModuleCodeList: res.reply.result.list
        });
      }
    });
  };

  // ?????????????????????????????????
  queryConsumerBySubModule = submoduleId => {
    let data = {
      edaTopicConsumerApproveVo: {
        submoduleId,
        page: {
          doPagination: false
        }
      }
    };
    queryEdaTopicConsumerApproveList(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        this.setState({
          consumerList: res.reply.result.list.map(item=>{
            if(item.status === "Y"){
              return item;
            }
          })
        });
      }
    });
  };

  // ?????????????????????????????????
  queryProducerBySubModule = submoduleId => {
    let data = {
      edaTopicProducerApproveVo: {
        submoduleId,
        page: {
          doPagination: false
        }
      }
    };
    queryEdaTopicProducerApproveList(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        this.setState({
          producerList: res.reply.result.list.map(item=>{
            if(item.status === "Y"){
              return item;
            }
          })
        });
      }
    });
  };
  // ????????????
  moduleChange = val => {
    this.querySubModuleByModule(val);
    this.props.form.resetFields(["subModuleCode"]);
    this.state.moduleCodeList.forEach(item=>{
      if(item.moduleCode === val){
        this.props.form.setFieldsValue({
          principalPerson: item.leader
        });
      }
    })
    this.setState({
      subModuleDisabled: false,
      moduleCode: val
    });
  };

  // ??????????????????
  subModuleChange = async subModuleCode => {
    await this.queryConsumerBySubModule(subModuleCode);
    await this.queryProducerBySubModule(subModuleCode);
    await this.setState({
      subModuleCode
    });
    const { consumerList, producerList } = this.state;
    if(consumerList.length>0){
      this.props.form.setFieldsValue({
        consumerId: consumerList[0]
      })
    } else {
      this.props.form.setFieldsValue({
        consumerId: `${subModuleCode}Consumer`
      })
    }
    if(producerList.length>0){
      this.props.form.setFieldsValue({
        producerId: producerList[0]
      })
    } else {
      this.props.form.setFieldsValue({
        producerId: `${subModuleCode}Producer`
      })
    }
  };
  // ??????????????????
  queryAllTopic = () => {
    let data = {
      edaTopicApproveVo: {
        page: {
          doPagination: false
        }
      }
    };
    queryEdaTopicApproveList(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        this.setState({
          topicList: res.reply.result.list
        });
      }
    });
  };
  // ????????????
  returnTopic = async val => {
    await this.queryAllTopic();
    this.props.form.setFieldsValue({ topicName: val });
    this.setState({
      topicDrawerVisible: false
    });
  };
  // ???????????????
  returnConsumer = async val => {
    await this.props.queryConsumerBySubModule();
    this.props.form.setFieldsValue({ consumerId: val });
    this.setState({
      consumerDrawerVisible: false
    });
  };
  // ???????????????
  returnProducer = async val => {
    await this.queryProducerBySubModule();
    this.props.form.setFieldsValue({ producerId: val });
    this.setState({
      producerDrawerVisible: false
    });
  };

  // ????????????
  returnModule = async val => {
    await this.queryAllModule();
    this.props.form.setFieldsValue({ moduleCode: val });
    this.props.form.resetFields(["subModuleCode"]);
    this.querySubModuleByModule(val);
    this.setState({
      moduleCode: val.moduleCode,
      moduleDrawerVisible: false,
      subModuleDisabled: false
    });
  };

  // ??????????????????
  returnSubModule = async val => {
    await this.querySubModuleByModule(this.state.moduleCode);
    this.props.form.setFieldsValue({ subModuleCode: val });
    this.setState({
      subModuleDrawerVisible: false,
      subModuleDisabled: false
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {
          list: [
            {
              ...values,
              submoduleId: values.subModuleCode,
              createUserName: JSON.parse(
                sessionStorage.getItem("$pandora_auth.user_info")
              ).userId,
              publishDate: values.publishDate.format("YYYY-MM-DD"),
              approveCode: this.state.approveCode
            }
          ]
        };
        if(values.type === "producer"){
          createEdaTopicProducerRelationshipApprove(data).then(res => {
            if (res.reply.returnCode.type === "S") {
              message.info("????????????");
              this.toRelationship();
            } else {
              message.info("????????????");
            }
          });
        } else {
          createEdaTopicSubscribeRelationshipApprove(data).then(res => {
            if (res.reply.returnCode.type === "S") {
              message.info("????????????");
              this.toSubscribe();
            } else {
              message.info("????????????");
            }
          });
        }
      }
    });
  };

  //??????
  toRelationship = () => {
    let path = {
			pathname: '/eventDrivenApprove/edaTopicRelation/index'
		};
		goToAndClose(path, "???????????????????????????");
  };

  toSubscribe = () => {
    let path = {
			pathname: '/eventDrivenApprove/edaSubscribe/index'
		};
		goToAndClose(path, "??????????????????");
  };

  render() {
    const drawerWidth = document.body.clientWidth - 224;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    const { getFieldDecorator } = this.props.form;
    const {
      moduleCodeList,
      subModuleCodeList,
      topicList,
      consumerList,
      producerList,
      subModuleDisabled,
      moduleDrawerVisible,
      subModuleDrawerVisible,
      topicDrawerVisible,
      consumerDrawerVisible,
      producerDrawerVisible,
      subModuleCode,
      type,
      approveCode      
    } = this.state;
    return (
      <div>
        <div className="pandora-main-content">
          <div className="portlet-tab">
            <Drawer
              onClose={() => {
                this.setState({ moduleDrawerVisible: false });
              }}
              width={drawerWidth}
              visible={moduleDrawerVisible}
            >
              <ModuleCreate returnProfile={this.returnModule} approveCode={approveCode} />
            </Drawer>
            <Drawer
              onClose={() => {
                this.setState({ subModuleDrawerVisible: false });
              }}
              width={drawerWidth}
              visible={subModuleDrawerVisible}
            >
              <SubModuleCreate returnProfile={this.returnSubModule} approveCode={approveCode} />
            </Drawer>
            <Drawer
              onClose={() => {
                this.setState({ topicDrawerVisible: false });
              }}
              width={drawerWidth}
              visible={topicDrawerVisible}
            >
              <TopicCreate returnProfile={this.returnTopic} approveCode={approveCode} />
            </Drawer>
            <Drawer
              onClose={() => {
                this.setState({ consumerDrawerVisible: false });
              }}
              width={drawerWidth}
              visible={consumerDrawerVisible}
            >
              <ConsumerCreate returnProfile={this.returnConsumer} approveCode={approveCode} />
            </Drawer>
            <Drawer
              onClose={() => {
                this.setState({ producerDrawerVisible: false });
              }}
              width={drawerWidth}
              visible={producerDrawerVisible}
            >
              <ProducerCreate returnProfile={this.returnProducer} approveCode={approveCode} />
            </Drawer>
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="EDA????????????" key="1">
                <Form>
                  <Collapse  defaultActiveKey={["1", "2"]}>
                    <Panel forceRender={true} header="????????????" key="1">
                      <Row>
                        <Col span={11}>
                          <FormItem {...formItemLayout} label="????????????">
                            {getFieldDecorator("moduleCode", {
                              rules: [{ required: true }]
                            })(
                              <Select onChange={this.moduleChange} showSearch>
                                {moduleCodeList.map(item => (
                                  <Select.Option
                                    key={item.moduleId}
                                    value={item.moduleCode}
                                  >{`${item.moduleName}(${
                                    item.moduleCode
                                  })`}</Select.Option>
                                ))}
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={1}>
                          <Button
                            size="small"
                            icon="plus"
                            shape="circle"
                            className="plusBtn"
                            onClick={() => {
                              this.setState({ moduleDrawerVisible: true });
                            }}
                          />
                        </Col>
                        <Col span={11}>
                          <FormItem {...formItemLayout} label="????????????">
                            {getFieldDecorator("subModuleCode", {
                              rules: [{ required: true }]
                            })(
                              <Select onChange={this.subModuleChange} disabled={subModuleDisabled} showSearch>
                                {subModuleCodeList.map(item => (
                                  <Select.Option
                                    key={item.subModuleId}
                                    value={item.subModuleCode}
                                  >{`${item.subModuleName}(${
                                    item.subModuleCode
                                  })`}</Select.Option>
                                ))}
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={1}>
                          <Button
                            size="small"
                            icon="plus"
                            shape="circle"
                            className="plusBtn"
                            disabled={subModuleDisabled}
                            onClick={() => {
                              this.setState({ subModuleDrawerVisible: true });
                            }}
                          />
                        </Col>
                        <Col span={11}>
                          <FormItem {...formItemLayout} label="????????????">
                            {getFieldDecorator("type", {
                              initialValue: "producer",
                              rules: [{ required: true }]
                            })(
                              <Select
                                onChange={value => {
                                  this.setState({ type: value });
                                }}
                              >
                                <Select.Option value="producer">
                                  ??????
                                </Select.Option>
                                <Select.Option value="consumer">
                                  ??????
                                </Select.Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={11} offset={1}>
                          <FormItem label="???????????????" {...formItemLayout}>
                            {getFieldDecorator("publishDate", {
                              initialValue: null,
                              rules: [
                                {
                                  required: true,
                                  message: "?????????????????????"
                                }
                              ]
                            })(<DatePicker style={{ width: "100%" }} />)}
                          </FormItem>
                        </Col>
                      </Row>
                    </Panel>
                    <Panel forceRender={true}
                      header={
                        <span>
                          {type === "producer" ? "??????" : "??????"}
                          ??????
                        </span>
                      }
                      key="2"
                    >
                      <Row>
                        <Col span={11}>
                          <FormItem {...formItemLayout} label="??????">
                            {getFieldDecorator("topicName", {
                              rules: [{ required: true }]
                            })(
                              <Select showSearch>
                                {topicList.map(item => (
                                  <Select.Option
                                    key={item.id}
                                    value={item.topicName}
                                  >
                                    {item.topicName}
                                  </Select.Option>
                                ))}
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={1}>
                          <Button
                            size="small"
                            icon="plus"
                            shape="circle"
                            className="plusBtn"
                            onClick={() => {
                              this.setState({ topicDrawerVisible: true });
                            }}
                          />
                        </Col>
                        {type === "producer" ?null :<div
                          // style={{
                          //   display: type === "producer" ? "none" : "block"
                          // }}
                        >
                          <Col span={11} offset={1} >
                            <FormItem {...formItemLayout} label="????????????">
                              {getFieldDecorator("idempotent", {
                                rules: [{ required: true }]
                              })(
                                <Select>
                                  <Select.Option value="Y">???</Select.Option>
                                  <Select.Option value="N">???</Select.Option>
                                </Select>
                              )}
                            </FormItem>
                          </Col>
                          <Col span={11}>
                            <FormItem {...formItemLayout} label="??????????????????">
                              {getFieldDecorator("consumeMode", {
                                rules: [{ required: true }]
                              })(
                                <Select>
                                  <Select.Option value="earliest">
                                    ?????????????????????
                                  </Select.Option>
                                  <Select.Option value="latest">
                                    ?????????????????????
                                  </Select.Option>
                                </Select>
                              )}
                            </FormItem>
                          </Col>
                        </div>}
                        <Col span={11}>
                          <FormItem label="?????????" {...formItemLayout}>
                            {getFieldDecorator("principalPerson", {
                              initialValue: "",
                              rules: [
                                { required: true, message: "??????????????????" }
                              ]
                            })(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={11}>
                          <FormItem label="???????????????" {...formItemLayout}>
                            {getFieldDecorator("principalPersonMail", {
                              initialValue: "",
                              rules: [
                                {
                                  required: true,
                                  message: "????????????????????????"
                                }
                              ]
                            })(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={11} offset={1}>
                          <FormItem label="???????????????" {...formItemLayout}>
                            {getFieldDecorator("principalPersonPhone", {
                              initialValue: "",
                              rules: [
                                {
                                  required: true,
                                  message: "????????????????????????"
                                }
                              ]
                            })(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={11}>
                          <FormItem label="???????????????" {...formItemLayout}>
                            {getFieldDecorator("operateAndMaitenPerson", {
                              initialValue: "",
                              rules: [
                                {
                                  required: true,
                                  message: "????????????????????????"
                                }
                              ]
                            })(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={11} offset={1}>
                          <FormItem
                            label="?????????????????????  "
                            {...formItemLayout}
                          >
                            {getFieldDecorator("operateAndMaitenPersonPhone", {
                              initialValue: "",
                              rules: [
                                {
                                  required: true,
                                  message: "?????????????????????????????? "
                                }
                              ]
                            })(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={11}>
                          <FormItem label="????????????" {...formItemLayout}>
                            {getFieldDecorator("usageScenarios", {
                              initialValue: "",
                              rules: [
                                { required: true, message: "?????????????????????" }
                              ]
                            })(
                              <Input.TextArea
                                autosize={{ minRows: 2, maxRows: 6 }}
                              />
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                    </Panel>
                    <Panel forceRender={true} header="????????????" key="3">
                      <Row>
                        <Col span={11}>
                          {type === "producer" ? (
                            <FormItem label="???????????????" {...formItemLayout}>
                              {getFieldDecorator("producerId", {
                                initialValue: "",
                                rules: [
                                  {
                                    required: true,
                                    message: "???????????????????????? "
                                  }
                                ]
                              })(
                                <Select disabled={!subModuleCode} showSearch>
                                  {producerList.map(item => (
                                    <Select.Option
                                      key={item.id}
                                      value={item.producerId}
                                    >
                                      {item.producerId}
                                    </Select.Option>
                                  ))}
                                </Select>
                              )}
                            </FormItem>
                          ) : (
                            <FormItem label="???????????????" {...formItemLayout}>
                              {getFieldDecorator("consumerId", {
                                initialValue: "",
                                rules: [
                                  {
                                    required: true,
                                    message: "???????????????????????? "
                                  }
                                ]
                              })(
                                <Select disabled={!subModuleCode} showSearch>
                                  {consumerList.map(item => (
                                    <Select.Option
                                      key={item.id}
                                      value={item.consumerId}
                                    >
                                      {item.consumerId}
                                    </Select.Option>
                                  ))}
                                </Select>
                              )}
                            </FormItem>
                          )}
                        </Col>
                        <Col span={1}>
                          <Button
                            size="small"
                            icon="plus"
                            shape="circle"
                            className="plusBtn"
                            disabled={!subModuleCode}
                            onClick={() => {
                              if (type === "producer") {
                                this.setState({
                                  producerDrawerVisible: true
                                });
                              } else {
                                this.setState({
                                  consumerDrawerVisible: true
                                });
                              }
                            }}
                          />
                        </Col>
                        <Col span={11}>
                          {type === "producer" ? (
                            <FormItem label="???????????????" {...formItemLayout}>
                              {getFieldDecorator("producerType", {
                                initialValue: ""
                                // rules: [{ required: true, message: "?????????????????????" }]
                              })(<Input />)}
                            </FormItem>
                          ) : (
                            <FormItem label="???????????????" {...formItemLayout}>
                              {getFieldDecorator("consumerType", {
                                initialValue: ""
                                // rules: [{ required: true, message: "?????????????????????" }]
                              })(<Input />)}
                            </FormItem>
                          )}
                        </Col>
                      </Row>
                    </Panel>
                  </Collapse>
                </Form>
              </TabPane>
            </Tabs>
            <Row type="flex" justify="center">
              <Col span={24}>
                <Button size="large" type="primary" onClick={this.handleSubmit}>
                  ??????
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
export default (EventDrivenProfile = Form.create()(EventDrivenProfile));
