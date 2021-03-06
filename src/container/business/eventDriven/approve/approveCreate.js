import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6'
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table, Collapse, message } from 'antd';
import moment from 'moment';
import { randomNamber } from './../../../../util/publicFuc';
import $fetch from '$fetch';


// import './../../../common/style/index.less';
//import './sendEdaMessage.less';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Search = Input.Search

const Panel = Collapse.Panel
class ApproveCreate extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    constructor() {
        super();
        this.state = {
            loading: false,
            data: [],
            param: {},
            pagination: {
                pageSize: 10,
                pageSizeChanger: true,
                current: 1
            },


        };
    }
    componentDidMount() {



    }
    timer = (t) => {

        return moment(t).format('YYYY-MM-DD HH:mm:ss:SSS')
    }

    fetchConsumer = (value) => {

        let reqSeqNo = randomNamber();
        this.setState({ loading: true });

        let params = {

            topicName: value.topicName[0],
            environmentType: value.environmentType,
            consumerId: value.consumerId[0],
            count: value.count,

            reqSeqNo: reqSeqNo
        }


        $fetch({
            url: '/tesla-gateway-console-app/eda/consumeEdaMessage',
            data: {
                ...params
            }
        }).then((res) => {

            if (res.reply.returnCode.type == 'S') {
                let data = res.reply.result.edaMsgConsume

                this.setState({

                    data,
                    a: false,
                }, () => {
                    if (JSON.stringify(data) == '[]') {

                        this.messages()
                    }
                })
            } else {



            }
        }).catch(error => {

            this.setState({ a: false, });
        });
    };
    messages = () => {

        let _this = this;
        Modal.confirm({
            title: "??????",
            content: <div>
                ????????????

            </div>,
            onOk() {

            },
            onCancel() {
                message.info('??????');


            },
        });
    }

    onSearch = () => {

        this.props.form.validateFields((err, value) => {
            if (err) {

                return false;
            } else {
                this.setState({
                    a: true
                }, () => {
                    this.fetchConsumer(value);
                })

            }
        })

    }


    render() {
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 10 }
        }
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="approveCreate">


                <Form>
                    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                        <div style={{ margin: '10px' }}>??????</div>
                        <FormItem label="??????????????????"  {...formItemLayout} >

                            {getFieldDecorator('count', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true,
                                        message: '?????????count'
                                    },
                                ],
                            })(

                                <Input />

                                )}

                        </FormItem>
                        <FormItem label="??????????????????"  {...formItemLayout} >

                            {getFieldDecorator('environmentType', {
                                initialValue: '',
                                rules: [

                                    {
                                        required: true,
                                        message: '?????????environmentType'
                                    },
                                ],
                            })(

                                <Input />
                                )}

                        </FormItem>
                    </div>
                    <div style={{ height: '20px' }}></div>
                    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                        <div style={{ margin: '10px' }}>??????</div>
                        <FormItem label="??????????????????"  {...formItemLayout} >

                            {getFieldDecorator('count', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true,
                                        message: '?????????count'
                                    },
                                ],
                            })(

                                <Input />

                                )}

                        </FormItem>
                        <FormItem label="??????????????????"  {...formItemLayout} >

                            {getFieldDecorator('environmentType', {
                                initialValue: '',
                                rules: [

                                    {
                                        required: true,
                                        message: '?????????environmentType'
                                    },
                                ],
                            })(

                                <Input />
                                )}

                        </FormItem>
                        <FormItem label="????????????"  {...formItemLayout} >

                            {getFieldDecorator('environmentType', {
                                initialValue: '',
                                rules: [

                                    {
                                        required: true,
                                        message: '?????????environmentType'
                                    },
                                ],
                            })(

                                <Input />
                                )}

                        </FormItem>
                        <FormItem label="????????????"  {...formItemLayout} >

                            {getFieldDecorator('environmentType', {
                                initialValue: '',
                                rules: [

                                    {
                                        required: true,
                                        message: '?????????environmentType'
                                    },
                                ],
                            })(

                                <Input />
                                )}

                        </FormItem>
                        <FormItem label="??????"  {...formItemLayout} >

                            {getFieldDecorator('environmentType', {
                                initialValue: '',
                                rules: [

                                    {
                                        required: true,
                                        message: '?????????environmentType'
                                    },
                                ],
                            })(

                                <Input type='textarea' autosize />
                                )}

                        </FormItem>
                    </div>


                </Form>

                <Button onClick={this.toEdit} type='primary' className="operatorBtn" style={{ marginLeft: 50, marginTop: 20, width: 88, fontSize: 16, borderRadius: 5 }}>??????</Button>
                <Button onClick={this.toDeleteluoji} type='primary' className="operatorBtn" style={{ marginLeft: 10, marginTop: 20, width: 88, fontSize: 16, borderRadius: 5, }}>??????</Button>
                <Button onClick={this.toIndex} type='primary' className="operatorBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>??????</Button>
                <br></br>



            </div>

        )
    }
}
export default Form.create()(ApproveCreate)