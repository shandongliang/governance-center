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

export default class MultiActiveConfig extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isMultiActive: true,
      visitType: "",
      tableList: [],
      tableData: [],
      tableColumns: [
        // {
        //   title: "表编号开始",
        //   dataIndex: "tableStart",
        //   width: 70,
        //   inputType: "number"
        // },
        {
          title: "分组名称",
          dataIndex: "groupName",
          width: 70
        },
        {
          title: "备用分组名称",
          dataIndex: "backUpGroupName",
          width: 70
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
    this.setInitialValue();
  }
  setInitialValue() {
    const { multiActiveConfig = {}, disabled = false } = this.props;
    const {
      isMultiActive = true,
      visitType = "",
      registryGroupConfigs = []
    } = multiActiveConfig;
    let tableList = registryGroupConfigs?registryGroupConfigs.map((item, index) => {
      return {
        key: index,
        show: true,
        groupName: item.groupName,
        backUpGroupName: item.backUpGroupName
      };
    }):[];
    this.setState({
      isMultiActive,
      visitType,
      tableList,
      tableData: tableList,
    });
    if (!disabled) {
      this.props.returnMultiActiveConfig(tableList);
    }
  }
  //添加
  add = () => {
    let tableList = this.state.tableList;
      let length = tableList.length;
      tableList.push({
        key: length,
        show: true
      });
      this.filterData(tableList);
  };

  //删除
  delete = record => {
    let tableList = this.state.tableList;
      let _this = this;
      Modal.confirm({
        title: `你确定删除该数据吗？`,
        okText: "确定",
        cancelText: "取消",
        onOk() {
          tableList[record.key].show = false;
          _this.filterData(tableList);
        },
        onCancel() {
          return;
        }
      });
      this.filterData(tableList);
  };
  filterData = list => {
    const { tableData } = this.state;
    let data = list.filter(item => item.show === true);
    this.setState({
      tableList: list,
      tableData: data
    });
    this.props.returnMultiActiveConfig(data);
  };

  isMultiActiveChange = value => {
    let isMultiActive = value.target.value;
    this.setState({
      isMultiActive
    });
    this.props.isMultiActiveChange(isMultiActive);
  };

  render() {
    const {
      isMultiActive,
      visitType,
      tableColumns,
      tableData,
    } = this.state;
    const {
      form,
      disabled = false,
      moduleType = ""
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
                多活控制策略配置
                <span style={{ color: "green", fontSize: 16, marginLeft: 40 }}>
                  <Radio.Group
                    value={isMultiActive}
                    onChange={this.isMultiActiveChange}
                    disabled={disabled}
                  >
                    <Radio value={true}>启用</Radio>
                    {moduleType !== "module"&&<Radio value={false}>复用上级</Radio>}
                  </Radio.Group>
                </span>
              </span>
            }
            key="1"
          >
            {isMultiActive ? (
              <div>
                <Row style={{ marginTop: 10 }}>
                  <Col span={10} offset={1}>
                    <FormItem {...formItemLayout} label="多活访问方式">
                      {getFieldDecorator("visitType", {
                        initialValue: visitType||"NEARBY_VISIT"
                      })(
                        <Select style={{width: "100%"}} disabled={disabled} onChange={value => {this.setState({visitType: value})}}>
                          <Option value="TRAVERSAL_VISIT">随机访问</Option>
                          <Option value="NEARBY_VISIT">就近访问</Option>
                          <Option value="MOD_GROUP">MOD适配访问</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                {(visitType === "MOD_GROUP" || visitType === "NEARBY_VISIT")?<Row>
                  <div style={{ marginTop: 10 }}>
                    <span>分组配置：</span>
                    <Button
                      onClick={() => this.add()}
                      type="dashed"
                      icon="plus"
                      disabled={disabled}
                    />
                    <EditableTable
                      form={form}
                      disabled={disabled}
                      data={tableData}
                      columns={tableColumns}
                      delete={record => this.delete(record)}
                    />
                  </div>
                </Row>: null}
              </div>
            ): null}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}