import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input, Table, } from 'antd';
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';
import { randomNamber, deploy } from './../../../../util/publicFuc';

import './../../../common/style/index.less';
import './create.less'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
let reqSeqNo = randomNamber()
export default class Ldccreate extends Component {
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


        };
    }






    fetchData = (params) => {
        this.setState({ loading: true });
        const { current, pageSize } = params;


    };









    render() {
        return (
            <div>
                <div className="applySwitch">
                    <div className="portlet-tab">
                        <div className="portlet-body">
                            <div className="query-condition">
                                <WrapperQueryForm callbackParent={this.onChildQuery}></WrapperQueryForm>
                            </div>
                            <div className="role-table">
                                <div className="role-header">

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>);
    }
}

class QueryForm extends React.Component {
    static contextTypes = {
        router: PropTypes.any
    }
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                current: 1,
                pageSize: 10,
            },
            checkList: [1, 2],
            checked: false,
            indeterminate: true,
        }
    }
    componentDidMount() {


    }
    onSubmit = (map) => {
        let reqSeqNo = randomNamber()
        //console.log('170', map);
        let _this = this
        let param = map
        let store = sessionStorage.getItem('$pandora_auth.user_info')
        let userName = JSON.parse(store).userName
        Modal.confirm({
            title: "状态",
            okText: '确定',
            content: <div>
                <div className='pro'>
                    <span>ldc编号:</span>
                    <span>{param.ldcId}</span>
                </div>
                <div className='pro'>
                    <span>ldc名称:</span>
                    <span>{param.ldcName}</span>
                </div>
                <div className='pro'>
                    <span>执行ldc编号:</span>
                    <span>{param.execLdcId}</span>
                </div>
                <div className='pro'>
                    <span>备份ldc编号:</span>
                    <span>{param.backupLdcId}</span>
                </div>
                <div className='pro'>
                    <span>读写区分:</span>
                    <span>{param.isWritable == '0' ? '读' : '写'}</span>
                </div>
                <div className='pro'>
                    <span>状态:</span>
                    <span>{param.status == 'Y' ? '有效' : '无效'}</span>
                </div>
                <div className='pro'>
                    <span>关联表编号:</span>
                    <span>{param.tableNumberStr}</span>
                </div>

            </div>,
            onOk() {

                $fetch({
                    url: '/tesla-gateway-console-app/sg/createUpdateLdcConfig',
                    data: {
                        ldcConfig: param, updUserName: userName
                    }
                }).then((res) => {
                    //console.log('99', res);
                    if (res.reply.returnCode.type == "S") {

                        _this.messages()
                    }


                })

            },
            onCancel() {
                // message.info('取消');


            },
        });




    }
    messages = () => {

        let _this = this;
        Modal.confirm({
            title: "状态",
            content: <div>
                创建完成，点击确认将回到列表页

            </div>,
            onOk() {
                _this.setState({ loading: true });
                let path = {
                  pathname: '/gateway/ldcConfig/index'
                };
                goToAndClose(path, "LDC查询");

            },
            onCancel() {
                message.info('取消');


            },
        });
    }

    handleok = () => {


    }


    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let param = values
                this.onSubmit(param)
            }
        })
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 12 }
        }
        const formItemButton = {
            wrapperCol: { span: 16 }
        }
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='Ldccreate'>

                <Form onSubmit={this.handleSearch}>
                    <FormItem label="ldc编号"  {...formItemLayout}>
                        {getFieldDecorator('ldcId', {

                            rules: [

                                {
                                    required: true, message: 'ldc编号为必输项'
                                },
                            ],
                        })
                            (
                            <Input maxlength='50' />
                            )}

                    </FormItem>
                    <FormItem label="ldc名称"  {...formItemLayout}>
                        {getFieldDecorator('ldcName', {

                            rules: [

                                {
                                    required: true, message: 'ldc名称为必输项'
                                },
                            ],
                        })
                            (
                            <Input />
                            )}

                    </FormItem>
                    <FormItem label="执行ldc编号"  {...formItemLayout}>
                        {getFieldDecorator('execLdcId', {

                            rules: [

                                {
                                    required: true, message: '执行ldc编号为必输项'
                                },
                            ],
                        })(<Input />)}

                    </FormItem>
                    <FormItem label="备份ldc编号"  {...formItemLayout}>
                        {getFieldDecorator('backupLdcId', {

                            rules: [

                                {
                                    required: true, message: '备份ldc编号为必输项'
                                },
                            ],
                        })(<Input />)}

                    </FormItem>
                    <FormItem {...formItemLayout} label='读写区分'
                    >
                        {getFieldDecorator('isWritable', {
                            initialValue: '0',
                            rules: [
                                { required: true, message: '请选择读写区分' }
                            ]
                        })(
                            <Select  >
                                <Option value="0">读</Option>
                                <Option value="1">写</Option>


                            </Select>
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='状态'
                    >
                        {getFieldDecorator('status', {
                            initialValue: 'Y',
                            rules: [
                                { required: true, message: '请选择状态' }
                            ]
                        })(
                            <Select >
                                <Option value="Y">有效</Option>
                                <Option value="N">无效</Option>


                            </Select>
                            )}
                    </FormItem>
                    <FormItem label="关联表编号"  {...formItemLayout}>
                        {getFieldDecorator('tableNumberStr', {

                            rules: [

                                {
                                    required: true, message: '关联表编号为必输项'
                                },
                            ],
                        })(<Input type='textarea' autosize placeholder='请输入0-255,256-511,512-767,768-1023' />)}
                        <span> 写入格式（例如：0-255,511,899）</span>
                    </FormItem>

                    <Button onClick={this.handleSearch} type="primary" className="operatorBtn" style={{ width: 88, fontSize: 14, borderRadius: 5, marginRight: '20px' }}>提交</Button>

                </Form>

            </div>
        );
    }
}
const WrapperQueryForm = Form.create()(QueryForm);