import React, { Component } from 'react';
import { Button } from 'antd';
import moment from 'moment';
import { isShowTransferBtn, isShowDelegateBtn } from './transferAndDelegate.js';
import Constant from './../../../../constant/index';
const defaultConfig = ($this) => {
    const _this = $this;
    return {
        BusiManager: {
            taskId: {
                render: (text, record, index) => {
                    return (
                        <a href="javascript:;" onClick={_this.toDetail(record)}>{text}</a>
                    );
                }
            },
            startUser: {
                render: (text, record, index) => {
                    let startUser = text.split(':')[1];
                    return (
                        <p>{startUser}</p>
                    );
                }
            },
            taskCreateTime: {
                render: (text, record, index) => {
                    let taskCreateTime = moment(text).format('YYYY-MM-DD HH:MM:SS');
                    return (
                        <p>{taskCreateTime}</p>
                    );
                }
            },
            operation: {
                render: (text, record, index) => {
                    let businessKey = record.businessKey;
                    let taskDefinitionKey = record.taskDefinitionKey;
                    let procDefinitionKey = record.procDefId.split(':')[0];
                    return (
                        <div>
                            <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toDetail(record, index)} >办理任务</Button>
                            <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toViewDiagram(record, index)} >查看流程图</Button>
                            {
                                (!!isShowTransferBtn(businessKey, taskDefinitionKey, procDefinitionKey) && !!Constant.BUSITODOTASK_INDEX_TRANSFER) ? (<Button className="process-list-default pandora-btn-fontsize" onClick={_this.toTransfer(record, index, 'transfer')} >转办</Button>) : ''
                            }
                            {
                                (!!isShowDelegateBtn(businessKey, taskDefinitionKey, procDefinitionKey) && !!Constant.BUSITODOTASK_INDEX_DELEGATE) ? (<Button className="process-list-default pandora-btn-fontsize" onClick={_this.toTransfer(record, index, 'delegateTask')} >委派</Button>) : ''
                            }
                        </div>
                    );
                }
            },
        },
        CounterSign2: {
            taskId: {
                render: (text, record, index) => {
                    return (
                        <a href="javascript:;" onClick={_this.toDetail(record)}>{text}</a>
                    );
                }
            },
            startUser: {
                render: (text, record, index) => {
                    let startUser = text.split(':')[1];
                    return (
                        <p>{startUser}</p>
                    );
                }
            },
            taskCreateTime: {
                render: (text, record, index) => {
                    let taskCreateTime = moment(text).format('YYYY-MM-DD HH:MM:SS');
                    return (
                        <p>{taskCreateTime}</p>
                    );
                }
            },
            operation: {
                render: (text, record, index) => {
                    // let signOutState = record.canSignOut == true ? 'inline-block' : 'none';
                    let businessKey = record.businessKey;
                    let taskDefinitionKey = record.taskDefinitionKey;
                    let procDefinitionKey = record.procDefId.split(':')[0];
                    return (
                        <div>
                            <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toDetail(record, index)} >办理任务</Button>
                            <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toViewDiagram(record, index)} >查看流程图</Button>
                            {/* <Button className="process-list-default pandora-btn-fontsize" onClick={this.toSignOut(record, index)} style={{ display: signOutState }} >反签收</Button>  */}
                            {
                                (!!isShowTransferBtn(businessKey, taskDefinitionKey, procDefinitionKey) && !!Constant.BUSITODOTASK_INDEX_TRANSFER) ? (<Button className="process-list-default pandora-btn-fontsize" onClick={_this.toTransfer(record, index, 'transfer')} >转办</Button>) : ''
                            }
                            {
                                (!!isShowDelegateBtn(businessKey, taskDefinitionKey, procDefinitionKey) && !!Constant.BUSITODOTASK_INDEX_DELEGATE) ? (<Button className="process-list-default pandora-btn-fontsize" onClick={_this.toTransfer(record, index, 'delegateTask')} >委派</Button>) : ''
                            }
                        </div>
                    );
                }
            },
        },
        LeaveBusi: {
            taskId: {
                render: (text, record, index) => {
                    return (
                        <a href="javascript:;" onClick={_this.toDetail(record)}>{text}</a>
                    );
                }
            },
            startUser: {
                render: (text, record, index) => {
                    let startUser = text.split(':')[1];
                    return (
                        <p>{startUser}</p>
                    );
                }
            },
            taskCreateTime: {
                render: (text, record, index) => {
                    let taskCreateTime = moment(text).format('YYYY-MM-DD HH:MM:SS');
                    return (
                        <p>{taskCreateTime}</p>
                    );
                }
            },
            operation: {
                render: (text, record, index) => {
                    let businessKey = record.businessKey;
                    let taskDefinitionKey = record.taskDefinitionKey;
                    let procDefinitionKey = record.procDefId.split(':')[0];
                    return (
                        <div>
                            <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toDetail(record, index)} >办理任务</Button>
                            <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toViewDiagram(record, index)} >查看流程图</Button>
                            {
                                (!!isShowTransferBtn(businessKey, taskDefinitionKey, procDefinitionKey) && !!Constant.BUSITODOTASK_INDEX_TRANSFER) ? (<Button className="process-list-default pandora-btn-fontsize" onClick={_this.toTransfer(record, index, 'transfer')} >转办</Button>) : ''
                            }
                            {
                                (!!isShowDelegateBtn(businessKey, taskDefinitionKey, procDefinitionKey) && !!Constant.BUSITODOTASK_INDEX_DELEGATE) ? (<Button className="process-list-default pandora-btn-fontsize" onClick={_this.toTransfer(record, index, 'delegateTask')} >委派</Button>) : ''
                            }
                        </div>
                    );
                }
            },
        },
    };
};

export { defaultConfig };
