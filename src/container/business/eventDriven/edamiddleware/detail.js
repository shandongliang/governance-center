import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from '$moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input } from 'antd';
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';
import { randomNamber } from './../../../../util/publicFuc';
import './../../../common/style/index.less';
import './create.less'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class EdaMiddlewareDetail extends Component {

	static contextTypes = {
		router: PropTypes.any
	}

	constructor() {
		super();
  }

	render() {
		return (
			<div>
				<div className="pandora-main-content">
					<div className="portlet-tab">
						<Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
							<TabPane tab="事件中间件信息" key="1">
								<div className="portlet-body">
									<WrapperFormDetail id={this.props.match.params.id}></WrapperFormDetail>
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

	static contextTypes = {
		router: PropTypes.any
	}

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			formData: {},
			clasterArr: ''
		}
	}

	componentDidMount() {
    
    let id = this.props.id;
		let reqSeqNo = randomNamber()
		$fetch({
			url: '/tesla-gateway-console-app/eda/queryEdaClusterDetail',
			data: { middlewareEngName: id, reqSeqNo: reqSeqNo, clusterName: id }
		}).then(res => {
			if (res.reply.returnCode.type == "S") {
				this.setState({
					formData: res.reply.cluster,
					loading: false
				});
			} else {
			}
		});
	}

	displayField = (displayType, name, valueRange) => {
		switch (displayType) {
			case 'TEXT': {
				return (
					<Input placeholder='' disabled={true} />
				)
			}
			case 'NUMBER': {
				return (
					<Input type="number" disabled={true} />
				);
			}
			case 'FLOAT': {
				return (
					<Input placeholder='' disabled={true} />
				)
			}
			case 'SELECT': {
				_valueRange = valueRange ? valueRange : "";
				const optionArr = _valueRange.split("|");
				let localCounter = 1;
				return (
					<Select

						disabled
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
      pathname: '/eventDriven/edamiddleware/edit/' + this.props.id
    };
    goTo(path, "事件中间件编辑");
	}

	toIndex = () => {
		let path = {
      pathname: '/eventDriven/edamiddleware/index'
    };
    goToAndClose(path, "事件中间件查询");
	}
	toAddClaster = () => {
		let path = {
			pathname: '/eventDriven/edamiddleware/addClaster/' + this.props.id,
			state: this.state.formData
		}
		goTo(path,"添加物理集群");
	}
	timer1 = (t) => {

		return moment(t).format('YYYYMMDD')
	}
	toStop = () => {
		if (this.state.formData.status == 'N') {
			message.info('当前已是无效状态，如想启用，请点击编辑按钮更改状态');
			return false
		}

		let store = sessionStorage.getItem('$pandora_auth.user_info')
		let userId = JSON.parse(store).userId
		let reqSeqNo = randomNamber()
		let _this = this;
		let par = this.state.formData
		// par.createTime = this.timer1(par.createTime)
		// par.lastUpdateTime = this.timer1(par.lastUpdateTime)
		// delete par.createTime
		// delete par.lastUpdateTime


		let param = {
			'edaMiddleware': {
				middlewareChName: this.state.formData.middlewareChName,
				middlewareEngName: this.state.formData.middlewareEngName,
				clasterArr: this.state.clasterArr,
				middlewareType: '',
				middlewareDeploymentUnit: '',
				status: 'N',
				version: this.state.formData.version,
				publishDate: moment(this.state.formData.publishDate).format('YYYY-MM-DD'),

				lastupdateuserid: userId
			},
			reqSeqNo: reqSeqNo,
		};
		Modal.confirm({
			title: "状态",
			content: "您确定停用事件中间件？",
			onOk() {
				_this.setState({ loading: true });
				$fetch({
					url: '/tesla-gateway-console-app/eda/editEdaMiddleware',
					data: param
				}).then(res => {
					if (res.reply.returnCode.type == "S") {
						_this.messages('1');
					}
				});
			},
			onCancel() {
				message.info('取消');
			},
		});


	}
	toDelete = () => {
		let id = this.props.id;
		let _this = this;
		let reqSeqNo = randomNamber()
		Modal.confirm({
			title: "您确定删除事件中间件？",
			content: "删除后将无法恢复",
			onOk() {
				_this.setState({ loading: true });
				$fetch({
					url: '/tesla-gateway-console-app/eda/deleteEdaMiddleware',
					data:
						{ middlewareEngName: id, reqSeqNo: reqSeqNo }

				}).then((res) => {
					if (res.reply.returnCode.type == "S") {
						_this.messages('2');
					}
				})
			},
			onCancel() {
				message.info('取消');
			},
		});
	}
	messages = (num) => {
		let id = this.props.id;
		let _this = this;
		Modal.confirm({
			title: "状态",
			content: <div>
				{num == '1' ? '停用成功，点击确认将回到列表页' : '删除成功，点击确认将回到列表页'}

			</div>,
			onOk() {
				_this.setState({ loading: true });

				let path = {
          pathname: '/eventDriven/edamiddleware/index'
        };
        goToAndClose(path, "事件中间件查询");

			},
			onCancel() {
				message.info('取消');


			},
		});
	}
	render() {
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 }
		}
		const { getFieldDecorator } = this.props.form;
		//console.log('222', this.state.clasterArr);

		return (
			<div className='middleware'>
				<Form onSubmit={this.handleSubmit}>
					<Row >
						<FormItem {...formItemLayout} label='中间件中文全称：'>
							{getFieldDecorator('middlewareChName', {
								initialValue: this.state.formData.middlewareChName,
							})(
								this.displayField('TEXT', 'status', '')
								)}
						</FormItem>
						<FormItem {...formItemLayout} label='中间件英文全称：'>
							{getFieldDecorator('middlewareEngName', {
								initialValue: this.state.formData.middlewareEngName,
							})(
								this.displayField('TEXT', 'version', '')
								)}
						</FormItem>
						<FormItem  {...formItemLayout} label='中间件所有物理集群:'
						>
							{getFieldDecorator('clusterName', {
								initialValue: this.state.formData.clusterName,
								rules: [

									{ required: false, message: '中间件所有物理集群' }
								]
							})(
								<Input type='textarea' autosize disabled />
								)}
						</FormItem>
						<FormItem style={{ display: 'none' }}
						>
							{getFieldDecorator('middlewareType', {
								initialValue: "",
								rules: [

									{ required: false, message: '请输入中间件类型' }
								]
							})(
								// <Select value={'KF'} type='hidden'>
								//     <Option value="KF">Kafka</Option>
								//     <Option value="am">ActiveMQ</Option>
								//     <Option value="al">AliMQ</Option>
								// </Select>
								<Input type='hidden' />
								)}
						</FormItem>
						<FormItem style={{ display: 'none' }}
						>
							{getFieldDecorator('middlewareDeploymentUnit', {
								initialValue: "",
								rules: [

									{ required: false, message: '请输入中间件部署' }
								]
							})(
								// <Select value={'M'} type='hidden'>
								//     <Option value="M">M-马坡</Option>
								//     <Option value="P">P-鹏博士</Option>
								//     <Option value="Z">Z-郑州</Option>
								// </Select>
								<Input type='hidden' />
								)}
						</FormItem>
						<FormItem label="状态："  {...formItemLayout}>
							{getFieldDecorator('status', {
								initialValue: this.state.formData.status,
								rules: [
									{
										required: true,
									},
								],
							})(<Select value={'NDNT'} disabled>
								<Option value="Y">有效</Option>
								<Option value="N">无效</Option>
							</Select>)}
						</FormItem>
						<FormItem label="版本"  {...formItemLayout}>
							{getFieldDecorator('version', {
								initialValue: this.state.formData.version,
								rules: [
									{
										required: true
									},
								],
							})(<Input disabled />)}
						</FormItem>
						<FormItem label="上线日期："  {...formItemLayout}>
							{getFieldDecorator('publishDate', {
								initialValue: moment(this.state.formData.publishDate).format('YYYY-MM-DD'),
								rules: [

									{ required: true, message: '请输入上线日期' }
								],
							})(
								<Input disabled />
								)}
						</FormItem>
						<FormItem >
							{getFieldDecorator('createUserId', {
								initialValue: '',
								rules: [
									{
									},
								],
							})(<Input type='hidden' />)}
						</FormItem>
						<FormItem >
							{getFieldDecorator('lastUpdateUserId', {
								initialValue: '',
								rules: [
									{
									},
								],
							})(<Input type='hidden' />)}
						</FormItem>


					</Row>

					<Row >
						<FormItem wrappercol={{ span: 19, offset: 5 }}>

							<Button onClick={this.toEdit} className="operatorBtn" style={{ marginTop: 20, width: 88, fontSize: 16, borderRadius: 5 }}>编辑</Button>
							<Button onClick={this.toAddClaster} className="operatorBtn" style={{ marginLeft: 10, marginTop: 20, fontSize: 16, borderRadius: 5 }}>添加物理集群</Button>
							<Button onClick={this.toStop} className="operatorBtn" style={{
								marginLeft: 10, marginTop: 20, width: 88, fontSize: 16, borderRadius: 5,
								backgroundColor: this.state.formData.status == 'Y' ? '#ffbf00' : '#ccc', borderColor: this.state.formData.status == 'Y' ? '#ffbf00' : '#ccc'
							}}>停用</Button>
							<Button onClick={this.toDelete} className="delBtn" style={{ marginLeft: 10, marginTop: 20, width: 88, fontSize: 16, borderRadius: 5 }}>删除</Button>
							<Button onClick={this.toIndex} className="cancelBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>取消</Button>
						</FormItem>
					</Row>
				</Form>
			</div>
		);
	}
}

const WrapperFormDetail = Form.create()(FormDetail);