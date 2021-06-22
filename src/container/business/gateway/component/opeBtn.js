import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { Button, message, Modal } from "antd";

const confirm = Modal.confirm;
export class ExportBtnGroup extends Component {
  constructor(props, context) {
    super();
    this.state = {};
  }
  //导出数据
  download = () => {
    const { selectedRowKeys, exportData, clearSelect } = this.props;
    let data = {
      ids: selectedRowKeys
    };
    exportData(data).then(res => {
      clearSelect();
      message.warn("仅成功下载已通过审核的数据", 6);
    });
  };
  //批量删除
  batchDelete = () => {
    const { selectedRowKeys, deleteData, fetchData, clearSelect } = this.props;
    let data = {
      ids: selectedRowKeys
    };
    let _this = this;
    confirm({
      title: `你确定删除这${selectedRowKeys.length}条数据吗？`,
      okText: "确定",
      cancelText: "取消",
      onOk() {
        deleteData(data).then(res => {
          if (res.reply.returnCode.code === "AAAAAA") message.info("删除成功");
          fetchData();
          clearSelect();
        });
      },
      onCancel() {
        return;
      }
    });
  };
  render() {
    const { selectedRowKeys, clearSelect, deleteBtn } = this.props;
    return (
      <div style={{ marginBottom: 5 }}>
        <Button
          type="primary"
          size="small"
          disabled={selectedRowKeys.length === 0}
          onClick={this.download}
          className="opeBtn"
        >
          批量下载
        </Button>
        {!deleteBtn&&<Button
          type="danger"
          size="small"
          disabled={selectedRowKeys.length === 0}
          onClick={this.batchDelete}
          className="opeBtn"
        >
          批量删除
        </Button>}
        <Button
          disabled={selectedRowKeys.length === 0}
          size="small"
          className="opeBtn"
          onClick={clearSelect}
        >
          清空选择
        </Button>
        <span style={{ marginLeft: 10 }}>
          {selectedRowKeys.length > 0
            ? `已选择${selectedRowKeys.length}条`
            : null}
        </span>
      </div>
    );
  }
}



export class ApproveBtnGroup extends Component {
  constructor(props, context) {
    super();
    this.state = {};
  }
  
  render() {
    return (
      <div style={{ marginBottom: 5 }}>
      </div>
    );
  }
}
