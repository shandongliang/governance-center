import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { Button, message, Modal } from "antd";
import wrapAuth from "../../util/pageEleHOC";

const WrapButton = wrapAuth(Button);
const confirm = Modal.confirm;
export default class ExportBtnGroup extends Component {
  constructor(props, context) {
    super();
    this.state = {};
  }
  //导出数据
  download = type => {
    const { exportType, selectedRowKeys, exportData, exportDataByOldType, clearSelect } = this.props;
    let data = {
      ids: selectedRowKeys,
      exportType
    };
    if(type === "oldType"){
      exportDataByOldType(data).then(res => {
        clearSelect();
        message.warn("仅成功下载已通过审核的数据", 6);
      });
    } else {
      exportData(data).then(res => {
        clearSelect();
        message.warn("仅成功下载已通过审核的数据", 6);
      });
    }
  };
  //批量下载
  downloadCommon = type => {
    const { selectedRowKeys, exportCommonData, clearSelect } = this.props;
    let data = {
      pathList: selectedRowKeys
    };
    exportCommonData(data).then(res => {
      clearSelect();
      message.info("下载成功", 6);
    });
  };
  //批量删除
  batchDelete = () => {
    const { selectedData, deleteData, fetchData, clearSelect } = this.props;
    let deleteList = selectedData.map(item=>{
      return {
        ...item,
        updateUserName: JSON.parse(sessionStorage.getItem("$pandora_auth.user_info")).userId,
        updUserName: JSON.parse(sessionStorage.getItem("$pandora_auth.user_info")).userId
      }
    })
    let data = {
      list: deleteList
    };
    let _this = this;
    confirm({
      title: `你确定删除这${selectedData.length}条数据吗？`,
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
  //批量审核
  batchApprove = () => {
    this.props.approveData();
  };
  render() {
    const { selectedData, clearSelect, exportData, exportDataByOldType, deleteData, approveData, deleteButtonId, exportButtonId, exportOldButtonId, exportCommonData } = this.props;
    return (
      <div style={{ marginBottom: 5 }}>
      {exportCommonData&&<Button
          type="primary"
          size="small"
          disabled={selectedData.length === 0}
          onClick={this.downloadCommon}
          className="opeBtn"
        >
          导出数据
        </Button>}
        {exportData&&<WrapButton
          id={exportButtonId}
          type="primary"
          size="small"
          disabled={selectedData.length === 0}
          onClick={this.download}
          className="opeBtn"
        >
          导出数据
        </WrapButton>}
        {exportDataByOldType&&<WrapButton
          id={exportOldButtonId}
          type="primary"
          size="small"
          disabled={selectedData.length === 0}
          onClick={()=>this.download("oldType")}
          className="opeBtn"
        >
          导出数据(旧格式)
        </WrapButton>}
        {approveData&&<Button
          type="primary"
          size="small"
          disabled={selectedData.length === 0}
          onClick={this.batchApprove}
          className="opeBtn"
        >
          批量审核
        </Button>}
        {deleteData&&<WrapButton
          id={deleteButtonId}
          type="danger"
          size="small"
          disabled={selectedData.length === 0}
          onClick={this.batchDelete}
          className="opeBtn"
        >
          批量删除
        </WrapButton>}
        <Button
          disabled={selectedData.length === 0}
          size="small"
          className="opeBtn"
          onClick={clearSelect}
        >
          清空选择
        </Button>
        <span style={{ marginLeft: 10 }}>
          {selectedData.length > 0
            ? `已选择${selectedData.length}条`
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
