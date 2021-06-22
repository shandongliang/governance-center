import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';
import { goTo, goToAndClose } from '../../../../util/tabRouter';
import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';
import { randomNamber, deploy } from './../../../../util/publicFuc';
import './../../../common/style/index.less';
import wrapAuth from "../../../../util/pageEleHOC";

const WrapButton = wrapAuth(Button);
//import './ldc.less'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class Ldc extends Component {
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
                showQuickJumper: true,
                pageSize: 10,
                pageSizeChanger: true,
                current: 1
            },
            selectedRowKeys: [],
            selectedRows: [],
            visible: false,
            clusData: {},
            columns: [
                {
                    title: 'ldc编号',
                    dataIndex: 'ldcId',
                    key: 'ldcId',
                    render: (text, record, index) => {
                        return (
                            <div >{text}</div>
                        );
                    }
                }
                ,
                {
                    title: 'ldc名称',
                    dataIndex: 'ldcName',
                    key: 'ldcName',
                    render: (text, record, index) => {
                        return (
                            <div >{text}</div>
                        );
                    }
                },
                {
                    title: '执行ldc编号',
                    dataIndex: 'execLdcId',
                    key: 'execLdcId',
                    render: (text, record, index) => {
                        return (
                            <div>
                                {text}
                            </div>
                        );
                    }
                }
                ,
                {
                    title: '备份ldc编号',
                    dataIndex: 'backupLdcId',
                    key: 'backupLdcId',
                    render: (text, record, index) => {
                        return (
                            <div>
                                {text}
                            </div>
                        );
                    }
                }
                ,
                {
                    title: '读写区分',
                    dataIndex: 'isWritable',
                    key: 'isWritable',
                    render: (text, record, index) => {
                        return (
                            <div>
                                {text == '0' ? '读' : '写'}
                            </div>
                        );
                    }
                }
                ,
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text, record, index) => {
                        return (
                            <div>
                                {text == 'Y' ? '有效' : '无效'}
                            </div>
                        );
                    }
                }
                ,
                {
                    title: '关联表数量',
                    dataIndex: 'tableNumberCount',
                    key: 'tableNumberCount',
                    render: (text, record, index) => {
                        return (
                            <div>
                                {
                                    text
                                }
                            </div>
                        );
                    }
                },
                {
                    title: '操作',
                    dataIndex: 'id',
                    key: 'id',
                    render: (text, record, index) => {

                        return (
                            <div>
                                <Button
                                  className="priamryBtn"
                                  onClick={() =>this.toOption(record) } >查看
                                </Button>
                                <WrapButton 
                                  id="ServiceGovern.LDCQuery.Delete"
                                  onClick={() =>this.delitemessages(record)} 
                                  className="priamryBtn"
                                  type="danger">删除
                                </WrapButton>
                                
                            </div>
                        );
                    }
                },

            ]
        };
    }

    toDelite = (e) => {

        let ldcNumber = e.ldcId
        $fetch({
            url: '/tesla-gateway-console-app/sg/deleteLdcConfig',
            data: {
                ldcNumber
            }
        }).then((res) => {
            console.log(res);
            if (res.reply.returnCode.type == "S") {
                this.messages()
            }



        })
    }
    delitemessages = (e) => {

        let _this = this;
        Modal.confirm({
            title: "状态",
            content: <div>
                请确认是否删除

            </div>,
            onOk() {
                _this.setState({ loading: true });

                _this.toDelite(e);

            },
            onCancel() {
                message.info('取消');


            },
        });
    }
    messages = () => {

        let _this = this;
        Modal.confirm({
            title: "状态",
            content: <div>
                删除成功

            </div>,
            onOk() {
                _this.setState({ loading: true });

                _this.fetchData();

            },
            onCancel() {
                message.info('取消');


            },
        });
    }
    toOption = (e) => {
        console.log(e);
        let path = {
            pathname: '/gateway/ldcConfig/option',
            state: e

        }
        goTo(path,"LDC配置");
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


    changeStatus = (val) => {
        switch (val) {
            case 'unSwitch': {
                return '未切换'
            }
            case 'switch': {
                return '切换到其他中心';
            }
            case 'switchBack': {
                return '已切回'
            }
        }
    }
    changeType = (val) => {
        switch (val) {
            case 'auto': {
                return '自动'
            }
            case 'manual': {
                return '手动';
            }

        }
    }
    status = (val) => {
        switch (val) {
            case '00': {
                return '自身可用'
            }
            case '01': {
                return '故障中';
            }
            case '02': {
                return '容灾转移成功';
            }
            case '03': {
                return '容灾转移失败';
            }


        }
    }
    onSubmit = (map) => {
        let reqSeqNo = randomNamber()
        //console.log('170', map);
        let _this = this
        let param = map
        Modal.confirm({
            title: "状态",
            okText: '确定',
            content: <div>
                <div className='pro'>
                    <span>当前逻辑集群:</span>
                    <span>{param.middlewareEngName}</span>
                </div>
                <div className='pro'>
                    <span>当前集群单元：</span>
                    <span>{deploy(param.currentLDC)}</span>
                </div>
                <div className='pro'>
                    <span>更改集群：</span>
                    <span>{deploy(param.targetLDC)}</span>
                </div>

            </div>,
            onOk() {

                $fetch({
                    url: '/tesla-gateway-console-app/eda/changeLDC',
                    data: {
                        currentLDC: param.currentLDC,
                        targetLDC: param.targetLDC,
                        logicClusterName: param.middlewareEngName,
                        reqSeqNo
                    }
                }).then((res) => {
                    // console.log('99', res);
                    _this.setState({
                        visible: true,
                        clusData: param
                    })

                })

            },
            onCancel() {
                // message.info('取消');


            },
        });



    }

    searchList = () => {

    }


    timer = (t) => {

        return moment(t).format('YYYY-MM-DD,HH:mm:ss')
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
        this.fetchData();
    }

    fetchData = (params) => {
        this.setState({ loading: true });

        $fetch({
            url: '/tesla-gateway-console-app/sg/queryLdcConfig',
            data: {

            }
        }).then((res) => {
            console.log(res);
            if (res.reply.returnCode.type == "S") {
                let data = res.reply.result
                this.setState({

                    data: data,
                    loading: false,

                })
            }



        })
    };

    onSelectChange = (selectedRowKeys, selectedRows) => {
        let arr = []
        for (var i = 0; i < selectedRows.length; i++) {
            arr.push(selectedRows[i].ldcId)
        }
        this.setState({
            selectedRowKeys,
            selectedRows: arr
        })
    }
    download = () => {

        $downloadfiles({
            url: '/tesla-gateway-console-app/sg/exportLdcTxt',
            data: { ids: this.state.selectedRows }
        }).then(res => {
            //console.log('221', res)

        });

    }



    onChildQuery = (map) => {
        this.setState(
            map
        );
    }

    render() {
        const { selectedRowKeys } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            //getCheckboxProps:this.aaa,
        }
        return (
            <div>
                <div>
                    <div className="tableWrap">
                        <div className="portlet-body">
                            <div className="query-condition">
                                <WrapperQueryForm callbackParent={this.onChildQuery}></WrapperQueryForm>
                            </div>
                            <div className="role-table">
                                <div className="role-header">

                                </div>
                            </div>
                            <Table rowSelection={rowSelection} pagination={this.state.pagination} loading={this.state.loading}
                                dataSource={this.state.data} columns={this.state.columns} onChange={this.tableChangeHandle} rowKey="id"
                                style={{ paddingLeft: 0, paddingRight: 0, }}>
                            </Table>
                            <WrapButton id="ServiceGovern.LDCQuery.BatchDownload" disabled = {this.state.selectedRowKeys.length === 0} onClick={this.download} type="primary" className="operatorBtn" style={{ marginBottom: 20, marginLeft: 10, width: 88, textAlign: 'center', height: 20, fontSize: 12, borderRadius: 5 }}>批量下载</WrapButton>
                            <Modal
                                visible={this.state.visible}
                                title='状态'
                                onOk={this.handleok}
                                footer={[
                                    <Button key='submit' type='primary' onClick={this.handleok}>确定</Button>

                                ]}
                            >
                                <div style={{ height: '36px', lineHeight: '36px', paddingLeft: '80px' }}>
                                    切换完成！
                                        </div>
                            </Modal>
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
                showQuickJumper: true,
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

            </Form>
        );
    }
}
const WrapperQueryForm = Form.create()(QueryForm);