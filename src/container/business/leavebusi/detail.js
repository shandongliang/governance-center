import React, { Component } from 'react';
import moment from '$moment';
import { Icon, DatePicker, Button, TimePicker, Select, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input } from 'antd';

import { DATE_FORMAT_MOMENT, BACKSTAGE_PROJ_NAME } from './../../../constant/index';
import $fetch from '$fetch';
import { goTo, goToAndClose } from './../../../util/tabRouter.js';
import './../../common/style/index.less';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class LeaveBusiDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			queryParams: this.props.location.state
		}
	}

	render() {
		return (
			<div>
				<div className="pandora-main-content">
					<div className="portlet-tab">
						<Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
							<TabPane tab="请年假信息" key="1">
								<div className="portlet-body">
									<WrapperFormDetail queryParams={this.state.queryParams}></WrapperFormDetail>
								</div>
							</TabPane>
						</Tabs>
					</div>
				</div>
			</div>
		);
	}
}

class FormDetail extends React.Component {

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
			}
		});
	}

	displayField = (displayType, name, valueRange) => {
		switch (displayType) {
			case 'TEXT': {
				return (
					<Input placeholder='' disabled={true} style={{ width: 210 }} />
				)
			}
			case 'NUMBER': {
				return (
					<Input type="number" style={{ width: 210 }} disabled={true} />
				);
			}
			case 'FLOAT': {
				return (
					<Input placeholder='' disabled={true} style={{ width: 210 }} />
				)
			}
			case 'SELECT': {
				_valueRange = valueRange ? valueRange : "";
				const optionArr = _valueRange.split("|");
				let localCounter = 1;
				return (
					<Select
						style={{ width: 210 }}
						disabled
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
						disabled={true}
					/>
				)
			}
			case 'TIME': {
				return (
					<TimePicker
						placeholder="请选择时间"
						format="HH:mm:ss"
						style={{ width: 210 }}
						disabled={true}
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
					<CheckboxGroup options={options} disabled={true} />
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

	toEdit = () => {
		let path = {
			pathname: '/leavebusi/edit',
			state: { id: this.props.queryParams.id }
		};
		goTo(path, "编辑请年假");
	}

	toIndex = () => {
		let path = {
			pathname: '/leavebusi/index',
		};
		goToAndClose(path);
	}

	toDelete = () => {
		let id = this.props.queryParams.id;
		let _this = this;
		Modal.confirm({
			title: "您确定删除请年假？",
			content: "删除后将无法返回...",
			onOk() {
				_this.setState({ loading: true });
				$fetch({
					url: '/' + BACKSTAGE_PROJ_NAME + '/gencode/deleteLeaveBusi',
					data: {
						id: id
					}
				}).then((res) => {
					if (res.reply.returnCode.type == "S") {
						let path = {
							pathname: '/leavebusi/index',
						};
						goToAndClose(path);
					} else {
						//失败
					}
				})
			},
			onCancel() {
				message.info('删除取消');
			},
		});
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
						<FormItem {...formItemLayout} label='请假备注'>
							{getFieldDecorator('leaveRemark', {
								initialValue: this.state.leaveRemark,
							})(
								this.displayField('TEXT', 'leaveRemark', '')
							)}
						</FormItem>
					</Col>
					<Col span={7} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假事由'>
							{getFieldDecorator('leaveReason', {
								initialValue: this.state.leaveReason,
							})(
								this.displayField('TEXT', 'leaveReason', '')
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={7} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假天数'>
							{getFieldDecorator('leaveDay', {
								initialValue: this.state.leaveDay,
							})(
								this.displayField('NUMBER', 'leaveDay', '')
							)}
						</FormItem>
					</Col>
					<Col span={7} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假人'>
							{getFieldDecorator('leaveName', {
								initialValue: this.state.leaveName,
							})(
								this.displayField('TEXT', 'leaveName', '')
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={7} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='创建时间'>
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
						<FormItem {...formItemLayout} label='状态'>
							{getFieldDecorator('status', {
								initialValue: this.state.status,
							})(
								this.displayField('TEXT', 'status', '')
							)}
						</FormItem>
					</Col>
				</Row>
				<Row type="flex">
					<Col span={9} offset={2} style={{ marginLeft: 110 }}>
						<Button className="query-btn operatorBtn pandora-btn-fontsize" onClick={this.toEdit} >编辑</Button>
						<Button className="query-btn delBtn pandora-btn-fontsize" onClick={this.toDelete} >删除</Button>
						<Button className="query-btn pandora-btn-fontsize" onClick={this.toIndex} >取消</Button>
					</Col>
				</Row>
			</Form>
		);
	}
}

const WrapperFormDetail = Form.create()(FormDetail);
