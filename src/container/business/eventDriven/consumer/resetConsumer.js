import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6'
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table, Collapse, message } from 'antd';
import moment from 'moment';
import { randomNamber } from './../../../../util/publicFuc';
import SelectSubModule from  "../../../../component/selectSubModule/selectCommonSubModule"
import $fetch from '$fetch';


// import './../../../common/style/index.less';
import './resetConsumer.less';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Search = Input.Search
let height = window.innerHeight
const Panel = Collapse.Panel
class ResetConsumer extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    constructor() {
        super();
        this.state = {
            loading: false,
            data: [],
            param: {},
            pagination: {
                pageSize: 10,
                pageSizeChanger: true,
                current: 1
            },
            dataProducer: [],
            dataTopic: [],
            dataConsumer: [],
            module4Data: [],
            moduleConsumer: [],
            messageNum: "",
            searchValue: '',
            offsetValue: '',
            partitionValue: '',
            consumerValue: '',
            middata: []
        };
    }
    componentDidMount() {
        let reqSeqNo = randomNamber()
        let params = {
            paginator: {
                pageNo: this.state.pagination.current,
                recordsPerPage: this.state.pagination.pageSize,
            },

            reqSeqNo: reqSeqNo
        }
        $fetch({
            url: '/tesla-gateway-console-app/eda/queryEdaMiddlewareList',
            data: {
                ...params
            }
        }).then((res) => {

            const _pagination = this.state.pagination;
            _pagination.total = res.reply.queryMiddlewareList.page.total;
            _pagination.current = res.reply.queryMiddlewareList.page.pageNo;
            this.setState({
                pagination: _pagination,
                middata: res.reply.queryMiddlewareList.edaMiddlewareList,
                loading: false
            }, () => {

            })
        })

    }
    timer = (t) => {
        //console.log('t', t)
        return moment(t).format('YYYY-MM-DD HH:mm:ss:SSS')
    }




    onSearch = () => {

        this.props.form.validateFields((err, value) => {
            if (err) {

                return false;
            } else {
                this.fetchDate(value);
            }
        })

    }
    fetchDate = (value) => {
        let reqSeqNo = randomNamber()
        let param = {
            topicName: value.topicName[0],
            consumerId: value.consumerId[0],
            partition: value.partition ? value.partition : null,
            offset: value.offset ? value.offset : null,
            unit: value.unit,
            env: value.env,
            middlewareName: value.middlewareName
        }
        $fetch({
            url: '/tesla-gateway-console-app/eda/skipMessageOffset',
            data: {
                ...param, reqSeqNo
            }
        }).then((res) => {
            let req = res.reply.result.result
            this.messages(req)
        })
    }
    messages = (req) => {

        let _this = this;
        Modal.confirm({
            title: "状态",
            content: <div>
                {req == 'S' ? '重置完成' : '重置失败'}

            </div>,
            onOk() {
                _this.chongzhi()
                _this.setState({
                    clear: true
                })
            },
            onCancel() {
                message.info('取消');


            },
        });
    }
    chongzhi = () => {
        this.props.form.resetFields(['consumerId', 'topicName', 'partition', 'offset', 'env', 'middlewareName', 'unit']);

    }
    onRef = (ref) => {
        this.child = ref
    }
    click = (e) => {
        this.child.forDate()
        //console.log('209');
    }
    topicChange = (e) => {
        this.queryConsumerId(e)
        this.props.form.resetFields(['consumerId']);
    }
    topicData = (data) => {

        this.props.form.setFieldsValue({
            "topicName": [],
            'consumerId': []
        })
        this.setState({
            module4Data: data,
            moduleConsumer: data,
            clear: false
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
    onChildQuery = (map) => {
      this.props.form.resetFields(["topicName","consumerId"]);
      if(map===""){
        this.setState({
          module4Data: [],
          moduleConsumer: []
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
    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 10 }
        }
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="resetConsumer">
                <SelectSubModule callbackParent={this.onChildQuery} >
                </SelectSubModule  >
                <Form>

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



                                setTimeout(() => {
                                    this.props.form.setFieldsValue({
                                        'topicName': value.length === 0 ? [...value] : [value[value.length - 1]]
                                    })
                                });
                                let param = value[0]
                                this.queryConsumerId(param)
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
                    <FormItem label="消费者ID(consumerId)："  {...formItemLayout} >

                        {getFieldDecorator('consumerId', {

                            rules: [

                                {
                                    required: true,
                                    message: '请选择消费者id',
                                    type: 'array'
                                },
                            ],
                        })(

                            <Select showSearch mode="tags" maxTagCount={1} onChange={value => {
                                setTimeout(() => {
                                    this.props.form.setFieldsValue({
                                        'consumerId': value.length === 0 ? [...value] : [value[value.length - 1]]
                                    })
                                });
                            }} >
                                {
                                    this.state.moduleConsumer.map((item) => {

                                        return (
                                            <Select.Option key={item.toString() + '2'} value={item.toString()}>{item}</Select.Option>
                                        )
                                    })
                                }

                            </Select>

                            )}

                    </FormItem>
                    <FormItem label="消息分区："  {...formItemLayout} >

                        {getFieldDecorator('partition', {
                            initialValue: '',
                            rules: [

                                {
                                    required: false,
                                    message: '请输入partition'
                                },
                            ],
                        })(

                            <Input />

                            )}

                    </FormItem>

                    <FormItem label="消息位点(offset)"  {...formItemLayout} >

                        {getFieldDecorator('offset', {
                            initialValue: '',
                            rules: [

                                {
                                    required: false,
                                    message: '请输入offset'
                                },
                            ],
                        })(

                            <Input />

                            )}

                    </FormItem>

                    <FormItem label="env："  {...formItemLayout} >

                        {getFieldDecorator('env', {
                            initialValue: '',
                            rules: [

                                {
                                    required: false,
                                    message: '请输入env'
                                },
                            ],
                        })(

                            <Input />

                            )}

                    </FormItem>
                    <FormItem label="中间件：" {...formItemLayout}>
                        {getFieldDecorator('middlewareName', {
                            initialValue: '',
                            rules: [

                                {
                                    required: true,
                                    message: '请输入middlewareEngName'
                                },
                            ],
                        })(
                            <Select   >
                                {
                                    (JSON.stringify(this.state.middata) != '[]') ? this.state.middata.map((item) => {

                                        return (
                                            <Option value={item.middlewareEngName} >{item.middlewareEngName}</Option>
                                        )
                                    }) : null
                                }

                            </Select>
                            )}
                    </FormItem>
                    <FormItem label="中间件部署：" {...formItemLayout}
                    >
                        {getFieldDecorator('unit', {
                            initialValue: "",
                            rules: [


                                { required: false, message: '请输入中间件部署' }
                            ]
                        })(
                            <Select value={'M'}>
                                <Option value="M">M-马坡</Option>
                                <Option value="P">P-鹏博士</Option>

                            </Select>

                            )}
                    </FormItem>

                </Form>


                <Button type='primary' onClick={this.onSearch} style={{ height: '32px', marginBottom: '20px' }}>重置</Button>

            </div>

        )
    }
}
export default Form.create()(ResetConsumer)