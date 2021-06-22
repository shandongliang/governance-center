import React, { Component } from 'react'
import { Button, Input, Modal } from "antd";

export default class ApproveModal extends Component {
  constructor(props,context){
    super();
    this.state = {
      approveText: ""
    }
  }
  cancleModal = () => {
    this.setState({
      approveText: ""
    });
    this.props.cancleModal();
  };
  examine = result => {
    const { selectedData, approveData, clearSelect } = this.props;
    let approveDataList = selectedData.map(item => {
      return {
        ...item,
        approveStatus: result,
        approveText: this.state.approveText,
        updateUserName: JSON.parse(sessionStorage.getItem("$pandora_auth.user_info")).userId,
        updUserName: JSON.parse(sessionStorage.getItem("$pandora_auth.user_info")).userId,
        approveUser: JSON.parse(sessionStorage.getItem("$pandora_auth.user_info")).userId
      };
    });
    let data = {
      list: approveDataList
    };
    approveData(data).then(res => {
      if (res.reply.returnCode.type == "S") {
        this.cancleModal();
        this.props.clearSelect();
        Modal.success({
          title: "审核成功",
          onOk: () => {
            this.props.fetchData();
          }
        });
      }
    });
  };
  render(){
    const { visible } = this.props;
    return(
      <div>
        <Modal
          // style = {{paddingLeft: 100, paddingRight: 100 }}
          width={500}
          visible={visible}
          title="您确定审核当前选中的服务单元？"
          // closable
          onCancel={this.cancleModal}
          footer={[
            <Button
              size="large"
              type="primary"
              onClick={() => this.examine("2")}
              key="nopass"
            >
              不通过
            </Button>,
            <Button
              size="large"
              type="primary"
              onClick={() => this.examine("1")}
              key="pass"
            >
              通过
            </Button>
          ]}
        >
          <Input
            type="textarea"
            placeholder="请输入审核意见"
            value={this.state.approveText}
            onChange={event =>
              this.setState({ approveText: event.target.value })
            }
            rows={6}
            style={{ margin: "30px 0", width: "100%" }}
          />
        </Modal>
      </div>
    )
  }
}