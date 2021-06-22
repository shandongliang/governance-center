import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input } from 'antd';

import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import './../../../common/style/index.less';
import './create.less'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class EdaMiddlewareCreate extends React.Component {

    static contextTypes = {
        router: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 }
        }
        return (
            <div>
                <div className="pandora-main-content">
                    <div className="portlet-tab">
                        <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
                            <TabPane tab="创建事件中间件" key="1">
                                <div className="portlet-body">
                                    <WrapperCreateForm></WrapperCreateForm>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

class CreateForm extends React.Component {

    static contextTypes = {
        router: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.newTabIndex = 0;

        this.state = {
            dataParent: {}
        }
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");
    }

    shouldComponentUpdate(prev, newP, prevS, newS) {
        return true;
    }

    displayField = (displayType, name, valueRange) => {
        switch (displayType) {
            case 'TEXT': {
                return (
                    <Input placeholder='' />
                )
            }
            case 'NUMBER': {
                return (
                    <Input type="number" />
                );
            }
            case 'FLOAT': {
                return (
                    <Input placeholder='' />
                )
            }
            case 'SELECT': {
                _valueRange = valueRange ? valueRange : "";
                const optionArr = _valueRange.split("|");
                let localCounter = 1;
                return (
                    <Select
                    //style={{width:210}}
                    >
                        {
                            optionArr.map((itm) => {
                                return (
                                    <Select.Option key={localCounter++} value={itm}>{itm}</Select.Option>
                                )
                            })
                        }
                    </Select>
                );
            }
            case 'DATE': {
                return (
                    <DatePicker
                        //style={{ width:210 }}
                        format={DATE_FORMAT_MOMENT}
                    />
                )
            }
            case 'TIME': {
                return (
                    <TimePicker
                        placeholder="请选择时间"
                        format="HH:mm:ss"
                    //style={{ width:210 }}
                    />
                );
            }
            case 'MULTISELECT': {
                _valueRange = valueRange ? valueRange : "";
                const chkboxArr = _valueRange.split("|");
                let options = [];
                chkboxArr.forEach((itm) => {
                    options.push({ label: itm, value: itm });
                })
                return (
                    <CheckboxGroup options={options} />
                );
            }
            case 'UPLOAD': {
                return (
                    <Upload >
                        <Button type="ghost">
                            <Icon type="upload" /> Upload
                        </Button>
                    </Upload>
                );
            }
        }
    }

    validateMaxLen = (maxLen) => {
        return (rule, value, callback) => {
            if (value.length > maxLen) {
                callback("数据长度过长！")
            }

            callback();
        }
    }

    getMinMaxFromNumber = (valueRange) => {
        valueRangeTmp = valueRange ? valueRange : "";
        let min = 0, max = 0;
        const len = valueRangeTmp.length;
        if (len > 0) {
            const arr = valueRangeTmp.split(",");
            if (valueRangeTmp.charAt(0) == "(") {
                min = parseInt(arr[0].substring(1)) + 1;
            } else if (valueRangeTmp.charAt(0) == "[") {
                min = parseInt(arr[0].substring(1))
            }
            if (valueRangeTmp.charAt(len - 1) == ")") {
                max = parseInt(arr[1].substring(0, arr[1].length - 1)) - 1;
            } else if (valueRangeTmp.charAt(len - 1) == "]") {
                max = parseInt(arr[1].substring(0, arr[1].length - 1));
            }
        }

        return { min: min, max: max };
    }

    validateNumber = (name, valueRange) => {
        const obj = this.getMinMaxFromNumber(valueRange);
        return (rule, value, callback) => {
            const { getFieldValue } = this.props.form;
            const tmpValue = getFieldValue(name);
            if (!!tmpValue) {
                const tmpValueInt = parseInt(tmpValue);
                if (tmpValueInt < obj.min || tmpValueInt > obj.max) {
                    callback("数值不在指定范围");
                }
            }

            callback();
        }
    }

    getRegExpFromFloat = (accuracy) => {
        let _accuracy = accuracy ? accuracy : "";
        let _decimalLen = 0;
        let _intLen = 0;
        if (_accuracy.length > 0) {
            const _arr = _accuracy.split("|");
            if (_arr.length > 1) {
                _decimalLen = parseInt(_arr[1]);
                _intLen = parseInt(_arr[0]) - _decimalLen;
            }
        }

        const accuracyRegExpStr = '/^\\d{0,' + _intLen + '}(\\.\\d{0,' + _decimalLen + '})?$/';
        const accuracyRegExp = new RegExp(eval(accuracyRegExpStr));

        return accuracyRegExp;
    }

    getLenAndRegExpFromText = (length, validationTmpl) => {
        const len = length ? length : "";
        let _validationTmpl = new RegExp();
        if (!!validationTmpl && validationTmpl.indexOf("null") < 0) {
            _validationTmpl = new RegExp(eval("/" + validationTmpl + "/"));
        }

        return { len: len, regExp: _validationTmpl }
    }

    addZero = (val) => {
        return val > 9 ? val : ('0' + val);
    }



    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {



                this.setState({

                    dataParent: values
                });

            }
        })
    }
    onSubmit = (map) => {
        console.log(111111111111111111, map)
        let List = []
        List.push(map)
        let values = this.state.dataParent
        let param = {
            'edaMiddleware': {
                ...values,
                createUserId: '1', lastUpdateUserId: '1', list: List
            },

            reqSeqNo: '123456',
        };
        console.log("param", param)

        $fetch({
            url: '/tesla-gateway-console-app/eda/createEdaMiddleware',
            data: param
        }).then(res => {
            this.setState({
                loading: false
            });
            let path = {
              pathname: '/eventDriven/edamiddleware/index'
            };
            goToAndClose(path, "事件中间件查询");
        });
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 10 }
        }
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='middleware'>
                <Form onSubmit={this.handleSubmit}>
                    <Row >


                        <FormItem {...formItemLayout} label='中间件英文全称'
                        >
                            {getFieldDecorator('middlewareEngName', {
                                initialValue: "",
                                rules: [
                                    { pattern: this.getLenAndRegExpFromText(0, '').regExp, message: '数据格式不正确' },
                                    {
                                        max: this.getLenAndRegExpFromText(0, '').len,
                                        message: '数据长度过长'
                                    },
                                    { required: true, message: '请输入中间件英文全称' }
                                ]
                            })(
                                this.displayField('TEXT', 'middlewareEngName', '')
                                )}
                        </FormItem>
                        <FormItem {...formItemLayout} label='中间件中文全称'
                        >
                            {getFieldDecorator('middlewareChName', {
                                initialValue: "",
                                rules: [
                                    { pattern: this.getLenAndRegExpFromText(0, '').regExp, message: '数据格式不正确' },
                                    {
                                        max: this.getLenAndRegExpFromText(0, '').len,
                                        message: '数据长度过长'
                                    },
                                    { required: true, message: '请输入中间件中文全称' }
                                ]
                            })(
                                this.displayField('TEXT', 'middlewareChName', '')
                                )}
                        </FormItem>
                        <FormItem {...formItemLayout} label='中间件类型'
                        >
                            {getFieldDecorator('middlewareType', {
                                initialValue: "",
                                rules: [
                                    { pattern: this.getLenAndRegExpFromText(0, '').regExp, message: '数据格式不正确' },
                                    {
                                        max: this.getLenAndRegExpFromText(0, '').len,
                                        message: '数据长度过长'
                                    },
                                    { required: true, message: '请输入中间件类型' }
                                ]
                            })(
                                <Select value={'KF'}>
                                    <Option value="KF">Kafka</Option>
                                    <Option value="am">ActiveMQ</Option>
                                    <Option value="al">AliMQ</Option>
                                </Select>
                                )}
                        </FormItem>
                        <FormItem {...formItemLayout} label='中间件部署'
                        >
                            {getFieldDecorator('middlewareDeploymentUnit', {
                                initialValue: "",
                                rules: [
                                    { pattern: this.getLenAndRegExpFromText(0, '').regExp, message: '数据格式不正确' },
                                    {
                                        max: this.getLenAndRegExpFromText(0, '').len,
                                        message: '数据长度过长'
                                    },
                                    { required: true, message: '请输入中间件部署' }
                                ]
                            })(
                                <Select value={'M'}>
                                    <Option value="M">M-马坡</Option>
                                    <Option value="P">P-鹏博士</Option>
                                    <Option value="Z">Z-郑州</Option>
                                </Select>
                                )}
                        </FormItem>
                        <FormItem label="上线日期" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('publishDate', {
                                initialValue: '',
                                rules: [
                                    { pattern: this.getLenAndRegExpFromText(0, '').regExp, message: '数据格式不正确' },
                                    {
                                        max: this.getLenAndRegExpFromText(0, '').len,
                                        message: '数据长度过长'
                                    },
                                    { required: true, message: '请输入上线日期' }
                                ],
                            })(
                                <Input />
                                )}
                        </FormItem>
                        <FormItem >
                            {getFieldDecorator('createUserId', {
                                initialValue: '',
                                rules: [
                                    {
                                    },
                                ],
                            })(<Input type='hidden' />)}
                        </FormItem>
                        <FormItem >
                            {getFieldDecorator('lastUpdateUserId', {
                                initialValue: '',
                                rules: [
                                    {
                                    },
                                ],
                            })(<Input type='hidden' />)}
                        </FormItem>



                    </Row>
                    <WrapperCreateForm1 callbackParent={this.onSubmit}></WrapperCreateForm1>



                </Form>
            </div>
        );
    }
}

