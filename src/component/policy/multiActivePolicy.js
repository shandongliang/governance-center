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
  Radio
} from "antd";
import EditableTable from "../editableTable/editableTable";
import "../../container/common/style/index.less";
import { queryLDCList } from "../../container/business/approveConfig/request/service";

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

export default class MultiActivePolicy extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      ldcIdList: [],
      status: "Z",
      writeLdcId: "",
      tableList: [],
      tableData: [],
      ldcList: [],
      ldcData: [],
      keyList: [],
      keyData: [],
      tableColumns: [
        {
          title: "表编号开始",
          dataIndex: "tableStart",
          width: 70,
          inputType: "number"
        },
        {
          title: "表编结束",
          dataIndex: "tableEnd",
          width: 70,
          inputType: "number"
        },
        {
          title: "LDC",
          dataIndex: "tableLdc",
          width: 70,
          inputType: "select",
          selectData: []
        },
        {
          title: "操作",
          dataIndex: "action",
          width: 60
        }
      ],
      keyColumns: [
        {
          title: "关键字",
          dataIndex: "keyword",
          width: 70
        },
        {
          title: "LDC",
          dataIndex: "keyLdc",
          width: 70,
          inputType: "select",
          selectData: []
        },
        {
          title: "操作",
          dataIndex: "action",
          width: 60
        }
      ],
      ldcColumns: [
        {
          title: "LDC",
          dataIndex: "ldcNo",
          width: 70,
          inputType: "select",
          selectData: []
        },
        {
          title: "执行LDC",
          dataIndex: "carryLdc",
          width: 70,
          inputType: "select",
          selectData: []
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
    this.queryLDC();
    this.setInitialValue();
  }
  setInitialValue() {
    const { multiActivePolicy, disabled = false } = this.props;
    const {
      status,
      writeLdcId,
      backupLdcList = [],
      specialKeySubmitList = [],
      tableLdcList = []
    } = multiActivePolicy;
    let tableList = tableLdcList.map((item, index) => {
      return {
        key: index,
        show: true,
        tableStart: item.key,
        tableEnd: item.val,
        tableLdc: item.type
      };
    });
    let ldcList = backupLdcList.map((item, index) => {
      return {
        key: index,
        show: true,
        ldcNo: item.key,
        carryLdc: item.val
      };
    });
    let keyList = specialKeySubmitList.map((item, index) => {
      return {
        key: index,
        show: true,
        keyword: item.key,
        keyLdc: item.val
      };
    });
    this.setState({
      status,
      writeLdcId,
      tableList,
      ldcList,
      keyList,
      tableData: tableList,
      ldcData: ldcList,
      keyData: keyList
    });
    if (!disabled) {
      this.props.returnMultiActivePolicy(tableList, keyList, ldcList);
    }
  }

  queryLDC = () => {
    queryLDCList().then(res => {
      if (res.reply.returnCode.type === "S") {
        let ldcIdList = res.reply.result.map(item => {
          return {
            key: item.ldcId,
            value: item.ldcId,
            name: item.ldcId
          };
        });
        let tableColumns = this.state.tableColumns.map(item => {
          if (item.dataIndex === "tableLdc") {
            return {
              ...item,
              selectData: ldcIdList
            };
          }
          return item;
        });
        let keyColumns = this.state.keyColumns.map(item => {
          if (item.dataIndex === "keyLdc") {
            return {
              ...item,
              selectData: ldcIdList
            };
          }
          return item;
        });
        let ldcColumns = this.state.ldcColumns.map(item => {
          return {
            ...item,
            selectData: ldcIdList
          };
          return item;
        });
        this.setState({
          ldcIdList,
          tableColumns,
          keyColumns,
          ldcColumns
        });
      }
    });
  };

  //添加
  add = type => {
    if (type === "table") {
      let tableList = this.state.tableList;
      let length = tableList.length;
      tableList.push({
        key: length,
        show: true
      });
      this.filterData(tableList, type);
    } else if (type === "key") {
      let keyList = this.state.keyList;
      let length = keyList.length;
      keyList.push({
        key: length,
        show: true
      });
      this.filterData(keyList, type);
    } else if (type === "ldc") {
      let ldcList = this.state.ldcList;
      let length = ldcList.length;
      ldcList.push({
        key: length,
        show: true
      });
      this.filterData(ldcList, type);
    }
  };

  //删除
  delete = (record, type) => {
    if (type === "table") {
      let tableList = this.state.tableList;
      let _this = this;
      Modal.confirm({
        title: `你确定删除该数据吗？`,
        okText: "确定",
        cancelText: "取消",
        onOk() {
          tableList[record.key].show = false;
          _this.filterData(tableList, type);
        },
        onCancel() {
          return;
        }
      });
      this.filterData(tableList);
    } else if (type === "key") {
      let keyList = this.state.keyList;
      let _this = this;
      Modal.confirm({
        title: `你确定删除该数据吗？`,
        okText: "确定",
        cancelText: "取消",
        onOk() {
          keyList[record.key].show = false;
          _this.filterData(keyList, type);
        },
        onCancel() {
          return;
        }
      });
      this.filterData(keyList);
    } else if (type === "ldc") {
      let ldcList = this.state.ldcList;
      let _this = this;
      Modal.confirm({
        title: `你确定删除该数据吗？`,
        okText: "确定",
        cancelText: "取消",
        onOk() {
          ldcList[record.key].show = false;
          _this.filterData(ldcList, type);
        },
        onCancel() {
          return;
        }
      });
    }
  };

  filterData = (list, type) => {
    const { tableData, keyData, ldcData } = this.state;
    let data = list.filter(item => item.show === true);
    if (type === "table") {
      this.setState({
        tableList: list,
        tableData: data
      });
      this.props.returnMultiActivePolicy(data, keyData, ldcData);
    } else if (type === "key") {
      this.setState({
        keyList: list,
        keyData: data
      });
      this.props.returnMultiActivePolicy(tableData, data, ldcData);
    } else if (type === "ldc") {
      this.setState({
        ldcList: list,
        ldcData: data
      });
      this.props.returnMultiActivePolicy(tableData, keyData, data);
    }
  };

  multiActivePolicyChange = value => {
    let status = value.target.value;
    this.setState({
      status
    });
    this.props.multiActivePolicyChange(status);
  };

  render() {
    const {
      status,
      writeLdcId,
      ldcIdList,
      tableColumns,
      tableData,
      keyColumns,
      keyData,
      ldcColumns,
      ldcData
    } = this.state;
    const {
      form,
      isMultiActive,
      isModule = false,
      disabled = false
    } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    };
    return (
      <div style={{ marginTop: 20 }}>
        <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
          <TabPane
            tab={
              <span>
                多活控制策略配置(旧数据)
                <span style={{ color: "green", fontSize: 16, marginLeft: 40 }}>
                  <Radio.Group
                    value={status}
                    onChange={this.multiActivePolicyChange}
                    disabled={disabled}
                  >
                    {isMultiActive !== "N" && <Radio value="Y">启用</Radio>}
                    {isMultiActive !== "Y" && <Radio value="N">停用</Radio>}
                    {isMultiActive !== "N" && (
                      <Radio value="Z">
                        {isModule ? "复用默认配置" : "复用上级配置"}
                      </Radio>
                    )}
                  </Radio.Group>
                </span>
              </span>
            }
            key="1"
          >
            {status === "Y" && (
              <div>
                <Row style={{ marginTop: 10 }}>
                  <Col span={10} offset={1}>
                    <FormItem {...formItemLayout} label="可写ldcId">
                      {getFieldDecorator("writeLdcId", {
                        initialValue: writeLdcId
                      })(
                        <Select disabled={disabled}>
                          {ldcIdList.map(item => (
                            <Option value={item.value} key={item.key}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <div style={{ marginTop: 10 }}>
                    <span>添加 表编号开始-表编号结束-ldc编号：</span>
                    <Button
                      onClick={() => this.add("table")}
                      type="dashed"
                      icon="plus"
                      disabled={disabled}
                    />
                    <EditableTable
                      form={form}
                      disabled={disabled}
                      data={tableData}
                      columns={tableColumns}
                      delete={record => this.delete(record, "table")}
                    />
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <span>添加 关键字-ldc编号：</span>
                    <Button
                      onClick={() => this.add("key")}
                      type="dashed"
                      icon="plus"
                      disabled={disabled}
                    />
                    <EditableTable
                      form={form}
                      disabled={disabled}
                      data={keyData}
                      columns={keyColumns}
                      delete={record => this.delete(record, "key")}
                    />
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <span>添加 ldc编号-执行ldc编号：</span>
                    <Button
                      onClick={() => this.add("ldc")}
                      type="dashed"
                      icon="plus"
                      disabled={disabled}
                    />
                    <EditableTable
                      form={form}
                      disabled={disabled}
                      data={ldcData}
                      columns={ldcColumns}
                      delete={record => this.delete(record, "ldc")}
                    />
                  </div>
                </Row>
              </div>
            )}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
