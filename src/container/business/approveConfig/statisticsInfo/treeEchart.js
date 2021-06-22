import React, { Component } from 'react';
import Echarts from 'echarts';
import { Row, Col } from 'antd'

class TreeEchart extends Component {
  
  constructor(){
    super();
    this.state = {
      mytreeEchart: null
    }
  }
  componentDidMount(){
    // let tree = document.getElementById("tree");
    // let myTreeEchart = Echarts.init(tree);
    // this.setState({
    //   myTreeEchart
    // });
    // this.createEchart(myTreeEchart);
  }
  componentWillReceiveProps(nextProps){
    this.createEchart(nextProps);
  }
  //更新数据渲染饼图
  createEchart = (nextProps) => {
    let tree = document.getElementById("tree");
    let myTreeEchart = Echarts.init(tree);
    let seriesData = {
      name: nextProps.moduleCode,
      children: nextProps.data
    }
    let option = {
      title: {
        text: "模块结构图",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove"
      },
      series: [{
        type: "tree",
        data: [seriesData],
        top: "1%",
        bottom: "1%",
        left: "7%",
        right: "20%",
        symbolSize: 7,
        // layout: 'radial',
        label: {
          normal: {
            position: "left",
            verticalAlign: "middle",
            align: "right",
            fontSize: 9
          }
        },
        leaves: {
          label: {
            normal: {
              position: "right",
              verticalAlign: "middle",
              align: "left",
            }
          }
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDuration: 750
      }]
    }
    myTreeEchart.setOption(option);
  }
  render(){
    return (
      <div>
        <div id="tree" style={{width: "%100", height: 500}}/>
      </div>
    )
  }
}

export default TreeEchart;