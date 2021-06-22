import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import echarts from 'echarts';

import { goTo, goToAndClose } from '../../../../util/tabRouter';
import { Breadcrumb, Icon, Spin, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table, Collapse } from 'antd';
import moment from 'moment';
// import inView from 'in-view'
import { randomNamber } from './../../../../util/publicFuc';
import TreeMap from "./treeMap"
import $fetch from '$fetch';
import "./allWayMessage.less"

// window.inView = inView


const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
//随机字符串
function rand(len) {
    len = len || 32;
    let charts = "ABCDEFGHIJKMNPQRSTWXYZabcdefghijklmnopqrstuvwxyz"
    let maxPos = charts.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += charts.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd;
}
//防抖动
function debounce(fn, delta, context) {
    var timeoutID = null;
    return () => {
        clearTimeout(timeoutID);
        var args = arguments;
        timeoutID = setTimeout(function () {
            fn.apply(context, args);
        }, delta)
    }
}
class AllWayMessage extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    constructor(props) {
        super(props);
        this.state = {
            inview: [],
            loading: false,
            businesskeyDetail: '',
            businesskeyShow: false,
            failShow: false,
            businessKey: '',
            topicName: "",
            produceId: "",
            produceIP: "",
            produceSendTime: "",
            producerCostTime: "",
            produceTimestamp: '',
            produceStatus: "",
            consumer: [],
            echartData: [],
            failStatus: ['02', '05', '06', '08', '12'],
            statusDetail: {
                "00": '开始发送',
                "01": '发送成功',
                "02": '发送失败',
                "03": '开始消费',
                "04": '消费成功',
                "05": '业务异常',
                "06": '消费异常',
                "07": '死信成功',
                "08": '死信失败',
                "10": '开始重投',
                "11": '重投成功',
                "12": '重投失败',
            }
        };
        this.id = []
        // this.chart = null;
    }
    componentDidMount() {
        // console.log("id", this.id)
        // inView.offset({
        //     top: 800
        // })

        // const el = document.getElementById(this.id)

        // // debouce
        // document.querySelector('.ant-layout-content').parentElement.onscroll = () =>{
        //     if (inView.is(el) && !this.state.inview) {
        //         console.log(123123123)
        //         this.setState({
        //             inview: true
        //         })
        //     }
        // }

        // inView(`#${this.id}`).once('enter', () => {
        //     console.log(123123123)
        //     this.setState({
        //         inview: true
        //     })
        // })

    }

    // inView函数
    // inView = () => {
    //     let hight = document.querySelector('.ant-layout-content').parentElement.onscroll;
    //     console.log(hight)

    // }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState !== this.state || nextProps !== this.Props) {
            return true;
        }
        return false;
    }

    componentWillUpdate(nextProps, nextState) {

        for (let i = 0; i < nextState.echartData.length; i++) {

            this.id.push(rand());

        }
    }
    componentDidUpdate(nextProps, nextState) {
        // debounce(this.inView, 500)
        if (nextState.echartData !== this.state.echartData) {

            // this.Echarts(this.state.echartData)
        }
    }

    //自定义点击事件 模态框
    clickFun = (param) => {
        if (typeof param.seriesIndex == 'undefined') {
            return;
        }

        if (param.type == 'click') {
            if (param.data.children && param.value) {
                this.setState({
                    businesskeyDetail: param.value,
                    businesskeyShow: true
                }, () => {
                    let reqSeqNo = randomNamber();
                    $fetch({
                        url: '/tesla-gateway-console-app/hbase/queryDetailMessage',
                        data: {
                            "reqSeqNo": reqSeqNo,
                            "businessKey": param.value
                        }
                    }).then((res) => {
                        if (res.reply.returnCode.type == "S") {
                            this.setState({
                                produceId: res.reply.producer.produceId,
                                produceIP: res.reply.producer.produceIP,
                                produceSendTime: res.reply.producer.produceSendTime,
                                producerCostTime: res.reply.producer.producerCostTime,
                                produceStatus: res.reply.producer.produceStatus,
                                produceTimestamp: res.reply.producer.produceTimestamp,
                                topicName: res.reply.producer.topicName,
                                consumer: res.reply.consumer
                            })
                        }
                    })
                })
            }
        }
    }
    //查询
    onSearch = (e) => {
        e.preventDefault();
        let reqSeqNo = randomNamber();
        this.setState({
            loading: true
        })
        try {
            this.props.form.validateFields((err, value) => {
                if (err) {
                    return false;
                } else {
                    let id = value.businesskey
                    // myChart = echarts.init(this.el);
                    // myChart.showLoading()

                    $fetch({
                        url: '/tesla-gateway-console-app/hbase/queryResultMessage',
                        data: {
                            "reqSeqNo": reqSeqNo,
                            "businessKey": id
                        }
                    }).then((res) => {
                        if (res.reply.returnCode.type == "S") {
                            this.setState({
                                echartData: res.reply.result,
                                loading: false
                            })
                            // myChart.hideLoading()
                        }
                    })
                }
            })
        } catch (error) {
            this.setState({
                loading: false
            })
        }



    }
    //模态框隐藏
    businessKeyCancel = () => {
        this.setState({
            businesskeyShow: false
        })
    }
    //producefailDetail 生产者失败详情
    producefailDetail = () => {
        let reqSeqNo = randomNamber();
        let params = {
            reqSeqNo: reqSeqNo,
            businessKey: this.state.businesskeyDetail,
            errorType: this.state.produceId,
            time: this.state.produceTimestamp
        }
        $fetch({
            url: '/tesla-gateway-console-app/hbase/queryErrorMessage',
            data: params
        }).then((res) => {
            if (res.reply.returnCode.type == "S") {
                this.setState({
                    failContent: res.reply.errorMessage || '',
                    businesskeyShow: false,

                }, () => {
                    this.fail();
                })

            }
        })
    }
    //failDetail 失败详情
    failDetail = (time, item) => {

        let reqSeqNo = randomNamber();

        let params = {
            reqSeqNo: reqSeqNo,
            businessKey: this.state.businesskeyDetail,
            errorType: item.consumerId,
            time: time
        }
        $fetch({
            url: '/tesla-gateway-console-app/hbase/queryErrorMessage',
            data: params
        }).then((res) => {
            if (res.reply.returnCode.type == "S") {
                this.setState({
                    failContent: res.reply.errorMessage || '',
                    businesskeyShow: false,

                }, () => {
                    this.fail();
                })

            }
        })
    }
    fail = () => {
        let _this = this;
        Modal.error({
            title: "失败详情",

            okText: "返回",
            content: <div style={{ wordWrap: "break-word" }}>{_this.state.failContent}</div>,
            onOk() {
                _this.setState({
                    businesskeyShow: true,
                })
            },


        })
    }
    //messageDetail 消息体
    messageDetail = () => {
        let reqSeqNo = randomNamber();
        let params = {
            reqSeqNo: reqSeqNo,
            businessKey: this.state.businesskeyDetail,
        }
        $fetch({
            url: '/tesla-gateway-console-app/hbase/queryEDAMessage',
            data: params
        }).then((res) => {
            if (res.reply.returnCode.type == "S") {
                this.setState({
                    messageContent: res.reply.EDAMessage || '',
                    businesskeyShow: false,

                }, () => {
                    let _this = this;
                    Modal.info({
                        title: "消息体",

                        okText: "返回",
                        content: <div style={{ wordWrap: "break-word" }}>{_this.state.messageContent}</div>,
                        onOk() {
                            _this.setState({
                                businesskeyShow: true,
                            })


                        },


                    })
                })

            }
        })
    }
    render() {

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 10 }
        }
        const { getFieldDecorator } = this.props.form;

        const failStatus = this.state.failStatus;
        const statusDetail = this.state.statusDetail;
        let statusP;
        let statusI;

        return (
            <div className="allWayMessage">

                <Form>
                    <FormItem label="事件标识（businesskey）"  {...formItemLayout}>
                        {getFieldDecorator('businesskey', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true, message: '请输入事件标识（businesskey）'
                                },
                            ],
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>

                </Form>

                <Button type='primary' onClick={this.onSearch} style={{ fontSize: "16px", borderRadius: "5px" }}>查询</Button>
                <div style={{ padding: "20px" }}>
                    <span className='greenLine'></span>  绿线代表消费成功
                     <span className='redLine'></span> 红线代表消费失败
                     <span className='greenCircle'></span>  绿点代表可点击进入详情页面
                     <span className='grayCircle'></span>  灰点表示不可点击
                </div>
                {/* 消息全链路*/}

                <Spin spinning={this.state.loading} delay={500} tip="加载中...">
                    {
                        this.state.echartData.length > 0 &&
                        this.state.echartData.map((item, index) => {
                            return <div id={this.id[index]} style={{ width: "100%", height: 500 }} key={index} >

                                <TreeMap data={item} clickFun={this.clickFun}></TreeMap>
                            </div>
                        })

                    }
                </Spin>
                {/* <div id={this.id} style={{ width: "100%", height: 500 }} className="treemap">
                    {
                        this.state.inview ?
                            <TreeMap></TreeMap> : null
                    }

                </div> */}

                {/* businesskey详情 */}
                <Modal
                    visible={this.state.businesskeyShow}
                    title={[
                        <span key='businessTitle' className='businessTitle'> <i className="businessColor">{this.state.businesskeyDetail}</i>的消费轨迹</span>
                    ]}

                    onCancel={this.businessKeyCancel}
                    className="businesskeyDetail"
                    footer={[
                        <Button key='goBack' type="primary" onClick={this.businessKeyCancel}>返回</Button>
                    ]}
                >
                    <table className="businesstable">
                        <tbody>
                            <tr >
                                <td className="businessProducer">生产者</td>
                                <td className="businessConsumer">
                                    <div>
                                        <div className="consumerhead">
                                            消费者
                                    </div>
                                        <div className="consumerDetailhead">
                                            消费详情
                                    </div>

                                    </div>

                                </td>
                            </tr>

                            <tr>
                                <td className="businessProducerContent">
                                    <p> 主题:{this.state.topicName}</p>
                                    <p> 编号:{this.state.produceId}</p>
                                    <p> 发送端:{this.state.produceIP}</p>
                                    <p> 发送时间:{this.state.produceSendTime}</p>
                                    <p> 耗时:{this.state.producerCostTime}</p>
                                    {
                                        this.state.produceStatus == '01' ? <p> 状态: <i className="success">发送成功</i></p> : <p> 状态: <i className="failed">发送失败</i> <a onClick={this.producefailDetail}>失败详情</a> </p>
                                    }
                                    <p> <a onClick={this.messageDetail}>消息体</a></p>
                                </td>
                                <td className="businessConsumerContent">
                                    {
                                        this.state.consumer.length > 0 ?
                                            this.state.consumer.map((item, index) => {
                                                if (failStatus.indexOf(item.consumeStatus) == -1) {
                                                    statusP = (<p>状态：<i className="success">成功</i></p>);
                                                } else {
                                                    statusP = (<p>状态：<i className="failed">失败</i></p>);
                                                }

                                                return <div className="businessElem" key={index}>
                                                    <div className="left">
                                                        <div className='contentL'>
                                                            <p>编号：{item.consumerId}</p>
                                                            <p>耗时：{item.consumeTime}</p>
                                                            {statusP}
                                                        </div>

                                                    </div>
                                                    <div className="right">
                                                        {item.consumeList.length > 0 ?

                                                            <div className='contentR'>{
                                                                item.consumeList.map((ins, i) => {
                                                                    if (failStatus.indexOf(ins.consumeStatus) == -1) {

                                                                        let detailText = statusDetail[ins.consumeStatus];
                                                                        statusI = (<i className="success">{detailText}</i>);
                                                                    } else {
                                                                        let detailText = statusDetail[ins.consumeStatus];
                                                                        //statusI = (<i className="failed">{detailText}</i>);
                                                                        statusI = (<span><i className="failed">{detailText}</i> <a className='failDetail' onClick={() => this.failDetail(ins.consumeTimestamp, item)}>失败详情</a></span>);
                                                                    }

                                                                    return <p key={i}>第{ins.consumeTimes}次,
                                                                {moment(ins.consumeTimestamp).format('YYYY-MM-DD HH:mm:ss')},
                                                                IP:{ins.consumeIp}{statusI}</p>
                                                                })
                                                            }





                                                            </div> : null
                                                        }


                                                    </div>

                                                </div>
                                            }) : null
                                    }


                                </td>
                            </tr>

                        </tbody>
                    </table>

                </Modal>

            </div>


        )
    }

}
export default Form.create()(AllWayMessage)