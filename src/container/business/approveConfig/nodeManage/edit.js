import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Form,
  Tabs,
  Input,
  Select,
  Button,
  message,
  InputNumber
} from "antd";
import {
  queryRegisterNodeDetail,
  updateRegisterNode,
  selectLdc
} from "../requestA/service";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class ExcelDetail extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataDetail: {},
      ldclist: []
    };
  }

  componentDidMount() {
    const { nodeManageId } = this.props.location.state;
    this.queryDetail(nodeManageId);
  }
  // 查询ldcId
  queryLdcId = () => {
    selectLdc().then(res => {
      let ldclist = arr.map(item => {
        return item.ldcId;
      });
      this.setState({
        ldclist: ldclist
      });
    });
  };
  // 根据id查详情
  queryDetail = id => {
    let data = {
      id: id
    };
    queryRegisterNodeDetail(data).then(res => {
      let dataDetail = res.reply.sgServerConfigApprove;
      this.setState({
        dataDetail
      });
    });
  };
  // 提交修改
  submitEdit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let data = {
        sgServerConfigApproveList: [
          {
            ...values,
            id: this.state.dataDetail.id
          }
        ],
        flag: "1"
      };
      updateRegisterNode(data).then(res => {
        if (res.reply.returnCode.code === "AAAAAA") {
          message.info("修改成功");
          this.toBack();
        }
      });
    });
  };
  // 返回列表页
  toBack = () => {
    let path = {
      pathname: "/approve/registeredNodesManage/index"
    };
    goToAndClose(path,"注册节点查询");
  };
  render() {
    const { dataDetail } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="pandora-main-content">
          <div className="portlet-tab">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="注册节点编辑" key="1">
                <Form>
                  <Row>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label="服务单元编码">
                        {getFieldDecorator("submoduleId", {
                          initialValue: dataDetail.submoduleId,
                          rules: [{ required: true }]
                        })(<Input disabled />)}
                      </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label="所属ldcId">
                        {getFieldDecorator("ldcId", {
                          initialValue: dataDetail.ldcId,
                          rules: [{ required: true }]
                        })(
                          <Select disabled>
                            {this.state.ldclist.map(item => {
                              return (
                                <Select.Option key={item} value={item}>
                                  {item}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label="服务协议">
                        {getFieldDecorator("serviceSocket", {
                          initialValue: dataDetail.serviceSocket
                        })(
                          <Select disabled>
                            <Select.Option value="http">http</Select.Option>
                            <Select.Option value="https">https</Select.Option>
                            <Select.Option value="socket">socket</Select.Option>
                            <Select.Option value="webservice">
                              webservice
                            </Select.Option>
                            <Select.Option value="fix">fix</Select.Option>
                            <Select.Option value="tcp">tcp</Select.Option>
                            <Select.Option value="eusp">eusp</Select.Option>
                            <Select.Option value="dubbo-dubbo">
                              dubbo-dubbo
                            </Select.Option>
                            <Select.Option value="dubbo-http">
                              dubbo-http
                            </Select.Option>
                            <Select.Option value="dubbo-rest">
                              dubbo-rest
                            </Select.Option>
                            <Select.Option value="dubbo-webservice">
                              dubbo-webservice
                            </Select.Option>
                            <Select.Option value="dubbo-json">
                              dubbo-json
                            </Select.Option>
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label="节点地址及端口">
                        {getFieldDecorator("serviceAddress", {
                          initialValue: dataDetail.serviceAddress,
                          rules: [{ required: true }]
                        })(<Input disabled />)}
                      </FormItem>
                    </Col>

                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label="服务权重">
                        {getFieldDecorator("weight", {
                          initialValue: dataDetail.weight
                        })(
                          <InputNumber
                            min={0}
                            max={99}
                            precision={0}
                            placeholder="0-99的整数"
                          />
                        )}
                      </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label="状态">
                        {getFieldDecorator("status", {
                          initialValue: dataDetail.status
                            ? dataDetail.status
                            : "Y",
                          rules: [{ required: true }]
                        })(
                          <Select>
                            <Option value="Y" key={0}>
                              有效
                            </Option>
                            <Option value="N" key={1}>
                              失效
                            </Option>
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label="审核状态">
                        {getFieldDecorator("approveStatus", {
                          initialValue: dataDetail.approveStatus
                        })(
                          <Select disabled>
                            <Select.Option value="00">未审核</Select.Option>
                            <Select.Option value="01">审核通过</Select.Option>
                            <Select.Option value="11">审核未通过</Select.Option>
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label="变更类型">
                        {getFieldDecorator("changeType", {
                          initialValue: dataDetail.changeType,
                          rules: [{ required: true }]
                        })(
                          <Select>
                            <Select.Option key="00" value="00">
                              新增
                            </Select.Option>
                            <Select.Option key="10" value="10">
                              修改
                            </Select.Option>
                            <Select.Option key="01" value="01">
                              删除
                            </Select.Option>
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label="审核意见">
                        {getFieldDecorator("approveText", {
                          initialValue: dataDetail.approveText
                        })(<Input type="textarea" disabled />)}
                      </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label="变更说明">
                        {getFieldDecorator("changeDescribe", {
                          initialValue: dataDetail.changeDescribe,
                          rules: [{ required: true }]
                        })(<Input type="textarea" />)}
                      </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label="节点内容">
                        {getFieldDecorator("serviceContext", {
                          initialValue: dataDetail.serviceContext
                        })(<Input type="textarea" disabled />)}
                      </FormItem>
                    </Col>
                  </Row>
                  <Row type="flex" justify="center">
                    <Col span={24}>
                      <Button
                        size="large"
                        type="primary"
                        onClick={this.submitEdit}
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
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
export default (ExcelDetail = Form.create()(ExcelDetail));
