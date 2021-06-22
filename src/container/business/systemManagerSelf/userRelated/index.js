import React, { Component } from "react";
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
import {
  queryUserList
} from "../request/service";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class UserRelated extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {  
      filterValue: {},
      data: [],
      pagination: {
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
        total: 0
      },
      columns: [
        {
          title: "用户姓名",
          dataIndex: "userName",
          width: 100,
          render: (text, record, index) => {
            return (
              <a href="javascript:;" onClick={()=>this.toUserDetail(record)}>{text}</a>
            )
          }
        },
        {
          title: "用户ID",
          dataIndex: "userId",
          width: 100,
          key: "userId"
        },
        {
          title: "用户角色",
          width: 100,
          dataIndex: "roleNames",
          render: (text, record, index) => {
            return (
              <span>{record.roleNames?record.roleNames.join(","):""}</span>
            )
          }
        },
        {
          title: "所属机构",
          dataIndex: "orgName",
          width: 100,
          key: "orgName"
        },
        {
          title: "固定电话",
          dataIndex: "telephone",
          width: 100,
          key: "telephone"
        },
        {
          title: "操作",
          dataIndex: "key",
          width: 120,
          // fixed:'right',
          render: (text, record, index) => {
            return (
              <div>
                <Button
                  type="primary"
                  className="priamryBtn"
                  onClick={() => this.toModuleOrSubModule(record, "module")}
                >
                  关联模块
                </Button>
                <Button
                  type="primary"
                  className="priamryBtn"
                  onClick={() => this.toModuleOrSubModule(record, "subModule")}
                >
                  关联服务单元
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
    const { filterValue, pagination } = this.state;
    let data = {
      ...pagination,
      ...filterValue
    };
    queryUserList(data).then(res => {
      let page = Object.assign({}, this.state.pagination, {
        total: res.reply.page.total
      });
      this.setState(
        {
          data: res.reply.userList,
          pagination: page,
          loading: false
        },
        () => {
          // console.log(this.state)
        }
      );
    });
  };
  // 模块或服务单元
  toModuleOrSubModule = (record, type) => {
    let path = {
      pathname: `/manager/userRelated/${type}`,
      state: {
        userId: record.id
      }
    }
    goTo(path);
  };
  toUserDetail = user => {
    let path = {
      pathname: "/systemManage/userManager/userDetail/"+user.userId,
      state: {
        pagination: this.state.pagination,
        userId: user.userId,
        userName: user.userName,
        orgName: user.orgName,
        queryUserId: user.userId,
        roleName: user.roleName
      }
    }
    goTo(path);
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
    const { loading } = this.state;
    return (
      <div style={{ position: "relative" }}>
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="用户查询" key="1">
                <div className="portlet-body">
                  <WrapperQueryForm
                    callbackParent={this.onChildQuery}
                  />
                  {/* <div style={{display:"flex", margin: "10px 0", justifyContent: "flex-end"}} >
                    <Button 
                      size="large" 
                      icon="plus"
                      style={{backgroundColor: "#e96b10", color: "#fff", borderColor: "#e96b10" }} 
                      onClick={this.createUser}>
                      创建用户
                    </Button>
                  </div> */}
                  <Table
                    rowKey={record => record.id}
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
            <FormItem {...formItemLayout} label="用户姓名">
              {getFieldDecorator("userName")(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="用户ID">
              {getFieldDecorator("userId")(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="用户角色">
              {getFieldDecorator("roleName")(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="所属机构">
              {getFieldDecorator("orgName")(<Input />)}
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
