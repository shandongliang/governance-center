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
import { queryEdaTopicList, queryEdaConsumerList } from "../request/service"

// import './../../../common/style/index.less';
import './sendEdaMessage.less';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Search = Input.Search

const Panel = Collapse.Panel
class ConsumeEdaMessage extends Component {
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
            dataTopic: {},
            module4Data: [],
            moduleConsumer: [],
            columns: [
                {
                    title: '主题名称',
                    dataIndex: 'topicName',
                    key: 'topicName',
                    width: 100,
                }
                ,
                {
                    title: '消费者名称',
                    dataIndex: 'consumerId',
                    key: 'consumerId',
                    width: 100,
                },
                {
                    title: '事件标识（businessKey）',
                    dataIndex: 'businessKey',
                    key: 'businessKey',
                    width: 100,
                }
                ,

                {
                    title: 'eventId',
                    dataIndex: 'eventId',
                    key: 'eventId',
                    width: 50,
                }
                ,



                {
                    title: '消费时间',
                    dataIndex: 'consumeTime',
                    key: 'consumeTime',
                    width: 50,
                    render: (text, record, index) => {
                        return (
                            <span>{this.timer(text)}</span>
                        );
                    }
                }
                ,
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    width: 50,
                    render: (text, record, index) => {
                        return (
                            <span>{text == 'S' ? '成功' : '失败'}</span>
                        );
                    }
                }
                ,
            ],
        };
    }
    componentDidMount() {



    }
    timer = (t) => {
        //console.log('t', t)
        return moment(t).format('YYYY-MM-DD HH:mm:ss:SSS')
    }

    fetchConsumer = (value) => {

        let reqSeqNo = randomNamber();
        this.setState({ loading: true });

        let params = {

            topicName: value.topicName[0],
            environmentType: value.environmentType,
            consumerId: value.consumerId[0],
            count: value.count,

            reqSeqNo: reqSeqNo
        }


        $fetch({
            url: '/tesla-gateway-console-app/eda/consumeEdaMessage',
            data: {
                ...params
            }
        }).then((res) => {
            console.log('208', res)
            if (res.reply.returnCode.type == 'S') {
                let data = res.reply.result.edaMsgConsume

                this.setState({

                    data,
                    a: false,
                }, () => {
                    if (JSON.stringify(data) == '[]') {
                        console.log(133, JSON.stringify(data));
                        this.messages()
                    }
                })
            } else {



            }
        }).catch(error => {

            this.setState({ a: false, });
        });
    };
    messages = () => {

        let _this = this;
        Modal.confirm({
            title: "状态",
            content: <div>
                暂无数据

            </div>,
            onOk() {

            },
            onCancel() {
                message.info('取消');


            },
        });
    }

    onSearch = () => {

        this.props.form.validateFields((err, value) => {
            if (err) {

                return false;
            } else {
                this.setState({
                    a: true
                }, () => {
                    this.fetchConsumer(value);
                })

            }
        })

    }
    onRef = (ref) => {
        this.child = ref
    }
    click = (e) => {
        this.child.forDate()
        //console.log('209');
    }
    onChildQuery = (map) => {
      this.props.form.resetFields(["topicName","consumerId"]);
      if(map===""){
        this.setState({
          module4Data: [],
          moduleConsumer: [],
          submoduleId: map
        })
        return;
      }
        let submoduleId = map
        let reqSeqNo = randomNamber();
        let data = {
          edaTopic: {
            submoduleId,
            page: {
              doPagination: false
            }
          }
        };
        let dataComsumer = {
          edaConsumer: {
            submoduleId,
            page: {
              doPagination: false
            }
          }
        };
        queryEdaTopicList(data).then(res => {
          this.setState(
            {
              module4Data: res.reply.topicList.list,
              loading: false
            },
          );
        });
        queryEdaConsumerList(dataComsumer).then(res => {
          this.setState(
            {
              moduleConsumer: res.reply.consumerList.resultList,
              loading: false
            }
          );
        });
    }
    render() {
      const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 }
    }
        const { getFieldDecorator } = this.props.form;
        console.log(157, this.state.moduleConsumer);
        return (
            <div className="sendEdaMessage">
                <div className="maskc" style={{ display: this.state.a ? 'block' : 'none' }}></div>
                <div className="maskc1" style={{ display: this.state.a ? 'block' : 'none' }}>正在查询...</div>
                <SelectSubModule callbackParent={this.onChildQuery} >
                </SelectSubModule  >
                <Form>
                  <Row>
                    <Col span={12}>
                    <FormItem label="消费者编号"  {...formItemLayout} >

                        {getFieldDecorator('consumerId', {

                            rules: [

                                {
                                    required: true,
                                    message: '请输入consumerId',
                                    type: 'array'
                                },
                            ],
                        })(
                            <Select mode="tags" maxTagCount={1} onChange={value => {
                                console.log(232311111, this.props.form.getFieldsValue())


                                setTimeout(() => {
                                    this.props.form.setFieldsValue({
                                        'consumerId': value.length === 0 ? [...value] : [value[value.length - 1]]
                                    })
                                });
                            }}   >

                                {
                                    this.state.moduleConsumer.map((item) => {

                                        return (
                                            <Select.Option key={item.id} value={item.consumerId}>{item.consumerId}</Select.Option>
                                        )
                                    })
                                }

                            </Select>

                            )}

                    </FormItem>
                    </Col>
                    <Col span={12}>
                    <FormItem label="主题名称"  {...formItemLayout} >

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
                                          <Select.Option key={item.id} value={item.topicName}>{item.topicName}</Select.Option>
                                        )
                                    })
                                }

                            </Select>

                            )}

                    </FormItem>

                    </Col>
                    <Col span={12}>

                    <FormItem label="消费条数"  {...formItemLayout} >

                        {getFieldDecorator('count', {
                            initialValue: '',
                            rules: [
                                { pattern: /^([0-9]\d{0,3}|10000)$/g, message: 'count为0-10000之间数字' },
                                {
                                    required: true,
                                    message: '请输入count'
                                },
                            ],
                        })(

                            <Input />

                            )}

                    </FormItem>
                    </Col>
                    <Col span={12}>
                    <FormItem label="环境："  {...formItemLayout} >

                        {getFieldDecorator('environmentType', {
                            initialValue: '',
                            rules: [

                                {
                                    required: false,
                                    message: '请输入environmentType'
                                },
                            ],
                        })(

                            <Select  >
                                <Option value='' >未分环境</Option>
                                <Option value='DEV' >DEV</Option>
                                <Option value='SIT' >SIT</Option>
                                <Option value='UAT' >UAT</Option>
                                <Option value='VT' >VT</Option>
                                <Option value='PROD' >PROD</Option>
                            </Select>

                            )}

                    </FormItem>
                    </Col>
                    </Row>

                </Form>


                <Button type='primary' onClick={this.onSearch} style={{ height: '32px', marginBottom: '20px' }}>消费</Button>
                <br></br>

                <div style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}></div>
                <Table
                    dataSource={this.state.data} columns={this.state.columns} size="middle" rowKey="id"
                    style={{ paddingLeft: 0, paddingRight: 0, }}>
                </Table>
            </div>

        )
    }
}
export default Form.create()(ConsumeEdaMessage)