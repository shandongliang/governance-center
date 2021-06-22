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
  Modal,
  Radio
} from "antd";
import {
  querySysUserModule,
} from "../request/service";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const RadioGroup  = Radio.Group;
export default class ModuleRelatedUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: {},
      data: [],
      pagination: {
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
        total: 0
      },
      userId: "",
      columns: [
        {
          title: "用户ID",
          dataIndex: "userId",
          // width: 70,
          render: (text, record, index) => {
            return <span>{text===null||text===""?"--":text}</span>;
          }
        },
        {
          title: "模块编码",
          dataIndex: "modulecode",
          // width: 70,
          render: (text, record, index) => {
            return <span>{text===null||text===""?"--":text}</span>;
          }
        },
        {
          title: "权限",
          dataIndex: "modify",
          // width: 80,
          render: (text, record, index) => {
            return <span>{text===1?"编辑":"只读"}</span>;
          }
        },
        {
          title: "操作",
          dataIndex: "key",
          width: 150,
          // fixed:'right',
          render: (text, record, index) => {
            return (
              <div>
                {record.modify === 1?<Button
                  type="primary"
                  className="priamryBtn"
                  onClick={() => this.relatedUser(record)}
                >
                  关联用户
                </Button>:null}
                <Button
                  className="priamryBtn"
                  onClick={() => this.querySubModule(record)}
                >
                  查看
                </Button>
              </div>
            );
          }
        }
      ]
    };
  }
  componentDidMount() {
    let userId = JSON.parse(sessionStorage.getItem("$pandora_auth.user_info")).userId;
    this.setState({
      userId
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
    const { filterValue, pagination, userId } = this.state;
    let data = {
      sysUserModuleVo: {
        page: {
          pageNo: pagination.current,
          recordsPerPage: pagination.pageSize
        },
        userId,
        ...filterValue
      }
    };
    querySysUserModule(data).then(res => {
      let page = Object.assign({}, this.state.pagination, {
        total: res.reply.page.total
      });
      this.setState(
        {
          data: res.reply.resultList,
          pagination: page,
          loading: false
        },
        () => {
          // console.log(this.state)
        }
      );
    });
  };

  relatedUser = record => {
    let path = {
      pathname: "/manager/moduleRelatedUser/related",
      state: {
        modulecode: record.modulecode
      }
    }
    goTo(path);
  }

  querySubModule = record => {
    let path = {
      pathname: "/manager/subModuleRelatedUser/index",
      state: {
        modulecode: record.modulecode
      }
    }
    goTo(path);
  }
  
  render() {
    return (
      <div style={{ position: "relative" }}>
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="用户关联模块" key="1">
                <div className="portlet-body">
                  <WrapperQueryForm
                    callbackParent={this.onChildQuery}
                  />
                  <Table
                    rowKey={record => record.modulecode}
                    pagination={this.state.pagination}
                    dataSource={this.state.data}
                    columns={this.state.columns}
                    onChange={this.tableChangeHandle}
                    // scroll={{ x: 1200 }}
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
          <Col span={8}>
            <FormItem {...formItemLayout} label="模块编码">
              {getFieldDecorator("moculecode")(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
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
