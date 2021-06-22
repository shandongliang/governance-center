import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  DatePicker,
  Button,
  message,
  Table,
  Tabs,
  Form,
  Row,
  Col,
  Input,
  Select
} from "antd";
import {
  queryZKMeta
} from "../service/service";
import "./../../../common/style/index.less";
import "./index.less";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class PathQuery extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      data: [],
      isJSON: false,
      filterValue: {
        path: "",
        type: ""
      }
    };
  }
  
  componentDidMount() {
    // this.fetchData();
  }
  // 查询数据
  fetchData = () => {
    this.setState({ loading: true });
    const { filterValue, pagination } = this.state;
    let data = {
      path: filterValue.path,
      type: filterValue.type
    };
    queryZKMeta(data).then(res => {
      let isJSON = this.isJSON(res.reply.result);
      this.setState(
        {
          data: res.reply.result,
          isJSON,
          loading: false
        },
        () => {
          // console.log(this.state)
        }
      );
    });
  };

  isJSON = str => {
    if(typeof str === "string"){
      try {
        let obj = JSON.parse(str);
        if(typeof obj === "object" && obj){
          return true;
        } else {
          return false;
        }
      } catch(e){
        console.log(`error:${str}!!!${e}`);
        return false;
      }
    }
  }
  

  // 获取筛选数据
  onChildQuery = filterValue => {
    this.setState(
      {
        filterValue,
        data: ""
      },
      () => {
        this.fetchData();
      }
    );
  };
  render() {
    const buttonStyle = {
      borderRadius: 5,
      marginLeft: 10
    };
    const { loading, isJSON, data } = this.state;

    return (
      <div style={{ position: "relative", height: "100%" }}>
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="ZK路径查询" key="1">
                <div className="portlet-body">
                  <div className="query-condition">
                    <WrapperQueryForm
                      callbackParent={this.onChildQuery}
                    />
                  </div>
                  <div>
                    {data === ""?<span>暂无数据</span>:(isJSON?<pre>{JSON.stringify(JSON.parse(data), null, 4)}</pre>:<span>{data}</span>)}
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

class QueryForm extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  handleReset = () => {
    this.props.form.resetFields();
    this.handleSearch();
  };

  handleSearch = e => {
    this.props.form.validateFields((err, values) => {
      let data = {
        ...values
      };
      this.props.callbackParent(data);
    });
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Row style={{ marginTop: 18 }}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="路径">
              {getFieldDecorator("path",{
                rules: [{required: true, message: '请输入路径'}]
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="类型">
              {getFieldDecorator("type",{
                initialValue: ""
               })(
                <Select>
                  <Select.Option value="">节点内容</Select.Option>
                  <Select.Option value="CHILDNODES">子节点</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout}>
              <Button
                onClick={this.handleSearch}
                type="primary"
                className="queryDataBtn"
              >
                查询
              </Button>
              <Button onClick={this.handleReset} className="queryDataBtn">
                清空
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
const WrapperQueryForm = Form.create()(QueryForm);
