import React, { Component } from 'react';
import { Layout, Menu, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import $fetch from '$fetch';
import './index.less';


export default class HeaderButton extends Component {
	static contextTypes = {
		router: PropTypes.any
	}
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {

	}

	render() {
		return (
			<div className="button">
				{/* <Icon type="mail"/> */}
			</div>
		);
	}
}