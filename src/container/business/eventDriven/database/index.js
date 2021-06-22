import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import hashHistory from 'react-router';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';
import { randomNamber } from './../../../../util/publicFuc';
import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import './../../../common/style/index.less';
import './index.less'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class DatabaseIndex extends Component {
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
					title: '编号',
					dataIndex: 'id',
					width: 50,
				},
				{
					title: '规则名称',
					dataIndex: 'ruleName',
					width: 100,
					render: (text, record, index) => {
						return (
							<a href="javascript:;" onClick={this.toDetail(index)}>{text}</a>
						);
					}
				}
				,
				{
					title: '上线时间',
					dataIndex: 'publishDate',
					width: 100,

				}
				,

				{
					title: '服务单元编号',
					dataIndex: 'subModuleCode',
					width: 100,
					render: (text, record, index) => {
						return (
							// record.list.map()
							<div>
								{
									record.list ? record.list.map((a) => {
										return (<div>{a.subModuleCode}</div>)
									}) : null
								}
							</div>
							// <a href="javascript:;" onClick={this.clusterList(record,index)}>{text}</a>
						);
					}
				},
				// {
				// 	title: '服务单元编号',
				// 	dataIndex: 'subModuleConfigId',

				// 	render: (text,record,index) => {
				// 		return (
				// 			// record.list.map()
				// 			<div>
				// 				{	
				// 					record.list?record.list.map((a)=>{
				// 						return (<div>{a.subModuleConfigId}</div>)
				// 					}):null
				// 				}
				// 			</div>
				// 			// <a href="javascript:;" onClick={this.clusterList(record,index)}>{text}</a>
				// 		);
				// 	}
				// },
				{
					title: '操作',
					dataIndex: '操作',
					width: 100,
					render: (text, record, index) => {
						let rulename = record.ruleName
						let List = record.list ? record.list : []
						for (let i = 0; i < List.length; i++) {
							List[i].rulename = rulename
						}
						return (
							// record.list.map()
							<div>
								{
									List.map((text) => {
										return (<div><a href="javascript:;" onClick={this.toRelieve(text)} >解绑</a></div>)
									})
								}
							</div>
							// <a href="javascript:;" onClick={this.clusterList(record,index)}>{text}</a>
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
			url: '/tesla-gateway-console-app/eda/queryEdaDatabasePartationRulesList',
			data: {
				...params
			}
		}).then((res) => {
			//console.log('157', res)
			const _pagination = this.state.pagination;
			_pagination.total = res.reply.list.page.total;
			_pagination.current = res.reply.list.page.pageNo;
			this.setState({
				pagination: _pagination,
				data: res.reply.list.rulesList,
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
	toDetail = (index) => {
		return () => {
			const dataAll = this.state.data;
			const id = dataAll[index].ruleName;
      let path = {
        pathname: '/eventDriven/database/edit/' + id
      };
      goTo(path, "分库分表编辑");
		}
	}
	//列表页跳转至详情页，查询条件,pagination,sorter目前模板没有传递，如果需要，请参考作业平台单独集成
	toRelieve = (text) => {
		return () => {
			//console.log(text)
			let reqSeqNo = randomNamber()
			let params = {
				reqSeqNo,
				subModuleCode: text.subModuleCode,
				subModuleId: text.subModuleConfigId,
				ruleName: text.rulename,
			}
			let _this = this;
			Modal.confirm({
				title: "状态",
				content: "是否确定解除绑定",
				onOk() {
					_this.setState({ loading: true });
					$fetch({
						url: '/tesla-gateway-console-app/eda/deleteRulesToSubModule',
						data: { ...params }
					}).then((res) => {
						if (res.reply.result.result == 'S') {
							_this.messages();
						}
					})
				},
				onCancel() {
					message.info('删除取消');
				},
			});


		}
	}

	messages = () => {

		let _this = this;
		Modal.confirm({
			title: "状态",
			content: <div>
				解绑成功！

            </div>,
			onOk() {
				let reqSeqNo = randomNamber()
				let params = {
					paginator: {
						pageNo: _this.state.pagination.current,
						recordsPerPage: _this.state.pagination.pageSize,
					},

					reqSeqNo: reqSeqNo
				}
				_this.fetchData(params);

			},
			onCancel() {
				message.info('取消');


			},
		});
	}
	toClusterDetail = (text) => {


		let id = text;

		return () => {
      let path = {
        pathname: '/eventDriven/edamiddleware/details/' + id
      };
      goTo(path, "事件CLUSTER删除");
		}

	}







	toCreate = () => {
    let path = {
      pathname: '/eventDriven/edamiddleware/create'
    };
    goTo(path, "创建事件中间件");
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
				<div className="DatabaseIndex">
					<div className="portlet-tab">
						<Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
							<TabPane tab="分库分表列表" key="1">
								<div className="portlet-body">

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