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
  AutoComplete
} from "antd";
import {
  createServerConfigList,
  queryLDCList,
  querySgModuleBusinessConfigList,
  querySgSubmoduleBusinessConfigList
} from "../request/service";
import { SERVICEP_PROTOCOL } from "../request/common";
import "./../../../common/style/index.less";
import moment from "moment";
import { goTo, goToAndClose } from "../../../../util/tabRouter";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class ServiceNodeCreate extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor() {
    super();
    this.state = {
      moduleList: [],
      subModuleList: [],
      subModuleDisabled: true,
      ldcList: []
    };
  }

  componentDidMount() {
    this.queryModuleList();
    this.queryLDC();
  }
  queryLDC = () => {
    queryLDCList().then(res => {
      if (res.reply.returnCode.type === "S") {
        let ldcList = res.reply.result.map(item => {
          return item.ldcId;
        });
        this.setState({
          ldcList
        });
      }
    });
  };
  queryModuleList = () => {
    let data = {
      sgModuleBusinessConfigVo: {}
    };
    querySgModuleBusinessConfigList(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        this.setState({
          moduleList: res.reply.resultList
        });
      }
    });
  };
  querySubModuleList = moduleCode => {
    let data = {
      sgSubmoduleBusinessConfigVo: {
        moduleCode
      }
    };
    querySgSubmoduleBusinessConfigList(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        this.setState({
          subModuleList: res.reply.result.list,
          subModuleDisabled: false
        });
      }
    });
  };
  moduleChange = value => {
    this.setState({
      subModuleDisabled: true
    });
    this.props.form.resetFields(["subModuleCode"]);
    this.querySubModuleList(value);
  };
  //返回
  toIndex = () => {
    let path = {
      pathname: "/gateway/registeredNodesManage/index"
    };
    goToAndClose(path, "注册节点查询");
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {
          weight: values.weight ? values.weight.toString() : ""
        };
        let param = {
          serverConfigList: [
            {
              ...values,
              serviceContext: JSON.stringify(data),
              createUserId: JSON.parse(
                sessionStorage.getItem("$pandora_auth.user_info")
              ).userId
            }
          ]
        };
        createServerConfigList(param).then(res => {
          //返回信息
          this.setState({
            loading: false
          });
          if (res.reply.returnCode.type === "S") {
            message.info("创建成功");
            this.toIndex();
          } else {
            message.info("创建失败");
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
    const {
      ldcList,
      moduleList,
      subModuleList,
      subModuleDisabled
    } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="创建注册节点" key="1">
              <Form>
                <Row style={{ marginTop: 10 }}>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="模块编码">
                      {getFieldDecorator("moduleCode", {
                        rules: [{ required: true, message: "请选择模块编码" }]
                      })(
                        <Select onChange={this.moduleChange} showSearch>
                          {moduleList.map(item => (
                            <Option
                              value={item.moduleCode}
                              key={item.moduleCode}
                            >
                              {item.moduleCode}
                            </Option>
                          ))}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="服务单元编码">
                      {getFieldDecorator("submoduleId", {
                        rules: [
                          {
                            required: true,
                            message: "请选择服务单元编码"
                          }
                        ]
                      })(
                        <Select
                          onChange={this.subModuleChange}
                          disabled={subModuleDisabled}
                          showSearch
                        >
                          {subModuleList.map(item => (
                            <Option
                              value={item.subModuleCode}
                              key={item.subModuleCode}
                            >
                              {item.subModuleCode}
                            </Option>
                          ))}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="所属ldcId">
                      {getFieldDecorator("ldcId", {
                        rules: [
                          {
                            required: true,
                            message: "请选择所属ldcId"
                          }
                        ]
                      })(
                        <Select>
                          {ldcList.map(item => (
                            <Option value={item} key={item}>
                              {item}
                            </Option>
                          ))}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="服务协议">
                      {getFieldDecorator("serviceSocket", {
                        rules: [{ required: true, message: "请选择服务协议" }]
                      })(
                        <AutoComplete>
                          {SERVICEP_PROTOCOL.map(item => (
                            <AutoComplete.Option key={item} value={item}>
                              {item}
                            </AutoComplete.Option>
                          ))}
                        </AutoComplete>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="节点地址及端口">
                      {getFieldDecorator("serviceAddress", {
                        rules: [
                          { required: true, message: "请输入节点地址及端口" }
                        ]
                      })(<Input placeholder="示例:127.0.0.1:8080" />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="节点权重">
                      {getFieldDecorator("weight", {})(
                        <InputNumber
                          min={0}
                          max={99}
                          precision={0}
                          placeholder="0-99的整数"
                          style={{width: "100%"}}
                        />
                      )}
                    </FormItem>
                  </Col>
                </Row>
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
export default Form.create()(ServiceNodeCreate);
