import React, { Component } from 'react';
import { Button } from 'antd';
import moment from 'moment';

export const defaultConfig = ($this) => {
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
                    return (
                        <div>
                            <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toViewDiagram(record, index)} >查看流程图</Button>
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
                    return (
                        <div>
                            <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toViewDiagram(record, index)} >查看流程图</Button>
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
                    return (
                        <div>
                            <Button className="process-list-default pandora-btn-fontsize" onClick={_this.toViewDiagram(record, index)} >查看流程图</Button>
                        </div>
                    );
                }
            },
        },
    };
};
