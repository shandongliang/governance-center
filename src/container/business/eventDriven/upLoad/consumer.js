import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table, Spin } from 'antd';
import { randomNamber } from './../../../../util/publicFuc';
import $fetch from '$fetch';
import { $uploadfile } from '$fetch';
import UploadIE from '../../../../component/upload-ie/index';
import 'jqueryForm';

// import './../../../common/style/index.less';
import './index.less';
const FormItem = Form.Item;

export default class Consumer extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    render() {

        return (
            <div className="homepage">
                <div className="textbox">

                    <WrapperFileUpload></WrapperFileUpload>
                </div>

            </div>

        )
    }
}
class ConsumerFileUpload extends React.Component {

    static contextTypes = {
        router: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            uploading: false,
            flag: false
        }
    }

    displayField = (displayType, name, valueRange) => {
        switch (displayType) {
            case 'TEXT': {
                return (
                    <Input style={{ width: 200 }} />
                )
            }
            case 'TEXTAREA': {
                return (
                    <Input type="textarea" style={{ width: 500, height: 65 }} />
                );
            }
            case 'UPLOAD': {
                return (
                    <Upload >
                        <Button type="ghost">
                            <Icon type="upload" /> Upload
                       </Button>
                    </Upload>
                );
            }
        }
    }
    toManage = () => {
    }

    /*  IE?????????????????????jquery-form???????????? ?????????IE9+  */
    uploadIE = (param) => {
        let reqSeqNo = randomNamber()
        const _this = this;
        if (JSON.stringify(fileList) == '[]') {
            this.setState({
                flag: true
            })
            return false
        }
        let option = {
            url: "/tesla-gateway-console-app/eda/importConsumerExcel",
            type: "POST",
            data: { ...param, reqSeqNo: reqSeqNo },
            dataType: "json",
            header: {},
            success: function (data) {
                let returnType = data.reply.returnCode.type;
                let code = data.reply.returnCode.code;
                let message = data.reply.returnCode.message;
                let errorMsg = returnType + ":" + code + ":" + message;
                if (returnType == "S") {
                    // ????????? ???????????? ???????????????????????????type=file???input
                    $(".file-list").empty();
                    $(".input-container .selected").remove();
                    // ???????????????
                    _this.handleResetForm();
                    Modal.success({
                        title: "???????????????",
                    });
                }
                if (returnType == "E") {
                    Modal.warning({
                        title: errorMsg,
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                Modal.warning({
                    title: errorThrown,
                });
            },
            /*
            ?????????????????????
            ?????????????????????????????????????????????????????????
            ?????????
            1) event (the browser event)
            2) position (integer)
            3) total (integer)
            4) percentComplete (integer)
            */
            uploadProgress: function (event, position, total, percentComplete) {
                if (percentComplete == 100) {
                    _this.setState({
                        uploading: false,
                        flag: false
                    });
                } else {
                    _this.setState({
                        uploading: true,
                        flag: false
                    });
                }
            }

            // ??????????????????????????????????????????,????????????null
            // clearForm: true,

            // ?????????????????????????????????,????????????null
            // resetForm: true,
        };
        $("#formId").ajaxSubmit(option);
        return false;
    }

    /* ???????????? */
    handleResetForm = () => {
        this.props.form.resetFields();
    }

    /*  chrome?????????????????????ant-design???Upload????????????  ????????????IE */
    uploadAntd = (param) => {
        const formData = new FormData();
        const { fileList } = this.state;
        if (JSON.stringify(fileList) == '[]') {
            this.setState({
                flag: true
            })
            return false
        }
        const _this = this;
        let reqSeqNo = randomNamber()
        let store = sessionStorage.getItem('$pandora_auth.user_info')
        let userId = JSON.parse(store).userId
        // ???????????????????????????????????????FormData??????????????????FormData??????????????????????????????
        fileList.forEach((file) => {
            console.log('222', file)
            formData.append('importExcel', file);
            formData.append('reqSeqNo', reqSeqNo);
            formData.append('userId', userId);
        });
        console.log('111111111', fileList)
        console.log('111111111', formData)
        for (let key in param) {
            formData.append(key, param[key]);
        }
        this.setState({ uploading: true });
        console.log('formData', formData)
        $uploadfile({
            url: '/tesla-gateway-console-app/eda/importConsumerExcel',
            data: formData
        }).then(res => {
            console.log('res', res)
            if (res.reply.returnCode.type == "S") {
                Modal.success({
                    title: res.reply.Result.result,
                });
                // ???????????????
                _this.handleResetForm();
                _this.setState({
                    fileList: [],
                    uploading: false,
                    flag: false
                });
            };
        }, res => {
            _this.setState({
                uploading: false,
                flag: false
            });
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ loading: true });
                let param = this.state.filtList;
                console.log('param', param)
                // ?????????????????????????????????????????????????????????FormData??????????????????????????????Antd????????????????????????????????????IE?????????????????????
                if (!window.FormData) {
                    this.uploadIE(param);
                } else {
                    this.uploadAntd(param);
                }
            }
        })
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 }
        }
        const { getFieldDecorator } = this.props.form;
        const props = {
            action: '/tmpl/wenjiansc.upload',
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList
                    }
                });
            },
            beforeUpload: (file) => {
                console.log('file', file)
                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                    flag: false
                }));
                return false; // ??????????????????
            },
            fileList: this.state.fileList,
        }
        // const props = {
        //     className: 'importSvcExcel',
        //     onStart: this.handleChange,
        // }
        return (
            // ?????????????????????encType="multipart/form-data"???id??????
            <div className='uploadForm'>
                <Form onSubmit={this.handleSubmit} encType="multipart/form-data" id="formId">
                    <Spin spinning={this.state.uploading} >

                        <Row style={{ marginLeft: 20 }}>
                            <Col span={20} offset={1} style={{ display: 'block' }}>

                                {window.FormData ? (
                                    <FormItem className="file-upload" {...formItemLayout} label='?????????????????????'>
                                        <Upload name="logo" {...props} listType="text" >
                                            <Button>
                                                <Icon type="upload" />????????????
                                           </Button>
                                        </Upload>
                                        <div style={{ display: this.state.flag ? 'block' : 'none', color: 'red' }}>???????????????????????????</div>
                                    </FormItem>
                                ) : (
                                        <FormItem className="file-upload" {...formItemLayout} label='?????????????????????'>
                                            <UploadIE />
                                            <div style={{ display: this.state.flag ? 'block' : 'none', color: 'red' }}>???????????????????????????</div>
                                        </FormItem>
                                    )}

                            </Col>
                        </Row>
                    </Spin>
                    {/* <Col span={5} style={{display:'block'}}>
						<Upload {...props} filtList={this.state.filtList}>
							<Button>
								<Icon type="upload" /> <font style={{color:"#00b7ee"}}>????????????</font>
							</Button>
						</Upload>
					</Col> */}
                    <Row >
                        <FormItem wrappercol={{ span: 5, offset: 10 }}>
                            <Button htmlType="submit" className="subBtn operatorBtn" style={{ marginLeft: "50%", width: 88, fontSize: 16, borderRadius: 5 }}>??????</Button>
                            <Button onClick={this.toManage} className="cancelBtn" style={{ marginLeft: 10, width: 88, fontSize: 16, borderRadius: 5 }}>??????</Button>
                        </FormItem>
                    </Row>
                </Form>
            </div>
        );
    }
}
const WrapperFileUpload = Form.create()(ConsumerFileUpload);