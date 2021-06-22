import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Input,
  Row,
  Col,
  Table,
  Tabs,
  Button,
  Icon,
  Select,
  Modal,
  Popconfirm,
  Message,
  InputNumber,
  AutoComplete,
  message
} from "antd";
import { SERVICEP_PROTOCOL } from "../requestA/common";
import {
  selectLdc,
  querySgModuleConfigApproveList,
  querySgSubmoduleConfigApproveList,
  createRegisterNodeList
} from "../requestA/service";
import "./../../../common/style/index.less";
import { goTo, goToAndClose } from '../../../../util/tabRouter';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class GlobalRoutingRegisteredNodesCreate extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0
      },
      paginationSub: {
        pageSize: 10,
        current: 1,
        total: 0
      },
      isUser: false,
      visible: false,
      visibleSub: false,
      moduleCode: "",
      subModuleCode: "",
      moduleCodeList: [],
      subModuleCodeList: [],
      ldclist: [],
      columnSubModule: [
        {
          title: "服务单元编码",
          dataIndex: "subModuleCode",
          width: 100,
          render: (text, record, index) => {
            return <span>{text}</span>;
          }
        },
        {
          title: "服务单元名称",
          width: 150,
          dataIndex: "subModuleName",
          render: (text, record, index) => {
            return <span>{text}</span>;
          }
        },
        {
          title: "模块编码",
          width: 100,
          dataIndex: "moduleCode",
          render: (text, record, index) => {
            return <span>{text}</span>;
          }
        },
        {
          title: "状态",
          width: 70,
          dataIndex: "status",
          render: (text, record, index) => {
            if (text == "Y") {
              text = "已启用";
            } else if (text == "N") {
              text = "已禁用";
            }
            return <span>{text}</span>;
          }
        }
      ],
      columnsModule: [
        {
          title: "模块编码",
          dataIndex: "moduleCode",
          width: 100,
          render: (text, record, index) => {
            return <span>{text}</span>;
          }
        },
        {
          title: "模块名称",
          dataIndex: "moduleName",
          width: 150,
          render: (text, record, index) => {
            return <span>{text}</span>;
          }
        },
        {
          title: "状态",
          width: 70,
          dataIndex: "status",
          render: (text, record, index) => {
            if (text == "Y") {
              text = "已启用";
            } else if (text == "N") {
              text = "已禁用";
            }
            return <span>{text}</span>;
          }
        }
      ]
    };
  }
  componentDidMount() {
    this.queryLdcId();
    this.fetchModuleData();
  }

  // 查询ldcId
  queryLdcId = () => {
    selectLdc().then(res => {
      this.setState({
        ldclist: res.reply.result
      });
    });
  };

  fetchData = () => {
    let page = Object.assign({}, this.state.pagination, {
      current: 1
    });
    this.setState(
      {
        pagination: page
      },
      () => {
        this.fetchModuleData();
      }
    );
  };

  fetchModuleData = () => {
    this.setState({ loading: true });
    const { quModuleCode, quModuleName, pagination } = this.state;
    let data = {
      pageNo: pagination.current,
      recordsPerPage: pagination.pageSize,
      moduleCode: quModuleCode,
      moduleName: quModuleName
    };
    querySgModuleConfigApproveList(data).then(res => {
      let page = Object.assign({}, this.state.pagination, {
        total: res.reply.page.total
      });
      this.setState(
        {
          moduleCodeList: res.reply.sgModuleConfigApproveShows,
          pagination: page,
          loading: false
        },
        () => {
          // console.log(this.state)
        }
      );
    });
  };
  fetchSubModuleData = () => {
    this.setState({ loading: true });
    const { moduleCode, paginationSub } = this.state;
    let data = {
      pageNo: paginationSub.current,
      recordsPerPage: paginationSub.pageSize,
      // subModuleCode: filterValue.subModuleCode,
      // subModuleName: filterValue.subModuleName,
      moduleCode: moduleCode
    };
    querySgSubmoduleConfigApproveList(data).then(res => {
      let page = Object.assign({}, this.state.paginationSub, {
        total: res.reply.page.total
      });
      this.setState(
        {
          subModuleCodeList: res.reply.sgSubmoduleConfigShowList,
          paginationSub: page,
          loading: false
        },
        () => {
          // console.log(this.state)
        }
      );
    });
  };
  pageChange = pager => {
    let page = Object.assign({}, this.state.pagination, {
      current: pager.current
    });
    this.setState(
      {
        pagination: page
      },
      () => {
        this.fetchModuleData();
      }
    );
  };
  pageSubChange = pager => {
    let page = Object.assign({}, this.state.paginationSub, {
      current: pager.current
    });
    this.setState(
      {
        paginationSub: page
      },
      () => {
        this.fetchSubModuleData();
      }
    );
  };
  //选择模块
  onModuleSelectChange = (selectedRowKeys, selectedRows) => {
    const { isUser } = this.state;
    if(isUser){
      this.props.form.setFieldsValue({
        createUserId: selectedRows[0].moduleCode
      });
    } else {
      this.setState({
        moduleCode: selectedRows[0].moduleCode,
        submoduleId: ""
      });
      this.props.form.setFieldsValue({
        moduleCode: selectedRows[0].moduleCode,
        submoduleId: ""
      });
    }
    this.handleCancel();
  };
  //选择服务单元
  onSubModuleSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      subModuleCode: selectedRows[0].subModuleCode,
      moduleCode: selectedRows[0].moduleCode
    });
    this.props.form.setFieldsValue({
      moduleCode: selectedRows[0].moduleCode,
      submoduleId: selectedRows[0].subModuleCode
    });
    this.handleCancel();
  };
  //展示服务单元列表
  subModuleShow = () => {
    this.setState({
      visibleSub: true
    });
    this.fetchSubModuleData();
  };
  handleCancel = () => {
    let page = Object.assign({}, this.state.paginationSub, {
      current: 1
    });
    this.setState({
      paginationSub: page,
      visibleSub: false,
      visible: false
    });
  };
  //提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (!err) {
        let data = {
          weight: values.weight ? values.weight.toString() : ""
        };
        let param = {
          sgServerConfigApproveList: [
            {
              ...values,
              serviceContext: JSON.stringify(data)
            }
          ]
        };
        createRegisterNodeList(param).then(res => {
          if (res.reply.returnCode.type === "S") {
            message.info("注册节点创建成功！");
            this.toBack();
          }
        });
      }
    });
  };
  //跳回主页面列表
  toBack = () => {
    let path = {
      pathname: "/approve/registeredNodesManage/index"
    };
    goToAndClose(path,"注册节点查询");
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    const { getFieldDecorator } = this.props.form;
    const {
      moduleCodeList,
      subModuleCodeList,
      loading,
      columnsModule,
      columnSubModule,
      ldclist,
      pagination,
      paginationSub,
      visible,
      visibleSub
    } = this.state;
    const moduleRowSelection = {
      type: "radio",
      onChange: this.onModuleSelectChange
    };
    const subModuleRowSelection = {
      type: "radio",
      onChange: this.onSubModuleSelectChange
    };

    return (
      <div>
        <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
          <TabPane tab="创建注册节点" key="1">
            <div className="portlet-body">
              <Form>
                <Row type="flex">
                  <Col span={10}>
                    <FormItem {...formItemLayout} label="模块编码">
                      {getFieldDecorator("moduleCode", {
                        rules: [{ required: true, message: "请选择模块编码" }]
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span={2}>
                    <Button
                      onClick={() => this.setState({ visible: true, isUser: false })}
                      type="dashed"
                      size="small"
                      icon="search"
                    />
                  </Col>

                  <Col span={10}>
                    <FormItem {...formItemLayout} label="服务单元编码">
                      {getFieldDecorator("submoduleId", {
                        rules: [{ required: true, message: "请选择服务单元编码" }]
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span={2}>
                    <Button
                      onClick={this.subModuleShow}
                      type="dashed"
                      size="small"
                      icon="search"
                    />
                  </Col>
                </Row>
                {/* 服务单元 */}
                <Modal
                  title="选择服务单元"
                  visible={visibleSub}
                  onCancel={this.handleCancel}
                  footer={null}
                >
                  <Table
                    rowSelection={subModuleRowSelection}
                    loading={loading}
                    dataSource={subModuleCodeList}
                    columns={columnSubModule}
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                    pagination={paginationSub}
                    onChange={this.pageSubChange}
                    rowKey={record => record.id}
                  />
                </Modal>
                {/*模块 */}
                <div className="">
                  <Modal
                    title="选择模块"
                    visible={visible}
                    onCancel={this.handleCancel}
                    footer={null}
                  >
                    <div
                      style={{
                        display: "flex",
                        margin: "10px 0",
                        alignItems: "center"
                      }}
                    >
                      <Input
                        placeholder="模块编码"
                        style={{}}
                        onChange={e => {
                          this.setState({ quModuleCode: e.target.value });
                        }}
                      />

                      <Input
                        placeholder="模块名称"
                        style={{ margin: "0 10px" }}
                        onChange={e => {
                          this.setState({ quModuleName: e.target.value });
                        }}
                      />
                      <Button
                        onClick={this.fetchData}
                        type="primary"
                        size="large"
                        style={{}}
                      >
                        搜索
                      </Button>
                    </div>
                    <Table
                      rowSelection={moduleRowSelection}
                      loading={loading}
                      dataSource={moduleCodeList}
                      columns={columnsModule}
                      style={{ paddingLeft: 10, paddingRight: 10 }}
                      pagination={pagination}
                      onChange={this.pageChange}
                      rowKey={record => record.id}
                    />
                  </Modal>
                </div>

                <Row>
                  <Col span={10} style={{ display: "block" }}>
                    <FormItem
                      {...formItemLayout}
                      label="所属ldcId"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 18 }}
                    >
                      {getFieldDecorator("ldcId", {
                        rules: [{ required: true, message: "请选择ldcId" }]
                      })(
                        <Select>
                          {this.state.ldclist.map(item => {
                            return (
                              <Select.Option
                                key={item.ldcId}
                                value={item.ldcId}
                              >
                                {`${item.ldcName}(${item.ldcId})`}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={10} offset={2} style={{ display: "block" }}>
                    <FormItem
                      {...formItemLayout}
                      label="服务协议"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 18 }}
                    >
                      {getFieldDecorator("serviceSocket", {
                        rules: [{ required: true, message: "请选择服务协议" }]
                      })(
                        <AutoComplete onChange={this.change4}>
                          {SERVICEP_PROTOCOL.map(item => (
                            <AutoComplete.Option value={item} key={item}>
                              {item}
                            </AutoComplete.Option>
                          ))}
                        </AutoComplete>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={10} style={{ display: "block" }}>
                    <FormItem
                      {...formItemLayout}
                      label="节点地址及端口"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 18 }}
                    >
                      {getFieldDecorator("serviceAddress", {
                        rules: [
                          { required: true, message: "请输入节点地址及端口" }
                        ]
                      })(<Input placeholder="示例:127.0.0.1:8080" />)}
                    </FormItem>
                  </Col>
                  <Col span={10} offset={2} style={{ display: "block" }}>
                    <FormItem
                      {...formItemLayout}
                      label="节点权重"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 18 }}
                    >
                      {getFieldDecorator("weight", {})(
                        <InputNumber
                          min={0}
                          max={99}
                          precision={0}
                          placeholder="0-99的整数"
                        />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row type="flex">
                  <Col span={10}>
                    <FormItem {...formItemLayout} label="最后参数维护人">
                      {getFieldDecorator("createUserId", {
                        // rules: [{ required: true, message: "请选择最后参数维护人" }]
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span={2}>
                    <Button
                      onClick={() => this.setState({ visible: true, isUser: true })}
                      type="dashed"
                      size="small"
                      icon="search"
                    />
                  </Col>
                </Row>
                <Row type="flex" justify="center">
                  <Col span={24}>
                    <Button
                      size="large"
                      type="primary"
                      onClick={this.handleSubmit}
                    >
                      提交
                    </Button>
                    <Button
                      size="large"
                      style={{ marginLeft: 10 }}
                      onClick={this.toBack}
                    >
                      取消
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default Form.create()(GlobalRoutingRegisteredNodesCreate);
