import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6'
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table, Collapse } from 'antd';
import moment from 'moment';
import { randomNamber } from './../../../../util/publicFuc';
import SelectSubModule from  "../../../../component/selectSubModule/selectCommonSubModule"
import $fetch from '$fetch';
import { queryEdaTopicList } from "../request/service";


// import './../../../common/style/index.less';
import './topicMessage.less';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Search = Input.Search
let height = window.innerHeight
const Panel = Collapse.Panel
class TopicMessage extends Component {
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
            allNum: '',
            usableNum: '',
            columns : [
              { title: '起始位点', dataIndex: 'startOffset', key: 'startOffset' },
              { title: '结束位点', dataIndex: 'endOffset', key: 'endOffset' },
              { title: '同步状态', dataIndex: 'in_sync', key: 'in_sync',
                render: (text) => {
                  return(
                    <span>{text? "已同步":"未同步"}</span>
                  )
                }
              },
              { title: '可用消息数量', dataIndex: 'messageAvailable', key: 'messageAvailable' }
            ],
            data: []
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

            topic: value.topicName[0],
            middlewareName: value.middlewareName,
            deployUnit: value.deployUnit,
            env: value.env,
            reqSeqNo: reqSeqNo
        }

        $fetch({
            url: '/tesla-gateway-console-app/eda/queryClusterTopicMeta',
            data: {
                ...params
            }
        }).then((res) => {
            if (res.reply.returnCode.type == 'S') {
                let data = res.reply.result
                let data1 = []

                for (var key in data) {
                    let arr = data[key]
                    data1.push(arr)
                }

                let arrr = JSON.parse(res.reply.result.result)
                if(arrr.code){
                  Modal.error({
                    title: "错误信息",
                    content: res.reply.result.result
                  })
                  return;
                }
                let allNum = 0
                let usableNum = 0
                let a = arrr.topicPartitionInfos ? arrr.topicPartitionInfos.map((item) => {

                    allNum = item.endOffset + allNum
                    usableNum = item.messageAvailable + usableNum
                    return allNum, usableNum
                }) : null
                let topicPartitionInfos = arrr.topicPartitionInfos.map((item,index)=>{
                  return {
                    ...item,
                    key: index
                  }
                })
                this.setState({

                    dataTopic: arrr,
                    a: false,
                    allNum: allNum,
                    usableNum: usableNum,
                    data: topicPartitionInfos,
                    // data: data2
                })
            }
        }).catch(error => {

            this.setState({ a: false, });
        });
    };


    onSearch = () => {

        this.props.form.validateFields((err, value) => {
            if (err) {

                return false;
            } else {
                this.setState({
                    data: [],
                    dataTopic: {},
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

        this.props.form.setFieldsValue({ "topicName": [] })
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
   
    expandedRowRender = topicPartitionInfo => {
      const { isr, leader, replicas } = topicPartitionInfo;
        const columns = [
          { title: '编号', dataIndex: 'id', key: 'id' },
          { title: '编号名', dataIndex: 'idString', key: 'idString' },
          { title: '地址', dataIndex: 'host', key: 'host' },
          { title: '端口', dataIndex: 'port', key: 'port' },  
        ];
        return (
          <div>
            <p>当前主分区</p>
              <Table
              rowKey={record=>record.idString}
              columns={columns}
              dataSource={[leader]}
              pagination={false}
            />
            <p>当前副本分区</p>
            <Table
              rowKey={record=>record.idString}
              columns={columns}
              dataSource={replicas}
              pagination={false}
            />
            <p>当前isr分区</p>
            <Table
              rowKey={record=>record.idString}
              columns={columns}
              dataSource={isr}
              pagination={false}
            />
          </div>
        );
      };
    render() {
      const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 }
    }
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="topicMessage">
                <div className="maskc" style={{ display: this.state.a ? 'block' : 'none' }}></div>
                <div className="maskc1" style={{ display: this.state.a ? 'block' : 'none' }}>正在查询...</div>
                <SelectSubModule topicData={this.topicData} callbackParent={this.onChildQuery} >
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
                    <FormItem label="事件中间件"  {...formItemLayout} >

                        {getFieldDecorator('middlewareName', {
                            initialValue: '',
                            rules: [

                                {
                                    required: false,
                                    message: '请输入middlewareName'
                                },
                            ],
                        })(

                            <Input />

                            )}

                    </FormItem>
                    </Col>
                    <Col span={12}>
                    <FormItem label="分环境查询："  {...formItemLayout} >

                        {getFieldDecorator('env', {
                            initialValue: '',
                            rules: [

                                {
                                    required: false,
                                    message: '请输入env'
                                },
                            ],
                        })(

                            <Select  >
                                <Option value='' >未分环境</Option>
                                <Option value='UAT' >UAT</Option>
                                <Option value='SIT' >SIT</Option>
                                <Option value='DEV' >DEV</Option>
                                <Option value='VT' >VT</Option>
                                <Option value='PROD' >PROD</Option>
                                <Option value='DEAD' >死信</Option>

                            </Select>

                            )}

                    </FormItem>
                    </Col>
                    <Col span={12}>
                    <FormItem label="集群单元："  {...formItemLayout} >

                        {getFieldDecorator('deployUnit', {
                            initialValue: '',
                            rules: [

                                {
                                    required: false,
                                    message: '请输入deployUnit'
                                },
                            ],
                        })(

                            <Input />

                            )}

                    </FormItem>
                    </Col>
                    </Row>
                </Form>


                <Button type='primary' onClick={this.onSearch} style={{ height: '32px', marginBottom: '20px' }}>搜索</Button>
                <br></br>

                <div style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}></div>

                <div style={{ padding: '5px', display: 'inline-block', marginRight: '10px' }}>
                    <span style={{ color: '#adadad' }}>
                        主题名称：
                  </span>
                    <span style={{ marginLeft: '5px' }}>
                        {this.state.dataTopic ? this.state.dataTopic.topicName : ''}
                    </span>
                </div>
                <div style={{ padding: '5px', display: 'inline-block', marginRight: '10px' }}>
                    <span style={{ color: '#adadad' }}>
                        分区数量：
                  </span>
                    <span style={{ marginLeft: '5px' }}>
                        {this.state.dataTopic ? this.state.dataTopic.partitionCount : ''}
                    </span>
                </div>
                <div style={{ padding: '5px', display: 'inline-block', marginRight: '10px' }}>
                    <span style={{ color: '#adadad' }}>
                        副本数量：
                  </span>
                    <span style={{ marginLeft: '5px' }}>
                        {this.state.dataTopic ? this.state.dataTopic.replicationFactor : ''}
                    </span>
                </div>
                <div style={{ padding: '5px', display: 'inline-block', marginRight: '10px' }}>
                    <span style={{ color: '#adadad' }}>
                        总消息数量：
                  </span>
                    <span style={{ marginLeft: '5px' }}>
                        {this.state.allNum ? this.state.allNum : ''}
                    </span>
                </div>
                <div style={{ padding: '5px', display: 'inline-block', marginRight: '10px' }}>
                    <span style={{ color: '#adadad' }}>
                        可用消息数量：
                  </span>
                    <span style={{ marginLeft: '5px' }}>
                        {this.state.usableNum ? this.state.usableNum : ''}
                    </span>
                </div>
                <div style={{ borderBottom: '1px solid #ccc', marginBottom: '10px', marginTop: '10px' }}></div>
                <div style={{ padding: '5px', marginTop: '10px ' }}>
                    <div className='beifenL' style={{ color: '#adadad' }}>
                        备份片信息：
                  </div>
                    <div className='beifenR' style={{}}>
                      <Table
                        className="components-table-demo-nested"
                        columns={this.state.columns}
                        expandedRowRender={record=>this.expandedRowRender(record.topicPartitionInfo)}
                        dataSource={this.state.data}
                        pagination={false}
                      />
                        {/* {this.state.dataTopic.topicPartitionInfos ? this.state.dataTopic.topicPartitionInfos.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div style={{ backgroundColor: '#f9f9f9', margin: '10px', marginLeft: '0', paddingLeft: '20px' }}>

                                        <div style={{ display: 'inline-block', verticalAlign: 'text-top' }}>
                                            <div>
                                                <span style={{ display: 'inline-block', verticalAlign: 'text-top', width: '300px' }}>分片编号:</span>
                                                <span style={{ marginLeft: '10px' }}>{item.partitionId}</span>
                                            </div>
                                            <div>
                                                <span style={{ display: 'inline-block', verticalAlign: 'text-top', width: '300px' }}>开始位点:</span>
                                                <span style={{ marginLeft: '10px' }}>{item.startOffset}</span>
                                            </div>
                                            <div>
                                                <span style={{ display: 'inline-block', verticalAlign: 'text-top', width: '300px' }}>结束位点:</span>
                                                <span style={{ marginLeft: '10px' }}>{item.endOffset}</span>
                                            </div>
                                            <div>
                                                <span style={{ display: 'inline-block', verticalAlign: 'text-top', width: '300px' }}>主节点:</span>
                                                <span style={{ marginLeft: '10px' }}>{item.leader}</span>
                                            </div>
                                            <div>
                                                <span style={{ display: 'inline-block', verticalAlign: 'text-top', width: '300px' }}>可用消息数量:</span>
                                                <span style={{ marginLeft: '10px' }}>{item.messageAvailable}</span>
                                            </div>

                                            <div>
                                                <span style={{ display: 'inline-block', verticalAlign: 'text-top', width: '300px' }}>可用副本节点列表:</span>
                                                {
                                                    item.isr ? item.isr.map((text, index) => {
                                                        return (
                                                            <div style={{ display: 'inline-block', verticalAlign: 'text-top', marginLeft: '10px', color: item.isr.length < 3 ? '#ff5809' : '' }}>
                                                                <div>{text}</div>
                                                            </div>
                                                        )
                                                    }) : null
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : null} */}
                    </div>
                </div>
            </div>

        )
    }
}
export default Form.create()(TopicMessage)