import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Echarts from "echarts"

export default class EchartsState extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.eId,
            data: this.props.data,
            showAll: this.props.showAll,
            myChart: null
        }
    }
    componentDidMount() {
        const data = this.state.data;
        const id = this.state.id;
        const showAll = this.state.showAll;

        if (data && id) {
            let el = document.getElementById(id)
            //基于准备好的dom，初始化echarts实例
            let myChart = Echarts.init(el);
            this.setState({
                myChart
            })
            this.showEcharts(myChart, data, showAll);
            myChart.on('click', function (params) {
                if (params.componentType === 'series') {
                    //点击到series上
                    if (!params.value) {
                        //点击的节点有子分支（可点开）
                        let elesArr = Array.from(new Set(myChart._chartsViews[0]._data._graphicEls));
                        let height = 150;//这里限制最小高度，与挂载元素初始高度一致
                        let currentHeight = 15 * (elesArr.length - 1) || 15;//每项15px
                        let newHeight = Math.max(currentHeight, height);
                        el.style.height = newHeight + 'px';
                        myChart.resize();
                    }
                }
            })
        } else {
            this.showLoading();
        }


    }
    componentWillReceiveProps(nextProps) {
        const data = nextProps.data;
        const id = nextProps.eId;
        const showAll = nextProps.showAll;
        const myChart = this.state.myChart;

        if (data && id && showAll) {
            const el = document.getElementById(id);
            if (showAll === 'true') {
                //计算最大节点数
                let nodeCount = 0;
                for (let i = 0; i < data['children'].length; i++) {
                    for (let j = 0; j < data['children'][i]['children'].length; j++) {
                        nodeCount += data['children'][i]['children'][j]['children'].length;
                    }
                }
                //根据节点数，设置dom元素高度
                el.style.height = nodeCount * 15 + 'px';
            } else {
                el.style.height = '150px';
            }
            //重新配置，绘制echarts图表
            this.showEcharts(myChart, data, showAll);
            //重置echarts图表大小
            myChart.resize();
        }
    }
    showEcharts = (myChart, data, showAll) => {
        myChart.hideLoading();
        //绘制图标
        Echarts.util.each(data.children, function (datum, index) {
            index % 2 === 0 && (datum.collapsed = true);
        });
        let option = {
            legend: {},
            series: [
                {
                    type: 'tree',

                    data: [data],

                    top: '1%',
                    left: '20%',
                    bottom: '1%',
                    right: '20%',

                    symbolSize: 10,

                    label: {
                        normal: {
                            position: 'left',
                            verticalAlign: 'middle',
                            align: 'right',
                            fontSize: 9
                        },
                        emphasis: {
                            fontSize: 19
                        }
                    },

                    leaves: {
                        label: {
                            normal: {
                                position: 'right',
                                verticalAlign: 'middle',
                                align: 'left'
                            }
                        }
                    },

                    itemStyle: {
                        emphasis: {
                            borderColor: 'rgba(0,0,0,.5)',
                            borderWidth: 2
                        }
                    },


                    expandAndCollapse: true,
                    initialTreeDepth: showAll === 'true' ? -1 : 1,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }
            ]
        };
        myChart.setOption(option, true);
    }
    showLoading = () => {
        el = document.getElementById("loading");
        //基于准备好的dom，初始化echarts实例
        let myChart = Echarts.init(el);
        myChart.showLoading();
    }
    render() {
        const data = this.state.data;
        const id = this.state.id;
        if (data && id) {
            return (
                <div id={id} style={{ width: "100%", height: "150px" }}></div>
            )
        } else {
            return (
                <div id="loading" style={{ width: "100%", height: "200px" }}></div>
            )
        }
    }
}