

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from '$moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input } from 'antd';

import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';
import { randomNamber } from './../../../../util/publicFuc';
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import './../../../common/style/index.less';
import './edit.less'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class MessageEdit extends React.Component {

    static contextTypes = {
        router: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }



    render() {
        return (
            <div>
                <div className="pandora-main-content">
                    <div className="portlet-tab">
                        <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
                            <TabPane tab="编辑消息" key="1">
                                <div className="portlet-body">
                                    <WrapperEditForm id={this.props.match.params.id} par={this.props.location.state}></WrapperEditForm>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

class EditForm extends React.Component {

    static contextTypes = {
        router: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            formData: [],
            par: {},
            //data:this.props.par.record
        }
    }

    componentDidMount() {
        this.setState({
            data: this.props.par.record
        }, () => {
            //console.log('74', this.state.data);
        })

    }




    addZero = (val) => {
        return val > 9 ? val : ('0' + val);
    }

    toDetail = () => {
      let path = {
        pathname: `/eventDriven/edaSubscribe/detail`,
        state: {
          id: record.id
        }
      }
      goTo(path ,"服务订阅详情");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                //values['id'] = this.props.id;
                let record = this.props.par.record
                //console.log(record)
                record.eventId = values.eventId
                record.topicName = values.topicName
                record.businessKey = values.businessKey
                record.routeBoId = values.routeBoId
                record.logicUnit = values.logicUnit
                record.dockerId = values.dockerId
                record.messageBody = values.messageBody
                let param = {
                    'edaMsgRedeliverBodyList': [{ ...record }],
                };

                this.setState({ loading: true });
                this.toSure(param)
            }
        })
    }
    shengchan = (v) => {
        if (v == 'NDNT') {
            return '不分库不分表'
        }
        if (v == 'NDYT') {
            return '不分库分表'
        }
        if (v == 'YDNT') {
            return '分库不分表'
        }
        if (v == 'YDYT') {
            return '分库分表'
        }

    }
    timer1 = (t) => {
        return moment(t).format('YYYYMMDD')
    }
    timer = (t) => {
        return moment(t).format('YYYY-MM-DD')
    }
    toSure = (param) => {
        let reqSeqNo = randomNamber()
        let id = this.props.id;
        let _this = this;
        Modal.confirm({
            title: "确认生产者配置无误",
            content: <div>

                <div className='pro'>
                    <span>事件编号</span>
                    <span>{param.edaMsgRedeliverBodyList[0].eventId}</span>
                </div>
                <div className='pro'>
                    <span>主题名称</span>
                    <span>{param.edaMsgRedeliverBodyList[0].topicName}</span>
                </div>

                <div className='pro'>
                    <span>业务唯一标识</span>
                    <span>{param.edaMsgRedeliverBodyList[0].businessKey}</span>
                </div>
                <div className='pro'>
                    <span>分库分表描述</span>
                    <span>{param.edaMsgRedeliverBodyList[0].routeBoId}</span>
                </div>
                <div className='pro'>
                    <span>逻辑单元</span>
                    <span>{param.edaMsgRedeliverBodyList[0].logicUnit}</span>
                </div>
                <div className='pro'>
                    <span>表编号</span>
                    <span>{param.edaMsgRedeliverBodyList[0].dockerId}</span>
                </div>
                <div className='pro' style={{ height: 'auto', lineHeight: 'auto' }}>
                    <span className='messBody1'>消息数据</span>
                    <span className='messBody2'>{param.edaMsgRedeliverBodyList[0].messageBody}</span>
                </div>
            </div>,
            onOk() {
                _this.setState({ loading: true });
                //console.log('317', param)
                $fetch({
                    url: '/tesla-gateway-console-app/eda/edaMsgRedeliverBodyList',
                    data: { ...param, reqSeqNo: reqSeqNo, }
                }).then(res => {
                    //console.log(res)
                    if (res.reply.returnCode.type == "S") {
                        let result = res.reply.result
                        _this.messages(result);
                    }



                });
            },
            onCancel() {
                message.info('取消');


            },
        });
    }
    messages = (result) => {
        let id = this.props.id;
        let _this = this;
        if (result.success == '1') {
            Modal.confirm({
                title: "状态",
                content: <div>
                    修改完成，点击确认将回到列表页

                </div>,
                onOk() {
                    _this.setState({ loading: true });
                    let path = {
                        pathname: '/eventDriven/messageSend/send',
                        state: _this.props.par.par
                    }
                    goTo(path,"消息重投递列表");


                },
                onCancel() {
                    message.info('取消');


                },
            });
        } else {
            Modal.confirm({
                title: "状态",
                content: <div>
                    编辑失败，点击确认将回到列表页

                </div>,
                onOk() {
                    _this.setState({ loading: true });
                    let path = {
                        pathname: '/eventDriven/messageSend/send',
                        state: _this.props.par.par
                    }
                    goTo(path,"消息重投递列表");


                },
                onCancel() {
                    message.info('取消');


                },
            });
        }
    }
    toIndex = () => {

        let path = {
            pathname: '/eventDriven/messageSend/send',
            state: this.props.par.par
        }
        //console.log(path)
        goTo(path,"消息重投递列表");
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 20 }
        }
        const { getFieldDecorator } = this.props.form;
        const data = this.props.par ? this.props.par.record : {}
        return (
            <div className='messEdit'>
                <div style={{ padding: '20px' }}>

                    <textarea style={{ padding: '20px', width: '1020px', height: '230px', resize: 'none', outline: 'none', overflowY: 'scroll' }}>{data.messageBody}</textarea>
                </div>

                <Button onClick={this.toIndex} className="cancelBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>返回</Button>
            </div>

        );
    }
}

const WrapperEditForm = Form.create()(EditForm);