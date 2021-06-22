import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import G6 from '@antv/g6'
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table, Radio, message } from 'antd';

import { randomNamber } from './../../../../util/publicFuc';
import $fetch from '$fetch';

import './totalSwitch.less';

// import { useRouterHistory } from '../../../../../node_modules/_react-router@2.8.1@react-router/lib';
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Search = Input.Search
let height = window.innerHeight
class TotalSwitch extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    constructor() {
        super();
        this.state = {
            loading: false,
            data: [],
            param: {},
            visible: false,
            valueRadio: ''
        };
    }
    componentDidMount() {
        let reqSeqNo = randomNamber()
        let param = {
            reqSeqNo,
            edaTraceSwitch: ''
        }
        this.fatchData1(param)

    }
    fatchData1 = (param) => {
        $fetch({
            url: '/tesla-gateway-console-app/eda/getEdaConfigMap',
            data: { ...param }

        }).then((res) => {
            if (res.reply.returnCode.type == "S") {
                let valueRadio = res.reply.result.edaTraceSwitch ? res.reply.result.edaTraceSwitch : ''

                this.setState({
                    valueRadio: valueRadio
                })
            }

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


    changeSearch = (e) => {
        //console.log('287', e.target.value);
        this.setState({
            searchValue: e.target.value
        })
    }
    onSearch = () => {
        let reqSeqNo = randomNamber()
        let edaTraceSwitch = this.state.valueRadio
        if (edaTraceSwitch == '') {
            message.error('请选择是否开启消息全链路跟踪')
            return
        }
        let param = {
            reqSeqNo,
            edaTraceSwitch
        }
        this.fatchData(param)

    }
    fitchData = (value) => {

    }
    handleok = () => {


    }
    onChangeRadio = (val) => {

        this.setState({
            valueRadio: val.target.value,

        })

    }
    render() {

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 10 }
        }
        const { getFieldDecorator } = this.props.form;
        console.log(this.state.data);
        return (
            <div className="totalSwitch">

                {/* <FormItem label="是否开启消息全链路跟踪"  {...formItemLayout}>
                    {getFieldDecorator('edaTraceSwitch', {
                        initialValue: '',
                        rules: [
                            {
                                required: false,
                                message: '请选择是否开启消息全链路跟踪'
                            },
                        ],
                    })(<Select >
                        <Option value="ON">是</Option>
                        <Option value="OFF">否</Option>
                    </Select>)}
                </FormItem> */}
                <FormItem >

                    <div style={{ marginTop: '20px' }}>
                        <RadioGroup onChange={this.onChangeRadio} value={this.state.valueRadio} style={{ width: '100%' }} >
                            <div style={{ display: 'inline-block', width: '16.6%', color: '#000' }}>是否开启消息全链路跟踪：</div>
                            <Radio value='ON' >是</Radio>
                            <Radio value='OFF'>否</Radio>
                            <Button type='primary' onClick={this.onSearch} style={{ height: '22px', marginLeft: '20px' }}>设置</Button>
                        </RadioGroup>

                    </div>


                </FormItem>
                <div style={{ borderTop: '1px solid #d5d5d5' }}></div>
                {this.state.data ? this.state.data.map((item) => {
                    return (
                        <div>
                            <div style={{ display: 'inline-block', width: '25%', color: '#000', padding: '5px' }}>{item.name}:</div>
                            <div style={{ display: 'inline-block', width: '25%', color: '#000', padding: '5px' }}>{item.value}</div>
                        </div>
                    )
                }) : null}

            </div>

        )
    }
}
export default Form.create()(TotalSwitch)