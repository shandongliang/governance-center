import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Breadcrumb,
  Icon,
  Button,
  Select,
  message,
  Tabs,
  Modal,
  Form,
  Row,
  Col,
  Input,
  DatePicker
} from "antd";
import { querySgModuleCommonConfigApproveList } from "../request/service";
import "./../../../common/style/index.less";
import moment from "moment";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class ModuleManagerApproveCreate extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor() {
    super();
    this.state = {
      moduleDetail: {}
    };
  }
  componentDidMount(){
    const { moduleId } = this.props.location.state
    this.queryModuleDetail(moduleId);
  }
  //返回
  toIndex = () => {
    let path = {
			pathname: '/managerApprove/module/index'
		};
		goToAndClose(path, "模块查询");
  };

  //根据Id查询详情
  queryModuleDetail = moduleId => {
    let data = {
      sgModuleCommonConfigApproveVo: {
        // page: {
        //   doPagination: false
        // },
        moduleId
      }
    };
    querySgModuleCommonConfigApproveList(data).then(res=>{
      if(res.reply.returnCode.type === "S" && res.reply.result.configList.length>0){
        this.setState({
          moduleDetail: res.reply.result.configList[0]
        })
      }
    })
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const { getFieldDecorator } = this.props.form;
    const buttonStyle = {
      marginLeft: 50,
      width: 88,
      fontSize: 16,
      borderRadius: 5
    };
    const { moduleDetail } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="创建模块" key="1">
              <Form>
                <Row style={{ marginTop: 10 }}>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="模块编码">
                      {getFieldDecorator("moduleCode", {
                        initialValue: moduleDetail.moduleCode,
                        rules: [{ required: true, message: "请输入模块编码" }]
                      })(<Input disabled/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="模块名称">
                      {getFieldDecorator("moduleName", {
                        initialValue: moduleDetail.moduleName,
                        rules: [{ required: true, message: "请输入模块名称" }]
                      })(<Input disabled/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="模块状态">
                      {getFieldDecorator("moduleStatus", {
                        initialValue: moduleDetail.moduleStatus,
                        rules: [{ required: true, message: "请选择模块状态" }]
                      })(<Select disabled>
                          <Select.Option value="0">生效</Select.Option>
                          <Select.Option value="1">失效</Select.Option>
                        </Select>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="上线状态">
                      {getFieldDecorator("onlineStatus", {
                        initialValue: moduleDetail.onlineStatus,
                        rules: [{ required: true, message: "请选择上线状态" }]
                      })(<Select disabled>
                          <Select.Option value="0">未上线</Select.Option>
                          <Select.Option value="1">上线中</Select.Option>
                          <Select.Option value="2">已上线</Select.Option>
                        </Select>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="上线日期">
                      {getFieldDecorator("publishDate", {
                        initialValue: moment(moduleDetail.publishDate),
                        rules: [{ required: true, message: "请选择上线日期" }]
                      })(<DatePicker  style={{width: "100%"}} disabled/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="负责人">
                      {getFieldDecorator("leader", {
                        initialValue: moduleDetail.leader,
                        // rules: [{ required: true, message: "请输入负责人" }]
                      })(<Input disabled/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="员工编号">
                      {getFieldDecorator("leaderNo", {
                        initialValue: moduleDetail.leaderNo,
                        // rules: [{ required: true, message: "请输入负责人" }]
                      })(<Input disabled/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="联系方式">
                      {getFieldDecorator("mobile", {
                        initialValue: moduleDetail.mobile,
                        // rules: [{ required: true, message: "请输入联系方式" }]
                      })(<Input disabled/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="修改类型">
                      {getFieldDecorator("changeType", {
                        initialValue: moduleDetail.changeType,
                        rules: [{ required: true, message: "请选择修改类型" }]
                      })(<Select disabled>
                          <Select.Option value="00">增加</Select.Option>
                          <Select.Option value="01">删除</Select.Option>
                          <Select.Option value="10">修改</Select.Option>
                        </Select>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="修改描述">
                      {getFieldDecorator("changeDescribe", {
                        initialValue: moduleDetail.changeDescribe,
                        rules: [{ required: true, message: "请输入修改描述	" }]
                      })(<Input.TextArea disabled/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="功能描述">
                      {getFieldDecorator("functionDescription", {
                        initialValue: moduleDetail.functionDescription,
                        // rules: [{ required: true, message: "请输入描述" }]
                      })(<Input.TextArea disabled />)}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
              <Row type="flex">
                <Button
                  onClick={this.toIndex}
                  className="cancelBtn"
                  style={buttonStyle}
                >
                  取消
                </Button>
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default Form.create()(ModuleManagerApproveCreate);
