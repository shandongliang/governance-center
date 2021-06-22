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
  queryPermList
} from "../request/service";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class PermissionManager extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {  
      filterValue: {},
      data: [],
      columns: [
        {
          title: "权限点名称",
          dataIndex: "permName",
          width: 100,
          key: "permName"
        },
        {
          title: "权限点编码",
          dataIndex: "permId",
          width: 100,
          key: "permId"
        },
        {
          title: "上级权限点编码",
          width: 100,
          dataIndex: "parentPermId",
          key: "parentPermId"
        },
        {
          title: "操作",
          dataIndex: "key",
          width: 80,
          // fixed:'right',
          render: (text, record, index) => {
            return (
              <div>
                <Button
                  type="primary"
                  style={{borderRadius: 5}}
                  onClick={() => this.toPageEleConfig(record)}
                >
                  配置页面元素
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
  // 查询数据
  fetchData = () => {
    const { filterValue } = this.state;
    let data = {
      ...filterValue
    };
    queryPermList(data).then(res => {
      let permData = this.handlePermissionData(res.reply.permList);
      this.setState(
        {
          data: permData
        },
        () => {
          // console.log(this.state)
        }
      );
    });
  };
  handlePermissionData = permList => {
    let firstPermList = [];
    permList.forEach(item=>{
      if(item.parentPermId === "Root"){
        firstPermList.push({
          ...item,
          children: []
        });
      }
    });
    firstPermList.forEach(firstItem=>{
      permList.forEach(item=>{
        if(item.parentPermId === firstItem.permId){
          firstItem.children.push({
            ...item,
            children: []
          });
        }
      });
    })
    firstPermList.forEach(firstItem=>{
      firstItem.children.forEach(secondItem=>{
        permList.forEach(item=>{
          if(item.parentPermId === secondItem.permId){
            secondItem.children.push({
              ...item
            });
          }
        });
      })
    })
    firstPermList.map(item=>{
      if(item.children.length > 0){
        return item.children.map(itemA=>{
          if(itemA.children.length > 0){
            return itemA;
          } else {
            delete itemA.children;
            return itemA;
          }
        })
      } else {
        delete item.children;
        return item; 
      }
    })
    return firstPermList;
  }
  // 模块或服务单元
  toPageEleConfig = (record, type) => {
    let path = {
      pathname: `/systemManager/pageEle/config`,
      state: {
        permId: record.permId
      }
    }
    goTo(path);
  };
  // 获取筛选数据
  onChildQuery = filterValue => {
    this.setState(
      {
        filterValue,
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
          {/* <div className="tableWrap"> */}
          <div>
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="权限查询" key="1">
                <div className="portlet-body">
                  <WrapperQueryForm
                    callbackParent={this.onChildQuery}
                  />
                  <Table
                    rowKey={record => record.permId}
                    pagination={false}
                    dataSource={this.state.data}
                    columns={this.state.columns}
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
            <FormItem {...formItemLayout} label="权限点名称">
              {getFieldDecorator("permName")(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="权限点编码">
              {getFieldDecorator("permId")(<Input />)}
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
