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
import "./../../../common/style/index.less";
// import "./indexv1.less";
import { queryEDAModuleListByConfig, queryEDAServiceUnitListByConfig, exportEDACompressedFile } from "../request/service";
import SelectRealtion from "./component/relation";
import SelectServiceUnit from "./component/serviceUnit";
import SelectModule from "./component/module";
import ExportEventDrivenDataPreview from "./component/preview";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class ExportEventDrivenData extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      step: "1",
      relationSelectedKey: [],
      relationSelectedData: [],
      serviceUnitSelectedKey: [],
      serviceUnitSelectedData: [],
      moduleSelectedKey: [],
      moduleSelectedData: []
    };
  }
  componentDidMount() {
    // this.fetchData();
  }

  getRelationData = (relationSelectedKey, relationSelectedData, step) => {
    this.setState({
      relationSelectedKey,
      relationSelectedData,
      step
    })
  }

  getServiceUnitData = (serviceUnitSelectedKey, serviceUnitSelectedData, step) => {
    if(step === "3"){
      this.setState({
        serviceUnitSelectedKey,
        serviceUnitSelectedData
      })
    }
    this.setState({
      step
    })
  }

  getModuleData = (moduleSelectedKey, moduleSelectedData, step) => {
    if(step === "4"){
      this.setState({
        moduleSelectedKey,
        moduleSelectedData
      })
    }
    this.setState({
      step
    })
  } 

  setStep = step => {
    this.setState({
      step
    })
  }

  exportSuccess = () => {
    this.setState({
      relationSelectedData: [],
      relationSelectedKey: [],
      serviceUnitSelectedData: [],
      serviceUnitSelectedKey: [],
      moduleSelectedData: [],
      moduleSelectedKey: [],
      step: "1"
    })
  }

  
  render() {
    const { step, relationSelectedKey, relationSelectedData, serviceUnitSelectedKey, serviceUnitSelectedData, moduleSelectedKey, moduleSelectedData } = this.state;
    return (
      <div>
        {step === "1"&&<SelectRealtion
          relationSelectedKey={relationSelectedKey}
          relationSelectedData={relationSelectedData}
          getRelationData={this.getRelationData}
        />}
        {step === "2"&&<SelectServiceUnit
          serviceUnitSelectedKey={serviceUnitSelectedKey}
          serviceUnitSelectedData={serviceUnitSelectedData}
          configList={relationSelectedKey}
          getServiceUnitData={this.getServiceUnitData}
          queryServiceUnitList={queryEDAServiceUnitListByConfig}
        />}
        {step === "3"&&<SelectModule
          moduleSelectedKey={moduleSelectedKey}
          moduleSelectedData={moduleSelectedData}
          configList={relationSelectedKey}
          getModuleData={this.getModuleData}
          queryModuleList={queryEDAModuleListByConfig}
        />}
        {step === "4"&&<ExportEventDrivenDataPreview
          configList={relationSelectedKey}
          configSelectedData={relationSelectedData}
          serviceUnitSelectedKey={serviceUnitSelectedKey}
          serviceUnitSelectedData={serviceUnitSelectedData}
          moduleSelectedKey={moduleSelectedKey}
          moduleSelectedData={moduleSelectedData}
          setStep={this.setStep}
          exportData={exportEDACompressedFile}
          previewType="realtion"
          exportSuccess={this.exportSuccess}
        />}
      </div>
    );
  }
}

