import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';
import { authStore, menuStore, navStore } from './../../../util/store'; // 引入authStore
import Constant, { BACKSTAGE_PROJ_NAME } from './../../../constant/index';
import $fetch from '$fetch';
import './index.less';
import { getNavListFromMenuList } from './../../../util/tabRouter.js';
import { history } from './../../../util/history.js';

export default class SubSystemIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleBtnClick = (subsysId) => {
        let subsysList = authStore.get(Constant.SUB_SYSTEM_LIST);
        subsysList.map((item) => {
            if (item.subsysId == subsysId) {
                authStore.set(Constant.CURRENT_SUBSYS_NAME, item.subsysName);
            }
        });
        authStore.set(Constant.SELECTED_MULTISUBSYS, true);
        $fetch({
            url: '/' + BACKSTAGE_PROJ_NAME + '/rbac/getSubsysMenu',
            data: {
                subsysId: subsysId,
            },
        }).then(res => {
            let menuList = res.reply.menuList;
            let permType = res.reply.permType;
            menuStore.set(Constant.MENU_INFO, menuList);
            navStore.set(Constant.NAV_LIST, getNavListFromMenuList(menuList));
            authStore.set(Constant.CURRENT_PERMTYPE, permType);
            history.push('/home');
        });
    }

    render() {
        let subsysList = authStore.get(Constant.SUB_SYSTEM_LIST);
        return (
            <div>
                {!!subsysList ? (<Row className="subsysList" >
                    {
                        subsysList.map((item) => {
                            return (<Col span={11} offset={1} key={item.subsysId}>
                                <Button className="subsysBtn" type="primary" onClick={() => this.handleBtnClick(item.subsysId)} >{item.subsysName}</Button>
                            </Col>)
                        })
                    }
                </Row>) : ''}
            </div>
        )
    }
}
