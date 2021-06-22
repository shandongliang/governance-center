import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';
//import WrapperCreateModel from './model.js'
import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';
import { randomNamber } from './../../../../util/publicFuc';
import './../../../common/style/index.less';
import './impowerManage.less'
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class ImpowerManage extends Component {
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
            visible: false,
            columns: [
                {
                    title: '编号',
                    dataIndex: 'id',

                },
                {
                    title: '用户名',
                    dataIndex: 'loginName',
                    // render: (text, record, index) => {
                    //     return (
                    //         <a href="javascript:;" onClick={this.toDetail(record)}>{text}</a>
                    //     );
                    // }

                },
                {
                    title: '昵称',
                    dataIndex: 'userName',
                },

                {
                    title: '角色',
                    dataIndex: 'roleList',
                    render: (text, record, index) => {
                        return (
                            <div>
                                {
                                    record.roleList ? record.roleList.map((a) => {

                                        return (<div>{a.roleName}</div>)
                                    }) : null
                                }
                            </div>
                        );
                    }
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    render: (text, record, index) => {
                        return (
                            <span>{this.timer(text)}</span>
                        );
                    }
                },
                {
                    title: '资源类型',
                    dataIndex: 'subModuleCode',
                    render: (text, record, index) => {
                        return (
                            // record.list.map()
                            <div>
                                {
                                    record.subList ? record.subList.map((a) => {
                                        return (<div>{a}</div>)
                                    }) : null
                                }
                            </div>
                            // <a href="javascript:;" onClick={this.clusterList(record,index)}>{text}</a>
                        );
                    }
                },

                {
                    title: '操作权限',
                    dataIndex: '删除服务单元',
                    render: (text, record, index) => {

                        let List = record.subList ? record.subList : []
                        let val = record
                        return (
                            // record.list.map()
                            <div>
                                {
                                    List.map((text, index, record) => {
                                        return (<div><a href="javascript:;" onClick={this.toRelieve(text, index, record, val)} >删除</a></div>)
                                    })
                                }
                            </div>
                            // <a href="javascript:;" onClick={this.clusterList(record,index)}>{text}</a>
                        );
                    }
                },
                {
                    title: '资源名称',
                    dataIndex: '新增服务单元',
                    render: (text, record, index) => {
                        return (
                            <div><a href="javascript:;" onClick={() => this.toAdd(text, record, index)} >新增</a></div>
                        );
                    }
                },




            ]
        };
    }

    toRelieve = (text, index, record, val) => {
        return () => {
            console.log(text, index, record, val)
            let subList = record
            subList.splice(index, 1)
            if (JSON.stringify(subList) == '[]') {
                val.submoduleId = ''
            } else {
                console.log('143', val.submoduleId);
                let a = ''
                for (let i = 0; i < subList.length; i++) {

                    a += subList[i] + ';'
                }
                val.submoduleId = a
                console.log('147', val.submoduleId);
            }

            let reqSeqNo = randomNamber()
            let user = sessionStorage.getItem('$pandora_auth.user_info')
            updateUser = JSON.parse(user).loginName
            $fetch({
                url: '/tesla-gateway-console-app/eda/editEdaUserProxy',
                data: {
                    'edaUserProxy': { ...val, updateUser: updateUser },
                    reqSeqNo
                }
            }).then((res) => {
                console.log('99', res);

                let params = {
                    pageNo: this.state.pagination.current,
                    recordsPerPage: this.state.pagination.pageSize,
                    reqSeqNo: reqSeqNo
                }
                this.fetchData(params);
            })
        }
    }
    onSubmit = (map) => {
        let reqSeqNo = randomNamber()
        console.log('170', map);

        let param = map

        let user = sessionStorage.getItem('$pandora_auth.user_info')
        updateUser = JSON.parse(user).loginName
        console.log('88', param);
        $fetch({
            url: '/tesla-gateway-console-app/eda/editEdaUserProxy',
            data: {
                'edaUserProxy': { ...map, updateUser: updateUser },
                reqSeqNo
            }
        }).then((res) => {
            console.log('99', res);
            this.setState({
                visible: true
            })

        })

    }
    onRef = (ref) => {
        this.child = ref
    }
    click = (e) => {
        this.child.forDate()
        console.log('209');
    }
    toAdd = (text, record, index) => {

        console.log(text, record, index);
        let id = this.props.id;
        let _this = this;
        Modal.confirm({
            title: "状态",
            okText: '确定',
            content: <WrapperCreateModel data={record} onRef={_this.onRef} callbackParent={_this.onSubmit} />,
            onOk() {

                _this.click()

            },
            onCancel() {
                message.info('取消');


            },
        });
    }
    handleok = () => {
        let reqSeqNo = randomNamber()
        this.setState({
            visible: false
        })
        let params = {

            pageNo: this.state.pagination.current,
            recordsPerPage: this.state.pagination.pageSize,


            reqSeqNo: reqSeqNo
        }
        this.fetchData(params);
    }



    timer = (t) => {

        return moment(t).format('YYYY-MM-DD,HH:mm:ss')
    }


    componentDidMount() {

        let reqSeqNo = randomNamber()
        let params = {
            pageNo: this.state.pagination.current,
            recordsPerPage: this.state.pagination.pageSize,
            reqSeqNo: reqSeqNo
        }
        this.fetchData(params);
    }

    fetchData = (params) => {
        this.setState({ loading: true });
        const { current, pageSize } = params;
        $fetch({
            url: '/tesla-gateway-console-app/eda/queryEdaUserProxyList',
            data: {
                ...params
            }
        }).then((res) => {
            console.log(res);
            const _pagination = this.state.pagination;
            _pagination.total = res.reply.page.total;
            // _pagination.total =  '20000';      
            _pagination.current = res.reply.page.pageNo;
            this.setState({
                pagination: _pagination,
                data: res.reply.edaUserProxyList,
                loading: false
            })
        })
    };

    //模板生成的暂时只支持分页，不支持排序
    tableChangeHandle = (pagination, filters, sorter) => {
        this.setState({ pagination });
        let reqSeqNo = randomNamber()
        const _params = {
            ...this.state.param,
            pageNo: pagination.current,
            recordsPerPage: pagination.pageSize,

            loginName: this.state.loginName ? this.state.loginName : '',
            subModuleId: this.state.userName ? this.state.userName : '',
            reqSeqNo: reqSeqNo,
        }
        this.fetchData(_params);
    }
    //列表页跳转至详情页，查询条件,pagination,sorter目前模板没有传递，如果需要，请参考作业平台单独集成
    toDetail = (record) => {
        return () => {
            const id = record.id;

            let path = {
                pathname: '/approve/detail/' + id,
                state: record
            }
            goTo(path,"审核详情");
        }
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
                <div className="impowerManage">
                    <div className="portlet-tab">
                        <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
                            <TabPane tab="用户列表" key="1">
                                <div className="portlet-body">
                                    <div className="query-condition">
                                        <WrapperQueryForm callbackParent={this.onChildQuery}></WrapperQueryForm>
                                    </div>
                                    <div className="role-table">

                                    </div>
                                    <Table pagination={this.state.pagination} loading={this.state.loading}
                                        dataSource={this.state.data} columns={this.state.columns} onChange={this.tableChangeHandle} size="middle" rowKey="id"
                                        style={{ paddingLeft: 0, paddingRight: 0, border: '1px solid #f7f7f7' }}>
                                    </Table>
                                    <Modal
                                        visible={this.state.visible}
                                        title='状态'
                                        onOk={this.handleok}
                                        footer={[
                                            <Button key='submit' type='primary' onClick={this.handleok}>确定</Button>

                                        ]}
                                    >
                                        <div style={{ height: '36px', lineHeight: '36px', paddingLeft: '80px' }}>
                                            配置完成
                                        </div>
                                    </Modal>
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



    handleReset = () => {
        this.props.form.resetFields();
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let reqSeqNo = randomNamber()
            this.setState({ loading: true });
            let params = {
                pageNo: this.state.pagination.current,
                recordsPerPage: this.state.pagination.pageSize,
                reqSeqNo: reqSeqNo
            }

            $fetch({
                url: '/tesla-gateway-console-app/eda/queryEdaUserProxyList',
                data: { ...values, ...params }
            }).then(res => {
                const _pagination = this.state.pagination;
                _pagination.total = res.reply.page.total;
                _pagination.current = res.reply.page.pageNo;
                this.setState({
                    pagination: _pagination,
                    data: res.reply.edaUserProxyList,
                    loading: false,
                    ...values
                });
                this.props.callbackParent(this.state);
            });

        });
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
            <Form onSubmit={this.handleSearch}>
                <FormItem label="用户名" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('loginName', {
                        initialValue: '',
                        rules: [
                            {
                                required: false,
                            },
                        ],
                    })(<Input />)}
                </FormItem>

                <FormItem label="昵称" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('userName', {
                        initialValue: '',
                        rules: [
                            {
                                required: false,
                            },
                        ],
                    })(<Input />)}
                </FormItem>
                <FormItem label="审批状态" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('proxyStatus', {
                        initialValue: '',
                        rules: [
                            {
                                required: false,
                            },
                        ],
                    })(<Select value={''}>
                        <Option value="">全部</Option>
                        <Option value="W">未审核</Option>
                        <Option value="P">审核通过</Option>

                    </Select>)}
                </FormItem>
                <Row>
                    <Col span={16} style={{ display: 'block' }}>
                        <FormItem {...formItemButton} >
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