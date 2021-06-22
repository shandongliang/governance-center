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
  queryDictionaryConfigApproveList,
  exportSGDictionaryConfig,
  deleteSgDictionaryApproveList
} from "../requestA/service";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

export default class DataDictionaryExcelQuery extends Component {
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
      serviceCode: "",
      columns: [
        {
          title: "字典大类代码",
          dataIndex: "dictionaryCode",
          width: 100,
          key: "dictionaryCode"
        },
        {
          title: "字典大类英文",
          dataIndex: "bigClassKey",
          width: 100,
          key: "bigClassKey"
        },
        {
          title: "字典大类中文",
          dataIndex: "bigClassName",
          width: 100,
          key: "bigClassName"
        },
        {
          title: "字典小类英文",
          dataIndex: "subClassKey",
          width: 100,
          key: "subClassKey"
        },
        {
          title: "字典小类中文",
          dataIndex: "subClassName",
          width: 100,
          key: "subClassName"
        },
        {
          title: "变更类型",
          dataIndex: "changeType",
          width: 70,
          render: (text, record, index) => {
            let data = "";
            if (text == "00") {
              data = "新增";
            } else if (text == "01") {
              data = "删除";
            } else if (text == "10") {
              data = "修改";
            }
            return <span>{data}</span>;
          }
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
        // {
        //     title: '计划上线日期',
        //     dataIndex: 'planTime',
        //     width: 100,
        //     key: "planTime"
        // },
        {
          title: "操作",
          dataIndex: "ss",
          width: 150,
          render: (text, record, index) => {
            return (
              <div>
                <Button
                  className="priamryBtn"
                  type="primary"
                  onClick={() => this.toDetailOrEdit(record, "edit")}
                >
                  编辑
                </Button>
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
      dictionaryCode: filterValue.dictionaryCode,
      subClassKey: filterValue.subClassKey,
      approveStatus: filterValue.approveStatus
    };
    queryDictionaryConfigApproveList(data).then(res => {
      let page = Object.assign({}, this.state.pagination, {
        total: res.reply.result.page.total
      });
      this.setState(
        {
          data: res.reply.result.sgAllClassDictionaryArrayList,
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
    const dictionaryId = record.id;
    localStorage.setItem("dictionaryId", dictionaryId);
    let path = {
			pathname: `/gateway/dataDictionary/${type}`,
			state: { id: dictionaryId }
		};
		goTo(path, type === "detail"?"数据字典详情":"修改数据字典");
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
              <TabPane tab="数据字典查询" key="1">
                <div className="portlet-body">
                  <WrapperQueryForm
                    clearSelect={this.clearSelect}
                    callbackParent={this.onChildQuery}
                  />
                  <ExportBtnGroup
                  clearSelect={this.clearSelect}
                  selectedRowKeys={selectedRowKeys}
                  fetchData={this.fetchData}
                  exportData={exportSGDictionaryConfig}
                  deleteData={deleteSgDictionaryApproveList}
                />
                  <Table
                    rowKey={record => record.id}
                    rowSelection={rowSelection}
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
    this.props.form.resetFields([
      "dictionaryCode",
      "subClassKey",
      "approveStatus"
    ]);
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
            <FormItem {...formItemLayout} label="字典大类代码">
              {getFieldDecorator("dictionaryCode")(<Input />)}
            </FormItem>
          </Col>
          <Col span={7} offset={1}>
            <FormItem {...formItemLayout} label="字典小类英文">
              {getFieldDecorator("subClassKey")(<Input />)}
            </FormItem>
          </Col>
          <Col span={7} offset={1}>
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
          <Col span={7} offset={1}>
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
