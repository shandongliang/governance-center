import React, { Component } from 'react';


import echarts from 'echarts';

export default class TreeMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            option: {

                series: {
                    type: 'tree',
                    name: 'tree0',
                    data: [{
                        name: "flare",
                        children: [{
                            name: "data",
                            children: [{ name: "dirty", value: 123 }]
                        }]
                    }],
                    top: '5%',
                    left: '10%',
                    bottom: '5%',
                    right: '20%',
                    symbolSize: 7,
                    label: {
                        normal: {
                            position: 'top',

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

                    expandAndCollapse: false,

                    animationDuration: 550,
                    animationDurationUpdate: 750

                },


            }
        }
    }
    componentWillMount() {
        console.log(1111, this.props.data)
        this.state.option.series.data = [this.props.data]
    }
    componentDidMount() {
        this.myChart = echarts.init(this.echartDom);
        this.myChart.on("click", this.clickFun);
        this.myChart.setOption(this.state.option)
    }
    clickFun = (param) => {
        this.props.clickFun(param)
    }
    componentWillReceiveProps(Nextprops) {

        this.state.option.series.data = [];
        this.state.option.series.data = [Nextprops.data]

    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState !== this.state || nextProps !== this.Props) {


            return true;
        }
        return false;
    }
    componentDidUpdate() {
        this.myChart.setOption(this.state.option, true)
    }
    render() {
        return <div style={{ width: "100%", height: 500 }} ref={(e) => this.echartDom = e}>

        </div>
    }
}