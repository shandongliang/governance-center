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
  Modal
} from "antd";
import "./../../../common/style/index.less";
import Loading from "../../../../component/loading";
import { ExportBtnGroup } from "../component/opeBtn"
import {
  queryRegisterNodeList,
  exportRegisterNode,
  deleteRegisterNode
} from "../requestA/service";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import wrapAuth from "../../../../util/pageEleHOC";

const WrapButton = wrapAuth(Button);
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

export default class NodeManageExcelQuery extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor() {
    super();
    this.state = {
      loading: false,
      data: [],
      filterValue: {},
      selectedRowKeys: [],
      pagination: {
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
        total: 0
      },
      columns: [
        {
          title: "服务单元编码",
          dataIndex: "submoduleId",
          key: "submoduleId",
          width: 100,
          key: "submoduleId"
        },
        {
          title: "所属ldcId",
          dataIndex: "ldcId",
          key: "ldcId",
          width: 100
        },
        {
          title: "服务协议",
          dataIndex: "serviceSocket",
          key: "serviceSocket",
          width: 100
        },
        {
          title: "节点地址及端口",
          dataIndex: "serviceAddress",
          key: "serviceAddress",
          width: 200
        },
        {
          title: "节点权重",
          dataIndex: "weight",
          key: "weight",
          width: 200
        },
        {
          title: "审核状态",
          dataIndex: "approveStatus",
          width: 80,
          render: (text, record, index) => {
            let data = "";
            if (text == "00") {
              data = "待审核";
            } else if (text == "01") {
              data = "审核通过";
            } else if (text == "11") {
              data = "审核未通过";
            }
            return <span>{data}</span>;
          }
        },
        {
          title: "审核意见",
          dataIndex: "approveText",
          width: 100,
          render: (text, record, index) => {
            if (text) {
              if (text.length > 10) {
                return (
                  <Tooltip title={text}>
                    <span>{text.substring(0, 10) + "..."}</span>
                  </Tooltip>
                );
              } else {
                return <span>{text}</span>;
              }
            } else {
              <span>{""}</span>;
            }
          }
        },
        {
          title: "操作",
          dataIndex: "ss",
          width: 150,
          render: (text, record, index) => {
            return (
              <div>
                {record.updateType && (
                  <WrapButton
                    id='SgApprove.RegitryNodeQuery.Edit'
                    className="priamryBtn"
                    onClick={() => this.toDetailOrEdit(record, "edit")}
                    type="primary"
                  >
                    编辑
                  </WrapButton>
                )}
                <Button
                  className="priamryBtn"
                  onClick={() => this.toDetailOrEdit(record, "detail")}
                >
                  详情
                </Button>
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
      pageNo: pagination.current,
      recordsPerPage: pagination.pageSize,
      moduleCode: filterValue.moduleCode,
      subModuleCode: filterValue.subModuleCode,
      // ephemeralFlag: filterValue.ephemeralFlag,
      address: filterValue.address,
      approveStatus: filterValue.approveStatus
    };
    queryRegisterNodeList(data).then(res => {
      let page = Object.assign({}, this.state.pagination, {
        total: res.reply.page.total
      });
      this.setState(
        {
          data: res.reply.sgServerConfigApproveList,
          pagination: page,
          loading: false
        },
        () => {
          // console.log(this.state)
        }
      );
    });
  };
  // 详情页
  toDetailOrEdit = (record, type) => {
    const nodeManageId = record.id;
    let path = {
      pathname: `/gateway/registeredNodesManage/${type}`,
      state: {
        nodeManageId
      }
    };
    goTo(path, type === "detail"?"注册节点详情":"注册节点编辑");
  };
  // 选择下载项
  onSelectChange = selectedRowKeys => {
    this.setState({
      selectedRowKeys
    });
  };
  //清空选择
  clearSelect = () => {
    this.setState({
      selectedRowKeys: [],
      selectedData: []
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
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      columnWidth: 40,
      selectedRowKeys,
      onChange: this.onSelectChange
      // getCheckboxProps: record => ({
      //   disabled: record.ephemeralNodeFlag == "Y",
      //   name: record.ephemeralNodeFlag
      // })
    };
    const buttonStyle = {
      borderRadius: 5,
      marginLeft: 10
    };
    return (
      <div style={{ position: "relative" }}>
        {this.state.loading ? <Loading /> : ""}
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="注册节点查询" key="1">
                <div className="portlet-body">
                  <WrapperQueryForm
                    clearSelect={this.clearSelect}
                    callbackParent={this.onChildQuery}
                  />
                  <ExportBtnGroup
                  clearSelect={this.clearSelect}
                  selectedRowKeys={selectedRowKeys}
                  fetchData={this.fetchData}
                  exportData={exportRegisterNode}
                  deleteData={deleteRegisterNode}
                  deleteButtonId="SgApprove.RegitryNodeQuery.BatchDelete"
                  exportButtonId="SgApprove.RegitryNodeQuery.BatchDownload"
                />
                  <Table
                    rowKey={record => record.id}
                    rowSelection={rowSelection}
                    pagination={this.state.pagination}
                    dataSource={this.state.data}
                    columns={this.state.columns}
                    onChange={this.tableChangeHandle}
                    scroll={{ x: 1200 }}
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
      this.props.callbackParent(values);
    });
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const colLayout = {
      span: 8
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
          <Col {...colLayout}>
            <FormItem {...formItemLayout} label="模块编码">
              {getFieldDecorator("moduleCode", {})(<Input />)}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem {...formItemLayout} label="服务单元编码">
              {getFieldDecorator("subModuleCode")(<Input />)}
            </FormItem>
          </Col>
          {/* <Col span={7} offset={1}>
            <FormItem {...formItemLayout} label="节点类型">
              {getFieldDecorator("ephemeralFlag", {})(
                <Select>
                  <Select.Option value="N">静态</Select.Option>
                  <Select.Option value="Y">动态</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col> */}
          <Col {...colLayout}>
            <FormItem labelCol={{span: 10}} wrapperCol={{span: 14}} label="节点地址及端口">
              {getFieldDecorator("address")(<Input />)}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem {...formItemLayout} label="审核状态">
              {getFieldDecorator("approveStatus", {
                initialValue: ""
              })(
                <Select>
                  <Select.Option value="">全部</Select.Option>
                  <Select.Option value="00">未审核</Select.Option>
                  <Select.Option value="01">审核通过</Select.Option>
                  <Select.Option value="11">审核未通过</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12} offset={1}>
            <FormItem >
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
