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
  Tag
} from "antd";
import {
  statisticsSubmoduleSDKVersion
} from "../service/service";
import "./../../../common/style/index.less";
import "./index.less";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class ZKStatus extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      SDKData: [],
      consumerData: [],
      producerData: [],
      SDKColumns: [
        {
          title: "SDK版本号",
          dataIndex: "version",
          // width: 70,
          key: "version"
        },
        {
          title: "次数",
          dataIndex: "count",
          // width: 70,
          key: "count"
        }
      ],
      consumerColumns: [
        {
          title: "消费者版本号",
          dataIndex: "version",
          // width: 70,
          key: "version"
        },
        {
          title: "次数",
          dataIndex: "count",
          // width: 70,
          key: "count"
        }
      ],
      producerColumns: [
        {
          title: "生产者版本号",
          dataIndex: "version",
          // width: 70,
          key: "version"
        },
        {
          title: "次数",
          dataIndex: "count",
          // width: 70,
          key: "count"
        }
      ]
    };
  }
  
  componentDidMount() {
    this.fetchData();
  }
  // 
  // 查询数据
  fetchData = () => {
    this.setState({ loading: true });
    statisticsSubmoduleSDKVersion().then(res => {
      let result = res.reply.result;
      this.setState(
        {
          SDKData: result.sdkVerList,
          consumerData: result.consumerVerList,
          producerData: result.producerVerList,
          loading: false
        },
        () => {
          console.log(this.state)
        }
      );
    });
  };
  render() {
    const { loading } = this.state;

    return (
      <div style={{ position: "relative", height: "100%" }}>
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="统计版本使用情况" key="1">
                <div className="portlet-body version-table">
                  <div style={{width: "30%"}}>
                    <Table
                      rowKey={record => record.id}
                      pagination={false}
                      dataSource={this.state.SDKData}
                      columns={this.state.SDKColumns}
                      loading={this.state.loading}
                    />
                  </div>
                  <div style={{width: "30%"}}>
                    <Table
                      rowKey={record => record.id}
                      pagination={false}
                      dataSource={this.state.consumerData}
                      columns={this.state.consumerColumns}
                      loading={this.state.loading}
                    />
                  </div>
                  <div style={{width: "30%"}}>
                    <Table
                      rowKey={record => record.id}
                      pagination={false}
                      dataSource={this.state.producerData}
                      columns={this.state.producerColumns}
                      loading={this.state.loading}
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