import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input, Radio } from 'antd';

import { DATE_FORMAT_MOMENT, DATE_REQUEST_FORMAT, MESSAGE_SEND } from './../../../../constant/index';
import $fetch from '$fetch';
import { randomNamber } from './../../../../util/publicFuc';
import SelectSubModule from  "../../../../component/selectSubModule/selectCommonSubModule"
import './../../../common/style/index.less';
import './index.less'
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class MessageSend extends React.Component {

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
            <div className='messagesend'>
                <div className="pandora-main-content">
                    <div className="portlet-tab">
                        <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
                            <TabPane tab="查询" key="1">
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
        this.state = {
            valueRadio: 'S',
            valueRadioM: '',
            valueRadioS: '',
            moduleData: [],
            module2Data: [],
            module3Data: [],
            module4Data: [],
            arrUrl: [],

            pagination: {
                page: 1,
                size: 10,
            },
        }
    }
    componentDidMount() {
        let _this = this
        let url = '/tesla-gateway-console-app/eda/queryUsableServers.json'
        $.get(url, function (res, status) {
            if (status == "success") {

                _this.setState({
                    arrUrl: res.reply.result
                })
            }
        })

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

    toIndex = () => {
        let path = {
          pathname: '/eventDriven/app/index'
        };
        goToAndClose(path, "事件驱动首页");
    }
    forDate = (date) => {
        let t = moment(date)
        console.log(t)

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log('256', err)
            console.log('257', values)
            //if(!err){

            let reqSeqNo = randomNamber()
            let searchType = this.state.valueRadio
            let par = values;
            par.url = 'http://' + par.url[0]
            // par.submoduleId = submoduleId;
            // par.consumerId = par.submoduleId + par.consumerId;
            par.date = this.timer1(values.date).toString()
            if (par.start != '') {
                par.start = this.timer2(par.start).toString()
            }
            if (par.end != '') {
                par.end = this.timer2(par.end).toString()
            }
            if (this.state.valueRadio == 'S') {
                let param = {
                    date: par.date,
                    businessKey: values.businessKey,
                    page: this.state.pagination.page,
                    size: this.state.pagination.size,
                }

                let _this = this
                let url1 = par.url + '/eda/query/byBusinessKey'


                $.get(url1, param, function (res, status) {
                    if (status == "success") {
                        let arr = []
                        for (var key in res) {
                            for (var i = 0; i < res[key].length; i++) {
                                res[key][i].datasource = key
                                arr.push(res[key][i])
                            }

                        }
                        console.log('294', arr);
                        const _pagination = _this.state.pagination;
                        _pagination.total = res.total;
                        _pagination.current = res.pageNum
                        _this.setState({
                            pagination: _pagination,

                        }, () => {
                            let path = {
                                pathname: '/eventDriven/messageSend/send',
                                state: {
                                    state: arr,
                                    par: par,
                                    pagination: _this.state.pagination
                                }
                            }
                            goTo(path,"消息重投递列表");
                        });

                    }
                })
            } else if (this.state.valueRadio == 'D') {
                let _this = this
                let param = {
                    date: par.date,
                    datasourceId: values.datasourceId,
                    topicName: values.topicName[0],
                    start: values.start,
                    end: values.end,
                    status: values.status,
                    page: this.state.pagination.page,
                    size: this.state.pagination.size,
                }
                if (param.topicName[0] == '') {
                    delete param.topicName
                }
                if (param.start == '') {
                    delete param.start
                }
                if (param.end == '') {
                    delete param.end
                }
                if (param.status == '') {
                    delete param.status
                }
                console.log(368, param);
                let url2 = par.url + '/eda/query/byTimeAndTopicName'
                console.log(370, url2);
                $.get(url2, param, function (res, status) {
                    console.log('270', res, status);
                    if (status == "success") {
                        for (var i = 0; i < res.list.length; i++) {
                            res.list[i].datasource = param.datasourceId
                        }
                        const _pagination = _this.state.pagination;
                        _pagination.total = res.total;
                        _pagination.current = res.pageNum
                        _this.setState({
                            pagination: _pagination,

                        }, () => {
                            let path = {
                                pathname: '/eventDriven/messageSend/send',
                                state: {
                                    state: res.list,
                                    par: par,
                                    pagination: _this.state.pagination
                                }
                            }
                            goTo(path,"消息重投递列表");
                        });

                    }
                })
            }

        })
    }
    timer = (t) => {

        return moment(t).format('YYYY-MM-DD')
    }
    timer1 = (t) => {

        if (t != '') {
            return moment(t).format('YYYYMMDD')
        } else {
            return ''
        }

    }
    timer2 = (t) => {

        if (t != '') {
            return moment(t).format('HHmmss')
        } else {
            return ''
        }

    }


    onChangeRadio = (val) => {
        console.log('358', val.target.value)
        let reqSeqNo = randomNamber()
        this.setState({
            valueRadio: val.target.value,

        }, () => {


        })

    }

    cengji = (itm) => {
        if (itm == '01') {
            return '行内渠道接入层';
        } else if (itm == '02') {
            return '行外渠道接入层';
        } else if (itm == '03') {
            return '业务协同层';
        } else if (itm == '04') {
            return '服务集成层';
        } else if (itm == '05') {
            return '产品服务层';
        } else if (itm == '06') {
            return '管理分析层';
        } else {
            return '业务协同层'
        }
    }
    onRef = (ref) => {
        this.child = ref
    }
    click = (e) => {
        this.child.forDate()
        //console.log('209');
    }
    onChildQuery = (map) => {
      this.props.form.resetFields(["topicName"]);
      if(map===""){
        this.setState({
          module4Data: []
        })
        return;
      }

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
    topicData = (data) => {

        this.props.form.setFieldsValue({
            "topicName": [],

        })
        this.setState({
            module4Data: data,

        })
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 19 }
        }
        const { getFieldDecorator } = this.props.form;
        console.log('437', this.state.module2Data)
        return (
            <div className='messageSend'>
                <Form onSubmit={this.handleSubmit} autoComplete='on'>


                    <div className='eventNum' >
                        <FormItem label="地址端口："  {...formItemLayout}>
                            {getFieldDecorator('url', {
                                // initialValue: '',
                                rules: [

                                    {
                                        required: true,
                                        message: '请选择地址',
                                        type: 'array'
                                    },
                                ],
                            })(
                                <Select showSearch mode="tags" maxTagCount={1} onChange={value => {
                                    setTimeout(() => {
                                        this.props.form.setFieldsValue({
                                            'url': value.length === 0 ? [...value] : [value[value.length - 1]]
                                        })
                                    });
                                }}  >
                                    {
                                        this.state.arrUrl.map((item) => {

                                            return (
                                                <Option value={item} >{item}</Option>
                                            )
                                        })
                                    }

                                </Select>
                                )}
                        </FormItem>


                    </div>
                    <FormItem >

                        <div>
                            <RadioGroup onChange={this.onChangeRadio} value={this.state.valueRadio} style={{ width: '100%' }} >
                                <div style={{ display: 'inline-block', width: '16.6%', color: '#000' }}>查询方式：</div>
                                <Radio value='S' >事件标识(businessKey)</Radio>
                                <Radio value='D'>数据源(datasourceId)</Radio>
                            </RadioGroup>

                        </div>


                    </FormItem>
                    <div className='eventNum' style={{ display: this.state.valueRadio == 'S' ? 'block' : 'none' }}>
                        <FormItem label="事件标识(businessKey)：" {...formItemLayout}>
                            {getFieldDecorator('businessKey', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true, message: '请输入事件编号'
                                    },
                                ],
                            })(
                                <Input />
                                )}
                        </FormItem>
                    </div>
                    <div className='eventNum' style={{ display: this.state.valueRadio == 'D' ? 'block' : 'none' }}>

                        <FormItem label="数据源(datasourceId)"  {...formItemLayout}>
                            {getFieldDecorator('datasourceId', {
                                initialValue: 'datasource1',
                                rules: [
                                    {
                                        required: true, message: '请输入datasourceId'
                                    },
                                ],
                            })(<Input />)}
                        </FormItem>
                        <SelectSubModule callbackParent={this.onChildQuery} />
                        {/* <FormItem label="主题名称："  {...formItemLayout} >

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
                        <FormItem label="主题名称（必输）："  {...formItemLayout} >

                            {getFieldDecorator('topicName', {

                                rules: [
                                    {
                                        required: true,
                                        message: '请输入主题名称(TopicName)',
                                        type: 'array'
                                    },
                                ],
                            })(

                                <Select mode="tags" maxTagCount={1} onChange={value => {
                                    //console.log(232311111,this.props.form.getFieldsValue())


                                    setTimeout(() => {
                                        this.props.form.setFieldsValue({
                                            'topicName': value.length === 0 ? [...value] : [value[value.length - 1]]
                                        })
                                    });
                                }}   >

                                    {
                                        this.state.module4Data.map((item) => {

                                            return (
                                                <Select.Option key={item.toString() + '1'} value={item.toString()}>{item}</Select.Option>
                                            )
                                        })
                                    }

                                </Select>

                                )}

                        </FormItem>
                        <FormItem label="状态"  {...formItemLayout}>
                            {getFieldDecorator('status', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: false, message: '请选择状态'
                                    },
                                ],
                            })(<Select >
                                <Option value="S">成功</Option>
                                <Option value="F">失败</Option>
                            </Select>)}
                        </FormItem>
                        <FormItem label="起始时间"  {...formItemLayout}>
                            {getFieldDecorator('start', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: false, message: '请选择起始时间'
                                    },
                                ],
                            })(<TimePicker />)}
                        </FormItem>
                        <FormItem label="结束时间"  {...formItemLayout}>
                            {getFieldDecorator('end', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: false, message: '请选择结束时间'
                                    },
                                ],
                            })(<TimePicker />)}
                        </FormItem>

                    </div>

                    <FormItem label="查询日期"  {...formItemLayout}>
                        {getFieldDecorator('date', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true, message: '请选择起始日期'
                                },
                            ],
                        })(<DatePicker />)}
                    </FormItem>


                    <div>
                        <Button htmlType="submit" className="operatorBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>查询</Button>
                        <Button onClick={this.toIndex} className="cancelBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>取消</Button>
                    </div>

                </Form>
            </div>
        );
    }
}


const WrapperCreateForm = Form.create()(CreateForm);