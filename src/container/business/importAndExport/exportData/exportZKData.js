import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import {
  Icon,
  Button,
  Select,
  message,
  Table,
  Tabs,
  Form,
  Row,
  Col,
  Input,
  Tooltip,
  Modal,
  DatePicker
} from "antd";
import "./../../../common/style/index.less";
import Loading from "../../../../component/loading";
import ExportBtnGroup from "../../../../component/ope-btn/opeBtn";
import { exportZkData, queryExpoetZkData } from "../request/service";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import wrapAuth from "../../../../util/pageEleHOC";

const WrapButton = wrapAuth(Button);
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class ExportZKData extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      filterValue: {},
      data: [],
      pagination: {
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
        total: 0
      },
      selectedRowKeys: [],
      selectedData: [],
      columns: [
        {
          title: "节点路径",
          dataIndex: "path",
          width: 250,
          key: "path"
        },
        {
          title: "节点时间",
          dataIndex: "nodeDate",
          width: 100,
          key: "nodeDate"
        },
        {
          title: "目标节点时间",
          dataIndex: "tartgetNodeDate",
          width: 140,
          key: "tartgetNodeDate"
        },
        {
          title: "类型",
          dataIndex: "type",
          width: 100,
          render: (text, record, index) => {
            let showText = ""
            if(text==="add"){
              showText = "新增"
            } else if(text==="modify"){
              showText = "修改"
            } else if(text==="del"){
              showText = "删除"
            }
            return <span>{showText}</span>;
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
      page: {
        pageNo: pagination.current,
        recordsPerPage: pagination.pageSize
      },
      rootPath: []
    };
    queryExpoetZkData(data).then(res => {
      let page = Object.assign({}, this.state.pagination, {
        // total: res.reply.page.total
      });
      this.setState(
        {
          data: res.reply.result,
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

  onSelectChange = selectedRowKeys => {
    let selectedData = selectedRowKeys.map(item=>{
      return {
        moduleId: item
      }
    })
    this.setState({
      selectedRowKeys,
      selectedData
    });
  };
  //清空选择
  clearSelect = () => {
    this.setState({
      selectedRowKeys: [],
      selectedData: []
    });
  };
  render() {
    const { loading, selectedRowKeys, selectedData, data, pagination, columns } = this.state;
    const rowSelection = {
      columnWidth: 40,
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        // disabled: record.applicantId !== USER_ID && USER_ID !== "U0000000000000000001"
      })
    };
    return (
      <div style={{ position: "relative" }}>
        {loading ? <Loading /> : ""}
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="ZK数据下载" key="1">
                <div className="portlet-body">
                  {/* <WrapperQueryForm
                    clearSelect={this.clearSelect}
                    callbackParent={this.onChildQuery}
                  /> */}
                  <ExportBtnGroup
                    clearSelect={this.clearSelect}
                    selectedData={selectedData}
                    fetchData={this.fetchData}
                    selectedRowKeys={selectedRowKeys}
                    exportCommonData={exportZkData}
                  />
                  <Table
                    rowKey={record => record.path}
                    // rowClassName={record => record.result !== "S" ? "warning-info" : ""}
                    rowSelection={rowSelection}
                    pagination={pagination}
                    dataSource={data}
                    columns={columns}
                    onChange={this.tableChangeHandle}
                    scroll={{ x: 1000 }}
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
    this.props.form.resetFields();
    this.handleSearch();
  };
  // 查询筛选
  handleSearch = e => {
    this.props.clearSelect();
    this.props.form.validateFields((err, values) => {
      let val = {
        ...values,
        // planTime: values.planTime ? values.planTime.format("YYYY-MM-DD") : ""
      };
      this.props.callbackParent(val);
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
          <Col span={8}>
            <FormItem {...formItemLayout} label="节点路径">
              {getFieldDecorator("path")(<Input />)}
            </FormItem>
          </Col>
          {/* <Col span={8}>
            <FormItem {...formItemLayout} label="模块名称">
              {getFieldDecorator("moduleName")(<Input />)}
            </FormItem>
          </Col> */}
          <Col span={8}>
            <FormItem >
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
