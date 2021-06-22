import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from '$moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input } from 'antd';

import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';
import { randomNamber } from './../../../../util/publicFuc';

import './../../../common/style/index.less';
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class DatabaseEdit extends React.Component {

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
                            <TabPane tab="编辑规则名称" key="1">
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
            formData: []
        }
    }

    componentDidMount() {
        let id = this.props.id;
        let reqSeqNo = randomNamber()

        $fetch({
            url: '/tesla-gateway-console-app/eda/queryEdaDatabasePartationRulesDetail',
            data: { ruleName: id, reqSeqNo: reqSeqNo }
        }).then(res => {

            if (res.reply.returnCode.type == "S") {
                //console.log('73', res)
                this.setState({
                    formData: res.reply.rules,
                    loading: false
                });
            }
        });
    }

    displayField = (displayType, name, valueRange) => {
        switch (displayType) {
            case 'TEXT': {
                return (
                    <Input placeholder='' style={{ width: 210 }} />
                )
            }
            case 'NUMBER': {
                return (
                    <Input type="number" style={{ width: 210 }} />
                );
            }
            case 'FLOAT': {
                return (
                    <Input placeholder='' style={{ width: 210 }} />
                )
            }
            case 'SELECT': {
                _valueRange = valueRange ? valueRange : "";
                const optionArr = _valueRange.split("|");
                let localCounter = 1;
                return (
                    <Select
                        style={{ width: 210 }}>
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
                        style={{ width: 210 }}
                        format={DATE_FORMAT_MOMENT}
                    />
                )
            }
            case 'TIME': {
                return (
                    <TimePicker
                        placeholder="请选择时间"
                        format="HH:mm:ss"
                        style={{ width: 210 }}
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

    toDetail = () => {
      let path = {
        pathname: '/eventDriven/database/index'
      };
      goToAndClose(path, "分库分表查询");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let par = values
                let reqSeqNo = randomNamber()

                let store = sessionStorage.getItem('$pandora_auth.user_info')
                let userId = JSON.parse(store).userId
                par.publishDate = this.timer1(values.publishDate)
                let param = {
                    'edaDatabasePartationRules': { ...par, lastUpdateUserId: userId },
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
            title: "确认规则配置无误",
            content: <div>
                <div className='pro' style={{ borderTop: '1px solid #ccc' }}>
                    <span>规则名称：</span>
                    <span>{param.edaDatabasePartationRules.ruleName}</span>
                </div>

                <div className='prod' >
                    <span>分库分表规则：</span>
                    <textarea disabled style={{ width: '465px', minHeight: '200px', borderBottom: '0', borderTop: '0' }}>{param.edaDatabasePartationRules.rules}</textarea>
                </div>
                <div className='pro' >
                    <span>版本：</span>
                    <span>{param.edaDatabasePartationRules.version}</span>
                </div>

                <div className='pro'>
                    <span>上线日期：</span>
                    <span>{_this.timer1(param.edaDatabasePartationRules.publishDate)}</span>
                </div>
            </div>,
            onOk() {
                _this.setState({ loading: true });
                $fetch({
                    url: '/tesla-gateway-console-app/eda/editEdaDatabasePartationRules',
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
                  pathname: '/eventDriven/database/index'
                };
                goToAndClose(path, "分库分表查询");

            },
            onCancel() {
                message.info('取消');


            },
        });
    }

    timer1 = (t) => {

        return moment(t).format('YYYY-MM-DD')
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 15 }
        }
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Row >
                    <FormItem label="规则名称：" {...formItemLayout}>
                        {getFieldDecorator('ruleName', {
                            initialValue: this.state.formData.ruleName,
                            rules: [
                                {
                                    required: true, message: '请输入规则名称'
                                },
                            ],
                        })(<Input disabled />)}
                    </FormItem>
                    <FormItem label="分库分表规则："  {...formItemLayout}>
                        {getFieldDecorator('rules', {
                            initialValue: this.state.formData.rules,
                            rules: [

                                { required: true, message: '请输入分库分表规则' }
                            ],
                        })(
                            <Input type='textarea' style={{ height: '200px' }} />
                            )}
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
                    <div className='tDate'>
                        <FormItem label="上线日期"  {...formItemLayout}>
                            {getFieldDecorator('publishDate', {
                                initialValue: moment(this.state.formData.publishDate),
                                rules: [
                                    {
                                        required: true, message: '请选择上线日期'
                                    },
                                ],
                            })(<DatePicker />)}
                        </FormItem>
                    </div>

                    <FormItem wrappercol={{ span: 19, offset: 5 }}>
                        <Button htmlType="submit" className="operatorBtn" style={{ marginLeft: 50, width: 88, fontSize: 16, borderRadius: 5 }}>提交</Button>
                        <Button onClick={this.toDetail} className="cancelBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>取消</Button>
                    </FormItem>
                </Row>
            </Form>
        );
    }
}

const WrapperEditForm = Form.create()(EditForm);