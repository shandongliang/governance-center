import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Select,
  message,
  Tabs,
  Modal,
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Collapse
} from "antd";
import SelectSubModule from "../../../../component/selectSubModule/selectCommonSubModule";
import {
  createEdaTopic,
  queryEdaMiddlewareList
} from "../request/service";
import { randomNamber } from '../../../../util/publicFuc';
import "./../../../common/style/index.less";
import moment from "moment";
import { goTo, goToAndClose } from '../../../../util/tabRouter';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Panel = Collapse.Panel;

class TopicCreate extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor() {
    super();
    this.state = {
      submoduleId: "",
      clusterList: []
    };
  }

  componentDidMount() {
    this.queryCluster()
  }
  //查询集群
  queryCluster = () => {
    let data = {
      reqSeqNo: randomNamber(),
      paginator: {
        doPagination: false
      }
    };
    queryEdaMiddlewareList(data).then(res => {
      let clusterList = [];
      let defaultCluster = "";
      if (res.reply.returnCode.type === "S") {
        let edaMiddlewareList = res.reply.queryMiddlewareList.edaMiddlewareList;
        for (let i = 0; i < edaMiddlewareList.length; i++) {
          clusterList.push(edaMiddlewareList[i].middlewareEngName);
          if(edaMiddlewareList[i].isDefaultMiddleware){
            defaultCluster = edaMiddlewareList[i].middlewareEngName;
          }
        }
      }
      this.setState({
        clusterList
      }, () => {
        this.props.form.setFieldsValue({
          clusterId: defaultCluster
        });
      });
    });
  };
  //返回
  toIndex = () => {
    let path = {
      pathname: "/eventDriven/topic/index"
    };
    goToAndClose(path, "主题查询");
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });
        const { submoduleId } = this.state;
        let data = {
          list: [
            {
              ...values,
              submoduleId,
              topicName: `${submoduleId}${values.topicName}`,
              createUserId: JSON.parse(
                sessionStorage.getItem("$pandora_auth.user_info")
              ).userId
            }
          ]
        };
        createEdaTopic(data).then(res => {
          //返回信息
          this.setState({
            loading: false
          });
          if (res.reply.returnCode.type === "S") {
            message.info("创建成功");
            this.toIndex();
          } else {
            message.info("创建失败");
          }
        });
      }
    });
  };

  onChildQuery = submoduleId => {
    this.setState({
      submoduleId
    });
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
    const { clusterList, submoduleId } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="创建主题" key="1">
              <SelectSubModule callbackParent={this.onChildQuery} />
              <Form>
                <Collapse defaultActiveKey={["1"]}>
                  <Panel header="基础配置" key="1">
                    <Row style={{ marginTop: 10 }}>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="主题名称">
                          {getFieldDecorator("topicName", {
                            rules: [{ required: true, message: "请输入主题名称" }]
                          })(<Input addonBefore={submoduleId} />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="集群名称">
                          {getFieldDecorator("clusterId", {
                            rules: [{ required: true, message: "请选择集群名称" }]
                          })(
                            <Select>
                              {clusterList.map(item => (
                                <Select.Option key={item} value={item}>{item}</Select.Option>
                              ))}
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="消息类型">
                          {getFieldDecorator("messageType", {
                            initialValue: "N",
                            rules: [{ required: true, message: "请选择消息类型" }]
                          })(
                            <Select>
                              <Select.Option value="O">顺序消息</Select.Option>
                              <Select.Option value="T">事物消息</Select.Option>
                              <Select.Option value="N">普通消息</Select.Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="中间件类型">
                          {getFieldDecorator("middlewareType", {
                            initialValue: "KF",
                            rules: [{ required: true, message: "请选择中间件类型" }]
                          })(
                            <Select>
                              <Select.Option value="KF">Kafka</Select.Option>
                              <Select.Option value="am">ActiveMQ</Select.Option>
                              <Select.Option value="al">AliMQ</Select.Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="发送模式">
                          {getFieldDecorator("sendMode", {
                            initialValue: "A",
                            rules: [{ required: true, message: "请选择发送模式" }]
                          })(
                            <Select>
                              <Select.Option value="S">同步消息</Select.Option>
                              <Select.Option value="A">异步消息</Select.Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="报文最大长度">
                          {getFieldDecorator("maxMessageLength", {
                            initialValue: 10,
                            rules: [{ required: true, message: "请输入报文最大长度" }]
                          })(<InputNumber min={0} precision={0} style={{ width: "100%" }} placeholder="请输入整数" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="是否压缩传送">
                          {getFieldDecorator("isCompress", {
                            initialValue: "N",
                            // rules: [{ required: true, message: "请选择发送模式" }]
                          })(
                            <Select>
                              <Select.Option value="Y">是</Select.Option>
                              <Select.Option value="N">否</Select.Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="序列化算法">
                          {getFieldDecorator("serializeType", {
                            // rules: [{ required: true, message: "请输入序列化算法" }]
                          })(<Input />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="消息可靠性">
                          {getFieldDecorator("reliability", {
                            rules: [{ required: true, message: "请选择消息可靠性" }]
                          })(
                            <Select>
                              <Select.Option value="Y">可靠</Select.Option>
                              <Select.Option value="N">不可靠</Select.Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                  </Panel>
                  <Panel header="更多配置" key="2" forceRender>
                    <Row>

                      <Col span={12}>
                        <FormItem {...formItemLayout} label="持久化类型">
                          {getFieldDecorator("persistence", {
                            // rules: [{ required: true, message: "请选择持久化类型" }]
                          })(
                            <Select>
                              <Select.Option value="M">内存</Select.Option>
                              <Select.Option value="H">硬盘</Select.Option>
                              <Select.Option value="D">数据库</Select.Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                      {/* <Col span={12}>
                    <FormItem {...formItemLayout} label="版本">
                      {getFieldDecorator("version", {
                        rules: [{ required: true, message: "请输入版本" }]
                      })(<InputNumber min={0} style={{ width: "100%" }} />)}
                    </FormItem>
                  </Col> */}
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="分区数量">
                          {getFieldDecorator("partitionNum", {
                            initialValue: 16,
                            rules: [{ required: true, message: "请输入分区数量" }]
                          })(<InputNumber min={8} precision={0} style={{ width: "100%" }} placeholder="请输入大于等于8的整数" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="副本数量">
                          {getFieldDecorator("replicasNum", {
                            initialValue: 3,
                            rules: [{ required: true, message: "请输入副本数量" }]
                          })(<InputNumber min={3} precision={0} style={{ width: "100%" }} placeholder="请输入大于等于3的整数" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="最大时间差异">
                          {getFieldDecorator("diffTimestamp", {
                            // rules: [{ required: true, message: "请输入最大时间差异" }]
                          })(<InputNumber min={3} precision={0} style={{ width: "100%" }} placeholder="" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="最大并发数">
                          {getFieldDecorator("maxConcurrency", {
                            // rules: [{ required: true, message: "请输入最大并发数" }]
                          })(<InputNumber min={8} precision={0} style={{ width: "100%" }} placeholder="请输入整数" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="最大交易量/秒">
                          {getFieldDecorator("maxTransPerSecond", {
                            rules: [{ required: true, message: "请输入最大交易量/秒" }]
                          })(<InputNumber min={0} precision={0} style={{ width: "100%" }} placeholder="请输入整数" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="清除策略">
                          {getFieldDecorator("cleanUpPolicy", {
                            initialValue: "D",
                            rules: [{ required: true, message: "请选择清除策略" }]
                          })(
                            <Select>
                              <Select.Option value="D">清除</Select.Option>
                              <Select.Option value="C">压缩</Select.Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="是否灰度">
                          {getFieldDecorator("isTray", {
                            initialValue: "N",
                            // rules: [{ required: true, message: "请选择发送模式" }]
                          })(
                            <Select>
                              <Select.Option value="Y">是</Select.Option>
                              <Select.Option value="N">否</Select.Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="灰度发布IP">
                          {getFieldDecorator("consumerIp", {
                            // rules: [{ required: true, message: "请输入灰度发布IP" }]
                          })(<Input />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="过期时间">
                          {getFieldDecorator("deadline", {
                            // rules: [{ required: true, message: "请输入过期时间" }]
                          })(<InputNumber min={0} precision={0} style={{ width: "100%" }} placeholder="" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="状态">
                          {getFieldDecorator("status", {
                            initialValue: "Y",
                            rules: [{ required: true, message: "请选择状态" }]
                          })(
                            <Select>
                              <Select.Option value="Y">生效</Select.Option>
                              <Select.Option value="S">停用</Select.Option>
                              <Select.Option value="C">注销</Select.Option>
                              <Select.Option value="W">待生成</Select.Option>
                              <Select.Option value="Z">待写配置</Select.Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              </Form>
              <Row type="flex">
                <Button
                  type="primary"
                  className="subBtn"
                  className="operatorBtn"
                  style={buttonStyle}
                  onClick={this.handleSubmit}
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
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default Form.create()(TopicCreate);
