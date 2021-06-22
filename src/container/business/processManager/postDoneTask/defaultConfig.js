import React, { Component } from 'react';
import { Button } from 'antd';
import moment from 'moment';
import Constant, { BACKSTAGE_PROJ_NAME } from './../../../../constant/index';
import $fetch from '$fetch';
import { authStore } from './../../../../util/store';
const defaultConfig = ($this) => {
    const _this = $this;
    const user = authStore.get(Constant.AUTH_USER_INFO);
    const userId = user['userId'];
    return {
        PANDORA_QUERY: {
            taskId: {
                render: (text, record, index) => {
                    return (
                        <a href="javascript:;" onClick={_this.toTaskDetail(record)}>{text}</a>
                    );
                }
            },
            assignee: {
                render: (text, record, index) => {
                    let assignee = record['USERNAME'];
                    return (
                        <p>{assignee}</p>
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
            operationAdd: {
                render: (text, record, index) => {
                    return (
                        <div>
                            <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toViewDiagram(record, index)} >查看流程图</Button>
                        </div>
                    );
                }
            },
        },
        PANDORA_ADMIN: {
            taskId: {
                render: (text, record, index) => {
                    return (
                        <a href="javascript:;" onClick={_this.toTaskDetail(record)}>{text}</a>
                    );
                }
            },
            assignee: {
                render: (text, record, index) => {
                    let assignee = record['USERNAME'];
                    return (
                        <p>{assignee}</p>
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
            operationAdd: {
                render: (text, record, index) => {
                    return (
                        <div>
                            <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toViewDiagram(record, index)} >查看流程图</Button>
                        </div>
                    );
                }
            },
        },
        SM_QUERY_OTP_ADMIN: {
            taskId: {
                render: (text, record, index) => {
                    return (
                        <a href="javascript:;" onClick={_this.toTaskDetail(record)}>{text}</a>
                    );
                }
            },
            assignee: {
                render: (text, record, index) => {
                    let assignee = record['USERNAME'];
                    return (
                        <p>{assignee}</p>
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
            operationAdd: {
                render: (text, record, index) => {
                    return (
                        <div>
                            <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toViewDiagram(record, index)} >查看流程图</Button>
                        </div>
                    );
                }
            },
        },
        SM_AUTH_QUERY_HRORG: {
            taskId: {
                render: (text, record, index) => {
                    return (
                        <a href="javascript:;" onClick={_this.toTaskDetail(record)}>{text}</a>
                    );
                }
            },
            assignee: {
                render: (text, record, index) => {
                    let assignee = record['USERNAME'];
                    return (
                        <p>{assignee}</p>
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
            operationAdd: {
                render: (text, record, index) => {
                    return (
                        <div>
                            <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toViewDiagram(record, index)} >查看流程图</Button>
                        </div>
                    );
                }
            },
        }
    };
};

export { defaultConfig };
