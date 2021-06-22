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
  Transfer,
  InputNumber
} from "antd";
import EditableTable from "../editableTable/editableTable";
import "../../container/common/style/index.less";

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

class SentinelConfig extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      systemRuleConfigActive: "0",
      sentinelCommonConfig: [],
      systemRuleConfig: {}
    };
  }
  componentDidMount() {
    this.setInitialValue();
  }

  setInitialValue = () => {
    let sentinelConfigZk = this.props.sentinelConfigZk?this.props.sentinelConfigZk:{};
    let systemRuleConfig = sentinelConfigZk.systemRuleConfig?sentinelConfigZk.systemRuleConfig:{};
    let systemRuleConfigActive = systemRuleConfig.active?"1":"0";
    let flowRuleConfigs = sentinelConfigZk.flowRuleConfigs?sentinelConfigZk.flowRuleConfigs:[];
    let degradeRuleConfigs = sentinelConfigZk.degradeRuleConfigs?sentinelConfigZk.degradeRuleConfigs:[];
    let sentinelCommonConfig = [], commonConfig = [];
    [...flowRuleConfigs, ...degradeRuleConfigs].map(item => {
      commonConfig.push(JSON.stringify({
        fallBackClassType: item.fallBackClassType,
        fallBackClassValue: item.fallBackClassValue,
        serviceCode: item.serviceCode,
        serviceUnitCode: item.serviceUnitCode,
        version: item.version,
        moduleCode: item.moduleCode      
      }))
    })
    commonConfig = [...(new Set(commonConfig))];
    sentinelCommonConfig = commonConfig.map((item, index) => {
      let itemConfig = JSON.parse(item);
      itemConfig.degradeRuleConfigs = [];
      itemConfig.flowRuleConfigs = [];
      itemConfig.key = index;
      itemConfig.show = true;
      itemConfig.subModuleList = [];
      itemConfig.subModuleDisabled = true;
      itemConfig.serviceList = [];
      itemConfig.serviceDisabled = true;
      degradeRuleConfigs.map((degradeRuleItem, degradeRuleIndex) => {
        if(this.isObjectValueEqual(itemConfig, degradeRuleItem)){
          itemConfig.degradeRuleConfigs.push({
            key: degradeRuleIndex,
            show: true,
            ...degradeRuleItem
          })
        }
      })
      flowRuleConfigs.map((flowRuleItem, flowRuleIndex) => {
        if(this.isObjectValueEqual(itemConfig, flowRuleItem)){
          itemConfig.flowRuleConfigs.push({
            key: flowRuleIndex,
            show: true,
            ...flowRuleItem
          })
        }
      })
      return itemConfig
    })
    this.setState({
      sentinelCommonConfig,
      systemRuleConfig,
      systemRuleConfigActive
    })
  }

  isObjectValueEqual = (a, b) => {
    if(a.moduleCode === b.moduleCode&&
      a.serviceUnitCode === b.serviceUnitCode&&
      a.serviceCode === b.serviceCode&&
      a.fallBackClassType === b.fallBackClassType&&
      a.fallBackClassValue === b.fallBackClassValue&&
      a.version === b.version
    ) return true;
    else return false;
  }

  sentinelModuleChange = (value, parentKey) => {
    const { querySgSubmoduleBusinessConfigList } = this.props;
    this.props.form.resetFields(["sentinelSubModuleCode"]);
    let data = {
      sgSubmoduleBusinessConfigVo: {
        moduleCode: value,
        page: {
          doPagination: false
        }
      }
    };
    querySgSubmoduleBusinessConfigList(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        let sentinelCommonConfig = this.state.sentinelCommonConfig;
        sentinelCommonConfig[parentKey].subModuleList = res.reply.result.list;
        sentinelCommonConfig[parentKey].subModuleDisabled = false;
        this.setState({
          sentinelCommonConfig
        });
      }
    });
  }

  sentinelSubModuleChange = (value, parentKey) => {
    const { querySgServiceList } = this.props;
    this.props.form.resetFields(["sentinelServiceCode"]);
    let data = {
      sgServiceVo: {
        subModuleCode: value,
        page: {
          doPagination: false
        }
      }
    };
    querySgServiceList(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        let sentinelCommonConfig = this.state.sentinelCommonConfig;
        sentinelCommonConfig[parentKey].serviceList = res.reply.result.sgServiceList
        sentinelCommonConfig[parentKey].serviceDisabled = false;
        this.setState({
          sentinelCommonConfig
        });
      }
    });
  }

  //添加
  add = (type, parentKey) => {
    let sentinelCommonConfig = this.state.sentinelCommonConfig;
    if (type === "commonConfig") {
      let length = sentinelCommonConfig.length;
      sentinelCommonConfig.push({
        key: length,
        show: true,
        sentinelServiceVersion: "1.0",
        degradeRuleConfigs: [],
        flowRuleConfigs: [],
        subModuleList: [],
        subModuleDisabled: true,
        serviceList: [],
        serviceDisabled: true
      });
    } else if (type === "degradeRule") {
      let length = sentinelCommonConfig[parentKey].degradeRuleConfigs.length;
      sentinelCommonConfig[parentKey].degradeRuleConfigs.push({
        key: length,
        show: true,
        grade: 0
      });
    } else if (type === "flowRule") {
      let length = sentinelCommonConfig[parentKey].flowRuleConfigs.length;
      sentinelCommonConfig[parentKey].flowRuleConfigs.push({
        key: length,
        show: true,
        grade: 1
      });
    }
    this.setState({
      sentinelCommonConfig
    })
  };

  //删除
  delete = (type, parentKey, key) => {
    let sentinelCommonConfig = this.state.sentinelCommonConfig;
      let _this = this;
      Modal.confirm({
        title: `你确定删除该数据吗？`,
        okText: "确定",
        cancelText: "取消",
        onOk() {
          if (type === "commonConfig"){
            sentinelCommonConfig[parentKey].show = false;
          } else if (type === "degradeRule"){
            sentinelCommonConfig[parentKey].degradeRuleConfigs[key].show = false;
          } else if (type === "flowRule"){
            sentinelCommonConfig[parentKey].flowRuleConfigs[key].show = false;
          }
          _this.setState({
            sentinelCommonConfig
          })
        },
        onCancel() {
          return;
        }
      });
  };

  selectChange = (type, parentKey, key, value) => {
    let sentinelCommonConfig = this.state.sentinelCommonConfig;
    if (type === "degradeRule"){
      sentinelCommonConfig[parentKey].degradeRuleConfigs[key].grade = value;
    } else if (type === "flowRule"){
      sentinelCommonConfig[parentKey].flowRuleConfigs[key].grade = value;
    } else if (type === "controlBehavior"){
      sentinelCommonConfig[parentKey].flowRuleConfigs[key].controlBehavior = value;
    }
    this.setState({
      sentinelCommonConfig
    })
  }

  deleteButton = (type, parentKey, key) => {
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
    return disabled?null:<Button {...buttonProps} onClick={() => this.delete(type, parentKey, key)} />
  }

  filterNumber = (value, type) => {
    if(value === 0 || value === 1){
      console.log(type)
      this.props.form.setFieldsValue({"maxThread": 0.8 })
    }
  }

  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      let degradeRuleConfigs = [], flowRuleConfigs = [], systemRuleConfig = {};
      const { sentinelCommonConfig, systemRuleConfigActive } = this.state;
      systemRuleConfig = {
        active: systemRuleConfigActive === "1" ? true : false,
        avgRt: values.avgRt,
        highestCpuUsage: values.highestCpuUsage,
        highestSystemLoad: values.highestSystemLoad,
        maxThread: values.maxThread,
        qps: values.qps
      }
      sentinelCommonConfig.map(item => {
        if(item.show){
          item.degradeRuleConfigs.map(degradeRuleItem => {
            if(degradeRuleItem.show){
              let degradeRuleConfig = {
                active: true,
                count: values[`degradeRuleCount${item.key}-${degradeRuleItem.key}`],
                fallBackClassType: values[`fallBackClassType${item.key}`],
                fallBackClassValue: values[`fallBackClassValue${item.key}`],
                grade: values[`degradeRuleGrade${item.key}-${degradeRuleItem.key}`],
                minRequestAmount: values[`minRequestAmount${item.key}-${degradeRuleItem.key}`],
                rtSlowRequestAmount: values[`rtSlowRequestAmount${item.key}-${degradeRuleItem.key}`],
                serviceCode: values[`sentinelServiceCode${item.key}`],
                serviceUnitCode: values[`sentinelSubModuleCode${item.key}`],
                timeWindow: values[`timeWindow${item.key}-${degradeRuleItem.key}`],
                version: values[`sentinelServiceVersion${item.key}`],
                moduleCode: values[`sentinelModuleCode${item.key}`],
              }
              degradeRuleConfigs.push(degradeRuleConfig);
            }
          })
          item.flowRuleConfigs.map(flowRuleItem => {
            if(flowRuleItem.show){
              let flowRuleConfig = {
                active: true,
                count: values[`flowRuleCount${item.key}-${flowRuleItem.key}`],
                fallBackClassType: values[`fallBackClassType${item.key}`],
                fallBackClassValue: values[`fallBackClassValue${item.key}`],
                grade: values[`flowRuleGrade${item.key}-${flowRuleItem.key}`],
                controlBehavior: values[`controlBehavior${item.key}-${flowRuleItem.key}`],
                maxQueueingTimeMs: values[`maxQueueingTimeMs${item.key}-${flowRuleItem.key}`],
                serviceCode: values[`sentinelServiceCode${item.key}`],
                serviceUnitCode: values[`sentinelSubModuleCode${item.key}`],
                version: values[`sentinelServiceVersion${item.key}`],
                moduleCode: values[`sentinelModuleCode${item.key}`],
              }
              flowRuleConfigs.push(flowRuleConfig);
            }
          })
        }
      })
      let sentinelConfigZk = {
        systemRuleConfig,
        flowRuleConfigs,
        degradeRuleConfigs
      }
      this.props.returnSentinelConfig(sentinelConfigZk);
      this.setState({
        visible: false
      })
    })
  }

  render() {
    const { visible, sentinelCommonConfig, systemRuleConfigActive, systemRuleConfig } = this.state;
    const { moduleList = [], form, disabled = false } = this.props;
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
              <div style={{color: "#1890ff"}}>系统熔断配置<span style={{color: "orange"}}>(只能在提供方配置，且只能配置一条!)</span></div>
              <div style={{backgroundColor: "aliceblue"}}>
                <Row style={{margin: "10px 0"}}>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="开启系统熔断">
                      {getFieldDecorator("systemRuleConfigActive", {
                        initialValue: systemRuleConfig.active?"1":"0",
                        // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                      })(
                        <Select disabled={disabled} style={{width: "100%"}} onChange={value => this.setState({systemRuleConfigActive: value})}>
                          <Option value="1">是</Option>
                          <Option value="0">否</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  {systemRuleConfigActive === "1"&&<Col span={12}>
                    <FormItem {...formItemLayout} label="系统平均加载值">
                      {getFieldDecorator("highestSystemLoad", {
                        initialValue: systemRuleConfig.highestSystemLoad || 0.8,
                        // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                      })(
                        <InputNumber min={0} max={1} step={0.1} disabled={disabled} style={{width: "100%"}} onChange={value => this.filterNumber(value, "highestSystemLoad")}/>
                      )}
                    </FormItem>
                  </Col>}
                  {systemRuleConfigActive === "1"&&<Col span={12}>
                    <FormItem {...formItemLayout} label="cpu使用率">
                      {getFieldDecorator("highestCpuUsage", {
                        initialValue: systemRuleConfig.highestCpuUsage || 0.8,
                        // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                      })(
                        <InputNumber min={0} max={1} step={0.1} disabled={disabled} style={{width: "100%"}} onChange={value => this.filterNumber(value, "highestCpuUsage")}/>
                      )}
                    </FormItem>
                  </Col>}
                  {systemRuleConfigActive === "1"&&<Col span={12}>
                    <FormItem {...formItemLayout} label="系统qps峰值  ">
                      {getFieldDecorator("qps", {
                        initialValue: systemRuleConfig.qps,
                        // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                      })(
                        <InputNumber disabled={disabled} style={{width: "100%"}}/>
                      )}
                    </FormItem>
                  </Col>}
                  {systemRuleConfigActive === "1"&&<Col span={12}>
                    <FormItem {...formItemLayout} label="入口流量平均响应时间ms">
                      {getFieldDecorator("avgRt", {
                        initialValue: systemRuleConfig.avgRt,
                        // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                      })(
                        <InputNumber disabled={disabled} style={{width: "100%"}}/>
                      )}
                    </FormItem>
                  </Col>}
                  {systemRuleConfigActive === "1"&&<Col span={12}>
                    <FormItem {...formItemLayout} label="入口流量最大并发数">
                      {getFieldDecorator("maxThread", {
                        initialValue: systemRuleConfig.maxThread,
                        // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                      })(
                        <InputNumber disabled={disabled} style={{width: "100%"}}/>
                      )}
                    </FormItem>
                  </Col>}
                </Row> 
              </div>
              <div style={{color: "#1890ff"}}>
                熔断和流量参数配置
                <span style={{color: "orange"}}>(只能配置在消费方，可配置多条!)</span>
                {!disabled&&<Button type="primary" size="small" shape="circle" icon="plus" onClick={() => this.add("commonConfig")} />}
              </div>
              <div style={{backgroundColor: "aliceblue", padding: "10px", marginTop: "10px"}}>
                {sentinelCommonConfig.map(item => (
                item.show&&(<div key={item.key} style={{position: "relative", backgroundColor: "antiquewhite", marginBottom: "20px", padding: "20px 10px 10px 10px"}}>
                  {!disabled&&<Icon type="close" style={{position: "absolute", top: 5, right: 5, color: "red"}} onClick={() => this.delete("commonConfig", item.key)} />}
                  <Row>
                    <Col span={8}>
                      <FormItem {...formItemLayout} label="模块编码">
                        {getFieldDecorator(`sentinelModuleCode${item.key}`, {
                          initialValue: item.moduleCode,
                          rules: [
                            { required: true, message: "请选择模块编码" }
                          ]
                        })(
                          <Select disabled={disabled} showSearch onChange={value => this.sentinelModuleChange(value, item.key)}>
                            {moduleList.map(moduleItem => (
                              <Option
                                value={moduleItem.moduleCode}
                                key={moduleItem.moduleId}
                              >
                                {moduleItem.moduleCode}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem {...formItemLayout} label="服务单元">
                        {getFieldDecorator(`sentinelSubModuleCode${item.key}`, {
                          initialValue: item.serviceUnitCode,
                          rules: [
                            { required: true, message: "请选择服务单元" }
                          ]
                        })(
                          <Select showSearch disabled={item.subModuleDisabled&&disabled} onChange={value => this.sentinelSubModuleChange(value,item.key)}>
                            {item.subModuleList.map(subModuleItem => (
                              <Option
                                value={subModuleItem.subModuleCode}
                                key={subModuleItem.id}
                              >
                                {subModuleItem.subModuleCode}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem {...formItemLayout} label="服务编码">
                        {getFieldDecorator(`sentinelServiceCode${item.key}`, {
                          initialValue: item.serviceCode,
                          rules: [
                            { required: true, message: "请选择服务编码" }
                          ]
                        })(
                          <Select showSearch disabled={item.serviceDisabled&&disabled}>
                            {item.serviceList.map(serviceItem => (
                              <Option
                                value={serviceItem.serviceCode}
                                key={serviceItem.id}
                              >
                                {serviceItem.serviceCode}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem {...formItemLayout} label="服务版本">
                        {getFieldDecorator(`sentinelServiceVersion${item.key}`, {
                          initialValue: item.version || "1.0",
                          rules: [{ required: true, message: "请填写服务版本" }]
                        })(
                          <Input disabled={disabled}/>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem {...formItemLayout} label="失败返回数据类型">
                        {getFieldDecorator(`fallBackClassType${item.key}`, {
                          initialValue: item.fallBackClassType,
                          // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                        })(
                          <Input disabled={disabled}/>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem {...formItemLayout} label="失败返回数据">
                        {getFieldDecorator(`fallBackClassValue${item.key}`, {
                          initialValue: item.fallBackClassValue,
                          // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                        })(
                          <Input disabled={disabled}/>
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                  <div style={{border: "1px dashed #1890ff", marginBottom: "10px", paddingTop: "10px"}}>
                    {item.degradeRuleConfigs.map(degradeRuleItem => (degradeRuleItem.show&&<Row key={degradeRuleItem.key} style={{position: "realtive"}}>
                      <Col span={7}>
                        <FormItem {...formItemLayout} label="控制类型">
                          {getFieldDecorator(`degradeRuleGrade${item.key}-${degradeRuleItem.key}`, {
                            initialValue: degradeRuleItem.grade,
                            // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                          })(
                            <Select disabled={disabled} style={{width: "100%"}} onChange={value => this.selectChange("degradeRule", item.key, degradeRuleItem.key, value)}>
                              <Option value={0}>慢调用</Option>
                              <Option value={1}>异常数比例</Option>
                              <Option value={2}>异常数</Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                      {degradeRuleItem.grade === 0 && <Col span={7}>
                        <FormItem {...formItemLayout} label="响应时间(ms)">
                          {getFieldDecorator(`degradeRuleCount${item.key}-${degradeRuleItem.key}`, {
                            initialValue: degradeRuleItem.degradeRuleCount || 500,
                            rules: [{ required: true, message: "请填写响应时间" }]
                          })(
                            <InputNumber disabled={disabled} style={{width: "100%"}}/>
                          )}
                        </FormItem>
                      </Col>}
                      {degradeRuleItem.grade === 1 && <Col span={7}>
                        <FormItem {...formItemLayout} label="异常数比例">
                          {getFieldDecorator(`degradeRuleCount${item.key}-${degradeRuleItem.key}`, {
                            initialValue: degradeRuleItem.degradeRuleCount || 0.6,
                            rules: [{ required: true, message: "请填写异常数比例" }]
                          })(
                            <InputNumber disabled={disabled} style={{width: "100%"}}/>
                          )}
                        </FormItem>
                      </Col>}
                      {degradeRuleItem.grade === 2 && <Col span={7}>
                        <FormItem {...formItemLayout} label="异常数">
                          {getFieldDecorator(`degradeRuleCount${item.key}-${degradeRuleItem.key}`, {
                            initialValue: degradeRuleItem.degradeRuleCount,
                            rules: [{ required: true, message: "请填写异常数" }]
                          })(
                            <InputNumber disabled={disabled} style={{width: "100%"}}/>
                          )}
                        </FormItem>
                      </Col>}
                      {degradeRuleItem.grade === 0 && <Col span={7}>
                        <FormItem {...formItemLayout} label="生效请求次数">
                          {getFieldDecorator(`rtSlowRequestAmount${item.key}-${degradeRuleItem.key}`, {
                            initialValue: degradeRuleItem.rtSlowRequestAmount || 5,
                            // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                          })(
                            <InputNumber disabled={disabled} style={{width: "100%"}}/>
                          )}
                        </FormItem>
                      </Col>}
                      {degradeRuleItem.grade === 1 && <Col span={7}>
                        <FormItem {...formItemLayout} label="最小请求数">
                          {getFieldDecorator(`minRequestAmount${item.key}-${degradeRuleItem.key}`, {
                            initialValue: degradeRuleItem.minRequestAmount,
                            // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                          })(
                            <InputNumber disabled={disabled} style={{width: "100%"}}/>
                          )}
                        </FormItem>
                      </Col>}
                      <Col span={7}>
                        <FormItem {...formItemLayout} label="失效间隔时间(s)">
                          {getFieldDecorator(`timeWindow${item.key}-${degradeRuleItem.key}`, {
                            initialValue: degradeRuleItem.timeWindow || 5,
                            // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                          })(
                            <InputNumber disabled={disabled} style={{width: "100%"}}/>
                          )}
                        </FormItem>
                      </Col>
                      {this.deleteButton("degradeRule", item.key, degradeRuleItem.key)}
                    </Row>))}
                    {!disabled&&<div style={{display: "flex", justifyContent: "center"}}>
                      <Button type="link" icon="plus" onClick={() => this.add("degradeRule", item.key)}>添加熔断参数配置</Button>
                    </div>}
                  </div>
                  <div style={{border: "1px dashed #1890ff", marginBottom: "10px", paddingTop: "10px"}}>
                    {item.flowRuleConfigs.map(flowRuleItem => (flowRuleItem.show&&<Row key={flowRuleItem.key} style={{position: "realtive"}}>
                      <Col span={7}>
                        <FormItem {...formItemLayout} label="控制类型">
                          {getFieldDecorator(`flowRuleGrade${item.key}-${flowRuleItem.key}`, {
                            initialValue: flowRuleItem.grade || 1,
                            // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                          })(
                            <Select disabled={disabled} style={{width: "100%"}} onChange={value => this.selectChange("flowRule", item.key, flowRuleItem.key, value)}>
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
                        {getFieldDecorator(`flowRuleCount${item.key}-${flowRuleItem.key}`, {
                          initialValue: flowRuleItem.count,
                          // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                        })(
                          <InputNumber disabled={disabled} style={{width: "100%"}}/>
                        )}
                      </FormItem>
                    </Col>
                      {flowRuleItem.grade === 1&&<Col span={7}>
                        <FormItem {...formItemLayout} label="流量控制策略">
                          {getFieldDecorator(`controlBehavior${item.key}-${flowRuleItem.key}`, {
                            initialValue: flowRuleItem.controlBehavior || 0,
                            // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                          })(
                            <Select disabled={disabled} style={{width: "100%"}} onChange={value => this.selectChange("controlBehavior", item.key, flowRuleItem.key, value)}>
                              <Option value={0}>直接拒绝</Option>
                              <Option value={1}>冷启动</Option>
                              <Option value={2}>匀速排队</Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>}
                      {flowRuleItem.controlBehavior === 2&&<Col span={7}>
                        <FormItem {...formItemLayout} label="最大等待时间(ms)">
                          {getFieldDecorator(`maxQueueingTimeMs${item.key}-${flowRuleItem.key}`, {
                            initialValue: flowRuleItem.maxQueueingTimeMs || 500,
                            // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                          })(
                            <InputNumber disabled={disabled} style={{width: "100%"}}/>
                          )}
                        </FormItem>
                      </Col>}
                      {this.deleteButton("flowRule", item.key, flowRuleItem.key)}
                    </Row>))}
                    {!disabled&&<div style={{display: "flex", justifyContent: "center"}}>
                      <Button type="link" icon="plus" onClick={() => this.add("flowRule", item.key)} >添加流量参数配置</Button>
                    </div>}
                  </div>
                </div>)
                ))}
              </div>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(SentinelConfig);
