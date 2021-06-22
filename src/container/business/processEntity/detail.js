import React, { Component } from 'react';
import { Icon, DatePicker, Button, TimePicker, Select, Checkbox, Upload, Modal, Tabs } from 'antd';
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

class BusiManagerDetail extends Component {

	constructor(props) {
		super(props);
		this.state = {
			queryParams: this.props.location.state
		};
	}

	render() {
		return (
			<div>
				<div className="pandora-main-content">
					<div className="portlet-tab">
						<Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
							<TabPane tab="流程管理业务实体信息" key="1">
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
export default !!IS_OPEN_MULTI_TABNAV ? routerWrap(BusiManagerDetail) : BusiManagerDetail;
class FormDetail extends React.Component {

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
					<Input disabled={true} style={{ width: 210 }} />
				)
			}
			case 'NUMBER': {
				return (
					<Input type="number" style={{ width: 210 }} disabled={true} />
				);
			}
			case 'FLOAT': {
				return (
					<Input disabled={true} style={{ width: 210 }} />
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

	toHandleEdit = () => {
		let hash = /\/([^/]+)$/.exec(window.location.hash),
			menuId = hash && hash[1];
		let path = {
			pathname: !!IS_OPEN_MULTI_TABNAV ? ('/busimanager/edit/' + menuId) : '/busimanager/edit',
			state: {
				...this.props.queryParams,
			}
		}
		goTo(path, "编辑流程管理业务实体");
	}

	toHandleCancle = () => {
		let path = {
			pathname: '/busimanager/index',
			state: {
				...this.props.queryParams,
			}
		};
		goToAndClose(path);
	}

	toDelete = () => {
		let id = this.props.queryParams.id;
		let _this = this;
		Modal.confirm({
			title: "您确定删除流程管理业务实体？",
			content: "删除后将无法返回...",
			onOk() {
				_this.setState({ loading: true });
				$fetch({
					url: '/' + BACKSTAGE_PROJ_NAME + '/gencode/deleteBusiManager',
					data: {
						id: id
					}
				}).then((res) => {
					if (res.reply.returnCode.type == "S") {
						_this.toHandleCancle();
					} else {
						//失败
					}
				})
			},
			onCancel() {
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
			<Form onSubmit={this.handleSubmit} style={{ marginTop: 18 }}>
				<Row>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='操作'>
							{getFieldDecorator('operation', {
								initialValue: this.state.operation,
							})(
								this.displayField('TEXT', 'operation', '')
							)}
						</FormItem>
					</Col>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假状态'>
							{getFieldDecorator('status', {
								initialValue: this.state.status,
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
							})(
								this.displayField('TEXT', 'createTime', '')
							)}
						</FormItem>
					</Col>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假备注'>
							{getFieldDecorator('leaveRemark', {
								initialValue: this.state.leaveRemark,
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
							})(
								this.displayField('TEXT', 'leaveReason', '')
							)}
						</FormItem>
					</Col>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假天数'>
							{getFieldDecorator('leaveDay', {
								initialValue: this.state.leaveDay,
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
							})(
								this.displayField('TEXT', 'leaveName', '')
							)}
						</FormItem>
					</Col>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='ID'>
							{getFieldDecorator('busiId', {
								initialValue: this.state.busiId,
							})(
								this.displayField('TEXT', 'busiId', '')
							)}
						</FormItem>
					</Col>
				</Row>

				<FileUploadTable type={'readonly'} fileListData={this.state.fileListData['attachment']} deleteApi={'/' + BACKSTAGE_PROJ_NAME + '/gencode/deleteFile'} downLoadApi={'/' + BACKSTAGE_PROJ_NAME + '/gencode/downLoadFile.download'}></FileUploadTable>

				<Row type="flex">
					<Col span={9} offset={1} style={{ marginLeft: 142 }}>
						<Button className="query-btn operatorBtn pandora-btn-fontsize" onClick={this.toHandleEdit} >编辑</Button>
						<Button className="query-btn delBtn pandora-btn-fontsize" onClick={this.toDelete} >删除</Button>
						<Button className="query-btn pandora-btn-fontsize" onClick={this.toHandleCancle} >取消</Button>
					</Col>
				</Row>
			</Form>
		);
	}
}

const WrapperFormDetail = Form.create()(FormDetail);
