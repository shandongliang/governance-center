import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';

import { DATE_FORMAT_MOMENT, DATE_REQUEST_FORMAT, MESSAGE_SEND } from './../../../../constant/index';
import $fetch from '$fetch';
import { randomNamber } from './../../../../util/publicFuc';
import './send.less';
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class Send extends Component {
	static contextTypes = {
		router: PropTypes.any
	}

	constructor() {
		super();
		this.state = {
			loading: false,
			selectedRowKeys: [],
			selectedRows: [],
			par: {},
			data: [

			],
			param: {},
			pagination: {
				size: 10,
				pageSizeChanger: true,
				current: 1,

				total: 0,
			},
			columns: [

				{
					title: '事件编号',
					dataIndex: 'eventId',

					key: 'eventId'
				},
				{
					title: 'datasource',
					dataIndex: 'datasource',

					key: 'datasource'
				},
				{
					title: '主题名称',
					dataIndex: 'topicName',
					key: 'topicName'
				},
				{
					title: '业务唯一标识',
					dataIndex: 'businessKey',
					key: 'businessKey'
				},

				{
					title: '分库分表描述',
					dataIndex: 'routeBoid',
					key: 'routeBoid'
				},
				{
					title: '逻辑单元',
					dataIndex: 'logicUnit',
					key: 'logicUnit'

				},

				{
					title: '创建时间',
					dataIndex: 'createTime',
					key: 'createTime',
					render: (text, record, index) => {
						return (
							<span>{this.timer(text)}</span>
						);
					}

				},
				{
					title: '状态',
					dataIndex: 'status',
					key: 'status',
					render: (text, record, index) => {
						return (
							<span>{this.status(text)}</span>
						);
					}

				},
				{
					title: '操作',
					dataIndex: 'messageBody',
					key: 'messageBody',
					render: (text, record, index) => {
						return (
							<a href="javascript:;" onClick={this.toDetail(record)}>查看消息体</a>
						);
					}
				},

			]
		};
	}
	onSelectChange = (selectedRowKeys, selectedRows) => {
		this.setState({
			selectedRowKeys,
			selectedRows
		})
	}
	timer = (t) => {

		return moment(t).format('YYYY-MM-DD')
	}
	status = (t) => {


		if (t == 'Y') {
			return '有效'
		}
		if (t == 'N') {
			return '无效'
		}
		if (t == 'S') {
			return '成功'
		}
		if (t == 'F') {
			return '失败'
		}
	}

	componentDidMount() {
		let reqSeqNo = randomNamber()

		let url = this.props.location.state.par.url
		let param = this.props.location.state.par
		let pagination = this.props.location.state.pagination
		delete param.url
		console.log('126', this.props.location);
		this.setState({
			data: this.props.location.state.state,
			param: param,
			url: url,
			pagination: pagination
		}, () => {
			console.log('118', this.state.pagination, this.state.param, this.state.url, );
		})

	}

	fetchData = (params) => {
		let reqSeqNo = randomNamber()
		let _this = this;

		//const {current, pageSize} = param;
		let param = this.state.param

		console.log('140', param)
		param.page = params.page
		param.size = params.size
		if (this.state.param.businessKey != '') {

			let url1 = this.state.url + '/eda/query/byBusinessKey'
			$.get(url1, param, function (res, status) {
				console.log('270', res, status);
				if (status == "success") {

					let arr = []
					for (var key in res) {
						for (var i = 0; i < res[key].length; i++) {
							res[key][i].datasource = key
							arr.push(res[key][i])
						}

					}
					_this.setState({ data: arr });
				}
			})
		} else {
			if (param.topicName == '') {
				delete param.topicName
			}
			if (param.start == '') {
				delete param.start
			}
			if (param.end == '') {
				delete param.end
			}
			if (param.status == '') {
				delete param.status
			}
			let url2 = this.state.url + '/eda/query/byTimeAndTopicName'
			$.get(url2, param, function (res, status) {
				console.log('270', res, status);
				if (status == "success") {
					for (var i = 0; i < res.list.length; i++) {
						res.list[i].datasource = param.datasourceId
					}
					_this.setState({ data: res.list });
				}
			})
		}





	};

	//模板生成的暂时只支持分页，不支持排序
	tableChangeHandle = (pagination, filters, sorter) => {
		this.setState({
			pagination,

		});

		const _params = {
			page: pagination.current,
			size: pagination.size,
		}
		this.fetchData(_params);
	}
	//列表页跳转至详情页，查询条件,pagination,sorter目前模板没有传递，如果需要，请参考作业平台单独集成
	toDetail = (record) => {
		return () => {
			const id = record.eventId;
			let path = {
				pathname: '/eventDriven/messageSend/edit/' + id,
				state: { par: this.props.location.state, record }

			}
			goTo(path,"编辑消息");
		}
	}

	toCreate = () => {
    let path = {
			pathname: '/eventDriven/consumer/create'
		};
		goToAndClose(path, "消费者创建");
	}

	getDate = (value) => {
		if (!!value) {
			const dateStr = new Date(parseInt(value)).toLocaleString().replace(/\//g, '-');
			let _date = dateStr.substring(0, dateStr.indexOf(" "));
			return _date;
		}
		return '';
	}

	onChildQuery = (map) => {
		this.setState(
			map
		);
	}
	handleTouzhi = () => {
		let _this = this;
		console.log('194', this.state.selectedRows)
		// let date='20180910'
		// let businessKeys = ''
		// for (let i = 0; i < this.state.selectedRows.length; i++) {
		// 	if (i == this.state.selectedRows.length - 1) {
		// 		businessKeys += this.state.selectedRows[i].businessKey
		// 	} else {
		// 		businessKeys += this.state.selectedRows[i].businessKey + ","
		// 	}

		// }
		let param = {
			msgs: JSON.stringify(this.state.selectedRows),
			dataSourceId: ''
		}
		if (this.state.param.businessKey != '') {
			if (this.state.selectedRows.length > 1) {
				alert('当前数据存在脏数据，每次只能发送一条数据，请重新勾选')
				this.handleChongzhi()
				return false
			}
			param.dataSourceId = this.state.selectedRows[0].datasource
			delete this.state.selectedRows[0].datasource
		} else {
			param.dataSourceId = this.state.param.datasourceId
		}
		console.log('241', param);
		let url = this.state.url + '/eda/resendMessage/bydsMsgs'
		$.post(url, param, function (res, status) {
			console.log('270', res, status);
			if (status == "success") {

				_this.messages(res);

			}
		})

	}
	messages = (res) => {

		let _this = this;
		// const  obj = res;
		Modal.confirm({
			title: "状态",
			content: <div>

				投递完成!
			</div>,
			onOk() {
				_this.handleChongzhi()
				console.log('339', _this.state.pagination);
				const _params = {
					page: _this.state.pagination.current,
					size: _this.state.pagination.size,
				}
				_this.fetchData(_params);
			},
			onCancel() {
				message.info('取消');


			},
		});
	}
	handleChongzhi = () => {
		this.setState({
			selectedRows: [],
			selectedRowKeys: []
		}, () => {
		})
	}
	goBack = () => {
    let path = {
      pathname: '/eventDriven/messageSend/index'
    };
    goToAndClose(path, "消息重投递登录页");
	}
	aaa = () => {

	}
	render() {
		const { loading, selectedRowKeys } = this.state
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
			//getCheckboxProps:this.aaa,
		}
		//const hasSelected=selectedRowKeys.length>0

		return (
			<div >
				<div className="messSend">
					<div className="portlet-tab">
						<Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
							<TabPane tab="消息重投递" key="1">
								<div className="portlet-body">

									{/* <div className="role-table">
										<div className="role-header">
											<div className="role-list">消息列表</div>
										</div>
									</div> */}
									<Table rowSelection={rowSelection} pagination={this.state.pagination} loading={this.state.loading}
										dataSource={this.state.data} columns={this.state.columns} onChange={this.tableChangeHandle} size="middle" rowKey="id"
										style={{ paddingLeft: 10, paddingRight: 10 }}>
									</Table>
								</div>
							</TabPane>

						</Tabs>
						<Button onClick={this.handleTouzhi} type="primary" className="operatorBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>重新发送</Button>

						<Button onClick={this.handleChongzhi} type="primary" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>重置</Button>
						<Button onClick={this.goBack} className="operatorBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>返回</Button>
					</div>
				</div>
			</div>);
	}
}

