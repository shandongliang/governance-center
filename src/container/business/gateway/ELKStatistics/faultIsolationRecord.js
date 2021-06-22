import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  DatePicker,
  Button,
  message,
  Table,
  Tabs,
  Form,
  Row,
  Col,
  Input,
  Select,
  Tooltip
} from "antd";
import Echarts from 'echarts';
import { queryIsolationDetailByElk, queryAllModuleListV1  } from "../requestA/service";
import "./../../../common/style/index.less";
import { LOG_TYPE, getAnyTime, echartStyle } from "../requestA/common";
import moment from "moment";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class FaultIsolationRecord extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      data: [],
      pagination: {
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
        total: 0
      },
      filterValue: {
        startTime: getAnyTime(5),
        endTime: getAnyTime()
      },
      columns: [
        {
          title: "消费端模块",
          dataIndex: "moduleCode",
          width: 70,
          key: "moduleCode"
        },
        {
          title: "时间",
          dataIndex: "timeStamp",
          width: 100,
          key: "timeStamp"
        },
        {
          title: "IP",
          dataIndex: "ip",
          width: 150,
          key: "ip"
        },
        {
          title: "隔离内容",
          dataIndex: "failIsolationContent",
          width: 150,
          key: "failIsolationContent"
          // render: (text, record, index) => {
          //   return text && text.length > 100 ? (
          //     <Tooltip style={{wordBreak: "break-all"}} title={text}>
          //       <span>{text.substring(0, 100) + "..."}</span>
          //     </Tooltip>
          //   ) : (
          //     <span>{text}</span>
          //   );
          // }
        }
      ],
      ipPieData: [],
      modulePieData: [],
      isolationPieData: []
    };
  }

  componentWillMount() {
    let state = this.props.location.state;
    this.setState(
      {
        filterValue: state
      },
      () => {
        this.fetchData();
      }
    );
  }

  // componentDidMount() {
  //   this.fetchData();
  // }
  // 设置当前页
  tableChangeHandle = pagination => {
    let page = Object.assign({}, this.state.pagination, {
      current: pagination.current
    });
    this.setState(
      {
        pagination: page
      },
      () => {
        this.fetchData();
      }
    );
  };
  // 查询数据
  fetchData = () => {
    this.setState({ loading: true });
    const { filterValue, pagination } = this.state;
    let data = {
      pageNo: pagination.current,
      recordsPerPage: pagination.pageSize,
      ...filterValue
    };
    queryIsolationDetailByElk(data).then(res => {
      let page = Object.assign({}, this.state.pagination, {
        total: res.reply.page.total
      });
      let ipPieData = res.reply.ipPieShows.length > 0 ? res.reply.ipPieShows.map(item=>{
        return {
          name: item.ip,
          value: item.ipCount,
          id: item.id
        }
      }) : [];
      let modulePieData = res.reply.modulePieShows.length > 0 ? res.reply.modulePieShows.map(item=>{
        return {
          name: item.moduleCode,
          value: item.moduleCodeCount,
          id: item.id
        }
      }) : [];
      let isolationPieData = res.reply.failIContentPieShows.length > 0 ? res.reply.failIContentPieShows.map(item=>{
        return {
          name: item.failIsolationContent,
          value: item.remoteHostCount,
          id: item.id
        }
      }) : [];
      this.setState(
        {
          data: res.reply.isolationDetailList,
          ipPieData,
          modulePieData,
          isolationPieData,
          pagination: page,
          loading: false
        },
        () => {
          // console.log(this.state)
          this.createIPPie(ipPieData);
          this.createModulePie(modulePieData);
          this.createIsolationPie(isolationPieData);
        }
      );
    });
  };

  // 获取筛选数据
  onChildQuery = param => {
    let page = Object.assign({}, this.state.pagination, {
      current: 1
    });
    let filterValue = {
      ...this.state.filterValue,
      ...param
    };
    this.setState(
      {
        filterValue,
        pagination: page
      },
      () => {
        this.fetchData();
      }
    );
  };
  // 创建ip饼图
  createIPPie = data => {
    let ipPie = document.getElementById("ipPie");
    let myPieEchart = Echarts.init(ipPie);
    let legendData = [];
    let selectedData = {};
    data.forEach((item,index)=>{
      legendData.push(item.name);
      selectedData[item.name] = index < 10;
    })
    let option = {
      title: {
        text: "IP",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: params => this.getPieDetail(params, data, "IP")
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
        name: "IP",
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
  }
  // 创建模块饼图
  createModulePie = data => {
    let modulePie = document.getElementById("modulePie");
    let myPieEchart = Echarts.init(modulePie);
    let legendData = [];
    let selectedData = {};
    data.forEach((item,index)=>{
      legendData.push(item.name);
      selectedData[item.name] = index < 10;
    })
    let option = {
      title: {
        text: "模块",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: params => this.getPieDetail(params, data, "模块")
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
        name: "模块",
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
  }
  // 创建隔离饼图
  createIsolationPie = data => {
    let isolationPie = document.getElementById("isolationPie");
    let myPieEchart = Echarts.init(isolationPie);
    let legendData = [];
    let selectedData = {};
    data.forEach((item,index)=>{
      legendData.push(item.name);
      selectedData[item.name] = index < 10;
    })
    let option = {
      title: {
        text: "隔离内容",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: params => this.getPieDetail(params, data, "隔离内容")
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
        name: "隔离内容",
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
  }
  //获取详细信息
  getPieDetail = (param, data, type) => {
    let selected = data.filter(item=>{
      return item.name === param.name
    })
    return `
      <div>
        <p>
          <span>${type}:</span>
          <span>${param.data.name}</span>
        </p>
        <p>
          <span>${type}数量:</span>
          <span>${param.data.value}</span>
        </p>
      </div>
    `
  }
  render() {
    const buttonStyle = {
      borderRadius: 5,
      marginLeft: 10
    };
    const { loading } = this.state;

    return (
      <div style={{ position: "relative", height: "100%" }}>
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="服务故障隔离信息列表" key="1">
                <div className="portlet-body">
                  <div className="query-condition">
                    <WrapperQueryForm
                      callbackParent={this.onChildQuery}
                      filterValue={this.state.filterValue}
                    />
                  </div>
                  <Row style={{marginTop: 30}}>
                    <Col span={8}>
                      <div id="ipPie" style={echartStyle}/>
                    </Col>
                    <Col span={8}>
                      <div id="modulePie" style={echartStyle}/>
                    </Col>
                    <Col span={8}>
                      <div id="isolationPie" style={echartStyle}/>
                    </Col>
                  </Row>
                  <div>
                    <Table
                      rowKey={record => record.id}
                      pagination={this.state.pagination}
                      dataSource={this.state.data}
                      columns={this.state.columns}
                      onChange={this.tableChangeHandle}
                      loading={this.state.loading}
                      // scroll={{ x: 1200 }}
                    />
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

class QueryForm extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props) {
    super(props);
    this.state = {
      moduleCodeList: []
    };
  }
  componentDidMount() {
    let filterValue = this.props.filterValue;
    this.props.form.setFieldsValue({
      startTime: moment(filterValue.startTime, "YYYY-MM-DD HH:mm:ss"),
      endTime: moment(filterValue.endTime, "YYYY-MM-DD HH:mm:ss")
    });
    this.queryModuleCodeList();
  }
  //查询模块列表
  queryModuleCodeList = () => {
    queryAllModuleListV1().then(res => {
      const moduleCodeList = res.reply.result.moduleList;
      moduleCodeList.unshift("");
      this.setState({
        moduleCodeList
      });
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
    this.handleSearch();
  };

  handleSearch = e => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let data = {
        ...values,
        startTime: values.startTime
          ? values.startTime.format("YYYY-MM-DD HH:mm:ss")
          : "",
        endTime: values.endTime
          ? values.endTime.format("YYYY-MM-DD HH:mm:ss")
          : ""
      };
      this.props.callbackParent(data);
    });
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    const { getFieldDecorator } = this.props.form;
    const format = "YYYY-MM-DD HH:mm:ss";
    const { moduleCodeList } = this.state;
    return (
      <Form>
        <Row style={{ marginTop: 18 }}>
        <Col span={8}>
            <FormItem {...formItemLayout} label="消费端模块">
              {getFieldDecorator("moduleCode", { initialValue: "" })(
                <Select showSearch>
                  {moduleCodeList.length > 0 &&
                    moduleCodeList.map(item => {
                      return (
                        <Select.Option key={item} value={item}>
                          {item ? item : "全部"}
                        </Select.Option>
                      );
                    })}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="IP">
              {getFieldDecorator("ip")(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="隔离内容">
              {getFieldDecorator("failIsolationContent")(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="开始时间">
              {getFieldDecorator("startTime", {
                rules: [{ required: true, message: "请选择开始时间" }]
              })(
                <DatePicker
                  style={{ width: "100%" }}
                  showTime
                  format={format}
                />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="结束时间">
              {getFieldDecorator("endTime", {
                rules: [{ required: true, message: "请选择结束时间" }]
              })(
                <DatePicker
                  style={{ width: "100%" }}
                  showTime
                  format={format}
                />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout}>
              <Button
                onClick={this.handleSearch}
                type="primary"
                className="queryDataBtn"
              >
                查询
              </Button>
              <Button onClick={this.handleReset} className="queryDataBtn">
                清空
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
const WrapperQueryForm = Form.create()(QueryForm);
