import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import moment from "moment";
import {
  Breadcrumb,
  Icon,
  DatePicker,
  Button,
  TimePicker,
  Select,
  InputNumber,
  Checkbox,
  Upload,
  Modal,
  Tabs
} from "antd";
import { Form, Row, Col, Input, Table } from "antd";
import { goTo, goToAndClose } from "./../../../util/tabRouter.js";
import { DATE_FORMAT_MOMENT } from "./../../../constant/index";
import $fetch from "$fetch";
import { $downloadfetchs } from "./../../../util/downloadfetch";
import { randomNamber } from "../../../util/publicFuc";

import "./../../common/style/index.less";
import "./impowerManage.less";

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class ApproveIndex extends Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor() {
    super();
    this.state = {
      loading: false,
      data: [],
      param: {},
      pagination: {
        pageSize: 10,
        pageSizeChanger: true,
        current: 1
      },
      selectedRowKeys: [],
      selectedRows: [],
      columns: [
        {
          title: "编号",
          dataIndex: "id",
          width: 50
        },
        {
          title: "操作类型",
          dataIndex: "允许",
          width: 300,
          render: (text, record, index) => {
            return (
              <a href="javascript:;" onClick={this.toDetail(record)}>
                {text}
              </a>
            );
          }
        },

        {
          title: "资源类型",
          dataIndex: "数据",
          width: 200,
          render: (text, record, index) => {
            return <span>{text}</span>;
          }
        },
        {
          title: "资源名称",
          dataIndex: "533-EDATEST",
          width: 200,
          render: (text, record, index) => {
            return <span>{text}</span>;
          }
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          width: 100,
          render: (text, record, index) => {
            return <span>{this.timer(text)}</span>;
          }
        },
        {
          title: "创建人",
          dataIndex: "createUserId",
          width: 100,
          render: (text, record, index) => {
            return <span>{text}</span>;
          }
        }
      ]
    };
  }

  timer = t => {
    return moment(t).format("YYYY-MM-DD");
  };

  componentDidMount() {
    let reqSeqNo = randomNamber();
    let params = {
      paginator: {
        pageNo: this.props.location.state
          ? this.props.location.state
          : this.state.pagination.current,
        recordsPerPage: this.state.pagination.pageSize
      },
      reqSeqNo: reqSeqNo
    };
    this.fetchData(params);
  }

  fetchData = params => {
    this.setState({ loading: true });
    const { current, pageSize } = params;
    $fetch({
      url: "/tesla-gateway-console-app/eda/queryEdaTopicByParam",
      data: {
        ...params
      }
    }).then(res => {
      //console.log(res)
      const _pagination = this.state.pagination;
      _pagination.total = res.reply.list.page.total;
      _pagination.current = res.reply.list.page.pageNo;
      this.setState({
        pagination: _pagination,
        data: res.reply.list.topicList,
        loading: false
      });
    });
  };

  //模板生成的暂时只支持分页，不支持排序
  tableChangeHandle = (pagination, filters, sorter) => {
    let _this = this;
    this.setState({ pagination });
    let reqSeqNo = randomNamber();
    //console.log('146', this.state)
    const _params = {
      paginator: {
        ...this.state.param,
        pageNo: pagination.current,
        recordsPerPage: pagination.pageSize
      },
      topicName: this.state.topicName ? this.state.topicName : "",
      subModuleId: this.state.subModuleId ? this.state.subModuleId : "",
      clusterId: this.state.clusterId ? this.state.clusterId : "",
      keyWords: this.state.keyWords ? this.state.keyWords : "",
      reqSeqNo: reqSeqNo
    };
    this.fetchData(_params);
  };
  //列表页跳转至详情页，查询条件,pagination,sorter目前模板没有传递，如果需要，请参考作业平台单独集成
  toDetail = record => {
    return () => {
      const id = record.topicName;
      let path = {
        pathname: "/eventDriven/topic/detail/" + id,
        state: this.state.pagination.current
      };
      goTo(path, "事件主题管理详情");
    };
  };

  toCreate = () => {
    let path = {
      pathname: "/eventDriven/topic/create"
    };
    goTo(path, "创建事件主题管理");
  };

  getDate = value => {
    if (!!value) {
      const dateStr = new Date(parseInt(value))
        .toLocaleString()
        .replace(/\//g, "-");
      let _date = dateStr.substring(0, dateStr.indexOf(" "));
      return _date;
    }
    return "";
  };

  onChildQuery = map => {
    this.setState(map);
  };

  render() {
    const { loading, selectedRowKeys } = this.state;

    return (
      <div>
        <div className="TopicIndex">
          <div className="portlet-tab">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="查询权限数据" key="1">
                <div className="portlet-body">
                  <div className="query-condition">
                    <WrapperQueryForm callbackParent={this.onChildQuery} />
                  </div>
                  <Table
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    dataSource={this.state.data}
                    columns={this.state.columns}
                    onChange={this.tableChangeHandle}
                    size="middle"
                    rowKey="id"
                    style={{ paddingLeft: 10, paddingRight: 10 }}
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
    this.state = {
      pagination: {
        current: 1,
        pageSize: 10
      }
    };
  }

  handleReset = () => {
    this.props.form.resetFields();
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let reqSeqNo = randomNamber();
      this.setState({ loading: true });

      let params = {
        paginator: {
          pageNo: this.state.pagination.current,
          recordsPerPage: this.state.pagination.pageSize
        },
        reqSeqNo: reqSeqNo
      };
      $fetch({
        url: "/tesla-gateway-console-app/eda/queryEdaTopicByParam",
        data: { ...values, ...params }
      }).then(res => {
        const _pagination = this.state.pagination;
        _pagination.total = res.reply.list.page.total;
        _pagination.current = res.reply.list.page.pageNo;
        this.setState({
          pagination: _pagination,
          data: res.reply.list.topicList,
          loading: false,
          ...values
        });
        this.props.callbackParent(this.state);
      });
    });
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 10 }
    };
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="approveIndex">
        <Form onSubmit={this.handleSearch}>
          <Row>
            <FormItem label="主题名称(TopicName)：" {...formItemLayout}>
              {getFieldDecorator("topicName", {
                rules: [
                  {
                    required: false
                  }
                ]
              })(<Input />)}
            </FormItem>

            <FormItem label="服务单元编号(SubmoduleId)：" {...formItemLayout}>
              {getFieldDecorator("subModuleId", {
                rules: [
                  {
                    required: false
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label="集群编号(ClusterId)：" {...formItemLayout}>
              {getFieldDecorator("clusterId", {
                rules: [
                  {
                    required: false
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label="关键字(KeyWords)：" {...formItemLayout}>
              {getFieldDecorator("keyWords", {
                rules: [
                  {
                    required: false
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout}>
              <Button
                htmlType="submit"
                type="primary"
                className="operatorBtn"
                style={{
                  marginLeft: 10,
                  width: 88,
                  fontSize: 16,
                  borderRadius: 5
                }}
              >
                查询
              </Button>
              <Button
                onClick={this.handleReset}
                style={{
                  marginLeft: 10,
                  width: 88,
                  fontSize: 16,
                  borderRadius: 5
                }}
              >
                清空
              </Button>
            </FormItem>
          </Row>
        </Form>
      </div>
    );
  }
}
const WrapperQueryForm = Form.create()(QueryForm);
