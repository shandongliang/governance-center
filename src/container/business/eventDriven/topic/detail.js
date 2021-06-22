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
  queryEdaTopicList,
} from "../request/service";
import { queryEdaMiddlewareDetail, checkTopicExist, reCreateTopic } from '../service/service'
import "./../../../common/style/index.less";
import moment from "moment";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import CheckClusterModal from '../../../../component/check-cluster-modal/index'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Panel = Collapse.Panel;

class TopicDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor() {
    super();
    this.state = {
      topicDetail: {},
      visible: false,
      isCheckModal: true,
      env: "",
      physicClusterName: "",
      isExist: true
    };
  }

  componentDidMount() {
    const { id } = this.props.location.state
    this.queryTopicDetail(id);
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
        this.queryEdaMiddlewareName(res.reply.topicList.list[0].clusterId);
      }
    })
  }
  //返回
  toIndex = () => {
    let path = {
      pathname: "/eventDriven/topic/index"
    };
    goToAndClose(path, "主题查询");
  };


  queryEdaMiddlewareName = clusterId => {
    let data = {
      middlewareEngName: clusterId
    };
    queryEdaMiddlewareDetail(data).then(res => {
      let clusterList = [];
      clusterList = res.reply.edaMiddleware.list.map(item => {
        return item.clusterName;
      });
      if (clusterList.length === 0) {
        message.warning("该主题没有中间件集群，请确认！");
        return;
      }
      this.setState({
        clusterList
      });
    });
  }
  
  // 查询主题是否在集群创建
  checkCluster = () => {
    const { topicDetail, env, physicClusterName } = this.state;
    if(physicClusterName === ""){
      message.warning("请选择物理集群！");
      return;
    }
    let data = {
      topicName: `${topicDetail.topicName}${env === "" ? "" : "-" + env }`,
      physicClusterName
    };
    checkTopicExist(data).then(res=>{
      if(res.reply.returnCode.type === "S"){
        Modal.info({
          title: "主题",
          content: `主题${res.reply.result?"已":"未"}在集群创建！`
        })
        this.setState({
          visible: false,
          env: "",
          physicClusterName: "",
          isExist: res.reply.result
        })
      }
    })
  }
  // 补创主题
  addTopic = () => {
    const { topicDetail, env, physicClusterName } = this.state;
    const { topicName, partitionNum, replicasNum } = topicDetail;
    if(physicClusterName === ""){
      message.warning("请选择物理集群！");
      return;
    }
    let data = {
      topicName,
      physicClusterId: physicClusterName,
      partitionNum: partitionNum?partitionNum.toString():"8",
      replicasNum: replicasNum?replicasNum.toString():"3",
      env
    };
    reCreateTopic(data).then(res=>{
      if(res.reply.result){
        this.setState({
          visible: false,
          physicClusterName: "",
          env: ""
        })
        message.success("补创成功！");
      } else {
        message.success("补创失败！");
      }
    })
  }
  
  cancleModal = () => {
    this.setState({
      visible: false,
      env: "",
      physicClusterName: ""
    });
  };
  envChange = value => {
    this.setState({
      env: value
    })
  }
  clusterChange = value => {
    this.setState({
      physicClusterName: value
    })
  }

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
    const { topicDetail, clusterList, visible, isCheckModal, isExist } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          {visible?<CheckClusterModal
            visible = {visible}
            title = {isCheckModal?"查询主题是否在集群创建":"补创主题"}
            clusterList = {clusterList}
            onCancel = {this.cancleModal}
            onOk = {isCheckModal?this.checkCluster:this.addTopic}
            envChange = {this.envChange}
            clusterChange = {this.clusterChange}
          />:null}
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="主题详情" key="1">
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
                            rules: [{ required: true, message: "请输入集群名称" }]
                          })(<Input disabled />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="消息类型">
                          {getFieldDecorator("messageType", {
                            initialValue: topicDetail.messageType,
                            rules: [{ required: true, message: "请选择消息类型" }]
                          })(
                            <Select disabled>
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
                            <Select disabled>
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
                            <Select disabled>
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
                          })(<InputNumber disabled min={0} precision={0} style={{ width: "100%" }} placeholder="请输入整数" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="是否压缩传送">
                          {getFieldDecorator("isCompress", {
                            initialValue: topicDetail.isCompress,
                            // rules: [{ required: true, message: "请选择发送模式" }]
                          })(
                            <Select disabled>
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
                          })(<Input disabled />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="消息可靠性">
                          {getFieldDecorator("reliability", {
                            initialValue: topicDetail.reliability,
                            rules: [{ required: true, message: "请选择消息可靠性" }]
                          })(
                            <Select disabled>
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
                            <Select disabled>
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
                            <Select disabled>
                              <Select.Option value="Y">需要</Select.Option>
                              <Select.Option value="N">不需要</Select.Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col> */}
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="版本">
                          {getFieldDecorator("version", {
                            initialValue: topicDetail.version,
                            rules: [{ required: true, message: "请输入版本" }]
                          })(<InputNumber disabled min={0} style={{ width: "100%" }} />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="分区数量">
                          {getFieldDecorator("partitionNum", {
                            initialValue: topicDetail.partitionNum,
                            rules: [{ required: true, message: "请输入分区数量" }]
                          })(<InputNumber disabled min={8} precision={0} style={{ width: "100%" }} placeholder="请输入大于等于8的整数" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="副本数量">
                          {getFieldDecorator("replicasNum", {
                            initialValue: topicDetail.replicasNum,
                            rules: [{ required: true, message: "请输入副本数量" }]
                          })(<InputNumber disabled min={3} precision={0} style={{ width: "100%" }} placeholder="请输入大于等于3的整数" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="最大时间差异">
                          {getFieldDecorator("diffTimestamp", {
                            initialValue: topicDetail.diffTimestamp,
                            // rules: [{ required: true, message: "请输入最大时间差异" }]
                          })(<InputNumber disabled min={3} precision={0} style={{ width: "100%" }} placeholder="" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="最大并发数">
                          {getFieldDecorator("maxConcurrency", {
                            initialValue: topicDetail.maxConcurrency,
                            rules: [{ required: true, message: "请输入最大并发数" }]
                          })(<InputNumber disabled min={8} precision={0} style={{ width: "100%" }} placeholder="请输入大于等于8的整数" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="最大交易量/秒">
                          {getFieldDecorator("maxTransPerSecond", {
                            initialValue: topicDetail.maxTransPerSecond,
                            rules: [{ required: true, message: "请输入最大交易量/秒" }]
                          })(<InputNumber disabled min={0} precision={0} style={{ width: "100%" }} placeholder="请输入大于等于3的整数" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="清除策略">
                          {getFieldDecorator("cleanUpPolicy", {
                            initialValue: topicDetail.cleanUpPolicy,
                            rules: [{ required: true, message: "请选择清除策略" }]
                          })(
                            <Select disabled>
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
                            <Select disabled>
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
                          })(<Input disabled />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="过期时间">
                          {getFieldDecorator("deadline", {
                            initialValue: topicDetail.deadline,
                            // rules: [{ required: true, message: "请输入过期时间" }]
                          })(<InputNumber disabled min={0} precision={0} style={{ width: "100%" }} placeholder="" />)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label="状态">
                          {getFieldDecorator("status", {
                            initialValue: topicDetail.status,
                            rules: [{ required: true, message: "请选择状态" }]
                          })(
                            <Select disabled>
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
                <Button type="primary" onClick={()=>{this.setState({visible: true, isCheckModal: true})}} style={buttonStyle} className="subBtn" >查询</Button>
                <Button type="primary" onClick={()=>{this.setState({visible: true, isCheckModal: false})}} style={buttonStyle} className="subBtn" disabled={isExist}>补创主题</Button>
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
export default Form.create()(TopicDetail);
