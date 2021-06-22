import React, { Component } from 'react';
import Echarts from 'echarts';
import { Row, Col } from 'antd';
import PieEchart from './pieEchart';
import BarEchart from './barEchart';
import BarEchartService from './barEchartService';
import TreeEchart from './treeEchart';
import { querySgModuleConfigList } from "../requestA/service"

class StatisticsInfo extends Component {
  
  constructor(){
    super();
    this.state = {
      moduleData: [],
      serviceData: false,
      subModuleData: [],
      moduleCode: ""
    }
  }
  componentDidMount(){
    querySgModuleConfigList().then(res => {
      let moduleData = [];
      if(res.reply.returnCode.type === "S"){
        moduleData = res.reply.sgModuleConfigApproveShows.map(item=>{
          return {
            name: item.moduleCode,
            value: item.subModuleNum,
            leader: item.leader
          }
        });
      }
      this.setState({
        moduleData
      })
    })
  }

  //点击模块展示服务单元信息
  showServiceData = moduleCode => {
    
    let param = {
      moduleCode
    };
    querySgModuleConfigList(param).then(res => {
      let subModuleData = [];
      if(res.reply.returnCode.type === "S"){
        subModuleData = res.reply.sgSgSubmoduleConfigApproveShows.map(item => {
          return {
            name: item.moduleCode,
            value: item.serviceNum
          }
        })
      }
      this.setState({
        serviceData: true,
        moduleCode,
        subModuleData
      });
    });
  }

  render(){
    return (
      <div>
        <Row>
          <Col span={12}>
            <PieEchart data={this.state.moduleData} showServiceData={moduleCode=>this.showServiceData(moduleCode)}/>
          </Col>
          <Col span={12}>
            <BarEchart data={this.state.moduleData} moduleCode={this.state.moduleCode}/>
          </Col>
        </Row>
        {this.state.serviceData&&<Row>
          <Col span={12}>
            <TreeEchart/>
          </Col>
          <Col span={12}>
            <BarEchartService/>
          </Col>
        </Row>}
      </div>
      
    )
  }
}

export default StatisticsInfo;