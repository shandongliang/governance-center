import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table, Radio, message } from 'antd';

import { randomNamber } from './../../../../util/publicFuc';
import $fetch from '$fetch';

const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Search = Input.Search

class ApproveEdit extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    constructor() {
        super();
        this.state = {
            loading: false,
            data: [],
            userId: ''
        };
    }
    componentDidMount() {

        let param = this.props.date.submoduleIdMap
        let userId = this.props.date.loginName
        let data = []
        for (key in param) {

            data.push(Object.assign({ "name": key, 'value': param[key] }));

        }
        this.setState({
            data
        })
    }


    fatchData = (param) => {
        $fetch({
            url: '/tesla-gateway-console-app/eda/getEdaConfigMap',
            data: { ...param }

        }).then((res) => {
            if (res.reply.returnCode.type == "S") {
                let data = []

                for (var key in res.reply.result) {

                    datas = {
                        'name': key,
                        'value': res.reply.result[key]
                    }


                    data.push(datas)
                }
                this.setState({
                    data: data
                })
            }

        })
    }

    handleSubmit = () => {

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                this.props.callbackParent(values)
            }
        })
    }
    onChange = (e) => {
        this.setState({
            e
        }, () => {
            this.handleSubmit()
        })
    }
    render() {

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 10 }
        }
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="totalSwitch">
                <Form onSubmit={this.handleSubmit}>
                    {
                        this.state.data.map((item) => {
                            return (
                                <FormItem label={item.name}  {...formItemLayout} key={item.name}>
                                    {getFieldDecorator(item.name, {
                                        initialValue: item.value,
                                        rules: [
                                            {
                                                required: false
                                            },
                                        ],
                                    })(<Select onChange={this.onChange} key={item.value + '0'}>
                                        <Select.Option key={item.value + '1'} value="W">申请中</Select.Option>
                                        <Select.Option key={item.value + '2'} value="P">已通过</Select.Option>
                                        <Select.Option key={item.value + '3'} value="D">驳回</Select.Option>
                                    </Select>)}
                                </FormItem>
                            )
                        })
                    }
                </Form>
            </div>

        )
    }
}
export default Form.create()(ApproveEdit)