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

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class ApproveDetail extends Component {

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
                            <TabPane tab="详细信息" key="1">
                                <div className="portlet-body">
                                    <WrapperFormDetail id={this.props.match.params.id} par={this.props.location.state}></WrapperFormDetail>
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
            formData: []
        }
    }

    componentDidMount() {



    }

    timer = (t) => {

        return moment(t).format('YYYY-MM-DD,HH:mm:ss')
    }

    toIndex = () => {
        let path = {
          pathname: '/approve/index/'
        };
        goTo(path, "首页");
    }

    status = (t) => {


        if (t == 'P') {
            return '审核通过'
        }
        if (t == 'W') {
            return '未审核'
        }
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 20 }
        }
        const formItemDate = {
            labelCol: { span: 3 },
            wrapperCol: { span: 3 }
        }
        const { getFieldDecorator } = this.props.form;
        const data = this.props.par ? this.props.par : {}

        return (
            <Form onSubmit={this.handleSubmit}>
                <Row type="flex">
                    <FormItem label="编号"  {...formItemLayout}>
                        {getFieldDecorator('id', {
                            initialValue: data.id ? data.id : '',
                            rules: [
                                {
                                    required: false
                                },
                            ],
                        })(<Input disabled />)}
                    </FormItem>
                    <FormItem label="用户名"  {...formItemLayout}>
                        {getFieldDecorator('loginName', {
                            initialValue: data.loginName ? data.loginName : "",
                            rules: [
                                {
                                    required: false
                                },
                            ],
                        })(<Input disabled />)}
                    </FormItem>
                    <FormItem label="昵称"  {...formItemLayout}>
                        {getFieldDecorator('userName', {
                            initialValue: data.userName ? data.userName : '',
                            rules: [
                                {
                                    required: false
                                },
                            ],
                        })(<Input disabled />)}
                    </FormItem>

                    <FormItem label="服务单元编号"  {...formItemLayout}>
                        {getFieldDecorator('submoduleId', {
                            initialValue: data.submoduleId ? data.submoduleId : '',
                            rules: [
                                {
                                    required: false
                                },
                            ],
                        })(<Input disabled />)}
                    </FormItem>



                    <FormItem label="机构号"  {...formItemLayout}>
                        {getFieldDecorator('orgId', {
                            initialValue: data.orgId ? data.orgId : '',
                            rules: [
                                {
                                    required: false
                                },
                            ],
                        })(<Input disabled />)}
                    </FormItem>
                    <FormItem label="机构名称"  {...formItemLayout}>
                        {getFieldDecorator('orgName', {
                            initialValue: data.orgName ? data.orgName : '',
                            rules: [
                                {
                                    required: false
                                },
                            ],
                        })(<Input disabled />)}
                    </FormItem>
                    <FormItem label="状态"  {...formItemLayout}>
                        {getFieldDecorator('proxyStatus', {
                            initialValue: data.proxyStatus ? this.status(data.proxyStatus) : '',
                            rules: [
                                {
                                    required: false
                                },
                            ],
                        })(<Input disabled />)}
                    </FormItem>

                    <FormItem label="角色"  {...formItemLayout}>

                        {/* <CheckboxGroup style={{ width: '100%' }} > */}

                        <Row>

                            {
                                data.roleList ? data.roleList.map((item) => {

                                    return (
                                        <Col span={6} ><Checkbox defaultChecked disabled value={item.roleId}>{item.roleName}</Checkbox></Col>
                                    )
                                }) : null
                            }

                        </Row>
                        {/* </CheckboxGroup> */}



                    </FormItem>
                    <FormItem label="注册时间"  {...formItemLayout}>
                        {getFieldDecorator('createTime', {
                            initialValue: data.createTime ? this.timer(data.createTime) : '',
                            rules: [
                                {
                                    required: false
                                },
                            ],
                        })(<Input disabled />)}
                    </FormItem>


                    <FormItem wrappercol={{ span: 5, offset: 10 }}>

                        <Button onClick={this.toIndex} className="operatorBtn" style={{ marginLeft: '87%', width: 88, fontSize: 16, borderRadius: 5 }}>返回</Button>
                    </FormItem>
                </Row>
            </Form>
        );
    }
}

const WrapperFormDetail = Form.create()(FormDetail);