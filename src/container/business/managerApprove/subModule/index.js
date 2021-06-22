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
// import "./indexv1.less";
import Loading from "../../../../component/loading";
import ExportBtnGroup from "../../../../component/ope-btn/opeBtn";
import {
  querySgSubmoduleCommonConfigApproveList,
  deleteSgSubmoduleCommonConfigApproveList,
  exportConfigTxtByType,
  exportOldConfigTxtByType
} from "../request/service";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import wrapAuth from "../../../../util/pageEleHOC";

const WrapButton = wrapAuth(Button);
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class SubModuleManagerApproveIndex extends Component {
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
          title: "模块编码",
          dataIndex: "moduleCode",
          width: 70,
          key: "moduleCode"
        },
        {
          title: "服务单元编码",
          dataIndex: "subModuleCode",
          width: 100,
          key: "subModuleCode"
        },
        {
          title: "服务单元名称",
          dataIndex: "subModuleName",
          width: 100,
          key: "subModuleName"
        },
        {
          title: "审核状态",
          dataIndex: "approveStatus",
          width: 80,
          render: (text, record, index) => {
            let data = "";
            if (text === "0") {
              data = "待审核";
            } else if (text === "1") {
              data = "审核通过";
            } else if (text === "2") {
              data = "审核未通过";
            }
            return <span>{data}</span>;
          }
        },
        {
          title: "负责人",
          width: 70,
          dataIndex: "leader",
          key: "leader"
        },
        {
          title: "员工编号",
          dataIndex: "leaderNo",
          width: 100,
          key: "leaderNo"
        },
        {
          title: "联系方式",
          dataIndex: "mobile",
          width: 100,
          key: "mobile"
        },
        {
          title: "最近更新时间",
          dataIndex: "lastUpdTime",
          width: 140,
          key: "lastUpdTime"
        },
        {
          title: "操作",
          dataIndex: "key",
          width: 120,
          // fixed:'right',
          render: (text, record, index) => {
            return (
              <div>
                <WrapButton
                  id='ModuleManagerApprove.SubModuleQuery.Edit'
                  type="primary"
                  className="priamryBtn"
                  onClick={() => this.toDetailOrEdit(record, "edit")}
                >
                  编辑
                </WrapButton>
                <Button
                  className="priamryBtn"
                  onClick={() => this.toDetailOrEdit(record, "detail")}
                >
                  详情
                </Button>
                {/* <Button
                  className="priamryBtn"
                  type="primary"
                  onClick={() => this.toVersionHistory(record)}
                >
                  审核
                </Button> */}
              </div>
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
      sgSubmoduleCommonConfigApproveVo: {
        ...filterValue,
        page: {
          pageNo: pagination.current,
          recordsPerPage: pagination.pageSize,
        }
      }
    };
    querySgSubmoduleCommonConfigApproveList(data).then(res => {
      let page = Object.assign({}, this.state.pagination, {
        total: res.reply.result.page.total
      });
      this.setState(
        {
          data: res.reply.result.list,
          pagination: page,
          loading: false
        },
        () => {
          // console.log(this.state)
        }
      );
    });
  };
  // 编辑或详情
  toDetailOrEdit = (record, type) => {
    let path = {
      pathname: `/managerApprove/subModule/${type}`,
      state: {
        subModuleId: record.subModuleId
      }
    }
    goTo(path,type === "detail"?"服务单元详情":"服务单元编辑");
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
        subModuleId: item
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
              <TabPane tab="模块查询" key="1">
                <div className="portlet-body">
                  <WrapperQueryForm
                    clearSelect={this.clearSelect}
                    callbackParent={this.onChildQuery}
                  />
                  <ExportBtnGroup
                    clearSelect={this.clearSelect}
                    selectedData={selectedData}
                    fetchData={this.fetchData}
                    exportData={exportConfigTxtByType}
                    exportDataByOldType={exportOldConfigTxtByType}
                    selectedRowKeys={selectedRowKeys}
                    exportType="SERVICEUNITN"
                    deleteData={deleteSgSubmoduleCommonConfigApproveList}
                    deleteButtonId="ModuleManagerApprove.SubModuleQuery.BatchDelete"
                    exportOldButtonId="ModuleManagerApprove.SubModuleQuery.ExportOldData"
                    exportButtonId="ModuleManagerApprove.SubModuleQuery.ExportData"
                  />
                  <Table
                    rowKey={record => record.subModuleId}
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
            <FormItem {...formItemLayout} label="模块编码">
              {getFieldDecorator("moduleCode")(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="服务单元编码">
              {getFieldDecorator("subModuleCode")(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="服务单元名称">
              {getFieldDecorator("subModuleName")(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="审核状态">
              {getFieldDecorator("approveStatus", {
                initialValue: ""
              })(
                <Select>
                  <Select.Option value="">全部</Select.Option>
                  <Select.Option value="0">未审核</Select.Option>
                  <Select.Option value="1">审核通过</Select.Option>
                  <Select.Option value="2">审核未通过</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
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
