import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from '$moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input } from 'antd';
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';
import { randomNamber } from './../../../../util/publicFuc';

import './../../../common/style/index.less';
import './edit.less'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class EdaMiddlewareEdit extends React.Component {

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
        return (
            <div>
                <div className="pandora-main-content">
                    <div className="portlet-tab">
                        <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
                            <TabPane tab="编辑事件中间件" key="1">
                                <div className="portlet-body">
                                    <WrapperEditForm id={this.props.match.params.id}></WrapperEditForm>
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
            formData: {},
            clasterArr: ''
        }
    }

    componentDidMount() {
        let id = this.props.id;
        let reqSeqNo = randomNamber()
        $fetch({
            url: '/tesla-gateway-console-app/eda/queryEdaClusterDetail',
            data: { middlewareEngName: id, reqSeqNo: reqSeqNo, clusterName: id }
        }).then(res => {

            if (res.reply.returnCode.type == "S") {
                this.setState({
                    formData: res.reply.cluster,
                    loading: false
                });
            } else {
            }
        });
    }

    displayField = (displayType, name, valueRange) => {
        switch (displayType) {
            case 'TEXT': {
                return (
                    <Input placeholder='' disabled />
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
            // case 'SELECT':{
            //     _valueRange=valueRange?valueRange:"";
            //     const optionArr = _valueRange.split("|");
            //     let localCounter = 1;
            //     return (
            //         <Select
            //             style={{width:210}}>
            //             {
            //                 optionArr.map((itm)=>{
            //                     return (
            //                         <Select.Option key={localCounter++} value={itm}>{itm}</Select.Option>
            //                     )
            //                 })
            //             }
            //         </Select>
            //     );
            // }
            case 'DATE': {
                return (
                    <DatePicker

                        format={DATE_FORMAT_MOMENT}
                    />
                )
            }
            case 'TIME': {
                return (
                    <TimePicker
                        placeholder="请选择时间"
                        format="HH:mm:ss"

                    />
                );
            }
            // case 'MULTISELECT':{
            // 	_valueRange=valueRange?valueRange:"";  
            //     const chkboxArr = _valueRange.split("|");
            //     let options = [];
            //     chkboxArr.forEach((itm) => {    
            //     	options.push({label:itm,value:itm});
            //     })
            //     return (
            //             <CheckboxGroup options={options} />
            //     );
            // }
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

    toDetail = () => {
        let path = {
          pathname: '/eventDriven/edamiddleware/detail/' + this.props.id
        };
        goTo(path, "事件中间件详情");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let store = sessionStorage.getItem('$pandora_auth.user_info')
                let userId = JSON.parse(store).userId
                let reqSeqNo = randomNamber()
                let par = values
                par.publishDate = this.timer1(values.publishDate)
                let param = {
                    'edaMiddleware': { ...par, lastupdateuserid: userId },
                    reqSeqNo: reqSeqNo,
                };

                this.setState({ loading: true });
                this.toSure(param)

            }
        })
    }
    toSure = (param) => {

        let id = this.props.id;
        let _this = this;
        Modal.confirm({
            title: "确认中间件配置无误",
            content: <div>
                <div className='pro'>
                    <span>中间件中文全称：</span>
                    <span>{param.edaMiddleware.middlewareChName}</span>
                </div>
                <div className='pro'>
                    <span>中间件英文全称：</span>
                    <span>{param.edaMiddleware.middlewareEngName}</span>
                </div>
                <div className='prod'>
                    <span>中间件所有物理集群：</span>

                    <textarea disabled style={{ width: '465px', minHeight: '50px', borderBottom: '0', borderTop: '0' }}>{param.edaMiddleware.clasterArr}</textarea>
                </div>
                {/* <div className='pro'>
                    <span>中间件类型：</span>
                    <span>{_this.LEIXING(param.edaMiddleware.middlewareType)}</span>
                </div>

                <div className='pro'>
                    <span>中间件部署：</span>
                    <span>{_this.BUSHU(param.edaMiddleware.middlewareDeploymentUnit)}</span>
                </div> */}
                <div className='pro'>
                    <span>状态：</span>
                    <span>{_this.zhuangtai(param.edaMiddleware.status)}</span>
                </div>
                <div className='pro' >
                    <span>版本：</span>
                    <span>{param.edaMiddleware.version}</span>
                </div>
                <div className='pro'>
                    <span>上线日期：</span>
                    <span>{_this.timer(param.edaMiddleware.publishDate)}</span>
                </div>
            </div>,
            onOk() {
                _this.setState({ loading: true });

                $fetch({
                    url: '/tesla-gateway-console-app/eda/editEdaMiddleware',
                    data: param
                }).then(res => {
                    if (res.reply.returnCode.type == "S") {
                        _this.messages();
                    }
                });
            },
            onCancel() {
                message.info('取消');


            },
        });
    }
    messages = () => {
        let id = this.props.id;
        let _this = this;
        Modal.confirm({
            title: "状态",
            content: <div>
                修改完成，点击确认将回到列表页

            </div>,
            onOk() {
                _this.setState({ loading: true });

                let path = {
                  pathname: '/eventDriven/edamiddleware/index'
                };
                goToAndClose(path, "事件中间件查询");

            },
            onCancel() {
                message.info('取消');


            },
        });
    }
    zhuangtai = (v) => {
        if (v == 'Y') {
            return '有效'
        }
        if (v == 'N') {
            return '无效'
        }


    }
    LEIXING = (v) => {
        if (v == 'KF') {
            return 'Kafka'
        }
        if (v == 'am') {
            return 'ActiveMQ'
        }
        if (v == 'al') {
            return 'AliMQ'
        }

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
    timer = (t) => {

        return moment(t).format('YYYY-MM-DD')
    }
    timer1 = (t) => {

        return moment(t).format('YYYYMMDD')
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 20 }
        }
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='middlewareedit'>
                <Form onSubmit={this.handleSubmit}>
                    <Row >
                        <FormItem {...formItemLayout} label='中间件中文全称：'>
                            {getFieldDecorator('middlewareChName', {
                                initialValue: this.state.formData.middlewareChName,
                            })(
                                this.displayField('TEXT', 'status', '')
                                )}
                        </FormItem>
                        <FormItem {...formItemLayout} label='中间件英文全称：'>
                            {getFieldDecorator('middlewareEngName', {
                                initialValue: this.state.formData.middlewareEngName,
                            })(
                                this.displayField('TEXT', 'version', '')
                                )}
                        </FormItem>
                        <FormItem  {...formItemLayout} label='中间件所有物理集群:'
                        >
                            {getFieldDecorator('clusterName', {
                                initialValue: this.state.formData.clusterName,
                                rules: [

                                    { required: false, message: '中间件所有物理集群' }
                                ]
                            })(
                                <Input type='textarea' autosize disabled />
                                )}
                        </FormItem>
                        <FormItem style={{ display: 'none' }}
                        >
                            {getFieldDecorator('middlewareType', {
                                initialValue: "",
                                rules: [
                                    { pattern: this.getLenAndRegExpFromText(0, '').regExp, message: '数据格式不正确' },
                                    {
                                        max: this.getLenAndRegExpFromText(0, '').len,
                                        message: '数据长度过长'
                                    },
                                    { required: false, message: '请输入中间件类型' }
                                ]
                            })(
                                // <Select value={'KF'} type='hidden'>
                                //     <Option value="KF">Kafka</Option>
                                //     <Option value="am">ActiveMQ</Option>
                                //     <Option value="al">AliMQ</Option>
                                // </Select>
                                <Input type='hidden' />
                                )}
                        </FormItem>
                        <FormItem style={{ display: 'none' }}
                        >
                            {getFieldDecorator('middlewareDeploymentUnit', {
                                initialValue: "",
                                rules: [
                                    { pattern: this.getLenAndRegExpFromText(0, '').regExp, message: '数据格式不正确' },
                                    {
                                        max: this.getLenAndRegExpFromText(0, '').len,
                                        message: '数据长度过长'
                                    },
                                    { required: false, message: '请输入中间件部署' }
                                ]
                            })(
                                // <Select value={'M'} type='hidden'>
                                //     <Option value="M">M-马坡</Option>
                                //     <Option value="P">P-鹏博士</Option>
                                //     <Option value="Z">Z-郑州</Option>
                                // </Select>
                                <Input type='hidden' />
                                )}
                        </FormItem>
                        <FormItem label="状态："  {...formItemLayout}>
                            {getFieldDecorator('status', {
                                initialValue: this.state.formData.status,
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                            })(<Select value={'NDNT'} >
                                <Option value="Y">有效</Option>
                                <Option value="N">无效</Option>
                            </Select>)}
                        </FormItem>
                        <FormItem label="版本"  {...formItemLayout}>
                            {getFieldDecorator('version', {
                                initialValue: this.state.formData.version,
                                rules: [
                                    {
                                        required: true
                                    },
                                ],
                            })(<Input disabled />)}
                        </FormItem>
                        <div className='tDates'>
                            <FormItem label="上线日期：" {...formItemLayout}>
                                {getFieldDecorator('publishDate', {
                                    initialValue: moment(this.state.formData.publishDate),
                                    rules: [

                                        { required: true, message: '请输入上线日期' }
                                    ],
                                })(
                                    (<DatePicker />)
                                    )}
                            </FormItem>
                        </div>



                    </Row>

                    <FormItem wrappercol={{ span: 19, offset: 5 }}>
                        <Button htmlType="submit" className="operatorBtn" style={{ marginLeft: 0, width: 88, fontSize: 16, borderRadius: 5 }}>提交</Button>
                        <Button onClick={this.toDetail} className="cancelBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>取消</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrapperEditForm = Form.create()(EditForm);