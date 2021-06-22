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
import {
  queryDictionaryConfigApproveList,
  editSGDictionaryConfigApprove
} from "../requestA/service";
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
        // {
        //     title: '数据版本号',
        //     dataIndex: 'dataVersion',
        //     width: 90,
        //     key: 'dataVersion',
        // },
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
          title: "操作",
          dataIndex: "ss",
          width: 150,
          render: (text, record, index) => {
            return (
              <div>
                <Button
                  className="priamryBtn"
                  type="primary"
                  onClick={() => this.toEditDataDictionary(record)}
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
    localStorage.setItem("dictionaryId", record.id);
    let path = {
			pathname: '/approve/dataDictionary/detail',
			state: { id: dictionaryId }
		};
		goTo(path, "数据字典详情");
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
      dictionaryCode: filterValue.dictionaryCode,
      subClassKey: filterValue.subClassKey,
      approveStatus: "00"
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
      sgSubClassDictionary: approveData,
      flag: "0"
    };
    editSGDictionaryConfigApprove(data).then(res => {
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
          title="您确定审核当前选中的数据字典？"
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
              <TabPane tab="数据字典审核" key="1">
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
    this.props.form.resetFields(["dictionaryCode", "subClassKey"]);
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
