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
  Select,
  Tooltip
} from "antd";
import {
  queryFunctionCallRecords
} from "../service/service";
import "./../../../common/style/index.less";
import "../ZKStatus/index.less";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class OperationRecord extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      data: [],
      pagination: {
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
        total: 0
      },
      filterValue: {},
      columns: [
        {
          title: "接口名称",
          dataIndex: "functionName",
          width: 100,
          key: "functionName"
        },
        {
          title: "入参",
          dataIndex: "inparams",
          width: 300,
          key: "inparams"
        },
        {
          title: "出参",
          dataIndex: "outparams",
          width: 100,
          render: (text, record, index) => {
            return text && text.length > 20 ? (
              <Tooltip title={text}>
                <span>{text.substring(0, 20) + "..."}</span>
              </Tooltip>
            ) : (
              <span>{text}</span>
            );
          }
        },
        {
          title: "返回码",
          dataIndex: "resultCode",
          width: 100,
          render: (text, record, index) => {
            return text && text.length > 20 ? (
              <Tooltip title={text}>
                <span>{text.substring(0, 20) + "..."}</span>
              </Tooltip>
            ) : (
              <span>{text}</span>
            );
          }
        },
        {
          title: "异常信息",
          dataIndex: "exception",
          width: 100,
          render: (text, record, index) => {
            return text && text.length > 20 ? (
              <Tooltip title={text}>
                <span>{text.substring(0, 20) + "..."}</span>
              </Tooltip>
            ) : (
              <span>{text}</span>
            );
          }
        },
        {
          title: "执行时间",
          dataIndex: "operationTime",
          width: 100,
          render: (text, record, index) => {
            return `${new Date(record.endTime).getTime() - new Date(record.startTime).getTime()}ms`
          }
        },
        // {
        //   title: "请求时间",
        //   dataIndex: "requestTime",
        //   width: 100,
        //   key: "requestTime"
        // },
        // {
        //   title: "返回结果时间",
        //   dataIndex: "responseTime",
        //   width: 100,
        //   key: "responseTime"
        // },
        // {
        //   title: "调用状态",
        //   dataIndex: "status",
        //   width: 100,
        //   key: "status"
        // },
        // {
        //   title: "tesla错误码",
        //   dataIndex: "resultStatus",
        //   width: 100,
        //   key: "resultStatus"
        // },
        // {
        //   title: "tesla上下文信息",
        //   dataIndex: "context",
        //   width: 100,
        //   key: "context"
        // },
        // {
        //   title: "IP",
        //   dataIndex: "ip",
        //   width: 100,
        //   key: "ip"
        // },
        // {
        //   title: "sessionId",
        //   dataIndex: "sessionId",
        //   width: 100,
        //   key: "sessionId"
        // }
      ]
    };
  }
  
  componentDidMount() {
    this.fetchData();
  }
  // 设置当前页
  tableChangeHandle = pagination => {
    let page = Object.assign({}, this.state.pagination, {
      current: pagination.current
    });
    this.setState(
      {
        pagination: page
      },
      () => {
        this.fetchData();
      }
    );
  };
  // 查询数据
  fetchData = () => {
    this.setState({ loading: true });
    const { filterValue, pagination } = this.state;
    let data = {
      functionCallRecord: {
        functionName: filterValue.functionName?filterValue.functionName:null,
        id: null,
        inparams: null,
        outparams: null,
        user: null,
        requestAddress: null,
        sessionId: null
      },
      paginator: {
        pageNo: pagination.current,
        recordsPerPage: pagination.pageSize,
        doPagination: true
      }
    };
    queryFunctionCallRecords(data).then(res => {
      let page = Object.assign({}, this.state.pagination, {
        total: res.reply.page.total
      });
      this.setState(
        {
          data: res.reply.functionCallRecordList,
          pagination: page,
          loading: false
        },
        () => {
          console.log(this.state)
        }
      );
    });
  };

  // 获取执行时间
  getOperationTime = record => {
    return new Date(record.endTime.toString()).getTime() - new Date(record.startTime.toString()).getTime()
  }

  // 获取筛选数据
  onChildQuery = filterValue => {
    let page = Object.assign({}, this.state.pagination, {
      current: 1
    });
    this.setState(
      {
        filterValue,
        pagination: page
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
    const { loading } = this.state;

    return (
      <div className="operationRecord" style={{ position: "relative", height: "100%" }}>
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="ZK版本查看" key="1">
                <div className="portlet-body">
                  <div className="query-condition">
                    <WrapperQueryForm
                      callbackParent={this.onChildQuery}
                    />
                  </div>
                  <div>
                    <Table
                      rowKey={record => record.id}
                      pagination={this.state.pagination}
                      dataSource={this.state.data}
                      columns={this.state.columns}
                      onChange={this.tableChangeHandle}
                      loading={this.state.loading}
                      scroll={{ x: 1200 }}
                    />
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
          <Col span={24}>
            <FormItem {...formItemLayout} label="接口名称">
              {getFieldDecorator("functionName")(<Input />)}
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
