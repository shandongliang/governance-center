import React, { Component } from 'react';
import { Layout, Menu, Icon, Switch, Tabs, Button } from 'antd';
import classNames from 'classnames';
import HeaderAntd from './../../../component/header-antd/index';
import Menus from './../../../component/menu/Menu';
import TabNav from './../../../component/tab-nav/index';
import Constant from '../../../constant/index';
import { authStore, menuStore, cacheStore, navStore } from '../../../util/store';
import { $fetch, $fetchSync } from '$fetch';
import SubRoute from '../../../route/subRouteIndex';

import './index.less';
import logo from './../../../../assets/images/logo-img.png';

const { Header, Sider, Content } = Layout;
const prefixCls = 'pandora-app';
export default class PandoraLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			siderFold: false,
			darkTheme: 'dark',
			defaultChecked: true,
			isNeedChange: false
		};
	}

	toggle = () => {
		this.setState({
			siderFold: !this.state.siderFold
		});

	}

	changeTheme = (checked) => {
		let theme = checked ? "dark" : "light";
		this.setState({
			darkTheme: theme,
			defaultChecked: !this.state.defaultChecked,
		});

	}
	// 对外扩展（针对 民生开放银行项目组）
	handleMenuData = () => {
		// console.log("扩展逻辑");
	}

	handleChangeTabNavStyle = () => {
		this.setState({
			isNeedChange: false
		})
	}

	render() {
		const { children, pathName, routes, params } = this.props;
		const { darkTheme, siderFold, defaultChecked } = this.state;
		//从pandora后台返回的menu数据，来源：1.登录，2.对接子系统；
		const menuData = menuStore.get(Constant.MENU_INFO);
		let changeTabnavStyle = {
			isNeedChange: this.state.isNeedChange,
			key: "/systemManage/funcManage/funcQur",
		}
		return (
			<Layout style={{ minWidth: 1200}}>
				<Sider
					trigger={null}
					collapsible
					collapsed={siderFold}
					width={224}
					collapsedWidth={42}
					className={classNames('pandora-slider', { lightTheme: (darkTheme == 'light') })}
					style={{ position: 'absolute', height: '100vh', }}
				>
					<div className="pandora-logo">
						<div className="nav-logo">
							<img alt='logo' src={logo} className={siderFold ? 's-img' : 'n-img'} />
							{siderFold ? '' : <h1>大禹治理</h1>}
						</div>
					</div>
					<Menus
						mode="vertial"
						darkTheme={darkTheme}
						siderFold={siderFold}
						menuData={menuData}
						// searchMenu={true}
						handleCallback={this.handleMenuData}
					/>
					{!siderFold ? (<div className="switch-theme">
						<span><Icon type="bulb" />Switch Theme</span>
						<Switch
							onChange={this.changeTheme}
							defaultChecked={defaultChecked}
							checkedChildren="Dark"
							unCheckedChildren="Light"
							className="theme_switch" />
					</div>) : ''}
				</Sider>
				<Layout className="pandora-layout" style={siderFold ? { marginLeft: 42 } : { marginLeft: 224 }}>
					<HeaderAntd handleClick={this.toggle} siderFold={siderFold} userName={this.props.userName} />
					<TabNav></TabNav>
					<Content className={"pandora-content " + pathName} style={{ minWidth: 800 }}>
						<SubRoute />
					</Content>
				</Layout>
			</Layout>
		)
	}
}
