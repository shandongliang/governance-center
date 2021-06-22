import React, { Component } from 'react';
import moment from '$moment';
import { Icon, DatePicker, Button, TimePicker, Select, Checkbox, Upload, Tabs } from 'antd';
import { Form, Row, Col, Input } from 'antd';

import { DATE_FORMAT_MOMENT, BACKSTAGE_PROJ_NAME } from './../../../constant/index';
import $fetch from '$fetch';
import { goTo, goToAndClose } from './../../../util/tabRouter.js';

import './../../common/style/index.less';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class LeaveBusiEdit extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			queryParams: this.props.location.state
		}
	}

	render() {
		return (
			<div>
				<div className="pandora-main-content">
					<div className="portlet-tab">
						<Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
							<TabPane tab="编辑请年假" key="1">
								<div className="portlet-body">
									<WrapperEditForm queryParams={this.state.queryParams}></WrapperEditForm>
								</div>
							</TabPane>
						</Tabs>
					</div>
				</div>
			</div>
		);
	}
}

class EditForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	componentDidMount() {
		let id = this.props.queryParams.id;
		$fetch({
			url: '/' + BACKSTAGE_PROJ_NAME + '/gencode/queryLeaveBusiDetail',
			data: { id: id }
		}).then(res => {
			if (res.reply.returnCode.type == "S") {
				this.setState(
					res.reply.leaveBusi,
				);
				this.setState({
					loading: false
				});
			} else {
			}
		});
	}

	displayField = (displayType, name, valueRange) => {
		switch (displayType) {
			case 'TEXT': {
				return (
					<Input placeholder='' style={{ width: 210 }} />
				)
			}
			case 'NUMBER': {
				return (
					<Input type="number" style={{ width: 210 }} />
				);
			}
			case 'FLOAT': {
				return (
					<Input placeholder='' style={{ width: 210 }} />
				)
			}
			case 'SELECT': {
				_valueRange = valueRange ? valueRange : "";
				const optionArr = _valueRange.split("|");
				let localCounter = 1;
				return (
					<Select
						style={{ width: 210 }}
						getPopupContainer={(triggerNode) => triggerNode.parentNode}
					>
						{
							optionArr.map((itm) => {
								return (
									<Select.Option key={localCounter++} value={itm}>{itm}</Select.Option>
								)
							})
						}
					</Select>
				);
			}
			case 'DATE': {
				return (
					<DatePicker
						style={{ width: 210 }}
						format={DATE_FORMAT_MOMENT}
					/>
				)
			}
			case 'TIME': {
				return (
					<TimePicker
						placeholder="请选择时间"
						format="HH:mm:ss"
						style={{ width: 210 }}
					/>
				);
			}
			case 'MULTISELECT': {
				_valueRange = valueRange ? valueRange : "";
				const chkboxArr = _valueRange.split("|");
				let options = [];
				chkboxArr.forEach((itm) => {
					options.push({ label: itm, value: itm });
				})
				return (
					<CheckboxGroup options={options} />
				);
			}
			case 'UPLOAD': {
				return (
					<Upload >
						<Button type="ghost">
							<Icon type="upload" /> Upload
                        </Button>
					</Upload>
				);
			}
		}
	}

	getMinMaxFromNumber = (valueRange) => {
		valueRangeTmp = valueRange ? valueRange : "";
		let min = 0, max = 0;
		const len = valueRangeTmp.length;
		if (len > 0) {
			const arr = valueRangeTmp.split(",");
			if (valueRangeTmp.charAt(0) == "(") {
				min = parseInt(arr[0].substring(1)) + 1;
			} else if (valueRangeTmp.charAt(0) == "[") {
				min = parseInt(arr[0].substring(1))
			}
			if (valueRangeTmp.charAt(len - 1) == ")") {
				max = parseInt(arr[1].substring(0, arr[1].length - 1)) - 1;
			} else if (valueRangeTmp.charAt(len - 1) == "]") {
				max = parseInt(arr[1].substring(0, arr[1].length - 1));
			}
		}

		return { min: min, max: max };
	}

	validateNumber = (name, valueRange) => {
		const obj = this.getMinMaxFromNumber(valueRange);
		return (rule, value, callback) => {
			const { getFieldValue } = this.props.form;
			const tmpValue = getFieldValue(name);
			if (!!tmpValue) {
				const tmpValueInt = parseInt(tmpValue);
				if (tmpValueInt < obj.min || tmpValueInt > obj.max) {
					callback("数值不在指定范围");
				}
			}

			callback();
		}
	}

	getRegExpFromFloat = (accuracy) => {
		let _accuracy = accuracy ? accuracy : "";
		let _decimalLen = 0;
		let _intLen = 0;
		if (_accuracy.length > 0) {
			const _arr = _accuracy.split("|");
			if (_arr.length > 1) {
				_decimalLen = parseInt(_arr[1]);
				_intLen = parseInt(_arr[0]) - _decimalLen;
			}
		}

		const accuracyRegExpStr = '/^\\d{0,' + _intLen + '}(\\.\\d{0,' + _decimalLen + '})?$/';
		const accuracyRegExp = new RegExp(eval(accuracyRegExpStr));

		return accuracyRegExp;
	}

	getLenAndRegExpFromText = (length, validationTmpl) => {
		const len = length ? length : "";
		let _validationTmpl = new RegExp();
		if (!!validationTmpl && validationTmpl.indexOf("null") < 0) {
			_validationTmpl = new RegExp(eval("/" + validationTmpl + "/"));
		}

		return { len: len, regExp: _validationTmpl }
	}

	addZero = (val) => {
		return val > 9 ? val : ('0' + val);
	}

	toDetail = () => {
		let path = {
			pathname: '/leavebusi/detail',
			state: {
				...this.props.queryParams
			}
		}
		goToAndClose(path);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				const _createTime = values.createTime;
				if (!!_createTime) {
					values.createTime = this.addZero(_createTime.hours()) + ":" + this.addZero(_createTime.minutes()) + ":" +
						this.addZero(_createTime.seconds());
				}

				values['id'] = this.props.queryParams.id;

				let param = {
					'leaveBusi': values
				};

				this.setState({ loading: true });
				$fetch({
					url: '/' + BACKSTAGE_PROJ_NAME + '/gencode/editLeaveBusi',
					data: param
				}).then(res => {
					this.setState({
						loading: false
					});
					let path = {
						pathname: '/leavebusi/index',
						state: {
							...this.props.queryParams
						}
					}
					goToAndClose(path);
				});
			}
		})
	}

	render() {
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 }
		}
		const { getFieldDecorator } = this.props.form;

		return (
			<Form onSubmit={this.handleSubmit}>
				<Row style={{ marginTop: 18 }}>
					<Col span={7} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假备注'
							labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
							{getFieldDecorator('leaveRemark', {
								initialValue: this.state.leaveRemark,
								rules: [
									{ pattern: this.getLenAndRegExpFromText(100, '').regExp, message: '数据格式不正确' },
									{
										max: this.getLenAndRegExpFromText(100, '').len,
										message: '数据长度过长'
									}
								]
							})(
								this.displayField('TEXT', 'leaveRemark', '')
							)}
						</FormItem>
					</Col>
					<Col span={7} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假事由'
							labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
							{getFieldDecorator('leaveReason', {
								initialValue: this.state.leaveReason,
								rules: [
									{ pattern: this.getLenAndRegExpFromText(100, '').regExp, message: '数据格式不正确' },
									{
										max: this.getLenAndRegExpFromText(100, '').len,
										message: '数据长度过长'
									}
								]
							})(
								this.displayField('TEXT', 'leaveReason', '')
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={7} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假天数'
							labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
							{getFieldDecorator('leaveDay', {
								initialValue: this.state.leaveDay,
								rules: [
									{
										validator: this.validateNumber("leaveDay", "[1,120]")
									}
								]
							})(
								this.displayField('NUMBER', 'leaveDay', '')
							)}
						</FormItem>
					</Col>
					<Col span={7} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假人'
							labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
							{getFieldDecorator('leaveName', {
								initialValue: this.state.leaveName,
								rules: [
									{ pattern: this.getLenAndRegExpFromText(50, '').regExp, message: '数据格式不正确' },
									{
										max: this.getLenAndRegExpFromText(50, '').len,
										message: '数据长度过长'
									},
									{ required: true, message: '请输入请假人' }
								]
							})(
								this.displayField('TEXT', 'leaveName', '')
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={7} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='创建时间'
							labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
							{getFieldDecorator(
								'createTime',
								!!this.state.createTime ?
									{ initialValue: moment(this.state.createTime, 'HH:mm:ss'), }
									:
									{}
							)(
								this.displayField('TIME', 'createTime', '')
							)}
						</FormItem>
					</Col>
					<Col span={7} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='状态'
							labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
							{getFieldDecorator('status', {
								initialValue: this.state.status,
								rules: [
									{ pattern: this.getLenAndRegExpFromText(50, '').regExp, message: '数据格式不正确' },
									{
										max: this.getLenAndRegExpFromText(50, '').len,
										message: '数据长度过长'
									}
								]
							})(
								this.displayField('TEXT', 'status', '')
							)}
						</FormItem>
					</Col>
				</Row>
				<Row type="flex">
					<Col span={7} offset={2} style={{ marginLeft: 110 }}>
						<Button className="query-btn operatorBtn pandora-btn-fontsize" htmlType="submit" >提交</Button>
						<Button className="query-btn pandora-btn-fontsize" onClick={this.toDetail} >取消</Button>
					</Col>
				</Row>
			</Form>
		);
	}
}

const WrapperEditForm = Form.create()(EditForm);
