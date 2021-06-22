import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Select,
  Form,
  Row,
  Col,
  Input,
  Table,
  Tabs,
  Button,
  Icon,
  Radio,
  message,
  Modal,
  Popconfirm,
  Message,
  Tooltip
} from "antd";
import "./../../../common/style/index.less";
// import "../../style/index.less";
import Loading from "../../../../component/loading";
import { queryServerConfigList, queryAllModuleListV1, queryAllSubModuleListV1, deleteServerNodeBatch, deleteServerConfig, exportServerConfigV1 } from "../requestA/service";
import { querySgModuleBusinessConfigList, querySgSubmoduleBusinessConfigList } from "../request/service";
import { getAnyTime } from "../requestA/common";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import wrapAuth from "../../../../util/pageEleHOC";

const WrapButton = wrapAuth(Button);
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

export default class ManageRegisteredNodes extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props) {
    super(props);
    this.state = {
      errorData: [],
      visible: false,
      errorColumns: [
        {
          title: "服务单元编号",
          dataIndex: "submoduleId",
          width: 90,
          align: "center",
          key: "submoduleId"
        },
        {
          title: "所属ldcId",
          dataIndex: "ldcId",
          key: "ldcId",
          width: 100
        },
        {
          title: "节点地址及端口",
          dataIndex: "serviceAddress",
          width: 120,
          align: "center",
          key: "serviceAddress"
        },
        {
          title: "错误数据",
          dataIndex: "errorData",
          width: 150,
          align: "center",
          // key: "errorData",
          render: (text, record, index) => {
            if (text) {
              if (text.length > 20) {
                return (
                  <Tooltip title={text}>
                    <span>{text.substring(0, 20) + "..."}</span>
                  </Tooltip>
                );
              } else {
                return <span>{text}</span>;
              }
            } else {
              <span>{""}</span>;
            }
          }
        }
      ],
      loading: false, //控制loading状态
      pagination: {
        pageSize: 10, //每页条数
        total: 0, //总条数
        current: 1, //当前页数
        showQuickJumper: true //显示快速跳转
      }, //分页设置
      filterValue: {},
      selectedRowKeys: [], //选中行key
      selectedData:[],
      data: [], //
      columns: [
        {
          title: "服务单元编号",
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
          title: "节点内容",
          dataIndex: "serviceContext",
          key: "serviceContext",
          width: 200
        },
        {
          title: "节点类型",
          dataIndex: "ephemeralNodeFlag",
          key: "ephemeralNodeFlag",
          width: 100,
          render: (text, record) => {
            if (text === "Y") {
              return <span>动态</span>;
            } else {
              return <span>静态</span>;
            }
          }
        },
        {
          title: "操作",
          dataIndex: "operation",
          key: "operation",
          width: 210,
          render: (text, record) => {
            return (
              <div>
                <WrapButton
                  id="ServiceGovern.RegistereNodeConfig.Edit"
                  onClick={() => this.editRegisteredNodes(record)}
                  className="priamryBtn"
                  type="primary"
                >
                  编辑
                </WrapButton>
                {/* <Button
                  onClick={() => this.toRegistRecord(record)}
                  className="priamryBtn"
                  // type="primary"
                >
                  注册信息
                </Button> */}
                <WrapButton
                  id="ServiceGovern.RegistereNodeConfig.BatchDelete"
                  onClick={() => this.handleDelete(record)}
                  disabled={record.ephemeralNodeFlag !== "N"}
                  className="priamryBtn"
                  type="danger"
                >
                  删除
                </WrapButton>
              </div>
            );
          }
        }
      ]
    };
  }
  componentDidMount() {
    this.fetchData()
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
      submoduleCode: filterValue.submoduleId,
      ephemeralFlag: filterValue.ephemeralFlag,
      address: filterValue.address
    };
    queryServerConfigList(data).then(res => {
      let page = Object.assign({}, this.state.pagination, {
        total: res.reply.page.total
      });
      this.setState(
        {
          data: res.reply.serverConfigList,
          pagination: page,
          loading: false
        },
        () => {
          // console.log(this.state)
        }
      );
    });
  };

  //跳转elk注册信息列表页面
  toRegistRecord = record => {
    let path = {
      pathname: "/gateway/ELKStatistics/registRecord",
      state: { 
        serviceAddress: record.serviceAddress,
        subModuleCode: record.submoduleId,
        ldcId: record.ldcId,
        serviceSocket: record.serviceSocket,
        startTime: record.lastUpdateTime ? moment(new Date(record.lastUpdateTime)).format("YYYY-MM-DD HH:mm:ss") : getAnyTime(5),
        endTime: getAnyTime(0)
      }
    };
    goTo(path,"elk注册信息");
  };
  //表格勾选内容记录
  onSelectChange = selectedRowKeys => {
    let selectedData =
      selectedRowKeys.length > 0 &&
      selectedRowKeys.map(item => {
        let arr = item.split("*&!@#$%^")
        return {
          submoduleId: arr[0],
          ldcId: arr[1],
        serviceSocket: arr[2],
        serviceAddress: arr[3]
        };
      });
    this.setState({
      selectedRowKeys,
      selectedData
    });
  };
  //删除RegisteredNodes
  handleDelete = record => {
    let _this = this;
    let data = {
      serverConfig: record
    }
    Modal.confirm({
      title: "您确定删除当前节点？",
      content: "删除后将无法返回...",
      onOk() {
        deleteServerConfig(data).then(res => {
          if (res.reply.returnCode.type === "S") {
            message.info("删除成功");
            _this.fetchData();
          }
        });
      },
      onCancel() {
        message.info("取消");
      }
    });
  };

  // 下载RegisteredNodes
  download = () => {
    let data = { 
      serverConfigList: this.state.selectedData 
    }
    exportServerConfigV1(data).then(res => {
        this.clearSelect();
      });
  };
  // 批量删除
  batchDelete = () => {
    let _this = this;
    let data = {
      serverConfigList: this.state.selectedData
    }
    deleteServerNodeBatch(data).then(res => {
      if (res.reply.returnCode.type == "S") {
        if (res.reply.result.length === 0 || res.reply.result === null) {
          message.info("删除成功");
          _this.clearSelect();
          _this.fetchData();
        } else {
          let errorData = res.reply.result.map(item => {
            return {
              errorData: item.errorData,
              ...item.serverConfig
            };
          });
          _this.setState({
            visible: true,
            errorData
          });
        }
      }
    });
  };
  editRegisteredNodes = record => {
    let path = {
      pathname: "/gateway/registeredNodesManage/editNodes",
      state: { record: record }
    };
    goTo(path,"注册节点编辑");
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
  //清空选择
  clearSelect = () => {
    this.setState({
      selectedRowKeys: [],
      selectedData: []
    });
  };
  closeModal = () => {
    this.clearSelect();
    this.fetchData();
    this.setState({
      visible: false,
      errorData: []
    });
  };
  render() {
    const { data, columns, pagination, selectedRowKeys, loading } = this.state;
    const buttonStyle = {
      borderRadius: 5,
      marginLeft: 10
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: record.ephemeralNodeFlag == "Y",
        name: record.ephemeralNodeFlag
      })
    };

    return (
      <div className="manageRegisteredNodes" style={{ position: "relative" }}>
        {this.state.loading ? <Loading /> : ""}
        <Modal
          title="下列数据删除有误："
          visible={this.state.visible}
          onCancel={this.closeModal}
          onOk={this.queryHandler}
          footer={null}
          style={{ padding: "20px 0" }}
        >
          <Table
            columns={this.state.errorColumns}
            dataSource={this.state.errorData}
            pagination={false}
            style={{ padding: 10 }}
            rowKey={record =>
              record.submoduleId +
              "*&!@#$%^" +
              record.ldcId +
              "*&!@#$%^" +
              record.serviceSocket +
              "*&!@#$%^" +
              record.serviceAddress +
              "*&!@#$%^" + 
              record.serviceContext
            }
          />
        </Modal>
        <div className="tableWrap">
          <Tabs defaultActiveKey="1">
            <TabPane tab="服务节点 管理" key="1">
              <WrapperQueryForm
                clearSelect={this.clearSelect}
                module={this.state.module ? [this.state.module] : []}
                submodule={this.state.submodule ? [this.state.submodule] : []}
                callbackParent={this.onChildQuery}
              />
              <div className="role-table">
                <div className="role-header" style={{ marginBottom: 10 }}>
                    <WrapButton
                      id="ServiceGovern.RegistereNodeConfig.BatchDownload"
                      disabled={selectedRowKeys.length === 0}
                      onClick={this.download}
                      type="primary"
                      size="small"
                      style={buttonStyle}
                    >
                      批量下载
                    </WrapButton>
                    <WrapButton
                      id="ServiceGovern.RegistereNodeConfig.BatchDelete"
                      disabled={selectedRowKeys.length === 0}
                      onClick={this.batchDelete}
                      type="primary"
                      size="small"
                      style={buttonStyle}
                    >
                      批量删除
                    </WrapButton>
                    <Button
                      disabled={selectedRowKeys.length === 0}
                      type="primary"
                      size="small"
                      style={buttonStyle}
                      onClick={this.clearSelect}
                    >
                      清空选择
                    </Button>
                    <span style={{ marginLeft: 10 }}>
                      {selectedRowKeys.length > 0
                        ? `已选择${selectedRowKeys.length}条`
                        : null}
                    </span>
                </div>
              </div>
              <Table
                rowKey={record =>
                  record.submoduleId +
                  "*&!@#$%^" +
                  record.ldcId +
                  "*&!@#$%^" +
                  record.serviceSocket +
                  "*&!@#$%^" +
                  record.serviceAddress +
                  "*&!@#$%^" + 
                  record.serviceContext
                }
                pagination={pagination}
                dataSource={data}
                rowSelection={rowSelection}
                columns={ this.state.columns}
                onChange={this.tableChangeHandle}
                scroll={{ x: 1000 }}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

class QueryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleCodeList: [],
      subModuleCodeList: []
    };
  }
  componentDidMount() {
    // this.queryModuleCodeList();
    // this.querySubModuleCodeList("");
  }
  //查询模块列表
  queryModuleCodeList = () => {
    let moduleParam = {
      sgModuleBusinessConfigVo: {
        page: {
          doPagination: false
        }
      }
    };
    querySgModuleBusinessConfigList(moduleParam).then(res => {
      const moduleCodeList = res.reply.resultList;
      moduleCodeList.unshift("")
      this.setState({
        moduleCodeList
      });
    });
  };

  //查询服务单元列表
  querySubModuleCodeList = moduleCode => {
    let subModuleParam = {
      sgSubmoduleBusinessConfigVo: {
        moduleCode: moduleCode,
        page: {
          doPagination: false
        }
      }
    };
    querySgSubmoduleBusinessConfigList(subModuleParam).then(res => {
      const subModuleCodeList = res.reply.result.list.map(item => {
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
    this.querySubModuleCodeList("")
  };
  handleReset = () => {
    this.props.form.resetFields();
    this.handleSearch();
    this.querySubModuleCodeList("");
  };

  handleSearch = e => {
    this.props.clearSelect();
    // e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.callbackParent(values);
    });
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    const { getFieldDecorator } = this.props.form;
    const { moduleCodeList, subModuleCodeList } = this.state;
    return (
      <Form>
        <Row style={{ marginTop: 18 }}>
          {/* <Col span={8}>
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
          </Col> */}
          {/* <Col span={8}>
            <FormItem {...formItemLayout} label="模块">
              {getFieldDecorator("moduleCode")(<Input />)}
            </FormItem>
          </Col> */}
          <Col span={8}>
            <FormItem {...formItemLayout} label="服务单元">
              {getFieldDecorator("submoduleId")(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="节点类型">
              {getFieldDecorator("ephemeralFlag", {})(
                <Select>
                  <Select.Option value="N">静态</Select.Option>
                  <Select.Option value="Y">动态</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="节点地址及端口">
              {getFieldDecorator("address")(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem>
              <Button
                onClick={this.handleSearch}
                className="queryDataBtn"
                type="primary"
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
