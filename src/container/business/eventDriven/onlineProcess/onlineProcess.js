
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';

import $fetch from '$fetch';

// import './../../../common/style/index.less';
import './onlineProcess.less';

export default class onlineProcess extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    render() {

        return (
            <div className="onlineProcess" style={{ height: 'auto' }}>
                <div className="norm">
                    <div className="normTop">
                        <div className="normTopCenter">应用对接上线流程</div>
                        <div className="normTopRight"></div>
                        <div className="normTopLeft"></div>
                    </div>
                    <div className="normBottom">
                        <p>1、开通与大禹治理zk服务器、kafka两套broker的网络访问关系;</p>
                        <p>2、确保SDK版本在1.0.6以上，如不是，请联系升级事项;</p>
                        <p>3、确定应用是否是多活部署，如果是isLdcApp=Y；如果不是isLdcApp=N；（如果配置为N，请配置defaultLdcId；如果配置为Y，应用需要在不同部署机房，通过环境变量或者JVM启动参数指定ldcId）</p>
                        <p>4、确定应用是否是可靠发送、幂等消费，如果是可靠发送、幂等消费，需根据数据库类型和历史数据的清理策略确定相应的数据库表结构和使用模式；</p>
                        <p>5、确定zk_config.properties文件的读取方式，zk地址需变更为生产地址；envirement_type配置项删除；</p>
                        <p>6、如果使用了消息标签过滤功能，消费端确保配置对应的filterTags；</p>
                        <p>7、确定应用所使用的服务单元名、主题、生产者、消费者、发送关系以及消费订阅关系，方便导出（该项需要与EDA项目组邮件沟通核对）</p>


                    </div>
                </div>

            </div>

        )
    }
}
