import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { authStore } from '../../../../../util/store';
import Constant from '../../../../../constant/index';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, version } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';

import { DATE_FORMAT_MOMENT } from './../../../../../constant/index';
import $fetch from '$fetch';

import './../../../../common/style/index.less';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

class InnerTimerEmail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	componentDidMount() {
	}

	displayField = (displayType, name, valueRange) => {
		let antdVersion = version.split('.')[0];
		let $TextArea;
		let $disTextArea;
		if (antdVersion == "2") {
			$TextArea = <Input type="textarea" autosize={{ minRows: 1 }} style={{ width: 210 }} />;
			$disTextArea = <Input type="textarea" disabled autosize={{ minRows: 1 }} style={{ width: 210 }} />;
		} else if (antdVersion == "3") {
			$TextArea = <TextArea autoSize={{ minRows: 1 }} style={{ width: 210 }} />;
			$disTextArea = <TextArea disabled autoSize={{ minRows: 1 }} style={{ width: 210 }} />;
		}
		switch (displayType) {
			case 'TEXT': {
				return (
					<Input />
				)
			}
			case 'TEXT_DISABLED': {
				return (
					<Input disabled />
				)
			}
			case 'TEXTAREA': {
				return $TextArea;
			}
			case 'TEXTAREA_DISABLED': {
				return $disTextArea;
			}
		}
	}

	render() {
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 }
		}
		const { getFieldDecorator } = this.props.form;
		//const formData = this.props.formData || {};
		const formData = this.props.formData || {};
		return (
			<div>
				<Row>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假人:'>
							{getFieldDecorator('leaveName', {
								initialValue: formData.leaveName,
							})(
								this.displayField('TEXT_DISABLED', 'leaveName', '')
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假天数:'>
							{getFieldDecorator('leaveDay', {
								initialValue: formData.leaveDay,
							})(
								this.displayField('TEXT_DISABLED', 'leaveDay', '')
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假原因:'>
							{getFieldDecorator('leaveReason', {
								initialValue: formData.leaveReason,
							})(
								this.displayField('TEXTAREA_DISABLED', 'leaveReason', '')
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假备注:'>
							{getFieldDecorator('leaveRemark', {
								initialValue: formData.leaveRemark,
							})(
								this.displayField('TEXTAREA_DISABLED', 'leaveRemark', '')
							)}
						</FormItem>
					</Col>
				</Row>
			</div>
		);
	}
}

const TimerEmail = Form.create()(InnerTimerEmail);
export { TimerEmail };
