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
import { queryEdaTopicRelationList } from "../request/service";
import "./../../../common/style/index.less";
import moment from "moment";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class RelationDetail extends React.Component {
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
      edaTopicRelationVo: {
        // page: {
        //   doPagination: false
        // },
        id
      }
    };
    queryEdaTopicRelationList(data).then(res => {
      if (
        res.reply.returnCode.type === "S" &&
        res.reply.result.list.length > 0
      ) {
        this.setState({
          relationDetail: res.reply.result.list[0]
        });
      }
    });
  };
  //返回
  toIndex = () => {
    let path = {
			pathname: '/eventDriven/edaTopicRelation/index'
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
export default Form.create()(RelationDetail);
