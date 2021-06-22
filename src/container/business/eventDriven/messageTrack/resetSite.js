import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Select,
  Tabs,
  message,
  DatePicker,
  Button,
  Modal
} from "antd";
import SelectSubModule from "../../../../component/selectSubModule/selectCommonSubModule";
import {
  queryEdaTopicByParam,
  queryEdaConsumerListByParam,
  queryEdaMiddlewareDetail,
  moveOffset,
  queryEdaTopicDetailByTopicName
} from "../service/service";
import "./resetSite.less";

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

class QueryForm extends Component {
  constructor() {
    super();
    this.state = {
      consumerList: [],
      topicList: [],
      unitList: [],
      offsetType: "",
      topicName: "",
      loading: false
    };
  }
  componentDidMounted() {}
  //更新tier组件下方表单中主题名
  getTopic = subModuleId => {
    this.props.form.resetFields(["topicName"]);
      if(subModuleId===""){
        this.setState({
          topicList: [],
          subModuleId: subModuleId
        })
        return;
      }
    let data = {
      subModuleId
    };
    queryEdaTopicByParam(data).then(res => {
      let topicList = [];
      topicList =
        // res.reply.list.topicList.length > 0 &&
        res.reply.list.topicList.map(item => {
          return {
            topicName: item.topicName,
            clusterId: item.clusterId
          };
        });
      this.setState({
        topicList
      });
    });
  };
  //更新tier组件下方表单中消费者编号
  getConsumerId = subModuleId => {
    this.props.form.resetFields(["consumerId"]);
      if(subModuleId===""){
        this.setState({
          consumerList: [],
          subModuleId: subModuleId
        })
        return;
      }
    let data = {
      subModuleId
    };
    queryEdaConsumerListByParam(data).then(res => {
      let consumerList = [];
      consumerList =
        // res.reply.consumerList.consumerList.length > 0 &&
        res.reply.consumerList.consumerList.map(item => {
          return item.consumerId;
        });
      this.setState({
        consumerList
      });
    });
  };
  // 主题改变
  topicChange = value => {
    this.props.form.resetFields(["middlewareName", "unit"]);
    this.setState({
      topicName: value,
      unitList: []
    });
  };
  // 根据主题查询中间件集群名称
  queryEdaMiddlewareName = () => {
    const { topicList } = this.state;
    let param = {
      topicName: this.props.form.getFieldValue("topicName")
    };

    queryEdaTopicDetailByTopicName(param).then(res => {
      let middlewareName = "";
      let topic = res.reply.topic;
      if (!topic.topicName) {
        message.warning("该主题不存在，请确认！");
        return;
      }
      middlewareName = topic.clusterId;
      if (!middlewareName) {
        message.warning("该主题没有中间件集群名称，请确认！");
        return;
      }
      this.props.form.setFieldsValue({
        middlewareName
      });
      let data = {
        middlewareEngName: middlewareName
      };
      queryEdaMiddlewareDetail(data).then(res => {
        let unitList = [];
        unitList = res.reply.edaMiddleware.list.map(item => {
          return item.deployUnit;
        });
        if (unitList.length === 0) {
          message.warning("该主题没有中间件集群，请确认！");
          return;
        }
        this.setState({
          unitList
        });
      });
    });
  };
  // 重置位点类型改变
  offsetTypeChange = value => {
    let offsetType = (value&&value !== "DEFAULT") ? value : "";
    console.log(offsetType)
    this.setState({
      offsetType
    });
  };
  // 查询结果
  querySite = () => {
    const { offsetType } = this.state;
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const {
        consumerId,
        env,
        middlewareName,
        number,
        partition,
        topicName,
        unit,
        time,
        policy
      } = values;
      let offset;
      if (offsetType === "TIMESTAMPS") {
        if (!time) {
          message.warning("请选择位点！");
          return;
        }
        offset = time.valueOf().toString();
      } else if (offsetType === "POLICY") {
        if (!policy) {
          message.warning("请选择位点！");
          return;
        }
        offset = policy;
      } else {
        if (!number) {
          message.warning("请选择位点！");
          return;
        }
        offset = number.toString();
      }
      let data = {
        topicName,
        consumerId,
        middlewareName,
        offset,
        offsetType,
        env: env ? env : "",
        partition: partition ? partition : "",
        unit: unit ? unit : ""
      };
      this.setState({loading: true});
      moveOffset(data).then(res => {
        this.setState({loading: false})
        let reply = res.reply;
        if (reply.returnCode.type === "S") {
          Modal.info({
            title: "处理结果",
            content: reply.result.result
          });
        }
      });
    });
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 }
  }
    const { getFieldDecorator } = this.props.form;
    const {
      topicList,
      consumerList,
      unitList,
      offsetType,
      topicName
    } = this.state;
    return (
      <div className="resetSite">
        <div className="maskc" style={{ display: this.state.loading ? 'block' : 'none' }}></div>
        <div className="maskc1" style={{ display: this.state.loading ? 'block' : 'none' }}>正在查询...</div>
        <div className="tierWapper consumerTier">
          <SelectSubModule callbackParent={this.getConsumerId} wrapperCol={12} />
        </div>
        <div className="emptyForTier1" />
        <div className="tierWapper topicTier">
          <SelectSubModule callbackParent={this.getTopic} wrapperCol={12} />
        </div>
        <div className="emptyForTier2" />
        <Form>
          <Row>
            <div style={{ height: "178px" }} />
            <FormItem {...formItemLayout} label="消费者编号">
              {getFieldDecorator("consumerId", {
                rules: [{ required: true, message: "请选择消费者编号" }]
              })(
                <Select combobox allowClear>
                  {consumerList.map(item => (
                    <Option value={item} key={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <div style={{ height: "170px" }} />

            <FormItem {...formItemLayout} label="主题名称">
              {getFieldDecorator("topicName", {
                rules: [{ required: true, message: "请选择主题名称" }]
              })(
                <Select combobox onChange={this.topicChange} allowClear>
                  {topicList.map(item => (
                    <Option value={item.topicName} key={item.topicName}>
                      {item.topicName}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>

            <Row>
              <Col span={16}>
                <FormItem
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  label="中间件集群名称"
                >
                  {getFieldDecorator("middlewareName", {
                    rules: [{ required: true, message: "请查询中间件集群名称" }]
                  })(<Input disabled />)}
                </FormItem>
              </Col>
              <Col span={7} offset={1}>
                <Button
                  type="primary"
                  style={{ borderRadius: 5 }}
                  onClick={this.queryEdaMiddlewareName}
                  disabled={topicName === ""}
                >
                  查询
                </Button>
              </Col>
            </Row>
            <FormItem {...formItemLayout} label="部署单元">
              {getFieldDecorator("unit", {
                rules: [{ required: true, message: "请选择部署单元" }]
              })(
                <Select allowClear>
                  {unitList.map(item => (
                    <Option value={item} key={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="环境">
              {getFieldDecorator("env", {
                initialValue: ""
                // rules:[{required: true, message: '请选择消费者编号'}]
              })(
                <Select>
                  <Option value="">不分环境</Option>
                  <Option value="DEV">DEV</Option>
                  <Option value="UAT">UAT</Option>
                  <Option value="SIT">SIT</Option>
                  <Option value="VT">VT</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="分区">
              {getFieldDecorator("partition", {
                // rules:[{required: true, message: '请选择消费者编号'}]
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="重置位点类型">
              {getFieldDecorator("offsetType", {
                initialValue: "DEFAULT",
                rules:[{required: true, message: '请选择重置位点类型'}]
              })(
                <Select onChange={this.offsetTypeChange} allowClear>
                  <Option value="DEFAULT">默认</Option>
                  <Option value="TIMESTAMPS">TIMESTAMPS</Option>
                  <Option value="POLICY">POLICY</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="位点"
              style={{ display: offsetType === "TIMESTAMPS" ? "" : "none" }}
            >
              {getFieldDecorator("time", {
                // rules: [{ required: true, message: "请选择位点" }]
              })(
                <DatePicker
                  style={{ width: "100%" }}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  disabled={offsetType === ""}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="位点"
              style={{ display: offsetType ? "none" : "" }}
            >
              {getFieldDecorator("number", {
                // rules: [{ required: true, message: "请选择位点" }]
              })(
                <InputNumber
                  min={0}
                  precision={0}
                  style={{ width: "100%" }}
                  disabled={offsetType === "TIMESTAMPS"}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="位点"
              style={{ display: offsetType === "POLICY" ? "" : "none" }}
            >
              {getFieldDecorator("policy", {
                // rules: [{ required: true, message: "请选择位点" }]
              })(
                <Select>
                  <Option value="earliest">最早</Option>
                  <Option value="latest">当前</Option>
                </Select>
              )}
            </FormItem>
          </Row>
        </Form>
        <Button
          size="large"
          type="primary"
          onClick={this.querySite}
          style={{ borderRadius: 5 }}
        >
          查询
        </Button>
      </div>
    );
  }
}
const WrapperQueryForm = Form.create()(QueryForm);

export default class ResetSite extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 }
    };
    return (
      <div>
        <div className="producer">
          <div className="pandora-main-content">
            <div className="portlet-tab">
              <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
                <TabPane tab="重置位点" key="1">
                  <div className="portlet-body">
                    <WrapperQueryForm />
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
