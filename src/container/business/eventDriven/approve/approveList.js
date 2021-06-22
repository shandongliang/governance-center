import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';
import SelectSubModule from  "../../../../component/selectSubModule/selectCommonSubModule"
import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';
import { randomNamber } from './../../../../util/publicFuc';
import './../../../common/style/index.less';
import './approveList.less'
import ApproveEdit from './approveEdit'
import { goTo, goToAndClose } from '../../../../util/tabRouter';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class ApproveList extends Component {
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
            deleteSub: {},
            visible: false,
            subModule: {},
            subEdit: {},
            columns: [
                // {
                //     title: '编号',
                //     dataIndex: 'id',

                // },
                {
                    title: '用户名',
                    dataIndex: 'loginName',
                    key: 'loginName',
                    width: 50,
                },
                {
                    title: '角色',
                    dataIndex: 'roleList',
                    key: 'roleList',
                    width: 30,
                    render: (text, record, index) => {
                        return (
                            <div>
                                {
                                    record.roleList ? record.roleList.map((a, index) => {

                                        return (<div key={index}>{a.roleName}</div>)
                                    }) : null
                                }
                            </div>
                        );
                    }
                },
                {
                    title: '申请中的服务单元',
                    dataIndex: '申请中的服务单元',
                    key: '申请中的服务单元',
                    width: 80,
                    render: (text, record, index) => {
                        let subList = []
                        for (key in record.submoduleIdMap) {
                            if (record.submoduleIdMap[key] == 'W') {
                                subList.push(Object.assign({ "name": key, 'value': record.submoduleIdMap[key] }));
                            }
                        }

                        return (

                            <div>
                                {
                                    subList ? subList.map((a) => {
                                        return (<div key={a.name}>{a.name}</div>)
                                    }) : null
                                }
                            </div>

                        );
                    }
                },
                {
                    title: '修改时间',
                    dataIndex: 'updateTime',
                    key: 'updateTime',
                    width: 80,
                    render: (text, record, index) => {
                        return (
                            <span key={index}>{this.timer(text)}</span>
                        );
                    }
                },
                {
                    title: '已有权限服务单元',
                    dataIndex: '已有权限服务单元',
                    key: '已有权限服务单元',
                    width: 80,
                    render: (text, record, index) => {
                        let subList = []
                        for (key in record.submoduleIdMap) {
                            if (record.submoduleIdMap[key] == 'P') {
                                subList.push(Object.assign({ "name": key, 'value': record.submoduleIdMap[key] }));
                            }
                        }

                        return (
                            // record.list.map()
                            <div>
                                {
                                    subList ? subList.map((a) => {
                                        return (<div key={a.name}>{a.name}</div>)
                                    }) : null
                                }
                            </div>
                            // <a href="javascript:;" onClick={this.clusterList(record,index)}>{text}</a>
                        );
                    }
                },
                {
                    title: '审批状态',
                    dataIndex: 'proxyStatus',
                    key: 'proxyStatus',
                    width: 50,
                    render: (text, record, index) => {
                        return (
                            <span key={index}>{this.zhuangtai(text)}</span>
                        );
                    }
                },

                {
                    title: '操作权限',
                    dataIndex: '删除服务单元',
                    key: '删除服务单元',
                    width: 50,
                    render: (text, record, index) => {
                        let e = record
                        return (
                            <div key={index}>
                                <a style={{ marginRight: 5, textDecoration: 'none' }} href="javascript:;" onClick={this.toAdd(e)} >增加</a>
                                <a style={{ textDecoration: 'none' }} href="javascript:;" onClick={this.toRelieve(e)} >删除</a>
                            </div>

                        );
                    }
                },
                {
                    title: '审核',
                    dataIndex: '新增服务单元',
                    key: '新增服务单元',
                    width: 100,
                    render: (text, record, index) => {
                        return (
                            <div key={index}>
                                <Button className="subBtn" onClick={this.toSure(text, record, index)} size='small'
                                    style={{ width: 50, fontSize: 12, borderRadius: 5, background: '#fff', color: 'rgba(0,0,0,0.65)' }}>通过</Button>
                                <Button className="deleteBtn" onClick={this.toBohui(text, record, index)} size='small'
                                    style={{ marginLeft: 5, width: 50, fontSize: 12, borderRadius: 5, background: '#fff', color: 'rgba(0,0,0,0.65)' }}>驳回</Button>
                                <Button className="deleteBtn" onClick={this.toEdit(text, record, index)} size='small'
                                    style={{ marginLeft: 5, width: 50, fontSize: 12, borderRadius: 5, background: '#fff', color: 'rgba(0,0,0,0.65)' }}>修改</Button>
                            </div>
                        );
                    }
                },

            ]
        };
    }
    toSure = (text, record, index) => {
        return () => {
            let _this = this;
            let userId = record.loginName
            let subModuleMap = record.submoduleIdMap
            let reqSeqNo = randomNamber()
            for (key in subModuleMap) {
                if (subModuleMap[key] == 'W') {
                    subModuleMap[key] = 'P'
                }
            }
            $fetch({
                url: '/tesla-gateway-console-app/eda/changeEdaUserProxy',
                data: {
                    userId,
                    reqSeqNo,
                    subModuleMap,
                }
            }).then((res) => {
                if (res.reply.returnCode.type == 'S') {
                    Modal.confirm({
                        title: "状态",
                        okText: '确定',
                        content: '审批成功',
                        onOk() {

                            _this.handleok()

                        },
                        onCancel() {
                            message.info('取消');


                        },
                    });
                }
            })
        }
    }
    toBohui = (text, record, index) => {
        return () => {
            let _this = this;
            let userId = record.loginName
            let subModuleMap = record.submoduleIdMap
            let reqSeqNo = randomNamber()
            for (key in subModuleMap) {
                if (subModuleMap[key] == 'W') {
                    subModuleMap[key] = 'D'
                }

            }

            $fetch({
                url: '/tesla-gateway-console-app/eda/changeEdaUserProxy',
                data: {
                    userId,
                    reqSeqNo,
                    subModuleMap,
                }
            }).then((res) => {
                if (res.reply.returnCode.type == 'S') {
                    Modal.confirm({
                        title: "状态",
                        okText: '确定',
                        content: '驳回成功',
                        onOk() {

                            _this.handleok()

                        },
                        onCancel() {
                            message.info('取消');


                        },
                    });
                }
            })
        }
    }
    toEdit = (text, record, index) => {
        return () => {
            let userId = record.loginName
            let _this = this;
            Modal.confirm({
                title: "状态",
                okText: '确定',
                content: <ApproveEdit date={record} callbackParent={this.onChildQueryEdit} >
                </ApproveEdit  >,
                onOk() {

                    _this.tochangeEdit(userId)

                },
                onCancel() {
                    message.info('取消');


                },
            });
        }
    }
    tochangeEdit = (e) => {
        let userId = e
        let subModuleMap = this.state.subEdit
        let reqSeqNo = randomNamber()
        let _this = this;
        $fetch({
            url: '/tesla-gateway-console-app/eda/changeEdaUserProxy',
            data: {
                userId,
                reqSeqNo,
                subModuleMap,
            }
        }).then((res) => {
            if (res.reply.returnCode.type == 'S') {
                Modal.confirm({
                    title: "状态",
                    okText: '确定',
                    content: '修改成功',
                    onOk() {

                        _this.handleok()

                    },
                    onCancel() {
                        message.info('取消');


                    },
                });
            }
        })
    }
    onChildQueryEdit = (e) => {
        this.setState({
            subEdit: e
        })
    }
    toRelieve = (e) => {
        return () => {
            let _this = this;
            let userId = e.loginName
            let submoduleIdMap = e.submoduleIdMap
            let subList = []
            for (key in submoduleIdMap) {
                subList.push(Object.assign({ "name": key, 'value': submoduleIdMap[key] }));
            }
            const children = []
            for (let i = 0; i < subList.length; i++) {
                children.push(<Option key={subList[i].name.toString()}>{subList[i].name}</Option>)
            }
            Modal.confirm({
                title: "状态",
                okText: '确定',
                content:
                    <div>
                        <span>选择要删除的服务单元：</span>
                        <Select
                            mode='multiple'
                            onChange={_this.subChange}
                            style={{ width: '50%' }}
                        >
                            {children}
                        </Select>
                    </div>
                ,
                onOk() {

                    _this.toshanchu(userId)

                },
                onCancel() {
                    message.info('取消');


                },
            });

        }
    }
    subChange = (e) => {

        let deleteSub = new Object()
        for (let i in e) {
            deleteSub[e[i]] = 'D'
        }
        this.setState({
            deleteSub: deleteSub
        })
    }
    toshanchu = (e) => {
        let reqSeqNo = randomNamber()
        let userId = e
        let subModuleMap = this.state.deleteSub
        let _this = this;
        $fetch({
            url: '/tesla-gateway-console-app/eda/changeEdaUserProxy',
            data: {
                userId,
                reqSeqNo,
                subModuleMap
            }
        }).then((res) => {
            if (res.reply.returnCode.type == 'S') {
                Modal.confirm({
                    title: "状态",
                    okText: '确定',
                    content: '删除成功',
                    onOk() {

                        _this.handleok()

                    },
                    onCancel() {
                        message.info('取消');


                    },
                });
            }
        })
    }
    onSubmit = (map) => {
        let reqSeqNo = randomNamber()


        let param = map

        let user = sessionStorage.getItem('$pandora_auth.user_info')
        updateUser = JSON.parse(user).loginName

        $fetch({
            url: '/tesla-gateway-console-app/eda/editEdaUserProxy',
            data: {
                'edaUserProxy': { ...map, updateUser: updateUser },
                reqSeqNo
            }
        }).then((res) => {

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

    }
    onChildQuery = (map) => {
        let subModule = new Object()
        for (let i = 0; i < map.length; i++) {
            subModule[map[i]] = 'P'
        }


        this.setState({
            subModule: subModule
        });
    }
    toAdd = (record) => {

        return () => {

            let userId = record.loginName
            let _this = this;
            Modal.confirm({
                title: "状态",
                okText: '确定',
                content: <SelectSubModule callbackParent={this.onChildQuery} mode="multiple" >
                </SelectSubModule>,
                onOk() {

                    _this.tochangeEdaUserProxy(userId)

                },
                onCancel() {
                    message.info('取消');


                },
            });
        }

    }
    tochangeEdaUserProxy = (userId) => {

        let reqSeqNo = randomNamber()
        let subModuleMap = this.state.subModule
        let _this = this;
        $fetch({
            url: '/tesla-gateway-console-app/eda/changeEdaUserProxy',
            data: {
                userId,
                reqSeqNo,
                subModuleMap,
            }
        }).then((res) => {
            if (res.reply.returnCode.type == 'S') {
                Modal.confirm({
                    title: "状态",
                    okText: '确定',
                    content: '添加成功',
                    onOk() {

                        _this.handleok()

                    },
                    onCancel() {
                        message.info('取消');


                    },
                });
            }
        })
    }
    onChildQuery1 = (map) => {
        this.setState(
            map
        );
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


    zhuangtai = (text) => {
        switch (text) {
            case 'W': {
                return '待审核'
            }
            case 'P': {
                return '审核完成';
            }

        }
    }
    timer = (t) => {
        if (t) {
            return moment(t).format('YYYY-MM-DD,HH:mm:ss')
        }
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

            goTo(path, "审核详情");
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



    render() {
        return (
            <div>
                <div className="approveList">
                    <div className="portlet-tab">
                        <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
                            <TabPane tab="用户列表" key="1">
                                <div className="portlet-body">
                                    <div className="query-condition">
                                        <WrapperQueryForm callbackParent1={this.onChildQuery1}></WrapperQueryForm>
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
                this.props.callbackParent1(this.state);
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

                        rules: [
                            {
                                required: false,
                            },
                        ],
                    })(<Input />)}
                </FormItem>

                <FormItem label="昵称" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('userName', {

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
                    })(<Select >
                        <Select.Option value="">全部</Select.Option>
                        <Select.Option value="W">待审核</Select.Option>
                        <Select.Option value="P">审核完成</Select.Option>

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