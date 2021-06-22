import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input, Radio } from 'antd';

import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';
import { randomNamber } from './../../../../util/publicFuc';
import SelectSubModule from  "../../../../component/selectSubModule/selectCommonSubModule"
import './../../../common/style/index.less';
import './queryPosition.less'
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class QueryPosition extends React.Component {

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
        wrapperCol: { span: 16 }
    }
        return (
            <div className='queryPosition'>
                <div className="pandora-main-content">
                    <div className="portlet-tab">
                        <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
                            <TabPane tab="登录" key="1">
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
            moduleConsumer: [],
            pagination: {
                pageSize: 2,
                pageSizeChanger: true,
                current: 1
            },
        }
    }
    componentDidMount() {

        let reqSeqNo = randomNamber()
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
      }
      goTo(path,"事件驱动首页");
    }
    forDate = (date) => {
        let t = moment(date)
        //console.log(t)

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {


            let reqSeqNo = randomNamber()

            let par = values;

            par.topicName = par.topicName[0]
            par.tableSuffix = this.timer(values.tableSuffix)

            let searchType = 'S'
            let param = {
                'edaMsgRedeliver': {
                    ...par, searchType,

                },

                reqSeqNo: reqSeqNo,
            };
            //console.log('271', param)
            // this.setState({loading: true});
            $fetch({
                url: '/tesla-gateway-console-app/eda/queryEdaMsgRedeliver',
                data: param
            }).then(res => {
                if (res.reply.returnCode.type == "S") {
                    if (JSON.stringify(res.reply.edaMsgRedeliver) == '[]') {
                        this.toSure()
                    } else {
                        let msg = {
                            offset: res.reply.edaMsgRedeliver[0].offset,
                            partition: res.reply.edaMsgRedeliver[0].msgPartition,
                            topicName: par.topicName
                        }
                        let path = {
                            pathname: '/eventDriven/messageTrack/single',
                            state: msg,

                        }
                        goTo(path,"消息轨迹查询");
                    }
                    // console.log(path)

                }

            });

            //}
        })
    }

    toSure = () => {


        let _this = this;
        Modal.confirm({
            title: "分环境查询",
            content: <div>
                该环境暂无数据
            </div>,
            onOk() {

            },
            onCancel() {
                message.info('取消');
            },
        });
    }
    timer = (t) => {
        if (t != '') {
            return moment(t).format('MMDD')
        } else {
            let a = new Date()
            return moment(a).format('MMDD')
        }

    }


    onChangeRadio = (val) => {
        //console.log('358', val.target.value)
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
        console.log('376');
    }
    click = (e) => {
        this.child.forDate()
        console.log('209');
    }
    onChildQuery = (map) => {
        console.log('383', map);
        this.props.form.resetFields(['topicName', 'consumerId']);
        let subModuleId = map
        this.setState({
            subModuleId
        })
      if(map===""){
        this.setState({
          module4Data: [],
          moduleConsumer: []
        })
        return;
      }
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
            }, () => {

            });
            console.log('419', this.state.module4Data)
        });
    }
    topicChange = (e) => {
        this.queryConsumerId(e)
        this.props.form.resetFields(['consumerId']);
    }
    topicData = (data) => {

        this.props.form.setFieldsValue({
            "topicName": [],
            'consumerId': ''
        })
        this.setState({
            module4Data: data,
            moduleConsumer: data
        })
    }
    queryConsumerId = (e) => {
        let reqSeqNo = randomNamber()
        let topicName = e
        $fetch({
            url: '/tesla-gateway-console-app/eda/queryEdaSubscribeByParam',
            data: {
                topicName, reqSeqNo
            }
        }).then((res) => {
            let req = res.reply.resultList.subscribeList
            let arr = []
            for (var i = 0; i < req.length; i++) {
                arr.push(req[i].consumerId)
            }
            this.setState({
                moduleConsumer: arr
            })
            console.log(416, res);
        })
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 10 }
        }
        const { getFieldDecorator } = this.props.form;
        //console.log('437', this.state.module2Data)
        return (
            <div className='queryPosition'>
                <div className="maskc" style={{ display: this.state.a ? 'block' : 'none' }}></div>
                <div className="maskc1" style={{ display: this.state.a ? 'block' : 'none' }}>正在查询...</div>
                <Form onSubmit={this.handleSubmit} autoComplete='on'>
                    <Row style={{ border: '1px solid #ccc', padding: '10px', paddingBottom: '0', marginBottom: '10px' }}>

                    <Col span={12}>

                        <FormItem label="数据库地址"  {...formItemLayout}
                            labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}
                        >

                            {getFieldDecorator('dbIP', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true, message: '请输入IP地址'
                                    },
                                ],
                            })(
                                <Input type="text" style={{ width: '50%' }} />
                                )}
                            <span style={{ marginLeft: '50px' }}>(例如：197.3.128.240)</span>
                        </FormItem>
                        </Col>
                    <Col span={12}>
                        <FormItem label="数据库端口"  {...formItemLayout}
                            labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
                            {getFieldDecorator('dbPort', {
                                initialValue: '',
                                rules: [
                                    { pattern: /^[0-9]{4}$/g, message: '端口号为4位数字' },
                                    {

                                        required: true, message: '请输入端口号'
                                    },
                                ],
                            })(

                                <Input style={{ width: '50%' }} />

                                )}
                            <span style={{ marginLeft: '50px' }}>(仅支持数字输入，例如：3358)</span>
                        </FormItem>
                        </Col>
                    <Col span={12}>
                        <FormItem label="帐号："  {...formItemLayout}>
                            {getFieldDecorator('username', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true, message: '请输入帐号'
                                    },
                                ],
                            })(
                                <Input />
                                )}
                        </FormItem>
                        </Col>
                    <Col span={12}>
                        <FormItem label="密码："  {...formItemLayout}>
                            {getFieldDecorator('password', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true, message: '请输入密码'
                                    },
                                ],
                            })(
                                <Input type='password' />
                                )}
                        </FormItem>

                        </Col>
                    <Col span={12}>
                        <FormItem label="数据库类型："  {...formItemLayout}>
                            {getFieldDecorator('databaseType', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true, message: '请选择数据库'
                                    },
                                ],
                            })(<Select value={'MySQL'}>
                                <Option value="MySQL">mysql</Option>
                                <Option value="DB2">db2</Option>
                                <Option value="Oracle">oracle</Option>

                            </Select>)}
                        </FormItem>
                        </Col>

                    </Row >
                    <Row style={{ border: '1px solid #ccc', padding: '10px', paddingBottom: '0', marginBottom: '10px' }}>
                        <FormItem label="库名："  {...formItemLayout}>
                            {getFieldDecorator('databaseName', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true, message: '请输入库名'
                                    },
                                ],
                            })(
                                <Input />
                                )}
                        </FormItem>
                        <SelectSubModule callbackParent={this.onChildQuery} itemCol={3}/>
                        {/* <FormItem label="主题名称："  {...formItemLayout} >

                            {getFieldDecorator('topicName', {
                                initialValue: '',
                                rules: [

                                    {
                                        required: true,
                                        message: '请输入主题名称(TopicName)'
                                    },
                                ],
                            })(

                                <Select showSearch onChange={this.topicChange} >
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
                                    console.log(232311111, this.props.form.getFieldsValue())


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
                        <FormItem label="消费者id："  {...formItemLayout} >

                            {getFieldDecorator('consumerId', {
                                initialValue: '',
                                rules: [

                                    {
                                        required: false,
                                        message: '请选择消费者id'
                                    },
                                ],
                            })(

                                <Select showSearch  >
                                    {
                                        (JSON.stringify(this.state.moduleConsumer) != '[]') ? this.state.moduleConsumer.map((item) => {

                                            return (
                                                <Option value={item} >{item}</Option>
                                            )
                                        }) : null
                                    }

                                </Select>

                                )}

                        </FormItem>


                        <FormItem label="事件标识(businessKey):"  {...formItemLayout}>
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

                        <FormItem label="查询日期"  {...formItemLayout}>
                            {getFieldDecorator('tableSuffix', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: false, message: '请选择起始日期'
                                    },
                                ],
                            })(<DatePicker />)}
                        </FormItem>




                    </Row>

                    <div>
                        <Button htmlType="submit" className="operatorBtn" style={{ marginLeft: 50, width: 88, fontSize: 16, borderRadius: 5 }}>查询</Button>
                        <Button onClick={this.toIndex} className="cancelBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>取消</Button>
                    </div>

                </Form>
            </div>
        );
    }
}


const WrapperCreateForm = Form.create()(CreateForm);