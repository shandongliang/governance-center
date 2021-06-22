import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import G6 from '@antv/g6'
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';

import { randomNamber } from './../../../../util/publicFuc';
import SelectSubModule from  "../../../../component/selectSubModule/selectCommonSubModule"
import $fetch from '$fetch';
import { queryEdaTopicList } from "../request/service"

// import './../../../common/style/index.less';
import './index.less';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Search = Input.Search
let graph1 = ''
class ShowMessage extends Component {
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
            flag1: true,
            echart: true,
            dataT: [],
            dataCluster: [],
            module4Data: [],
            flag: true
        };
    }
    componentDidMount() {



    }
    myEcharts = () => {
        this.setState({
            echart: false
        })

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

        //鼠标进入
        // G6.registerBehaviour('mouseEnterFillRed', function (graph) {

        //     graph.behaviourOn('node:mouseenter', function (ev) {

        //         graph.update(ev.item, {

        //             label: ev.item.model.id
        //         });



        //     })
        // });
        //鼠标移出
        // G6.registerBehaviour('mouseLeaveResetFill', function (graph) {
        //     graph.behaviourOn('node:mouseleave', function (ev) {
        //         graph.update(ev.item, {

        //             label: ''
        //         })
        //     })
        // })

        let dataCluster = []
        let broker = []
        var data = {
            nodes: [],
            edges: [

            ]
        }
        let num1 = 0
        let height1 = 0;
        let height2 = 0;
        for (let j = 0; j < this.state.data.length; j++) {

            for (let a = 0; a < this.state.data[j].list.length; a++) {

                let broken = this.state.data[j].list[a].clusterAddress.split(",")
                console.log(broken);

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
        for (let t = 0; t < brokArr1.length; t++) {

            //let bro = middlewareEngName + broken[i]
            let br01 = brokArr1[t].broker
            let br02 = brokArr1[t].middleName
            G6.registerNode(br01, {
                draw: function draw(item) {
                    var group = item.getGraphicGroup();
                    group.addShape('text', {
                        attrs: {
                            x: 250,
                            y: 60,
                            fill: '#333',
                            text: br01
                        }
                    })
                    return group.addShape('rect', {
                        attrs: {
                            x: 250,
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
                    x: 250,
                    y: (num1 + 1) * 80,
                    size: 20,
                    color: '#0099ff',
                    shape: br01
                }
            )

            // data.edges.push({
            //     target: br01,
            //     source: br02,

            //     color: "#6495ed",
            //     shape: 'flowingEdge'
            // })
            num1++
        }
        height1 = (num1 + 1) * 80 + 200

        for (let a = 0; a < this.state.dataConsumer.length; a++) {
            let consumerId = this.state.dataConsumer[a].consumerId
            G6.registerNode(this.state.dataConsumer[a].topicName + "/" + this.state.dataConsumer[a].consumerId + 'c', {
                draw: function draw(item) {
                    var group = item.getGraphicGroup();
                    group.addShape('text', {
                        attrs: {
                            x: 450,
                            y: 50,
                            fill: '#333',
                            text: consumerId
                        }
                    })
                    return group.addShape('rect', {
                        attrs: {
                            x: 450,
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
                    id: this.state.dataConsumer[a].topicName + "/" + this.state.dataConsumer[a].consumerId + 'c',
                    x: 450,
                    y: (a + 1) * 80,

                    shape: this.state.dataConsumer[a].topicName + "/" + this.state.dataConsumer[a].consumerId + 'c',
                }
            )
            height2 = (a + 1) * 80 + 200

            if (this.state.dataConsumer[a].topicName == this.state.dataTopic[0].topicName) {
                for (let i = 0; i < brokArr1.length; i++) {
                    if (this.state.dataTopic[0].clusterId == brokArr1[i].middleName) {

                        data.edges.push({
                            target: this.state.dataConsumer[a].topicName + "/" + this.state.dataConsumer[a].consumerId + 'c',
                            source: brokArr1[i].broker,
                            color: "#150bf4",
                            shape: 'flowingEdge'
                        })
                        console.log('159', data);
                    }
                }
            }
        }
        console.log('162', data);

        for (let b = 0; b < this.state.dataProducer.length; b++) {
            let producerId = this.state.dataProducer[b].producerId
            G6.registerNode('main' + b, {
                draw: function draw(item) {
                    var group = item.getGraphicGroup();
                    group.addShape('text', {
                        attrs: {
                            x: 100,
                            y: 50,
                            fill: '#333',
                            text: producerId
                        }
                    })
                    return group.addShape('rect', {
                        attrs: {
                            x: 100,
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
                    id: this.state.dataProducer[b].topicName + "/" + this.state.dataProducer[b].producerId + 'p',
                    x: 100,
                    y: (b + 1) * 80,

                    shape: 'main' + b
                }
            )
            if (this.state.dataProducer[b].topicName == this.state.dataTopic[0].topicName) {
                for (let i = 0; i < brokArr1.length; i++) {
                    if (this.state.dataTopic[0].clusterId == brokArr1[i].middleName) {

                        data.edges.push({
                            target: brokArr1[i].broker,
                            source: this.state.dataProducer[b].topicName + "/" + this.state.dataProducer[b].producerId + 'p',
                            color: "blue",
                            shape: 'flowingEdge'
                        })
                        console.log('159', data);
                    }
                }
            }
        }

        console.log('268', height1, height2);
        if (this.state.flag) {
            graph1 = new G6.Graph({
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
            a: false,

        })


        // graph.node({
        //     label: function label(model) {
        //         return model.id;
        //     }
        // });

        graph1.edge({
            style: {
                endArrow: true
            }
        });
        // this.timer1 = setInterval(function () {
        //     // graph.update(this.state.data[0].middlewareChName, {

        //     // })

        //     console.log('384');
        // }, 1000)
        console.log('306', data);
        graph1.read(data);

    }
    fetchConsumer = () => {
        let reqSeqNo = randomNamber();
        this.setState({ loading: true });
        let params = {
            paginator: {
                pageNo: this.state.pagination.current,
                recordsPerPage: this.state.pagination.pageSize,
                doPagination: false
            },
            topicName: this.state.searchValue,

            reqSeqNo: reqSeqNo
        }
        $fetch({
            url: '/tesla-gateway-console-app/eda/queryEdaSubscribeByParam',
            data: {
                ...params
            }
        }).then((res) => {
            console.log('276', res)
            //const _pagination = this.state.pagination;
            //_pagination.total = res.reply.consumerList.page.total;
            // _pagination.total =  '20000';      
            //_pagination.current = res.reply.consumerList.page.pageNo;
            this.setState({
                // pagination: _pagination,
                dataConsumer: res.reply.resultList.subscribeList,
                loading: false
            }, () => {

                this.fetchProducer()
            })
        }).catch(error => {

            this.setState({ a: false, });

        });
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
            topicName: this.state.searchValue,

            reqSeqNo: reqSeqNo
        }
        $fetch({
            url: '/tesla-gateway-console-app/eda/queryEdaTopicRelationByParam',
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
                dataProducer: res.reply.resultList.topicRelationList,
                loading: false,

            }, () => {
                //if (this.state.echart) {
                this.myEcharts()
                //}
                // this.MessagesInPerSec()
            })
        }).catch(error => {

            this.setState({ a: false, });

        });
    }
    MessagesInPerSec = () => {

    }
    fetchData = (v) => {
        let reqSeqNo = randomNamber()
        let params = {
            paginator: {
                pageNo: this.state.pagination.current,
                recordsPerPage: this.state.pagination.pageSize,
                doPagination: false
            },

            reqSeqNo: reqSeqNo
        }
        this.setState({ loading: true });

        $fetch({
            url: '/tesla-gateway-console-app/eda/queryEdaMiddlewareList',
            data: {
                ...params
            }
        }).then((res) => {
            console.log('276', res)
            //const _pagination = this.state.pagination;
            //_pagination.total = res.reply.consumerList.page.total;
            // _pagination.total =  '20000';      
            //_pagination.current = res.reply.consumerList.page.pageNo;
            this.setState({
                // pagination: _pagination,
                data: res.reply.queryMiddlewareList.edaMiddlewareList,
                loading: false
            }, () => {


                this.fetchTopic()

            })
        }).catch(error => {

            this.setState({ a: false, });

        });
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
            topicName: this.state.searchValue,
            reqSeqNo: reqSeqNo
        }
        $fetch({
            url: '/tesla-gateway-console-app/eda/queryEdaTopicByParam',
            data: {
                ...params
            }
        }).then((res) => {
            this.setState({
                // pagination: _pagination,
                dataTopic: res.reply.list.topicList,
                loading: false
            }, () => {
                if (JSON.stringify(this.state.dataTopic) == '[]') {
                    alert('没有对应主题事件')
                    console.log('385');
                    return false
                }

                let arr = []

                for (let i = 0; i < this.state.dataTopic.length; i++) {
                    if (this.state.dataTopic[i].topicName == this.state.searchValue) {
                        arr.push(this.state.dataTopic[i])
                    }
                }


                this.setState({
                    dataTopic: arr
                }, () => {
                    console.log(this.state.dataCluster);
                })

                this.fetchConsumer()
            })
        }).catch(error => {

            this.setState({ a: false, });

        });
    }

    topicChange = (e) => {
        console.log('287', e);
        this.setState({
            searchValue: e
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            this.setState({
                searchValue: values.topicName[0],
                a: true
            }, () => {
                this.fetchData()
            })
            console.log(512, values);

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
    topicData = (data) => {

        this.props.form.setFieldsValue({
            "topicName": data,

        })
        this.setState({
            module4Data: data,

        })
    }
    componentWillUnmount() {
        clearInterval(this.timer1)
        clearInterval(this.timer2)
    }
    render() {

      const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 }
    }
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='multipleTrackIndex'>
                <div className="maskc" style={{ display: this.state.a ? 'block' : 'none' }}></div>
                <div className="maskc1" style={{ display: this.state.a ? 'block' : 'none' }}>正在查询...</div>
                <Form onSubmit={this.handleSubmit} autoComplete='on'>


                    <SelectSubModule onRef={this.onRef} callbackParent={this.onChildQuery} itemCol={4}/>
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
                    </Row>
                    <Button htmlType="submit" type='primary' className="operatorBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>查询</Button>
                    <div style={{ marginTop: '20px' }}>
                        <div className='rod4'></div>
                        <div className='text'>producer</div>
                        <div className='rod5'></div>
                        <div className='text'>broker</div>
                        <div className='rod6'></div>
                        <div className='text'>consumer</div>
                    </div>
                    <div className="textbox">
                        <div id='main' style={{ width: 1000, }}></div>
                    </div>
                </Form>
            </div>



        )
    }
}
export default Form.create()(ShowMessage)