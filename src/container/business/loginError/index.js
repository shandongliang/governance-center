import React, { Component } from 'react';
import { Modal } from 'antd';
import { history } from './../../../util/history.js';
import $fetch from '$fetch';
import Constant from '../../../constant/index';

export default class loginError extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var url = window.location.href;
        var message = decodeURIComponent(window.location.href.split("?")[1].split("&")[0].split("=")[1]);
        if(window.location.href.split("?")[1].split("&").length>1){
            var oriUrl = decodeURIComponent(window.location.href.split("?")[1].split("&")[1].split("=")[1]);
        }
        Modal.error({
            title: '异常信息',
            width: 600,
            content: message,
            okText: '确认',
            onOk: () => {
                $fetch({
                    url: '/' + Constant.BACKSTAGE_PROJ_NAME + '/rbac/oauthLogout',
                    data: {oriUrl}
                }).then(res => {
                    window.location.href = res.reply.redirectURL;
                });
            }
        });
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}