const WrapperCreateForm = Form.create()(CreateForm);

class CreateForm1 extends React.Component {

    static contextTypes = {
        router: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 20 }
        }


        const panes = [
            {
                //         title:'tab1',
                //     content:
                //    '' ,

                //     key:'1'
                title: 'new',
                formFields:
                    ['clusterName', 'middlewareType', 'clusterAddress', 'deployUnit', 'accessUser', 'accessProtocol',
                        'isSingletonProducer', 'isSingletonConsumer', 'producerInitConfig', 'consumerInitConfig', 'publishDate',]

                ,

                key: 1
            },

        ]
        this.state = {
            activeKey: panes[0].key,
            panes,
            childDate: {}

        }
    }
    onChangeTab = (activeKey) => {
        this.setState({
            activeKey
        })
    }
    onEditTab = (targetKey, action) => {
        this[action](targetKey)
    }
    add = () => {
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 10 }
        }
        const { getFieldDecorator } = this.props.form;

        const panes = this.state.panes;
        // const panes =this.props.form;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({
            title: 'new',
            formFields:
                ['clusterName', 'middlewareType', 'clusterAddress', 'deployUnit', 'accessUser', 'accessProtocol',
                    'isSingletonProducer', 'isSingletonConsumer', 'producerInitConfig', 'consumerInitConfig', 'publishDate',]

            ,

            key: activeKey
        })
        this.setState({
            panes, activeKey
        })
    }
    // remove=(targetKey)=>{
    //     let activeKey=this.state.activeKey;
    //     let lastIndex;
    //     this.state.panes.forEach((pane,i)=>{
    //         if(pane.key===targetKey){
    //             lastIndex=i-1
    //         }
    //     });
    //     const panes =this.state.panes.filter(pane=>pane.key!==targetKey)
    //     if(lastIndex>=0&&activeKey===targetKey){
    //         activeKey=panes[lastIndex].key;
    //     }
    //     this.setState({
    //         panes,
    //         activeKey
    //     })
    // }
    displayField = (v) => {
        switch (v) {
            case 'clusterName': {
                return (
                    <Input />
                )
            }
            case 'middlewareType': {
                return (
                    <Input />
                );
            }
            case 'producerInitConfig': {
                return (
                    <Input />
                );
            }
            case 'consumerInitConfig': {
                return (
                    <Input />
                );
            }
            case 'clusterAddress': {
                return (
                    <Input />
                )
            }
            case 'deployUnit': {

                return (
                    <Select value={'M'}>
                        <Option value="M">M-马坡 m1</Option>
                        <Option value="P">P-鹏博士m2</Option>
                        <Option value="Z">Z-郑州</Option>
                    </Select>
                );
            }
            case 'accessUser': {
                return (
                    <Input />
                )
            }
            case 'accessProtocol': {
                return (
                    <Input />
                )
            }
            case 'isSingletonProducer': {

                return (
                    <Select value={'Y'}>
                        <Option value="Y">支持</Option>
                        <Option value="N">不支持</Option>

                    </Select>
                );
            }
            case 'isSingletonConsumer': {

                return (
                    <Select value={'Y'}>
                        <Option value="Y">支持</Option>
                        <Option value="N">不支持</Option>

                    </Select>
                );
            }
            case 'publishDate': {
                return (
                    <DatePicker
                    //style={{ width:210 }}

                    />
                )
            }
            case '': {
                return (
                    <TimePicker
                        placeholder="请选择时间"
                        format="HH:mm:ss"
                    //style={{ width:210 }}
                    />
                );
            }
            case 'MULTISELECT': {
                _valueRange = valueRange ? valueRange : "";
                const chkboxArr = _valueRange.split("|");
                let options = [];
                chkboxArr.forEach((itm) => {
                    options.push({ label: itm, value: itm });
                })
                return (
                    <CheckboxGroup options={options} />
                );
            }
            case 'UPLOAD': {
                return (
                    <Upload >
                        <Button type="ghost">
                            <Icon type="upload" /> Upload
                        </Button>
                    </Upload>
                );
            }
        }
    }
    Names = (n) => {

        if (n == 'clusterName') {
            return '集群名称：'
        }
        if (n == 'middlewareType') {
            return '中间件类型：'
        }
        if (n == 'producerInitConfig') {
            return '生产者启动配置:'
        }
        if (n == 'consumerInitConfig') {
            return '消费者启动配置:'
        }
        if (n == 'clusterAddress') {
            return '集群接入：'
        }
        if (n == 'deployUnit') {
            return '中间件部署：'
        }
        if (n == 'accessUser') {
            return '接入用户：'
        }
        if (n == 'accessProtocol') {
            return '接入安全协议：'
        }
        if (n == 'isSingletonProducer') {
            return '是否支持单一生产者投递多个主题事件：'
        }
        if (n == 'isSingletonConsumer') {
            return '是否支持单一消费者消费多个主题事件：'
        }
        if (n == 'publishDate') {
            return '上线日期：'
        }
    }
    toIndex = () => {
      let path = {
        pathname: '/eventDriven/edamiddleware/index'
      };
      goToAndClose(path, "事件中间件查询");
    }
    handleSubmit1 = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {



                this.setState({
                    childDate: values
                }, () => {
                    console.log('this.state.childDate', this.state.childDate)
                    this.props.callbackParent(this.state.childDate)
                });

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
            <div>
                <Form onSubmit={this.handleSubmit1}>

                    <Tabs
                        onChange={this.onChangeTab}
                        activeKey={this.state.activeKey}
                        type='editable-card'
                        onEdit={this.onEditTab}

                    >

                        {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} forceRender={true}>
                            {pane.formFields ? pane.formFields.map(field =>

                                <FormItem {...formItemLayout} label={this.Names(field)}
                                >
                                    {getFieldDecorator(field, {
                                        initialValue: "",

                                    })(

                                        this.displayField(field)
                                        )}
                                </FormItem>

                            ) : pane.content}

                        </TabPane>)}
                    </Tabs>
                    <Row >
                        <FormItem wrappercol={{ span: 19, offset: 5 }}>
                            <Button htmlType="submit" className="operatorBtn" style={{ marginLeft: 50, width: 88, fontSize: 16, borderRadius: 5 }}>提交</Button>
                            <Button onClick={this.toIndex} className="cancelBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>取消</Button>
                        </FormItem>
                    </Row>
                </Form>

            </div>
        )
    }
}

const WrapperCreateForm1 = Form.create()(CreateForm1);
