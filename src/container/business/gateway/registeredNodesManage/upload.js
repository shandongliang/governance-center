import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import {
  Breadcrumb,
  Icon,
  DatePicker,
  Button,
  TimePicker,
  Select,
  InputNumber,
  Checkbox,
  Upload,
  Modal,
  Tabs,
  Tooltip
} from "antd";
import { Form, Row, Col, Input, Table, Spin } from "antd";
import { randomNamber } from "./../../../../util/publicFuc";
import $fetch from "$fetch";
import { $uploadfile } from "$fetch";
import UploadIE from "../../../../component/upload-ie/index";
import "jqueryForm";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
// import './../../../common/style/index.less';
import "./upload.less";
const FormItem = Form.Item;

export default class ModuleUpload extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  render() {
    return (
      <div className="homepage">
        <div className="textbox">
          <WrapperFileUpload />
        </div>
      </div>
    );
  }
}
class moduleConfigv1Upload extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      uploading: false,
      flag: false,
      modalTitle: "错误列表",
      errorData: [],
      visible: false,
      pagination: {
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
        total: 0
      },
      columns: [
        {
          title: "服务单元编号",
          dataIndex: "submoduleId",
          width: 90,
          align: "center",
          key: "submoduleId"
        },
        {
          title: "所属ldcId",
          dataIndex: "ldcId",
          key: "ldcId",
          width: 100
        },
        {
          title: "节点地址及端口",
          dataIndex: "serviceAddress",
          width: 120,
          align: "center",
          key: "serviceAddress"
        },
        {
          title: "错误数据",
          dataIndex: "errorData",
          width: 150,
          align: "center",
          // key: "errorData",
          render: (text, record, index) => {
            if (text) {
              if (text.length > 20) {
                return (
                  <Tooltip title={text}>
                    <span>{text.substring(0, 20) + "..."}</span>
                  </Tooltip>
                );
              } else {
                return <span>{text}</span>;
              }
            } else {
              <span>{""}</span>;
            }
          }
        }
      ]
    };
  }

  displayField = (displayType, name, valueRange) => {
    switch (displayType) {
      case "TEXT": {
        return <Input style={{ width: 200 }} />;
      }
      case "TEXTAREA": {
        return <Input type="textarea" style={{ width: 500, height: 65 }} />;
      }
      case "UPLOAD": {
        return (
          <Upload>
            <Button type="ghost">
              <Icon type="upload" /> Upload
            </Button>
          </Upload>
        );
      }
    }
  };
  toManage = () => {
    let path = {
      pathname: '/gateway/registeredNodesManage/index'
  }
  goToAndClose(path,"注册节点查询");
  };

  /*  IE上传逻辑，使用jquery-form插件实现 ，支持IE9+  */
  uploadIE = (param, type) => {
    let reqSeqNo = randomNamber();
    const _this = this;
    let store = sessionStorage.getItem("$pandora_auth.user_info");
    let userId = JSON.parse(store).userId;
    if (JSON.stringify(fileList) == "[]") {
      this.setState({
        flag: true
      });
      return false;
    }
    let option = {
      url: "/tesla-gateway-console-app/sg/importServerConfigV1",
      type: "POST",
      data: { ...param, reqSeqNo: reqSeqNo, updUserName: userId, type: type },
      dataType: "json",
      header: {},
      success: function(data) {
        let titleType = type==="0"?"导入":"删除"
        if (res.reply.returnCode.type === "S") {
          if (res.reply.error > 0) {
            let errorData = res.reply.errorList.map(item => {
              return {
                ...item.serverConfig,
                errorData: item.errorData
              };
            });
            let page = Object.assign({}, this.state.pagination, {
              total: res.reply.error
            });
            _this.setState({
              modalTitle:
                "成功" + titleType +
                (res.reply.total - res.reply.error) +
                "条，" +
                "失败" +
                res.reply.error +
                "条，失败原因如下：",
              errorData,
              visible: true,
              pagination: page
            });
          } else {
            Modal.success({
              title: "成功" + titleType + res.reply.total + "条"
            });
          }
          // 清空表单域
          _this.handleResetForm();
          $(".file-list").empty();
          $(".input-container .selected").remove();
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        Modal.warning({
          title: errorThrown
        });
      },
      /*
            广播上传进度：
            实时更新上传进度，部分浏览器可能不支持
            参数：
            1) event (the browser event)
            2) position (integer)
            3) total (integer)
            4) percentComplete (integer)
            */
      uploadProgress: function(event, position, total, percentComplete) {
        if (percentComplete == 100) {
          _this.setState({
            uploading: false,
            flag: false
          });
        } else {
          _this.setState({
            uploading: true,
            flag: false
          });
        }
      }

      // 成功提交表单后清空所有表单域,默认值：null
      // clearForm: true,

      // 成功提交表单后重置表单,默认值：null
      // resetForm: true,
    };
    $("#formId").ajaxSubmit(option);
    return false;
  };

  /* 重置表单 */
  handleResetForm = () => {
    this.props.form.resetFields();
  };

  /*  chrome上传逻辑，使用ant-design的Upload组件实现  ，不兼容IE */
  uploadAntd = (param, type) => {
    const formData = new FormData();
    const { fileList } = this.state;
    if (JSON.stringify(fileList) == "[]") {
      this.setState({
        flag: true
      });
      return false;
    }
    const _this = this;
    let reqSeqNo = randomNamber();
    let store = sessionStorage.getItem("$pandora_auth.user_info");
    let userId = JSON.parse(store).userId;
    // 遍历文件列表，并将其存放到FormData对象中，通过FormData对象向后台传递文件流
    fileList.forEach(file => {
      formData.append("serverNodes", file);
      formData.append("reqSeqNo", reqSeqNo);
      formData.append("updUserName", userId);
      formData.append("type", type);
    });

    for (let key in param) {
      formData.append(key, param[key]);
    }
    this.setState({ uploading: true });

    console.log("formData", formData);

    $uploadfile({
      url: "/tesla-gateway-console-app/sg/importServerConfigV1",
      data: formData
    }).then(
      res => {
        let titleType = type==="0"?"导入":"删除"
        if (res.reply.returnCode.type === "S") {
          if (res.reply.error > 0) {
            let errorData = res.reply.errorList.map(item => {
              return {
                ...item.serverConfig,
                errorData: item.errorData
              };
            });
            let page = Object.assign({}, this.state.pagination, {
              total: res.reply.error
            }); 
            _this.setState({
              modalTitle:
                "成功" + titleType +
                (res.reply.total - res.reply.error) +
                "条，" +
                "失败" +
                res.reply.error +
                "条，失败原因如下：",
              errorData,
              visible: true,
              pagination: page
            });
          } else {
            Modal.success({
              title: "成功" + titleType + res.reply.total + "条"
            });
          }
          // 清空表单域
          _this.handleResetForm();
          _this.setState({
            fileList: [],
            uploading: false,
            flag: false
          });
        }
      },
      res => {
        _this.setState({
          uploading: false,
          flag: false
        });
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        let param = this.state.fileList;
        let type = values.type;
        // 在提交表单的过程中，判断浏览器是否支持FormData对象，如果支持则调用Antd的文件上传逻辑，否则调用IE的文件上传逻辑
        if (!window.FormData) {
          this.uploadIE(param, type);
        } else {
          this.uploadAntd(param, type);
        }
      }
    });
  };
  handleChange = info => {
    let fileList = info.fileList;
    console.log(111, fileList);
    this.setState({
      fileList: fileList.slice(-1)
    });
  };
  closeModal = () => {
    this.setState({
        visible: false,
        errorData: [],
        pagination: {
          showQuickJumper: true,
          pageSize: 10,
          current: 1,
          total: 0
        }
    })
  }

  tableChangeHandle = pagination => {
    let page = Object.assign({}, this.state.pagination, {
      current: pagination.current
    });
    this.setState({
      pagination: page
    });
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const { getFieldDecorator } = this.props.form;
    const props = {
      action: "/tmpl/wenjiansc.upload",
      // onChange: this.handleChange,
      onRemove: file => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        console.log("file", file);
        // this.setState(({ fileList }) => ({
        //     fileList: [...fileList, file],
        //     flag: false
        // }));
        this.setState({
          fileList: [file],
          flag: false
        });

        return false; // 手动上传文件
      },

      fileList: this.state.fileList
    };
    // const props = {
    //     className: 'importSvcExcel',
    //     onStart: this.handleChange,
    // }
    return (
      // 必须为表单设置encType="multipart/form-data"、id属性
      <div className="serviceUpload">
        <Modal
          title={this.state.modalTitle}
          visible={this.state.visible}
          onCancel={this.closeModal}
          onOk={this.closeModal}
          footer={null}
          style={{ padding: "20px 0" }}
        >
          <Table
            columns={this.state.columns}
            dataSource={this.state.errorData}
            pagination={this.state.pagination}
            style={{ padding: 10 }}
            rowKey={record =>
              record.submoduleId +
              record.serviceContext 
            }
            onChange={this.tableChangeHandle}
          />
        </Modal>
        <Form
          onSubmit={this.handleSubmit}
          encType="multipart/form-data"
          id="formId"
        >
          <Spin spinning={this.state.uploading}>
            <Row>
              <Col span={10} offset={1}>
                <FormItem {...formItemLayout} label="导入类型">
                  {getFieldDecorator("type", {
                    initialValue: "0"
                  })(
                    <Select>
                      <Select.Option value="0">新增</Select.Option>
                      <Select.Option value="1">删除</Select.Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={10} offset={1}>
                {window.FormData ? (
                  <FormItem
                    className="file-upload"
                    {...formItemLayout}
                    label="服务节点文件上传"
                  >
                    <Upload
                      name="logo"
                      {...props}
                      listType="text"
                      fileList={this.state.fileList}
                    >
                      <Button>
                        <Icon type="upload" />
                        选择文件
                      </Button>
                    </Upload>
                    <div
                      style={{
                        display: this.state.flag ? "block" : "none",
                        color: "red"
                      }}
                    >
                      请选择要上传的文件
                    </div>
                  </FormItem>
                ) : (
                  <FormItem
                    className="file-upload"
                    {...formItemLayout}
                    label="模块配置文件上传"
                  >
                    <UploadIE />
                    <div
                      style={{
                        display: this.state.flag ? "block" : "none",
                        color: "red"
                      }}
                    >
                      请选择要上传的文件
                    </div>
                  </FormItem>
                )}
              </Col>
            </Row>
          </Spin>

          <Row>
            <FormItem wrappercol={{ span: 5, offset: 10 }}>
              <Button
                htmlType="submit"
                className="subBtn operatorBtn"
                style={{
                  marginLeft: "50%",
                  width: 88,
                  fontSize: 16,
                  borderRadius: 5
                }}
              >
                提交
              </Button>
              <Button
                onClick={this.toManage}
                className="cancelBtn"
                style={{
                  marginLeft: 10,
                  width: 88,
                  fontSize: 16,
                  borderRadius: 5
                }}
              >
                取消
              </Button>
            </FormItem>
          </Row>
        </Form>
      </div>
    );
  }
}
const WrapperFileUpload = Form.create()(moduleConfigv1Upload);
