import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input, Table, Spin, Tooltip } from 'antd';
import { randomNamber } from '../../../../util/publicFuc';
import $fetch from '$fetch';
import { $uploadfile } from '$fetch';
import UploadIE from '../../../../component/upload-ie/index';
import 'jqueryForm';
import { downloadSubmoduleExcelTemplate, importSubmoduleConfigExcel, downloadSubmoduleSimplifyExcelTemplate } from '../requestA/service'
import { goTo, goToAndClose } from '../../../../util/tabRouter';

// import './../../../common/style/index.less';
// import './serviceRelationShipUpload.less';
const FormItem = Form.Item;

export default class ExcelSubModuleUpload extends Component {
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
class SubModuleExcelUpload extends React.Component {

    static contextTypes = {
        router: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            uploading: false,
            flag: false,
            errorData: [],
            visible: false,
            columns: [
                {
                    title: '模块编码',
                    dataIndex: 'moduleCode',
                    width: 50,
                    align: 'center',
                    key: 'moduleCode'
                },
                {
                    title: '服务单元编码',
                    dataIndex: 'subModuleCode',
                    width: 50,
                    align: 'center',
                    key: 'subModuleCode'
                },
                {
                    title: '服务单元名称',
                    dataIndex: 'subModuleName',
                    width: 50,
                    align: 'center',
                    key: 'subModuleName'
                },
                {
                    title: '计划上线日期',
                    dataIndex: 'planTime',
                    width: 50,
                    align: 'center',
                    key: "planTime"
                },
                {
                    title: '错误数据',
                    dataIndex: 'errorData',
                    width: 70,
                    align: 'center',
                    // key: "errorData",
                    render: (text, record, index) => {
                        if (text) {
                            if(text.length > 10) {
                                return (
                                    <Tooltip title = {text}>
                                        <span>{text.substring(0,10)+'...'}</span>
                                    </Tooltip>
                                );
                            } else {
                                return (
                                    <span>{text}</span>
                                );
                            }
                        } else {
                            <span>{''}</span>
                        }
                    }
                }
            ]
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

    /*  IE上传逻辑，使用jquery-form插件实现 ，支持IE9+  */
    uploadIE = (param) => {
        let reqSeqNo = randomNamber()
        const _this = this;
        let store = sessionStorage.getItem('$pandora_auth.user_info')
        let userId = JSON.parse(store).userId
        if (JSON.stringify(fileList) == '[]') {
            this.setState({
                flag: true
            })
            return false
        }
        let option = {
            url: "/tesla-approve-console-app/approve/importSubmoduleConfigExcel",
            type: "POST",
            data: { ...param, reqSeqNo: reqSeqNo, updUserName: userId },
            dataType: "json",
            header: {},
            success: function (data) {
                let returnType = data.reply.flag;
                let code = data.reply.returnCode.code;
                // let message = data.reply.returnCode.message;
                let errorMsg = returnType + ":" + code
                if (returnType === "success") {
                    // 清空： 文件列表 、所有已经点选过的type=file的input
                    $(".file-list").empty();
                    $(".input-container .selected").remove();
                    // 清空表单域
                    _this.handleResetForm();
                    Modal.success({
                        title: "上传成功！",
                        onOk:()=>{
                            _this.tofuncManage()
                        }
                    });
                } else {
                    // Modal.success({
                    //     loading: false,
                    //     title: '上传失败',
                    //     content:(res.reply.result.desc)
                    // });
                    let errorData = res.reply.result.result.map(item=>{
                        return {
                            ...item.submoduleConfig,
                            errorData: item.errorData
                        }
                    })
                   _this.setState({
                       errorData,
                       visible: true
                   })
                }
                
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                Modal.warning({
                    title: errorThrown,
                });
            },
            /*
            广播上传进度：
            实时更新上传进度，部分浏览器可能不支持
            参数：
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
        };
        $("#formId").ajaxSubmit(option);
        return false;
    }

    /* 重置表单 */
    handleResetForm = () => {
        this.props.form.resetFields();
    }

    /*  chrome上传逻辑，使用ant-design的Upload组件实现  ，不兼容IE */
    uploadAntd = (param) => {
        const formData = new FormData();
        const { fileList } = this.state;
        console.log("param",param);
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
        // 遍历文件列表，并将其存放到FormData对象中，通过FormData对象向后台传递文件流
        fileList.forEach((file) => {

            formData.append('importExcel', file);
            formData.append('reqSeqNo', reqSeqNo);
            formData.append('updUserName', userId);
        });

        for (let key in param) {
            formData.append(key, param[key]);
        }
        // this.setState({ uploading: true });

        importSubmoduleConfigExcel(formData).then(res => {
            let _this = this;           
            if (res.reply.returnCode.type == "S") {               
                if(res.reply.result.flag =='success'){
                    Modal.success({
                        loading: false,
                        title: '上传成功',
                        content:(res.reply.result.desc),
                        onOk:()=>{
                            _this.tofuncManage()
                        }
                    });
                    // 清空表单域
                    _this.handleResetForm();
                    _this.setState({
                        fileList: [],
                        uploading: false,
                        flag: false
                    });
                } else {
                    // Modal.success({
                    //     loading: false,
                    //     title: '上传失败',
                    //     content:(res.reply.result.desc)
                    // });
                    let errorData = res.reply.result.result.map(item=>{
                        return {
                            ...item.submoduleConfig,
                            errorData: item.errorData
                        }
                    })
                   _this.setState({
                       errorData,
                       visible: true
                   })
                }   
            }            
        }, res => {
            _this.setState({
                uploading: false,
                flag: false
            });
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err) => {
            if (!err) {
                this.setState({ loading: true });
                let param = this.state.fileList;
                // 在提交表单的过程中，判断浏览器是否支持FormData对象，如果支持则调用Antd的文件上传逻辑，否则调用IE的文件上传逻辑
                if (!window.FormData) {
                    this.uploadIE(param);
                } else {
                    this.uploadAntd(param);
                }
            }
        })
    }
    handleChange = (info) => {

        let fileList = info.fileList;
        this.setState({
            fileList: fileList.slice(-1)
        })
    }

    tofuncManage = () => {
      let path = {
        pathname: '/approve/subModule/index'
      };
      goToAndClose(path, "服务单元查询");
    }

    download = () => {
        downloadSubmoduleExcelTemplate().then(res => {})
    }

    downloadSimple = () => {
      downloadSubmoduleSimplifyExcelTemplate().then(res => {})
  }

    closeModal = () => {
        this.setState({
            visible: false,
            errorData: []
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
                this.setState({
                    fileList: [file],
                    flag: false
                });

                return false; // 手动上传文件
            },

            fileList: this.state.fileList,
        }
        return (
            // 必须为表单设置encType="multipart/form-data"、id属性
            <div className='serviceUpload'>
                <Modal 
                    title='错误信息'
                    visible={this.state.visible}
                    onCancel={this.closeModal}
                    onOk={this.closeModal}
                    footer={null}
                    style={{ padding: '20px 0' }}
                >
                    <Table 
                        columns={this.state.columns}
                        dataSource={this.state.errorData}
                        pagination={false}
                        style={{ padding: 10 }}
                        rowKey={record=>record.serviceCode+record.serviceVersion+record.subModuleCode+
                                        record.nextSubModuleCode+record.nextServiceCode+record.nextServiceVersion}
                    />
                </Modal>
                <Form onSubmit={this.handleSubmit} encType="multipart/form-data" id="formId">
                <Row>
                  <Col span={12}>
                    <Row>
                        <Col span={20} offset={1}>
                            <Button onClick={this.downloadSimple} type='primary' size="large" style={{borderRadius:5, backgroundColor: "#35b5a1", borderColor: "#35b5a1", marginRight: 35 }}>
                                    <Icon type="download" />下载简易导入模版
                                </Button> 
                                <Button onClick={this.download} type='primary' size="large" style={{borderRadius:5 }}>
                                    <Icon type="download" />下载导入模版
                                </Button>   
                        </Col>
                    </Row>
                    <Spin spinning={this.state.uploading} >
                        <Row style={{marginTop: 20}}>
                            <Col span={20} offset={1}>
                                {window.FormData ? (                                   
                                    <FormItem className="file-upload" {...formItemLayout} label='Excel类型文件上传'>
                                        <Upload name="logo" {...props} listType="text" fileList={this.state.fileList} >
                                            <Button>
                                                <Icon type="upload" />选择文件
                                            </Button>
                                        </Upload>
                                        <div style={{ display: this.state.flag ? 'block' : 'none', color: 'red' }}>请选择要上传的文件</div>
                                    </FormItem>
                                ) : (                                        
                                    <FormItem className="file-upload" {...formItemLayout} label='Excel类型文件上传'>
                                        <UploadIE />
                                        <div style={{ display: this.state.flag ? 'block' : 'none', color: 'red' }}>请选择要上传的文件</div>
                                    </FormItem>
                                    )}
                            </Col>
                        </Row>
                    </Spin>
                    <Row >
                        <Col span={20} offset={1}>
                            <FormItem >
                                <Button htmlType="submit" style={{borderRadius:5 }} className="subBtn operatorBtn" >提交</Button>
                                <Button onClick={this.tofuncManage} className="cancelBtn" style={{marginLeft: 20, borderRadius:5 }}>取消</Button>
                            </FormItem>
                        </Col>
                    </Row>
                    </Col>
                    <Col span={12}>注：简化模版与原模版区别在于简化模版使用默认的访问控制策略，负载均衡策略多活架构策略；如果自定义策略请使用原模版。</Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
const WrapperFileUpload = Form.create()(SubModuleExcelUpload);