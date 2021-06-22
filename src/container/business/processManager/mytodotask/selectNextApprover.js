import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';

export default class SelectNextApprover extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    // 选择审批人
    rowSelectHandle = (selectedRowKeys, selectRows) => {
        this.props.callbackParent({
            selectedRowKeys: selectedRowKeys,
        });
    }

    render() {
        const rowSelection = !!this.props.isTaskIdPrev && this.props.isTaskIdPrev == 'true'
            ? { type: 'checkbox', onChange: this.rowSelectHandle }
            : { type: 'radio', onChange: this.rowSelectHandle };

        return (
            <div>
                <Table
                    pagination={true}
                    dataSource={this.props.modalTableData}
                    columns={this.props.columns}
                    rowSelection={rowSelection}
                    size="small"
                    rowKey='userId'
                    style={{ paddingLeft: 10, paddingRight: 10, marginTop: 10, marginBottom: 10, color: "red" }}
                >
                </Table>
            </div>
        );
    }
}
