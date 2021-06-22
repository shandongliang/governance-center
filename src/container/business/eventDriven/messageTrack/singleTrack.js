import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6'
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, Tooltip } from 'antd';
import { Form, Row, Col, Input, Table, Collapse } from 'antd';
import moment from 'moment';
import { randomNamber } from './../../../../util/publicFuc';
import SelectSubModule from  "../../../../component/selectSubModule/selectCommonSubModule"
import $fetch from '$fetch';

import { queryEdaTopicList } from "../request/service"


// import './../../../common/style/index.less';
import './singleTrack.less';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Search = Input.Search
let height = window.innerHeight
const Panel = Collapse.Panel

class SingleTrack extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    constructor() {
        super();
        this.state = {
          type: "",
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
            searchValue: '',
            offsetValue: '',
            messageNum: "",
            partitionValue: '',
            consumerValue: '',
            columns1: [
                {
                    title: '主题名称',
                    dataIndex: 'topic',
                    key: 'topic',
                    width: 100,
                },
                {
                    title: '消息位点',
                    dataIndex: 'offset',
                    key: 'offset',
                    width: 100,
                },
                {
                    title: '消息分区',
                    dataIndex: 'partition',
                    key: 'partition',
                    width: 100,
                },
                {
                    title: '事件标识',
                    dataIndex: 'key',
                    key: 'key',
                    width: 100,
                },
                {
                    title: '消息体',
                    dataIndex: 'value',
                    key: 'value',
                    width: 300,
                    // render: (text, record, index) => {
                    //   return text && text.length > 100 ? (
                    //     <Tooltip style={{ wordBreak: "break-all" }} title={text}>
                    //       <span>{text.substring(0, 100) + "..."}</span>
                    //     </Tooltip>
                    //   ) : (
                    //     <span>{text}</span>
                    //   );
                    // }
                },
                // {
                //   title: '类型',
                //   dataIndex: 'type',
                //   key: 'type',
                //   width: 100,
                //   render: (text, record, index) => {
                //     return (
                //         <span>{text}</span>
                //     );
                //   }
                // },
                {
                    title: 'timestamp',
                    dataIndex: 'timestamp',
                    key: 'timestamp',
                    width: 150,
                    render: (text, record, index) => {
                        return (
                            <span>{this.timer(text)}</span>
                        );
                    }
                },
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
            paginator: {
                pageNo: this.state.pagination.current,
                recordsPerPage: this.state.pagination.pageSize,
                doPagination: false
            },
            topic: value.topicName[0],
            messageKey: value.offsetValue,
            messageValue: value.consumerValue,
            env: value.partitionValue1,
            partition: value.partitionValue,
            messageNum: value.messageNum,
            type: value.type,
            time: value.type === "TIMESTAMPS" ? value.time.valueOf().toString() : "",
            reqSeqNo: reqSeqNo
        }
        $fetch({
            url: '/tesla-gateway-console-app/eda/queryRecordMessages',
            data: {
                ...params
            }
        }).then((res) => {
            this.setState({
                dataConsumer: res.reply.result,
                loading: false,
                a: false,

            })
        }).catch(error => {

            this.setState({ a: false, });

        });
    };

