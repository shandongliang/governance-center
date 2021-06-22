import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import G6 from "@antv/g6";
import {
  Breadcrumb,
  Icon,
  DatePicker,
  Button,
  TimePicker,
  Select,
  InputNumber,
  Checkbox,
  Upload,
  Modal,
  Tabs
} from "antd";
import { Form, Row, Col, Input, Table, Collapse } from "antd";
import moment from "moment";
import { randomNamber } from "./../../../../util/publicFuc";
import SelectSubModule from "../../../../component/selectSubModule/selectCommonSubModule";
import $fetch from "$fetch";
import { queryEdaTopicList } from "../request/service"

// import './../../../common/style/index.less';
import "./singleTrack.less";
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Search = Input.Search;
let height = window.innerHeight;
const Panel = Collapse.Panel;
class QueryMessage extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor() {
    super();
    this.state = {
      loading: false,
      data: [],
      param: {},
      pagination: {
        pageSize: 10,
        pageSizeChanger: true,
        current: 1
      },
      dataProducer: [],
      dataTopic: [],
      dataConsumer: [],
      module4Data: [],
      searchValue: "",
      offsetValue: "",
      messageNum: "",
      partitionValue: "",
      consumerValue: "",
      columns1: [
        {
          title: "主题名称",
          dataIndex: "topicName",
          key: "topicName",
          width: 100
        },
        {
          title: "生产者ip",
          dataIndex: "dockerId",
          key: "dockerId",
          width: 100
        },

        {
          title: "生产者系统码",
          dataIndex: "producerSysCode",
          key: "producerSysCode",
          width: 150
        },
        {
          title: "事件标识",
          dataIndex: "businessKey",
          key: "businessKey",
          width: 100
        },
        {
          title: "消息体",
          dataIndex: "messageData",
          key: "messageData",
          width: 200
        },
        {
          title: "发布时间",
          dataIndex: "createTime",
          key: "createTime",
          width: 140,
          render: (text, record, index) => {
            return <span>{this.timer(text)}</span>;
          }
        }
      ]
    };
  }
  componentDidMount() {}
  timer = t => {
    //console.log('t', t)
    return moment(t).format("YYYY-MM-DD HH:mm:ss:SSS");
  };

  fetchConsumer = value => {
    let reqSeqNo = randomNamber();
    this.setState({ loading: true });

    let params = {
      paginator: {
        pageNo: this.state.pagination.current,
        recordsPerPage: this.state.pagination.pageSize,
        doPagination: false
      },
      topic: value.topicName[0],
      messageKey: value.offsetValue,
      messageValue: value.consumerValue,
      env: value.partitionValue1,

      messageNum: value.messageNum,
      reqSeqNo: reqSeqNo
    };

    $fetch({
      url: "/tesla-gateway-console-app/eda/queryMessageStatus",
      data: {
        ...params
      }
    })
      .then(res => {
        let data = res.reply.result.message;
        let dataArr = [];
        if(data !== null){
          dataArr.push(data);
        }
        let data1 = [];
        for (var key in res.reply.result.consumer) {
          dataCom = {
            name: key,
            value: res.reply.result.consumer[key]
          };
          data1.push(dataCom);
        }
        this.setState({
          data: dataArr,

          loading: false,
          dataCom: data1,
          a: false
        });
      })
      .catch(error => {
        this.setState({ a: false });
      });
  };

  changeSearch = e => {
    this.setState({
      searchValue: e.target.value
    });
  };
  offsetSearch = e => {
    this.setState({
      offsetValue: e.target.value
    });
  };
  partitionSearch = e => {
    this.setState({
      partitionValue: e.target.value
    });
  };
  partitionSearch1 = e => {
    this.setState({
      partitionValue1: e
    });
  };
  consumerSearch = e => {
    this.setState({
      consumerValue: e.target.value
    });
  };
  onSearch = () => {
    this.props.form.validateFields((err, value) => {
      if (err) {
        return false;
      } else {
        this.setState(
          {
            a: true
          },
          () => {
            this.fetchConsumer(value);
          }
        );
      }
    });
  };
  onRef = ref => {
    this.child = ref;
  };
  click = e => {
    this.child.forDate();
  };
  topicData = data => {
    this.props.form.setFieldsValue({ topicName: [] });
    this.setState({
      module4Data: data
    });
  };
  onChildQuery = map => {
    this.props.form.resetFields(["topicName"]);
    if (map === "") {
      this.setState({
        module4Data: [],
        submoduleId: map
      });
      return;
    }

    let submoduleId = map;
    let reqSeqNo = randomNamber();
    let data = {
      edaTopic: {
        submoduleId,
        page: {
          doPagination: false
        }
      }
    };
    queryEdaTopicList(data).then(res => {
      this.setState(
        {
          module4Data: res.reply.topicList.list,
          loading: false
        },
      );
    })
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 }
  }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="singleTrack">
        <div
          className="maskc"
          style={{ display: this.state.a ? "block" : "none" }}
        />
        <div
          className="maskc1"
          style={{ display: this.state.a ? "block" : "none" }}
        >
          正在查询...
        </div>
        <SelectSubModule callbackParent={this.onChildQuery} />
        <Form>
        <Row>
                    <Col span={12}>
          <FormItem label="主题名称" {...formItemLayout}>
            {getFieldDecorator("topicName", {
              rules: [
                {
                  required: true,
                  message: "请输入主题名称(TopicName)",
                  type: "array"
                }
              ]
            })(
              <Select
                mode="tags"
                maxTagCount={1}
                onChange={value => {
                  setTimeout(() => {
                    this.props.form.setFieldsValue({
                      topicName:
                        value.length === 0
                          ? [...value]
                          : [value[value.length - 1]]
                    });
                  });
                }}
              >
                {this.state.module4Data.map(item => {
                  return (
                    <Select.Option key={item.id} value={item.topicName}>{item.topicName}</Select.Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
          </Col>
                    <Col span={12}>
          <FormItem label="事件标识" {...formItemLayout}>
            {getFieldDecorator("offsetValue", {
              initialValue: "",
              rules: [
                {
                  required: false,
                  message: "请输入businessKey"
                }
              ]
            })(<Input />)}
          </FormItem>
          </Col>
                    <Col span={12}>
          <FormItem label="分环境查询" {...formItemLayout}>
            {getFieldDecorator("partitionValue1", {
              initialValue: "",
              rules: [
                {
                  required: false,
                  message: "请输入MESSAGE"
                }
              ]
            })(
              <Select>
                <Option value="">未分环境</Option>
                <Option value="UAT">UAT</Option>
                <Option value="SIT">SIT</Option>
                <Option value="DEV">DEV</Option>
                <Option value="VT">VT</Option>
                <Option value="PROD">PROD</Option>
                <Option value="DEAD">死信</Option>
              </Select>
            )}
          </FormItem>
          </Col>
                    <Col span={12}>
          <FormItem label="消息数据" {...formItemLayout}>
            {getFieldDecorator("consumerValue", {
              initialValue: "",
              rules: [
                {
                  required: false,
                  message: "请输入MESSAGE"
                }
              ]
            })(<Input />)}
          </FormItem>
          </Col>
                    <Col span={12}>
          <FormItem label="消息条数" {...formItemLayout}>
            {getFieldDecorator("messageNum", {
              initialValue: "800",
              rules: [
                {
                  required: false,
                  message: "请输入最新消息数"
                }
              ]
            })(
              <Select>
                <Option value="800">800</Option>
                <Option value="1600">1600</Option>
                <Option value="3200">3200</Option>
                <Option value="">所有</Option>
              </Select>
            )}
          </FormItem>
          </Col>
                    </Row>
        </Form>

        <Button
          type="primary"
          onClick={this.onSearch}
          style={{ height: "32px", marginBottom: "20px" }}
        >
          搜索
        </Button>
        <br />

        <Table
          dataSource={this.state.data}
          columns={this.state.columns1}
          size="middle"
          rowKey="id"
          style={{ paddingLeft: 0, paddingRight: 0 }}
          scroll={{ x: 900 }}
        />
        {this.state.dataCom
          ? this.state.dataCom.map(item => {
              return (
                <Collapse accordion>
                  {item.value
                    ? item.value.map((i, index) => {
                        return (
                          <Panel
                            header={
                              i.topic +
                              "-" +
                              i.partition +
                              (i.consumedFlag ? "（已消费）" : "（未消费）")
                            }
                            key={index}
                          >

                            <Row>
                              <Col span={6}>
                                <p>
                                  <span>clientId:</span>
                                  {i.clientId}
                                </p>
                              </Col>
                              <Col span={6}>
                                <p>
                                  <sapn> consumedFlag:</sapn>
                                  {i.consumedFlag}
                                </p>
                              </Col>
                              <Col span={8}>
                                <p>
                                  <sapn>consumerId:</sapn>
                                  {i.consumerId}
                                </p>
                              </Col>
                              <Col span={4}>
                                <p>
                                  <sapn>host:</sapn>
                                  {i.host}
                                </p>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={6}>
                                <p>
                                  <sapn>lag:</sapn>
                                  {i.lag}
                                </p>
                              </Col>
                              <Col span={6}>
                                <p>
                                  <sapn>logEndOffset:</sapn>
                                  {i.logEndOffset}
                                </p>
                              </Col>
                              <Col span={8}>
                                <p>
                                  <sapn>topic:</sapn>
                                  {i.topic}
                                </p>
                              </Col>
                              <Col span={4}>
                                <p>
                                  <sapn>partition:</sapn>
                                  {i.partition}
                                </p>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={6}>
                                <p>
                                  <sapn>offset:</sapn>
                                  {i.offset}
                                </p>
                              </Col>
                              <Col span={18}>
                                <p>
                                  <sapn
                                    style={{
                                      float: "left",
                                      marginRight: "10px"
                                    }}
                                  >
                                    coordinator:
                                  </sapn>
                                  <div>
                                    host:
                                    {i.coordinator.host}
                                  </div>
                                  <div>
                                    id:
                                    {i.coordinator.id}
                                  </div>
                                  <div>
                                    idString:
                                    {i.coordinator.idString}
                                  </div>
                                  <div>
                                    port:
                                    {i.coordinator.port}
                                  </div>
                                  <div>
                                    rack:
                                    {i.coordinator.rack}
                                  </div>
                                </p>
                              </Col>
                            </Row>
                          </Panel>
                        );
                      })
                    : null}
                </Collapse>
              );
            })
          : null}
      </div>
    );
  }
}
export default Form.create()(QueryMessage);
