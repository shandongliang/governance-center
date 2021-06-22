import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6'
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table, Collapse } from 'antd';

import { randomNamber } from './../../../../util/publicFuc';
import $fetch from '$fetch';
import moment from 'moment';
// import './../../../common/style/index.less';
import './multipleTrack.less';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Search = Input.Search

const Panel = Collapse.Panel
let height1 = 0;
let height2 = 0;
let graph3 = ''
export default class Single extends Component {
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
            searchValue: '',
            offsetValue: '0',
            partitionValue: '0',
            consumerValue: '',
            columns1: [
                // {
                //     title: 'checksum',
                //     dataIndex: 'checksum',
                //     key: 'checksum',
                //     width: 100
                // }
                // ,
                // {
                //     title: 'headers',
                //     dataIndex: 'headers',
                //     key: 'headers',
                //     width: 100
                // }
                // ,

                {
                    title: '消息位点',
                    dataIndex: 'offset',
                    key: 'offset',
                    width: 10
                }
                ,
                {
                    title: '消息分区',
                    dataIndex: 'partition',
                    key: 'partition',
                    width: 10
                }
                ,
                {
                    title: '消息主键',
                    dataIndex: 'key',
                    key: 'key',
                    width: 50
                }
                ,
                {
                    title: '消息值',
                    dataIndex: 'value',
                    key: 'value',
                    width: 200
                }
                ,
                {
                    title: 'timestamp',
                    dataIndex: 'timestamp',
                    key: 'timestamp',
                    width: 50,
                    render: (text, record, index) => {
                        return (
                            <span>{this.timer(text)}</span>
                        );
                    }
                }
                ,
            ],
            dataCom: []
        };
    }
    componentDidMount() {

        this.setState({
            par: this.props.location.state
        }, () => {
            console.log(this.state.par);
            this.fetchConsumer(this.state.par);
        })

    }
    timer = (t) => {
        console.log('t', t)
        return moment(t).format('YYYY-MM-DD')
    }

    myEcharts = () => {
        G6.registerEdge('flowingEdge', {
            afterDraw: function afterDraw(item) {

                var keyShape = item.getKeyShape();

                keyShape.attr('lineDash', [10, 10]);
                keyShape.attr('lineDashOffset', 0);
                //keyShape.attr('stroke', 'green');
                // keyShape.animate({
                //     lineDashOffset: -20,
                //     repeat: true
                // }, 500);
            }
        });
        G6.registerEdge('flowingEdge1', {
            afterDraw: function afterDraw(item) {

                var keyShape = item.getKeyShape();

                keyShape.attr('lineDash', [10, 10]);
                keyShape.attr('lineDashOffset', 0);
                //keyShape.attr('stroke', 'green');
                // keyShape.animate({
                //     lineDashOffset: 20,
                //     repeat: true
                // }, 500);
            }
        });
        // //鼠标进入
        // G6.registerBehaviour('mouseEnterFillRed', function (graph) {

        //     graph.behaviourOn('node:mouseenter', function (ev) {

        //         graph.update(ev.item, {

        //             label: ev.item.model.id
        //         });



        //     })
        // });
        // //鼠标移出
        // G6.registerBehaviour('mouseLeaveResetFill', function (graph) {
        //     graph.behaviourOn('node:mouseleave', function (ev) {
        //         graph.update(ev.item, {

        //             label: ''
        //         })
        //     })
        // })
        let dataTopic = []
        let dataCluster = []
        let dataList = []
        let dataBroken = []


        let brokArr3 = []
        let broker = []
        var data = {
            nodes: [],
            edges: [

            ]
        }
        let num1 = 0

        for (let j = 0; j < this.state.data.length; j++) {
            let middlewareEngName = this.state.data[j].middlewareEngName
            G6.registerNode(this.state.data[j].middlewareEngName, {
                draw: function draw(item) {
                    var group = item.getGraphicGroup();
                    group.addShape('text', {
                        attrs: {
                            x: 50,
                            y: 60,
                            fill: '#333',
                            text: middlewareEngName
                        }
                    })
                    return group.addShape('rect', {
                        attrs: {
                            x: 50,
                            y: 30,
                            width: 50,
                            height: 50,
                            stroke: '#0bf444'
                        }
                    })
                }
            })

            data.nodes.push(
                {
                    id: this.state.data[j].middlewareEngName,
                    x: 50,
                    y: (j + 1) * 100,
                    size: 30,
                    color: '#6495ed',
                    shape: this.state.data[j].middlewareEngName
                }
            )
            for (let a = 0; a < this.state.data[j].list.length; a++) {

                let broken = this.state.data[j].list[a].clusterAddress.split(",")
                for (let i = 0; i < broken.length; i++) {
                    broker.push({
                        broker: broken[i],
                        middleName: this.state.data[j].list[a].middlewareEngName
                    })
                }



            }

        }
        let brokArr1 = [broker[0]]
        let brokArr2 = []
        console.log('227', broker);
        for (let i = 0; i < broker.length; i++) {
            //brokArr1 = broker[i].broker
            //brokArr2 = broker[i].middleName
            let repeat = false
            for (let p = 0; p < brokArr1.length; p++) {
                if (broker[i].broker == brokArr1[p].broker) {
                    repeat = true;
                    break;
                }
            }
            if (!repeat) {
                brokArr1.push(broker[i])
            }

        }
        console.log('243', brokArr1);
        // for (var o in obj) {
        //     brokArr2.push({
        //         el: o,
        //         count: obj[o]
        //     })
        // }

        for (let t = 0; t < brokArr1.length; t++) {
            //let bro = middlewareEngName + broken[i]
            let br01 = brokArr1[t].broker
            let br02 = brokArr1[t].middleName
            G6.registerNode(br01, {
                draw: function draw(item) {
                    var group = item.getGraphicGroup();
                    group.addShape('text', {
                        attrs: {
                            x: 200,
                            y: 60,
                            fill: '#333',
                            text: br01
                        }
                    })
                    return group.addShape('rect', {
                        attrs: {
                            x: 200,
                            y: 30,
                            width: 50,
                            height: 50,
                            stroke: '#0099ff'
                        }
                    })
                }
            })
            data.nodes.push(
                {
                    id: br01,
                    x: 200,
                    y: (num1 + 1) * 80,
                    size: 20,
                    color: '#0099ff',
                    shape: br01
                }
            )

            data.edges.push({
                target: br01,
                source: br02,

                color: "#6495ed",
                shape: 'flowingEdge'
            })
            num1++
        }
        height1 = (num1 + 1) * 80 + 200
        let num2 = 0
        console.log('200', this.state.dataConsumer);
        for (var key in this.state.dataConsumer) {
            console.log('153', key);

            for (let n = 0; n < this.state.dataConsumer[key].length; n++) {
                let host = this.state.dataConsumer[key][n].coordinator.host + ":" + this.state.dataConsumer[key][n].coordinator.port
                let conmuse = key + "/" + this.state.dataConsumer[key][n].partition + "/" + host
                let conmuse1 = 'host:' + this.state.dataConsumer[key][n].host + '\n' + 'offset:' + this.state.dataConsumer[key][n].offset + '\n' + '剩余:' + this.state.dataConsumer[key][n].lag
                console.log('156', host);
                G6.registerNode(conmuse, {
                    draw: function draw(item) {
                        var group = item.getGraphicGroup();
                        group.addShape('text', {
                            attrs: {
                                x: 380,
                                y: 60,
                                fill: '#333',
                                text: conmuse1
                            }
                        })
                        return group.addShape('rect', {
                            attrs: {
                                x: 400,
                                y: 30,
                                width: 50,
                                height: 50,
                                stroke: '#0becf4'
                            }
                        })
                    }
                })
                data.nodes.push(
                    {
                        id: key + "/" + this.state.dataConsumer[key][n].topic + this.state.dataConsumer[key][n].partition + "/" + host,
                        x: 400,
                        y: (num2 + 1) * 80,
                        size: 10,
                        color: '#0becf4',
                        shape: conmuse
                    }
                )
                data.edges.push({
                    target: key + "/" + this.state.dataConsumer[key][n].topic + this.state.dataConsumer[key][n].partition + "/" + host,
                    source: host,
                    label: this.state.dataConsumer[key][n].partition == 0 ? "partition:0" : 'partition:' + this.state.dataConsumer[key][n].partition,
                    shape: 'flowingEdge',
                    color: "#30ae19",
                })

                num2++
            }


        }

        height2 = (num2 + 1) * 80 + 200
        console.log('173', data);

        if (this.state.flag) {
            graph3 = new G6.Graph({
                container: 'main',
                fitView: 'cc',
                height: height1 > height2 ? height1 : height2,
                // modes: {
                //     bluesky: ['mouseEnterFillRed', 'mouseLeaveResetFill']
                // },
                // mode: 'bluesky'

            });
        }
        this.setState({
            flag: false,

        })

        // graph.node({
        //     label: function label(model) {
        //         return model.id;
        //     }
        // });

        graph3.edge({
            style: {
                endArrow: true
            }
        });
        graph3.read(data);



    }
    fetchConsumer = (par) => {
        let reqSeqNo = randomNamber();
        this.setState({ loading: true });

        let params = {
            paginator: {
                pageNo: this.state.pagination.current,
                recordsPerPage: this.state.pagination.pageSize,
                doPagination: false
            },
            offset: this.state.par.offset,
            partition: this.state.par.partition,
            topicName: par.topicName,
            consumerId: par.consumerId,
            reqSeqNo: reqSeqNo
        }
        $fetch({
            url: '/tesla-gateway-console-app/eda/queryConsumerSubscribeByParameters',
            data: {
                ...params
            }
        }).then((res) => {
            console.log('276', res)
            //const _pagination = this.state.pagination;
            //_pagination.total = res.reply.consumerList.page.total;
            // _pagination.total =  '20000';      
            //_pagination.current = res.reply.consumerList.page.pageNo;
            let dataCom = {

            }
            let data1 = []
            for (var key in res.reply.result) {
                console.log(key);
                console.log(res.reply.result[key]);
                dataCom = {
                    'name': key,
                    'value': res.reply.result[key]
                }

                // for (let n = 0; n < res.reply.result[key].length; n++) {
                //     dataCom.value.push(res.reply.result[key][n])
                // }
                data1.push(dataCom)
            }


            console.log('289', data1);
            this.setState({
                // pagination: _pagination,
                dataConsumer: res.reply.result,
                loading: false,
                dataCom: data1
            }, () => {
                this.fetchData()

            })
        })



    };
    fetchProducer = () => {
        let reqSeqNo = randomNamber();
        this.setState({ loading: true });

        let params = {
            paginator: {
                pageNo: this.state.pagination.current,
                recordsPerPage: this.state.pagination.pageSize,
                doPagination: false
            },
            topicName: this.state.par.topicName,
            offset: this.state.par.offset,
            partitionNo: this.state.par.partition,
            reqSeqNo: reqSeqNo
        }
        $fetch({
            url: '/tesla-gateway-console-app/eda/queryRecord',
            data: {
                ...params
            }
        }).then((res) => {
            console.log('273', res)
            //const _pagination = this.state.pagination;
            //_pagination.total = res.reply.consumerList.page.total;
            // _pagination.total =  '20000';      
            //_pagination.current = res.reply.consumerList.page.pageNo;

            this.setState({
                // pagination: _pagination,
                dataProducer: res.reply.result,
                loading: false
            }, () => {
                this.myEcharts()

            })
        })

    }
    fetchData = () => {
        let reqSeqNo = randomNamber()
        let params = {
            paginator: {
                pageNo: this.state.pagination.current,
                recordsPerPage: this.state.pagination.pageSize,
                doPagination: false
            },

            reqSeqNo: reqSeqNo
        }
        console.log('44');
        this.setState({ loading: true });

        $fetch({
            url: '/tesla-gateway-console-app/eda/queryEdaMiddlewareList',
            data: {
                ...params
            }
        }).then((res) => {
            console.log('276', res)

            this.setState({
                // pagination: _pagination,
                data: res.reply.queryMiddlewareList.edaMiddlewareList,
                loading: false
            }, () => {

                this.fetchTopic()
            })
        })

    };
    fetchTopic = () => {
        let reqSeqNo = randomNamber();
        this.setState({ loading: true });


        let params = {
            paginator: {
                pageNo: this.state.pagination.current,
                recordsPerPage: this.state.pagination.pageSize,
                doPagination: false
            },
            topicName: this.state.par.topicName,
            subModuleId: '',
            reqSeqNo: reqSeqNo
        }
        $fetch({
            url: '/tesla-gateway-console-app/eda/queryEdaTopicByParam',
            data: {
                ...params
            }
        }).then((res) => {
            console.log('312', res);
            this.setState({
                // pagination: _pagination,
                dataTopic: res.reply.list.topicList,
                loading: false
            }, () => {

                this.fetchProducer()
            })
        })


    }
    changeSearch = (e) => {
        console.log('287', e.target.value);
        this.setState({
            searchValue: e.target.value
        })
    }
    offsetSearch = (e) => {
        console.log('287', e.target.value);
        this.setState({
            offsetValue: e.target.value
        })
    }
    partitionSearch = (e) => {
        console.log('287', e.target.value);
        this.setState({
            partitionValue: e.target.value
        })
    }
    consumerSearch = (e) => {
        console.log('287', e.target.value);
        this.setState({
            consumerValue: e.target.value
        })
    }
    onSearch = () => {

        if (this.state.searchValue == '') {
            alert('请输入topicName')
            return false
        }
        // if (this.state.offsetValue == '') {
        //     alert('offset')
        //     return false
        // }
        // if (this.state.partitionValue == '') {
        //     alert('请输入partition')
        //     return false
        // }
        // if (this.state.consumerValue == '') {
        //     alert('请输入consumerValue')
        //     return false
        // }
        this.fetchConsumer();

    }

    render() {

        return (
            <div className="single">

                {/* <span style={{ marginRight: '10px', fontSize: '14px' }}>topicName：</span>
                <Input
                    placeholder='请输入topicName'

                    style={{ width: 300 }}
                    size='large'
                    value={this.state.searchValue}
                    //value='PFPSTopic666'
                    onChange={this.changeSearch}
                />
                <span style={{ marginLeft: '10px' }}>(查询主题和生产者轨迹时必输)</span>
                <br></br>
                <br></br>
                <span style={{ marginRight: '46px', fontSize: '14px' }}>offset：</span>
                <Input
                    placeholder='请输入offset'

                    style={{ width: 300 }}
                    size='large'
                    value={this.state.offsetValue}
                    //value='PFPSTopic666'
                    onChange={this.offsetSearch}
                />

                <br></br>
                <br></br>
                <span style={{ marginRight: '27px', fontSize: '14px' }}>partition：</span>
                <Input
                    placeholder='请输入partition'

                    style={{ width: 300 }}
                    size='large'
                    value={this.state.partitionValue}
                    //value='PFPSTopic666'
                    onChange={this.partitionSearch}
                />

                <br></br>
                <br></br>
                {/* <Input
                    placeholder='请输入consumerId'

                    style={{ width: 300 }}
                    size='large'
                    value={this.state.consumerValue}
                    //value='PFPSTopic666'
                    onChange={this.consumerSearch}
                />
                <span style={{ marginLeft: '10px' }}>(查询消费者轨迹时必输)</span>
                <br></br>
                <br></br> */}
                {/* <Button id='btn' type='primary' onClick={this.onSearch} style={{ height: '32px' }}>搜索</Button>
                <br></br> */}

                <div style={{ height: '20px' }}>

                </div>

                <Table
                    dataSource={this.state.dataProducer} columns={this.state.columns1} size="middle" rowKey="id"
                    style={{ paddingLeft: 0, paddingRight: 0, }}>
                </Table>

                {this.state.dataCom ? this.state.dataCom.map((item) => {
                    return (
                        <Collapse accordion>
                            {item.value ? item.value.map((i, index) => {
                                return (
                                    <Panel header={i.topic + '-' + i.partition + (i.consumedFlag ? '（已消费）' : '（未消费）')} key={index}>
                                        <p>clientId:{i.clientId}</p>
                                        <p>consumedFlag:{i.consumedFlag}</p>
                                        <p>consumerId:{i.consumerId}</p>
                                        <p>host:{i.host}</p>
                                        <p>lag:{i.lag}</p>
                                        <p>logEndOffset:{i.logEndOffset}</p>
                                        <p>offset:{i.offset}</p>
                                        <p>partition:{i.partition}</p>
                                        <p>topic:{i.topic}</p>
                                        <p style={{ padding: '10px' }}>
                                            <div>host:{i.coordinator.host}</div>
                                            <div>id:{i.coordinator.id}</div>
                                            <div>idString:{i.coordinator.idString}</div>
                                            <div>port:{i.coordinator.port}</div>
                                            <div>rack:{i.coordinator.rack}</div>
                                        </p>
                                    </Panel>
                                )

                            }) : null}


                        </Collapse>

                    )
                }) : null

                }
                <div style={{ marginTop: '20px' }}>
                    <div className='rod4'></div>
                    <div className='text'>middlewareEngName</div>
                    <div className='rod5'></div>
                    <div className='text'>broker</div>
                    <div className='rod6'></div>
                    <div className='text'>consumer</div>
                </div>
                <div className="textbox">
                    <div id='main' ></div>
                </div>
            </div>

        )
    }
}
