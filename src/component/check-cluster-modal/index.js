import React from "react";
import { Modal, Row, Col, Select } from "antd";

export default class CheckClusterModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    const { visible, title, clusterList, isTopic = true } = this.props;
    const { onCancel, onOk, envChange, clusterChange } = this.props;
    return (
      <Modal
        visible={visible}
        title={title}
        onOk={onOk}
        onCancel={onCancel}
      >
        {isTopic?<Row type="flex" align="middle" style={{margin: 20}}>
          <Col span={4}>环境:</Col>
          <Col span={20}>
            <Select defaultValue="" onChange={envChange} style={{width: "100%"}}>
              <Select.Option value="">不分环境</Select.Option>
              <Select.Option value="DEV">DEV</Select.Option>
              <Select.Option value="UAT">UAT</Select.Option>
              <Select.Option value="SIT">SIT</Select.Option>
              <Select.Option value="VT">VT</Select.Option>
            </Select>
          </Col>
        </Row>:null}
        <Row type="flex" align="middle" style={{margin: 20}}>
          <Col span={4}>物理集群:</Col>
          <Col span={20}>
            <Select onChange={clusterChange} style={{width: "100%"}}>
              {clusterList&&clusterList.length>0?clusterList.map(item => (
                <Select.Option value={item} key={item}>{item}</Select.Option>
              )):null}
            </Select>
          </Col>
        </Row>
      </Modal>
    )
  }
}