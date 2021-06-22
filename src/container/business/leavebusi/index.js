import React, { Component } from 'react';
import moment from 'moment';
import { Icon, DatePicker, Button, Select, Upload, Tabs, Table } from 'antd';
import { Form, Row, Col, Input } from 'antd';

import { DATE_FORMAT_MOMENT, BACKSTAGE_PROJ_NAME } from './../../../constant/index';
import $fetch from '$fetch';
import { goTo } from './../../../util/tabRouter.js';
import './../../common/style/index.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class LeaveBusiIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			data: [],
			param: {},
			pagination: {
				pageSize: 10,
				pageSizeChanger: true,
				current: 1
			},
			columns: [
				{
					title: '编码',
					dataIndex: 'id',
					render: (text, record, index) => {
						return (
							<a href="javascript:;" onClick={this.toDetail(index)}>{text}</a>
						);
					}
				}
				,
				{
					title: '状态',
					dataIndex: 'status',
				}
				,
				{
					title: '创建时间',
					dataIndex: 'createTime',
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

			]
		};
	}

	componentDidMount() {
		let params = {
			pageNo: this.state.pagination.current,
			recordsPerPage: this.state.pagination.pageSize
		}
		this.fetchData(params);
	}

	fetchData = (params) => {
		this.setState({ loading: true });
		const { current, pageSize } = params;
		$fetch({
			url: '/' + BACKSTAGE_PROJ_NAME + '/gencode/queryLeaveBusiList',
			data: {
				...params
			}
		}).then((res) => {
			const _pagination = this.state.pagination;
			_pagination.total = res.reply.page.total;
			_pagination.current = res.reply.page.pageNo;;
			this.setState({
				pagination: _pagination,
				data: res.reply.leaveBusiList,
				loading: false
			})
		})
	};

	//模板生成的暂时只支持分页，不支持排序
	tableChangeHandle = (pagination, filters, sorter) => {
		this.setState({ pagination });

		const _params = {
			...this.state.param,
			pageNo: pagination.current,
			recordsPerPage: pagination.pageSize
		}
		this.fetchData(_params);
	}
	//列表页跳转至详情页，查询条件,pagination,sorter目前模板没有传递，如果需要，请参考作业平台单独集成
	toDetail = (index) => {
		return () => {
			const dataAll = this.state.data;
			const id = dataAll[index].id;
			let path = {
				pathname: '/leavebusi/detail',
				state: {
					id: id
				}
			};
			goTo(path, "请年假信息");
		}
	}

	toCreate = () => {
		let path = {
			pathname: '/leavebusi/create',
		};
		goTo(path, "创建请年假");
	}

	formatDate = (value) => {
		if (!!value) {
			let _date = moment(value).format('YYYY-MM-DD HH:MM:SS');
			return _date;
		}
		return '';
	}

	onChildQuery = (map) => {
		this.setState(
			map
		);
	}

	render() {
		return (
			<div>
				<div className="pandora-main-content">
					<div className="portlet-tab">
						<Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
							<TabPane tab="请年假查询" key="1">
								<div className="portlet-body">
									<div className="query-condition">
										<WrapperQueryForm callbackParent={this.onChildQuery}></WrapperQueryForm>
									</div>
									<div className="role-table">
										<div className="role-header">
											<div className="role-list">请年假列表</div>
											<div className="role-create1">
												<Icon className="role-icon" type="plus"></Icon>
												<span onClick={this.toCreate}>创建请年假</span>
											</div>
										</div>
									</div>
									<Table
										pagination={this.state.pagination}
										loading={this.state.loading}
										dataSource={this.state.data}
										columns={this.state.columns}
										onChange={this.tableChangeHandle}
										size="middle"
										rowKey="id"
										style={{ paddingLeft: 10, paddingRight: 10 }}>
									</Table>
								</div>
							</TabPane>
						</Tabs>
					</div>
				</div>
			</div>);
	}
}

class QueryForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			pagination: {
				current: 1,
				pageSize: 10,
			},
		}
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
							optionArr.map((item) => {
								return (
									<Select.Option key={localCounter++} value={item}>{item}</Select.Option>
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
			this.setState({
				param: values
			});

			this.setState({ loading: true });
			$fetch({
				url: '/' + BACKSTAGE_PROJ_NAME + '/gencode/queryLeaveBusiList',
				data: values
			}).then(res => {
				const _pagination = this.state.pagination;
				_pagination.total = res.reply.page.total;
				_pagination.current = res.reply.page.pageNo;
				this.setState({
					pagination: _pagination,
					data: res.reply.leaveBusiList,
					loading: false
				});
				this.props.callbackParent(this.state);
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
					<Col span={7} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} >
							<Button className="query-btn operatorBtn pandora-btn-fontsize" htmlType="submit" type="primary" >查询</Button>
							<Button className="query-btn pandora-btn-fontsize" onClick={this.handleReset} >清空</Button>
						</FormItem>
					</Col>
				</Row>
			</Form>
		);
	}
}
const WrapperQueryForm = Form.create()(QueryForm);
