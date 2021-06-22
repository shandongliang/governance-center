import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table, Radio, message } from 'antd';
import $fetch from '$fetch';
import './index.less';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
import { randomNamber } from './../../../../util/publicFuc';



class MessageTopology extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataP: [],
            dataC: [],
            module4Data: [],
            searchType: "p",

            num: "1",
            startValue: null,
            endValue: null,
            endOpen: false,

            totalC: 0,
            paginationP: {
                pageSize: 10,
                // showSizeChanger: true,
                total: 0,
                current: 1
            },
            paginationC: {
                pageSize: 10,
                total: 0,
                // showSizeChanger: true,
                current: 1
            },
            columnsP:
                [
                    {
                        title: '事件标识',
                        dataIndex: 'businesskey',

                        width: 100,
                        render: (text, record, index) => {
                            return (
                                this.state.num == "2" ?
                                    <a href="javascript:;" onClick={this.searchBusinessKey(text, record)}>{text}</a> : <div> {text}
                                    </div>);
                        }
                    },
                    {
                        title: '生产者模块编号',
                        dataIndex: 'moduleId',
                        width: 100,
                    },

                    {
                        title: '生产者服务单元编号',
                        dataIndex: 'submoduleId',
                        width: 150,
                    },

                    {
                        title: '投递主题',
                        dataIndex: 'topicName',
                        width: 100,
                    },

                    {
                        title: '投递状态',
                        dataIndex: 'status',
                        width: 100,
                        render: (text) => {
                            switch (text) {
                                case "00":
                                    return "已发送未回调"
                                    break;
                                case "01":
                                    return "已发送并成功回调"
                                    break;
                                case "02":
                                    return "已发送但失败回调";
                                    break;
                                default:
                                    return "无状态"

                            }
                        }
                    },

                    {
                        title: '消息分区',
                        dataIndex: 'msgpartition',
                        width: 100,

                    },
                    {
                        title: '消息位点',
                        dataIndex: 'offset',
                        width: 150,

                    },

                    {
                        title: '服务器实例名',
                        dataIndex: 'ipAddress',
                        width: 120,

                    },

                    {
                        title: '主机名',
                        dataIndex: 'hostName',
                        width: 100,

                    },
                    {
                        title: '首次投递开始时间',
                        dataIndex: 'sendTime',
                        width: 150,

                    },
                    {
                        title: '消费耗时',
                        dataIndex: 'costTime',
                        width: 100,

                    },
                    {
                        title: '重投次数',
                        dataIndex: 'resendTimes',
                        width: 100,
                        render: (text) => {
                            return (<span>{text}次</span>)
                        }


                    }
                ],
            columnsC:
                [
                    {
                        title: '事件标识',
                        dataIndex: 'businesskey',
                        width: 100,
                        render: (text, record, index) => {
                            return (
                                this.state.num == "2" ?
                                    <a href="javascript:;" onClick={this.searchBusinessKey(text, record)}>{text}</a> : <div> {text}
                                    </div>);
                        }

                    },
                    {
                        title: '消费者模块编号',
                        dataIndex: 'moduleId',
                        width: 150,
                    },
                    {
                        title: '消费者服务单元编号',
                        dataIndex: 'submoduleId',
                        width: 150,
                    },

                    {
                        title: '消费主题',
                        dataIndex: 'topicName',
                        width: 100,
                    },

                    {
                        title: '消费状态',
                        dataIndex: 'status',
                        width: 100,

                        render: (text) => {
                            switch (text) {

                                case "03":
                                    return "消费开始"
                                    break;
                                case "04":
                                    return "已到达并成功消费";
                                    break;
                                case "05":
                                    return "已到达但消费失败"
                                    break;
                                case "06":
                                    return "已到达但消费失败-业务消费异常"
                                    break;
                                case "07":
                                    return "已到达但消费失败-业务消费异常"
                                    break;
                                case "08":
                                    return "消费失败-进入死信队列失败"
                                    break;
                                default:
                                    return "无状态"

                            }
                        }
                    },


                    {
                        title: '服务器实例名',
                        dataIndex: 'ipAddress',
                        width: 150,

                    },

                    {
                        title: '主机名',
                        dataIndex: 'hostName',
                        width: 100,

                    },
                    {
                        title: '消费开始时间',
                        dataIndex: 'consumeBeginTime',
                        width: 150,

                    },
                    {
                        title: '消费耗时',
                        dataIndex: 'costTime',
                        width: 100,

                    },
                    {
                        title: '消费延迟',
                        dataIndex: 'delayTime',
                        width: 100,

                    }
                ]
        }
    }
    // 单一条件查询 

    messageEnterOnly = (e) => {
        e.preventDefault();
        let reqSeqNo = randomNamber()


        this.props.form.validateFields((err, value) => {
            if (err) {
                return false;
            } else {
                // const { searchType, businessKey, startTime, endTime } = value;
                const { searchType, businessKey, startTime } = value;

                $fetch({
                    url: '/tesla-gateway-console-app/eda/queryEdaMessageTrajectoryList',
                    data: {
                        "edaMsgRedeliver": {
                            "businessKey": businessKey,
                            "startTime": moment(startTime).format('YYYY-MM-DD HH:mm:ss'),
                            "searchType": searchType,

                            "producerPage": {
                                pageNo: 1,
                                recordsPerPage: 10,
                            },
                            "consumerPage": {
                                pageNo: 1,
                                recordsPerPage: 10,
                            }
                        },

                        "reqSeqNo": reqSeqNo
                    }
                }).then((res) => {

                    if (res.reply.returnCode.type == "S") {

                        this.setState({
                            dataP: res.reply.producer.producerList,
                            dataC: res.reply.consumer.consumerList,
                            paginationP: {
                                pageSize: 10,
                                total: res.reply.producer.page.total,
                                current: 1
                            },
                            paginationC: {
                                pageSize: 10,
                                total: res.reply.consumer.page.total,
                                current: 1
                            }
                        })
                    }
                })


                // console.log(searchType, moment(startTime).format('YYYY-MM-DD HH:mm:ss'))
            }
        })

    }
    // 多条件查询

    messageEnterMore = (e) => {
        e.preventDefault();
        let reqSeqNo = randomNamber()

        this.props.form.validateFields((err, value) => {
            if (err) {
                return false;
            } else {
                // const { startTime, endTime } = value;
                const { startTime } = value;



                value.startTime = moment(startTime).format('YYYY-MM-DD HH:mm:ss');
                // value.endTime = moment(endTime).format('YYYY-MM-DD HH:mm:ss');

                let params = {
                    ...value,
                    // pageSize: 10,
                    "producerPage": { "pageNo": 1, "recordsPerPage": 10 },
                    "consumerPage": { "pageNo": 1, "recordsPerPage": 10 }
                }
                console.log(2323, params)
                $fetch({
                    url: '/tesla-gateway-console-app/eda/queryEdaMessageTrajectoryList',
                    data: {
                        "edaMsgRedeliver": params,

                        "reqSeqNo": reqSeqNo
                    }
                }).then((res) => {

                    if (res.reply.returnCode.type == "S") {

                        this.setState({
                            dataP: res.reply.producer.producerList,
                            dataC: res.reply.consumer.consumerList,
                            paginationP: {
                                pageSize: 10,
                                total: res.reply.producer.page.total,
                                current: 1
                            },
                            paginationC: {
                                pageSize: 10,
                                total: res.reply.consumer.page.total,
                                current: 1
                            }
                        })
                    }
                })



            }
        })
        // this.setState({
        //     num: "1"
        // })


    }
    //点击表格businesskey查询
    searchBusinessKey = (text, record) => {
        let key = text;
        let value = record
        let reqSeqNo = randomNamber()

        return () => {

            $fetch({
                url: '/tesla-gateway-console-app/eda/queryEdaMessageTrajectoryList',
                data: {
                    "edaMsgRedeliver": {
                        "businessKey": key,
                        "startTime": value.startTime,
                        // "endTime": value.endTime,
                        "searchType": value.searchType,
                        "producerPage": { "pageNo": 1, "recordsPerPage": 10 },
                        "consumerPage": { "pageNo": 1, "recordsPerPage": 10 }
                    },

                    "reqSeqNo": reqSeqNo
                }
            }).then((res) => {

                if (res.reply.returnCode.type == "S") {
                    this.setState({

                        dataP: res.reply.producer.producerList,
                        dataC: res.reply.consumer.consumerList,
                        paginationP: {
                            pageSize: 10,
                            total: res.reply.producer.page.total,
                            current: 1
                        },
                        paginationC: {
                            pageSize: 10,
                            total: res.reply.consumer.page.total,
                            current: 1
                        },
                        num: "1"
                    }, () => {
                        this.props.form.setFieldsValue({ "businessKey": key })
                    })
                }
            })
        }


    }
    // 清空数据
    messageReset = () => {
        this.props.form.resetFields();
    }
    //切换tab 
    tabSwitch = (n) => {

        this.props.form.resetFields();
        this.setState({
            num: n,
            dataP: [],
            dataC: [],
            paginationP: {
                pageSize: 10,
                // showSizeChanger: true,
                total: 0,
                current: 1
            },
            paginationC: {
                pageSize: 10,
                total: 0,
                // showSizeChanger: true,
                current: 1
            },
        })
    }
    // searchType切换
    termSwitch = (e) => {

        this.setState({
            searchType: e.target.value
        })
    }
    //模板生成的暂时只支持分页，不支持排序
    tableChangeHandleP = (pagination, pageSize) => {

        this.setState({
            paginationP: pagination
        });
        let reqSeqNo = randomNamber()
        this.props.form.validateFields((err, value) => {
            if (err) {
                return false;
            } else {
                const { startTime } = value;
                // const { startTime, endTime } = value;



                value.startTime = moment(startTime).format('YYYY-MM-DD HH:mm:ss');
                // value.endTime = moment(endTime).format('YYYY-MM-DD HH:mm:ss');

                let params = {
                    ...value,
                    "producerPage": { "pageNo": pagination.current, "recordsPerPage": pagination.pageSize },
                    "consumerPage": { "pageNo": this.state.paginationC.current, "recordsPerPage": this.state.paginationC.pageSize }
                }

                if (value.searchType == "p") {
                    $fetch({
                        url: '/tesla-gateway-console-app/eda/queryEdaMessageTrajectoryList',
                        data: {
                            "edaMsgRedeliver": params,

                            "reqSeqNo": reqSeqNo
                        }
                    }).then((res) => {

                        if (res.reply.returnCode.type == "S") {

                            this.setState({
                                dataP: res.reply.producer.producerList,
                                dataC: res.reply.consumer.consumerList,
                                paginationC: {
                                    pageSize: 10,
                                    total: res.reply.consumer.page.total,
                                    current: 1
                                }

                            })
                        }
                    })
                } else {
                    $fetch({
                        url: '/tesla-gateway-console-app/eda/queryEdaMessageTrajectoryList',
                        data: {
                            "edaMsgRedeliver": params,

                            "reqSeqNo": reqSeqNo
                        }
                    }).then((res) => {

                        if (res.reply.returnCode.type == "S") {

                            this.setState({
                                dataP: res.reply.producer.producerList,

                                paginationP: {

                                    total: res.reply.producer.page.total,

                                }

                            })
                        }
                    })
                }




            }
        })
    }
    tableChangeHandleC = (pagination, pageSize) => {

        this.setState({
            paginationC: pagination
        });
        let reqSeqNo = randomNamber()
        this.props.form.validateFields((err, value) => {
            if (err) {

                return false;
            } else {
                // const { startTime, endTime } = value;
                const { startTime } = value;



                value.startTime = moment(startTime).format('YYYY-MM-DD HH:mm:ss');
                // value.endTime = moment(endTime).format('YYYY-MM-DD HH:mm:ss');

                let params = {
                    ...value,
                    "producerPage": {
                        "pageNo": this.state.paginationP.current,
                        "recordsPerPage": this.state.paginationP.pageSize
                    },
                    "consumerPage": { "pageNo": pagination.current, "recordsPerPage": pagination.pageSize }
                }

                if (value.searchType == "p") {
                    $fetch({
                        url: '/tesla-gateway-console-app/eda/queryEdaMessageTrajectoryList',
                        data: {
                            "edaMsgRedeliver": params,

                            "reqSeqNo": reqSeqNo
                        }
                    }).then((res) => {

                        if (res.reply.returnCode.type == "S") {

                            this.setState({

                                dataC: res.reply.consumer.consumerList,

                            })
                        }
                    })
                } else {
                    $fetch({
                        url: '/tesla-gateway-console-app/eda/queryEdaMessageTrajectoryList',
                        data: {
                            "edaMsgRedeliver": params,

                            "reqSeqNo": reqSeqNo
                        }
                    }).then((res) => {

                        if (res.reply.returnCode.type == "S") {

                            this.setState({

                                dataP: res.reply.producer.producerList,
                                dataC: res.reply.consumer.consumerList,
                                paginationP: {
                                    pageSize: 10,
                                    total: res.reply.producer.page.total,
                                    current: 1
                                },


                            })
                        }
                    })
                }




            }
        })
    }
    //选择层级清空topicName
    topicData = (data) => {

        this.props.form.setFieldsValue({ "topicName": "" })
        this.setState({
            module4Data: data
        })
    }
    // 主题列表
    onChildQuery = (map) => {
        console.log('462', map)

        let subModuleId = map
        let reqSeqNo = randomNamber();
        $fetch({
            url: '/tesla-gateway-console-app/eda/queryEdaTopicByParam',
            data: { subModuleId: subModuleId, topicName: '', clusterId: '', keyWords: '', reqSeqNo: reqSeqNo }
        }).then(res => {
            console.log('415', res)
            let module4D = []
            for (let i = 0; i < res.reply.list.topicList.length; i++) {

                module4D.push(res.reply.list.topicList[i].topicName)

            }

            this.setState({
                module4Data: module4D,
                loading: false
            });
            console.log('419', this.state.module4Data)
        });
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 9 }
        }
        const formItemLayoutL = {
            labelCol: { span: 5 },
            wrapperCol: { span: 9 }
        }
        const formItemLayoutTimeL = {
            labelCol: { span: 5 },
            wrapperCol: { span: 5 }
        }
        const formItemLayoutTime = {
            labelCol: { span: 3 },
            wrapperCol: { span: 5 }
        }
        const formItemButton = {
            labelCol: { span: 3 },
            wrapperCol: { span: 16 }
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='messageTopology' >
                <div className="portlet">
                    <Tabs style={{ marginBottom: 7 }} activeKey={this.state.num} onChange={(activeKey) =>
                        this.tabSwitch(activeKey)} >
                        <TabPane tab="单一查询" key="1">
                            <div className="portlet-body">
                                <div className="query-condition">

                                    <Form>
                                        {/* <FormItem  >
                                            {getFieldDecorator('searchType', {
                                                initialValue: 'p',
                                                rules: [

                                                ],
                                            })(
                                                <RadioGroup style={{ paddingTop: 10, paddingBottom: 10 }}>
                                                    <Radio value="p">生产者</Radio>
                                                    <Radio value="c">消费者</Radio>
                                                </RadioGroup>
                                                )}
                                        </FormItem> */}
                                        {
                                            this.state.num == "1" ? <FormItem label="事件标识(businessKey)"  {...formItemLayoutL}>
                                                {getFieldDecorator('businessKey', {

                                                    rules: [
                                                        { required: true, message: '请输入事件标识(businessKey)' }
                                                    ],
                                                })(
                                                    <Input />
                                                    )}
                                            </FormItem> : null
                                        }


                                        <FormItem label="事件生产日期"  {...formItemLayoutTimeL}>
                                            {getFieldDecorator('startTime', {
                                                initialValue: '',
                                                rules: [
                                                    { required: true, message: '请输入事件生产日期' }
                                                ],
                                            })(
                                                <DatePicker
                                                    // disabledDate={this.disabledStartDate}
                                                    showTime={{
                                                        defaultValue: moment("00:00:00", "HH:mm:ss")
                                                    }}
                                                    // value={this.state.startValue}
                                                    format="YYYY-MM-DD HH:mm:ss"
                                                    placeholder="请输入事件生产日期"
                                                    style={{ width: 220 }}
                                                // onChange={this.onStartChange}

                                                />
                                                )}
                                        </FormItem>
                                        {/* <FormItem label="结束时间" hasFeedback {...formItemLayoutTime}>
                                            {getFieldDecorator('endTime', {
                                                initialValue: '',
                                                rules: [
                                                    { required: true, message: '请输入结束时间' }
                                                ],
                                            })(
                                                <DatePicker
                                                    // disabledDate={this.disabledEndtDate}
                                                    showTime={{
                                                        defaultValue: moment("23:59:59", "HH:mm:ss")
                                                    }}
                                                    // value={this.state.endValue}
                                                    format="YYYY-MM-DD HH:mm:ss"
                                                    placeholder="结束时间"
                                                    style={{ width: 220 }}
                                                // onChange={this.onEndChange}

                                                />
                                                )}
                                        </FormItem> */}



                                    </Form>
                                    <Row>
                                        <Col span={8} style={{ paddingTop: 10, paddingBottom: 30 }}>
                                            <Button type="primary" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }} onClick={this.messageEnterOnly} >
                                                提交
                                        </Button>
                                            <Button style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }} onClick={this.messageReset} >
                                                取消
                                         </Button>
                                        </Col>
                                    </Row>
                                </div>


                            </div>

                        </TabPane>
                        <TabPane tab="多条件查询" key="2">
                            <div className="portlet-body">
                                <div className="query-condition">

                                    <FormItem  >
                                        {getFieldDecorator('searchType', {
                                            initialValue: 'p',
                                            rules: [

                                            ],
                                        })(
                                            <RadioGroup onChange={this.termSwitch} style={{ paddingTop: 10, paddingBottom: 10 }}>
                                                <Radio value="p">生产者</Radio>
                                                <Radio value="c">消费者</Radio>
                                            </RadioGroup>
                                            )}
                                    </FormItem>
                                    <Form>
                                        {/* <FormItem label="topicName："  {...formItemLayout} >

                                            {getFieldDecorator('topicName', {
                                                initialValue: '',
                                                rules: [

                                                    {
                                                        required: false,
                                                        message: '请输入主题名称(TopicName)'
                                                    },
                                                ],
                                            })(

                                                <Select showSearch   >
                                                    {
                                                        (JSON.stringify(this.state.module4Data) != '[]') ? this.state.module4Data.map((item) => {

                                                            return (
                                                                <Option value={item} >{item}</Option>
                                                            )
                                                        }) : null
                                                    }

                                                </Select>

                                                )}

                                        </FormItem> */}
                                        {/* <FormItem label="事件业务标识" hasFeedback {...formItemLayoutL}>
                                            {getFieldDecorator('businessKey', {
                                                initialValue: '',
                                                rules: [
                                                    { required: false, message: '请输入事件业务标识' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem> */}
                                        <FormItem label="模块编号"  {...formItemLayout}>
                                            {getFieldDecorator('moduleId', {
                                                initialValue: '',
                                                rules: [
                                                    { required: false, message: '模块编号' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                        <FormItem label="服务单元编号"  {...formItemLayout}>
                                            {getFieldDecorator('submoduleId', {
                                                initialValue: '',
                                                rules: [
                                                    { required: false, message: '服务单元编号' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>

                                        <FormItem label="投递主题"  {...formItemLayout}>
                                            {getFieldDecorator('topicName', {
                                                initialValue: '',
                                                rules: [
                                                    { required: false, message: '请输入投递主题' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                        {/* {this.state.searchType == "p" ?
                                            <FormItem label="消息分区(partition)" hasFeedback {...formItemLayoutL}>
                                                {getFieldDecorator('msgpartition', {
                                                    initialValue: '',
                                                    rules: [
                                                        { required: false, message: '请输入消息分区' }
                                                    ],
                                                })(
                                                    <Input />
                                                    )}
                                            </FormItem> : null}
                                        {this.state.searchType == "p" ? <FormItem label="消息标识(offset)" hasFeedback {...formItemLayoutL}>
                                            {getFieldDecorator('offset', {
                                                initialValue: '',
                                                rules: [
                                                    { required: false, message: '请输入消息标识' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem> : null} */}

                                        <FormItem label="事件生产日期"  {...formItemLayoutTime}>
                                            {getFieldDecorator('startTime', {
                                                initialValue: '',
                                                rules: [
                                                    { required: true, message: '请输入事件生产日期' }
                                                ],
                                            })(
                                                <DatePicker
                                                    // disabledDate={this.disabledStartDate}
                                                    showTime={{
                                                        defaultValue: moment("00:00:00", "HH:mm:ss")
                                                    }}
                                                    // value={this.state.startValue}
                                                    format="YYYY-MM-DD HH:mm:ss"
                                                    placeholder="请输入事件生产日期"
                                                    style={{ width: 220 }}
                                                // onChange={this.onStartChange}

                                                />
                                                )}
                                        </FormItem>
                                        {/*  <FormItem label="结束时间" hasFeedback {...formItemLayoutTime}>
                                            {getFieldDecorator('endTime', {
                                                initialValue: '',
                                                rules: [
                                                    { required: true, message: '请输入结束时间' }
                                                ],
                                            })(
                                                <DatePicker
                                                    // disabledDate={this.disabledEndtDate}
                                                    showTime={{
                                                        defaultValue: moment("23:59:59", "HH:mm:ss")
                                                    }}
                                                    // value={this.state.endValue}
                                                    format="YYYY-MM-DD HH:mm:ss"
                                                    placeholder="结束时间"
                                                    style={{ width: 220 }}
                                                // onChange={this.onEndChange}

                                                />
                                                )}
                                        </FormItem>*/}




                                    </Form>




                                    <Row>
                                        <Col span={8} style={{ paddingTop: 10, paddingBottom: 30 }}>
                                            <Button type="primary" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }} onClick={this.messageEnterMore} >
                                                提交
                                        </Button>
                                            <Button style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }} onClick={this.messageReset} >
                                                取消
                                         </Button>
                                        </Col>
                                    </Row>
                                </div>


                            </div>

                        </TabPane>
                    </Tabs>
                    <Row>
                        <Col span={8}>
                            <p style={{ padding: "20px" }}>
                                <span >*</span>   消费耗时：生产者创建到发送成功消耗的时间差
                            </p>
                        </Col>
                        <Col span={8}>
                            <p style={{ padding: "20px" }}>
                                <span >*</span>  重投次数：重投的次数，暂未启用
                            </p>
                        </Col>
                    </Row>
                    <Table
                        pagination={this.state.paginationP}
                        loading={this.state.loading}
                        dataSource={this.state.dataP} columns={this.state.columnsP}
                        onChange={this.tableChangeHandleP}

                        size="middle" rowKey="id"
                        style={{ paddingLeft: 10, paddingRight: 10 }}>
                    </Table>
                    <Row>
                        <Col span={8}>
                            <p style={{ padding: "20px" }}>
                                <span >*</span>   消费耗时：生产者发送成功到消费者消费成功的时间差
                            </p>
                        </Col>
                        <Col span={8}>
                            <p style={{ padding: "20px" }}>


                                <span >*</span>  消费延迟：消费者拉取消息到消费者消费成功的时间
                            </p>
                        </Col>
                    </Row>
                    <Table
                        pagination={this.state.paginationC}
                        onChange={this.tableChangeHandleC}
                        dataSource={this.state.dataC} columns={this.state.columnsC} size="middle" rowKey="id"
                        style={{ paddingLeft: 10, paddingRight: 10 }}>
                    </Table>
                </div>
            </div>
        );
    }
}
export default Form.create()(MessageTopology)

