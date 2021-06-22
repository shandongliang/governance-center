import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  DatePicker,
  Button,
  message,
  Table,
  Tabs,
  Form,
  Row,
  Col,
  Input,
  Select
} from "antd";
import {
  querySubmoduleSDKVersion
} from "../service/service";
import "./../../../common/style/index.less";
import "./index.less";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class ZKStatus extends Component {
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
      filterValue: {},
      columns: [
        {
          title: "服务单元编号",
          dataIndex: "submoduleId",
          width: 70,
          key: "submoduleId"
        },
        {
          title: "SDK版本号",
          dataIndex: "sdkVer",
          width: 70,
          key: "sdkVer"
        },
        {
          title: "消费者版本",
          dataIndex: "consumerVer",
          width: 70,
          key: "consumerVer"
        },
        {
          title: "生产者版本",
          dataIndex: "producerVer",
          width: 70,
          key: "producerVer"
        },
        {
          title: "ZK路径",
          dataIndex: "path",
          width: 70,
          key: "path"
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
      page: {
        pageNo: pagination.current,
        recordsPerPage: pagination.pageSize,
        doPagination: true
      },
      submoduleId: filterValue.submoduleId,
      queryType: filterValue.queryType
    };
    querySubmoduleSDKVersion(data).then(res => {
      let page = Object.assign({}, this.state.pagination, {
        total: res.reply.result.page.total
      });
      this.setState(
        {
          data: res.reply.result.result,
          pagination: page,
          loading: false
        },
        () => {
          console.log(this.state)
        }
      );
    });
  };

  toVersion = () => {
    let path = {
      pathname: '/eventDriven/ZKStatus/queryVersion'
  }
  goTo(path,"ZK版本查看");
  }
  

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
    const buttonStyle = {
      borderRadius: 5,
      marginLeft: 10
    };
    const { loading } = this.state;

    return (
      <div style={{ position: "relative", height: "100%" }}>
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="ZK版本查看" key="1">
                <div className="portlet-body">
                  <div className="query-condition">
                    <WrapperQueryForm
                      callbackParent={this.onChildQuery}
                    />
                  </div>
                  <div style={{display: "flex", justifyContent: "flex-end", marginBottom: 15}}>
                    <Button 
                      size="large" 
                      icon="search"
                      type="primary"
                      style={{borderRadius: 5}}
                      onClick={this.toVersion}
                    >
                      版本查看
                    </Button>
                  </div>
                  <div>
                    <Table
                      rowKey={record => record.id}
                      pagination={this.state.pagination}
                      dataSource={this.state.data}
                      columns={this.state.columns}
                      onChange={this.tableChangeHandle}
                      loading={this.state.loading}
                      // scroll={{ x: 1200 }}
                    />
                  </div>
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
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  handleReset = () => {
    this.props.form.resetFields();
    this.handleSearch();
  };

  handleSearch = e => {
    this.props.form.validateFields((err, values) => {
      let data = {
        ...values
      };
      this.props.callbackParent(data);
    });
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Row style={{ marginTop: 18 }}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="服务单元编号">
              {getFieldDecorator("submoduleId")(<Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="数据来源">
              {getFieldDecorator("queryType",{
                initialValue: "0"
               })(
                <Select>
                  <Select.Option value="0">DB</Select.Option>
                  <Select.Option value="1">ZK</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout}>
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
