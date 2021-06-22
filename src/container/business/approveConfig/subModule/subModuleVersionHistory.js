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
import { ExportBtnGroup } from "../component/opeBtn";
import {
  querySubmoduleChangeHistory,
  exportSubModuleConfig,
  deleteSgSubmoduleConfigApproveList
} from "../requestA/service";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class TestQuery extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor() {
    super();
    this.state = {
      loading: false,
      data: [],
      moduleCode: "",
      subModuleCode: "",
      pagination: {
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
        total: 0
      },
      selectedRowKeys: [],
      columns: [
        {
          title: "服务单元编码",
          dataIndex: "subModuleCode",
          width: 80,
          key: "subModuleCode"
        },
        {
          title: "服务单元名称",
          dataIndex: "subModuleName",
          width: 80,
          key: "subModuleName"
        },
        {
          title: "所属模块编码",
          dataIndex: "moduleCode",
          width: 100,
          key: "moduleCode"
        },
        {
          title: "审核状态",
          dataIndex: "approveStatus",
          width: 70,
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
          title: "最后参数维护时间",
          dataIndex: "updateTime",
          width: 120,
          key: "updateTime"
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
          title: "最后参数维护人",
          dataIndex: "updateUserName",
          width: 120,
          key: "updateUserName"
        },
        {
          title: "说明",
          dataIndex: "remark1",
          width: 80,
          key: "remark1"
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
          dataIndex: "",
          width: 80,
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
    let { moduleCode, subModuleCode } = this.props.location.state;
    this.setState({
      moduleCode,
      subModuleCode
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
    const { moduleCode, subModuleCode, pagination } = this.state;
    let data = {
      pageNo: pagination.current,
      recordsPerPage: pagination.pageSize,
      subModuleCode,
      moduleCode
    };
    querySubmoduleChangeHistory(data).then(res => {
      let page = Object.assign({}, this.state.pagination, {
        total: res.reply.result.page.total
      });
      this.setState(
        {
          data: res.reply.result.SgSubmoduleConfigApproves,
          pagination: page,
          loading: false
        },
        () => {
          // console.log(this.state)
        }
      );
    });
  };

  // 详情或编辑
  toDetailOrEdit = (record, type) => {
    localStorage.setItem("subModuleId", record.id);
    localStorage.setItem("fromPath", "history");
    goTo(path,type === "detail"?"服务单元详情":"服务单元编辑");
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
    const { loading, selectedRowKeys, moduleCode } = this.state;
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
              <TabPane tab="服务单元历史查询" key="1">
                <div className="portlet-body">
                  <ExportBtnGroup
                    clearSelect={this.clearSelect}
                    selectedRowKeys={selectedRowKeys}
                    fetchData={this.fetchData}
                    exportData={exportSubModuleConfig}
                    deleteData={deleteSgSubmoduleConfigApproveList}
                    // deleteBtn={true}
                  />
                  <Table
                    rowKey={record => record.id}
                    rowSelection={rowSelection}
                    pagination={this.state.pagination}
                    dataSource={this.state.data}
                    columns={this.state.columns}
                    onChange={this.tableChangeHandle}
                    scroll={{ x: 1100 }}
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

