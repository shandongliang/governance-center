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
  createEdaTopicRelation,
  queryEdaProducerList,
  queryEdaTopicList
} from "../request/service";
import "./../../../common/style/index.less";
import moment from "moment";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class RelationCreate extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor() {
    super();
    this.state = {
      topicList: [],
      producerList: []
    };
  }

  componentDidMount(){
    this.queryProducer();
    this.queryTopic();
  }

  // 查询主题
  queryTopic = () => {
    let data = {
      edaTopic: {
        page: {
          doPagination: false
        }
      }
    };
    queryEdaTopicList(data).then(res => {
      let topicList = res.reply.topicList.list;
      this.setState(
        {
          topicList
        });
    });
  };

  // 查询生产者
  queryProducer = () => {
    let data = {
      edaProducerVo: {
        page: {
          doPagination: false
        }
      }
    };
    queryEdaProducerList(data).then(res => {
      let producerList = res.reply.producerList.resultList;
      this.setState(
        {
          producerList
        });
    });
  };
  //返回
  toIndex = () => {
    let path = {
			pathname: '/eventDriven/edaTopicRelation/index'
		};
		goToAndClose(path, "主题生产者关系查询");
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });
        const { submoduleId } = this.state;
        let data = {
          list: [
            {
              ...values,
              createUserId: JSON.parse(
                sessionStorage.getItem("$pandora_auth.user_info")
              ).userId
            }
          ]
        };
        createEdaTopicRelation(data).then(res => {
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
    const { topicList, producerList } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="创建主题生产者关系" key="1">
              <Form>
                <Row style={{ marginTop: 10 }}>
                <Col span={12}>
                <FormItem {...formItemLayout} label="主题名称">
                  {getFieldDecorator("topicName", {
                    rules: [{ required: true, message: "请选择主题名称" }]
                  })(
                    <Select showSearch>
                      {topicList.map(item=>(
                        <Select.Option key={item.id} value={item.topicName}>{item.topicName}</Select.Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                    <FormItem {...formItemLayout} label="生产者ID">
                      {getFieldDecorator("producerId", {
                        rules: [{ required: true, message: "请选择生产者ID" }]
                      })(
                        <Select showSearch>
                          {producerList.map(item=>(
                            <Select.Option key={item.id} value={item.producerId}>{item.producerId}</Select.Option>
                          ))}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  {/* <Col span={12}>
                    <FormItem {...formItemLayout} label="版本">
                      {getFieldDecorator("version", {
                        rules: [{ required: true, message: "请输入版本" }]
                      })(<InputNumber min={0} style={{ width: "100%" }} />)}
                    </FormItem>
                  </Col> */}
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
export default Form.create()(RelationCreate);
