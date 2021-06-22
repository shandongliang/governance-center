import React, { Component } from 'react'
import { Button, Input, Modal } from "antd";

export class ApproveModal extends Component {
  constructor(props,context){
    super();
    this.state = {
      approveText: "",
      visiable: false
    }
  }
  cancleModal = () => {
    this.setState({
      visiable: false,
      approveText: ""
    });
    message.info("审核取消");
  };
  render(){
    return(
      <div>
        <Modal
          // style = {{paddingLeft: 100, paddingRight: 100 }}
          width={500}
          visible={this.state.visiable}
          title="您确定审核当前选中的服务单元？"
          // closable
          onCancel={this.cancleModal}
          footer={[
            <Button
              size="large"
              type="primary"
              onClick={() => this.examine("11")}
            >
              不通过
            </Button>,
            <Button
              size="large"
              type="primary"
              onClick={() => this.examine("01")}
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
            style={{ margin: 30, width: "100%" }}
          />
        </Modal>
      </div>
    )
  }
}