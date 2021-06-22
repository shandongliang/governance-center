import React, { Component } from 'react';
import { Button } from 'antd';
import { authStore } from './../../../util/store'; // 引入authStore
import Constant, { BACKSTAGE_PROJ_NAME } from './../../../constant/index';
import $fetch from '$fetch';
import './index.less';
import { history } from './../../../util/history.js';


export default class HomeIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleBtnClick = () => {
        // 用于在app组件中判断是否是从自定义主页跳转过来的，如果是，则展示带菜单的主界面，若不使用该常量开关，页面将一直停留在自定义主页的界面
        authStore.set(Constant.FROM_HOME_INDEX, true);
        // 默认跳转home页面；当用户的子系统类型为select 则先跳转至子系统列表页
        const multisubsysType = authStore.get(Constant.MULTISUBSYSTYPE);
        if (multisubsysType === 'select') {
            history.push({
                pathname: '/subSystem',
            });
        } else {
            history.push({
                pathname: '/home',
            });
        }

    }

    render() {
        let subsysList = this.state.subsysList;
        return (
            <div>
                <Button
                    className="subsysBtn"
                    type="primary"
                    onClick={this.handleBtnClick}
                >首页</Button>
            </div>
        )
    }
}
