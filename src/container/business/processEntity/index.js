import React, { Component } from 'react';
import { Icon, DatePicker, Button, Select, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';

import { DATE_FORMAT_MOMENT, BACKSTAGE_PROJ_NAME, IS_OPEN_MULTI_TABNAV } from './../../../constant/index';
import $fetch from '$fetch';
import { goTo, goToAndClose } from './../../../util/tabRouter.js';
import './../../common/style/index.less';
import commonUtil from '../../../util/commonUtil';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class BusiManagerIndex extends Component {

	constructor() {
		super();
		this.state = {
			loading: false,
			data: [],
			pagination: {
				pageSize: 10,
				pageSizeChanger: true,
				current: 1
			},
			sorter: {
				orderBy: '',
				orderWay: ''
			},
			columns: [
				{
					title: '编码',
					dataIndex: 'id',
					render: (text, record, index) => {
						return (
							<a href="javascript:;" onClick={this.goToDetail(index)}>{text}</a>
						);
					}
				}
				,

				{
					title: '请假人',
					dataIndex: 'leaveName',
				}
				,
				{
					title: '请假天数',
					dataIndex: 'leaveDay',
				}
				,
				{
					title: '请假事由',
					dataIndex: 'leaveReason',
				}
				,
				{
					title: '请假备注',
					dataIndex: 'leaveRemark',
				}
				,
				{
					title: '创建时间',
					dataIndex: 'createTime',
					render: (text) => {
						if (!!text) {
							return (
								<p>{commonUtil.formatDateHour(text)}</p>
							)
						}
					}
				}
				,
				{
					title: '请假状态',
					dataIndex: 'status',
				}
				,
			],
			visible: false,
			tableData: [],
			userIdGroup: [],
			checkColumns: [
				{
					title: '操作人员',
					dataIndex: 'userName',
				}
			]
		};
	}

	componentDidMount() {
		let params = {};
		if (!!this.props.location.state) {
			let queryParams = this.props.location.state;
			this.setState({
				queryCondition: queryParams,
				param: queryParams,
				pagination: queryParams.pagination
			}, () => {
				this.reSetQuery();
			});
			params = {
				orderWay: this.state.sorter.orderWay,
				orderBy: this.state.sorter.orderBy,
				pageNo: queryParams.pagination.current,
				recordsPerPage: queryParams.pagination.pageSize,
				leaveName: queryParams.leaveName,
				status: queryParams.status,
			}
		} else {
			params = {
				orderWay: this.state.sorter.orderWay,
				orderBy: this.state.sorter.orderBy,
				pageNo: this.state.pagination.current,
				recordsPerPage: this.state.pagination.pageSize,
				...this.state.param
			}
		}
		this.fetchSortData(params);

	}

	fetchSortData = (params = {}) => {
		this.setState({ loading: true });
		$fetch({
			url: '/' + BACKSTAGE_PROJ_NAME + '/gencode/queryBusiManagerList',
			data: params
		}).then(res => {
			let totalPageSize = res.reply.page.total;
			const pagination = { ...this.state.pagination };
			pagination.total = parseInt(totalPageSize);
			this.setState({
				data: res.reply.busiManagerList,
				loading: false,
				pagination
			});
		});
	}

	tableChangeHandle = (pagination, filters, sorter) => {
		let sorterOrderStr = sorter.order ? sorter.order.substring(0, sorter.order.lastIndexOf("e")).toUpperCase() : '';
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		this.setState({ pagination: pager });
		if (sorterOrderStr != '') {
			this.setState({
				sorter: {
					orderBy: sorter.field,
					orderWay: sorterOrderStr
				}
			})
			let params = {
				orderBy: sorter.field,
				orderWay: sorterOrderStr,
				pageNo: pagination.current,
				recordsPerPage: pagination.pageSize,
				...this.state.param
			}
			this.fetchSortData(params);
		} else {
			let params = {
				orderBy: this.state.sorter.orderBy,
				orderWay: this.state.sorter.orderWay,
				pageNo: pagination.current,
				recordsPerPage: pagination.pageSize,
				...this.state.param
			}
			this.fetchSortData(params);
		}
	}

	goToDetail = (index) => {
		return () => {
			const dataAll = this.state.data;
			let path = {
				pathname: !!IS_OPEN_MULTI_TABNAV ? ('/busimanager/detail/' + dataAll[index].id) : '/busimanager/detail',
				state: {
					...this.state.param,
					pagination: this.state.pagination,
					id: dataAll[index].id,
				}
			};
			goTo(path, "流程管理业务实体信息");
		}
	}

	goToCreate = () => {
		let path = {
			pathname: '/busimanager/create',
		};
		goTo(path, "请假申请");
	}

	selectConfirm = () => {
		if (!!this.state.selectedRowKeys) {
			this.setState({
				visible: false
			});
			$fetch({
				url: '/' + BACKSTAGE_PROJ_NAME + '/workflow/claimTask',
				data: {
					userId: this.state.selectedRowKeys[0],
					taskId: this.state.taskId
				}
			}).then(res => {
				let path = {
					pathname: '/busimanager/index',
				};
				goTo(path);
			})
		}
	}
	hide = () => {
		this.setState({
			visible: false
		})
	}
	rowSelectHandle = (selectedRowKeys, selectRows) => {
		this.setState({
			selectedRowKeys: selectedRowKeys,
			selectedRows: selectRows
		})
	}

	onChildQuery = (map) => {
		this.setState({
			data: map.tableData.data,
			pagination: map.tableData.pagination,
			loading: map.tableData.loading,
			param: map.param
		});
	}

	onRef = (ref) => {
		this.child = ref
	}

	// 重置子组件查询条件的值
	reSetQuery = () => {
		if (this.state.queryCondition) {
			let resetValue = {
				leaveName: this.state.queryCondition.leaveName,
				status: this.state.queryCondition.status,
			}
			this.child.props.form.setFieldsValue({ ...resetValue });
		}
	}

	render() {
		const rowSelection = {
			type: 'radio',
			onChange: this.rowSelectHandle,
		};
		return (
			<div>
				<div className="pandora-main-content">
					<div className="portlet-tab">
						<Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
							<TabPane tab="流程管理业务实体查询" key="1">
								<div className="portlet-body">
									<div className="query-condition">
										<WrapperQueryForm reSetQuery={this.onRef} callbackParent={this.onChildQuery}></WrapperQueryForm>
									</div>
									<div className="role-table">
										<div className="role-header">
											<div className="role-list">流程管理业务实体列表</div>
											<div className="role-create1" onClick={this.goToCreate}>
												<Icon className="role-icon" type="plus"></Icon>
												<span>请假申请</span>
											</div>
										</div>
									</div>
									<Table pagination={this.state.pagination} loading={this.state.loading}
										dataSource={this.state.data} columns={this.state.columns} onChange={this.tableChangeHandle} size="middle" rowKey="id"
										style={{ paddingLeft: 10, paddingRight: 10 }}>
									</Table>
									<Modal
										title="请选择下一步审批人"
										visible={this.state.visible}
										onOk={this.selectConfirm}
										onCancel={this.hide}
										okText="确认"
										cancelText="取消"
									>
										<Table
											pagination={true}
											dataSource={this.state.tableData}
											columns={this.state.checkColumns}
											rowSelection={rowSelection}
											size="small"
											rowKey="userId"
											style={{ paddingLeft: 10, paddingRight: 10, marginTop: 10, marginBottom: 10 }}
										>
										</Table>
									</Modal>
								</div>
							</TabPane>
						</Tabs>
					</div>
				</div>
			</div>
		);
	}
}

class QueryForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
		this.props.reSetQuery(this);
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
					<Input placeholder='' style={{ width: 210 }} />
				);
			}
			case 'MULTISELECT': {
				return (
					<Input placeholder='' style={{ width: 210 }} />
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

	handleReset = () => {
		this.props.form.resetFields();
	}

	handleSearch = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {

			let tableData = {},
				commonParams = {
					pageNo: '1',
					recordsPerPage: '10'
				};
			let param = values;
			this.setState({ loading: true });
			$fetch({
				url: '/' + BACKSTAGE_PROJ_NAME + '/gencode/queryBusiManagerList',
				data: {
					...param,
					...commonParams
				}
			}).then(res => {
				let totalPageSize = res.reply.page.total;
				let pagination = {};
				pagination.total = parseInt(totalPageSize);
				pagination.pageSize = 10;
				pagination.current = 1;
				tableData.pagination = pagination;
				tableData.data = res.reply.busiManagerList,
					tableData.loading = false;
				let passVal = {
					tableData,
					param
				}
				this.props.callbackParent(passVal);
			});
		});
	}

	render() {
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 }
		}
		const { getFieldDecorator } = this.props.form;

		return (
			<Form onSubmit={this.handleSearch}>
				<Row style={{ marginTop: 18 }}>
					<Col span={7} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假人'>
							{getFieldDecorator('leaveName')(
								this.displayField('TEXT', 'leaveName', '')
							)}
						</FormItem>
					</Col>
					<Col span={7} offset={1} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} label='请假状态'>
							{getFieldDecorator('status')(
								this.displayField('TEXT', 'status', '')
							)}
						</FormItem>
					</Col>
					<Col span={7} style={{ display: 'block' }}>
						<Button className="query-btn operatorBtn pandora-btn-fontsize" htmlType="submit" type="primary" >查询</Button>
						<Button className="query-btn pandora-btn-fontsize" onClick={this.handleReset} >清空</Button>
					</Col>
				</Row>
			</Form>
		);
	}
}
const WrapperQueryForm = Form.create()(QueryForm);
