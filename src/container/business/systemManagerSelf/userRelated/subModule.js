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
  querySgModuleCommonConfigList,
  querySgSubmoduleCommonConfigList,
  querySysUserSubmodule,
  addSysUserSubmodule,
  editSysUserSubmodule,
  deleteSysUserSubmodule
} from "../request/service";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const RadioGroup  = Radio.Group;
export default class RelatedSubModule extends Component {
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
      visible: false,
      subModuleList: [],
      moduleList: [],
      submodulecode: "",
      modulecode: "",
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
          title: "服务单元编码",
          dataIndex: "submodulecode",
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
                <Button
                  type="primary"
                  className="priamryBtn"
                  onClick={() => this.editRelatedSubModule(record)}
                >
                  编辑
                </Button>
                <Button
                  type="danger"
                  className="priamryBtn"
                  onClick={() => this.deleteRelatedSubModule(record)}
                >
                  删除
                </Button>
              </div>
            );
          }
        }
      ]
    };
  }
  componentDidMount() {
    let { userId } = this.props.location.state;
    this.setState({
      userId
    },()=>{
      this.fetchData();
    })
    this.queryAllModule();
  }
  //查询所有模块
  queryAllModule = () => {
    let data = {
      sgModuleCommonConfigVo: {
        page: {
          doPagination: false
        }
      }
    };
    querySgModuleCommonConfigList(data).then(res => {
      this.setState({
        moduleList: res.reply.result.configList
      });
    });
  }
  //查询所有服务单元
  querySubModuleByModule = moduleCode => {
    let data = {
      sgSubmoduleCommonConfigVo: {
        page: {
          doPagination: false
        },
        moduleCode
      }
    };
    querySgSubmoduleCommonConfigList(data).then(res => {
      this.setState({
        subModuleList: res.reply.result.list
      });
    });
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
    querySysUserSubmodule(data).then(res => {
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
  // 修改关联模块 
  editRelatedSubModule = record => {
    delete record.createtime;
    let data = {
      list: [{
        ...record,
        modify: record.modify?1:0
      }]
    }
    Modal.confirm({
      title: "编辑关联模块",
      content: `确认将用户${record.userId}对服务单元${record.submodulecode}的权限修改为${record.modify===1?"只读":"编辑"}吗？`,
      okText: "确认",
      onOk: () => {
        editSysUserSubmodule(data).then(res=>{
          if(res.reply.returnCode.type==="S"){
            message.info("修改成功!");
            this.fetchData();
          }
        })
      }
    });
  }
  deleteRelatedSubModule = record => {
    delete record.createtime;
    let data = {
      list: [record]
    }
    Modal.confirm({
      title: "删除关联模块",
      content: `确认删除用户${record.userId}与服务单元${record.submodulecode}关联吗？`,
      okText: "删除",
      onOk: () => {
        deleteSysUserSubmodule(data).then(res=>{
          if(res.reply.returnCode.type==="S"){
            message.info("删除成功!");
            this.fetchData();
          }
        })
      }
    });
  }
  // 创建关联模块
  createRelatedSubModule = () => {
    const { userId, modify, modulecode, submodulecode } = this.state;
    let moduleId = "";
    let data = {
      list: [{
        userId,
        modify,
        modulecode,
        submodulecode
      }]
    };
    addSysUserSubmodule(data).then(res=>{
      if(res.reply.returnCode.type==="S"){
        message.info("关联成功!");
        this.setState({
          visible: false,
          modify: "",
          moduleCode: "",
          submodulecode: ""
        });
        this.fetchData();
      }
    });
  }
  
  cancleModal = () => {
    this.setState({
      visible: false,
    });
    message.info("取消创建");
  };
  render() {
    const { loading, moduleList, subModuleList, modulecode, submodulecode, modify, visible } = this.state;
    return (
      <div style={{ position: "relative" }}>
        <Modal
          visible={visible}
          title="关联服务单元"
          onOk={this.createRelatedSubModule}
          onCancel={this.cancleModal}
        >
          <Row type="flex" align="middle" style={{margin: 20}}>
            <Col span={8}>权限:</Col>
            <Col span={16}>
            <RadioGroup onChange={e=>{this.setState({modify: e.target.value})}} value={modify}>
              <Radio value={0}>只读</Radio>
              <Radio value={1}>编辑</Radio>
            </RadioGroup>
            </Col>
          </Row>
          <Row type="flex" align="middle" style={{margin: 20}}>
            <Col span={8}>模块编码:</Col>
            <Col span={16}>
              <Select
                placeholder="请选择关联模块"
                value={modulecode}
                showSearch={true}
                style={{ width: "100%" }}
                onChange={value =>
                  {
                    this.setState({ modulecode: value });
                    this.querySubModuleByModule(value)
                  }
                }
              >
                {moduleList.map(item=>(
                  <Select.Option value={item.moduleCode} key={item.moduleCode}>{item.moduleCode}</Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row type="flex" align="middle" style={{margin: 20}}>
            <Col span={8}>关联服务单元编码:</Col>
            <Col span={16}>
              <Select
                placeholder="请选择关联服务单元"
                disabled={!modulecode}
                value={submodulecode}
                showSearch={true}
                style={{ width: "100%" }}
                onChange={value =>
                  this.setState({ submodulecode: value })
                }
              >
                {subModuleList.map(item=>(
                  <Select.Option value={item.subModuleCode} key={item.subModuleCode}>{item.subModuleCode}</Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Modal>
        {/* {this.state.loading ? <Loading /> : ""} */}
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="用户关联模块" key="1">
                <div className="portlet-body">
                  {/* <WrapperQueryForm
                    callbackParent={this.onChildQuery}
                  /> */}
                  <div style={{display:"flex", margin: "10px 0", justifyContent: "flex-end"}} >
                    <Button 
                      size="large" 
                      icon="plus"
                      style={{backgroundColor: "#e96b10", color: "#fff", borderColor: "#e96b10"}} 
                      onClick={()=>this.setState({visible: true})}>
                      创建用户关联服务单元
                    </Button>
                  </div>
                  <Table
                    rowKey={record => record.modulecode+record.submodulecode}
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
            <FormItem {...formItemLayout} label="服务单元编码">
              {getFieldDecorator("submoculecode")(<Input />)}
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