    changeSearch = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    }
    offsetSearch = (e) => {
        this.setState({
            offsetValue: e.target.value
        })
    }
    partitionSearch = (e) => {
        this.setState({
            partitionValue: e.target.value
        })
    }
    partitionSearch1 = (e) => {
        this.setState({
            partitionValue1: e
        })
    }
    consumerSearch = (e) => {
        this.setState({
            consumerValue: e.target.value
        })
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
    topicData = (data) => {

        this.props.form.setFieldsValue({ "topicName": data })
        this.setState({
            module4Data: data
        })
    }
    onChildQuery = (map) => {
      this.props.form.resetFields(["topicName"]);
      if(map===""){
        this.setState({
          module4Data: [],
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
        })
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 }
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="singleTrack">
                <div className="maskc" style={{ display: this.state.a ? 'block' : 'none' }}></div>
                <div className="maskc1" style={{ display: this.state.a ? 'block' : 'none' }}>正在查询...</div>
                <SelectSubModule callbackParent={this.onChildQuery} >
                </SelectSubModule  >
                <Form>
                  <Row>
                    <Col span={12}>
                    <FormItem label="主题名称："  {...formItemLayout} >

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
                    <FormItem label="事件标识"  {...formItemLayout} >

                        {getFieldDecorator('offsetValue', {
                            initialValue: '',
                            rules: [

                                {
                                    required: false,
                                    message: '请输入businessKey'
                                },
                            ],
                        })(

                            <Input />

                            )}

                    </FormItem>
                    </Col>
                    <Col span={12}>
                    <FormItem label="消息分区"  {...formItemLayout} >

                        {getFieldDecorator('partitionValue', {
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
                    </Col>
                    <Col span={12}>
                    <FormItem label="分环境查询"  {...formItemLayout} >

                        {getFieldDecorator('partitionValue1', {
                            initialValue: '',
                            rules: [

                                {
                                    required: false,
                                    message: '请输入MESSAGE'
                                },
                            ],
                        })(

                            <Select  >
                                <Select.Option value='' >未分环境</Select.Option>
                                <Select.Option value='UAT' >UAT</Select.Option>
                                <Select.Option value='SIT' >SIT</Select.Option>
                                <Select.Option value='DEV' >DEV</Select.Option>
                                <Select.Option value='VT' >VT</Select.Option>
                                <Select.Option value='PROD' >PROD</Select.Option>
                                <Select.Option value='DEAD' >死信</Select.Option>

                            </Select>

                            )}

                    </FormItem>
                    </Col>
                    <Col span={12}>
                    <FormItem label="消息数据"  {...formItemLayout} >

                        {getFieldDecorator('consumerValue', {
                            initialValue: '',
                            rules: [

                                {
                                    required: false,
                                    message: '请输入MESSAGE'
                                },
                            ],
                        })(

                            <Input />

                            )}

                    </FormItem>
                    </Col>
                    <Col span={12}>
                    <FormItem label="消息条数"  {...formItemLayout} >

                        {getFieldDecorator('messageNum', {
                            initialValue: '',
                            rules: [

                                {
                                    required: false,
                                    message: '请输入最新消息数'
                                },
                            ],
                        })(

                            <Input placeholder='请输入8的倍数，如：400，800，1600' />

                            )}

                    </FormItem>
                    </Col>
                    <Col span={12}>
                    <FormItem {...formItemLayout} label="位点类型">
                      {getFieldDecorator("type", {
                        initialValue: ""
                        // rules:[{required: true, message: '请选择消费者编号'}]
                      })(
                        <Select onChange={value=>this.setState({type:value})} >
                          <Option value="">默认</Option>
                          <Option value="TIMESTAMPS">TIMESTAMPS</Option>
                        </Select>
                      )}
                    </FormItem>
                    </Col>
                    
                    {this.state.type==="TIMESTAMPS"?<Col span={12}><FormItem {...formItemLayout} label="时间">
                      {getFieldDecorator("time", {
                        rules:[{required: true, message: '请选择时间'}]
                      })(
                        <DatePicker
                          style={{ width: "100%" }}
                          showTime
                          format="YYYY-MM-DD HH:mm:ss"
                        />
                      )}
                    </FormItem></Col>:null}
                    </Row>
                </Form>

                
                <Button type='primary' onClick={this.onSearch} style={{ height: '32px', marginBottom: '20px' }}>搜索</Button>
                <br></br>



                <Table
                    dataSource={this.state.dataConsumer} columns={this.state.columns1} size="middle" rowKey="id"
                    style={{ paddingLeft: 0, paddingRight: 0, }} rowKey={record=>record.key}>
                </Table>


            </div>

        )
    }
}
export default Form.create()(SingleTrack)