import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Table,
  Tabs,
} from "antd";
import { queryServerConfigStatistics } from "../requestA/service";
const TabPane = Tabs.TabPane;
export default class NodesChange extends Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false, //控制loading状态
      pagination: {
        showQuickJumper: true,
        pageSize: 10,
        pageSizeChanger: true,
        current: 1,
        total: 0
      },
      data: [], //RegisteredNodes列表
      date: "",
      columns: [
        {
          title: "服务单元编号",
          dataIndex: "submoduleId",
          key: "submoduleId",
          width: 100,
          key: "submoduleId"
        },
        {
          title: "所属ldcId",
          dataIndex: "ldcId",
          key: "ldcId",
          width: 100
        },
        {
          title: "服务协议",
          dataIndex: "serviceSocket",
          key: "serviceSocket",
          width: 100
        },
        {
          title: "节点地址及端口",
          dataIndex: "serviceAddress",
          key: "serviceAddress",
          width: 200
        },
        {
          title: "节点内容",
          dataIndex: "serviceContext",
          key: "serviceContext",
          width: 200
        },
        {
          title: "节点类型",
          dataIndex: "ephemeralNodeFlag",
          key: "ephemeralNodeFlag",
          width: 100,
          render: (text, record) => {
            if (text == "N") {
              return <span>静态</span>;
            } else {
              return <span>动态</span>;
            }
          }
        }
      ]
    };
  }
  componentDidMount(){
    this.setState({
      startTime: this.props.location.state.startTime,
      endTime: this.props.location.state.endTime
    },()=>{
      this.fetchData();
    })
  }
  // 设置当前页
  tableChangeHandle = (pagination) => {
    let page = Object.assign({},this.state.pagination,{
        current: pagination.current
    })
    this.setState({
        pagination: page
    },()=>{
        this.fetchData()
    })
  }
  // 查询数据
  fetchData = () => {
    this.setState({ loading: true })
    const { pagination, startTime, endTime } = this.state
    let data = {
        pageNo: pagination.current,
        recordsPerPage: pagination.pageSize,
        startTime,
        endTime
    }
    queryServerConfigStatistics(data).then((res) => {
        let page = Object.assign({},this.state.pagination,{
            total: res.reply.result.page.total,
        })
        this.setState({
            data: res.reply.result.list,
            pagination: page,
            loading: false
        },()=>{
            // console.log(this.state)
        })
    })
  }
  render() {
    const { data, columns, pagination, loading } = this.state;
    return (
      <div className="manageRegisteredNodes">
        <div className="tableWrap">
          <Tabs defaultActiveKey="1">
            <TabPane tab="静态节点变更查询" key="1">
              <Table
                rowKey={record =>
                  record.submoduleId +
                  "*&!@#$%^" +
                  record.ldcId +
                  "*&!@#$%^" +
                  record.serviceSocket +
                  "*&!@#$%^" +
                  record.serviceAddress +
                  "*&!@#$%^" + 
                  record.serviceContext
                }
                pagination={this.state.pagination}
                dataSource={data}
                columns={columns}
                onChange={this.tableChangeHandle}
                scroll={{x: 1000}}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
