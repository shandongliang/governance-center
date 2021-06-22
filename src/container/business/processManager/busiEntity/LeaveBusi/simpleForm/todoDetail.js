import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { authStore } from '../../../../../util/store';
import Constant from '../../../../../constant/index';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs,version } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';

import { DATE_FORMAT_MOMENT } from './../../../../../constant/index';
import $fetch from '$fetch';
import wrapAuth from './../../../../../util/HOC';
import './../../../../common/style/index.less';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
let AntInput = Input;
const AntdInput = wrapAuth(AntInput,"user");
const {TextArea} = Input;


class InnerBusiManagerTodoDetail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			busiFormisNotValidated:false,
		}
    }

    componentDidMount(){

	 }

	handleChange = () => { }

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
					<Input style={{width:210}}/>
				)
			}
			case 'TEXT_false': {
				return (
					<Input disabled style={{width:210}}/>
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

	// 是否隐藏整个条目
	isHiddenCurrentEle = (currentEleId,permEleList) => {
		for(let i=0;i<permEleList.length;i++){
			if(permEleList[i].eleId == currentEleId){
				if(permEleList[i].eleType === "hidden"){
					return {display:'none'};
				}else if(permEleList[i].eleType === "readonly" || permEleList[i].eleType === "disabled" || permEleList[i].eleType === "show"){
					return {display:'block'};
				}
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
		const eleList = this.props.eleList;
		return (
			<Row>
				<Row>
					<Col span={7} offset={1} style={this.isHiddenCurrentEle('leaveName',eleList)}>
						<FormItem {...formItemLayout} label='请假人:'>
							{getFieldDecorator('leaveName', {
								initialValue: formData.leaveName,
							})(
								<AntdInput type="text" id="leaveName" />
								)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={7} offset={1} style={this.isHiddenCurrentEle('leaveDay',eleList)}>
						<FormItem {...formItemLayout} label='请假天数:'>
							{getFieldDecorator('leaveDay', {
								initialValue: formData.leaveDay,
								rules:[{
									required:true
								}]
							})(
								<AntdInput type="text" id="leaveDay" />
								)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={7} offset={1} style={this.isHiddenCurrentEle('leaveReason',eleList)}>
						<FormItem {...formItemLayout} label='请假原因:'>
							{getFieldDecorator('leaveReason', {
								initialValue: formData.leaveReason,
							})(
								<AntdInput type="text" id="leaveReason" />
								)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={7} offset={1} style={this.isHiddenCurrentEle('leaveRemark',eleList)}>
						<FormItem {...formItemLayout} label='请假备注:'>
								{getFieldDecorator('leaveRemark', {
								initialValue: formData.leaveRemark,
							})(
								<AntdInput type="text" id="leaveRemark" />
								)}
						</FormItem>
					</Col>
				</Row>
				 <Row>
					<Col span={7} offset={1} style={{display:'none'}}>
						<FormItem {...formItemLayout} label='用于判断业务表单数据验证是否通过:'>
								{getFieldDecorator('busiFormisNotValidated', {
									initialValue: this.state.busiFormisNotValidated,
								})(
									<input type="hidden" />
									)}
						</FormItem>
					</Col>
				</Row>
				 <Row>
					<Col span={7} offset={1} style={{display:'none'}}>
						<FormItem {...formItemLayout} label='用于给后续节点变量赋值或判断流程走向:'>
								{getFieldDecorator('variables', {
								initialValue: {}})(
								<Input type="hidden"  />
								)}
						</FormItem>
					</Col>
				</Row>

			</Row>
		);
	}
}

const BusiManagerTodoDetail = Form.create()(InnerBusiManagerTodoDetail);

export { BusiManagerTodoDetail};

