import React, { Component } from 'react';
import Echarts from 'echarts';
import { Row, Col } from 'antd'

class PieEchart extends Component {
  
  constructor(){
    super();
    this.state = {
      myPieEchart: null
    }
  }
  componentDidMount(){
    // let pie = document.getElementById("pie");
    // let myPieEchart = Echarts.init(pie);
    // this.setState({
    //   myPieEchart
    // })
    // this.createEchart(myPieEchart,this.props.data);
  }

  componentWillReceiveProps(nextProps){
    this.createEchart(nextProps.data);
  }

  //更新数据渲染饼图
  createEchart = (data) => {
    let pie = document.getElementById("pie");
    let myPieEchart = Echarts.init(pie);
    let legendData = [];
    let selectedData = {};
    data.forEach((item,index)=>{
      legendData.push(item.name);
      selectedData[item.name] = index < 10;
    })
    let option = {
      title: {
        text: "各模块下服务单元占比",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: params => this.getDetail(params, data)
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        left: "left",
        top: 10,
        bottom: 10,
        data: legendData,
        selected: selectedData
      },
      series: [{
        name: "模块信息",
        type: "pie",
        radius: "55%",
        center: ["55%", "50%"],
        data: data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
          }
        }
      }]
    }
    myPieEchart.setOption(option);
    let that = this
    myPieEchart.on('click', param => {
      that.props.showServiceData(param.name);
    })
  }
  //获取详细信息
  getDetail = (param, data) => {
    let selected = data.filter(item=>{
      return item.name === param.name
    })
    return `
      <div>
        <p>
          <span>服务单元数量</span>
          <span>${param.data.value}</span>
        </p>
        <p>
          <span>服务单元占比</span>
          <span>${param.percent}%</span>
        </p>
        <p>
          <span>负责人</span>
          <span>${selected[0].leader}</span>
        </p>
        <p>
          <span>使用场景</span>
          <span>${selected[0].leader}</span>
        </p>
      </div>
    `
  }
  render(){
    return (
      <div>
        <div id="pie" style={{width: "%100", height: 500}}/>
      </div>
    )
  }
}

export default PieEchart;