import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Collapse, Popover, Breadcrumb, Switch, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, message, Table, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input } from 'antd';
import $fetch from '../../../../util/fetch';
import './../../../common/style/index.less';
import './index.less';
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const prefixCls = 'pandora-funcManage';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

class ExcelImportDetails extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    constructor() {
        super();
        this.state = {
            loading: false,
            data: [
            ],
            serviceCode: "",            
            columns: [
                {
                    title: '所属模块编码',
                    dataIndex: 'moduleCode',
                    render: (text, record, index) => {
                        return (
                            <span>{text}</span>
                        );
                    }
                },
                {
                    title: '所属服务单元编码',
                    dataIndex: 'subModuleCode',
                    render: (text, record, index) => {
                        return (
                            <span>{text}</span>
                        );
                    }
                },
                {
                    title: '交易码',
                    dataIndex: 'serviceCode',
                    render: (text, record, index) => {
                        return (
                            <a onClick={() => this.toExcelDetail(text, record)}>{text}</a>
                        );
                    }
                },
                {
                    title: '版本号',
                    dataIndex: 'version',
                    render: (text, record, index) => {
                        return (
                            <span>{text}</span>
                        );
                    }
                },
                {
                    title: '服务名称',
                    dataIndex: 'serviceName',
                    render: (text, record, index) => {
                        return (
                            <span>{text}</span>
                        );
                    }
                },
                {
                    title: '服务类型',
                    dataIndex: 'serviceType',
                    render: (text, record, index) => {
                        if (text == '01') {
                            text = '查询类交易';
                        } else if (text == '02') {
                            text = '交易类交易';
                        } else if (text == '03') {
                            text = '文件类交易';
                        } else if (text == '04') {
                            text = '通知类交易';
                        }
                        return (
                            <span>{text}</span>
                        );
                    }
                },

                              
                {
                    title: '状态',
                    dataIndex: 'status',
                    render: (text, record, index) => {
                        if (text == 'Y') {
                            text = '已启用';
                        } else if (text == 'N') {
                            text = '已禁用';
                        }
                        return (
                            <span>{text}</span>
                        );
                    }
                },
                {
                    title: '最后修改时间',
                    dataIndex: 'updateTime',
                    render: (text, record, index) => {
                        text = new Date(text).toLocaleString();
                        return (
                            <span>{text}</span>
                        );
                    }
                },
                {
                    title: '最后参数维护人',
                    dataIndex: 'updUserName',
                    render: (text, record, index) => {
                        return (
                            <span>{text}</span>
                        );
                    }
                },
                {
                    title: '功能说明',
                    dataIndex: 'remarks',
                    render: (text, record, index) => {
                        return (
                            <span>{text}</span>
                        );
                    }
                },                
            ]
        };
    }

    //跳转至模块页面
    toModuleIndex = (index) => {
        return () => {
            const dataAll = this.state.data;
            var moduleCode = dataAll[index].moduleCode;
            localStorage.setItem("moduleCode", moduleCode);
            let path = {
              pathname: '/approve/service/index'
            };
            goToAndClose(path, "服务查询");
        }
    }

    //跳转至服务单元页面
    toSubModuleIndex = (index) => {
        return () => {
            const dataAll = this.state.data;
            var subModuleCode = dataAll[index].subModuleCode;
            localStorage.setItem("subModuleCode", subModuleCode);
            let path = {
              pathname: '/approve/service/index'
            };
            goToAndClose(path, "服务查询");
        }
    }

    //跳转详情页面
    toExcelDetail = (text, record) => {
        let path = {
            pathname: "/gateway/serviceConfigv1/excelDetail",
            state: { serviceCode: record.serviceCode, version: record.version, page : 3 }
        }
        let path = {
          pathname: '/approve/service/index'
        };
        goToAndClose(path, "服务查询");
    }

    // onChildQuery = (map) => {
    //     this.setState(
    //         map
    //     );
    // }
    componentWillMount() {
        if (this.props.location.state) {

            this.setState({
                serviceCode: this.props.location.state.serviceCode
            })

        }
    }
    componentDidMount() {
        if (this.props.location.state) {
            this.setState({                       
                data:this.props.location.state.data,
                loading: false
            });
        } else {
            return;
        }
    }
    render() {
        return (
            <div>
                <div className="pandora-main-content">
                    <div className="portlet-tab">
                        <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
                            <TabPane tab="服务导入结果" key="1">
                                <div className="portlet-body">
                                    {/* <div className="query-condition">
                                        <WrapperQueryForm state={this.state.serviceCode} callbackParent={this.onChildQuery}></WrapperQueryForm>
                                    </div> */}
                                    <div className="role-table">
                                        <div className="role-header">
                                            <span className="role-list">服务列表 </span>
                                        </div>
                                    </div>
                                    <div style={{ overflowX: "scroll", width: 1000 }}>
                                        <Table
                                            loading={this.state.loading}
                                            dataSource={this.state.data}
                                            columns={this.state.columns}
                                            style={{ paddingLeft: 10, paddingRight: 10, width: 2200 }}
                                            size='middle'
                                        >
                                        </Table>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>                   
                    </div>
                </div>
            </div>);
    }
}
export default Form.create()(ExcelImportDetails)