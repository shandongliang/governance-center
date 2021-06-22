import { Table, Input, Select, Form, Button, InputNumber } from "antd";
import React, { Component } from "react";

const Option = Select.Option;
const FormItem = Form.Item;

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {}

  getColumns = columns => {
    const { disabled = false } = this.props;
    let columnsList = columns.map(item => {
      if (item.dataIndex === "action" && !disabled) {
        return {
          title: item.title,
          dataIndex: item.dataIndex,
          width: item.width,
          render: (text, record, index) => {
            return (
              <div>
                {item.btnType === "all" && (
                  <Button
                    // type="primary"
                    className="priamryBtn"
                    onClick={() => this.props.settingMore(record)}
                  >
                    更多配置
                  </Button>
                )}
                {item.btnType === "all" && (
                  <Button
                    type="primary"
                    className="priamryBtn"
                    onClick={() => this.props.copy(record)}
                  >
                    复制添加
                  </Button>
                )}
                <Button
                  type="danger"
                  className="priamryBtn"
                  onClick={() => this.props.delete(record)}
                >
                  删除
                </Button>
              </div>
            );
          }
        };
      }
      return {
        title: item.title,
        dataIndex: item.dataIndex,
        width: item.width,
        render: (text, record) =>
          this.renderColumns(
            record,
            item
            // item.onChange
          )
      };
    });
    return columnsList;
  };

  selectChange = (item, record, val) => {
    if(this.props.selectChange){
      this.props.selectChange(item, record, val);
    }
  }

  getField = (record, item) => {
    const { inputType, selectData } = item;
    if (inputType === "number") {
      return <InputNumber />;
    } else if (inputType === "select") {
      return (
        <Select style={{ width: "100%" }} showSearch onChange={val=>this.selectChange(item, record, val)}>
          {selectData.map(item => (
            <Option value={item.value} key={item.key}>
              {item.name}
            </Option>
          ))}
        </Select>
      );
    } else if (inputType === "multiple") {
      return (
        <Select style={{ width: "100%" }} showSearch mode="multiple">
          {selectData.map(item => (
            <Option value={item.value} key={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
      );
    } else if (inputType === "tags") {
      return (
        <Select mode="tags" style={{ width: "100%" }}/>
      );
    }
    return <Input />;
  };

  renderColumns = (record, item) => {
    const { form, disabled = false } = this.props;
    const { getFieldDecorator } = form;
    if (disabled) {
      return (
        <span>
          {record[item.dataIndex] instanceof Array
            ? record[item.dataIndex].join(",")
            : record[item.dataIndex]}
        </span>
      );
    } else {
      return (
        <FormItem style={{ margin: 0 }}>
          {getFieldDecorator(`${item.dataIndex}${record.key}`, {
            rules: [
              {
                required: item.required,
                message: `请${item.inputType === "select" ? "选择" : "输入"}${
                  item.title
                }`
              }
            ],
            initialValue: record[item.dataIndex]
          })(this.getField(record,item))}
        </FormItem>
      );
    }
  };

  render() {
    const { data, columns, width } = this.props;
    const columnList = this.getColumns(columns);
    return (
      <div className="tableWrap">
        <Table
          pagination={false}
          rowKey={record => record.key}
          bordered
          dataSource={data}
          columns={columnList}
          scroll={{ x: width }}
        />
      </div>
    );
  }
}
