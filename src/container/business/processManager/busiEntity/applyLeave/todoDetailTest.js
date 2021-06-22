import React, { Component } from 'react';
import { Button, Checkbox } from 'antd';
import { Form, Row, Col, Input, Table ,version} from 'antd';
import wrapAuth, { getEleTypeList } from './../../../../../util/HOC';
import './../../../../common/style/index.less';
import FileUploadTable from '../../../../../component/FileUploadTable/FileUploadTable';
import { BACKSTAGE_PROJ_NAME } from './../../../../../constant/index';
import './index.less'

const FormItem = Form.Item;
let AntButton = Button;
const PandoraButton = wrapAuth(AntButton, "userTask");
const { TextArea } = Input;


class InnerBusiManagerTodoDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            busiFormisNotValidated: false,
        }
        // 自定义批注输入的字数限制及提示信息，属性名必须叫postilMaxLen和postilMessage，属性值是数字和字符串，两个都是非必填
        this.postilMaxLen = 5
        this.postilMessage = '字数太多了'
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    handleChange = () => { }

    displayField = (displayType, name, valueRange) => {
        let antdVersion = version.split('.')[0];
		let $TextArea;
		let $disTextArea;
		if (antdVersion == "2") {
			$TextArea = <Input type="textarea" autosize={{ minRows: 1 }} style={{ width: 210 }} />;
			$disTextArea = <Input type="textarea" disabled autosize={{ minRows: 1 }} style={{ width: 210 }} />;
		} else if (antdVersion == "3") {
			$TextArea = <TextArea autoSize={{ minRows: 1 }} style={{ width: 210 }} />;
			$disTextArea = <TextArea disabled autoSize={{ minRows: 1 }} style={{ width: 210 }} />;
		}
        switch (displayType) {
            case 'TEXT_true': {
                return (
                    <Input style={{ width: 210 }} />
                )
            }
            case 'TEXT_false': {
                return (
                    <Input disabled style={{ width: 210 }} />
                )
            }
            case 'TEXTAREA_true': {
                return $TextArea;
            }
            case 'TEXTAREA_false': {
                return $disTextArea;
            }
        }
    }

    // 是否隐藏整个条目
    isHiddenCurrentEle = (currentEleId, permEleList) => {
        for (let i = 0; i < permEleList.length; i++) {
            if (permEleList[i].eleId == currentEleId) {
                if (permEleList[i].eleType === "hidden") {
                    return { display: 'none' };
                } else if (permEleList[i].eleType === "readonly" || permEleList[i].eleType === "disabled" || permEleList[i].eleType === "show") {
                    return { display: 'block' };
                }
            }
        }
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 17 }
        }
        const { getFieldDecorator } = this.props.form;
        const formData = this.props.formData || {};
        const eleList = this.props.eleList;
        let attachmentType;
        eleList && eleList.forEach((item) => {
            item.eleId == "attachment" ? attachmentType = item.eleType : null
        })
        let attachmentList = formData.attachmentList || {}
        for (let k in attachmentList) {
            if (Object.prototype.toString.call(attachmentList[k]) == '[object Array]') {
                attachmentList[k] = attachmentList[k].map(item => { return { ...item, uploadUser: item.uploadUser.slice(-2) } })
            }
        }
        const leaveReasonTypeList = getEleTypeList('leaveReason', '', 'userTask');
        let leaveReason = '';
        for (let i = 0; i < leaveReasonTypeList.length; i++) {
            if (leaveReasonTypeList[i] === "disabled") {
                leaveReason = (<a href="#" disabled>请假原因</a>)
            }
        }
        return (
            <Row>
                <Row>
                    <Col span={7} offset={1} style={this.isHiddenCurrentEle('leaveReason', eleList)}>
                        {leaveReason}
                        <PandoraButton className="PandoraTodoBtn" id="leaveReason" >创建function-disabled</PandoraButton>
                    </Col>
                </Row>
                <Row>
                    <Col span={7} offset={1} style={this.isHiddenCurrentEle('leaveName', eleList)}>
                        <PandoraButton className="PandoraTodoBtn noBorder" id="leaveName" >创建菜单-readonly</PandoraButton>
                    </Col>
                </Row>
                <Row>
                    <Col span={7} offset={1} style={this.isHiddenCurrentEle('leaveDay', eleList)}>
                        <PandoraButton className="PandoraTodoBtn create" id="leaveDay" >创建菜单-show</PandoraButton>
                    </Col>
                </Row>


                {/* 流程启动点 */}
                {this.props.triggerPointComponent}

                {/* 批注 */}
                {this.props.postil}

                <FileUploadTable
                    parentRef={this}
                    attachmentName='attachment'
                    type={attachmentType}
                    fileListData={attachmentList['attachment']}
                    deleteApi={'/' + BACKSTAGE_PROJ_NAME + '/gencode/deleteFile'}
                    downLoadApi={'/' + BACKSTAGE_PROJ_NAME + '/gencode/downLoadFile.download'}
                    deleteWhenSubmit={true}>
                </FileUploadTable>

                <Row>
                    <Col span={7} offset={1} style={{ display: 'none' }}>
                        <FormItem {...formItemLayout} label='用于判断业务表单数据验证是否通过:'>
                            {getFieldDecorator('busiFormisNotValidated', {
                                initialValue: this.state.busiFormisNotValidated,
                            })(
                                <input type="hidden" />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={7} offset={1} style={{ display: 'none' }}>
                        <FormItem {...formItemLayout} label='用于给后续节点变量赋值或判断流程走向:'>
                            {getFieldDecorator('variables', {
                                initialValue: {}
                            })(
                                <Input type="hidden" />
                            )}
                        </FormItem>
                    </Col>
                </Row>

            </Row>
        );
    }
}

const BusiManagerTestTodoDetail = Form.create()(InnerBusiManagerTodoDetail);

export { BusiManagerTestTodoDetail };

