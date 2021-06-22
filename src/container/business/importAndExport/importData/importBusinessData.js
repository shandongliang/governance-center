import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import {
  Icon,
  Button,
  Select,
  Upload,
  Modal,
  Tabs,
  Form,
  Row,
  Col,
  Input,
  Table,
  Spin
} from "antd";
import { $uploadfile } from "$fetch";
import UploadIE from "../../../../component/upload-ie/index";
import "jqueryForm";
import "./index.less";
const FormItem = Form.Item;

export default class Uploads extends Component {
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
class UploadFileUpload extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      uploading: false,
      flag: false
    };
  }

  /*  IE上传逻辑，使用jquery-form插件实现 ，支持IE9+  */
  uploadIE = (param, values) => {
    const _this = this;
    let val = values.type;
    if (JSON.stringify(fileList) == "[]") {
      this.setState({
        flag: true
      });
      return false;
    }
    let option = {
      url: "/tesla-gateway-console-app/commonConfig/importConfigTxtByType",
      type: "POST",
      data: { ...param, val },
      dataType: "json",
      header: {},
      success: function(data) {
        let returnType = data.reply.returnCode.type;
        let code = data.reply.returnCode.code;
        let message = data.reply.returnCode.message;
        let errorMsg = returnType + ":" + code + ":" + message;
        if (returnType == "S") {
          // 清空： 文件列表 、所有已经点选过的type=file的input
          $(".file-list").empty();
          $(".input-container .selected").remove();
          // 清空表单域
          _this.handleResetForm();
          Modal.success({
            title: "上传成功！"
          });
        }
        if (returnType == "E") {
          Modal.info({
            title: data.reply.Result.result
          });
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
  uploadAntd = (param, values) => {
    const formData = new FormData();
    const { fileList } = this.state;
    if (JSON.stringify(fileList) == "[]") {
      this.setState({
        flag: true
      });
      return false;
    }
    const _this = this;
    let val = values;
    let store = sessionStorage.getItem("$pandora_auth.user_info");
    let userId = JSON.parse(store).userId;
    // 遍历文件列表，并将其存放到FormData对象中，通过FormData对象向后台传递文件流
    fileList.forEach(file => {
      console.log(file)
      formData.append("importTxt", file);
      formData.append("userId", userId);
      formData.append("importType", val.type);
    });

    for (let key in param) {
      formData.append(key, param[key]);
    }
    this.setState({ uploading: true });
    $uploadfile({
      url: "/tesla-gateway-console-app/commonConfig/importConfigTxtByType",
      data: formData
    }).then(
      res => {
        if (res.reply.returnCode.type === "S") {
          Modal.info({
            title: res.reply.Result.result
          });
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
        let param = this.state.filtList;
        // 在提交表单的过程中，判断浏览器是否支持FormData对象，如果支持则调用Antd的文件上传逻辑，否则调用IE的文件上传逻辑
        if (!window.FormData) {
          this.uploadIE(param, values);
        } else {
          this.uploadAntd(param, values);
        }
      }
    });
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 }
    };
    const { getFieldDecorator } = this.props.form;
    const props = {
      action: "/tmpl/wenjiansc.upload",
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
        //console.log('file', file)
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
          flag: false
        }));
        return false; // 手动上传文件
      },
      fileList: this.state.fileList
    };
    return (
      // 必须为表单设置encType="multipart/form-data"、id属性
      <div className="uploadForm">
        <Form
          onSubmit={this.handleSubmit}
          encType="multipart/form-data"
          id="formId"
        >
          <Spin spinning={this.state.uploading}>
            <Row style={{ marginLeft: 20 }}>
              <Col span={20} offset={1} style={{ display: "block" }}>
                {window.FormData ? (
                  <div>
                    <FormItem
                      hasFeedback
                      {...formItemLayout}
                      label="请选择类型："
                    >
                      {getFieldDecorator("type", {
                        initialValue: "",
                        rules: [{ required: true, message: "请选择类型" }]
                      })(
                        <Select>
                          <Option value="MODULESERVICE">模块</Option>
                          <Option value="SERVICEUNIT">服务单元</Option>
                          <Option value="SERVICE">服务</Option>
                          <Option value="TOPIC">主题</Option>
                          <Option value="PRODUCER">生产者</Option>
                          <Option value="CONSUMER">消费者</Option>
                          <Option value="TOPIC_RELATION">主题生产者</Option>
                          <Option value="SUBSCRIBE_RELATION">消费者订阅关系</Option>
                          <Option value="ZKDATA">配置数据导入</Option>
                        </Select>
                      )}
                    </FormItem>
                    <FormItem
                      className="file-upload"
                      {...formItemLayout}
                      label="文件上传"
                    >
                      <Upload name="logo" {...props} listType="text">
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
                  </div>
                ) : (
                  <div>
                    <FormItem
                      hasFeedback
                      {...formItemLayout}
                      label="请选择类型："
                    >
                      {getFieldDecorator("type", {
                        initialValue: "",
                        rules: [{ required: true, message: "请选择类型" }]
                      })(
                        <Select>
                          <Option value="MODULESERVICE">模块</Option>
                          <Option value="SERVICEUNIT">服务单元</Option>
                          <Option value="SERVICE">服务</Option>
                          <Option value="TOPIC">主题</Option>
                          <Option value="PRODUCER">生产者</Option>
                          <Option value="CONSUMER">消费者</Option>
                          <Option value="TOPIC_RELATION">主题生产者</Option>
                          <Option value="SUBSCRIBE_RELATION">消费者订阅关系</Option>
                        </Select>
                      )}
                    </FormItem>
                    <FormItem
                      className="file-upload"
                      {...formItemLayout}
                      label="文件上传"
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
                  </div>
                )}
              </Col>
            </Row>
          </Spin>
          <Row>
            <FormItem wrappercol={{ span: 5, offset: 10 }}>
              <Button
                htmlType="submit"
                className="subBtn operatorBtn"
                type="primary"
                style={{
                  marginLeft: "50%",
                  width: 88,
                  fontSize: 16,
                  borderRadius: 5
                }}
              >
                提交
              </Button>
              
            </FormItem>
          </Row>
        </Form>
      </div>
    );
  }
}
const WrapperFileUpload = Form.create()(UploadFileUpload);
