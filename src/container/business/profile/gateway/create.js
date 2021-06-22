import { Input, Button, Form, Modal, Select, Row, Col, message } from "antd";
import React, { Component } from "react";
import EditableTable from "../../../../component/editableTable/editableTable";
import Drawer from "../../../../component/drawer/drawer";
import ServiceMoreSetting from "./component/moreSetting";
import BaseSetting from "./component/baseSetting";
import {
  createSgServiceApproves,
  queryLDCList,
} from "../../approveConfig/request/service";
import { queryAllModuleAndSubmodule } from "../../approveConfig/request/common";
import { getApproveCode } from "../request/common";
import { querySgModuleCommonConfigApproveList, querySgSubmoduleCommonConfigApproveList } from "../../managerApprove/request/service";
import "../../style/index.less";
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item;
const Option = Select.Option;

class ServiceApproveBatchCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "更多配置",
      settingMoreVisible: false,
      data: [],
      serviceList: [],
      allModuleAndSubModule: [],
      subModuleConGroupList: [],
      subModuleFlowGroupList: [],
      selectRecord: {},
      columns: [
        {
          title: "服务码",
          dataIndex: "serviceCode",
          width: 100,
          required: true
        },
        {
          title: "服务名称",
          dataIndex: "serviceName",
          width: 100,
          required: true
        },
        {
          title: "版本",
          dataIndex: "serviceVersion",
          width: 100
        },
        {
          title: "状态",
          dataIndex: "status",
          width: 100,
          inputType: "select",
          selectData: [
            {
              key: "0",
              value: "0",
              name: "生效"
            },
            {
              key: "1",
              value: "1",
              name: "失效"
            }
          ]
        },
        {
          title: "服务类型",
          dataIndex: "readOrWrite",
          width: 100,
          inputType: "select",
          selectData: [
            {
              key: "0",
              value: "0",
              name: "读服务"
            },
            {
              key: "1",
              value: "1",
              name: "写服务"
            }
          ]
        },
        {
          title: "是否多活架构",
          dataIndex: "isMultiActive",
          width: 100,
          inputType: "select",
          selectData: [
            {
              key: "Y",
              value: "Y",
              name: "是"
            },
            {
              key: "N",
              value: "N",
              name: "否"
            },
            {
              key: "Z",
              value: "Z",
              name: "复用上级"
            }
          ]
        },
        {
          title: "所属ldcId",
          dataIndex: "fixLdcId",
          width: 100,
          inputType: "select",
          selectData: []
        },
        {
          title: "多活架构下单元类型",
          dataIndex: "unitType",
          width: 140,
          inputType: "select",
          selectData: [
            {
              key: "0",
              value: "0",
              name: "互备模式"
            },
            {
              key: "1",
              value: "1",
              name: "机房负载模式"
            },
            {
              key: "2",
              value: "2",
              name: "广播模式"
            },
            {
              key: "3",
              value: "3",
              name: "分区单元"
            }
          ]
        },
        {
          title: "操作",
          dataIndex: "action",
          width: 200,
          btnType: "all"
        }
      ],
      approveCode: "",
      moduleCode: ""
    };
  }

  async componentDidMount() {
    this.queryLDC();
    let allModuleAndSubModule = await queryAllModuleAndSubmodule();
    let approveCode = await getApproveCode("SGC");
    this.setState({
      allModuleAndSubModule,
      approveCode
    });
  }
  subModuleChange = subModule => {
    this.setState({
      subModuleConGroupList: subModule.concurrentControlPolicy.groupPolicyList?subModule.concurrentControlPolicy.groupPolicyList:[],
      subModuleFlowGroupList: subModule.flowControlPolicy.groupPolicyList?subModule.flowControlPolicy.groupPolicyList:[]
    });
  };
  queryLDC = () => {
    queryLDCList().then(res => {
      if (res.reply.returnCode.type === "S") {
        let ldcList = res.reply.result.map(item => {
          return {
            key: item.ldcId,
            value: item.ldcId,
            name: item.ldcId
          };
        });
        let columns = this.state.columns.map(item => {
          if (item.dataIndex === "fixLdcId") {
            return {
              ...item,
              selectData: ldcList
            };
          }
          return item;
        });
        this.setState({
          columns
        });
      }
    });
  };

  checkProtocol = data => {
    let isChecked = true;
    for (let i = 0; i < data.length; i++) {
      if (data[i].protocolsSubmitList.length === 0) {
        message.warning(`${data[i].serviceCode}至少配置一条协议！`);
        isChecked = false;
        break;
      } else {
        for (let j = 0; j < data[i].protocolsSubmitList.length; j++) {
          if (!data[i].protocolsSubmitList[j].val) {
            message.warning(`${data[i].serviceCode}协议配置不完整！`);
            isChecked = false;
            break;
          }
        }
      }
    }
    return isChecked;
  };

  handleResult = approveStatus => {
    this.props.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      const { data } = this.state;
      let serviceSubmitList = [];
      data.forEach((item, index) => {
        let serviceItem = {
          moduleCode: values.moduleCode,
          subModuleCode: values.subModuleCode,
          serviceCode: values[`serviceCode${item.key}`],
          serviceName: values[`serviceName${item.key}`],
          serviceVersion: values[`serviceVersion${item.key}`],
          status: values[`status${item.key}`],
          readOrWrite: values[`readOrWrite${item.key}`],
          isBackUpLdc: values[`isBackUpLdc${item.key}`],
          onlineStatus: values[`onlineStatus${item.key}`],
          unitType: values[`unitType${item.key}`],
          isMultiActive: values[`isMultiActive${item.key}`],
          changeType: values[`changeType${item.key}`],
          changeDescribe: values[`changeDescribe${item.key}`],
          fixLdcId: values[`fixLdcId${item.key}`],
          // publishDate: values[`publishDate${item.key}`].format("YYYY-MM-DD"),
          protocolsSubmitList: item.protocolsSubmitList,
          concurrentControlPolicy: item.concurrentControlPolicy,
          flowControlPolicy: item.flowControlPolicy,
          accessInfoConfig: item.accessInfoConfig,
          multiActiveConfig: item.multiActiveConfig,
          multiActivePolicy: item.multiActivePolicy,
          loadBalancePolicy: item.loadBalancePolicy,
          applicantId: JSON.parse(
            sessionStorage.getItem("$pandora_auth.user_info")
          ).userId,
          createUser: JSON.parse(
            sessionStorage.getItem("$pandora_auth.user_info")
          ).userId,
          approveStatus,
          approveCode: this.state.approveCode
        };
        serviceSubmitList.push(serviceItem);
      });
      if (serviceSubmitList.length === 0) {
        message.warning("提交的服务数为0，请填写服务后再提交。");
      }
      if (!this.checkProtocol(data)) {
        return;
      }
      let param = {
        list: serviceSubmitList
      };
      createSgServiceApproves(param).then(res => {
        //返回信息
        this.setState({
          loading: false
        });
        if (res.reply.returnCode.type === "S") {
          this.toIndex();
        } else {
          message.info("创建失败");
        }
      });
    });
  };

  toIndex = () => {
    let path = {
			pathname: '/approve/service/index'
		};
		goToAndClose(path, "服务查询");
  };

  add = () => {
    let serviceList = this.state.serviceList;
    let length = this.state.serviceList.length;
    serviceList.push({
      key: length,
      show: true,
      protocolsSubmitList: [],
      concurrentControlPolicy: {
        status: "N"
      },
      flowControlPolicy: {
        status: "N"
      },
      multiActivePolicy: {
        status: "Z"
      },
      loadBalancePolicy: {
        status: "Z"
      }
    });
    this.filterData(serviceList);
  };

  copy = record => {
    let index = record.key;
    let serviceList = this.state.serviceList;
    let length = this.state.serviceList.length;
    this.props.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      let item = {
        status: values[`status${index}`],
        readOrWrite: values[`readOrWrite${index}`],
        isBackUpLdc: values[`isBackUpLdc${index}`],
        onlineStatus: values[`onlineStatus${index}`],
        unitType: values[`unitType${index}`],
        isMultiActive: values[`isMultiActive${index}`],
        changeType: values[`changeType${index}`],
        changeDescribe: values[`changeDescribe${index}`],
        fixLdcId: values[`fixLdcId${index}`]
      };
      let protocolsSubmitList = record.protocolsSubmitList.map(item => {
        return {
          ...item,
          val: ""
        };
      });
      serviceList.push({
        ...record,
        key: length,
        show: true,
        ...item,
        protocolsSubmitList
      });
      this.filterData(serviceList);
    });
  };

  delete = record => {
    let serviceList = this.state.serviceList;
    let _this = this;
    Modal.confirm({
      title: `你确定删除该服务吗？`,
      okText: "确定",
      cancelText: "取消",
      onOk() {
        serviceList[record.key].show = false;
        _this.filterData(serviceList);
      },
      onCancel() {
        return;
      }
    });
  };

  filterData = serviceList => {
    this.setState(
      {
        serviceList,
        data: serviceList.filter(item => item.show === true)
      },
      () => {
        // console.log(this.state);
      }
    );
  };

  settingMore = record => {
    this.props.form.validateFields((error, values) => {
      if (error) {
        message.warning("请先配置必须项!");
        return;
      }
      let title = `服务码${values[`serviceCode${record.key}`]}的更多配置`;
      this.setState(
        {
          selectRecord: record,
          title
        },
        () => {
          this.setState({
            settingMoreVisible: true
          });
        }
      );
    });
  };

  getMoreSetting = (key, param) => {
    let serviceList = this.state.serviceList;
    serviceList[key] = {
      ...serviceList[key],
      ...param
    };
    this.filterData(serviceList);
    this.setState({
      settingMoreVisible: false
    })
  };

  selectChange = (item, record, val) => {
    if(item.dataIndex==="isMultiActive"){
      let serviceList = this.state.serviceList;
      serviceList[record.key].multiActivePolicy = {
        ...serviceList[record.key].multiActivePolicy,
        status: val === "Y" ? "Z" : val
      }
      serviceList[record.key].isMultiActive = val;
      this.filterData(serviceList);
    }
  }

  render() {
    const {
      data,
      columns,
      settingMoreVisible,
      title,
      selectRecord,
      subModuleConGroupList,
      subModuleFlowGroupList,
      allModuleAndSubModule,
      approveCode,
      moduleCode
    } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    // const drawerWidth = document.body.clientWidth - 224;
    return (
      <div>
        <Drawer
          onClose={() => {
            this.setState({ settingMoreVisible: false });
          }}
          width={900}
          title={title}
          visible={settingMoreVisible}
          destroyOnClose={true}
        >
          {settingMoreVisible ? (
            <ServiceMoreSetting
              allModuleAndSubModule={allModuleAndSubModule}
              subModuleConGroupList={subModuleConGroupList}
              subModuleFlowGroupList={subModuleFlowGroupList}
              selectRecord={selectRecord}
              returnMoreSetting={this.getMoreSetting}
              moduleCode={moduleCode}
            />
          ) : null}
        </Drawer>
        <BaseSetting form={form} subModuleChange={this.subModuleChange} approveCode={approveCode} getModuleCode={moduleCode=>{this.setState({moduleCode})}}/>
        <Form>
          <Button
            icon="plus"
            onClick={this.add}
            size="large"
            style={{ margin: "10px 0" }}
          >
            增加服务
          </Button>
          <EditableTable
            form={form}
            data={data}
            columns={columns}
            copy={this.copy}
            delete={this.delete}
            settingMore={this.settingMore}
            width={1200}
            selectChange = {this.selectChange}
          />
        </Form>
        <Button
          className="submitBtn"
          type="primary"
          onClick={() => this.handleResult("3")}
        >
          保存
        </Button>
        <Button
          className="submitBtn"
          type="primary"
          onClick={() => this.handleResult("0")}
        >
          申请
        </Button>
        <Button className="submitBtn" onClick={this.save}>
          取消
        </Button>
      </div>
    );
  }
}

export default Form.create()(ServiceApproveBatchCreate);
