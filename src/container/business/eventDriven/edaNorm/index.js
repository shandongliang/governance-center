import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';

import $fetch from '$fetch';

// import './../../../common/style/index.less';
import './index.less';

export default class EdaNorm extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    render() {

        return (
            <div className="edaNorm" style={{ height: 'auto' }}>
                <div className="norm">
                    <div className="normTop">
                        <div className="normTopCenter">规范说明文档</div>
                        <div className="normTopRight"></div>
                        <div className="normTopLeft"></div>
                    </div>
                    <div className="normBottom">
                        <h2 style={{ marginBottom: '30px' }}>各位专家好！</h2>
                        <p>以下事件驱动开发规范向前兼容，对已经配置或者上线的应用无影响，即原有模块、服务单元、主题均可延续使用。后续治理中心在主题创建时进行强制校验。请有条件的项目组，尽早按照该规范执行，非常感谢配合！</p>
                        <h3>模块编号编制规范：</h3>
                        <p>模块编号共3位，直接使用资产库系统编号。</p>
                        <h3>服务单元编号编制规范：</h3>
                        <p>使用驼峰制编写，不能包括下划线、上划线和中划线等特殊字符，总共不超过30位。其中前3位为所属模块编号， 后不超过27位为模块内业务内部分类编号。服务单元划分原则为对模块功能使用微服务思想，根据业务高内聚低耦合的方式进行划分。</p>
                        <h3>主题命名规范：</h3>
                        <p>使用驼峰制编写，不能包括下划线、上划线和中划线等特殊字符，总共不超过60位。其中前面为所属服务单元编号， 后面为自定义名称，建议自定义名称包含业务类别和业务识别名称。</p>
                        <h3>事件编号（EventID）规范：</h3>
                        <p>各模块在消息生产或消费时，将eventId按照行内统一32位渠道流水号处理，最好直接使用触发事件的交易的流水号进行生成，即前23位不变，更改后9位。即系统号1（3位）+节点（2位）+时间（8位YYYYMMDD）+10位序号 +系统号2（3位）+6位序号。
上下游系统在进行消息生产、消费、再生产时，前23位保持不变，更换后9位（即其中系统号2换成本系统的系统编号），这样在全链路跟踪时，能够根据前23位流水号串联起一个完整消息触发及消费的路径。
</p>
                        <p>如果流水号规则可以满足业务唯一识别要求，建议应用的bussinessKey直接使用事件编号同一规范。</p>
                        <div>
                            <span style={{ color: 'red' }}>
                                注释:
                            </span>
                            <span >&nbsp;&nbsp; eventId在应用没有传的情况下，我们会自动生成（主要用于自动任务触发的事件类场景）；如果应用传了就会直接使用（这个是面对交易触发的事件类场景，这样交易线和事件线是统一的）。因为全链路跟踪是个技术问题，eventId就是从技术角度设计用来作为交易线和事件线统一的技术跟踪识别号。而bussinessKey是从业务的角度设计的，业务可以根据自身的业务设计需要定制自己有含义的自身唯一标识，同时不要求全链路唯一。</span>
                        </div>


                    </div>
                </div>

            </div>

        )
    }
}
