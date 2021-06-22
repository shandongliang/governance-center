import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Icon,
  Button,
  Select,
  message,
  Tabs,
  Form,
  Row,
  Col,
  Input,
  Modal,
  AutoComplete
} from "antd";
import EditableTable from "../editableTable/editableTable";
import "../../container/common/style/index.less";
import { PROTOCOL, SERVICEP_PROTOCOL, CONTEXT_TYPE } from "./commonData";

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;

export default class Protocol extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      protocolList: [],
      data: [],
      columns: [
        {
          title: "发布服务协议",
          dataIndex: "protocol",
          width: 70,
          inputType: "select",
          selectData: SERVICEP_PROTOCOL.map(item => {
            return {
              key: item,
              value: item,
              name: item
            };
          })
        },
        {
          title: "协议URL模版",
          dataIndex: "protocolUrlTemplate",
          width: 100,
          required: true
        },
        {
          title: "报文内容类型",
          dataIndex: "protocolMessageType",
          width: 70,
          inputType: "select",
          selectData: CONTEXT_TYPE.map(item => {
            return {
              key: item,
              value: item,
              name: item
            };
          })
        },
        {
          title: "URI",
          dataIndex: "protocolUrl",
          width: 100,
          required: true
        },
        {
          title: "操作",
          dataIndex: "action",
          width: 60
        }
      ]
    };
  }
  componentDidMount() {
    this.setInitialValue(this.props)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.protocolsSubmitList !== nextProps.protocolsSubmitList){
      this.setInitialValue(nextProps)
    }
  }

  setInitialValue(props) {
    const { protocolsSubmitList = [], disabled = false } = props;
    console.log(props)
    let protocolList = protocolsSubmitList.map((item, index) => {
      return {
        key: index,
        show: true,
        protocolUrlTemplate: item.key,
        protocolMessageType: item.msgType,
        protocol: item.type,
        protocolUrl: item.val
      };
    });
    this.setState({
      protocolList,
      data: protocolList
    });
    if (!disabled) {
      this.props.returnProtocol(protocolList);
    }
  }

  //添加服务协议及模板
  addProtocol = () => {
    let protocolList = this.state.protocolList;
    let length = protocolList.length;
    protocolList.push({
      key: length,
      show: true
    });
    this.filterData(protocolList);
  };

  //服务协议改变，模板和类型也改变
  serviceProtocolChange = (value, index) => {
    this.props.form.resetFields([
      `protocolUrlTemplate${index}`,
      `protocolMessageType${index}`
    ]);
    let protocolList = this.state.protocolList;
    let protocol = value.replace("-", "_");
    if (SERVICEP_PROTOCOL.indexOf(value) > -1) {
      protocolList[index].protocolUrlTemplate =
        PROTOCOL[protocol].protocolUrlTemplate;
      protocolList[index].protocolMessageType =
        PROTOCOL[protocol].protocolMessageType;
    } else {
      protocolList[index].protocolUrlTemplate = "";
      protocolList[index].protocolMessageType = "";
    }
    this.setState({
      protocolList
    });
  };

  //删除服务协议及模板
  protocolDelete = record => {
    let protocolList = this.state.protocolList;
    let _this = this;
    Modal.confirm({
      title: `你确定删除该发布服务协议-协议URL模版吗？`,
      okText: "确定",
      cancelText: "取消",
      onOk() {
        protocolList[record.key].show = false;
        _this.filterData(protocolList);
      },
      onCancel() {
        return;
      }
    });
  };

  filterData = protocolList => {
    let data = protocolList.filter(item => item.show === true);
    this.setState(
      {
        protocolList,
        data
      },
      () => {
        // console.log(this.state);
      }
    );
    this.props.returnProtocol(data);
  };

  render() {
    const { data, columns } = this.state;
    const { form, disabled = false } = this.props;
    return (
      <div>
        <Button
          onClick={this.addProtocol}
          type="dashed"
          style={{ width: "100px", marginLeft: 4 }}
          disabled={disabled}
        >
          <Icon type="plus" />
        </Button>
        <EditableTable
          form={form}
          data={data}
          disabled={disabled}
          columns={columns}
          delete={this.protocolDelete}
          // width={1200}
        />
      </div>
    );
  }
}
