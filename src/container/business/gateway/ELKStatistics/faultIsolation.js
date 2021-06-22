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
  queryIsolationByElk,
  queryAllModuleListV1,
  queryAllSubModuleListV1,
  queryAllServiceListV1
} from "../requestA/service";
import "./../../../common/style/index.less";
import { LOG_TYPE, getAnyTime } from "../requestA/common";
import moment from "moment";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class FaultIsolation extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      data: [],
      pagination: {
        pageSize: 10,
        current: 1
      },
      filterValue: {
        startTime: getAnyTime(5),
        endTime: getAnyTime()
      },
      columns: [
        {
          title: "模块",
          dataIndex: "callModuleCode",
          width: 100,
          key: "callModuleCode"
        },
        {
          title: "服务单元",
          dataIndex: "callSubModuleCode",
          width: 100,
          key: "callSubModuleCode"
        },
        {
          title: "服务码",
          dataIndex: "callServiceCode",
          width: 180,
          key: "callServiceCode"
        },
        {
          title: "版本",
          dataIndex: "callVersion",
          width: 70,
          key: "callVersion"
        },
        {
          title: "数量",
          dataIndex: "count",
          width: 100,
          render: (text, record) => {
            return (
              <Button
                disabled={text === 0}
                type="primary"
                style={{ borderRadius: 5, width: 80 }}
                onClick={() => this.toFaultIsolationRecordList(record)}
              >
                {text}
              </Button>
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
  tableChangeHandle = () => {
    let page = Object.assign({}, this.state.pagination, {
      current: this.state.pagination.current + 1
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
      recordsPerPage: pagination.pageSize * pagination.current,
      ...filterValue
    };
    queryIsolationByElk(data).then(res => {
      this.setState(
        {
          data: res.reply.isolationInfoList,
          loading: false
        },
        () => {
          // console.log(this.state)
        }
      );
    });
  };

  toFaultIsolationRecordList = record => {
    const { filterValue } = this.state;
    const { startTime, endTime } = filterValue;
    let path = {
      pathname: "/gateway/ELKStatistics/faultIsolationRecord",
      state: {
        callModuleCode: record.callModuleCode,
        callSubModuleCode: record.callSubModuleCode,
        callServiceCode: record.callServiceCode,
        startTime,
        endTime
      }
    };
    goTo(path, "服务故障隔离信息列表");
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
    const { loading, pagination, data } = this.state;
    const { current, pageSize } = pagination;
    const noMore = current*pageSize > data.length;
    return (
      <div style={{ position: "relative", height: "100%" }}>
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="服务故障隔离信息聚合" key="1">
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
                      pagination={false}
                      dataSource={this.state.data}
                      columns={this.state.columns}
                      // onChange={this.tableChangeHandle}
                      loading={this.state.loading}
                      // scroll={{ x: 1200 }}
                    />
                    <Button style={{width: "100%",border: "none", color: noMore?"":"#108ee9" }} disabled={noMore} onClick={this.tableChangeHandle}>{noMore?"没有更多了":"点击加载更多"}</Button>
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
      moduleCodeList: [],
      subModuleCodeList: [],
      serviceCodeList: []
    };
  }
  componentDidMount() {
    let filterValue = this.props.filterValue;
    this.props.form.setFieldsValue({
      startTime: moment(filterValue.startTime, "YYYY-MM-DD HH:mm:ss"),
      endTime: moment(filterValue.endTime, "YYYY-MM-DD HH:mm:ss")
    });
    this.queryModuleCodeList();
    this.querySubModuleCodeList("");
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
  //查询服务单元列表
  querySubModuleCodeList = moduleCode => {
    let data = {
      byModuleCode: moduleCode
    };
    queryAllSubModuleListV1(data).then(res => {
      const subModuleCodeList = res.reply.result.subModuleList.map(item => {
        return {
          moduleCode: item.moduleCode,
          subModuleCode: item.subModuleCode
        };
      });
      subModuleCodeList.unshift({
        moduleCode: "",
        subModuleCode: ""
      });
      this.setState({
        subModuleCodeList
      });
    });
  };
  //查询服务码列表
  queryServiceCodeList = (byModuleCode, bySubModuleCode) => {
    let data = {
      byModuleCode,
      bySubModuleCode
    };
    queryAllServiceListV1(data).then(res => {
      const serviceCodeList = res.reply.result.serviceList.map(item => {
        return {
          moduleCode: item.moduleCode,
          subModuleCode: item.subModuleCode,
          serviceCode: item.serviceCode
        };
      });
      serviceCodeList.unshift({
        moduleCode: "",
        subModuleCode: "",
        serviceCode: ""
      });
      this.setState({
        serviceCodeList
      });
    });
  };
  moduleCodeChange = value => {
    this.props.form.resetFields(["subModuleCode", "serviceCode"]);
    this.querySubModuleCodeList(value);
  };
  subModuleCodeChange = value => {
    let moduleCode = "";
    this.state.subModuleCodeList.map(item => {
      if (item.subModuleCode === value) {
        moduleCode = item.moduleCode;
      }
    });
    this.props.form.setFieldsValue({
      moduleCode
    });
    this.props.form.resetFields(["serviceCode"]);
    if (value === "") {
      this.querySubModuleCodeList(moduleCode);
    } else {
      this.queryServiceCodeList(moduleCode, value);
    }
  };
  handleReset = () => {
    this.props.form.resetFields();
    this.handleSearch();
    this.querySubModuleCodeList("");
    this.queryServiceCodeList();
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
    const { moduleCodeList, subModuleCodeList, serviceCodeList } = this.state;
    return (
      <Form>
        <Row style={{ marginTop: 18 }}>
          <Col span={8}>
            <FormItem {...formItemLayout} label="模块编号">
              {getFieldDecorator("callModuleCode", { initialValue: "" })(
                <Select showSearch onChange={this.moduleCodeChange}>
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
            <FormItem {...formItemLayout} label="服务单元编号">
              {getFieldDecorator("callSubModuleCode", { initialValue: "" })(
                <Select showSearch onChange={this.subModuleCodeChange}>
                  {subModuleCodeList.length > 0 &&
                    subModuleCodeList.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item.subModuleCode}>
                          {item.subModuleCode ? item.subModuleCode : "全部"}
                        </Select.Option>
                      );
                    })}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="服务码">
              {getFieldDecorator("callServiceCode", { initialValue: "" })(
                <Select showSearch>
                  {serviceCodeList.length > 0 &&
                    serviceCodeList.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item.serviceCode}>
                          {item.serviceCode ? item.serviceCode : "全部"}
                        </Select.Option>
                      );
                    })}
                </Select>
              )}
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
