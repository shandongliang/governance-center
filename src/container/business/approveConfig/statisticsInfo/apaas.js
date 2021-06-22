import React, { Component } from 'react';
import Echarts from 'echarts';
import { Row, Col, Form, Input, Button, Modal } from 'antd';
import Loading from "../../../../component/loading";
import { subModuleData, nodeData, downData, upData  } from "./apaasConfig"
import { querySgModuleConfigList } from "../requestA/service"

const FormItem = Form.Item;
class StatisticsInfo extends Component {
  
  constructor(){
    super();
    this.state = { 
      module: {},
      loading: false,
      calledPie: true,
      nextPie: true
    }
  }
  componentDidMount(){
    this.queryModuleInfo("");
  }
  queryModuleInfo = moduleCode => {
    let data = {
      moduleCode
    }
    this.setState({ loading: true });
    querySgModuleConfigList(data).then(res => {
      let result = res.reply.result;
      if(!result.sgModuleConfigApproveShow){
        Modal.info({
          content: "该模块不存在！"
        })
        this.setState({
          loading: false
        });
        return;
      }
      this.setState({
        module: result.sgModuleConfigApproveShow,
        loading: false
      })
      let calledModule = result.calledModule.length > 0 ? result.calledModule.map(item=>{
        return {
          name: item.calledModuleCode,
          value: item.calledServiceNum,
          leader: item.calledModuleLeader,
          moduleName: item.calledModuleName
        }
      }) : [];
      let nextModule = result.nextModule.length > 0 ? result.nextModule.map(item=>{
        return {
          name: item.nextModuleCode,
          value: item.nextServiceNum,
          leader: item.nextModuleLeader,
          moduleName: item.nextModuleName
        }
      }) : [];
      let serviceData = result.sgSgSubmoduleConfigApproveShows.length > 0 ? result.sgSgSubmoduleConfigApproveShows.map(item=>{
        return {
          name: item.subModuleCode,
          value: item.serviceNum,
          subModuleName: item.subModuleName
        }
      }) : [];
      let serverData = result.sgSgSubmoduleConfigApproveShows.length > 0 ? result.sgSgSubmoduleConfigApproveShows.map(item=>{
        return {
          name: item.subModuleCode,
          value: item.serverNum,
          subModuleName: item.subModuleName
        }
      }) : [];
      if(data.length === 0 ) {
        this.setState({
          calledPie: false
        })
      } else {
        this.setState({
          calledPie: true
        },()=>{
          this.createUpPie(calledModule);
        })
      }
      if(nextModule.length === 0 ) {
        this.setState({
          nextPie: false
        })
      } else {
        this.setState({
          nextPie: true
        },()=>{
          this.createDownPie(nextModule);
        })
      }
      this.createSubBar(serviceData);
      this.createSerBar(serverData);
    })
  }
  handleSearch = () => {
    let moduleCode = this.props.form.getFieldValue("moduleCode");
    this.queryModuleInfo(moduleCode);
  }
  createUpPie = data => {
    let subPie = document.getElementById("subPie");
    let myPieEchart = Echarts.init(subPie);
    let legendData = [];
    let selectedData = {};
    data.forEach((item,index)=>{
      legendData.push(item.name);
      selectedData[item.name] = index < 10;
    })
    let option = {
      title: {
        text: "上游模块",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: params => this.getPieDetail(params, data)
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        left: "left",
        top: 10,
        bottom: 10,
        // data: legendData,
        // selected: selectedData
      },
      series: [{
        name: "模块信息",
        type: "pie",
        radius: "60%",
        center: ["50%", "50%"],
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
  getBarDetail = (param, data) => {
    let selected = data.filter(item=>{
      return item.name === param[0].name
    })
    return `
      <div>
        <p>
          <span>服务单元编码:</span>
          <span>${param[0].name}</span>
        </p>
        <p>
          <span>服务单元名称:</span>
          <span>${selected[0].subModuleName}</span>
        </p>
        <p>
          <span>服务数量:</span>
          <span>${param[0].value}</span>
        </p>
      </div>
    `
  }
  createSubBar = data => {
    let subBar = document.getElementById("subBar");
    let myBarEchart = Echarts.init(subBar);
    let yAxisData = [];
    let xAxisData = [];
    data.forEach(item => {
      xAxisData.push(item.value);
      yAxisData.push(item.name)
    });
    let option = {
      title: {
        text: "服务单元中服务数量",
        x: "center"
      },
      color: ["#3398db"],
      tooltip: {
        trigger: "axis",
        formatter: params => this.getBarDetail(params, data)
      },
      xAxis: [
        {
          type: "category",
          name: "服务单元编码",
          data: yAxisData,
          axisTick: {
            alignWithLable: true
          },
          axisLable: {
            inside: true
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "数量",
        }
      ],
      series: [{
        name: "服务数量",
        type: "bar",
        barWidth: "60%",
        data: xAxisData
      }]
    }
    myBarEchart.setOption(option);
  }
  createDownPie = data => {
    let serPie = document.getElementById("serPie");
    let myPieEchart = Echarts.init(serPie);
    let legendData = [];
    let selectedData = {};
    data.forEach((item,index)=>{
      legendData.push(item.name);
      selectedData[item.name] = index < 10;
    })
    let option = {
      title: {
        text: "下游模块",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: params => this.getPieDetail(params, data)
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        left: "left",
        top: 10,
        bottom: 10,
        // data: legendData,
        // selected: selectedData
      },
      series: [{
        name: "模块信息",
        type: "pie",
        radius: "60%",
        center: ["50%", "50%"],
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
  getPieDetail = (param, data) => {
    let selected = data.filter(item=>{
      return item.name === param.name
    })
    return `
      <div>
        <p>
          <span>模块编码:</span>
          <span>${param.data.name}</span>
        </p>
        <p>
          <span>模块名称:</span>
          <span>${selected[0].moduleName}</span>
        </p>
        <p>
          <span>服务数量:</span>
          <span>${param.data.value}</span>
        </p>
        <p>
          <span>负责人:</span>
          <span>${selected[0].leader}</span>
        </p>
      </div>
    `
  }
  createSerBar = data => {
    let serBar = document.getElementById("serBar");
    let myBarEchart = Echarts.init(serBar);
    let yAxisData = [];
    let xAxisData = [];
    data.forEach(item => {
      xAxisData.push(item.value);
      yAxisData.push(item.name)
    });
    let option = {
      title: {
        text: "服务单元中注册节点数量",
        x: "center"
      },
      color: ["#90bcc2"],
      tooltip: {
        trigger: "axis",
        formatter: params => this.getBarDetail(params, data)
      },
      xAxis: [
        {
          type: "category",
          name: "服务单元编码",
          data: yAxisData,
          axisTick: {
            alignWithLable: true
          },
          axisLable: {
            inside: true
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "数量",
        }
      ],
      series: [{
        name: "注册节点数量",
        type: "bar",
        barWidth: "60%",
        data: xAxisData
      }]
    }
    myBarEchart.setOption(option);
  }
  render(){
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    const echartStyle = {
      width: "%100", 
      height: 500,
      fontSize: 20,
      color: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
    const { getFieldDecorator } = this.props.form;
    const { module, loading, calledPie, nextPie } = this.state;
    return (
      <div style={{ position: "relative" }}>
        {loading ? <Loading /> : ""}
        <Form>
          <Row style={{marginTop: 30}}>
            <Col span={7}>
              <FormItem {...formItemLayout} label="模块编码">
                {getFieldDecorator("moduleCode",{
                  // initialValue: "Y01",
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={7} offset={1}>
                <Button
                  onClick={this.handleSearch}
                  type="primary"
                  className="queryDataBtn"
                >
                  查询
                </Button>
            </Col>
          </Row>
        </Form>
        <Row style={{margin: 10, fontSize: 16, backgroundColor: "#eaf4fb", padding: 10}}>
          <Col span={12} style={{display: 'flex', alignItems: "center", padding: "6px 0"}}>
            <div style={{width: 100}}>模块编码:</div>
            <div>{module.moduleCode}</div>
          </Col>
          <Col span={12} style={{display: 'flex', alignItems: "center", padding: "6px 0"}}>
            <div style={{width: 100}}>模块名称:</div>
            <div>{module.moduleName}</div>
          </Col>
          <Col span={12} style={{display: 'flex', alignItems: "center", padding: "6px 0"}}> 
            <div style={{width: 100}}>负责人:</div>
            <div>{module.leader}</div>
          </Col>
        </Row>
        <Row style={{marginTop: 30}}>
          <Col span={12}>
            {calledPie?<div id="subPie" style={echartStyle}/> :
            <div style={echartStyle}>
              该模块没有上游模块
            </div>}
          </Col>
          <Col span={12}>
            <div id="subBar" style={echartStyle}/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            {nextPie?<div id="serPie" style={echartStyle}/> :
            <div style={echartStyle}>
              该模块没有下游模块
            </div>}
          </Col>
          <Col span={12}>
            <div id="serBar" style={echartStyle}/>
          </Col>
        </Row>
      </div>
      
    )
  }
}

const ApaasStatisticsInfo = Form.create()(StatisticsInfo);
export default ApaasStatisticsInfo;