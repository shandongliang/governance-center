import React, { Component } from 'react';
import { Checkbox, Upload, Modal, Tabs, version } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';

import { DATE_FORMAT_MOMENT } from './../../../../../constant/index';
import $fetch from '$fetch';

import './../../../../common/style/index.less';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

class InnerBusiManager extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	componentDidMount() { }

	handleSubmit = () => {
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
			}
		});
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
			case 'TEXT_true': {
				return (
					<Input style={{ width: 210 }} />
				)
			}
			case 'TEXT_false': {
				return (
					<Input disabled style={{ width: 210 }} />
				)
			}
			case 'TEXTAREA_true': {
				return $TextArea;
			}
			case 'TEXTAREA_false': {
				return $disTextArea;
			}
		}
	}


	render() {
		const formItemLayout = {
			labelCol: { span: 7 },
			wrapperCol: { span: 17 }
		}
		const { getFieldDecorator } = this.props.form;
		const formData = this.props.formData || {};
		const isFirstTask = this.props.isFirstTask || false;
		const triggerPoint = this.props.triggerPoint;
		let isCanBeEdit = false;
		if (isFirstTask && (triggerPoint == 'add' || triggerPoint == 'upd')) {
			isCanBeEdit = true;
		}
		if ((isFirstTask && triggerPoint == 'del') || !isFirstTask) {
			isCanBeEdit = false;
		}

		return (
			<Row>
				<Row>
					<Col span={7} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='?????????:'>
							{getFieldDecorator('leaveName', {
								initialValue: formData.leaveName,
							})(
								this.displayField('TEXT_' + isCanBeEdit, 'leaveName', '')
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={7} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='????????????:'>
							{getFieldDecorator('leaveDay', {
								initialValue: formData.leaveDay,
							})(
								this.displayField('TEXT_' + isCanBeEdit, 'leaveDay', '')
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={7} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='????????????:'>
							{getFieldDecorator('leaveReason', {
								initialValue: formData.leaveReason,
								rules: [
									{ required: true, message: '????????????????????????' },
								]
							})(
								this.displayField('TEXTAREA_' + isCanBeEdit, 'leaveReason', '')
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={7} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='????????????:'>
							{getFieldDecorator('leaveRemark', {
								initialValue: formData.leaveRemark,
							})(
								this.displayField('TEXTAREA_' + isCanBeEdit, 'leaveRemark', '')
							)}
						</FormItem>
					</Col>
				</Row>
			</Row>
		);
	}
}

const BusiManager = Form.create()(InnerBusiManager);
export { BusiManager };
