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
import "./index.less";
import Loading from "../../../../component/loading";
import { ExportBtnGroup } from "../component/opeBtn";
import {
  queryModuleChangeHistory,
  exportModuleConfig,
  deleteSgModuleConfigApproveList
} from "../requestA/service";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class ModuleTestQuery extends Component {
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
      selectedRowKeys: [],
      moduleCode: "",
      columns: [
        {
          title: "模块编码",
          dataIndex: "moduleCode",
          width: 70,
          key: "moduleCode"
        },
        {
          title: "模块名称",
          dataIndex: "moduleName",
          width: 70,
          key: "moduleName"
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
          title: "最后参数维护人",
          width: 140,
          dataIndex: "updateUserName",
          key: "updateUserName"
        },
        {
          title: "最后参数维护时间",
          dataIndex: "updateTime",
          width: 120,
          key: "updateTime"
        },
        {
          title: "备注",
          dataIndex: "remark1",
          width: 70,
          key: "remark1"
        },
        {
          title: "变更类型",
          dataIndex: "changeType",
          width: 70,
          render: (text, record, index) => {
            let data = "";
            if (text === "00") {
              data = "新增";
            } else if (text === "01") {
              data = "删除";
            } else if (text === "10") {
              data = "修改";
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
          dataIndex: "key",
          width: 80,
          // fixed:'right',
          render: (text, record, index) => {
            return (
              <div>
                <Button
                  className="priamryBtn"
                  onClick={() => this.toDetailOrEdit(record, "Detail")}
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
    const { moduleCode } = this.props.location.state;
    this.setState({
      moduleCode
    },()=>{
      this.fetchData();
    })
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
    const { pagination, moduleCode } = this.state;
    let data = {
      pageNo: pagination.current,
      recordsPerPage: pagination.pageSize,
      moduleCode
    };
    queryModuleChangeHistory(data).then(res => {
      let page = Object.assign({}, this.state.pagination, {
        total: res.reply.result.page.total
      });
      this.setState(
        {
          data: res.reply.result.sgModuleConfigApproves,
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
    localStorage.setItem("moduleId", record.id);
    localStorage.setItem("fromPath", "history");
    let path = {
      pathname: `/approve/module/${type}`,
      state: {
        moduleCode: record.moduleCode
      }
    }
		goToAndClose(path, type === "detail"?"模块详情":"模块编辑");
  };

  onSelectChange = selectedRowKeys => {
    this.setState({
      selectedRowKeys
    });
  };
  //清空选择
  clearSelect = () => {
    this.setState({
      selectedRowKeys: []
    });
  };
  render() {
    let USER_INFO = JSON.parse(
      sessionStorage.getItem("$pandora_auth.user_info")
    );
    let USER_ID = USER_INFO ? USER_INFO.userId : "";
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      columnWidth: 40,
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: record.applicantId !== USER_ID && USER_ID !== "U0000000000000000001"
      })
    };
    return (
      <div style={{ position: "relative" }}>
        {this.state.loading ? <Loading /> : ""}
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="模块历史查询" key="1">
                <div className="portlet-body">
                  <ExportBtnGroup
                    clearSelect={this.clearSelect}
                    selectedRowKeys={selectedRowKeys}
                    fetchData={this.fetchData}
                    exportData={exportModuleConfig}
                    deleteData={deleteSgModuleConfigApproveList}
                    // deleteBtn={true}
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
