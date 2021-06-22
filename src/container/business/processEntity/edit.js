import React, { Component } from 'react';
import { Icon, DatePicker, Button, TimePicker, Select, Checkbox, Upload, Tabs } from 'antd';
import { Form, Row, Col, Input } from 'antd';

import { DATE_FORMAT_MOMENT, BACKSTAGE_PROJ_NAME, IS_OPEN_MULTI_TABNAV } from './../../../constant/index';
import $fetch from '$fetch';
import { goTo, goToAndClose } from './../../../util/tabRouter.js';
import './../../common/style/index.less';
import routerWrap from './../../../util/routerWrap';
import FileUploadTable from '../../../component/FileUploadTable/FileUploadTable';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class BusiManagerEdit extends React.Component {

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
							<TabPane tab="编辑流程管理业务实体" key="1">
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
export default !!IS_OPEN_MULTI_TABNAV ? routerWrap(BusiManagerEdit) : BusiManagerEdit;

class EditForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			fileListData: {
				attachment: [],
			}
		}
	}

	componentDidMount() {
		let id = this.props.queryParams.id;
		$fetch({
			url: '/' + BACKSTAGE_PROJ_NAME + '/gencode/queryBusiManagerDetailWithAttachment',
			data: { id: id }
		}).then(res => {
			if (res.reply.returnCode.type == "S") {
				this.setState(
					res.reply.busiManager,
				);
				let attachmentList = res.reply.busiManager.attachmentList || {}
				for (let k in attachmentList) {
					if (Object.prototype.toString.call(attachmentList[k]) == '[object Array]') {
						attachmentList[k] = attachmentList[k].map(item => { return { ...item, uploadUser: item.uploadUser.slice(-2) } })
					}
				}
				this.setState({
					loading: false,
					id: id,
					fileListData: attachmentList
				});
			} else {
			}
		});
	}

	displayField = (displayType, name, valueRange) => {
		switch (displayType) {
			case 'TEXT': {
				return (
					<Input style={{ width: 210 }} />
				)
			}
			case 'NUMBER': {
				return (
					<Input type="number" style={{ width: 210 }} />
				);
			}
			case 'FLOAT': {
				return (
					<Input style={{ width: 210 }} />
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

	validateMaxLen = (maxLen) => {
		return (rule, value, callback) => {
			if (value.length > maxLen) {
				callback("数据长度过长！")
			}

			callback();
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

	toHandleSubmit = () => {
		let hash = /\/([^/]+)$/.exec(window.location.hash),
			menuId = hash && hash[1];
		let path = {
			pathname: !!IS_OPEN_MULTI_TABNAV ? ('/busimanager/detail/' + menuId) : '/busimanager/detail',
			state: {
				...this.props.queryParams
			}
		}
		goToAndClose(path);
	}

	toHandleCancle = () => {
		let hash = /\/([^/]+)$/.exec(window.location.hash),
			menuId = hash && hash[1];
		let path = {
			pathname: !!IS_OPEN_MULTI_TABNAV ? ('/busimanager/detail/' + menuId) : '/busimanager/detail',
			state: {
				...this.props.queryParams
			}
		}
		goToAndClose(path, null, false);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		// let isHaveAttachment;
		// for(let k in this.fileListObj){
		// 	if(this.fileListObj[k].length>0){
		// 		isHaveAttachment = true
		// 		break
		// 	}
		// 	isHaveAttachment = false
		// }
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {

				values['id'] = this.props.queryParams.id;

				let param = {
					'busiManager': values
				};

				this.setState({ loading: true });
				let uploadRequest

				// 设置选择文件后自动上传提交接口调用
				uploadRequest = $fetch({
					url: '/' + BACKSTAGE_PROJ_NAME + '/gencode/editBusiManager',
					data: param
				})

				// 不设置选择文件后自动上传，提交时候带附件上传接口调用
				// if(isHaveAttachment){
				// 	let busiManager = {
				// 		...values,
				// 		status: "编辑提交"
				// 	}
				// 	uploadRequest = this.uploadInfoAndFile(busiManager,'/'+BACKSTAGE_PROJ_NAME+'/gencode/editBusiManagerWithAttachment')
				// }else{
				// 	uploadRequest = $fetch({
				// 		url: '/'+ BACKSTAGE_PROJ_NAME +'/gencode/editBusiManager',
				// 		data: param
				// 	})
				// }
				uploadRequest.then(res => {
					this.setState({
						loading: false
					});
					this.toHandleSubmit();
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
			<Form onSubmit={this.handleSubmit} style={{ marginTop: 18 }}>
				<Row>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='操作'>
							{getFieldDecorator('operation', {
								initialValue: this.state.operation,
								rules: [
									{
										max: this.getLenAndRegExpFromText(30, '^\\d{0,(30-1)}(\\.\\d{0,(30-1)})?$').len,
										message: '数据长度过长'
									}
								]
							})(
								this.displayField('TEXT', 'operation', '')
							)}
						</FormItem>
					</Col>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假状态'>
							{getFieldDecorator('status', {
								initialValue: this.state.status,
								rules: [
									{
										max: this.getLenAndRegExpFromText(10, '^\\d{0,(10-1)}(\\.\\d{0,(10-1)})?$').len,
										message: '数据长度过长'
									}
								]
							})(
								this.displayField('TEXT', 'status', '')
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='创建时间'>
							{getFieldDecorator('createTime', {
								initialValue: this.state.createTime,
								rules: [
									{
										max: this.getLenAndRegExpFromText(20, '^\\d{0,(20-1)}(\\.\\d{0,(20-1)})?$').len,
										message: '数据长度过长'
									}
								]
							})(
								this.displayField('TEXT', 'createTime', '')
							)}
						</FormItem>
					</Col>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假备注'>
							{getFieldDecorator('leaveRemark', {
								initialValue: this.state.leaveRemark,
								rules: [
									{
										max: this.getLenAndRegExpFromText(150, '^\\d{0,(150-1)}(\\.\\d{0,(150-1)})?$').len,
										message: '数据长度过长'
									}
								]
							})(
								this.displayField('TEXT', 'leaveRemark', '')
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假事由'>
							{getFieldDecorator('leaveReason', {
								initialValue: this.state.leaveReason,
								rules: [
									{
										max: this.getLenAndRegExpFromText(150, '^\\d{0,(150-1)}(\\.\\d{0,(150-1)})?$').len,
										message: '数据长度过长'
									}
								]
							})(
								this.displayField('TEXT', 'leaveReason', '')
							)}
						</FormItem>
					</Col>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假天数'>
							{getFieldDecorator('leaveDay', {
								initialValue: this.state.leaveDay,
								rules: [
									{
										max: this.getLenAndRegExpFromText(10, '^\\d{0,(10-1)}(\\.\\d{0,(10-1)})?$').len,
										message: '数据长度过长'
									}
								]
							})(
								this.displayField('TEXT', 'leaveDay', '')
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假人'>
							{getFieldDecorator('leaveName', {
								initialValue: this.state.leaveName,
								rules: [
									{
										max: this.getLenAndRegExpFromText(10, '^\\d{0,(10-1)}(\\.\\d{0,(10-1)})?$').len,
										message: '数据长度过长'
									}
								]
							})(
								this.displayField('TEXT', 'leaveName', '')
							)}
						</FormItem>
					</Col>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='ID'>
							{getFieldDecorator('busiId', {
								initialValue: this.state.busiId,
								rules: [
									{
										max: this.getLenAndRegExpFromText(10, '^\\d{0,(10-1)}(\\.\\d{0,(10-1)})?$').len,
										message: '数据长度过长'
									}
								]
							})(
								this.displayField('TEXT', 'busiId', '')
							)}
						</FormItem>
					</Col>
				</Row>

				<FileUploadTable
					parentRef={this}
					attachmentName='attachment'
					type={'show'}
					fileListData={this.state.fileListData['attachment']}
					deleteApi={'/' + BACKSTAGE_PROJ_NAME + '/gencode/deleteFile'}
					downLoadApi={'/' + BACKSTAGE_PROJ_NAME + '/gencode/downLoadFile.download'}
					isAutoUpLoad={true}
					autoUpLoadApi={{ data: { id: this.props.queryParams.id }, url: '/' + BACKSTAGE_PROJ_NAME + '/gencode/uploadAttachment' }}>
				</FileUploadTable>

				<Row type="flex">
					<Col span={7} offset={1} style={{ marginLeft: 142 }}>
						<Button className="query-btn operatorBtn pandora-btn-fontsize" htmlType="submit" >提交</Button>
						<Button className="query-btn pandora-btn-fontsize" onClick={this.toHandleCancle} >取消</Button>
					</Col>
				</Row>
			</Form>
		);
	}
}

const WrapperEditForm = Form.create()(EditForm);
