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
  querySysPermEle,
  editPageEle,
  deleteSysPermEle,
  insertSysPermEle
} from "../request/service";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
export default class PageEleConfig extends Component {
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
      permId: "",
      visible: false,
      eleId: [],
      eleType: "",
      columns: [
        {
          title: "权限点编码",
          dataIndex: "permId",
          // width: 70,
          render: (text, record, index) => {
            return <span>{text === null || text === "" ? "--" : text}</span>;
          }
        },
        {
          title: "元素ID",
          dataIndex: "eleId",
          // width: 70,
          render: (text, record, index) => {
            return <span>{text === null || text === "" ? "--" : text}</span>;
          }
        },
        {
          title: "元素类型",
          dataIndex: "eleType",
          // width: 80,
          render: (text, record, index) => {
            return <span>{text === null || text === "" ? "--" : text}</span>;
          }
        },
        {
          title: "操作",
          dataIndex: "key",
          width: 80,
          // fixed:'right',
          render: (text, record, index) => {
            return (
              <div>
                {/* <Button
                  type="primary"
                  className="priamryBtn"
                  onClick={() => this.editPageEle(record)}
                >
                  编辑
                </Button> */}
                <Button
                  type="danger"
                  className="priamryBtn"
                  onClick={() => this.deletePageEle(record)}
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
    let { permId } = this.props.location.state;
    this.setState(
      {
        permId
      },
      () => {
        this.fetchData();
      }
    );
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
    const { filterValue, pagination, permId } = this.state;
    let data = {
      sysPermEleVo: {
        page: {
          pageNo: pagination.current,
          recordsPerPage: pagination.pageSize
        },
        permId,
        ...filterValue
      }
    };
    querySysPermEle(data).then(res => {
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
  // 修改页面元素
  editPermEle = record => {
    
    Modal.confirm({
      title: "编辑页面元素",
      content: (
        <Row type="flex" align="middle" style={{ margin: 20 }}>
          <Col span={6}>元素类型:</Col>
          <Col span={18}>
            <Select
              placeholder="请选择元素类型"
              defaultValue={record.eleType}
              // value={eleType}
              showSearch={true}
              style={{ width: "100%" }}
              onChange={value => this.setState({ eleType: value })}
            >
              {/* <Select.Option value="readonly">readonly</Select.Option> */}
              <Select.Option value="disabled">disabled</Select.Option>
              <Select.Option value="hidden">hidden</Select.Option>
              <Select.Option value="show">show</Select.Option>
            </Select>
          </Col>
        </Row>
      ),
      okText: "确认",
      onOk: () => {
        let data = {
          ...record,
          eleType: this.state.eleType
        };
        editSysUserModule(data).then(res => {
          if (res.reply.returnCode.type === "S") {
            message.info("修改成功!");
            this.setState({
              visible: false,
              eleId: "",
              eleType: ""
            });
            this.fetchData();
          }
        });
      }
    });
  };
  deletePageEle = record => {
    let data = {
      list: [record]
    };
    Modal.confirm({
      title: "删除页面元素",
      content: `确认删除权限${record.permId}的页面元素${record.eleId}吗？`,
      okText: "删除",
      onOk: () => {
        deleteSysPermEle(data).then(res => {
          if (res.reply.returnCode.type === "S") {
            message.info("删除成功!");
            this.fetchData();
          }
        });
      }
    });
  };
  // 创建关联模块
  createPermEle = () => {
    const { eleId, eleType, permId } = this.state;
    let moduleId = "";
    let data = {
      list: [
        {
          eleId,
          eleType,
          permId
        }
      ]
    };
    insertSysPermEle(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        message.info("配置成功!");
        this.setState({
          visible: false,
          eleId: "",
          eleType: ""
        });
        this.fetchData();
      }
    });
  };
  cancleModal = () => {
    this.setState({
      visible: false
    });
    message.info("取消创建");
  };
  render() {
    const { eleId, visible, eleType, permId } = this.state;
    return (
      <div style={{ position: "relative" }}>
        <Modal
          visible={visible}
          title="增加页面元素"
          onOk={this.createPermEle}
          onCancel={this.cancleModal}
        >
          <Row type="flex" align="middle" style={{ margin: 20 }}>
            <Col span={6}>权限ID:</Col>
            <Col span={18}>{permId}</Col>
          </Row>
          <Row type="flex" align="middle" style={{ margin: 20 }}>
            <Col span={6}>元素ID:</Col>
            <Col span={18}>
              <Input
                value={eleId}
                onChange={e => this.setState({ eleId: e.target.value })}
              />
            </Col>
          </Row>
          <Row type="flex" align="middle" style={{ margin: 20 }}>
            <Col span={6}>元素类型:</Col>
            <Col span={18}>
              <Select
                placeholder="请选择元素类型"
                value={eleType}
                showSearch={true}
                style={{ width: "100%" }}
                onChange={value => this.setState({ eleType: value })}
              >
                {/* <Select.Option value="readonly">readonly</Select.Option> */}
                <Select.Option value="disabled">disabled</Select.Option>
                <Select.Option value="hidden">hidden</Select.Option>
                <Select.Option value="show">show</Select.Option>
              </Select>
            </Col>
          </Row>
        </Modal>
        {/* {this.state.loading ? <Loading /> : ""} */}
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="配置页面元素" key="1">
                <div className="portlet-body">
                  <WrapperQueryForm callbackParent={this.onChildQuery} />
                  <div
                    style={{
                      display: "flex",
                      margin: "10px 0",
                      justifyContent: "flex-end"
                    }}
                  >
                    <Button
                      size="large"
                      icon="plus"
                      style={{
                        backgroundColor: "#e96b10",
                        color: "#fff",
                        borderColor: "#e96b10"
                      }}
                      onClick={() => this.setState({ visible: true })}
                    >
                      配置页面元素
                    </Button>
                  </div>
                  <Table
                    rowKey={record => record.eleId}
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
            <FormItem {...formItemLayout} label="元素ID">
              {getFieldDecorator("eleId")(<Input />)}
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
