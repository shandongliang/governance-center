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
import { queryModuleListByConfig, queryServiceUnitListByConfig, exportCompressedFile } from "../request/service";
import SelectService from "./component/service";
import SelectServiceUnit from "./component/serviceUnit";
import SelectModule from "./component/module";
import ExportGatewayDataPreview from "./component/preview";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
export default class ExportGatewayData extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      step: "1",
      serviceSelectedKey: [],
      serviceSelectedData: [],
      serviceUnitSelectedKey: [],
      serviceUnitSelectedData: [],
      moduleSelectedKey: [],
      moduleSelectedData: []
    };
  }
  componentDidMount() {
    // this.fetchData();
  }

  getServiceData = (serviceSelectedKey, serviceSelectedData, step) => {
    this.setState({
      serviceSelectedKey,
      serviceSelectedData,
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
      serviceSelectedData: [],
      serviceSelectedKey: [],
      serviceUnitSelectedData: [],
      serviceUnitSelectedKey: [],
      moduleSelectedData: [],
      moduleSelectedKey: [],
      step: "1"
    })
  }

  
  render() {
    const { step, serviceSelectedKey, serviceSelectedData, serviceUnitSelectedKey, serviceUnitSelectedData, moduleSelectedKey, moduleSelectedData } = this.state;
    return (
      <div>
        {step === "1"&&<SelectService
          serviceSelectedKey={serviceSelectedKey}
          serviceSelectedData={serviceSelectedData}
          getServiceData={this.getServiceData}
        />}
        {step === "2"&&<SelectServiceUnit
          serviceUnitSelectedKey={serviceUnitSelectedKey}
          serviceUnitSelectedData={serviceUnitSelectedData}
          configList={serviceSelectedKey}
          getServiceUnitData={this.getServiceUnitData}
          queryServiceUnitList={queryServiceUnitListByConfig}
        />}
        {step === "3"&&<SelectModule
          moduleSelectedKey={moduleSelectedKey}
          moduleSelectedData={moduleSelectedData}
          configList={serviceSelectedKey}
          getModuleData={this.getModuleData}
          queryModuleList={queryModuleListByConfig}
        />}
        {step === "4"&&<ExportGatewayDataPreview
          configList={serviceSelectedKey}
          configSelectedData={serviceSelectedData}
          serviceUnitSelectedKey={serviceUnitSelectedKey}
          serviceUnitSelectedData={serviceUnitSelectedData}
          moduleSelectedKey={moduleSelectedKey}
          moduleSelectedData={moduleSelectedData}
          setStep={this.setStep}
          exportData={exportCompressedFile}
          exportSuccess={this.exportSuccess}
        />}
      </div>
    );
  }
}

