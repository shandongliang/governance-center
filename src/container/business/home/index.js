import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';

import $fetch from '$fetch';

// import './../../../common/style/index.less';
import './index.less';

export default class Homepage extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    downLoad = () => {
        //let reqSeqNo = randomNamber()
        //console.log(this.state.selectedRows, this.state.selectedRowKeys);


    }
    render() {

        return (
            <div className="homepage1" style={{ height: 'auto' }}>
                <div className="textbox">
                    <p>欢迎使用大禹治理</p>
                    <div className="contentbox">

                        <span className='content1' style={{ verticalAlign: 'text-top', letterSpacing: '2.7px' }}>当前版本号：</span>
                        <span className='content2' style={{ verticalAlign: 'text-top' }}>V-2.2.0</span>
                        <span className='content1' style={{ verticalAlign: 'text-top' }}>版本内容变更：</span>
                        <span className='content2' style={{ verticalAlign: 'text-top' }}>主题级别设置消息过期时间，服务单元导入功能，消息全链路跟踪查询功能，优化治理端消息重投界面，调整治理端界面菜单排列顺序，治理端消息消费进度查询界面</span>
                        {/* <span className='content1' style={{ verticalAlign: 'text-top', }}>查看操作手册：</span>
                        <a href="assets/handleDoc/eda.docx" download='操作手册'>点击下载</a> */}


                    </div>
                </div>
                {/* <marquee className='horseRace'>
                    跑来跑去的跑马灯
                </marquee> */}
                {/* <div className='scroll-area'>
                    <div className='scroll'>
                        <Icon type='sound' /><span className='today-scroll-content'>&nbsp;&nbsp;&nbsp;&nbsp;EDA SDK 1.0.7-SNAPSHOT 版本已经发布，欢迎试用，具体请参见confluence 维护公告</span>
                    </div>
                </div> */}
                <div className='flowDraw'>
                    {/* <div style={{ margin: '15px', }}>大禹治理项目流程简介：</div> */}
                    <div style={{ padding: '20px', }}>
                        <img style={{ display: 'block', width: '100%' }} src="assets/images/content.png" alt="" />


                    </div>
                </div>
            </div>

        )
    }
}
