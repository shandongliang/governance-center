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
  InputNumber
} from "antd";
import {
  queryEdaSubscribeList
} from "../request/service";
import "./../../../common/style/index.less";
import moment from "moment";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class SubscribeDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor() {
    super();
    this.state = {
      subscribeDetail: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.location.state;
    this.querySubsrcibeDetail(id);
  }
  //根据Id查询详情
  querySubsrcibeDetail = id => {
    let data = {
      edaSubscribe: {
        // page: {
        //   doPagination: false
        // },
        id
      }
    };
    queryEdaSubscribeList(data).then(res => {
      if (
        res.reply.returnCode.type === "S" &&
        res.reply.resultList.resultList.length > 0
      ) {
        this.setState({
          subscribeDetail: res.reply.resultList.resultList[0]
        });
      }
    });
  };
  //返回
  toIndex = () => {
    let path = {
      pathname: '/eventDriven/edaSubscribe/index'
    };
    goToAndClose(path, "服务订阅查询");
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
    const { subscribeDetail } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="修改订阅关系" key="1">
              <Form>
                <Row style={{ marginTop: 10 }}>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="主题名称">
                      {getFieldDecorator("topicName", {
                        initialValue: subscribeDetail.topicName,
                        rules: [{ required: true, message: "请选择主题名称" }]
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="消费者ID">
                      {getFieldDecorator("consumerId", {
                        initialValue: subscribeDetail.consumerId,
                        rules: [{ required: true, message: "请选择消费者ID" }]
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="是否幂等">
                      {getFieldDecorator("idempotent", {
                        initialValue: subscribeDetail.idempotent,
                        rules: [{ required: true, message: "请选择是否幂等" }]
                      })(
                        <Select disabled>
                          <Select.Option value="Y">是</Select.Option>
                          <Select.Option value="N">否</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="获取消息模式">
                      {getFieldDecorator("consumeMode", {
                        initialValue: subscribeDetail.consumeMode,
                        // rules: [{ required: true, message: "请选择获取消息模式" }]
                      })(
                        <Select disabled>
                          <Select.Option value="earliest">最早</Select.Option>
                          <Select.Option value="latest">最新</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="版本">
                      {getFieldDecorator("version", {
                        initialValue: subscribeDetail.version,
                        rules: [{ required: true, message: "请输入版本" }]
                      })(<InputNumber disabled min={0} style={{ width: "100%" }} />)}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
              <Row type="flex">
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
export default Form.create()(SubscribeDetail);
