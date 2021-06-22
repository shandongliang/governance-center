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
  AutoComplete
} from "antd";
import "../../container/common/style/index.less";

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;

class Protocol extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      status: "Z",
      backupLdcList: [],
      specialKeySubmitList: [],
      tableLdcList: [],
      ldcIdList: ["M","M1","P","P1"]
    };
  }
  componentDidMount() {}

  //添加服务协议及模板
  addProtocol = () => {
    let protocolList = this.state.protocolList;
    let protocolListShow = [];
    for (let i = 0; i < protocolList.length; i++) {
      if (protocolList[i].show) {
        protocolListShow.push(protocolList[i]);
      }
    }
    if (!(protocolListShow.length < 12)) {
      message.info("发布服务协议-协议URL模版-URI 最多配置12条!");
      return;
    }
    protocolList.push({
      serviceProtocol: "",
      protocolTemplete: "",
      contextType: "",
      show: true
    });
    this.setState(
      {
        protocolList
      },
      () => {
        // console.log(this.state.list)
      }
    );
  };

  //服务协议改变，模板和类型也改变
  serviceProtocolChange = (value, index) => {
    this.props.form.resetFields([
      `protocolTemplete${index}`,
      `contextType${index}`
    ]);
    let protocolList = this.state.protocolList;
    let serviceProtocol = value.replace("-", "_");
    if (SERVICEP_PROTOCOL.indexOf(value) > -1) {
      protocolList[index].protocolTemplete =
        PROTOCOL[serviceProtocol].protocolTemplete;
      protocolList[index].contextType = PROTOCOL[serviceProtocol].contextType;
    } else {
      protocolList[index].protocolTemplete = "";
      protocolList[index].contextType = "";
    }
    this.setState({
      protocolList
    });
  };

  //删除服务协议及模板
  protocolDelete = index => {
    let protocolList = this.state.protocolList;
    let _this = this;
    Modal.confirm({
      title: `你确定删除该发布服务协议-协议URL模版吗？`,
      okText: "确定",
      cancelText: "取消",
      onOk() {
        protocolList[index].show = false;
        _this.setState({
          protocolList
        });
      },
      onCancel() {
        return;
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { protocolList } = this.state;
        let protocolsSubmitList = [];
        protocolList.map((item, index) => {
          if (item.show) {
            protocolsSubmitList.push({
              key: values[`serviceProtocol${index}`],
              val: values[`protocolTemplete${index}`],
              msgType: values[`contextType${index}`]
            });
          }
        });

        let isSameService = [];
        if (protocolsSubmitList.length > 1) {
          for (let i = 0; i < protocolsSubmitList.length; i++) {
            if (isSameService.indexOf(protocolsSubmitList[i].type) === -1) {
              isSameService.push(protocolsSubmitList[i].type);
            } else {
              message.error("发布服务协议 不能重复!");
              return;
            }
          }
        }
        this.props.returnProtocol(protocolsSubmitList);
      }
    });
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    };
    const { getFieldDecorator } = this.props.form;
    const { protocolList } = this.state;

    return (
      <div>
        <Button
          onClick={this.addProtocol}
          type="dashed"
          style={{ width: "100px", marginLeft: 4 }}
        >
          <Icon type="plus" />
        </Button>
        <Form>
          {protocolList.length > 0 &&
            protocolList.map(
              (item, index) =>
                item.show && (
                  <Row key={index} style={{ marginTop: 10 }}>
                    <Col span={7}>
                      <FormItem
                        {...formItemLayout}
                        label="发布服务协议"
                      >
                        {getFieldDecorator(`serviceProtocol${index}`, {
                          initialValue: item.serviceProtocol,
                          rules: [
                            { required: true, message: "请选择发布服务协议" }
                          ]
                        })(
                          <AutoComplete
                            onChange={value =>
                              this.serviceProtocolChange(value, index)
                            }
                          >
                            {SERVICEP_PROTOCOL.map(serviceProtocolItem => (
                              <AutoComplete.Option
                                key={serviceProtocolItem}
                                value={serviceProtocolItem}
                              >
                                {serviceProtocolItem}
                              </AutoComplete.Option>
                            ))}
                          </AutoComplete>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={7}>
                      <FormItem {...formItemLayout} label="协议URL模版">
                        {getFieldDecorator(`protocolTemplete${index}`, {
                          initialValue: item.protocolTemplete,
                          rules: [
                            { required: true, message: "请输入协议URL模版" }
                          ]
                        })(<Input />)}
                      </FormItem>
                    </Col>
                    <Col span={7}>
                      <FormItem
                        {...formItemLayout}
                        label="报文内容类型"
                      >
                        {getFieldDecorator(`contextType${index}`, {
                          initialValue: item.contextType,
                          rules: [
                            { required: true, message: "请选择报文内容类型" }
                          ]
                        })(
                          <Select>
                            {CONTEXT_TYPE.map(contextTypelItem => (
                              <Select.Option
                                key={contextTypelItem}
                                value={contextTypelItem}
                              >
                                {contextTypelItem}
                              </Select.Option>
                            ))}
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={2} offset={1}>
                      <Icon
                        type="minus-circle"
                        style={{
                          position: "relative",
                          top: 6,
                          cursor: "pointer",
                          color: "red",
                          fontSize: 20
                        }}
                        onClick={() => this.protocolDelete(index)}
                      />
                    </Col>
                  </Row>
                )
            )}
        </Form>
      </div>
    );
  }
}
export default Form.create()(Protocol);
