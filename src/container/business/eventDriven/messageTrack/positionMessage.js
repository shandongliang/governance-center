import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';

import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';
import { randomNamber } from './../../../../util/publicFuc';
//import './../../common/style/index.less';
import './positionMessage.less';
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class PositionMessage extends Component {
    static contextTypes = {
        router: PropTypes.any
    }

    constructor() {
        super();
        this.state = {
            loading: false,
            selectedRowKeys: [],
            selectedRows: [],
            par: [],
            data: [

            ],
            param: {},
            pagination: {
                pageSize: 2,
                pageSizeChanger: true,
                current: 1,

                total: 0,
            },
            columns: [

                {
                    title: '编号',
                    dataIndex: 'id',

                    key: 'id',
                    width: 10,
                },
                {
                    title: 'offset',
                    dataIndex: 'offset',
                    key: 'offset',
                    width: 10,
                },
                {
                    title: 'partition',
                    dataIndex: 'msgPartition',
                    key: 'msgPartition',
                    width: 10,
                },

                {
                    title: '主题名称',
                    dataIndex: 'topicName',
                    key: 'topicName',
                    width: 50,
                },
                {
                    title: '消息体',
                    dataIndex: 'messageBody',
                    key: 'messageBody',
                    width: 200,

                },


            ]
        };
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedRows
        })
    }
    timer = (t) => {

        return moment(t).format('YYYY-MM-DD')
    }
    status = (t) => {


        if (t == 'Y') {
            return '有效'
        }
        if (t == 'N') {
            return '无效'
        }
    }

    componentDidMount() {
        let reqSeqNo = randomNamber()
        let param = {
            page: {
                pageNo: this.state.pagination.current,//1
                recordsPerPage: this.state.pagination.pageSize,//10
            },

        }

        this.setState({
            par: this.props.location.state.edaMsgRedeliver
        }, () => {
            //console.log('118', this.state.par);
            this.fetchData(param);
        })

    }

    fetchData = (param) => {
        let reqSeqNo = randomNamber()
        this.setState({ loading: true });
        //const {current, pageSize} = param;
        let params = this.state.par

        $fetch({
            url: '/tesla-gateway-console-app/eda/queryEdaMsgRedeliver',
            data: {
                'edaMsgRedeliver': { ...params, ...param },
                reqSeqNo: reqSeqNo
            }
        }).then((res) => {
            const _pagination = this.state.pagination;
            _pagination.total = res.reply.page.total;
            _pagination.current = res.reply.page.pageNo;
            this.setState({
                pagination: _pagination,
                data: res.reply.edaMsgRedeliver,
                loading: false
            })
        })
    };

    //模板生成的暂时只支持分页，不支持排序
    tableChangeHandle = (pagination, filters, sorter) => {
        this.setState({ pagination });
        let reqSeqNo = randomNamber()
        let params = this.state.par
        const _params = {
            page: {
                ...this.state.param,
                pageNo: pagination.current,
                recordsPerPage: pagination.pageSize,
            },
            reqSeqNo: reqSeqNo,
            params,
        }
        this.fetchData(_params);
    }
    //列表页跳转至详情页，查询条件,pagination,sorter目前模板没有传递，如果需要，请参考作业平台单独集成
    toDetail = (record) => {
        return () => {
            const id = record.eventId;
            let path = {
                pathname: '/eventDriven/messageSend/edit/' + id,
                state: { par: this.state.par, record }

            }
            goTo(path,"编辑消息");
        }
    }

    toCreate = () => {
        let path = {
          pathname: '/eventDriven/consumer/create'

      }
      goTo(path,"创建消费者");
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
    handleTouzhi = () => {
        let reqSeqNo = randomNamber()
        $fetch({
            url: '/tesla-gateway-console-app/eda/edaMsgRedeliverBodyList',
            data: {
                'edaMsgRedeliverBodyList': this.state.selectedRows,
                reqSeqNo: reqSeqNo
            }
        }).then((res) => {
            const _pagination = this.state.pagination;
            // _pagination.total = res.reply.page.total;   
            // _pagination.current = res.reply.page.pageNo;;
            // this.setState({
            //     pagination: _pagination,
            // 	data: res.reply.edaMsgRedeliver,
            // 	loading: false
            // })
            if (res.reply.returnCode.type == "S") {
                let result = res.reply.result
               // console.log('218', res)
                this.messages(result);
            }

        })
    }
    messages = (result) => {
        let id = this.props.id;
        let _this = this;
        Modal.confirm({
            title: "状态",
            content: <div>
                <span>发送完成，总共发送
					<span style={{ color: '#49a9ee' }}> {result.total} </span>

                    条，成功
					<span style={{ color: 'green' }}> {result.success} </span>
                    条，

				失败<span style={{ color: 'red' }}> {result.fial} </span>条
				</span>

            </div>,
            onOk() {
                let reqSeqNo = randomNamber()
                message.info('投递成功');
                let param = {
                    page: {
                        pageNo: _this.state.pagination.current,//1
                        recordsPerPage: _this.state.pagination.pageSize,//10
                    },
                    reqSeqNo: reqSeqNo
                }
                let params = _this.state.par

                $fetch({
                    url: '/tesla-gateway-console-app/eda/queryEdaMsgRedeliver',
                    data: {
                        'edaMsgRedeliver': { ...params, ...param },
                        reqSeqNo: reqSeqNo
                    }
                }).then((res) => {
                    const _pagination = _this.state.pagination;
                    _pagination.total = res.reply.page.total;
                    _pagination.current = res.reply.page.pageNo;
                    _this.setState({
                        pagination: _pagination,
                        data: res.reply.edaMsgRedeliver,
                        loading: false,
                        selectedRows: [],
                        selectedRowKeys: []
                    })
                })
            },
            onCancel() {
                message.info('取消');


            },
        });
    }
    handleChongzhi = () => {
        this.setState({
            selectedRows: [],
            selectedRowKeys: []
        }, () => {
        })
    }
    goBack = () => {
        let path = {
          pathname: '/eventDriven/messageTrack/queryPosition'
        };
        goTo(path, "可靠消息查询");
    }
    aaa = () => {

    }
    render() {
        const { loading, selectedRowKeys } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            //getCheckboxProps:this.aaa,
        }
        //const hasSelected=selectedRowKeys.length>0
        return (
            <div >
                <div className="position">
                    <div className="portlet-tab">
                        <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
                            <TabPane tab="分环境查询" key="1">
                                <div className="portlet-body">

                                    <div className="role-table">

                                    </div>
                                    <Table pagination={this.state.pagination} loading={this.state.loading}
                                        dataSource={this.state.data} columns={this.state.columns} onChange={this.tableChangeHandle} size="middle" rowKey="id"
                                        style={{ paddingLeft: 10, paddingRight: 10 }}>
                                    </Table>
                                </div>
                            </TabPane>

                        </Tabs>
                        {/* <Button onClick={this.handleTouzhi} type="primary" className="operatorBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>重新发送</Button>

                        <Button onClick={this.handleChongzhi} type="primary" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>重置</Button> */}
                        <Button onClick={this.goBack} className="operatorBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>返回</Button>
                    </div>
                </div>
            </div>);
    }
}

