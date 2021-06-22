import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Tabs, message, Table } from "antd";
import {
  queryEdaMiddlewareList,
  changeLDC,
  queryLDC
} from "../service/service";
import { randomNamber, deploy } from "./../../../../util/publicFuc";
import "./../../../common/style/index.less";
import "./clusterSwitch.less";

const TabPane = Tabs.TabPane;

export default class ClusterSwitch extends Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor() {
    super();
    this.state = {
      loading: false,
      data: [],
      pagination: {
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
        total: 0
      },
      columns: [
        {
          title: "中间件英文全称",
          dataIndex: "middlewareEngName",
          key: "middlewareEngName",
          render: (text, record, index) => {
            const obj = {
              children: text,
              props: {}
            };
            if (record.isRowSpan) {
              obj.props.rowSpan = record.rowSpan;
            }
            return obj;
          }
        },
        {
          title: "集群单元",
          dataIndex: "deployUnit",
          key: "deployUnit",
          render: (text, record, index) => {
            return <div>{deploy(text)}</div>;
          }
        },
        {
          title: "状态",
          dataIndex: "status",
          key: "status"
        },
        {
          title: "操作",
          dataIndex: "id",
          key: "id",
          render: (text, record, index) => {
            return (
              <div>
                <Button
                  type="primary"
                  style={{ borderRadius: 5 }}
                  onClick={() => this.drunitSwitch(record)}
                >
                  容灾切换到{deploy(record.drunit)}集群
                </Button>
                <Button
                  style={{ borderRadius: 5, marginLeft: 20 }}
                  onClick={() => this.switchBack(record)}
                >
                  切回到默认集群
                </Button>
                <Button
                  type="dashed"
                  style={{ borderRadius: 5, marginLeft: 20 }}
                  onClick={() => this.getClusterdetail(record)}
                >
                  查看当前状态
                </Button>
              </div>
            );
          }
        }
      ]
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  // 获取列表
  fetchData = () => {
    this.setState({ loading: true });
    const { pagination } = this.state;
    let param = {
      paginator: {
        pageNo: pagination.current,
        recordsPerPage: pagination.pageSize
      }
    };
    queryEdaMiddlewareList(param).then(res => {
      let page = Object.assign({}, this.state.pagination, {
        total: res.reply.queryMiddlewareList.page.total
      });
      let edaMiddlewareList = res.reply.queryMiddlewareList.edaMiddlewareList;
      let data = [];
      edaMiddlewareList.forEach((edaMiddleware, edaMiddlewareIndex) => {
        edaMiddleware.list.forEach((item, index, arr) => {
          data.push({
            middlewareEngName: edaMiddleware.middlewareEngName,
            drunit: item.drunit,
            status: item.status === "Y" ? "有效" : "无效",
            deployUnit: item.deployUnit,
            isRowSpan: arr.length > 1,
            rowSpan: index === 0 ? arr.length : 0
          });
        });
      });
      this.setState({
        pagination: page,
        loading: false,
        data
      });
    });
  };
  // 页码切换
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
  // 容灾集群
  drunitSwitch = record => {
    Modal.confirm({
      title: "容灾切换",
      okText: "执行切换",
      content: (
        <div>
          <div className="pro">
            <span>当前逻辑集群:</span>
            <span>{record.middlewareEngName}</span>
          </div>
          <div className="pro">
            <span>当前集群单元：</span>
            <span>{deploy(record.deployUnit)}</span>
          </div>
          <div className="pro">
            <span>更改集群：</span>
            <span>{deploy(record.drunit)}</span>
          </div>
        </div>
      ),
      onOk: () => {
        this.switchCluster(record, "drunit");
      },
      onCancel() {
        message.info("取消切换!");
      }
    });
  };
  // 切回
  switchBack = record => {
    Modal.confirm({
      title: "切回",
      okText: "切回",
      content: "请确认是否切回？",
      onOk: () => {
        this.switchCluster(record, "back");
      },
      onCancel() {
        message.info("取消切换!");
      }
    });
  };
  // 切换集群
  switchCluster = (record, type) => {
    let param = {
      currentLDC: record.deployUnit,
      logicClusterName: record.middlewareEngName,
      targetLDC: type === "drunit" ? record.drunit : ""
    };
    changeLDC(param).then(res => {
      if (res.reply.returnCode.type == "S") {
        message.info("切换成功！");
      }
    });
  };
  getClusterdetail = record => {
    let param = {
      LDCName: record.deployUnit,
      logicClusterName: record.middlewareEngName
    };
    queryLDC(param).then(res => {
      if (res.reply.returnCode.type == "S") {
        let result = res.reply.result;
        Modal.info({
          title: "集群详情",
          content: (
            <div>
              <div className="pro">
                <span>切换状态：</span>
                <span>{this.getChangeStatus(result.changeStatus)}</span>
              </div>
              <div className="pro">
                <span>切换方式：</span>
                <span>{result.changeType === "auto" ? "自动" : "手动"}</span>
              </div>
              <div className="pro">
                <span>默认容灾单元:</span>
                <span>{deploy(result.defaultChangeLDCId)}</span>
              </div>

              <div className="pro">
                <span>当前集群单元:</span>
                <span>{deploy(result.executingLdcId)}</span>
              </div>
              <div className="pro">
                <span>集群状态:</span>
                <span>{this.getStatus(result.status)}</span>
              </div>
            </div>
          )
        });
      }
    });
  };
  getChangeStatus = val => {
    switch (val) {
      case "unSwitch": {
        return "未切换";
      }
      case "switch": {
        return "切换到其他中心";
      }
      case "switchBack": {
        return "已切回";
      }
      default: {
        return "";
      }
    }
  };
  getStatus = val => {
    switch (val) {
      case "00": {
        return "自身可用";
      }
      case "01": {
        return "故障中";
      }
      case "02": {
        return "容灾转移成功";
      }
      case "03": {
        return "容灾转移失败";
      }
      default: {
        return "";
      }
    }
  };
  render() {
    const { pagination, loading, data, columns } = this.state;
    return (
      <div>
        <div className="clusterSwitch">
          <Table
            pagination={pagination}
            loading={loading}
            dataSource={data}
            columns={columns}
            onChange={this.tableChangeHandle}
            size="middle"
            rowKey={record => record.middlewareEngName + record.deployUnit}
            style={{ paddingLeft: 0, paddingRight: 0 }}
          />
        </div>
      </div>
    );
  }
}
