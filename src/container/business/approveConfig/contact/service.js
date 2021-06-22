import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import fetch from "./../../../../util/fetch";
import moment from "moment";
import Loading from "../../../../component/loading";
import { Table, Tabs, Button, Form, Row, Col, Input } from "antd";
import "./../../../common/style/index.less";
import { querySgMailContactApproveList } from "../requestA/service";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
export default class ServiceContact extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      columns: [
        {
          title: "模块编码",
          dataIndex: "moduleCode",
          key: "moduleCode",
          width: 150
        },
        {
          title: "服务单元编码",
          dataIndex: "subModuleCode",
          key: "subModuleCode",
          width: 150
        },
        {
          title: "交易码",
          dataIndex: "serviceCode",
          key: "serviceCode",
          width: 150
        },
        {
          title: "服务名称",
          dataIndex: "serviceName",
          key: "serviceName",
          width: 150
        },
        {
          title: "版本号",
          dataIndex: "serviceVersion",
          key: "serviceVersion",
          width: 150
        },
        { title: "联系人", dataIndex: "contact", key: "contact", width: 150 },
        { title: "邮箱", dataIndex: "email", key: "email", width: 150 },
        { title: "电话", dataIndex: "phone", key: "phone", width: 150 },
        {
          title: "操作",
          dataIndex: "edit",
          width: 150,
          render: (text, record, index) => {
            if (!record.email) {
              return (
                <Button
                  className="priamryBtn"
                  type="primary"
                  onClick={() => this.toDetailOrEdit(record, "detail")}
                >
                  编辑
                </Button>
              );
            }
          }
        }
      ],
      data: [],
      pagination: {
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
        total: 0
      },
      filterValue: {}
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  toDetailOrEdit = (record, type) => {
    let path = {
      pathname: "/approve/contact/serviceContactEdit",
      state: {
        moduleCode: record.moduleCode,
        subModuleCode: record.subModuleCode,
        serviceCode: record.serviceCode,
        serviceVersion: record.serviceVersion
      }
    };
    goTo(path,"修改服务联系人");
  };
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
      subModuleCode: filterValue.subModuleCode,
      serviceCode: filterValue.serviceCode,
      contactLevel: "2"
    };
    querySgMailContactApproveList(data).then(res => {
      let page = Object.assign({}, this.state.pagination, {
        total: res.reply.result.page.total
      });
      let sgMailContactApproveModuleList =
        res.reply.result.sgMailContactApproveModuleList;
      let data =
        sgMailContactApproveModuleList.length === 0
          ? []
          : sgMailContactApproveModuleList.map(item => {
              if (item.children) {
                return {
                  moduleCode: item.moduleCode,
                  subModuleCode: item.subModuleCode,
                  serviceCode: item.serviceCode,
                  serviceName: item.serviceName,
                  serviceVersion: item.serviceVersion,
                  key: `${item.moduleCode}${item.subModuleCode}${
                    item.serviceCode
                  }${item.serviceVersion}`,
                  children: item.children
                };
              } else {
                return {
                  moduleCode: item.moduleCode,
                  subModuleCode: item.subModuleCode,
                  serviceCode: item.serviceCode,
                  serviceVersion: item.serviceVersion,
                  serviceName: item.serviceName,
                  key: `${item.moduleCode}${item.subModuleCode}${
                    item.serviceCode
                  }${item.serviceVersion}`
                };
              }
            });
      this.setState(
        {
          data: data,
          pagination: page,
          loading: false
        },
        () => {
          console.log(this.state);
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
    return (
      <div style={{ position: "relative" }}>
        {this.state.loading ? <Loading /> : ""}
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="模块联系人" key="1">
                <div className="portlet-body">
                  <WrapperQueryForm callbackParent={this.onChildQuery} />
                  <Table
                    rowKey={record => record.key}
                    pagination={this.state.pagination}
                    dataSource={this.state.data}
                    columns={this.state.columns}
                    onChange={this.tableChangeHandle}
                    scroll={{ x: 1350 }}
                  />
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
  constructor(props) {
    super(props);
    this.state = {};
  }
  // 清空筛选框
  handleReset = () => {
    this.props.form.resetFields(["moduleCode", "subModuleCode", "serviceCode"]);
    this.handleSearch();
  };
  // 查询筛选
  handleSearch = e => {
    this.props.form.validateFields((err, values) => {
      this.props.callbackParent(values);
    });
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    const buttonStyle = {
      marginLeft: 20,
      width: 80,
      fontSize: 16,
      borderRadius: 5
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Row>
          <Col span={7} offset={1}>
            <FormItem {...formItemLayout} label="模块编码">
              {getFieldDecorator("moduleCode")(<Input />)}
            </FormItem>
          </Col>
          <Col span={7} offset={1}>
            <FormItem {...formItemLayout} label="服务单元编码">
              {getFieldDecorator("subModuleCode")(<Input />)}
            </FormItem>
          </Col>
          <Col span={7} offset={1}>
            <FormItem {...formItemLayout} label="交易码">
              {getFieldDecorator("serviceCode")(<Input />)}
            </FormItem>
          </Col>
          <Col span={7} offset={1}>
            <FormItem {...formItemLayout}>
              <Button
                onClick={this.handleSearch}
                type="primary"
                style={buttonStyle}
              >
                查询
              </Button>
              <Button onClick={this.handleReset} style={buttonStyle}>
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
