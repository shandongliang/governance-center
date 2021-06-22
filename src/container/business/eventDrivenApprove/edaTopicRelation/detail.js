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
import { queryEdaTopicProducerRelationshipApproveList } from "../request/service";
import "./../../../common/style/index.less";
import moment from "moment";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class RelationApproveDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor() {
    super();
    this.state = {
      relationDetail: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.location.state;
    this.queryRelationDetail(id);
  }
  //根据Id查询详情
  queryRelationDetail = id => {
    let data = {
      edaTopicProducerRelationshipApproveVo: {
        // page: {
        //   doPagination: false
        // },
        id
      }
    };
    queryEdaTopicProducerRelationshipApproveList(data).then(res => {
      if (
        res.reply.returnCode.type === "S" &&
        res.reply.result.resultList.length > 0
      ) {
        this.setState({
          relationDetail: res.reply.result.resultList[0]
        });
      }
    });
  };
  //返回
  toIndex = () => {
    let path = {
			pathname: '/eventDrivenApprove/edaTopicRelation/index'
		};
		goToAndClose(path, "主题生产者关系查询");
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
    const { relationDetail } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="修改主题生产者关系" key="1">
              <Form>
                <Row style={{ marginTop: 10 }}>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="主题名称">
                      {getFieldDecorator("topicName", {
                        initialValue: relationDetail.topicName,
                        rules: [{ required: true, message: "请选择主题名称" }]
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="生产者ID">
                      {getFieldDecorator("producerId", {
                        initialValue: relationDetail.producerId,
                        rules: [{ required: true, message: "请选择生产者ID" }]
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="版本">
                      {getFieldDecorator("version", {
                        initialValue: relationDetail.version,
                        rules: [{ required: true, message: "请输入版本" }]
                      })(<InputNumber disabled min={0} style={{ width: "100%" }} />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="负责人">
                      {getFieldDecorator("principalPerson", {
                        initialValue: relationDetail.principalPerson,
                        rules: [{ required: true, message: "请输入负责人" }]
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="负责人邮箱">
                      {getFieldDecorator("principalPersonMail", {
                        initialValue: relationDetail.principalPersonMail,
                        rules: [{ required: true, message: "请输入负责人邮箱" }]
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="负责人电话">
                      {getFieldDecorator("principalPersonPhone", {
                        initialValue: relationDetail.principalPersonPhone,
                        rules: [{ required: true, message: "请输入负责人电话" }]
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="运维负责人">
                      {getFieldDecorator("operateAndMaitenPerson", {
                        initialValue: relationDetail.operateAndMaitenPerson,
                        rules: [{ required: true, message: "请输入运维负责人" }]
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="运维负责人电话">
                      {getFieldDecorator("operateAndMaitenPersonPhone", {
                        initialValue:
                          relationDetail.operateAndMaitenPersonPhone,
                        rules: [
                          { required: true, message: "请输入运维负责人电话" }
                        ]
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="状态">
                      {getFieldDecorator("status", {
                        initialValue: relationDetail.status || "Y",
                        rules: [{ required: true, message: "请选择状态" }]
                      })(
                        <Select disabled>
                          <Select.Option value="Y">生效</Select.Option>
                          <Select.Option value="N">失效</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="上线状态">
                      {getFieldDecorator("onlineStatus", {
                        initialValue: relationDetail.onlineStatus,
                        rules: [{ required: true, message: "请选择上线状态" }]
                      })(
                        <Select disabled>
                          <Select.Option value="0">未上线</Select.Option>
                          <Select.Option value="1">上线中</Select.Option>
                          <Select.Option value="2">已上线</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="上线日期">
                      {getFieldDecorator("publishDate", {
                        initialValue: moment(relationDetail.publishDate),
                        rules: [{ required: true, message: "请选择上线日期" }]
                      })(<DatePicker disabled style={{ width: "100%" }} />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="修改类型">
                      {getFieldDecorator("changeType", {
                        initialValue: relationDetail.changeType,
                        rules: [{ required: true, message: "请选择修改类型" }]
                      })(
                        <Select disabled>
                          <Select.Option value="00">增加</Select.Option>
                          <Select.Option value="01">删除</Select.Option>
                          <Select.Option value="10">修改</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="修改描述">
                      {getFieldDecorator("changeDescribe", {
                        initialValue: relationDetail.changeDescribe,
                        rules: [{ required: true, message: "请输入修改描述	" }]
                      })(<Input.TextArea disabled />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="使用场景">
                      {getFieldDecorator("usageScenarios", {
                        initialValue: relationDetail.usageScenarios,
                        rules: [{ required: true, message: "请选择使用场景" }]
                      })(<Input.TextArea disabled />)}
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
export default Form.create()(RelationApproveDetail);
