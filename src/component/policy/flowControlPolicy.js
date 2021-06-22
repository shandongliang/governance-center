import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Icon,
  Select,
  Tabs,
  Row,
  Col,
  Input,
  InputNumber,
  Radio,
  Tooltip,
  Form,
  Button,
  Modal
} from "antd";
import EditableTable from "../editableTable/editableTable";
import "../../container/common/style/index.less";
import { getPromptText } from "./commonData";

const Option = Select.Option;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

export class ServiceFlowControlPolicy extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      status: "N"
    };
  }
  componentDidMount() {
    this.setInitialValue();
  }

  setInitialValue() {
    const {
      status,
      groupList = [],
      singlePolicyValue
    } = this.props.flowControlPolicy;
    this.setState({
      status,
      flowGroupList: groupList,
      maxFlow: singlePolicyValue
    });
  }

  flowControlPolicyPolicyChange = value => {
    let status = value.target.value;
    this.setState({
      status
    });
    this.props.flowControlPolicyPolicyChange(status);
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    };
    const { subModuleFlowGroupList = [], form, disabled = false } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { status, flowGroupList = [], maxFlow } = this.state;

    return (
      <div>
        <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
          <TabPane
            tab={
              <span>
                流量控制策略
                <Tooltip title={getPromptText("all", "流量值")}>
                  <Icon
                    style={{
                      fontSize: 16,
                      position: "relative",
                      top: 2,
                      left: 6
                    }}
                    type="question-circle-o"
                  />
                </Tooltip>
                <span style={{ color: "green", fontSize: 16, marginLeft: 70 }}>
                  <Radio.Group
                    value={status}
                    disabled={disabled}
                    onChange={this.flowControlPolicyPolicyChange}
                  >
                    <Radio value="Y">启用</Radio>
                    <Radio value="N">停用</Radio>
                  </Radio.Group>
                </span>
              </span>
            }
            key="1"
          >
            {status === "Y" && (
              <Row style={{ marginTop: 10 }}>
                <Col span={10} offset={1} style={{ display: "block" }}>
                  <FormItem {...formItemLayout} label="最大流量值">
                    {getFieldDecorator("maxFlow", {
                      initialValue: maxFlow
                    })(<InputNumber min={0} disabled={disabled} />)}
                  </FormItem>
                </Col>
                <Col span={1}>
                  <Tooltip title={getPromptText("num", "流量值")}>
                    <Icon
                      style={{
                        fontSize: 20,
                        position: "relative",
                        top: 6,
                        left: 6
                      }}
                      type="question-circle-o"
                    />
                  </Tooltip>
                </Col>
                <Col span={10}>
                  <FormItem {...formItemLayout} label="分组策略">
                    {getFieldDecorator("flowGroupList", {
                      initialValue: flowGroupList
                    })(
                      <Select disabled={disabled} mode="multiple">
                        {subModuleFlowGroupList.length > 0 &&
                          subModuleFlowGroupList.map((item, index) => (
                            <Select.Option value={item.groupName} key={index}>
                              {item.groupName}
                            </Select.Option>
                          ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={1}>
                  <Tooltip title={getPromptText("policy", "tps")}>
                    <Icon
                      style={{
                        fontSize: 20,
                        position: "relative",
                        top: 6,
                        left: 6
                      }}
                      type="question-circle-o"
                    />
                  </Tooltip>
                </Col>
              </Row>
            )}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export class SubModuleFlowControlPolicy extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      status: "N",
      list: [],
      data: [],
      columns: [
        {
          title: "组名",
          dataIndex: "flowGroupName",
          width: 100,
          required: true
        },
        {
          title: "流量关键字",
          dataIndex: "flowType",
          width: 100,
          required: true
        },
        {
          title: "最大tps数",
          dataIndex: "flowValue",
          width: 100,
          required: true
        },
        {
          title: "操作",
          dataIndex: "action",
          width: 60
        }
      ]
    };
  }
  componentDidMount() {
    this.setInitialValue();
  }

  setInitialValue() {
    const { flowControlPolicy, disabled = false } = this.props;
    const { status, groupPolicyList = [] } = flowControlPolicy;
    let list = groupPolicyList.map((item, index) => {
      return {
        key: index,
        show: true,
        flowGroupName: item.groupName,
        flowType: item.type,
        flowValue: item.value
      };
    });
    this.setState({
      status,
      list,
      data: list
    });
    if (!disabled) {
      this.props.returnFlowControlPolicyPolicy(list);
    }
  }

  add = () => {
    let list = this.state.list;
    let length = list.length;
    list.push({
      key: length,
      show: true
    });
    this.filterData(list);
  };

  delete = record => {
    let list = this.state.list;
    let _this = this;
    Modal.confirm({
      title: `你确定删除该数据吗？`,
      okText: "确定",
      cancelText: "取消",
      onOk() {
        list[record.key].show = false;
        _this.filterData(list);
      },
      onCancel() {
        return;
      }
    });
  };

  filterData = list => {
    let data = list.filter(item => item.show === true);
    this.setState(
      {
        list,
        data
      },
      () => {
        // console.log(this.state);
      }
    );
    this.props.returnFlowControlPolicyPolicy(data);
  };

  flowControlPolicyPolicyChange = value => {
    let status = value.target.value;
    this.setState({
      status
    });
    this.props.flowControlPolicyPolicyChange(status);
  };

  render() {
    const { data, columns, status } = this.state;
    const { form, disabled = false } = this.props;
    return (
      <div>
        <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
          <TabPane
            tab={
              <span>
                流量控制策略
                <Tooltip title={getPromptText("all", "并发数")}>
                  <Icon
                    style={{
                      fontSize: 16,
                      position: "relative",
                      top: 2,
                      left: 6
                    }}
                    type="question-circle-o"
                  />
                </Tooltip>
                <span style={{ color: "green", fontSize: 16, marginLeft: 70 }}>
                  <Radio.Group
                    value={status}
                    disabled={disabled}
                    onChange={this.flowControlPolicyPolicyChange}
                  >
                    <Radio value="Y">启用</Radio>
                    <Radio value="N">停用</Radio>
                  </Radio.Group>
                </span>
              </span>
            }
            key="1"
          >
            {status === "Y" && (
              <Row style={{ marginTop: 10 }}>
                <Button
                  onClick={this.add}
                  type="dashed"
                  style={{ width: "100px", marginLeft: 4 }}
                  disabled={disabled}
                >
                  <Icon type="plus" />
                </Button>
                <EditableTable
                  form={form}
                  data={data}
                  columns={columns}
                  delete={this.delete}
                  disabled={disabled}
                  // width={1200}
                />
              </Row>
            )}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
