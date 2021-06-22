import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import moment from "moment";
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
  Tabs,
  message
} from "antd";
import { Form, Row, Col, Input, Radio } from "antd";
import SelectSubModule from '../../../../component/selectSubModule/selectCommonSubModule';
import { DATE_FORMAT_MOMENT } from "./../../../../constant/index";
import $fetch from "$fetch";

import { randomNamber } from "../../../../util/publicFuc";

import "./../../../common/style/index.less";
import { goTo, goToAndClose } from '../../../../util/tabRouter';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class databaseAttach extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 }
    };
    return (
      <div>
        <div className="pandora-main-content">
          <div className="portlet-tab">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="分库分表绑定" key="1">
                <div className="portlet-body">
                  <WrapperCreateForm />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

class CreateForm extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      module4Data: [],
      subModuleCode: ""
    };
  }
  componentDidMount() {
    this.fenkufenbiao();
  }
  fenkufenbiao = () => {
    let reqSeqNo = randomNamber();
    this.setState({ loading: true });
    let params = {
      paginator: {
        pageNo: 1,
        recordsPerPage: 99999
      },
      reqSeqNo: reqSeqNo
    };
    $fetch({
      url: "/tesla-gateway-console-app/eda/queryEdaDatabasePartationRulesList",
      data: { ...params }
    }).then(res => {
      let module4D = [];
      for (let i = 0; i < res.reply.list.rulesList.length; i++) {
        module4D.push(res.reply.list.rulesList[i].ruleName);
      }
      this.setState({
        module4Data: module4D,
        loading: false
      });
    });
  };

  toIndex = () => {
    let path = {
			pathname: '/eventDriven/database/index'
		};
		goToAndClose(path, "分库分表查询");
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let reqSeqNo = randomNamber();
        let par = values;
        let subModuleCode = this.state.subModuleCode;
        let param = {
          subModuleCode: this.state.subModuleCod,
          subModuleId: this.state.subModuleCod,
          ...values,
          reqSeqNo: reqSeqNo
        };
        this.setState({ loading: true });
        this.toSure(param);
      }
    });
  };

  toSure = param => {
    let id = this.props.id;
    let _this = this;
    Modal.confirm({
      title: "请确认绑定规则",
      content: (
        <div>
          <div className="pro">
            <span>规则名称：</span>
            <span>{param.ruleName}</span>
          </div>
        </div>
      ),
      onOk() {
        if(this.state.subModuleCode===""){
          message.warning("请选择服务单元！")
        }
        _this.setState({ loading: true });
        $fetch({
          url: "/tesla-gateway-console-app/eda/addRulesToSubModule",
          data: param
        }).then(res => {
          if (res.reply.returnCode.type == "S") {
            _this.messages();
          }
        });
      },
      onCancel() {
        message.info("取消");
      }
    });
  };

  messages = () => {
    let _this = this;
    Modal.confirm({
      title: "状态",
      content: <div>绑定完成</div>,
      onOk() {
        _this.props.form.resetFields(["ruleName"]);
        _this.setState(
          {
            module4Data: []
          },
          () => {
            _this.fenkufenbiao();
          }
        );
      },
      onCancel() {
        message.info("取消");
      }
    });
  };

  onChildQuery = subModuleCode => {
    this.setState({
      subModuleCode
    })
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 10 }
    };
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="edaSub">
        <SelectSubModule callbackParent={this.onChildQuery} wrapperCol={10} />
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <FormItem label="分库分表规则：" hasFeedback {...formItemLayout}>
              {getFieldDecorator("ruleName", {
                initialValue: "",
                rules: [
                  {
                    required: true,
                    message: "请选择规则"
                  }
                ]
              })(
                <Select showSearch>
                  {this.state.module4Data.map(item => (
                    <Option value={item}>{item}</Option>
                  ))}
                </Select>
              )}
            </FormItem>

            <div>
              <Button
                htmlType="submit"
                className="operatorBtn"
                style={{
                  marginLeft: 50,
                  width: 88,
                  fontSize: 16,
                  borderRadius: 5
                }}
              >
                提交
              </Button>
              <Button
                onClick={this.toIndex}
                className="cancelBtn"
                style={{
                  marginLeft: 10,
                  width: 88,
                  fontSize: 16,
                  borderRadius: 5
                }}
              >
                取消
              </Button>
            </div>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrapperCreateForm = Form.create()(CreateForm);
