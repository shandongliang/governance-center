import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Form, Input, Row, Col, Table, Tabs, Button, Icon, Select, Modal, Popconfirm, Message, InputNumber, AutoComplete } from 'antd';
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import $fetch from '$fetch';
import { randomNamber } from './../../../../util/publicFuc';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class GlobalRoutingShardRoutingEdit extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            ldclist: [],
        }
    }
    componentWillMount() {
        //记录操作人ID
        let store = sessionStorage.getItem('$pandora_auth.user_info');
        let userId = JSON.parse(store).userId;

        this.setState({
            userId: userId
        })
    }
    componentDidMount() {
        $fetch({
            url: '/tesla-gateway-console-app/sg/queryLdcConfig',
            data: {

            }
        }).then((res) => {
            if (res.reply.returnCode.type == "S") {
                let arr = res.reply.result
                let ldclist = arr.map((item) => {
                    return item.ldcId
                })

                this.setState({
                    ldclist: ldclist
                })

            }


        })
        if (this.props.location.state) {
            const { record } = this.props.location.state;
            const { moduleCode, submoduleId, ldcId, serviceSocket, serviceAddress, serviceContext, status } = record
            let weight = JSON.parse(serviceContext).weight || ''
            // let status = JSON.parse(serviceContext).status || ''
            this.props.form.setFieldsValue({
                byModuleCode: moduleCode,
                bySubModuleCode: submoduleId,
                ldcId: ldcId,
                serviceSocket: serviceSocket,
                serviceAddress: serviceAddress,
                serviceContext: serviceContext,
                weight: weight,
                status: status ? status : "Y"
            })
        }
    }

    //提交

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    moduleCode: values.byModuleCode,
                    submoduleId: values.bySubModuleCode,
                })
                let mapJson = JSON.parse(values.serviceContext)
                mapJson = {
                    ...mapJson,
                    // status: values.status,
                    weight: values.weight.toString()
                }
                console.log(mapJson)
                let mapString = JSON.stringify(mapJson)
                let data = {
                    serverConfig:{
                        moduleCode: values.byModuleCode,
                        submoduleId: values.bySubModuleCode,
                        ldcId: values.ldcId,
                        serviceSocket: values.serviceSocket,
                        serviceAddress: values.serviceAddress,
                        status: values.status,
                        serviceContext: mapString
                    }
                }

                $fetch({
                    url: "/tesla-gateway-console-app/sg/updateServerConfig",
                    data: data
                }).then((res) => {
                    if (res.reply.returnCode.type == "S") {
                        Modal.success({
                            title: "编辑信息",
                            content: (
                                <div>
                                    编辑成功
                               </div>
                            ),
                            onOk: () => {
                                this.toIndex()
                            },
                        });
                    }
                })
            }
        })
    }
    //跳回主页面列表
    toIndex = () => {
      let path = {
        pathname: '/gateway/registeredNodesManage/index'
    }
    goToAndClose(path,"注册节点查询");
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        const { getFieldDecorator } = this.props.form;
        return <div>
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
                <TabPane tab="服务节点详情" key="1">
                    <div className="portlet-body">
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                {/* <Col span={10} offset={1} style={{ display: 'block' }}>
                                    <FormItem {...formItemLayout} label='所属模块编号'
                                        labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                                        {getFieldDecorator('byModuleCode', {
                                            initialValue: this.state.byModuleCode,

                                            rules: [
                                                { required: true, message: '请选择所属模块编号' }
                                            ]
                                        })(

                                            <Input disabled style={{ width: 120 }} />
                                            )}
                                        <Button onClick={this.toFunction2} type="dashed" size="small" style={{ marginLeft: 20, width: 40 }} disabled>
                                            <span><Icon type="search"></Icon>
                                               
                                            </span>
                                        </Button>
                                    </FormItem>

                                </Col> */}

                                <Col span={10} offset={1} style={{ display: 'block' }}>
                                    <FormItem {...formItemLayout} label='所属服务单元编号'
                                        labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                                        {getFieldDecorator('bySubModuleCode', {
                                            initialValue: this.state.bySubModuleCode,

                                            rules: [
                                                { required: true, message: '请选择所属服务单元编号' }
                                            ]
                                        })(

                                            <Input disabled style={{ width: 120 }} />
                                            )}
                                        <Button onClick={this.toFunction1} type="dashed" size="small" style={{ marginLeft: 20, width: 40 }} disabled>
                                            <span><Icon type="search"></Icon>
                                                {/* {this.state.bySubModuleCode}  */}
                                            </span>
                                        </Button>
                                    </FormItem>

                                </Col>


                            </Row>
                            <Row>
                                <Col span={10} offset={1} style={{ display: 'block' }}>
                                    <FormItem {...formItemLayout} label='所属ldcId'
                                        labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                                        {getFieldDecorator('ldcId', {
                                            rules: [
                                                { required: true, message: '请选择ldcId' }
                                            ]
                                        })(
                                            <Select style={{ width: 220 }} disabled >
                                                {
                                                    this.state.ldclist.map((item, ins) => {
                                                        return <Select.Option key={ins} value={item}>{item}</Select.Option>
                                                    })
                                                }
                                            </Select>
                                            )}
                                    </FormItem>
                                </Col>
                                {/* <Col span={10} offset={1} style={{ display: 'block' }}>
                                    <FormItem {...formItemLayout} label='版本号'
                                        labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                                        {getFieldDecorator('version', {
                                            rules: [
                                                { message: '请输入版本号' }
                                            ]
                                        })(
                                            <Input style={{ width: 220 }} />
                                            )}
                                    </FormItem>
                                </Col> */}
                                <Col span={10} offset={1} style={{ display: 'block' }}>
                                    <FormItem {...formItemLayout} label='服务协议'
                                        labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                                        {getFieldDecorator('serviceSocket', {
                                            rules: [
                                                { required: true, message: '请选择服务协议' }
                                            ]
                                        })(
                                            <AutoComplete style={{ width: 220 }} onChange={this.change4} disabled>
                                                <AutoComplete.Option value='http'>http</AutoComplete.Option>
                                                <AutoComplete.Option value='https'>https</AutoComplete.Option>
                                                <AutoComplete.Option value='socket'>socket</AutoComplete.Option>
                                                <AutoComplete.Option value='webservice'>webservice</AutoComplete.Option>
                                                <AutoComplete.Option value='fix'>fix</AutoComplete.Option>
                                                <AutoComplete.Option value='tcp'>tcp</AutoComplete.Option>
                                                <AutoComplete.Option value='eusp'>eusp</AutoComplete.Option>
                                                <AutoComplete.Option value='dubbo-dubbo'>dubbo-dubbo</AutoComplete.Option>
                                                <AutoComplete.Option value='dubbo-http'>dubbo-http</AutoComplete.Option>
                                                <AutoComplete.Option value='dubbo-rest'>dubbo-rest</AutoComplete.Option>
                                                <AutoComplete.Option value='dubbo-webservice'>dubbo-webservice</AutoComplete.Option>
                                                <AutoComplete.Option value='dubbo-json'>dubbo-json</AutoComplete.Option>  
                                            </AutoComplete>
                                            )}
                                    </FormItem>
                                </Col>

                            </Row>
                            <Row>

                                <Col span={10} offset={1} style={{ display: 'block' }}>
                                    <FormItem {...formItemLayout} label='节点地址及端口'
                                        labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                                        {getFieldDecorator('serviceAddress', {
                                            rules: [
                                                { required: true, message: '请输入节点地址及端口' }
                                            ]
                                        })(
                                            <Input placeholder="示例:127.0.0.1:8080"  style={{ width: 220 }} disabled />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10} offset={1} style={{ display: 'block' }}>
                                    <FormItem {...formItemLayout} label='节点内容'
                                        labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                                        {getFieldDecorator('serviceContext', {
                                            rules: [
                                                { message: '请输入节点内容' }
                                            ]
                                        })(
                                            <Input style={{ width: 220 }} disabled />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10} offset={1} style={{ display: 'block' }}>
                                    <FormItem {...formItemLayout} label='服务权重'
                                        labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                                        {getFieldDecorator('weight', {
                                            
                                        })(
                                          <InputNumber min={0} max={99} precision={0} style={{ width: 220 }} placeholder="0-99的整数" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={10} offset={1} style={{ display: 'block' }}>
                                    <FormItem {...formItemLayout} label='状态'
                                        labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                                        {getFieldDecorator('status', {
                                            rules: [
                                                { required: true, message: '请选择状态' }
                                            ]
                                        })(
                                            <Select style={{ width: 220 }}>
                                                <Option value='Y' key={0}>有效</Option>
                                                <Option value='N' key={1}>失效</Option>
                                            </Select>
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>


                            <Row type="flex" style={{ marginTop: 40 }}>
                                <FormItem wrappercol={{ span: 19, offset: 5 }}>
                                    {/* <Button htmlType="submit" type="primary" className="subBtn" className="operatorBtn" style={{ marginLeft: 50, width: 88, fontSize: 16, borderRadius: 5 }}>提交</Button>
                                    <Button onClick={this.toIndex} className="cancelBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>返回</Button> */}
                                    <Button htmlType="submit" type="primary" className="subBtn" className="operatorBtn" style={{ marginLeft: 50, width: 88, fontSize: 16, borderRadius: 5 }}>提交</Button>
                                    <Button onClick={this.toIndex} type="primary" className="subBtn" className="operatorBtn" style={{ marginLeft: 50, width: 88, fontSize: 16, borderRadius: 5 }}>返回</Button>
                                </FormItem>
                            </Row>
                        </Form>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    }
}
export default Form.create()(GlobalRoutingShardRoutingEdit);