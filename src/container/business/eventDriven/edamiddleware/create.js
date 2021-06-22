import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input } from 'antd';
import { randomNamber, deploy } from './../../../../util/publicFuc';
import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';
import TemplateForm from './templateForm'
import './../../../common/style/index.less';
import './create.less'
import { goTo, goToAndClose } from '../../../../util/tabRouter';
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
                            <TabPane tab="创建事件中间件逻辑集群" key="1">
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
            dataParent: {},
            List: [],
            flag: false,
        }
    }

    componentDidUpdate() {

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
    shuzi = (rule, value, callback) => {
        //console.log(value);

        callback()

    }
    addZero = (val) => {
        return val > 9 ? val : ('0' + val);
    }



    handleSubmit = () => {
        //e.preventDefault();  
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {


                this.setState({

                    dataParent: values
                });
                let par = values
                //console.log('251', this.state.List);
                par.publishDate = this.timer1(values.publishDate)
                let drunitArr = []
                let deployUnitArr = []
                let num = 0;

                if (this.state.List[0]) {
                    this.state.List.map((item) => {
                        item.publishDate = this.timer1(item.publishDate)
                        if (item.drunit) {
                            drunitArr.push(item.drunit)
                        }
                        deployUnitArr.push(item.deployUnit)
                    })
                    drunitArr.map((items) => {
                        if (deployUnitArr.indexOf(items) > -1) {
                            num++
                        }
                    })
                    if (num == drunitArr.length) {
                        let store = sessionStorage.getItem('$pandora_auth.user_info')
                        let userId = JSON.parse(store).userId
                        let reqSeqNo = randomNamber()
                        let param = {
                            'edaMiddleware': {
                                ...par,
                                createUserId: userId, list: this.state.List
                            },

                            reqSeqNo: reqSeqNo,
                        };
                        //console.log('282', param);
                        this.toSure(param)
                    } else {
                        alert('存在未找到部署集群的灾备集群，请点击“+”创建一个相匹配的物理集群')
                        return false
                    }

                }

            }
        })
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

    zaibei = (v) => {
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
            return '未设置'
        }
    }

    timer = (t) => {
        return moment(t).format('YYYY-MM-DD')
    }
    timer1 = (t) => {
        return moment(t).format('YYYYMMDD')
    }
    toSure = (param) => {
        let id = this.props.id;
        let _this = this;
        Modal.confirm({
            title: "确认生产者配置无误",
            content: <div>
                <div className='pro'>
                    <span>中间件英文全称:</span>
                    <span>{param.edaMiddleware.middlewareEngName}</span>
                </div>
                <div className='pro'>
                    <span>中间件中文全称:</span>
                    <span>{param.edaMiddleware.middlewareChName}</span>
                </div>

                <div className='pro'>
                    <span>上线日期：</span>
                    <span>{_this.timer(param.edaMiddleware.publishDate)}</span>
                </div>
                {
                    param.edaMiddleware.list[0] ? param.edaMiddleware.list.map((item) => {

                        return (
                            <div>
                                <br />

                                <div className='pro'>
                                    <span>集群名称：</span>
                                    <span>{item.clusterName}</span>
                                </div>
                                <div className='prod'>
                                    <span>集群接入：</span>
                                    <span>{item.clusterAddress}</span>
                                </div>
                                <div className='prod'>
                                    <span>中间件管理入口：</span>
                                    <span>{item.adminAddress}</span>
                                </div>
                                <div className='prod'>
                                    <span>中间件版本：</span>
                                    <span>{item.middlewareVer}</span>
                                </div>
                                <div className='prod'>
                                    <span>生产者启动配置:</span>
                                    <span>{item.producerInitConfig}</span>
                                </div>
                                <div className='prod'>
                                    <span>消费者启动配置:</span>
                                    <span>{item.consumerInitConfig}</span>
                                </div>
                                <div className='pro'>
                                    <span>中间件类型：</span>
                                    <span>{_this.LEIXING(item.middlewareType)}</span>
                                </div>
                                <div className='pro'>
                                    <span>中间件部署:</span>
                                    <span>{deploy(item.deployUnit)}</span>
                                </div>
                                <div className='pro'>
                                    <span>中间件灾备部署：</span>
                                    <span>{_this.zaibei(item.drunit)}</span>
                                </div>
                                <div className='pro'>
                                    <span>接入用户：</span>
                                    <span>{item.accessUser}</span>
                                </div>
                                <div className='pro'>
                                    <span>接入安全协议：</span>
                                    <span>{item.accessProtocol}</span>
                                </div>
                                <div className='pro'>
                                    <span>是否支持单一生产者投递多个主题事件：</span>
                                    <span>{item.isSingletonProducer == 'Y' ? '支持' : '不支持'}</span>
                                </div>
                                <div className='pro'>
                                    <span>是否支持单一消费者消费多个主题事件：</span>
                                    <span>{item.isSingletonConsumer == 'Y' ? '支持' : '不支持'}</span>
                                </div>
                                <div className='pro'>
                                    <span>状态：</span>
                                    <span>有效</span>
                                </div>
                                <div className='pro'>
                                    <span>上线日期:</span>
                                    <span>{_this.timer(item.publishDate)}</span>
                                </div>

                            </div>
                        )
                    }) : null
                }
            </div>,
            onOk() {

                $fetch({
                    url: '/tesla-gateway-console-app/eda/createEdaMiddleware',
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
                创建完成，点击确认将回到列表页

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
    onSubmit = (map) => {
        this.setState({
            List: map
        }, () => {
            this.handleSubmit()
        })


    }

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='middleware'>
                <Form >
                    <Row >


                        <FormItem autoComplete='on' hasFeedback {...formItemLayout} label='中间件英文全称:'
                        >
                            {getFieldDecorator('middlewareEngName', {
                                initialValue: "",
                                rules: [
                                    { pattern: /^[0-9a-zA-Z_]+$/g, message: '数据格式不正确' },
                                    {
                                        max: this.getLenAndRegExpFromText(0, '').len,
                                        message: '数据长度过长'
                                    },
                                    { validator: this.shuzi },
                                    { required: true, message: '请输入中间件英文全称' }
                                ]
                            })(
                                this.displayField('TEXT', 'middlewareEngName', '')
                                )}

                        </FormItem>
                        <FormItem hasFeedback {...formItemLayout} label='中间件中文全称:'
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
                            <span style={{ marginLeft: '1px' }}>(例如：事件中间件一)</span>
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
                        <div className='midDate'>
                            <FormItem label="上线日期" hasFeedback {...formItemLayout}>
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




                    </Row>

                    <WrapperCreateForm1 callbackParent={this.onSubmit} ></WrapperCreateForm1>


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
        this.newTabIndex = 1;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 20 }
        }

        const panes = [
            {

                title: '',
                content: '',
                key: '1'
            },


        ]

        this.state = {
            activeKey: "",
            panes:[],
            childDate: []

        }

    }

    componentDidMount() {

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
            labelCol: { span: 5 },
            wrapperCol: { span: 10 }
        }
        const { getFieldDecorator } = this.props.form;

        const panes = this.state.panes;
        // const panes =this.props.form;
        const activeKey = `物理集群${this.newTabIndex++}`;
        // if (panes[0].title == '') {
        //     panes.shift()
        // }
        panes.push({
            title: `新建${activeKey}`,
            formFields: {
                //test:`test-${activeKey}`,
                //test1:`test1-${activeKey}`
            },
            key: activeKey
        })

        this.setState({
            panes, activeKey
        },()=>{
          console.log(panes,activeKey)
        })
    }
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        const panes = this.state.panes.filter(pane => pane.key !== targetKey)
        activeKey = panes.length>0?panes[panes.length-1].key:""
            this.setState({
                panes,
                activeKey
            },()=>{
              console.log(panes,activeKey)
            })

    }
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
    toIndex = () => {
      let path = {
        pathname: '/eventDriven/edamiddleware/index'
      };
      goToAndClose(path, "事件中间件查询");
    }
    handleSubmit1 = (e) => {
        const { getFieldValue } = this.props.form
        let childDate = []
        if (this.state.panes.length > 0) {
            for (let i = 0; i < this.state.panes.length; ++i) {
                childDate.push(this.state.panes[i].formFields)
            }
        }
        this.setState({
            childDate
        }, () => {
            // console.log('843', this.state.childDate);
            this.props.callbackParent(this.state.childDate)
        })

    }
    handleFormChange = (paneObj) => {
        return (changeFields) => {
            for (let key in changeFields) {
                paneObj.formFields[key] = changeFields[key].value
            }
        }
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10 }
        }
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='edamiddleForm' >
                <Form onSubmit={this.handleSubmit1} autoComplete='on'>
                    <div style={{ height: '30px', color: '#000', textAlign: 'right' }}>点击下方“+”添加物理集群</div>
                    <Tabs

                        className='tabbb'
                        onChange={this.onChangeTab}
                        activeKey={this.state.activeKey}
                        type='editable-card'
                        onEdit={this.onEditTab}

                    >

                        {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} >
                            {pane.formFields ?
                                <TemplateForm  {...pane.formFields} DRUnitArr={this.state.DRUnitArr} onChange={this.handleFormChange(pane)} /> : pane.content}

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

