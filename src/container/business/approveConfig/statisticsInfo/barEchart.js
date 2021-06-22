import React, { Component } from 'react';
import Echarts from 'echarts';

class BarEchart extends Component {
  
  constructor(){
    super();
    this.state = {
      
    }
  }
  componentDidMount(){
    // let bar = document.getElementById("bar");
    // let myBarEchart = Echarts.init(bar);
    // this.createEchart(myBarEchart)
  }

  componentWillReceiveProps(nextProps){
    this.createEchart(nextProps.data);
  }

  //更新数据渲染饼图
  createEchart = (data) => {
    let bar = document.getElementById("bar");
    let myBarEchart = Echarts.init(bar);
    let yAxisData = [];
    let xAxisData = [];
    let yEnd = data.length/10;
    data.forEach(item => {
      xAxisData.push(item.value);
      yAxisData.push(item.name)
    });
    let option = {
      title: {
        text: "各模块下服务单元数量",
        x: "center"
      },
      color: ["#3398db"],
      tooltip: {
        trigger: "axis"
      },
      yAxis: [
        {
          type: "category",
          data: yAxisData,
          axisTick: {
            alignWithLable: true
          }
        }
      ],
      xAxis: [
        {
          type: "value"
        }
      ],
      dataZoom: [
        {
          type: 'slider',
          yAxisIndex: 0,
          zoomLock: true,
          width:10,
          right: 10,
          start: 0,
          end: yEnd,
          handleSize: 0,
          showDetail: true,
        },
        {
          type: 'inside',
          id: "insideY",
          yAxisIndex: 0,
          start: 0,
          end: 100,
          zoomOnMouseWheel: false,
          moveOnMouseMove: true,
          moveOnMouseWheel: true
        }
      ],
      series: [{
        name: "服务单元数量",
        type: "bar",
        barWidth: "80%",
        data: xAxisData
      }]
    }
    myBarEchart.setOption(option);
  }
  render(){
    return (
      <div>
        <div id="bar" style={{width: "%100", height: 500}}/>
      </div>
    )
  }
}

export default BarEchart;