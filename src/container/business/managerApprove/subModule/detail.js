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
import { editSgSubmoduleCommonConfigApprove, querySgSubmoduleCommonConfigApproveList } from "../request/service";
import "./../../../common/style/index.less";
import moment from "moment";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class SubModuleManagerApproveDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor() {
    super();
    this.state = {
      subModuleDetail: []
    };
  }
  componentDidMount(){
    const { subModuleId } = this.props.location.state;
    this.querySubModuleDetail(subModuleId);
  }
  //返回
  toIndex = () => {
    let path = {
			pathname: '/managerApprove/subModule/index'
		};
		goToAndClose(path, "服务单元查询");
  };

  //根据Id查询详情
  querySubModuleDetail = subModuleId => {
    let data = {
      sgSubmoduleCommonConfigApproveVo: {
        subModuleId: subModuleId.toString()
      }
    };
    querySgSubmoduleCommonConfigApproveList(data).then(res=>{
      if(res.reply.returnCode.type === "S" && res.reply.result.list.length>0){
        this.setState({
          subModuleDetail: res.reply.result.list[0]
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
    const { subModuleDetail } = this.state;
    return (
      <div className="pandora-main-content">
        <div className="portlet-tab">
          <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
            <TabPane tab="编辑服务单元" key="1">
              <Form>
                <Row style={{ marginTop: 10 }}>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="模块编码">
                      {getFieldDecorator("moduleCode", {
                        initialValue: subModuleDetail.moduleCode,
                        rules: [{ required: true, message: "请选择模块编码" }]
                      })(<Input disabled/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="服务单元编码">
                      {getFieldDecorator("subModuleCode", {
                        initialValue: subModuleDetail.subModuleCode,
                        rules: [{ required: true, message: "请输入服务单元编码" }]
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="服务单元名称">
                      {getFieldDecorator("subModuleName", {
                        initialValue: subModuleDetail.subModuleName,
                        rules: [{ required: true, message: "请输入服务单元名称" }]
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="服务单元状态">
                      {getFieldDecorator("status", {
                        initialValue: subModuleDetail.status,
                        rules: [{ required: true, message: "请选择服务单元状态" }]
                      })(<Select disabled>
                        <Select.Option value="0">生效</Select.Option>
                        <Select.Option value="1">失效</Select.Option>
                      </Select>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="上线状态">
                      {getFieldDecorator("onlineStatus", {
                        initialValue: subModuleDetail.onlineStatus,
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
                        initialValue: moment(subModuleDetail.publishDate),
                        rules: [{ required: true, message: "请选择上线日期" }]
                      })(<DatePicker  style={{width: "100%"}} disabled/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="负责人">
                      {getFieldDecorator("leader", {
                        initialValue: subModuleDetail.leader,
                        // rules: [{ required: true, message: "请输入负责人" }]
                      })(<Input disabled/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="员工编号">
                      {getFieldDecorator("leaderNo", {
                        initialValue: subModuleDetail.leaderNo,
                        // rules: [{ required: true, message: "请输入负责人" }]
                      })(<Input disabled/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="联系方式">
                      {getFieldDecorator("mobile", {
                        initialValue: subModuleDetail.mobile,
                        // rules: [{ required: true, message: "请输入联系方式" }]
                      })(<Input disabled/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="修改类型">
                      {getFieldDecorator("changeType", {
                        initialValue: subModuleDetail.changeType,
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
                        initialValue: subModuleDetail.changeDescribe,
                        rules: [{ required: true, message: "请输入修改描述	" }]
                      })(<Input.TextArea disabled/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="功能描述">
                      {getFieldDecorator("functionDescription", {
                        initialValue: subModuleDetail.functionDescription,
                        // rules: [{ required: true, message: "请输入描述" }]
                      })(<Input.TextArea disabled/>)}
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
export default Form.create()(SubModuleManagerApproveDetail);
