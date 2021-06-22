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
import { getApproveStatus, getOnlineStatus, getStatus } from "../../../../util/common";
// import "./indexv1.less";
import Loading from "../../../../component/loading";
import ExportBtnGroup from "../../../../component/ope-btn/opeBtn";
import {
  queryEdaTopicConsumerApproveList,
  deleteEdaTopicConsumerApprove,
  exportConfigTxtByType,
  exportOldConfigTxtByType
} from "../request/service";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import wrapAuth from "../../../../util/pageEleHOC";

const WrapButton = wrapAuth(Button);
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class ConsumerApproveIndex extends Component {
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
          title: "消费者编号",
          dataIndex: "consumerId",
          width: 150,
          key: "consumerId"
        },
        {
          title: "服务单元",
          dataIndex: "submoduleId",
          width: 100,
          key: "submoduleId"
        },
        {
          title: "审核状态",
          dataIndex: "approveStatus",
          width: 150,
          render: text => {
            return getApproveStatus(text);
          }
        },
        {
          title: "状态",
          dataIndex: "status",
          width: 80,
          render: text => {
            return getStatus(text);
          }
        },
        {
          title: "上线状态",
          dataIndex: "onlineStatus",
          width: 80,
          render: text => {
            return getOnlineStatus(text);
          }
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
                  id='EnventApprove.ConsumerQuery.Edit'
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
      edaTopicConsumerApproveVo: {
        ...filterValue,
        page: {
          pageNo: pagination.current,
          recordsPerPage: pagination.pageSize,
        }
      }
    };
    queryEdaTopicConsumerApproveList(data).then(res => {
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
      pathname: `/eventDrivenApprove/consumer/${type}`,
      state: {
        id: record.id
      }
    }
    goTo(path,type === "detail"?"消费者详情":"消费者编辑");
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
        id: item
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
              <TabPane tab="消费者查询" key="1">
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
                    exportType="CONSUMER"
                    deleteData={deleteEdaTopicConsumerApprove}
                    deleteButtonId="EnventApprove.ConsumerQuery.BatchDelete"
                    exportOldButtonId="EnventApprove.ConsumerQuery.ExportOldData"
                    exportButtonId="EnventApprove.ConsumerQuery.ExportData"
                  />
                  <Table
                    rowKey={record => record.id}
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
            <FormItem {...formItemLayout} label="消费者编号">
              {getFieldDecorator("consumerId")(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="服务单元">
              {getFieldDecorator("submoduleId")(<Input />)}
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
                  <Select.Option value="3">申请中</Select.Option>
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
