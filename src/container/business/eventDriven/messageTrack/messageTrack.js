import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6'
import { Breadcrumb, Icon, DatePicker, Card, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table, Collapse } from 'antd';

import { randomNamber } from './../../../../util/publicFuc';
import SelectSubModule from  "../../../../component/selectSubModule/selectCommonSubModule"
import $fetch from '$fetch';
import moment from 'moment';
// import './../../../common/style/index.less';
import './multipleTrack.less';
import { queryEdaTopicList } from "../request/service"
import './messageTrack.less';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Search = Input.Search;


const Panel = Collapse.Panel
let height1 = 0;
let height2 = 0;
let graph3 = ''
class Single extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    constructor() {
        super();
        this.state = {
            loading: false,
            data: [],
            param: {},
            flag: true,
            pagination: {
                pageSize: 10,
                pageSizeChanger: true,
                current: 1
            },
            dataProducer: [],
            dataTopic: [],
            dataConsumer: {},
            offset: '0',
            partition: "0",
            topicName: '',
            consumerId: '',
            module4Data: [],
            flag: false,
            flag1: true,

            dataCom: []
        };
    }
    componentDidMount() {

    }
    timer = (t) => {
        console.log('t', t)
        return moment(t).format('YYYY-MM-DD')
    }


    fetchConsumer = () => {
        let reqSeqNo = randomNamber();
        this.setState({
            loading: true,
            a: true,
        });

        let params = {
            paginator: {
                pageNo: this.state.pagination.current,
                recordsPerPage: this.state.pagination.pageSize,
                doPagination: false
            },
            offset: this.state.offset,
            partition: this.state.partition,
            topicName: this.state.topicName,
            consumerId: this.state.consumerId,
            reqSeqNo: reqSeqNo
        }

        $fetch({
            url: '/tesla-gateway-console-app/eda/queryConsumerSubscribeByParameters',
            data: {
                ...params
            }
        }).then((res) => {

            let data1 = []
            for (var key in res.reply.result) {
                dataCom = {
                    name: key,
                    value: res.reply.result[key]
                }

                data1.push(dataCom)
            }
            let b = true
            for (let i = 0; i < data1.length; i++) {
                if (JSON.stringify(data1[i].value) != '[]') {
                    b = false
                }
            }
            this.setState({
                // pagination: _pagination,
                dataConsumer: res.reply.result,
                loading: false,
                dataCom: data1,
                flag: true,
                a: false,
                flag1: b
            },()=>{console.log(this.state.dataCom)})
        }).catch(error => {
            this.setState({ a: false, });
        });
    };


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
        });
    }
    onSearch = () => {

        this.props.form.validateFields((err, value) => {
            if (err) {

                return false;
            } else {
                console.log(333333, value)
                this.setState({
                    offset: value.offset,
                    partition: value.partition,
                    topicName: value.topicName[0],
                    consumerId: value.consumerId,

                }, () => {
                    this.fetchConsumer();
                })

            }
        })


    }

    render() {
      const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 }
    }
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="single messageTrack">
                <div className="maskc" style={{ display: this.state.a ? 'block' : 'none' }}></div>
                <div className="maskc1" style={{ display: this.state.a ? 'block' : 'none' }}>????????????...</div>
                <SelectSubModule callbackParent={this.onChildQuery} >
                </SelectSubModule  >
                
                <Form>
                <Row>
                    <Col span={12}>
                    <FormItem label="????????????"  {...formItemLayout} >

                        {getFieldDecorator('topicName', {

                            rules: [
                                {
                                    required: true,
                                    message: '?????????????????????(TopicName)',
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
                    <FormItem label="????????????"  {...formItemLayout} >

                        {getFieldDecorator('offset', {
                            initialValue: '',
                            rules: [

                                {
                                    required: false,
                                    message: '?????????offset'
                                },
                            ],
                        })(

                            <Input />

                            )}

                    </FormItem>
                    </Col>
                    <Col span={12}>
                    <FormItem label="????????????"  {...formItemLayout} >

                        {getFieldDecorator('partition', {
                            initialValue: '',
                            rules: [

                                {
                                    required: false,
                                    message: '?????????partition'
                                },
                            ],
                        })(

                            <Input />

                            )}

                    </FormItem>
                    </Col>
                    <Col span={12}>
                    <FormItem label="?????????ID"  {...formItemLayout} >

                        {getFieldDecorator('consumerId', {
                            initialValue: '',
                            rules: [

                                {
                                    required: false,
                                    message: '?????????consumerId'
                                },
                            ],
                        })(

                            <Input />

                            )}

                    </FormItem>
                    </Col>
                    </Row>
                </Form>


                <Button id='btn' type='primary' onClick={this.onSearch} style={{ height: '32px' }}>??????</Button>
                <br></br>

                <div style={{ height: '20px' }}>

                </div>
                <div style={{ display: this.state.flag ? 'block' : 'none' }}>???????????????????????????<span style={{ display: this.state.flag1 ? 'inline-block' : 'none' }}>????????????</span></div>
                <Collapse accordion>
                  {this.state.dataCom && this.state.dataCom.length>0 ? this.state.dataCom.map(item => (
                    <Panel header={item.name} key={item.name}>
                      <pre>{JSON.stringify(JSON.parse(item.value), null, 4)}</pre>
                    </Panel>
                  )) : null}
                </Collapse>
            </div>

        )
    }
}
export default Form.create()(Single)


{/* <Row>
                                            <Col span={12}>
                                                <p style={{ borderRight: '0', borderBottom: '0' }}><span style={{ marginRight: '1px' }}>????????????:</span>{i.clientId}</p>

                                            </Col>
                                            <Col span={12}>
                                                <p style={{ borderBottom: '0' }}><sapn style={{ marginRight: '1px' }}>???????????????:</sapn>{i.consumerId}</p>
                                            </Col>



                                        </Row>
                                        <Col span={12}>
                                            <p style={{ borderRight: '0', borderBottom: '0' }}><sapn style={{ marginRight: '1px' }}>????????????:</sapn>{i.host}</p>

                                        </Col>
                                        <Col span={12}>
                                            <p style={{ borderBottom: '0' }}><sapn style={{ marginRight: '1px' }}>??????????????????:</sapn>{i.offset}</p>

                                        </Col>
                                        <Row>


                                        </Row>
                                        <Row>

                                            <Col span={12}>
                                                <p style={{ borderRight: '0', borderBottom: '0' }}><sapn style={{ marginRight: '1px' }}>????????????:</sapn>{i.lag}</p>

                                            </Col>
                                            <Col span={12}>
                                                <p style={{ borderBottom: '0' }}><sapn style={{ marginRight: '1px' }}>??????????????????:</sapn>{i.logEndOffset}</p>

                                            </Col>




                                        </Row>
                                        <Row>
                                            <Col span={12}>
                                                <p style={{ borderRight: '0' }}><sapn style={{ marginRight: '1px' }}>????????????:</sapn>{i.topic}</p>
                                            </Col>
                                            <Col span={12}>
                                                <p ><sapn style={{ marginRight: '1px' }}>????????????:</sapn>{i.partition}</p>

                                            </Col>
                                        </Row> */}