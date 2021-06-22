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
  Form
} from "antd";
import "../../container/common/style/index.less";
import { getPromptText } from "./commonData";

const Option = Select.Option;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

export default class LoadBalancePolicy extends React.Component {
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
    const { loadBalancePolicy } = this.props;
    const { status } = loadBalancePolicy;
    this.setState({
      status
    });
  }

  loadBalancePolicyChange = value => {
    let status = value.target.value;
    this.setState({
      status
    });
    this.props.loadBalancePolicyChange(status);
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    };
    const { loadBalancePolicy, disabled = false } = this.props;
    const { loadBalanceStrategy = "1" } = loadBalancePolicy;
    const { getFieldDecorator } = this.props.form;
    const { status } = this.state;

    return (
      <div>
        <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
          <TabPane
            tab={
              <span>
                负载均衡策略
                <span style={{ color: "green", fontSize: 16, marginLeft: 70 }}>
                  <Radio.Group
                    value={status}
                    onChange={this.loadBalancePolicyChange}
                    disabled={disabled}
                  >
                    <Radio value="Y">启用</Radio>
                    <Radio value="N">停用</Radio>
                    <Radio value="Z">复用上级配置</Radio>
                  </Radio.Group>
                </span>
              </span>
            }
            key="1"
          >
            {status === "Y" && (
              <Row style={{ marginTop: 10 }}>
                <Col span={10} offset={1} style={{ display: "block" }}>
                  <FormItem {...formItemLayout} label="负载均衡策略类型">
                    {getFieldDecorator("loadBalanceStrategy", {
                      initialValue: loadBalanceStrategy,
                      rules: [{ required: true, message: "默认为：ip_white" }]
                    })(
                      <Select disabled={disabled}>
                        <Option value="1">随机</Option>
                        <Option value="2">轮询</Option>
                        {/* <Option value="4">最小连接数</Option> */}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            )}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
