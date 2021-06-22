
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input } from 'antd';
//import default from '../../../../node_modules/_antd@2.11.2@antd/lib/anchor/anchorHelper';
import './templateForm.less'
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


class TemplateForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            deployUnitChange: ''
        }
    }
    drunit = (v) => {
        if (v == 'M') {
            return 'M-马坡 m1'
        }
        if (v == 'P') {
            return 'P-鹏博士m2'
        }
        if (v == 'Z') {
            return 'Z-郑州'
        }
        if (v == '' || v == null) {
            return '不设置'
        }
    }
    deployUnitChange = (e) => {
        this.props.form.resetFields(['drunit']);
       // console.log(e);
        this.setState({
            deployUnitChange: e
        }, () => {
           // console.log('36', this.state.deployUnitChange);
        })
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 10 }
        }

        const { getFieldDecorator } = this.props.form;
        return (

            <div className='tempLateF'>
                <Form >

                    <FormItem hasFeedback {...formItemLayout} label='集群名称：'
                    >
                        {getFieldDecorator('clusterName', {
                            initialValue: "",
                            rules: [

                                { required: true, message: '请输入集群名称' }
                            ]
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem hasFeedback {...formItemLayout} label='中间件管理入口:'
                    >
                        {getFieldDecorator('adminAddress', {
                            initialValue: "",
                            rules: [

                                { required: true, message: '请输入中间件管理入口' }
                            ]
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem hasFeedback {...formItemLayout} label='中间件版本：'
                    >
                        {getFieldDecorator('middlewareVer', {
                            initialValue: "",
                            rules: [

                                { required: true, message: '请选择中间件版本' }
                            ]
                        })(
                            <Select value={'kafka_1.0.1'}>
                                <Option value="kafka_1.0.1">kafka_1.0.1</Option>
                                <Option value="kafka_0.10.0.1">kafka_0.10.0.1</Option>

                            </Select>
                            )}
                    </FormItem>
                    <FormItem hasFeedback {...formItemLayout} label='集群接入：'
                    >
                        {getFieldDecorator('clusterAddress', {
                            initialValue: "",
                            rules: [

                                { required: true, message: '请输入集群接入' }
                            ]
                        })(
                            <Input type='textarea' autosize />
                            )}
                    </FormItem>
                    <FormItem hasFeedback {...formItemLayout} label='生产者启动配置:'
                    >

                        {getFieldDecorator('producerInitConfig', {
                            initialValue: "",
                            rules: [

                                { required: true, message: '请输入生产者启动配置' }
                            ]
                        })(
                            <Input type='textarea' autosize />
                            )}
                    </FormItem>
                    <FormItem hasFeedback {...formItemLayout} label='消费者启动配置:'
                    >
                        {getFieldDecorator('consumerInitConfig', {
                            initialValue: "",
                            rules: [

                                { required: true, message: '请输入消费者启动配置' }
                            ]
                        })(
                            <Input type='textarea' autosize />
                            )}
                    </FormItem>
                    <FormItem hasFeedback {...formItemLayout} label='中间件类型：'
                    >
                        {getFieldDecorator('middlewareType', {
                            initialValue: "",
                            rules: [

                                { required: true, message: '请选择中间件类型' }
                            ]
                        })(
                            <Select >
                                <Option value="KF">Kafka</Option>
                                <Option value="am">ActiveMQ</Option>
                                <Option value="al">AliMQ</Option>
                            </Select>
                            )}
                    </FormItem>
                    <FormItem hasFeedback {...formItemLayout} label='中间件部署'
                    >
                        {getFieldDecorator('deployUnit', {
                            initialValue: "",
                            rules: [

                                { required: true, message: '请选择中间件部署' }
                            ]
                        })(
                            <Select onChange={this.deployUnitChange} >
                                <Option value="M">M-马坡 m1</Option>
                                <Option value="P">P-鹏博士m2</Option>

                            </Select>
                            )}
                    </FormItem>
                    <FormItem hasFeedback {...formItemLayout} label='中间件灾备部署'
                    >
                        {getFieldDecorator('drunit', {
                            initialValue: "",
                            rules: [

                                { required: false, message: '请选择中间件灾备部署' }
                            ]
                        })(
                            <Select >
                                <Option value="M" style={{ display: this.state.deployUnitChange == 'M' ? "none" : "block" }}>M-马坡 m1</Option>
                                <Option value="P" style={{ display: this.state.deployUnitChange == 'P' ? "none" : "block" }}>P-鹏博士m2</Option>

                            </Select>
                            )}
                    </FormItem>

                    <FormItem label="接入用户：" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('accessUser', {
                            initialValue: '',
                            rules: [

                                { required: true, message: '请输入接入用户' }
                            ],
                        })(
                            <Input />
                            )}
                    </FormItem>

                    <FormItem label="接入安全协议：" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('accessProtocol', {
                            initialValue: '',
                            rules: [

                                { required: true, message: '请输入安全协议' }
                            ],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem label="是否支持单一生产者投递多个主题事件：" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('isSingletonProducer', {
                            initialValue: '',
                            rules: [

                                { required: true, message: '请选择主题事件' }
                            ],
                        })(
                            <Select >
                                <Option value="Y">支持</Option>
                                <Option value="N">不支持</Option>

                            </Select>
                            )}
                    </FormItem>
                    <FormItem label="是否支持单一消费者消费多个主题事件：" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('isSingletonConsumer', {
                            initialValue: '',
                            rules: [

                                { required: true, message: '请选择主题事件' }
                            ],
                        })(
                            <Select >
                                <Option value="Y">支持</Option>
                                <Option value="N">不支持</Option>

                            </Select>
                            )}
                    </FormItem>
                    <div className='temDate'>
                        <FormItem label="上线日期:" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('publishDate', {
                                initialValue: '',
                                rules: [

                                    { required: true, message: '请输入上线日期' }
                                ],
                            })(
                                (<DatePicker />)
                                )}
                        </FormItem>
                    </div>
                </Form>
            </div>
        )
    }
}

export default Form.create({
    onFieldsChange(props, changeFields) {
        props.onChange(changeFields);
    },
    // mapPropsToFields(props){
    //     return {
    //         test:Form.createFormField({
    //             value:props.test,
    //         }),
    //         test1:Form.createFormField({
    //             value:props.test1,
    //         })
    //     }
    // },
    onValuesChange(_, values) {
        //console.log('192', values)
    }
})(TemplateForm)