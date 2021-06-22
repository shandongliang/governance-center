import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { randomNamber } from './../../../../util/publicFuc';
import $fetch from '$fetch';

//固钉存在问题，不能实现效果，而且不知何种情况会突然产生作用
// import { Affix } from 'antd';
import { Button } from 'antd';

import EchartsState from './../../../../component/echarts-state/echartsState';

export default class MultipleTrack extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    constructor() {
        super();
        this.state = {
            data: [],
            pagination: {
                pageSize: 10,
                pageSizeChanger: true,
                current: 1
            },
            //传入echartsState组件的数据，用来控制echarts的loading显示
            dataForEcharts: null,
            showAll: false
        };
    }
    componentDidMount() {

        var _this = this
        let reqSeqNo = randomNamber()
        let params = {
            paginator: {
                pageNo: this.state.pagination.current,
                recordsPerPage: this.state.pagination.pageSize,
                doPagination: false
            },
            reqSeqNo: reqSeqNo
        }
        _this.fetchData(params);

    }

    fetchData = (params) => {
        $fetch({
            url: '/tesla-gateway-console-app/eda/queryEdaMiddlewareListAndStatus',
            data: {
                ...params
            }
        }).then((res) => {
            this.setState({
                // pagination: _pagination,
                data: res.reply.result.edaMiddlewareList,
            }, () => {
                this.changeData()
            })
        })
    };


    //整理Echarts图标数据
    changeData = () => {
        let data = this.state.data;
        let dataForEcharts = [];
        //设置各级节点样式
        //逻辑集群样式
        const style1 = {
            itemStyle: {
                color: "#00ae9d",
                borderColor: "#00ae9d"
            },
            label: {
                color: "#00ae9d"
            }
        };
        //物理集群样式
        const style2 = {
            itemStyle: {
                color: "#1890ff",
                borderColor: "#1890ff"
            },
            label: {
                color: "#1890ff"
            },
            lineStyle: {
                color: "#1890ff"
            }
        };
        //zk样式
        const style3 = {
            itemStyle: {
                color: "#faad14",
                borderColor: "#faad14"
            },
            label: {
                color: "#faad14"
            },
            lineStyle: {
                color: "#faad14"
            }
        };
        //broker样式
        const style4 = {
            itemStyle: {
                color: "#52c41a",
                borderColor: "#52c41a"
            },
            label: {
                color: "#52c41a"
            },
            lineStyle: {
                color: "#52c41a"
            }
        };
        //zk或broker不可用时的样式
        const style5 = {
            itemStyle: {
                color: "#ccc",
                borderColor: "#ccc"
            },
            label: {
                color: "#ccc"
            },
            lineStyle: {
                color: "#ccc"
            }
        };
        for (let i = 0; i < data.length; i++) {
            let middlewareEngName = data[i].middlewareEngName
            //插入逻辑集群
            dataForEcharts.push(Object.assign({ "name": middlewareEngName, value: "逻辑集群", "children": [] }, style1));
            for (let j = 0; j < data[i].list.length; j++) {
                let clusterName = data[i].list[j].clusterName;
                //插入物理集群
                dataForEcharts[i]['children'].push(Object.assign({ "name": clusterName, "children": [] }, style2));
                //获取zk和broker可用状态
                let nodeStatus = data[i].list[j].nodeStatus;
                //整理zk
                let adminAddress = data[i].list[j].adminAddress;
                let zk = adminAddress.split("ZK=")[1].split(",");
                let clusterAddress = data[i].list[j].clusterAddress.split(",");
                //整理broker
                let broker = [];
                for (let l = 0; l < clusterAddress.length; l++) {
                    //判断broker是否可用，选定样式
                    let stylebroker = nodeStatus[clusterAddress[l]] === 'N' ? style5 : style4;
                    broker.push(Object.assign({ "name": clusterAddress[l] }, stylebroker));
                }
                for (let k = 0; k < zk.length; k++) {
                    //判断zk是否可用，选定样式
                    let stylezk = nodeStatus[zk[k]] === 'N' ? style5 : style3;
                    //插入zk和broker
                    dataForEcharts[i]['children'][j]['children'].push(Object.assign({ "name": zk[k], "children": broker }, stylezk));
                }
            }
        }
        this.setState({
            dataForEcharts
        });
    }

    //切换showAll状态
    handleShowAll = () => {
        this.setState({
            showAll: true
        })
    }
    handleHideAll = () => {
        this.setState({
            showAll: false
        })
    }
    render() {
        const dataForEcharts = this.state.dataForEcharts;
        const showAll = this.state.showAll;

        const tipStyle = { display: 'inline-block', borderRadius:'5px',padding: '4px 12px', background: '#ff7800', color: '#fff' }
        
        let initEcharts = null;
        //判断showAll，配置组件props
        if (dataForEcharts) {
            // initEcharts = dataForEcharts.map((v, i) =>
            //     <div>
            //         <EchartsState data={v} key={i} eId={"echarts-state-main" + i} showAll={showAll} />
            //     </div>
            // )
            if (showAll) {
                initEcharts = dataForEcharts.map((v, i) =>
                    <div>
                        <EchartsState data={v} key={i} eId={"echarts-state-main" + i} showAll='true' />
                    </div>
                )
            }
            else {
                initEcharts = dataForEcharts.map((v, i) =>
                    <div>
                        <EchartsState data={v} key={i} eId={"echarts-state-main" + i} showAll='false' />
                    </div>
                )
            }
        } else {
            initEcharts = <EchartsState />;
        }
        return (
            <div>
                {/* <Affix offsetTop={10} ></Affix> */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ border: '1px solid #ccc', paddingLeft: '8px' }}>
                        <div style={tipStyle}>
                            节点图例
                        </div>
                        <Legend name="逻辑集群" color="#00ae9d" />
                        <Legend name="物理集群" color="#1890ff" />
                        <Legend name="zk" color="#faad14" />
                        <Legend name="broker" color="#52c41a" />
                        <Legend name="不可用" color="#ccc" />
                    </div>
                    <div style={{ border: '1px solid #ccc', paddingLeft: '8px' }}>
                        <div style={tipStyle}>
                            操作提示
                        </div>
                        <Legend name="点击收起" color="#ff7800" />
                        <Legend name="点击展开" color="#ff7800" isFilled={true} />
                    </div>
                </div>
                <div style={{paddingTop:'8px'}}>
                    <Button type="primary" onClick={this.handleShowAll}>显示全部</Button>
                    <Button type="primary" onClick={this.handleHideAll}>收起节点</Button>                
                </div>

                {initEcharts}
            </div>
        )
    }
}
//创建图例组件
function Legend(props) {

    let name = props.name, color = props.color, width = "10px", height = "10px", borderWidth = "1.5px", fontSize = "9px";
    let isFilled = props.isFilled;
    let circleStyle = {
        display: "inline-block",
        width,
        height,
        border: `${borderWidth} solid ${color}`,
        borderRadius: "50%",
        marginRight: "8px"
    }
    let filedStyle = {
        display: "inline-block",
        width,
        height,
        border: `${borderWidth} solid ${color}`,
        borderRadius: "50%",
        marginRight: "8px",
        backgroundColor: color
    }
    let rootStyle = {
        display: "inline-block",
        color,
        lineHeight: "13px",//修改高度或边框宽度时，记得改
        fontSize,
        margin: "10px"
    }
    return (
        <div style={rootStyle}>
            <div style={isFilled ? filedStyle : circleStyle}></div>
            {name}
        </div>
    )
}