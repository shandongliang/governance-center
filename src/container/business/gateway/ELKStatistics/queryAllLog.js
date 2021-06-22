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
  queryLogFullRetrievalByELK,
  queryAllModuleListV1
} from "../requestA/service";
import "./../../../common/style/index.less";
import { LOG_TYPE, getAnyTime, LOG_TYPE_SHOW } from "../requestA/common";
import moment from "moment";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class QueryAllLog extends Component {
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
      filterValue: {
        startTime: getAnyTime(5),
        endTime: getAnyTime()
      },
      columns: [
        {
          title: "模块编码",
          dataIndex: "moduleCode",
          width: 70,
          key: "moduleCode"
        },
        {
          title: "类型",
          dataIndex: "monitorType",
          width: 70,
          render: (text, record, index) => {
            let name = "";
            LOG_TYPE_SHOW.forEach(item => {
              if (item.value === text) {
                name = item.name;
              }
            });
            return name;
          }
        },
        {
          title: "IP",
          dataIndex: "ip",
          width: 70,
          key: "ip"
        },
        {
          title: "时间",
          dataIndex: "timeStamp",
          width: 100,
          key: "timeStamp"
        },
        {
          title: "内容",
          dataIndex: "msg",
          width: 200,
          // key: "msg"
          render: (text, record, index) => {
            return text && text.length > 100 ? (
              <Tooltip style={{ wordBreak: "break-all" }} title={text}>
                <span>{text.substring(0, 100) + "..."}</span>
              </Tooltip>
            ) : (
              <span>{text}</span>
            );
          }
        }
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
      pageNo: pagination.current,
      recordsPerPage: pagination.pageSize,
      moduleCode: filterValue.moduleCode,
      logType: filterValue.logType,
      startTime: filterValue.startTime,
      endTime: filterValue.endTime,
      ip: filterValue.ip,
      searchKey: filterValue.searchKey
    };
    queryLogFullRetrievalByELK(data).then(res => {
      let page = Object.assign({}, this.state.pagination, {
        total: res.reply.page.total
      });
      this.setState(
        {
          data: res.reply.logInfoList,
          pagination: page,
          loading: false
        },
        () => {
          // console.log(this.state)
        }
      );
    });
  };

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
      <div style={{ position: "relative", height: "100%" }}>
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="日志全文检索" key="1">
                <div className="portlet-body">
                  <div className="query-condition">
                    <WrapperQueryForm
                      callbackParent={this.onChildQuery}
                      filterValue={this.state.filterValue}
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
                      // scroll={{ x: 1200 }}
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
      moduleCodeList: []
    };
  }
  componentDidMount() {
    let filterValue = this.props.filterValue;
    this.props.form.setFieldsValue({
      startTime: moment(filterValue.startTime, "YYYY-MM-DD HH:mm:ss"),
      endTime: moment(filterValue.endTime, "YYYY-MM-DD HH:mm:ss")
    });
    this.queryModuleCodeList();
  }
  //查询模块列表
  queryModuleCodeList = () => {
    queryAllModuleListV1().then(res => {
      const moduleCodeList = res.reply.result.moduleList;
      moduleCodeList.unshift("");
      this.setState({
        moduleCodeList
      });
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
    this.handleSearch();
  };

  handleSearch = e => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let data = {
        ...values,
        startTime: values.startTime
          ? values.startTime.format("YYYY-MM-DD HH:mm:ss")
          : "",
        endTime: values.endTime
          ? values.endTime.format("YYYY-MM-DD HH:mm:ss")
          : ""
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
    const format = "YYYY-MM-DD HH:mm:ss";
    const { moduleCodeList } = this.state;
    return (
      <Form>
        <Row style={{ marginTop: 18 }}>
          <Col span={8}>
            <FormItem {...formItemLayout} label="模块编号">
              {getFieldDecorator("moduleCode", { initialValue: "" })(
                <Select showSearch>
                  {moduleCodeList.length > 0 &&
                    moduleCodeList.map(item => {
                      return (
                        <Select.Option key={item} value={item}>
                          {item ? item : "全部"}
                        </Select.Option>
                      );
                    })}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="IP">
              {getFieldDecorator("ip")(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="监控类型">
              {getFieldDecorator("logType")(
                <Select>
                  {LOG_TYPE.map(item => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="全局搜索">
              {getFieldDecorator("searchKey")(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="开始时间">
              {getFieldDecorator("startTime", {
                rules: [{ required: true, message: "请选择开始时间" }]
              })(
                <DatePicker
                  style={{ width: "100%" }}
                  showTime
                  format={format}
                />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="结束时间">
              {getFieldDecorator("endTime", {
                rules: [{ required: true, message: "请选择结束时间" }]
              })(
                <DatePicker
                  style={{ width: "100%" }}
                  showTime
                  format={format}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
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
