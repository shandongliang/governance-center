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
import { queryEdaTopicList } from "../request/service"

// import './../../../common/style/index.less';
import './sendEdaMessage.less';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Search = Input.Search

const Panel = Collapse.Panel
class SendEdaMessage extends Component {
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
            columns: [
                {
                    title: '主题名称',
                    dataIndex: 'topicName',
                    key: 'topicName',
                    width: 100,
                }
                ,
                {
                    title: '消息位点',
                    dataIndex: 'offSet',
                    key: 'offSet',
                    width: 5,
                },

                {
                    title: '消息分区',
                    dataIndex: 'msgPartition',
                    key: 'msgPartition',
                    width: 5,
                }
                ,

                {
                    title: '事件标识（businessKey）',
                    dataIndex: 'businessKey',
                    key: 'businessKey',
                    width: 100,
                }
                ,
                {
                    title: '消息体',
                    dataIndex: 'messageBody',
                    key: 'messageBody',
                    width: 200,
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
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime',
                    width: 50,
                    render: (text, record, index) => {
                        return (
                            <span>{this.timer(text)}</span>
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
        return moment(t).format('YYYY-MM-DD HH:mm:ss:SSS')
    }

    fetchConsumer = (value) => {

        let reqSeqNo = randomNamber();
        this.setState({ loading: true });

        let params = {

            topicName: value.topicName[0],
            environmentType: value.environmentType,
            businessKey: value.businessKey,
            eventID: value.eventID,
            messageType: value.messageType,
            messageBody: value.messageBody,
            reqSeqNo: reqSeqNo
        }

        $fetch({
            url: '/tesla-gateway-console-app/eda/sendEdaMessage',
            data: {
                ...params
            }
        }).then((res) => {

            if (res.reply.returnCode.type == 'S') {
                this.setState({ a: false, }, () => {
                    this.messages(res)
                });

            }
        }).catch(error => {

            this.setState({ a: false, });
        });
    };
    messages = (res) => {
        let param = res;
        let _this = this;
        Modal.confirm({
            title: "状态",
            content: <div>
                {param.reply.result.flag}

            </div>,
            onOk() {

                _this.setState({
                    loading: true,
                    data: param.reply.result.resultProduceMsg
                });



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
    }
    onChildQuery = (map) => {
      this.props.form.resetFields(["topicName"]);
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
        queryEdaTopicList(data).then(res => {
          this.setState(
            {
              module4Data: res.reply.topicList.list,
              loading: false
            },
          );
        });
    }
    render() {
      const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 }
    }
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="sendEdaMessage">
                <div className="maskc" style={{ display: this.state.a ? 'block' : 'none' }}></div>
                <div className="maskc1" style={{ display: this.state.a ? 'block' : 'none' }}>正在查询...</div>
                <SelectSubModule callbackParent={this.onChildQuery} >
                </SelectSubModule  >
                <Form>
                  <Row>
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
                    <Col span={12}>

                    <FormItem label="事件标识"  {...formItemLayout} >

                        {getFieldDecorator('businessKey', {
                            initialValue: '',
                            rules: [
                                { pattern: /^.{1,32}$/, message: 'businessKey为1-32之间字符' },
                                {
                                    required: true,
                                    message: '请输入businessKey'
                                },
                            ],
                        })(
                            <Input />

                            )}

                    </FormItem>
                    </Col>
                    <Col span={12}>
                    <FormItem label="eventID"  {...formItemLayout} >

                        {getFieldDecorator('eventID', {
                            initialValue: '',
                            rules: [

                                {
                                    required: true,
                                    message: '请输入eventID'
                                },
                            ],
                        })(

                            <Input />

                            )}

                    </FormItem>
                    </Col>
                    <Col span={12}>
                    <FormItem label="消息类型："  {...formItemLayout} >

                        {getFieldDecorator('messageType', {
                            initialValue: '',
                            rules: [

                                {
                                    required: false,
                                    message: '请输入messageType'
                                },
                            ],
                        })(

                            <Select  >
                                <Option value='NORMAL_TYPE' >正常类</Option>
                                <Option value='ONLINE_PRESSURETEST_TYPE' >在线压测类</Option>
                                <Option value='ACCTIVE_TEST_TYPE' >探活类</Option>
                                <Option value='GRAY_TYPE' >灰度类</Option>
                            </Select>

                            )}

                    </FormItem>
                    </Col>
                    <Col span={12}>
                    <FormItem label="消息体："  {...formItemLayout} >

                        {getFieldDecorator('messageBody', {
                            initialValue: '',
                            rules: [

                                {
                                    required: true,
                                    message: '请输入messageBody'
                                },
                            ],
                        })(

                            <Input type='textarea' autosize />

                            )}

                    </FormItem>
                    </Col>
                    </Row>
                </Form>


                <Button type='primary' onClick={this.onSearch} style={{ height: '32px', marginBottom: '20px' }}>发送</Button>
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
export default Form.create()(SendEdaMessage)