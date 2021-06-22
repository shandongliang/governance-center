import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input, Radio } from 'antd';
import SelectSubModule from  "../../../../component/selectSubModule/selectCommonSubModule"
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';

import { randomNamber, ConsumeMode } from '../../../../util/publicFuc';

import { queryEdaConsumerList } from "../request/service"

import './../../../common/style/index.less';
import './consumerTopic.less';
const Option = Select.Option
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class ConsumerTopic extends React.Component {

    static contextTypes = {
        router: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            a: false
        }
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 }
        }
        return (
            <div>
                <div className="edasub">
                    <div className="pandora-main-content">
                        <div className="portlet-tab">
                            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
                                <TabPane tab="订阅关系过滤管理" key="1">
                                    <div className="portlet-body">
                                        <WrapperCreateForm></WrapperCreateForm>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
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
            subModuleId: '',
            idempotent: '',
            topicList: [],
            topicFilterList: [],
            consumerIdSelected: '',
            consumerId: [],
            clearTier: false
        }
    }
    componentDidMount() {
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
          pathname: '/eventDriven/edaSubscribe/index'
        };
        goToAndClose(path, "服务订阅查询");
    }
    forDate = (date) => {
        let t = moment(date)
        console.log(t)

    }
    handleSubmit = (e) => {
        console.log(e)
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let reqSeqNo = randomNamber();
                console.log('200', this.state.topicList)
                let arrFilter = []
                for (let i = 0; i < this.state.topicList.length; i++) {
                    let obj = {
                        topicName: '',
                        environmentType: [],
                        consumerId: this.state.consumerIdSelected,
                        submoduleId: this.state.subModuleId
                    }
                    obj.topicName = this.state.topicList[i].topicN
                    obj.environmentType = this.state.topicList[i].topicL
                    arrFilter.push(obj)
                }
                let param = {
                    reqSeqNo,
                    'filterTopicCfg': arrFilter
                }
                console.log('218', param);
                $fetch({
                    url: '/tesla-gateway-console-app/eda/registerFilterTopics',
                    data: param
                })
                    .then(res => {
                        if (res.reply.returnCode.type == "S") {
                            this.toSure();
                        }

                    });

            }
        })
    }

    timer1 = (t) => {
        console.log('t', t)
        return moment(t).format('YYYYMMDD')
    }

    timer = (t) => {
        console.log('t', t)
        return moment(t).format('YYYY-MM-DD')
    }

    toSure = () => {


        let _this = this;
        Modal.confirm({
            title: "订阅关系过滤管理",
            content: <div>
                提交成功！
            </div>,
            onOk() {
                _this.props.form.resetFields(['consumerId']);
                _this.setState({
                    consumerIdSelected: '',
                    consumerId: [],
                    submoduleId: '',
                    topicList: [],
                    clearTier: true
                })
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
            content:
                <div>
                    创建完成，点击确认将回到列表页
                </div>,
            onOk() {
                _this.setState({ loading: true });

                let path = {
                  pathname: '/eventDriven/edaSubscribe/index'
                };
                goToAndClose(path, "服务订阅查询");

            },
            onCancel() {
                message.info('取消');


            },
        });
    }

    queryTopic = (e) => {
        let reqSeqNo = randomNamber();
        this.setState({
            topicList: [],
        })
        let param = {
            reqSeqNo: reqSeqNo,
            subModuleId: this.state.subModuleId,
            consumerId: e
        }
        $fetch({
            url: '/tesla-gateway-console-app/eda/querySubscribeTopicNameListByParam',
            data: param
        }).then(res => {
            if (res.reply.returnCode.type == "S") {
                let subscribeList = res.reply.result.subscribeList
                let topicFilterConfigList = res.reply.result.topicFilterConfigList
                let arr = []
                let newArr = []

                for (var i = 0; i < subscribeList.length; i++) {
                    let topicObj = {
                        topicN: '',
                        topicL: ['DEV', 'SIT', 'UAT', 'VT', 'PROD']
                    }
                    topicObj.topicN = subscribeList[i].topicName

                    arr.push(topicObj)
                }
                for (var k = 0; k < arr.length; k++) {
                    let newArr2 = []
                    for (var j = 0; j < topicFilterConfigList.length; j++) {
                        for (var t = 0; t < topicFilterConfigList[j].topicsToFilter.length; t++) {
                            if (topicFilterConfigList[j].topicsToFilter[t] == arr[k].topicN) {
                                newArr = arr[k].topicL.filter((item) => {
                                    if (topicFilterConfigList[j].enviromentType == item) {
                                        return true
                                    } else {
                                        return false
                                    }
                                })
                                newArr2 = newArr2.concat(newArr)

                            }
                        }

                    }
                    arr[k].topicL = newArr2
                }
                this.setState({
                    topicList: arr,
                    consumerIdSelected: param.consumerId
                })
            }
        });
    }
    changeTopic = (e) => {

        let a = e
        return (e) => {
            console.log('492', e)
            console.log('496', a)
            let List = this.state.topicList
            for (let i = 0; i < List.length; i++) {
                if (a == i) {
                    List[i].topicL = e
                }
            }
            this.setState({
                topicList: List
            })
        }
    }
    //Tier组件props
    //执行完清空操作后由tier调用
    cancelClearTier = ()=>{
        this.setState({
            clearTier: false
        })
    }
    //Tier组件props
    //清空tier组件下方表单中存留的消费者编号（consumerId）
    //Tier组件props
    //更新tier组件下方表单中消费者编号
    onChildQueryConsumerId = (map) => {
      this.props.form.resetFields(["consumerId"]);
      this.setState({
        topicList: []
      })
      if(map===""){
        this.setState({
          consumerId: [],
          subModuleId: map
        })
        return;
      }

        let subModuleId = map;
        let reqSeqNo = randomNamber();
        let param = {
          edaConsumer: {
            submoduleId: subModuleId,
            page: {
              doPagination: false
            }
          }
        };
        queryEdaConsumerList(param).then(res => {
          let resultList = res.reply.consumerList.resultList
            let module5D = []
            for (let i = 0; i < resultList.length; i++) {
                module5D.push(resultList[i].consumerId)
            }
            this.setState({
                subModuleId,
                consumerId: module5D,
                disabledConsumer: false,
            });
        });
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 }
        }
        const { getFieldDecorator } = this.props.form;
        const options = [
            { label: 'DEV', value: 'DEV' },
            { label: 'SIT', value: 'SIT' },
            { label: 'UAT', value: 'UAT' },
            { label: 'VT', value: 'VT' },
            { label: 'PROD', value: 'PROD' },
        ]
        console.log('547', this.state.topicList);
        console.log('548', this.state.topicFilterList);
        return (
            <div className="consumerTopic">
                <div className="maskc" style={{ display: this.state.flag ? 'block' : 'none' }}></div>
                <SelectSubModule callbackParent={this.onChildQueryConsumerId}></SelectSubModule>
                <Form onSubmit={this.handleSubmit}>
                    <Row >
                        <FormItem label="消费者编号(ConsumerId)：" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('consumerId', {
                                initialValue: '',
                                rules: [
                                    {
                                        pattern: this.getLenAndRegExpFromText(60, '').regExp, message: '数据格式不正确'
                                    },
                                    {
                                        max: this.getLenAndRegExpFromText(60, '').len,
                                        message: '数据长度不能超过60位'
                                    },
                                    {
                                        required: true,
                                        message: '请输入消费者编号(ConsumerId)'
                                    },
                                ],
                            })(
                                <Select showSearch onChange={this.queryTopic} >
                                    {
                                        (JSON.stringify(this.state.consumerId) != '[]') ? this.state.consumerId.map((item) => {

                                            return (
                                                <Option value={item} >{item}</Option>
                                            )
                                        }) : null
                                    }

                                </Select>
                                )}
                        </FormItem>
                        {
                            this.state.topicList ? this.state.topicList.map((item, index) => {
                                return (
                                    <div className='checkBox' style={{ width: '100%', }}>
                                        <div >
                                            <div className='topicName'>
                                                <span>主题名称：</span>
                                                <span>{item.topicN}</span>
                                            </div>

                                            <CheckboxGroup
                                                style={{ marginLeft: '50px' }}
                                                options={options} defaultValue={item.topicL} onChange={this.changeTopic(index)} />

                                        </div>

                                    </div>
                                )
                            }) : null
                        }

                        <div style={{ marginTop: '30px ' }}>
                            <Button htmlType="submit" className="operatorBtn" style={{ marginLeft: 5, width: 88, fontSize: 16, borderRadius: 5 }}>提交</Button>
                            <Button onClick={this.toIndex} className="cancelBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>取消</Button>
                        </div>
                    </Row>
                </Form>
                <div style={{ border: '1px solid #ccc', padding: "20px", marginTop: '50px', width: '100%' }}>
                    <div style={{ color: 'red' }}>
                        温馨提示：
                    </div>
                    <div>
                        <div>
                            多选框内已选择中的环境类型代表当前环境下所过滤订阅的topicName。
                    </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const WrapperCreateForm = Form.create()(CreateForm);