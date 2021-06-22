import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Breadcrumb,
  Icon,
  Button,
  Modal,
  Tabs,
  Row, 
  Col,
  Spin,
  Tag
} from "antd";
import {
  syncSubmoduleSDKVersionFromZK
} from "../service/service"
// import './../../../common/style/index.less';

const TabPane = Tabs.TabPane;
export default class ManualSync extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor() {
    super();
    this.state = {
      loading: false,
      errorList: [],
      successList: [],
      visible: false
    };
  }
  componentDidMount() {}

  manualSync = () => {
    this.setState({
      loading: true
    })
    syncSubmoduleSDKVersionFromZK().then(res=>{
      this.setState({
        loading: false
      })
      if(res.reply.returnCode.type==="S"){
        this.setState({
          errorList: res.reply.result.errorList,
          successList: res.reply.result.successList,
          visible: true
        })
      }
    })
  }
  handleOk = () => {
    this.setState({
      visible: false,
      errorList: [],
      successList: []
    })
  }
  render() {
    const { errorList, successList, loading } = this.state;
    const spinStyle = {
      position: "absolute", 
      top: 0, 
      bottom: 0, 
      left: 0, 
      right: 0, 
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100
    }
    return (
      <div className="refreshProperties">
      {loading&&<div style={spinStyle}>
        <Spin size="large" tip="同步中..."/>
      </div>}
        <Button
          type="primary"
          onClick={this.manualSync}
          style={{ height: "32px" }}
        >
          手动同步
        </Button>
        <Modal
          visible={this.state.visible}
          title="同步结果"
          onOk={this.handleOk}
          onCancel={this.handleOk}
        >
          <div
            style={{ lineHeight: "36px", paddingLeft: "20px" }}
          >

            <Tag color="#87d068">{successList.length}条成功</Tag>
            <Tag color="#f50">{errorList.length}条异常！</Tag>
            <div>
              <div style={{fontSize: 20}} >异常数据列表：</div>
              {errorList.length>0&&errorList?errorList.map((item,index)=>(
                <Row key={index.toString()} style={{paddingLeft: "20px"}}>{(index+1).toString()}.{item}</Row>
              )):null}
            </div>
            </div>
            
        </Modal>
      </div>
    );
  }
}
