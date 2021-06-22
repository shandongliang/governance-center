import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Table, Select, Checkbox, Upload, Modal, Tabs ,version} from 'antd';
import { Form, Row, Col, Input } from 'antd';

import Constant, { DATE_FORMAT_MOMENT, BACKSTAGE_PROJ_NAME } from './../../../constant/index';
import $fetch from '$fetch';
import { goTo, goToAndClose } from './../../../util/tabRouter.js';
import { authStore } from '../../../util/store';

import './../../common/style/index.less';
import FileUploadTable from '../../../component/FileUploadTable/FileUploadTable'

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const {TextArea}=Input;

export default class BusiManagerCreate extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	render() {
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 8 }
		}
		return (
			<div>
				<div className="pandora-main-content">
					<div className="portlet-tab">
						<Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
							<TabPane tab="创建流程管理业务实体" key="1">
								<div className="portlet-body">
									<WrapperCreateForm></WrapperCreateForm>
								</div>
							</TabPane>
						</Tabs>
					</div>
				</div>
			</div>
		);
	}
}

class CreateForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectNextApprover: false,
			processIdStarted: false,//流程是否已启动
			disable: true,
			modalTableData: [],
			columns: [
				{
					title: '操作人员',
					dataIndex: 'userName',
				}
			]
		}
	}

	displayField = (displayType, name, valueRange) => {
		let antdVersion = version.split('.')[0];
		let $TextArea;
		if (antdVersion == "2") {
			$TextArea = <Input type="textarea" autosize={{ minRows: 1 }} style={{ width: 210 }} />;
		} else if (antdVersion == "3") {
			$TextArea = <TextArea autoSize={{ minRows: 1 }} style={{ width: 210 }} />;
		}
		switch (displayType) {
			case 'TEXT': {
				return (
					<Input style={{ width: 210 }} />
				)
			}
			case 'TEXTAREA': {
				return $TextArea;
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
						style={{ width: 210 }}
						placeholder="请选择时间"
						format="HH:mm:ss"

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

	toHandleSubmit = () => {
		let path = {
			pathname: '/busimanager/index',
		};
		goToAndClose(path);
	}

	toHandleCancle = () => {
		let path = {
			pathname: '/busimanager/index',
		};
		goToAndClose(path, null, false);
	}


	// }
	handleSubmit = (e) => {
		e.preventDefault();
		let _this = this;
		let isHaveAttachment;
		for (let k in this.fileListObj) {
			if (this.fileListObj[k].length > 0) {
				isHaveAttachment = true
				break
			}
			isHaveAttachment = false
		}
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let param = {
					...values
				};
				let busiManager = {
					...values,
					status: "初始录入",
				}
				this.setState({ loading: true });
				let uploadRequest
				if (this.state.processIdStarted == false) {
					//第一次提交
					if (isHaveAttachment) {
						uploadRequest = this.uploadInfoAndFile(busiManager, '/' + BACKSTAGE_PROJ_NAME + '/gencode/createBusiManagerWithAttachment')
					} else {
						uploadRequest = $fetch({
							url: '/' + BACKSTAGE_PROJ_NAME + '/gencode/createBusiManager',
							data: { busiManager }
						})
					}
				} else {
					//第二次提交，调编辑方法
					let busiManager = {
						...values,
						id: this.state.id
					}
					if (isHaveAttachment) {
						uploadRequest = this.uploadInfoAndFile(busiManager, '/' + BACKSTAGE_PROJ_NAME + '/gencode/editBusiManagerWithAttachment')
					} else {
						uploadRequest = $fetch({
							url: '/' + BACKSTAGE_PROJ_NAME + '/gencode/editBusiManager',
							data: { busiManager }
						})
					}
				}
				uploadRequest.then(res => {
					let id
					if (this.state.processIdStarted == false) {
						id = res.reply.busiManagerId
					} else {
						id = this.state.id
					}
					this.setState({
						loading: false,
						id
					});
					const user = authStore.get(Constant.AUTH_USER_INFO);
					orgId = user['orgId'];
					let paramAgain = {
						id,
						key: 'BusiManager',
						busiName: 'BusiManager',
						userId: user['userId'],
						triggerPoint: 'add',
						comment: "提交审核",
						customMap: {
							startUserId: user['userId'],
							startUserName: user['userName']
						}
					};
					if (this.state.processIdStarted == false) {
						//第一次提交，启动流程
						Modal.confirm({
							title: '是否同时启动流程？',
							content: '点击按钮“是”，将同时启动此流程；点击按钮“否”，仅仅提交',
							okText: '是',
							cancelText: '否',
							width: 560,
							maskClosable: false,
							onOk() {
								$fetch({
									url: '/' + BACKSTAGE_PROJ_NAME + '/workflow/startProcessAndQueryNextUserTask',
									data: { ...paramAgain }
								}).then(res => {
									let candiUsers = res.reply.result.candidateUsers;
									if (!!candiUsers) {
										let modalTableData = res.reply.result.candidateUsers,
											taskId = res.reply.result.taskId,
											isTaskIdPrev = res.reply.result.isTaskIdPrev,
											chooseAssigneeFlag = res.reply.result.chooseAssigneeFlag;
										_this.setState({
											modalTableData,
											taskId,
											isTaskIdPrev,
											chooseAssigneeFlag,
											processIdStarted: true
										});
										if (0 < modalTableData.length) {
											_this.setState({
												selectNextApprover: true,
											});
										} else {
											//根据选人类型 弹出不同的提示
											if (chooseAssigneeFlag == 'last') {
												Modal.confirm({
													title: '请为下一岗位配置办理人',
													content: '下一岗位未配置审批人，请配置后到【我的已办】页面为下一任务指定办理人',
													okText: '是',
													cancelText: '否',
													width: 560,
													maskClosable: false,
													onOk() {
														_this.toMyResults();
													},
													onCancel() {
														_this.toHandleSubmit();
													},
												})
											} else {
												Modal.confirm({
													title: '请为下一岗位配置办理人',
													content: '下一岗位未配置审批人，请配置后到【我的待办】页面为下一任务指定办理人',
													okText: '是',
													cancelText: '否',
													width: 560,
													maskClosable: false,
													onOk() {
														_this.toMytodoTask();
													},
													onCancel() {
														_this.toHandleSubmit();
													},
												})
											}
											_this.setState({
												processIdStarted: false,
											});
										};
									} else {
										_this.setState({
											selectNextApprover: false,
										});
										_this.toHandleSubmit();
									}
								});
							},
							onCancel() {
								_this.toHandleSubmit();
							},
						})
					} else {
						//第二次提交，为下个节点选择办理人
						let param = {
							taskId: this.state.taskId,
							lineData: {
								name: "通过"
							},
							id,
							userId: user['userId'],
						};
						$fetch({
							url: '/' + BACKSTAGE_PROJ_NAME + '/workflow/queryUserForNextTask',
							data: param
						}).then(res => {
							if (!!res.reply.result.candidateUsers) {
								this.setState({
									selectNextApprover: true,
									modalTableData: res.reply.result.candidateUsers,
									isTaskIdPrev: res.reply.result.isTaskIdPrev,
									chooseAssigneeFlag: res.reply.result.chooseAssigneeFlag,
									taskId: res.reply.result.taskId,
								})
							} else if (!res.reply.result.candidateUsers) {
								this.toHandleSubmit();
							}
						});
					}

				});
			}
		})
	}

	toMyResults = () => {
		let path = {
			pathname: '/processManager/myResults/index',
		};
		goToAndClose(path);
	}
	toMytodoTask = () => {
		let path = {
			pathname: '/processManager/mytodotask/index',
		};
		goToAndClose(path);
	}

	selectConfirm = () => {
		if (!!this.state.selectedRowKeys) {
			this.setState({
				selectNextApprover: false
			});
			let user = authStore.get(Constant.AUTH_USER_INFO);
			let userIds = this.state.selectedRowKeys;
			let taskId = this.state.taskId;
			let isTaskIdPrev = this.state.isTaskIdPrev;
			let chooseAssigneeFlag = this.state.chooseAssigneeFlag;
			$fetch({
				url: '/' + BACKSTAGE_PROJ_NAME + '/workflow/completeCurrentTaskAndClaimNextTask',
				data: {
					id: this.state.id,
					userIds,
					taskId,
					lineData: { name: '通过' },
					comment: "提交审核",
					isTaskIdPrev,
					chooseAssigneeFlag,
					userId: user['userId']
				}
			}).then(res => {
				this.toHandleSubmit();
			})
		} else {
			this.selectTip();
		}
	}
	selectTip = () => {
		let isTaskIdPrev = this.state.isTaskIdPrev;
		let chooseAssigneeFlag = this.state.chooseAssigneeFlag;
		if (isTaskIdPrev == "true" || chooseAssigneeFlag == "first") {
			this.setState({
				selectNextApprover: false
			})
		} else {
			Modal.confirm({
				title: '',
				content: '如果取消，下一节点将无人办理，需要从 我的已办 中为下一节点指定办理人，是否确认取消？',
				visible: this.state.closeVisible,
				onOk: () => {
					this.setState({
						selectNextApprover: false
					})
					this.toHandleSubmit();
				}
			});
		}
	}

	rowSelectHandle = (selectedRowKeys, selectRows) => {
		this.setState({
			selectedRowKeys: selectedRowKeys,
			selectedRows: selectRows
		})
	}

	render() {
		const rowSelection = !!this.state.isTaskIdPrev && this.state.isTaskIdPrev == 'true'
			? { type: 'checkbox', onChange: this.rowSelectHandle }
			: { type: 'radio', onChange: this.rowSelectHandle };
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 }
		}
		const { getFieldDecorator } = this.props.form;

		return (
			<Form onSubmit={this.handleSubmit} style={{ marginTop: 18 }}>
				<Row>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假人'>
							{getFieldDecorator('leaveName', {
								initialValue: "",
								rules: [
									{ required: true, message: '请输入请假人名字' }
								]
							})(
								this.displayField('TEXT', 'leaveName', '')
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假天数'>
							{getFieldDecorator('leaveDay', {
								initialValue: "",

							})(
								this.displayField('TEXT', 'leaveDay', '')
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假事由'>
							{getFieldDecorator('leaveReason', {
								initialValue: "",

							})(
								this.displayField('TEXTAREA', 'leaveReason', '')
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={10} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假备注'>
							{getFieldDecorator('leaveRemark', {
								initialValue: "",

							})(
								this.displayField('TEXTAREA', 'leaveRemark', '')
							)}
						</FormItem>
					</Col>
				</Row>

				<FileUploadTable type={'show'} parentRef={this} attachmentName='attachment'></FileUploadTable>

				<Row type="flex">
					<Col span={7} offset={1} style={{ marginLeft: 142 }}>
						<Button className="query-btn operatorBtn pandora-btn-fontsize" htmlType="submit"  >提交</Button>
						<Button className="query-btn pandora-btn-fontsize" onClick={this.toHandleCancle}  >取消</Button>
						<Modal
							title="请选择下一步审批人"
							closable={false}
							visible={this.state.selectNextApprover}
							onOk={this.selectConfirm}
							onCancel={this.selectTip}
							maskClosable={false}
							okText="确认"
							cancelText="取消"
						>
							<Table
								pagination={true}
								dataSource={this.state.modalTableData}
								columns={this.state.columns}
								rowSelection={rowSelection}
								size="small"
								rowKey="userId"
								style={{ paddingLeft: 10, paddingRight: 10, marginTop: 10, marginBottom: 10 }}
							>
							</Table>
						</Modal>
					</Col>
				</Row>
			</Form >
		);
	}
}

const WrapperCreateForm = Form.create()(CreateForm);
