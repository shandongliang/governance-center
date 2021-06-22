import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Breadcrumb,
  Icon,
  Button,
  Select,
  message,
  Tabs,
  Modal,
  Form,
  Row,
  Col,
  Input,
  Collapse,
  DatePicker
} from "antd";
import {
  Protocol,
  ServiceConcurrentControlPolicy,
  ServiceFlowControlPolicy,
  MultiActivePolicy,
  MultiActiveConfig,
  LoadBalancePolicy,
  AccessInfoConfig
} from "../../../../../component/policy/index";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Option = Select.Option;
const Panel = Collapse.Panel;

class ServiceMoreSetting extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      protocolList: [],
      tableData: [],
      ldcData: [],
      keyData: [],
      systemData: [],
      ipData: [],
      blackAccess: [],
      whiteAccess: [],
      loadBalancePolicyStatus: "Z",
      multiActivePolicyStatus: "Z",
      flowControlPolicyStatus: "N",
      concurrentControlPolicyStatus: "N",
      registryGroupList: [],
      isMultiActiveConfig: true,
      isAccessActiveConfig: true
    };
  }
  componentDidMount() {
    this.setInitialValue();
  };
  setInitialValue(){
    const { loadBalancePolicy, multiActivePolicy, flowControlPolicy, concurrentControlPolicy } = this.props.selectRecord;
    this.setState({
      loadBalancePolicyStatus: loadBalancePolicy.status,
      multiActivePolicyStatus: multiActivePolicy.status,
      flowControlPolicyStatus: flowControlPolicy.status,
      concurrentControlPolicyStatus: concurrentControlPolicy.status,
    })
  }
  getProtocol = values => {
    const { protocolList } = this.state;
    if (protocolList.length === 0) {
      // message.warning("请至少配置一条协议！");
      return;
    }
    let protocolsSubmitList = [];
    protocolList.map((item, index) => {
      protocolsSubmitList.push({
        key: values[`protocolUrlTemplate${item.key}`],
        msgType: values[`protocolMessageType${item.key}`],
        type: values[`protocol${item.key}`],
        val: values[`protocolUrl${item.key}`]
      });
    });

    let isSameService = [];
    if (protocolsSubmitList.length > 1) {
      for (let i = 0; i < protocolsSubmitList.length; i++) {
        if (isSameService.indexOf(protocolsSubmitList[i].type) === -1) {
          isSameService.push(protocolsSubmitList[i].type);
        } else {
          message.error("发布服务协议不能重复!");
          return;
        }
      }
    }
    return protocolsSubmitList;
  };

  getConcurrentControlPolicy = values => {
    const { concurrentControlPolicyStatus } = this.state;
    let concurrentControlPolicy = {
      status: concurrentControlPolicyStatus,
      maxConcurrency: values.maxConcurrency,
      singlePolicyValue: values.maxConcurrency,
      groupList: values.concurrentGroupList
    };
    return concurrentControlPolicy;
  };

  getMultiActivePolicy = values => {
    const { tableData, ldcData, keyData, multiActivePolicyStatus } = this.state;
    let backupLdcList = [];
    let specialKeySubmitList = [];
    let tableLdcList = [];
    if (multiActivePolicyStatus === "Y") {
      ldcData.map((item, index) => {
        backupLdcList.push({
          key: values[`ldcNo${item.key}`],
          val: values[`carryLdc${item.key}`]
        });
      });
      keyData.map((item, index) => {
        specialKeySubmitList.push({
          key: values[`keyword${item.key}`],
          val: values[`keyLdc${item.key}`]
        });
      });
      tableData.map((item, index) => {
        tableLdcList.push({
          key: values[`tableStart${item.key}`],
          val: values[`tableEnd${item.key}`],
          type: values[`tableLdc${item.key}`]
        });
      });
    }

    let multiActivePolicy = {
      status: multiActivePolicyStatus,
      backupLdcList,
      specialKeySubmitList,
      tableLdcList,
      writeLdcId: values.writeLdcId
    };
    return multiActivePolicy;
  };

  getAccessInfoConfig = values => {
    const { blackAccess, whiteAccess, isAccessActiveConfig } = this.state;
    const { accessControlType, coveredAccess } = values;
    let accessInfoConfig = {
      isAccessActive: isAccessActiveConfig,
      accessControlType,
      coveredAccess,
      blackAccess,
      whiteAccess
    };
    return accessInfoConfig;
  };

  getFlowControlPolicy = values => {
    const { flowControlPolicyStatus } = this.state;
    let flowControlPolicy = {
      maxFlow: values.maxFlow,
      status: flowControlPolicyStatus,
      singlePolicyValue: values.maxFlow,
      groupList: values.flowGroupList
    };
    return flowControlPolicy;
  };

  getLoadBalancePolicy = values => {
    let loadBalancePolicy = {
      loadBalanceStrategy: values.loadBalanceStrategy,
      status: this.state.loadBalancePolicyStatus
    };
    return loadBalancePolicy;
  };

  getMultiActiveConfig = values => {
    const { registryGroupList, isMultiActiveConfig } = this.state;
    const { visitType } = values;
    let registryGroupConfigs = [];
    if (isMultiActiveConfig) {
      registryGroupList.map((item, index) => {
        registryGroupConfigs.push({
          groupName: values[`groupName${item.key}`],
          backUpGroupName: values[`backUpGroupName${item.key}`]
        });
      });
    }
    let multiActiveConfig = {
      registryGroupConfigs,
      isMultiActive: isMultiActiveConfig,
      visitType
    };
    return multiActiveConfig;
  };
  save = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.state.protocolList.length === 0) {
          message.warning("请至少配置一条协议！");
          return;
        }
        let protocolsSubmitList = this.getProtocol(values);
        let concurrentControlPolicy = this.getConcurrentControlPolicy(values);
        let flowControlPolicy = this.getFlowControlPolicy(values);
        let accessInfoConfig = this.getAccessInfoConfig(values);
        let multiActivePolicy = this.getMultiActivePolicy(values);
        let loadBalancePolicy = this.getLoadBalancePolicy(values);
        let multiActiveConfig = this.getMultiActiveConfig(values);
        let param = {
          protocolsSubmitList,
          concurrentControlPolicy,
          flowControlPolicy,
          multiActivePolicy,
          loadBalancePolicy,
          accessInfoConfig,
          multiActiveConfig
        };
        this.props.returnMoreSetting(this.props.selectRecord.key,param)
      }
    });
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const { form, subModuleConGroupList, subModuleFlowGroupList, selectRecord, allModuleAndSubModule, moduleCode } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <Protocol
          form={form}
          returnProtocol={protocolList => {
            this.setState({ protocolList });
          }}
          protocolsSubmitList={selectRecord.protocolsSubmitList}
        />
        <MultiActivePolicy
          form={form}
          multiActivePolicy={selectRecord.multiActivePolicy}
          isMultiActive={selectRecord.isMultiActive}
          returnMultiActivePolicy={(tableData, keyData, ldcData) => {
            this.setState({ tableData, keyData, ldcData });
          }}
          multiActivePolicyChange={multiActivePolicyStatus => {
            this.setState({ multiActivePolicyStatus });
          }}
        />
        <MultiActiveConfig 
          form={this.props.form}
          returnMultiActiveConfig={registryGroupList => {
            this.setState({ registryGroupList });
          }}
          isMultiActiveChange={isMultiActiveConfig => {
            this.setState({ isMultiActiveConfig });
          }}
        />
        <AccessInfoConfig
          form={form}
          accessInfoConfig={{ accessControlType: "MOUDLE_INNER_VISIBLE", coveredAccess: true }}
          allModuleAndSubModule={allModuleAndSubModule}
          moduleCode={moduleCode}
          moduleType="service"
          returnAccessInfoConfig={(whiteAccess, blackAccess) => {
            this.setState({ whiteAccess, blackAccess });
          }}
          isAccessActiveChange={isAccessActiveConfig => {
            this.setState({ isAccessActiveConfig });
          }}
          />
        <ServiceConcurrentControlPolicy
          form={form}
          concurrentControlPolicy={selectRecord.concurrentControlPolicy}
          subModuleConGroupList={subModuleConGroupList}
          concurrentControlPolicyChange={concurrentControlPolicyStatus => {
            this.setState({ concurrentControlPolicyStatus });
          }}
        />
        <ServiceFlowControlPolicy
          form={form}
          flowControlPolicy={selectRecord.flowControlPolicy}
          subModuleFlowGroupList={subModuleFlowGroupList}
          flowControlPolicyPolicyChange={flowControlPolicyStatus => {
            this.setState({ flowControlPolicyStatus });
          }}
        />
        <LoadBalancePolicy
          form={form}
          loadBalancePolicy={selectRecord.loadBalancePolicy}
          loadBalancePolicyChange={loadBalancePolicyStatus => {
            this.setState({ loadBalancePolicyStatus });
          }}
        />
        <Button type="primary" onClick={this.save}>保存</Button>
      </Form>
    );
  }
}
export default Form.create()(ServiceMoreSetting);
