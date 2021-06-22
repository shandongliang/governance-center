import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import hashHistory from 'react-router';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';
import { randomNamber, deploy } from './../../../../util/publicFuc';
import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import './../../../common/style/index.less';
import './index.less'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class EdaMiddlewareIndex extends Component {
	static contextTypes = {
		router: PropTypes.any
	}

	constructor() {
		super();
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
					title: '中间件英文全称',
					dataIndex: 'middlewareEngName',
					key: 'middlewareEngName',
					width: 300,
					render: (text, record, index) => {
						return (
							<a href="javascript:;" onClick={this.toDetail(text)}>{text}</a>
						);
					}
				},
				{
					title: '逻辑集群状态',
					dataIndex: `status[${0}]`,
					//key: 'status',
					width: 100,
					render: (text, record, index) => {
						return (
							<span >{this.zhuangtai(text)}</span>
						);
					}
				}

				,
				{
					title: 'Cluster列表',
					dataIndex: 'list',
					key: 'list',
					width: 300,
					render: (text, record, index) => {
						return (
							// record.list.map()
							<div>
								{
									text.map((a) => {
										return (<div><a href="javascript:;" onClick={this.toClusterDetail(a.clusterName)} >{a.clusterName}</a></div>)
									})
								}
							</div>
							// <a href="javascript:;" onClick={this.clusterList(record,index)}>{text}</a>
						);
					}
				}
				,
				{
					title: '中间件部署',
					dataIndex: 'middlewareDeploymentUnit',
					key: 'middlewareDeploymentUnit',
					width: 100,
					render: (text, record, index) => {
						return (
							<div>
								{
									record.list.map((a) => {

										return (<div>{deploy(a.deployUnit)}</div>)
									})
								}
							</div>
						);
					}
				}
				,
				{
					title: '中间件类型',
					dataIndex: 'middlewareType',
					key: 'middlewareType',
					width: 100,
					render: (text, record, index) => {
						return (
							<div>
								{
									record.list.map((a) => {
										{/*return (<div>{this.leixing(a.middlewareType)}</div>)*/ }
										return (<div>{this.leixing(a.middlewareType)}</div>)
									})
								}
							</div>
						);
					}
				},
				{
					title: '物理集群状态',
					dataIndex: `status[${1}]`,
					//key: 'status',
					width: 100,
					render: (text, record, index) => {
						return (
							<div>
								{
									record.list.map((a) => {
										{/*return (<div>{this.leixing(a.middlewareType)}</div>)*/ }
										return (<div>{this.zhuangtai(a.status)}</div>)
									})
								}
							</div>
						);
					}
				}


			]
		};
	}

	test = (text, record, index) => {

		return 'aaa';
	}

	componentDidMount() {
		let reqSeqNo = randomNamber()
		let params = {
			paginator: {
				pageNo: this.state.pagination.current,
				recordsPerPage: this.state.pagination.pageSize,
			},

			reqSeqNo: reqSeqNo
		}
		this.fetchData(params);
	}

	zhuangtai = (a) => {
		switch (a) {
			case 'Y': {
				return '有效'
			}
			case 'N': {
				return '无效';
			}

		}
	}
	leixing = (a) => {
		switch (a) {
			case 'KF': {
				return 'Kafka'
			}
			case 'am': {
				return 'ActiveMQ';
			}
			case 'al': {
				return 'AliMQ'
			}
		}
	}
	fetchData = (params) => {
		this.setState({ loading: true });
		const { current, pageSize } = params;
		$fetch({
			url: '/tesla-gateway-console-app/eda/queryEdaMiddlewareList',
			data: {
				...params
			}
		}).then((res) => {

			const _pagination = this.state.pagination;
			_pagination.total = res.reply.queryMiddlewareList.page.total;
			_pagination.current = res.reply.queryMiddlewareList.page.pageNo;
			this.setState({
				pagination: _pagination,
				data: res.reply.queryMiddlewareList.edaMiddlewareList,
				loading: false
			}, () => {

			})
		})
	};

	//模板生成的暂时只支持分页，不支持排序
	tableChangeHandle = (pagination, filters, sorter) => {
		this.setState({ pagination });
		let reqSeqNo = randomNamber()
		const _params = {
			paginator: {
				...this.state.param,
				pageNo: pagination.current,
				recordsPerPage: pagination.pageSize,
			},
			reqSeqNo: reqSeqNo
		}


		this.fetchData(_params);
	}
	//列表页跳转至详情页，查询条件,pagination,sorter目前模板没有传递，如果需要，请参考作业平台单独集成
	toDetail = middlewareEngName => {
		return () => {
			// const dataAll = this.state.data;
			// const id = dataAll[index].middlewareEngName;
			let path = {
        pathname: '/eventDriven/edamiddleware/detail/' + middlewareEngName
      };
      goTo(path, "事件中间件详情");
		}
	}
	//列表页跳转至详情页，查询条件,pagination,sorter目前模板没有传递，如果需要，请参考作业平台单独集成
	clusterList = (record, index) => {
		return () => {
			//console.log(record)
			const dataAll = record.list;

			//const id = dataAll[index].middlewareEngName;
			let path = {
				pathname: '/eventDriven/edamiddleware/clusterList/' + index,
				state: dataAll
			}

			goTo(path,"Cluster列表");
			// hashHistory.push({
			// 	pathname:'/edamiddleware/clusterList',
			// 	query:{
			// 		dataAll
			// 	}
			// })
		}
	}


	toClusterDetail = (text) => {


		let id = text;

		return () => {
			let path = {
        pathname: '/eventDriven/edamiddleware/detail/' + id
      };
      goTo(path, "事件中间件详情");
		}

	}







	toCreate = () => {
		let path = {
      pathname: '/eventDriven/edamiddleware/create'
    };
    goTo(path, "事件中间件创建");
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

	render() {
		return (
			<div>
				<div className="EdaMiddlewareIndex">
					<div className="portlet-tab">
						<Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
							<TabPane tab="事件中间件列表" key="1">
								<div className="portlet-body">
									{/* <div className="query-condition">
										<WrapperQueryForm callbackParent={this.onChildQuery}></WrapperQueryForm>
									</div> */}
									<div className="role-table">

									</div>
									<Table pagination={this.state.pagination} loading={this.state.loading}
										dataSource={this.state.data} columns={this.state.columns} onChange={this.tableChangeHandle} size="middle" rowKey="id"
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
						style={{ width: 210 }}>
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

	// handleSearch = (e) => {
	// 	e.preventDefault();
	// 	this.props.form.validateFields((err,values) => {
	// 		this.setState({
	// 			param: values
	// 		});

	// 		this.setState({loading: true});
	// 		$fetch({
	// 			url: '/pandora-app/gencode/queryEdaMiddlewareList',
	// 			data: values
	// 		}).then(res => {
	// 			const _pagination = this.state.pagination;
	// 			_pagination.total = res.reply.page.total;   
	// 			_pagination.current = res.reply.page.pageNo;
	// 			this.setState({
	// 				pagination: _pagination,
	// 				data: res.reply.edaMiddlewareList,
	// 				loading: false
	// 			});
	// 			this.props.callbackParent(this.state);
	// 		});
	// 	});
	// }

	render() {
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 }
		}
		const { getFieldDecorator } = this.props.form;

		return (
			<Form onSubmit={this.handleSearch}>
				<Row>
					<Col span={7} style={{ display: 'block' }}>
						<FormItem {...formItemLayout} >
							<Button htmlType="submit" type="primary" className="operatorBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>查询</Button>
							<Button onClick={this.handleReset} style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>清空</Button>
						</FormItem>
					</Col>
				</Row>
			</Form>
		);
	}
}
const WrapperQueryForm = Form.create()(QueryForm);