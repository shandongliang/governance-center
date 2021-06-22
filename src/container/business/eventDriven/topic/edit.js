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
  DatePicker,
  InputNumber,
  Collapse
} from "antd";
import {
  editEdaTopic,
  queryEdaMiddlewareList,
  queryEdaTopicList
} from "../request/service";
import { randomNamber } from '../../../../util/publicFuc';
import "./../../../common/style/index.less";
import moment from "moment";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Panel = Collapse.Panel;

class TopicEdit extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor() {
    super();
    this.state = {
      topicDetail: {},
      clusterList: []
    };
  }

  componentDidMount() {
    const { id } = this.props.location.state
    this.queryTopicDetail(id);
    this.queryCluster()
  }
  //根据Id查询详情
  queryTopicDetail = id => {
    let data = {
      edaTopic: {
        // page: {
        //   doPagination: false
        // },
        id
      }
    };
    queryEdaTopicList(data).then(res => {
      if (res.reply.returnCode.type === "S" && res.reply.topicList.list.length > 0) {
        this.setState({
          topicDetail: res.reply.topicList.list[0]
        })
      }
    })
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
      if (res.reply.returnCode.type === "S") {
        let edaMiddlewareList = res.reply.queryMiddlewareList.edaMiddlewareList;
        for (let i = 0; i < edaMiddlewareList.length; i++) {
          clusterList.push(edaMiddlewareList[i].middlewareEngName);
        }
      }
      this.setState({
        clusterList
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
        const { topicDetail } = this.state;
        let data = {
          list: [
            {
              ...values,
              id: topicDetail.id,
              lastUpdateUserId: JSON.parse(
                sessionStorage.getItem("$pandora_auth.user_info")
              ).userId
            }
          ]
        };
        editEdaTopic(data).then(res => {
          //返回信息
          this.setState({
            loading: false
          });
          if (res.reply.returnCode.type === "S") {
            message.info("编辑成功");
            this.toIndex();
          } else {
            message.info("编辑失败");
          }
        });
      }
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
    const { clusterList, topicDetail } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="修改主题" key="1">
              <Form>
                <Collapse defaultActiveKey={["1"]}>
                  <Panel header="基础配置" key="1">
                    <Row style={{ marginTop: 10 }}>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="主题名称">
                          {getFieldDecorator("topicName", {
                            initialValue: topicDetail.topicName,
                            rules: [{ required: true, message: "请输入主题名称" }]
                          })(<Input disabled />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="服务单元">
                          {getFieldDecorator("submoduleId", {
                            initialValue: topicDetail.submoduleId,
                            rules: [{ required: true, message: "请输入服务单元" }]
                          })(<Input disabled />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="集群名称">
                          {getFieldDecorator("clusterId", {
                            initialValue: topicDetail.clusterId,
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
                            initialValue: topicDetail.messageType,
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
                            initialValue: topicDetail.middlewareType,
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
                            initialValue: topicDetail.sendMode,
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
                            initialValue: topicDetail.maxMessageLength,
                            rules: [{ required: true, message: "请输入报文最大长度" }]
                          })(<InputNumber min={0} precision={0} style={{ width: "100%" }} placeholder="请输入整数" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="是否压缩传送">
                          {getFieldDecorator("isCompress", {
                            initialValue: topicDetail.isCompress,
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
                            initialValue: topicDetail.serializeType,
                            rules: [{ required: true, message: "请输入序列化算法" }]
                          })(<Input />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="消息可靠性">
                          {getFieldDecorator("reliability", {
                            initialValue: topicDetail.reliability,
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
                            initialValue: topicDetail.persistence,
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
                        <FormItem {...formItemLayout} label="幂等">
                          {getFieldDecorator("idempotent", {
                            initialValue: topicDetail.idempotent,
                            // rules: [{ required: true, message: "请选择发送模式" }]
                          })(
                            <Select>
                              <Select.Option value="Y">需要</Select.Option>
                              <Select.Option value="N">不需要</Select.Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col> */}
                      {/* <Col span={12}>
                    <FormItem {...formItemLayout} label="版本">
                      {getFieldDecorator("version", {
                        initialValue: topicDetail.version,
                        rules: [{ required: true, message: "请输入版本" }]
                      })(<InputNumber min={0} style={{ width: "100%" }} />)}
                    </FormItem>
                  </Col> */}
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="分区数量">
                          {getFieldDecorator("partitionNum", {
                            initialValue: topicDetail.partitionNum,
                            rules: [{ required: true, message: "请输入分区数量" }]
                          })(<InputNumber min={8} precision={0} style={{ width: "100%" }} placeholder="请输入大于等于8的整数" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="副本数量">
                          {getFieldDecorator("replicasNum", {
                            initialValue: topicDetail.replicasNum,
                            rules: [{ required: true, message: "请输入副本数量" }]
                          })(<InputNumber min={3} precision={0} style={{ width: "100%" }} placeholder="请输入大于等于3的整数" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="最大时间差异">
                          {getFieldDecorator("diffTimestamp", {
                            initialValue: topicDetail.diffTimestamp,
                            // rules: [{ required: true, message: "请输入最大时间差异" }]
                          })(<InputNumber min={3} precision={0} style={{ width: "100%" }} placeholder="" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="最大并发数">
                          {getFieldDecorator("maxConcurrency", {
                            initialValue: topicDetail.maxConcurrency,
                            rules: [{ required: true, message: "请输入最大并发数" }]
                          })(<InputNumber min={0} precision={0} style={{ width: "100%" }} placeholder="请输入整数" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="最大交易量/秒">
                          {getFieldDecorator("maxTransPerSecond", {
                            initialValue: topicDetail.maxTransPerSecond,
                            rules: [{ required: true, message: "请输入最大交易量/秒" }]
                          })(<InputNumber min={0} precision={0} style={{ width: "100%" }} placeholder="请输入整数" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="清除策略">
                          {getFieldDecorator("cleanUpPolicy", {
                            initialValue: topicDetail.cleanUpPolicy,
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
                            initialValue: topicDetail.isTray,
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
                            initialValue: topicDetail.consumerIp,
                            // rules: [{ required: true, message: "请输入灰度发布IP" }]
                          })(<Input />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="过期时间">
                          {getFieldDecorator("deadline", {
                            initialValue: topicDetail.deadline,
                            // rules: [{ required: true, message: "请输入过期时间" }]
                          })(<InputNumber min={0} precision={0} style={{ width: "100%" }} placeholder="" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="状态">
                          {getFieldDecorator("status", {
                            initialValue: topicDetail.status,
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
export default Form.create()(TopicEdit);
