import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Icon,
  Button,
  Select,
  message,
  Tabs,
  Form,
  Row,
  Col,
  Input,
  Modal,
  Radio,
  InputNumber
} from "antd";
import EditableTable from "../editableTable/editableTable";
import "../../container/common/style/index.less";

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

class ServiceSentinelConfig extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      flowRuleConfigs: [],
      degradeRuleConfigs: [],
      fallBackClassType:"",
      fallBackClassValue: ""
    };
  }
  componentDidMount() {
    this.setInitialValue();
  }

  setInitialValue = () => {
    const sentinelConfigZk = this.props.sentinelConfigZk?this.props.sentinelConfigZk:{}
    let flowRuleConfigs = sentinelConfigZk.flowRuleConfigs?sentinelConfigZk.flowRuleConfigs:[];
    let degradeRuleConfigs = sentinelConfigZk.degradeRuleConfigs?sentinelConfigZk.degradeRuleConfigs:[];
    let degradeRuleConfigList = [], flowRuleConfigList = [];
    degradeRuleConfigs.map((item, index) => {
      degradeRuleConfigList.push({
        key: index,
        show: true,
        ...item
      })
    })
    flowRuleConfigs.map((item, index) => {
      flowRuleConfigList.push({
        key: index,
        show: true,
        ...item
      })
    })
    let fallBackClass = degradeRuleConfigs.length > 0 ? degradeRuleConfigs[0] : (flowRuleConfigs.length > 0 ? flowRuleConfigs[0] : {})
    let fallBackClassType = fallBackClass.fallBackClassType;
    let fallBackClassValue = fallBackClass.fallBackClassValue;
    this.setState({
      degradeRuleConfigs: degradeRuleConfigList,
      flowRuleConfigs: flowRuleConfigList,
      fallBackClassType,
      fallBackClassValue
    })
  }

  //添加
  add = type => {
    let { degradeRuleConfigs, flowRuleConfigs} = this.state;
    if (type === "degradeRule") {
      let length = degradeRuleConfigs.length;
      degradeRuleConfigs.push({
        key: length,
        show: true,
        grade: 0
      });
    } else if (type === "flowRule") {
      let length = flowRuleConfigs.length;
      flowRuleConfigs.push({
        key: length,
        show: true,
        grade: 1
      });
    }
    this.setState({
      degradeRuleConfigs,
      flowRuleConfigs
    })
  };

  //删除
  delete = (type, key) => {
    let { degradeRuleConfigs, flowRuleConfigs } = this.state;
      let _this = this;
      Modal.confirm({
        title: `你确定删除该数据吗？`,
        okText: "确定",
        cancelText: "取消",
        onOk() {
          if (type === "degradeRule"){
            degradeRuleConfigs[key].show = false;
          } else if (type === "flowRule"){
            flowRuleConfigs[key].show = false;
          }
          _this.setState({
            degradeRuleConfigs,
            flowRuleConfigs
          })
        },
        onCancel() {
          return;
        }
      });
  };

  selectChange = (type, key, value) => {
    let { degradeRuleConfigs, flowRuleConfigs } = this.state;
    if (type === "degradeRule"){
      degradeRuleConfigs[key].grade = value;
    } else if (type === "flowRule"){
      flowRuleConfigs[key].grade = value;
    } else if (type === "controlBehavior"){
      flowRuleConfigs[key].controlBehavior = value;
    }
    this.setState({
      degradeRuleConfigs,
      flowRuleConfigs
    })
  }

  deleteButton = (type, key) => {
    const { disabled = false } = this.props;
    const style = {
      position: "absolute",
      top: 5,
      right: 5,
    }
    const buttonProps = {
      style,
      type: "danger",
      shape: "circle" ,
      icon: "minus",
      size: "small"
    }
    return disabled?null:<Button {...buttonProps} onClick={() => this.delete(type, key)} />
  }

  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      let { degradeRuleConfigs, flowRuleConfigs } = this.state;
      let degradeRuleConfigList = [], flowRuleConfigList = [];
      degradeRuleConfigs.map(degradeRuleItem => {
        if(degradeRuleItem.show){
          let degradeRuleConfig = {
            active: true,
            count: values[`degradeRuleCount${degradeRuleItem.key}`],
            fallBackClassType: values[`fallBackClassType`],
            fallBackClassValue: values[`fallBackClassValue`],
            grade: values[`degradeRuleGrade${degradeRuleItem.key}`],
            minRequestAmount: values[`minRequestAmount${degradeRuleItem.key}`],
            rtSlowRequestAmount: values[`rtSlowRequestAmount${degradeRuleItem.key}`],
            timeWindow: values[`timeWindow${degradeRuleItem.key}`]
          }
          degradeRuleConfigList.push(degradeRuleConfig);
        }
      })
      flowRuleConfigs.map(flowRuleItem => {
        if(flowRuleItem.show){
          let flowRuleConfig = {
            active: true,
            count: values[`flowRuleCount${flowRuleItem.key}`],
            fallBackClassType: values[`fallBackClassType`],
            fallBackClassValue: values[`fallBackClassValue`],
            grade: values[`flowRuleGrade${flowRuleItem.key}`],
            controlBehavior: values[`controlBehavior${flowRuleItem.key}`],
            maxQueueingTimeMs: values[`maxQueueingTimeMs${flowRuleItem.key}`]
          }
          flowRuleConfigList.push(flowRuleConfig);
        }
      })
      let sentinelConfigZk = {
        flowRuleConfigs: flowRuleConfigList,
        degradeRuleConfigs: degradeRuleConfigList
      }
      this.props.returnSentinelConfig(sentinelConfigZk);
      this.setState({
        visible: false
      })
    })
  }

  render() {
    const { visible, degradeRuleConfigs, flowRuleConfigs, fallBackClassType, fallBackClassValue } = this.state;
    const { form, disabled = false } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 14 }
    };
    const buttonStyle = {
      borderRadius: 5,
      margin: 5
    }
    return (
      <div>
        <Button type="primary" style={buttonStyle} icon={disabled?"":"plus"} onClick={() => this.setState({visible: true})}>{disabled?"查看":"添加"}熔断流量控制配置</Button>
        <Modal 
          title="熔断流量控制配置"
          visible={visible}
          width={1000}
          onOk={disabled?() => this.setState({visible: false}):this.handleOk}
          onCancel={() => this.setState({visible: false})}
        >
          <Form>
              <div style={{backgroundColor: "aliceblue", padding: "10px", marginTop: "10px"}}>
                <div style={{position: "relative", backgroundColor: "antiquewhite", marginBottom: "20px", padding: "20px 10px 10px 10px"}}>
                  <Row>
                    <Col span={12}>
                      <FormItem {...formItemLayout} label="失败返回数据类型">
                        {getFieldDecorator("fallBackClassType", {
                          initialValue: fallBackClassType,
                          // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                        })(
                          <Input disabled={disabled}/>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={12}>
                      <FormItem {...formItemLayout} label="失败返回数据">
                        {getFieldDecorator("fallBackClassValue", {
                          initialValue: fallBackClassValue,
                          // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                        })(
                          <Input disabled={disabled}/>
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                  <div style={{border: "1px dashed #1890ff", marginBottom: "10px", paddingTop: "10px"}}>
                    {degradeRuleConfigs.map(degradeRuleItem => (degradeRuleItem.show&&<Row key={degradeRuleItem.key} style={{position: "realtive"}}>
                      <Col span={7}>
                        <FormItem {...formItemLayout} label="控制类型">
                          {getFieldDecorator(`degradeRuleGrade${degradeRuleItem.key}`, {
                            initialValue: degradeRuleItem.grade,
                            // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                          })(
                            <Select disabled={disabled} style={{width: "100%"}} onChange={value => this.selectChange("degradeRule", degradeRuleItem.key, value)}>
                              <Option value={0}>慢调用</Option>
                              <Option value={1}>异常数比例</Option>
                              <Option value={2}>异常数</Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                      {degradeRuleItem.grade === 0 && <Col span={7}>
                        <FormItem {...formItemLayout} label="响应时间(ms)">
                          {getFieldDecorator(`degradeRuleCount${degradeRuleItem.key}`, {
                            initialValue: degradeRuleItem.degradeRuleCount || 500,
                            rules: [{ required: true, message: "请填写响应时间" }]
                          })(
                            <InputNumber disabled={disabled} style={{width: "100%"}}/>
                          )}
                        </FormItem>
                      </Col>}
                      {degradeRuleItem.grade === 1 && <Col span={7}>
                        <FormItem {...formItemLayout} label="异常数比例">
                          {getFieldDecorator(`degradeRuleCount${degradeRuleItem.key}`, {
                            initialValue: degradeRuleItem.degradeRuleCount || 0.6,
                            rules: [{ required: true, message: "请填写异常数比例" }]
                          })(
                            <InputNumber disabled={disabled} style={{width: "100%"}}/>
                          )}
                        </FormItem>
                      </Col>}
                      {degradeRuleItem.grade === 2 && <Col span={7}>
                        <FormItem {...formItemLayout} label="异常数">
                          {getFieldDecorator(`degradeRuleCount${degradeRuleItem.key}`, {
                            initialValue: degradeRuleItem.degradeRuleCount,
                            rules: [{ required: true, message: "请填写异常数" }]
                          })(
                            <InputNumber disabled={disabled} style={{width: "100%"}}/>
                          )}
                        </FormItem>
                      </Col>}
                      {degradeRuleItem.grade === 0 && <Col span={7}>
                        <FormItem {...formItemLayout} label="生效请求次数">
                          {getFieldDecorator(`rtSlowRequestAmount${degradeRuleItem.key}`, {
                            initialValue: degradeRuleItem.rtSlowRequestAmount || 5,
                            // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                          })(
                            <InputNumber disabled={disabled} style={{width: "100%"}}/>
                          )}
                        </FormItem>
                      </Col>}
                      {degradeRuleItem.grade === 1 && <Col span={7}>
                        <FormItem {...formItemLayout} label="最小请求数">
                          {getFieldDecorator(`minRequestAmount${degradeRuleItem.key}`, {
                            initialValue: degradeRuleItem.minRequestAmount,
                            // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                          })(
                            <InputNumber disabled={disabled} style={{width: "100%"}}/>
                          )}
                        </FormItem>
                      </Col>}
                      <Col span={7}>
                        <FormItem {...formItemLayout} label="失效间隔时间(s)">
                          {getFieldDecorator(`timeWindow${degradeRuleItem.key}`, {
                            initialValue: degradeRuleItem.timeWindow || 5,
                            // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                          })(
                            <InputNumber disabled={disabled} style={{width: "100%"}}/>
                          )}
                        </FormItem>
                      </Col>
                      {this.deleteButton("degradeRule", degradeRuleItem.key)}
                    </Row>))}
                    {!disabled&&<div style={{display: "flex", justifyContent: "center"}}>
                      <Button type="link" icon="plus" onClick={() => this.add("degradeRule")}>添加熔断参数配置</Button>
                    </div>}
                  </div>
                  <div style={{border: "1px dashed #1890ff", marginBottom: "10px", paddingTop: "10px"}}>
                    {flowRuleConfigs.map(flowRuleItem => (flowRuleItem.show&&<Row key={flowRuleItem.key} style={{position: "realtive"}}>
                      <Col span={7}>
                        <FormItem {...formItemLayout} label="控制类型">
                          {getFieldDecorator(`flowRuleGrade${flowRuleItem.key}`, {
                            initialValue: flowRuleItem.grade || 1,
                            // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                          })(
                            <Select disabled={disabled} style={{width: "100%"}} onChange={value => this.selectChange("flowRule", flowRuleItem.key, value)}>
                              <Option value={0}>并发控制</Option>
                              <Option value={1}>QPS</Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                      {/* <Col span={12}>
                        <FormItem {...formItemLayout} label="调用关系限流策略">
                          {getFieldDecorator("sentinelConfigType", {
                            initialValue: sentinelConfigZk.sentinelConfigType,
                            // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                          })(
                            <Input disabled={disabled}/>
                          )}
                        </FormItem>
                      </Col> */}
                      <Col span={7}>
                      <FormItem {...formItemLayout} label="限流阈值">
                        {getFieldDecorator(`flowRuleCount${flowRuleItem.key}`, {
                          initialValue: flowRuleItem.count,
                          // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                        })(
                          <InputNumber disabled={disabled} style={{width: "100%"}}/>
                        )}
                      </FormItem>
                    </Col>
                      {flowRuleItem.grade === 1&&<Col span={7}>
                        <FormItem {...formItemLayout} label="流量控制策略">
                          {getFieldDecorator(`controlBehavior${flowRuleItem.key}`, {
                            initialValue: flowRuleItem.controlBehavior || 0,
                            // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                          })(
                            <Select disabled={disabled} style={{width: "100%"}} onChange={value => this.selectChange("controlBehavior", flowRuleItem.key, value)}>
                              <Option value={0}>直接拒绝</Option>
                              <Option value={1}>冷启动</Option>
                              <Option value={2}>匀速排队</Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>}
                      {flowRuleItem.controlBehavior === 2&&<Col span={7}>
                        <FormItem {...formItemLayout} label="最大等待时间">
                          {getFieldDecorator(`maxQueueingTimeMs${flowRuleItem.key}`, {
                            initialValue: flowRuleItem.maxQueueingTimeMs || 500,
                            // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                          })(
                            <InputNumber disabled={disabled} style={{width: "100%"}}/>
                          )}
                        </FormItem>
                      </Col>}
                      {this.deleteButton("flowRule", flowRuleItem.key)}
                    </Row>))}
                    {!disabled&&<div style={{display: "flex", justifyContent: "center"}}>
                      <Button type="link" icon="plus" onClick={() => this.add("flowRule")} >添加流量参数配置</Button>
                    </div>}
                  </div>
                </div>
              </div>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(ServiceSentinelConfig);
