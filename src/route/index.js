import React from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { history } from './../util/history.js';
import asyncImport from '../util/asyncImport.js';
import { ConfigProvider, version } from "antd";
import zhCN from 'antd/es/locale/zh_CN';

import App from './../container/business/app/index';
const Login = asyncImport(() => import(/* webpackChunkName:'Login' */  './../login/index'));
// 登录前的个性化首页  pandora1.4.0-SNAPSHOT新增 ,pandora1.6.0-SNAPSHOT修改
// const HomePageIndex = asyncImport(() => import(/* webpackChunkName:'HomePageIndex' */  './../container/business/homePage/index'));
// 登录后的自定义主页 pandora1.7.3-SNAPSHOT新增
const HomeIndex = asyncImport(() => import(/* webpackChunkName:'HomeIndex' */  './../container/business/homeIndex/index'));
// 展示在子组件区域的首页
const HomePage = asyncImport(() => import(/* webpackChunkName:'HomePage' */  './../container/business/home/index'));
// 子系统列表 pandora1.6.0-SNAPSHOT新增
const SubSystemIndex = asyncImport(() => import(/* webpackChunkName:'SubSystemIndex' */  './../container/business/subSystem/index'));
// 登录统一身份认证平台失败（统一平台回调方法报错） 的错误提示页面 pandora1.9.0-SNAPSHOT新增
const LoginError = asyncImport(() => import(/* webpackChunkName:'LoginError' */  './../container/business/loginError/index'));

// 登录前的个性化首页  pandora1.4.0-SNAPSHOT新增 ,pandora1.6.0-SNAPSHOT修改
const HomePageIndex = asyncImport(() => import(/* webpackChunkName:'HomePageIndex' */  './../homePage/index'));

const AppRoute = function () {
	return <ConfigProvider locale={zhCN}>
		<Router history={history} >
			<Switch>
				{/* 登录前的个性化首页 pandora1.4.0-SNAPSHOT新增 ,pandora1.6.0-SNAPSHOT修改 */}
				<Route path="/homePage" component={HomePageIndex}></Route>
				{/* pandora1.6.0-SNAPSHOT新增 */}
				<Route path="/subSystem" component={SubSystemIndex} ></Route>
				{/* 登录后的自定义主页 pandora1.7.3-SNAPSHOT新增 */}
				<Route path="/homeIndex" component={HomeIndex} ></Route>
				{/* 不对接安保登录  */}
				<Route path="/login" component={Login}></Route>
				{/* 统一平台回调方法报错后的错误提示页面 pandora1.9.0-SNAPSHOT新增 */}
				<Route path="/loginError" component={LoginError} ></Route>
				<Route path="/" component={App}></Route>
			</Switch>
		</Router>
	</ConfigProvider>
};

export default AppRoute;
