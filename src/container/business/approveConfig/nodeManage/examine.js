import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import {
  Icon,
  Button,
  Select,
  message,
  Table,
  Modal,
  Tabs,
  Form,
  Row,
  Col,
  Input,
  Tooltip
} from "antd";
import "./../../../common/style/index.less";
import Loading from "../../../../component/loading";
import { queryRegisterNodeList, updateRegisterNode } from "../requestA/service";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
export default class DataDictionaryExcelQuery extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor() {
    super();
    this.state = {
      loading: false,
      data: [],
      selectedRowKeys: [],
      filterValue: {},
      pagination: {
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
        total: 0
      },
      serviceCode: "",
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
          title: "操作",
          dataIndex: "ss",
          width: 150,
          render: (text, record, index) => {
            return (
              <div>
                <Button
                  className="priamryBtn"
                  onClick={() => this.toEditDataDictionary(record)}
                  type="primary"
                >
                  审核
                </Button>
                <Button
                  className="priamryBtn"
                  onClick={() => this.toDetail(record)}
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
  // 详情
  toDetail = record => {
    const nodeManageId = record.id;
    let path = {
      pathname: `/gateway/nodeManage/detail`,
      state: {
        nodeManageId
      }
    };
    goTo(path,"注册节点详情");
  };
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
      approveStatus: "00"
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
  // 选择下载项
  onSelectChange = selectedRowKeys => {
    this.setState({
      selectedRowKeys
    });
  };
  toEditDataDictionary = record => {
    this.setState({
      selectedRowKeys: [record.id],
      visiable: true
    });
  };
  //批量审核
  examine = result => {
    let approveData = this.state.selectedRowKeys.map(item => {
      return {
        id: item,
        approveStatus: result,
        approveText: this.state.approveText
      };
    });
    let data = {
      sgServerConfigApproveList: approveData,
      flag: "0"
    };
    updateRegisterNode(data).then(res => {
      if (res.reply.returnCode.type == "S") {
        this.setState({
          selectedRowKeys: [],
          visiable: false,
          approveText: ""
        });
        Modal.success({
          title: "审核成功",
          onOk: () => {
            this.fetchData();
          }
        });
      }
    });
  };
  cancleModal = () => {
    this.setState({
      visiable: false,
      selectedRowKeys: [],
      approveText: ""
    });
    message.info("审核取消");
  };
  //清空选择
  clearSelect = () => {
    this.setState({
      selectedRowKeys: []
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
        <Modal
          // style = {{paddingLeft: 100, paddingRight: 100 }}
          width={500}
          visible={this.state.visiable}
          title="您确定审核当前选中的注册节点？"
          // closable
          onCancel={this.cancleModal}
          footer={[
            <Button
              size="large"
              key="nopass"
              type="primary"
              onClick={() => this.examine("11")}
            >
              不通过
            </Button>,
            <Button
              size="large"
              key="pass"
              type="primary"
              onClick={() => this.examine("01")}
            >
              通过
            </Button>
          ]}
        >
          <Input.TextArea
            placeholder="请输入审核意见"
            value={this.state.approveText}
            onChange={event =>
              this.setState({ approveText: event.target.value })
            }
            rows={6}
            style={{ margin: 30, width: 400 }}
          />
        </Modal>
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="注册节点审核" key="1">
                <div className="portlet-body">
                  <WrapperQueryForm
                    clearSelect={this.clearSelect}
                    callbackParent={this.onChildQuery}
                  />
                  <div style={{ marginBottom: 5 }}>
                    <Button
                      type="primary"
                      size="small"
                      disabled={this.state.selectedRowKeys.length === 0}
                      onClick={() => this.setState({ visiable: true })}
                      style={buttonStyle}
                    >
                      批量审核
                    </Button>
                    <Button
                      type="primary"
                      disabled={this.state.selectedRowKeys.length === 0}
                      size="small"
                      style={buttonStyle}
                      onClick={this.clearSelect}
                    >
                      清空选择
                    </Button>
                    <span style={{ marginLeft: 10 }}>
                      {this.state.selectedRowKeys.length > 0
                        ? `已选择${this.state.selectedRowKeys.length}条`
                        : null}
                    </span>
                  </div>
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
