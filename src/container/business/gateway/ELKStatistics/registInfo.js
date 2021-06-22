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
import { queryRegisterByElk, queryAllModuleListV1, queryAllSubModuleListV1 } from "../requestA/service";
import "./../../../common/style/index.less";
import { LOG_TYPE, getAnyTime } from "../requestA/common";
import moment from "moment";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class RegistInfo extends Component {
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
          dataIndex: "moduleCode",
          width: 100,
          key: "moduleCode"
        },
        {
          title: "服务单元",
          dataIndex: "subModuleCode",
          width: 100,
          key: "subModuleCode"
        },
        {
          title: "IP",
          dataIndex: "ip",
          width: 100,
          key: "ip"
        },
        {
          title: "节点路径",
          dataIndex: "nodePath",
          width: 150,
          key: "nodePath"
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
                onClick={() => this.toRegistRecordList(record)}
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
      moduleCode: filterValue.moduleCode,
      nodePath: filterValue.nodePath,
      startTime: filterValue.startTime,
      endTime: filterValue.endTime,
      ip: filterValue.ip
    };
    queryRegisterByElk(data).then(res => {
      this.setState(
        {
          data: res.reply.registerList,
          loading: false
        },
        () => {
          // console.log(this.state)
        }
      );
    });
  };

  toRegistRecordList = record => {
    const { filterValue } = this.state;
    const { startTime, endTime } = filterValue;
    let path = {
      pathname: "/gateway/ELKStatistics/registRecord",
      state: {
        moduleCode: record.moduleCode,
        subModuleCode: record.subModuleCode,
        ip: record.ip,
        nodePath: record.nodePath,
        startTime,
        endTime
      }
    };
    goTo(path, "注册信息列表");
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
    const { loading, data, pagination } = this.state;
    const { current, pageSize } = pagination;
    const noMore = current*pageSize > data.length;
    return (
      <div style={{ position: "relative", height: "100%" }}>
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="注册信息聚合" key="1">
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
      subModuleCodeList: []
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
      moduleCodeList.unshift("")
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
      })
      this.setState({
        subModuleCodeList
      });
    });
  };
  moduleCodeChange = value => {
    this.props.form.resetFields(["subModuleCode"]);
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
    this.querySubModuleCodeList(moduleCode);
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
    const { moduleCodeList, subModuleCodeList } = this.state;
    return (
      <Form>
        <Row style={{ marginTop: 18 }}>
          <Col span={8}>
          <FormItem {...formItemLayout} label="模块编号">
          {getFieldDecorator("moduleCode",{initialValue: ""})(
            <Select showSearch onChange={this.moduleCodeChange}>
              {moduleCodeList.length > 0 &&
                moduleCodeList.map(item => {
                  return (
                    <Select.Option key={item} value={item}>
                      {item?item:"全部"}
                    </Select.Option>
                  );
                })}
            </Select>
          )}
        </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="服务单元编号">
              {getFieldDecorator("subModuleCode",{initialValue: ""})(
                <Select showSearch onChange={this.subModuleCodeChange}>
                  {subModuleCodeList.length > 0 &&
                    subModuleCodeList.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item.subModuleCode}>
                          {item.subModuleCode?item.subModuleCode:"全部"}
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
          {/* <Col span={8}>
            <FormItem {...formItemLayout} label="节点路径">
              {getFieldDecorator("nodePath")(<Input />)}
            </FormItem>
          </Col> */}
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
