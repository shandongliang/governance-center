/*
	该文件已对外提供部分源码，可以扩充代码来满足您的需求，当前代码忘谨慎修改，
	PdrSettings为Pandora单独封装的组件，包含切换子系统、退出登录两个功能，
	各项目组若想在退出登录下方扩展一个或多个功能，可参照如下约定的方式进行扩展
*/
import React, { Component } from 'react';
import { Layout, Menu, Icon, Button, Avatar } from 'antd';
import { authStore, menuStore, cacheStore } from '../../util/store';
import Constant, { BACKSTAGE_PROJ_NAME } from '../../constant/index';
import PdrSettings, { logout } from './pandora-settings/index';
import BreadV4P from '../bread/index'; // pandora2.0新增
import $fetch from '$fetch';
import './index.less';
import userPhotoImg from './../../../assets/images/userPhoto.png';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

export default class HeaderAntd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			siderFold: props.siderFold,
			userPhoto: userPhotoImg,
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			siderFold: nextProps.siderFold
		});
	}

	personalCenter = () => {
		// alert("个人信息中心");
	}

	userSetting = () => {
		// alert("用户设置成功");
	}

	callBack = () => {
		// alert("退出登录成功");
	}

	render() {
		const { siderFold } = this.state;
		// 若想在 退出登录 下方扩展一个或多个功能，可参照如下方式书写，并将menuArray作为属性传递给PdrSettings组件
		// const menuArray = [
		// 	{menuKey:'personalCenter',menuName:'个人中心',menuFun:this.personalCenter},
		// 	{menuKey:'userSetting',menuName:'用户设置',menuFun:this.userSetting},
		// ];

		// pandora1.8.0新增-start
		let uName = "";
		if (authStore.has(Constant.AUTH_USER_INFO)) {
			const user = authStore.get(Constant.AUTH_USER_INFO);
			uName = user['userName'];
		}
		const userInfo = (<div style={{ display: 'inline-block' }}>
			<p>{uName}</p>
			{/*可在此处进行扩展，例如：在此处展示“技术分组”等，细节样式由各应用系统自己调整  */}
		</div>);
		// pandora1.8.0新增-end

		return (
			// Header组件的当前className、style不建议修改，其中style中42px为菜单收起时的宽度（不可修改），Constant.MENU_WIDTH_EXPANDED为菜单展开时的宽度（可在常量文件src\constant\index.js中进行修改）
			<Header className="pandora-header-antd" style={siderFold ? { width: 'calc(100% - ' + 42 + 'px)', left: 42, } : { width: 'calc(100% - ' + 224 + 'px)', left: 224, }}>
				{/* 当前Icon组件用于切换菜单收起或展开，切勿修改，否则可能会导致切换菜单功能无法使用 */}
				<div className="pandora-toggle">
					<Icon
						type={siderFold ? 'menu-unfold' : 'menu-fold'}
						onClick={this.props.handleClick}
					/>
				</div>
				<BreadV4P />
				{/* 可通过传递属性的方式扩展PdrSettings组件 */}
				{/* 如需扩展，则将userInfo 传递给PdrSettings组件，默认不扩展； pandora1.8.0新增  */}
				<PdrSettings
					userPhoto={this.state.userPhoto}
					userName={this.props.userName}
					handleLogoutSuccess={this.callBack}
				/>
			</Header>
		);
	}
}
