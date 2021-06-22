import React from 'react';
import { Button } from 'antd';
import moment from 'moment';
import Constant from './../../../../constant/index';
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
                    let assignee = record.assignee;

                    if (!assignee) {
                        return (
                            <div>
                                <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toSign(record)}>签收</Button>
                            </div>
                        );
                    } else if (assignee == userId) {
                        return (
                            <div>
                                <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toSignOut(record)}>反签收</Button>
                            </div>
                        );
                    } else {
                        return (
                            <div>
                                <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toForceSignIn(record)}>强行签收</Button>
                            </div>
                        );
                    }
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
                    let assignee = record.assignee;

                    if (!assignee) {
                        return (
                            <div>
                                <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toSign(record)}>签收</Button>
                            </div>
                        );
                    } else if (assignee == userId) {
                        return (
                            <div>
                                <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toSignOut(record)}>反签收</Button>
                            </div>
                        );
                    } else {
                        return (
                            <div>
                                <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toForceSignIn(record)}>强行签收</Button>
                            </div>
                        );
                    }
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
                    let assignee = record.assignee;

                    if (!assignee) {
                        return (
                            <div>
                                <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toSign(record)}>签收</Button>
                            </div>
                        );
                    } else if (assignee == userId) {
                        return (
                            <div>
                                <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toSignOut(record)}>反签收</Button>
                            </div>
                        );
                    } else {
                        return (
                            <div>
                                <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toForceSignIn(record)}>强行签收</Button>
                            </div>
                        );
                    }
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
                    let assignee = record.assignee;

                    if (!assignee) {
                        return (
                            <div>
                                <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toSign(record)}>签收</Button>
                            </div>
                        );
                    } else if (assignee == userId) {
                        return (
                            <div>
                                <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toSignOut(record)}>反签收</Button>
                            </div>
                        );
                    } else {
                        return (
                            <div>
                                <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toForceSignIn(record)}>强行签收</Button>
                            </div>
                        );
                    }
                }
            },
        }
    };
};

export { defaultConfig };
