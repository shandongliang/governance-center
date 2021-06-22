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
import "./../../../../common/style/index.less";
import Loading from "../../../../../component/loading";
import {
  queryEdaTopicRelationList
} from "../../request/service";
import { relationColumns } from "../../request/common";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class QueryRelationData extends Component {
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
      selectedData: []
    };
  }
  async componentDidMount() {
    const { relationSelectedKey, relationSelectedData } = this.props;
    await this.fetchData();
    this.setState({
      selectedRowKeys: relationSelectedKey,
      selectedData: relationSelectedData
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
    const { filterValue, pagination } = this.state;
    let data = {
      edaTopicRelationVo: {
        ...filterValue,
        page: {
          pageNo: pagination.current,
          recordsPerPage: pagination.pageSize,
        }
      }
    };
    queryEdaTopicRelationList(data).then(res => {
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

  onSelectService = (record, selected) => {
    let { selectedRowKeys, selectedData } = this.state;
    let newSelectedRowKeys = [], newSelectedData = [];
    if(selected) {
      selectedRowKeys.push(record.id);
      selectedData.push({
        ...record,
        detail: JSON.stringify(record)
      });
      newSelectedRowKeys = selectedRowKeys;
      newSelectedData = selectedData
    } else {
      newSelectedRowKeys = selectedRowKeys.filter(item => {
        return item !== record.id
      })
      newSelectedData = selectedData.filter(item => {
        return item.id !== record.id
      })
    }
    this.setState({
      selectedRowKeys: newSelectedRowKeys,
      selectedData: newSelectedData
    })
  }

  onSelectAll = (selected, selectedRows, changeRows) => {
    let { selectedRowKeys, selectedData } = this.state;
    let newSelectedRowKeys = [], newSelectedData = [];
    if(selected) {
      changeRows.map(item => {
        selectedRowKeys.push(item.id);
        selectedData.push({
          ...item,
          detail: JSON.stringify(item)
        });
      })
      newSelectedRowKeys = selectedRowKeys;
      newSelectedData = selectedData;
    } else {
      selectedRowKeys.map(item => {
        if(!changeRows.some(changeItem => item === changeItem.id)) {
          newSelectedRowKeys.push(item)
        }
      })
      selectedData.map(item => {
        if(!changeRows.some(changeItem => item.id === changeItem.id)) {
          newSelectedData.push(item)
        }
      })
    }
    this.setState({
      selectedRowKeys: newSelectedRowKeys,
      selectedData: newSelectedData
    })
  }

  changeStep = () => {
    const { selectedRowKeys, selectedData } = this.state;
    this.props.getRelationData(selectedRowKeys, selectedData, "2");
  }

  render() {
    const { loading, selectedRowKeys, selectedData, data, pagination } = this.state;
    const rowSelection = {
      columnWidth: 40,
      selectedRowKeys,
      // onChange: this.onSelectChange,
      onSelect: this.onSelectService,
      onSelectAll: this.onSelectAll
    };
    return (
      <div style={{ position: "relative" }}>
        {loading ? <Loading /> : ""}
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="关联关系查询" key="1">
                <div className="portlet-body">
                  <WrapperQueryForm
                    clearSelect={this.clearSelect}
                    callbackParent={this.onChildQuery}
                  />
                  <div className="exportButton">
                    <Button type="primary" onClick={this.changeStep} >下一步<Icon type="right"/></Button>
                  </div>
                  <Table
                    rowKey={record => record.id}
                    rowClassName={record => record.result !== "S" ? "warning-info" : ""}
                    rowSelection={rowSelection}
                    pagination={pagination}
                    dataSource={data}
                    columns={relationColumns}
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
    // this.props.clearSelect();
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
            <FormItem {...formItemLayout} label="生产者ID">
              {getFieldDecorator("producerId")(<Input />)}
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
