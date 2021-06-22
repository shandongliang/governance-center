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
  Radio
} from "antd";
import "../../container/common/style/index.less";
import SentinelConfig from "./sentinelConfig";
import ServiceSentinelConfig from "./serviceSentinelConfig"

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

export default class PolicyConfig extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isSentinel: false,
      sentinelConfigZk: {}
    };
  }
  componentDidMount() {
    this.setInitialValue();
  }

  setInitialValue = () => {
    if(this.props.sentinelConfigZk && this.props.sentinelConfigZk.active){
      this.setState({
        isSentinel: this.props.sentinelConfigZk.active
      })
    }
  }

  isSentinelActiveChange = value => {
    const { sentinelConfigZk } = this.state;
    let isSentinel = value.target.value;
    this.setState({
      isSentinel
    });
    sentinelConfigZk.active = value.target.value;
    this.props.returnSentinelConfig(sentinelConfigZk);
  };
  returnSentinelConfig = sentinelConfigZk => {
    sentinelConfigZk.active = this.state.isSentinel;
    this.setState({
      sentinelConfigZk
    });
    this.props.returnSentinelConfig(sentinelConfigZk);
  }

  render() {
    const { isSentinel } = this.state;
    const {
      disabled = false,
      moduleList,
      querySgSubmoduleBusinessConfigList,
      querySgServiceList,
      sentinelConfigZk = {},
      fromPageType = "serviceUnit"
    } = this.props;
    const buttonStyle = {
      borderRadius: 5,
      margin: 5
    };
    return (
      <div>
        <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
          <TabPane
            tab={
              <span>
                熔断流量控制
                <span style={{ color: "green", fontSize: 16, marginLeft: 40 }}>
                  <Radio.Group
                    value={isSentinel}
                    onChange={this.isSentinelActiveChange}
                    disabled={disabled}
                  >
                    <Radio value={true}>启用</Radio>
                    <Radio value={false}>停用</Radio>
                  </Radio.Group>
                </span>
              </span>
            }
            key="1"
          >
            {isSentinel ? (
              fromPageType === "service"?
                <ServiceSentinelConfig
                  disabled={disabled}
                  returnSentinelConfig={this.returnSentinelConfig}
                  sentinelConfigZk={sentinelConfigZk}
                />:
                <SentinelConfig
                  disabled={disabled}
                  moduleList={moduleList}
                  querySgSubmoduleBusinessConfigList={
                    querySgSubmoduleBusinessConfigList
                  }
                  querySgServiceList={querySgServiceList}
                  returnSentinelConfig={this.returnSentinelConfig}
                  sentinelConfigZk={sentinelConfigZk}
                />
            ) : null}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
