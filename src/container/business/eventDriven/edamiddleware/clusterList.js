import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import hashHistory from 'react-router';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';
import { randomNamber, deploy } from './../../../../util/publicFuc';
import './../../../common/style/index.less';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class ClusterList extends Component {
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
					title: '集群名称',
					dataIndex: 'clusterName',
					render: (text, record, index) => {
						return (
							<a href="javascript:;" onClick={this.toDetails(index)}>{text}</a>
						);
					}
				}
				,
				{
					title: '集群接入',
					dataIndex: 'clusterAddress',

				}
				,
				{
					title: '中间件部署',
					dataIndex: 'middlewareDeploymentUnit',
					render: (text, record, index) => {
						return (
							<div  >{deploy(text)}</div>
						);
					}
				}
				,
				{
					title: '中间件类型',
					dataIndex: 'middlewareType',
					render: (text, record, index) => {
						return (
							<div  >{this.leixing(text)}</div>
						);
					}
				}


			]
		};
	}

	componentDidMount() {
		let reqSeqNo = randomNamber()
		let params = {
			pageNo: this.state.pagination.current,
			recordsPerPage: this.state.pagination.pageSize,
			reqSeqNo: reqSeqNo
		}

		this.setState({
			data: this.props.location.state
		})
	}

	leixing = (a) => {
		switch (a) {
			case 'KF': {
				return 'kafka'
			}
			case 'AM': {
				return 'activeMQ';
			}
			case 'AL': {
				return 'alimq'
			}
		}
	}


	//模板生成的暂时只支持分页，不支持排序
	tableChangeHandle = (pagination, filters, sorter) => {
		this.setState({ pagination });

		const _params = {
			...this.state.param,
			pageNo: pagination.current,
			recordsPerPage: pagination.pageSize
		}
		//this.fetchData(_params);
	}
	//列表页跳转至详情页，查询条件,pagination,sorter目前模板没有传递，如果需要，请参考作业平台单独集成
	toDetails = (index) => {
		return () => {
			const dataAll = this.state.data;
			const id = dataAll[index].clusterName;
      let path = {
        pathname: '/eventDriven/edamiddleware/details/' + id
      };
      goTo(path, "事件中间件详情");
		}
	}

	goBack = () => {

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

	onChildQuery = () => {
		let path = {
      pathname: '/eventDriven/edamiddleware/index'
    };
    goTo(path, "事件中间件查询");
	}

	render() {
		return (
			<div>
				<div className="pandora-main-content">
					<div className="portlet-tab">


						<div className="portlet-body">

							<div className="role-table">
								<div className="role-header">
									<div className="role-list">CLUSTER列表</div>
									<div className="role-create1">
										<Icon className="role-icon" type="plus"></Icon>
										<span onClick={this.toCreate}>创建CLUSTER</span>
									</div>
								</div>
							</div>
							<Table pagination={this.state.pagination} loading={this.state.loading}
								dataSource={this.state.data} columns={this.state.columns} onChange={this.tableChangeHandle} size="middle" rowKey="id"
								style={{ paddingLeft: 10, paddingRight: 10 }}>
							</Table>
							<div className="query-condition">
								<WrapperQueryForm callbackParent={this.onChildQuery}></WrapperQueryForm>
							</div>
						</div>

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

	handleSearch = (e) => {
		e.preventDefault();
		// this.props.form.validateFields((err,values) => {
		// 	this.setState({
		// 		param: values
		// 	});

		// 	this.setState({loading: true});
		// 	$fetch({
		// 		url: '/pandora-app/gencode/queryEdaMiddlewareList',
		// 		data: values
		// 	}).then(res => {
		// 		const _pagination = this.state.pagination;
		// 		_pagination.total = res.reply.page.total;   
		// 		_pagination.current = res.reply.page.pageNo;
		// 		this.setState({
		// 			pagination: _pagination,
		// 			data: res.reply.edaMiddlewareList,
		// 			loading: false
		// 		});

		// 	});
		// });
		this.props.callbackParent(this.state);
	}

	render() {
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 }
		}
		const { getFieldDecorator } = this.props.form;

		return (
			<Form onSubmit={this.handleSearch}>
				<Row>
					<Col style={{ display: 'block' }}>
						<FormItem style={{ textAlign: 'right' }} >
							<Button htmlType="submit" type="primary" className="operatorBtn" style={{ width: 88, fontSize: 16, borderRadius: 5 }}>返回</Button>

						</FormItem>
					</Col>
				</Row>
			</Form>
		);
	}
}
const WrapperQueryForm = Form.create()(QueryForm);