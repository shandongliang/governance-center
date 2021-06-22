import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactDOM from 'react-dom';
import { Row, Col, Button } from 'antd';

import { randomNamber } from './../../../../util/publicFuc';
import $fetch from '$fetch';
import "./detailed.less"
import { goTo, goToAndClose } from '../../../../util/tabRouter';
export default class BusinessKeyDetail extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    constructor(props) {
        super(props)
        this.state = {
            businessKey: '',
            produceId: "",
            produceIP: "",
            produceSendTime: "",
            producerCostTime: "",
            produceStatus: "",
            consumer: []
        }
    }
    componentWillMount() {
        console.log(2323, this.props.match.params.id)
        this.setState({
            businessKey: this.props.match.params.id
        })

    }
    componentDidMount() {
        let reqSeqNo = randomNamber();
        $fetch({
            url: '/tesla-gateway-console-app/hbase/queryDetailMessage',
            data: {
                "reqSeqNo": reqSeqNo,
                "businessKey": this.props.match.params.id
            }
        }).then((res) => {
            if (res.reply.returnCode.type == "S") {
                this.setState({
                    produceId: res.reply.producer.produceId,
                    produceIP: res.reply.producer.produceIP,
                    produceSendTime: res.reply.producer.produceSendTime,
                    producerCostTime: res.reply.producer.producerCostTime,
                    produceStatus: res.reply.producer.produceStatus,
                    consumer: res.reply.consumer
                })
            }
        })

    }
    //返回
    back = () => {
        let path = {
          pathname:"/eventDriven/messageTopology/allWayMessage"
        }
        goTo(path,"消息轨迹查询前置页");
    }
    render() {

        console.log(222, this.state.consumer)

        return <div className="businesskeyDetail">
            <Row>
                <Col span={8}>
                    <div className="businessName">
                        <span >
                            <i className="businessColor"> {this.state.businessKey}</i>的消息轨迹
                    </span>
                    </div>


                </Col>
            </Row>
            <table className='businessTable'>
                <tr className='businessTableHead'>
                    <td> 生产者 </td>
                    {/* <td> Topic </td> */}
                    <td> 消费者 </td>
                    <td> 消费详情 </td>
                </tr>
                <tr>
                    <td className="businessBorder">


                        <div>
                            <p> 编号:{this.state.produceId}</p>
                            <p> 发送端:{this.state.produceIP}</p>
                            <p> 发送时间:{this.state.produceSendTime}</p>
                            <p> 耗时时间:{this.state.producerCostTime}</p>
                            {
                                this.state.produceStatus == '01' ? <p> 状态: <i className="success">发送成功</i></p> : <p> 状态: <i className="failed">发送失败</i></p>
                            }


                        </div>


                    </td>
                    {/* <td className="businessBorder">
                        <div>
                            <p> Topic:"主题名称"</p>
                            <p> Key:"主题业务标识"</p>
                            <p> 集群:"主题集群"</p>
                        </div>


                    </td> */}
                    <td colSpan="2">
                        {
                            this.state.consumer.length > 0 ?
                                this.state.consumer.map((item, index) => {
                                    return <div className="businessElem" key={index}>
                                        <div className="left">
                                            <div className='contentL'>
                                                <p>{item.consumerId}</p>
                                                {item.consumeStatus == "04" ? <p>状态：<i className="success">成功</i></p> : <p>状态 <i className="failed">失败</i></p>}

                                            </div>

                                        </div>
                                        <div className="right">
                                            {item.consumeList.length > 0 ?

                                                <div className='contentR'>{
                                                    item.consumeList.map((ins, i) => {
                                                        return <p key={i}>第{ins.consumeTimes}次{ins.consumeStatus == '04' ? <i className="success">消费成功</i> : <i className="failed">失败</i>}，IP:{ins.consumeIp}</p>
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
            </table>
            <div className='businessButton'>
                <Button type="primary" onClick={this.back} style={{ fontSize: "16px", borderRadius: "5px" }}>返回</Button>
            </div>


        </div>
    }
}