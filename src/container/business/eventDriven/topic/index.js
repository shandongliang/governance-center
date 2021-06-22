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
import { getOnlineStatus, getStatus } from "../../../../util/common";
// import "./indexv1.less";
import Loading from "../../../../component/loading";
import ExportBtnGroup from "../../../../component/ope-btn/opeBtn";
import {
  queryEdaTopicList,
  deleteEdaTopic,
  exportZkData
} from "../request/service";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import wrapAuth from "../../../../util/pageEleHOC";

const WrapButton = wrapAuth(Button);
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class TopicIndex extends Component {
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
          title: "主题名称",
          dataIndex: "topicName",
          width: 100,
          key: "topicName"
        },
        {
          title: "服务单元",
          dataIndex: "submoduleId",
          width: 100,
          key: "submoduleId"
        },
        {
          title: "集群编号	",
          width: 150,
          dataIndex: "clusterId",
          key: "clusterId"
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
          title: "创建时间",
          dataIndex: "createTime",
          width: 140,
          key: "createTime"
        },
        {
          title: "修改时间",
          dataIndex: "updateTime",
          width: 140,
          key: "updateTime"
        },
        // {
        //   title: "异常信息",
        //   dataIndex: "result",
        //   width: 120,
        //   align: "center",
        //   render: (text, record, index) => {
        //     if(text && text !== "S"){
        //       return (
        //         <Tooltip title={text}>
        //           <span>{text.substring(0, 10) + "..."}</span>
        //         </Tooltip>
        //       );
        //     }
            
        //   }
        // },
        {
          title: "操作",
          dataIndex: "key",
          width: 120,
          // fixed:'right',
          render: (text, record, index) => {
            return (
              <div>
                <WrapButton
                  id='EnventManager.TopicQuery.Edit'
                  type="primary"
                  className="priamryBtn"
                  disabled={record.result !== "S"}
                  onClick={() => this.toDetailOrEdit(record, "edit")}
                >
                  编辑
                </WrapButton>
                <Button
                  className="priamryBtn"
                  disabled={record.result !== "S"}
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
      edaTopic: {
        ...filterValue,
        page: {
          pageNo: pagination.current,
          recordsPerPage: pagination.pageSize,
        }
      }
    };
    queryEdaTopicList(data).then(res => {
      let page = Object.assign({}, this.state.pagination, {
        total: res.reply.topicList.page.total
      });
      this.setState(
        {
          data: res.reply.topicList.list,
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
      pathname: `/eventDriven/topic/${type}`,
      state: {
        id: record.id
      }
    }
    goTo(path,type === "detail"?"主题详情":"主题编辑");
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
              <TabPane tab="主题查询" key="1">
                <div className="portlet-body">
                  <WrapperQueryForm
                    clearSelect={this.clearSelect}
                    callbackParent={this.onChildQuery}
                  />
                  <ExportBtnGroup
                    clearSelect={this.clearSelect}
                    selectedData={selectedData}
                    fetchData={this.fetchData}
                    selectedRowKeys={selectedRowKeys}
                    exportCommonData={exportZkData}
                    deleteData={deleteEdaTopic}
                    deleteButtonId="EnventManager.TopicQuery.BatchDelete"
                  />
                  <Table
                    rowKey={record => record.id}
                    rowClassName={record => record.result !== "S" ? "warning-info" : ""}
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
            <FormItem {...formItemLayout} label="主题名称">
              {getFieldDecorator("topicName")(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="服务单元">
              {getFieldDecorator("submoduleId")(<Input />)}
            </FormItem>
          </Col>
          {/* <Col span={8}>
            <FormItem {...formItemLayout} label="集群编号">
              {getFieldDecorator("clusterId")(<Input />)}
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
