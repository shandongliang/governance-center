import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import {
  Icon,
  Button,
  Select,
  message,
  Table,
  Tabs,
  Form,
  Row,
  Col,
  Input,
  Tooltip,
  Modal,
  DatePicker
} from "antd";
import "./../../../../common/style/index.less";
import Loading from "../../../../../component/loading";
import { serviceUnitColumns, moduleColumns, serviceColumns, relationColumns } from "../../request/common";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class ExportGatewayDataPreview extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      configPreviewColumns: this.props.previewType === "realtion"?[
        ...relationColumns,
        {
          title: "配置详情",
          dataIndex: "detail",
          width: 200,
          key: "detail",
          // align: "center",
          render: (text, record, index) => {
            return (
              <Tooltip overlayClassName="exportDataPreview" placement="leftBottom" title={text}>
                <span>{`关联关系配置详情`}</span>
              </Tooltip>
            )
          }
        }
      ]:[
        ...serviceColumns,
        {
          title: "配置详情",
          dataIndex: "detail",
          width: 200,
          key: "detail",
          // align: "center",
          render: (text, record, index) => {
            return (
              <Tooltip overlayClassName="exportDataPreview" placement="leftBottom" title={text}>
                <span>{`${record.serviceCode}配置详情`}</span>
              </Tooltip>
            )
          }
        }
      ],
      serviceUnitPreviewColumns: [
        ...serviceUnitColumns,
        {
          title: "配置详情",
          dataIndex: "detail",
          width: 200,
          key: "detail",
          // align: "center",
          render: (text, record, index) => {
            return (
              <Tooltip overlayClassName="exportDataPreview" placement="left" title={text}>
                <span>{`${record.subModuleCode}配置详情`}</span>
              </Tooltip>
            )
          }
        }
      ],
      modulePreviewColumns: [
        ...moduleColumns,
        {
          title: "配置详情",
          dataIndex: "detail",
          width: 200,
          key: "detail",
          // align: "center",
          render: (text, record, index) => {
            return (
              <Tooltip overlayClassName="exportDataPreview" placement="leftTop" title={text}>
                <span>{`${record.moduleCode}配置详情`}</span>
              </Tooltip>
            )
          }
        }
      ]
    };
  }
  componentDidMount() {}

  exportData = () => {
    const { configList, serviceUnitSelectedKey, moduleSelectedKey } = this.props;
    let data = {
      moduleList: moduleSelectedKey,
      serviceUnitList: serviceUnitSelectedKey, 
      configList: configList
    }
    this.props.exportData(data).then(res => {
      Modal.info({
        title: "数据导出结果",
        content: "数据导出成功！",
        onOk: () => {
          this.props.exportSuccess()
        }
      })
    })
  }

  changeStep = step => {
    this.props.setStep(step);
  }

  clearSelect = () => {
    this.setState({
      selectedRowKeys: [],
      selectedData: []
    });
  };
  render() {
    const { configPreviewColumns, serviceUnitPreviewColumns, modulePreviewColumns } = this.state;
    const { configSelectedData, serviceUnitSelectedData, moduleSelectedData, previewType } = this.props;
    return (
      <div>
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="导出数据预览" key="1">
                <div className="exportButton">
                  <Button.Group>
                    <Button type="primary" icon="left" onClick={() => this.changeStep("3")} >上一步</Button>
                    <Button type="primary" onClick={() => this.exportData()} >导出<Icon type="cloud-download"/></Button>
                  </Button.Group>
                </div>
                <div className="portlet-body">
                  <p>{previewType === "realtion"?"关联关系导出数据预览":"服务导出数据预览"}</p>
                  <Table
                    rowKey={record => record.id}
                    dataSource={configSelectedData}
                    columns={configPreviewColumns}
                    scroll={{ x: 1000 }}
                  />
                </div>
                <p>服务单元导出数据预览</p>
                <div className="portlet-body">
                  <Table
                    rowKey={record => record.subModuleCode}
                    dataSource={serviceUnitSelectedData}
                    columns={serviceUnitPreviewColumns}
                    scroll={{ x: 1000 }}
                  />
                </div>
                <p>模块导出数据预览</p>
                <div className="portlet-body">
                  <Table
                    rowKey={record => record.moduleCode}
                    dataSource={moduleSelectedData}
                    columns={modulePreviewColumns}
                    scroll={{ x: 1000 }}
                  />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
