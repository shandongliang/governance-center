import React, { Component } from 'react';
import { authStore } from './../../../util/store'; // 引入oauthStore
import Constant, { BACKSTAGE_PROJ_NAME } from './../../../constant/index';
import { history } from './../../../util/history';
import $fetch from '$fetch';

export default class HomePageIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleBtnClick() {
        let oauthUrl = authStore.get(Constant.OAUTH_HREF);
        if (oauthUrl) {
            window.location.href = oauthUrl;
        } else {
            $fetch({
                url: '/' + BACKSTAGE_PROJ_NAME + '/rbac/checkOauth',
            }).then(res => {
                let redirectUrl = res.reply.redirectURL;
                window.location.href = redirectUrl;
            });
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleBtnClick}>点击跳转登录</button>
            </div>
        )
    }
}
