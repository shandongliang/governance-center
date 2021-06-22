import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from '$moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input } from 'antd';

import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';
import { randomNamber, deploy } from './../../../../util/publicFuc';
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import './../../../common/style/index.less';
import './edits.less'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class addClaster extends React.Component {

	static contextTypes = {
		router: PropTypes.any
	}

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	render() {
		return (
			<div>
				<div className="pandora-main-content">
					<div className="portlet-tab">
						<Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
							<TabPane tab="添加物理集群" key="1">
								<div className="portlet-body">
									<WrapperEditForm id={this.props.match.params.id} par={this.props.location.state}></WrapperEditForm>
								</div>
							</TabPane>
						</Tabs>
					</div>
				</div>
			</div>
		);
	}
}

class EditForm extends React.Component {

	static contextTypes = {
		router: PropTypes.any
	}

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			formData: {},
			UnitArr: [],
			deployUnitChange: ''
		}
	}

	componentDidMount() {
		let id = this.props.id;
		let reqSeqNo = randomNamber()
		// $fetch({
		// 	url: '/tesla-gateway-console-app/eda/queryEdaClusterList',
		// 	data: { reqSeqNo: reqSeqNo }
		// }).then(res => {
		// 	console.log('613', res);
		// 	let drunit = res.reply.queryClusterList.clusterList
		// 	this.setState({
		// 		DRUnitArr: drunit,
		// 		UnitArr: drunit
		// 	})
		// })
	}

	displayField = (displayType, name, valueRange) => {
		switch (displayType) {
			case 'TEXT': {
				return (
					<Input placeholder='' />
				)
			}
			case 'NUMBER': {
				return (
					<Input type="number" />
				);
			}
			case 'FLOAT': {
				return (
					<Input placeholder='' />
				)
			}
			// case 'SELECT':{
			//     _valueRange=valueRange?valueRange:"";
			//     const optionArr = _valueRange.split("|");
			//     let localCounter = 1;
			//     return (
			//         <Select
			//             style={{width:210}}>
			//             {
			//                 optionArr.map((itm)=>{
			//                     return (
			//                         <Select.Option key={localCounter++} value={itm}>{itm}</Select.Option>
			//                     )
			//                 })
			//             }
			//         </Select>
			//     );
			// }
			case 'DATE': {
				return (
					<DatePicker

						format={DATE_FORMAT_MOMENT}
					/>
				)
			}
			case 'TIME': {
				return (
					<TimePicker
						placeholder="请选择时间"
						format="HH:mm:ss"

					/>
				);
			}
			// case 'MULTISELECT':{
			// 	_valueRange=valueRange?valueRange:"";  
			//     const chkboxArr = _valueRange.split("|");
			//     let options = [];
			//     chkboxArr.forEach((itm) => {    
			//     	options.push({label:itm,value:itm});
			//     })
			//     return (
			//             <CheckboxGroup options={options} />
			//     );
			// }
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

	validateMaxLen = (maxLen) => {
		return (rule, value, callback) => {
			if (value.length > maxLen) {
				callback("数据长度过长！")
			}

			callback();
		}
	}

	getMinMaxFromNumber = (valueRange) => {
		valueRangeTmp = valueRange ? valueRange : "";
		let min = 0, max = 0;
		const len = valueRangeTmp.length;
		if (len > 0) {
			const arr = valueRangeTmp.split(",");
			if (valueRangeTmp.charAt(0) == "(") {
				min = parseInt(arr[0].substring(1)) + 1;
			} else if (valueRangeTmp.charAt(0) == "[") {
				min = parseInt(arr[0].substring(1))
			}
			if (valueRangeTmp.charAt(len - 1) == ")") {
				max = parseInt(arr[1].substring(0, arr[1].length - 1)) - 1;
			} else if (valueRangeTmp.charAt(len - 1) == "]") {
				max = parseInt(arr[1].substring(0, arr[1].length - 1));
			}
		}

		return { min: min, max: max };
	}

	validateNumber = (name, valueRange) => {
		const obj = this.getMinMaxFromNumber(valueRange);
		return (rule, value, callback) => {
			const { getFieldValue } = this.props.form;
			const tmpValue = getFieldValue(name);
			if (!!tmpValue) {
				const tmpValueInt = parseInt(tmpValue);
				if (tmpValueInt < obj.min || tmpValueInt > obj.max) {
					callback("数值不在指定范围");
				}
			}

			callback();
		}
	}

	getRegExpFromFloat = (accuracy) => {
		let _accuracy = accuracy ? accuracy : "";
		let _decimalLen = 0;
		let _intLen = 0;
		if (_accuracy.length > 0) {
			const _arr = _accuracy.split("|");
			if (_arr.length > 1) {
				_decimalLen = parseInt(_arr[1]);
				_intLen = parseInt(_arr[0]) - _decimalLen;
			}
		}

		const accuracyRegExpStr = '/^\\d{0,' + _intLen + '}(\\.\\d{0,' + _decimalLen + '})?$/';
		const accuracyRegExp = new RegExp(eval(accuracyRegExpStr));

		return accuracyRegExp;
	}

	getLenAndRegExpFromText = (length, validationTmpl) => {
		const len = length ? length : "";
		let _validationTmpl = new RegExp();
		if (!!validationTmpl && validationTmpl.indexOf("null") < 0) {
			_validationTmpl = new RegExp(eval("/" + validationTmpl + "/"));
		}

		return { len: len, regExp: _validationTmpl }
	}

	addZero = (val) => {
		return val > 9 ? val : ('0' + val);
	}

	toDetail = () => {
    let path = {
			pathname: '/eventDriven/edamiddleware/detail/' + this.props.id
		};
		goTo(path, "事件中间件详情");
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let pars = this.props.par
				//console.log('243', values);
				let list = pars.list
				let temp = false;
				if (list.length > 0) {
					for (let i = 0; i < list.length; i++) {
						if (values.drunit == '' || values.drunit == null || values.drunit == list[i].deployUnit) {
							temp = true;
							let reqSeqNo = randomNamber()
							let store = sessionStorage.getItem('$pandora_auth.user_info')
							let userId = JSON.parse(store).userId
							values.publishDate = this.timer1(values.publishDate)
							values.middlewareChName = pars.middlewareChName
							values.middlewareEngName = pars.middlewareEngName


							// let list = []
							// list.push(values)

							let param = {
								'edaCluster': {
									lastUpdateUserId: userId, createUserId: userId, ...values,

								},
								reqSeqNo: reqSeqNo,
							};


							this.setState({ loading: true });

							this.toSure(param, values)
						}
					}
				} else {
					if (values.drunit == '' || values.drunit == null) {
						temp = true;
						let reqSeqNo = randomNamber()
						let store = sessionStorage.getItem('$pandora_auth.user_info')
						let userId = JSON.parse(store).userId
						values.publishDate = this.timer1(values.publishDate)
						values.middlewareChName = pars.middlewareChName
						values.middlewareEngName = pars.middlewareEngName


						// let list = []
						// list.push(values)

						let param = {
							'edaCluster': {
								lastUpdateUserId: userId, createUserId: userId, ...values,

							},
							reqSeqNo: reqSeqNo,
						};


						this.setState({ loading: true });

						this.toSure(param, values)
					}
				}

				if (!temp) {
					alert('存在未找到部署集群的灾备集群，请先创建一个相匹配的部署集群')
				}
				//values['id'] = this.props.id;

			}
		})
	}
	timer1 = (t) => {
		return moment(t).format('YYYYMMDD')
	}
	timer = (t) => {

		return moment(t).format('YYYY-MM-DD')
	}
	toSure = (param, values) => {
		let id = this.props.id;
		let _this = this;
		Modal.confirm({
			title: "确认Cluster配置无误",
			content: <div>
				<div className='pro'>
					<span>集群名称：</span>
					<span>{values.clusterName}</span>
				</div>
				<div className='pro'>
					<span>中间件类型：</span>
					<span>{_this.LEIXING(values.middlewareType)}</span>
				</div>
				<div className='prod'>
					<span>生产者启动配置：</span>

					<textarea disabled style={{ width: '465px', minHeight: '150px', borderBottom: '0', borderTop: '0' }}>{values.producerInitConfig}</textarea>
				</div>
				<div className='prod'>
					<span>消费者启动配置：</span>

					<textarea disabled style={{ width: '465px', minHeight: '150px', borderBottom: '0', borderTop: '0' }}>{values.consumerInitConfig}</textarea>
				</div>
				<div className='prod'>
					<span>中间件管理入口：</span>
					<span>{values.adminAddress}</span>
				</div>
				<div className='prod'>
					<span>中间件版本：</span>
					<span>{values.middlewareVer}</span>
				</div>
				<div className='prod'>
					<span>集群接入：</span>
					<span>{values.clusterAddress}</span>
				</div>


				<div className='pro'>
					<span>中间件部署：</span>
					<span>{deploy(values.deployUnit)}</span>
				</div>
				<div className='pro'>
					<span>中间件灾备部署:</span>
					<span>{_this.drunit(values.drunit)}</span>
				</div>
				<div className='pro'>
					<span>接入用户：</span>
					<span>{values.accessUser}</span>
				</div>
				<div className='pro'>
					<span>接入安全协议：</span>
					<span>{values.accessProtocol}</span>
				</div>
				<div className='pro'>
					<span>是否支持单一生产者投递多个主题事件：</span>
					<span>{_this.zhuti(values.isSingletonProducer)}</span>
				</div>
				<div className='pro'>
					<span>是否支持单一消费者消费多个主题事件：</span>
					<span>{_this.zhuti(values.isSingletonConsumer)}</span>
				</div>

				<div className='pro'>
					<span>上线日期：</span>
					<span>{_this.timer(values.publishDate)}</span>
				</div>
			</div>,
			onOk() {
				_this.setState({ loading: true });
				$fetch({
					url: '/tesla-gateway-console-app/eda/createEdaCluster',
					data: param
				}).then(res => {
					if (res.reply.returnCode.type == "S") {
						_this.messages();
					}
				});
			},
			onCancel() {
				message.info('取消');


			},
		});
	}
	messages = () => {
		let id = this.props.id;
		let _this = this;
		Modal.confirm({
			title: "状态",
			content: <div>
				修改完成，点击确认将回到列表页

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
	zhuangtai = (v) => {
		if (v == 'Y') {
			return '有效'
		}
		if (v == 'N') {
			return '无效'
		}


	}
	zhuti = (v) => {
		if (v == 'Y') {
			return '支持'
		}
		if (v == 'N') {
			return '不支持'
		}


	}
	LEIXING = (v) => {
		if (v == 'KF') {
			return 'Kafka'
		}
		if (v == 'am') {
			return 'ActiveMQ'
		}
		if (v == 'al') {
			return 'AliMQ'
		}

	}

	drunit = (v) => {
		if (v == 'M') {
			return 'M-马坡'
		}
		if (v == 'P') {
			return 'P-鹏博士'
		}
		if (v == 'Z') {
			return 'Z-郑州'
		}
		if (v == '' || v == null) {
			return ''
		}

	}
	shengchan = (v) => {
		if (v == 'NDNT') {
			return '不分库不分表'
		}
		if (v == 'NDYT') {
			return '不分库分表'
		}
		if (v == 'YDNT') {
			return '分库不分表'
		}
		if (v == 'YDYT') {
			return '分库分表'
		}

	}
	drunitChange = (e) => {
		this.props.form.resetFields(['drunit']);
		//console.log(e);
		this.setState({
			deployUnitChange: e
		}, () => {
			//console.log('36', this.state.deployUnitChange);
		})
	}
	render() {
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 }
		}
		const { getFieldDecorator } = this.props.form;
		//console.log(this.state.DRUnitArr);
		return (
			<div className='middlewareedit'>
				<Form onSubmit={this.handleSubmit}>

					<Row >
						<FormItem label="集群名称："  {...formItemLayout}>
							{getFieldDecorator('clusterName', {
								initialValue: '',
								rules: [
									{ required: true, message: '请输入集群名称' }
								],
							})(
								<Input />
								)}
						</FormItem>
						<FormItem label="中间件类型：" {...formItemLayout}>
							{getFieldDecorator('middlewareType', {
								initialValue: '',
								rules: [

									{ required: true, message: '请输入中间件类型' }
								],
							})(
								<Select value={'KF'} >
									<Option value="KF">Kafka</Option>
									<Option value="am">ActiveMQ</Option>
									<Option value="al">AliMQ</Option>
								</Select>
								)}
						</FormItem>
						<FormItem label="生产者启动配置："  {...formItemLayout}>
							{getFieldDecorator('producerInitConfig', {
								initialValue: '',
								rules: [

									{ required: true, message: '请输入生产者启动配置' }
								],
							})(
								<Input type='textarea' autosize />
								)}
						</FormItem>
						<FormItem label="消费者启动配置："  {...formItemLayout}>
							{getFieldDecorator('consumerInitConfig', {
								initialValue: '',
								rules: [

									{ required: true, message: '请输入消费者启动配置' }
								],
							})(
								<Input type='textarea' autosize />
								)}
						</FormItem>
						<FormItem  {...formItemLayout} label='中间件管理入口:'
						>
							{getFieldDecorator('adminAddress', {
								initialValue: '',
								rules: [

									{ required: true, message: '请输入中间件管理入口' }
								]
							})(
								<Input />
								)}
						</FormItem>
						<FormItem  {...formItemLayout} label='中间件版本：'
						>
							{getFieldDecorator('middlewareVer', {
								initialValue: '',
								rules: [

									{ required: true, message: '请选择中间件版本' }
								]
							})(
								<Select value={'kafka_1.0.1'} >
									<Option value="kafka_1.0.1">kafka_1.0.1</Option>
									<Option value="kafka_0.10.0.1">kafka_0.10.0.1</Option>

								</Select>
								)}
						</FormItem>
						<FormItem label="集群接入：" {...formItemLayout}>
							{getFieldDecorator('clusterAddress', {
								initialValue: '',
								rules: [

									{ required: true, message: '请输入集群接入' }
								],
							})(
								<Input type='textarea' autosize />
								)}
						</FormItem>
						<FormItem label="中间件部署："  {...formItemLayout}>
							{getFieldDecorator('deployUnit', {
								initialValue: '',
								rules: [

									{ required: true, message: '请输入中间件部署' }
								],
							})(
								<Select value={'M'} onChange={this.drunitChange}>
									<Option value="M">M-马坡</Option>
									<Option value="P">P-鹏博士</Option>
									<Option value="Z">Z-郑州</Option>
								</Select>
								)}
						</FormItem>
						<FormItem label="中间件灾备部署:"  {...formItemLayout}>
							{getFieldDecorator('drunit', {
								initialValue: '',
								rules: [

									{ required: false }
								],
							})(

								<Select >
									<Option value="M" style={{ display: this.state.deployUnitChange == 'M' ? "none" : "block" }}>M-马坡 m1</Option>
									<Option value="P" style={{ display: this.state.deployUnitChange == 'P' ? "none" : "block" }}>P-鹏博士m2</Option>

								</Select>
								)}
						</FormItem>
						<FormItem label="接入用户："  {...formItemLayout}>
							{getFieldDecorator('accessUser', {
								initialValue: '',
								rules: [

									{ required: true, message: '请输入接入用户' }
								],
							})(
								<Input />
								)}
						</FormItem>
						<FormItem label="接入安全协议："  {...formItemLayout}>
							{getFieldDecorator('accessProtocol', {
								initialValue: '',
								rules: [

									{ required: true, message: '请输入安全协议' }
								],
							})(
								<Input />
								)}
						</FormItem>
						<FormItem label="是否支持单一生产者投递多个主题事件：" {...formItemLayout}>
							{getFieldDecorator('isSingletonProducer', {
								initialValue: '',
								rules: [

									{ required: true, message: '请输入主题事件' }
								],
							})(
								<Select value={'Y'}>
									<Option value="Y">支持</Option>
									<Option value="N">不支持</Option>

								</Select>
								)}
						</FormItem>
						<FormItem label="是否支持单一消费者消费多个主题事件：" {...formItemLayout}>
							{getFieldDecorator('isSingletonConsumer', {
								initialValue: '',
								rules: [

									{ required: true, message: '请输入主题事件' }
								],
							})(
								<Select value={'Y'}>
									<Option value="Y">支持</Option>
									<Option value="N">不支持</Option>

								</Select>
								)}
						</FormItem>

						<div className='tDates' style={{ width: '100%' }}>
							<FormItem label="上线日期：" {...formItemLayout}>
								{getFieldDecorator('publishDate', {
									initialValue: '',
									rules: [

										{ required: true, message: '请输入上线日期' }
									],
								})(
									(<DatePicker />)
									)}
							</FormItem>
						</div>
					</Row>


					<Row >
						<FormItem wrappercol={{ span: 19, offset: 5 }}>
							<Button htmlType="submit" className="operatorBtn" style={{ marginLeft: 0, width: 88, fontSize: 16, borderRadius: 5 }}>提交</Button>
							<Button onClick={this.toDetail} className="cancelBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>取消</Button>
						</FormItem>
					</Row>
				</Form>
			</div>
		);
	}
}

const WrapperEditForm = Form.create()(EditForm);