
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';

import $fetch from '$fetch';

// import './../../../common/style/index.less';


export default class Option extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }
    componentDidMount() {

        this.setState({
            data: this.props.location.state
        }, () => {
            console.log(this.state.data);

        })
    }
    toIndex = () => {
      let path = {
        pathname: '/gateway/ldcConfig/index'
      };
      goToAndClose(path, "LDC查询");
    }
    render() {
        let param = this.state.data
        let tableNumber = param.tableNumber ? param.tableNumber.map((item) => {
            return item + ','
        }) : null
        return (
            <div className="option" style={{ height: 'auto' }}>
                <div className='pro'>
                    <span>ldc编号:</span>
                    <span>{param.ldcId ? param.ldcId : ''}</span>
                </div>
                <div className='pro'>
                    <span>ldc名称:</span>
                    <span>{param.ldcName ? param.ldcName : ''}</span>
                </div>
                <div className='pro'>
                    <span>执行ldc编号:</span>
                    <span>{param.execLdcId ? param.execLdcId : ''}</span>
                </div>
                <div className='pro'>
                    <span>备份ldc编号:</span>
                    <span>{param.backupLdcId ? param.backupLdcId : ''}</span>
                </div>
                <div className='pro'>
                    <span>读写区分:</span>
                    <span>{param.isWritable ? (param.isWritable == '0' ? '读' : '写') : ''}</span>
                </div>
                <div className='pro'>
                    <span>状态:</span>
                    <span>{param.status ? (param.status == 'Y' ? '有效' : '无效') : ''}</span>
                </div>
                <div className='pro' style={{ height: 'auto' }}>
                    <span style={{ verticalAlign: 'middle' }}>关联表编号:</span>
                    <span style={{ verticalAlign: 'middle', display: 'inline-block', width: '770px', wordWrap: 'break-word' }}>
                        {tableNumber}
                    </span>
                </div>
                <Button onClick={this.toIndex} className="cancelBtn" style={{ marginLeft: 10, marginTop: 20, width: 88, fontSize: 16, borderRadius: 5 }}>返回</Button>
            </div>

        )
    }
}
