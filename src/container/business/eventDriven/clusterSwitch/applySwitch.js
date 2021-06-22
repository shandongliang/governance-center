import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input, Table, } from 'antd';
import ApplyCreateModel from './applyModel.js'
import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';
import { randomNamber, deploy } from './../../../../util/publicFuc';
import SelectSubModule from '../../../../component/selectSubModule/selectCommonSubModule';
import './../../../common/style/index.less';
import './applySwitch.less'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
let reqSeqNo = randomNamber()
export default class ApplySwitch extends Component {
    static contextTypes = {
        router: PropTypes.any
    }

    constructor() {
        super();
        this.state = {
            loading: false,
            data: [],
            param: {},
            pagination: {
                pageSize: 10,
                pageSizeChanger: true,
                current: 1
            },
            visible: false,
            

        };
    }
    zhuangtai = (a) => {
        switch (a) {
            case 'Y': {
                return '有效'
            }
            case 'N': {
                return '无效';
            }

        }
    }




    timer = (t) => {

        return moment(t).format('YYYY-MM-DD,HH:mm:ss')
    }




    fetchData = (params) => {
        this.setState({ loading: true });
        const { current, pageSize } = params;


    };







    onChildQuery = (map) => {
        this.setState(
            map
        );
    }

    render() {
        return (
            <div>
                <div className="applySwitch">
                    <div className="portlet-tab">
                        <div className="portlet-body">
                            <div className="query-condition">
                                <WrapperQueryForm callbackParent={this.onChildQuery}></WrapperQueryForm>
                            </div>
                            <div className="role-table">
                                <div className="role-header">

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>);
    }
}

class WrapperQueryForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                current: 1,
                pageSize: 10,
            },
        }
    }
    componentDidMount() {}
    onSubmit = (map) => {
        let reqSeqNo = randomNamber()
        //console.log('170', map);
        let _this = this
        let param = map
        Modal.confirm({
            title: "状态",
            okText: '确定',
            content: <div>
                <div className='pro'>
                    <span>当前逻辑集群:</span>
                    <span>{deploy(_this.state.dataList ? _this.state.dataList.ldcId : '')}</span>
                </div>
                <div className='pro'>
                    <span>当前服务单元：</span>
                    <span>{_this.state.submoduleId}</span>
                </div>
                <div className='pro'>
                    <span>更改集群：</span>
                    <span>{deploy(param.targetLDC)}</span>
                </div>

            </div>,
            onOk() {

                $fetch({
                    url: '/tesla-gateway-console-app/eda/changeLDCForApp',
                    data: {
                        subModule: _this.state.submoduleId,
                        targetLDC: param.targetLDC,
                        reqSeqNo
                    }
                }).then((res) => {
                    //console.log('99', res);
                    if (res.reply.returnCode.type == "S") {
                        _this.setState({
                            visible: true
                        })
                    }


                })

            },
            onCancel() {
                // message.info('取消');


            },
        });




    }
    onRef = (ref) => {
        this.child = ref
    }
    click = (e) => {
        this.child.forDate()
        //console.log('209');
    }
    toClusterSwitch = () => {



        let _this = this;
        Modal.confirm({
            title: "状态",
            okText: '确定',
            content: <ApplyCreateModel

                onRef={_this.onRef} callbackParent={_this.onSubmit} />,
            onOk() {

                _this.click()

            },
            onCancel() {
                // message.info('取消');


            },
        });
    }
    handleok = () => {


        this.setState({
            visible: false
        }, () => {
            this.searchList()
        })
    }
    searchList = () => {
        let reqSeqNo = randomNamber()
        $fetch({
            url: '/tesla-gateway-console-app/eda/queryLDCForApp',
            data: {
                subModule: this.state.submoduleId,

                reqSeqNo
            }
        }).then((res) => {
            //console.log('224', res);
            if (res.reply.returnCode.type == "S") {
                this.setState({
                    dataList: res.reply.result
                })
            }


        })
    }

    handleSearch = (e) => {
      let reqSeqNo = randomNamber()
      this.setState({ loading: true });
      this.toClusterSwitch()
    }
    handleSearchBack = () => {
      let _this = this;
      Modal.confirm({
          title: "确认状态",
          okText: '确定',
          content: '请确认是否切回？',
          onOk() {
            _this.toCluster()
          },
          onCancel() {

          },
      });
    }
    toCluster = () => {
        $fetch({
            url: '/tesla-gateway-console-app/eda/changeLDCForApp',
            data: {
                subModule: this.state.submoduleId,
                targetLDC: '',
                reqSeqNo
            }
        }).then((res) => {
            //console.log('99', res);
            if (res.reply.returnCode.type == "S") {
                this.setState({
                    visible: true
                })
            }


        })
    }
    deploy1 = (v) => {
        if (v == 'M') {
            return 'M-马坡'
        }
        if (v == 'P') {
            return 'P-鹏博士'
        }
        if (v == 'Z') {
            return 'Z-郑州'
        }
        if (v == '') {
            return '同应用ldc'
        }
    }

    onChildQueryTier = submoduleId => {
      this.setState({
        submoduleId
      },()=>{
        if(submoduleId){
          this.searchList()
        }
      })
    }
    render() {

        return (
            <div>
              {/* <SelectSubModule callbackParent={this.onChildQueryTier} /> */}
              <SelectSubModule callbackParent={this.onChildQueryTier} >
                </SelectSubModule  >
                    <Button onClick={this.handleSearch} disabled={!this.state.submoduleId} type="primary" className="operatorBtn" style={{ width: 88, fontSize: 14, borderRadius: 5, marginRight: '20px' }}>切换应用</Button>
                    <Button onClick={this.handleSearchBack} disabled={!this.state.submoduleId} type="primary" className="operatorBtn" style={{ width: 88, fontSize: 14, borderRadius: 5 }}>切回</Button>
                    <Modal
                        visible={this.state.visible}
                        title='状态'
                        onOk={this.handleok}
                        footer={[
                            <Button key='submit' type='primary' onClick={this.handleok}>确定</Button>

                        ]}
                    >
                        <div style={{ height: '36px', lineHeight: '36px', paddingLeft: '80px' }}>
                            切换完成！
                                        </div>
                    </Modal>

                <div style={{ marginTop: '30px', borderTop: '1px solid #ccc', padding: '5px' }}>
                    <span style={{ marginRight: '10px' }}>ldc:</span>
                    <span style={{ color: '#ab00ff' }}>{this.state.dataList ? this.deploy1(this.state.dataList.ldcId ? this.state.dataList.ldcId : '') : ''}</span>
                </div>
                <div style={{ padding: '5px' }}>
                    <span style={{ marginRight: '10px' }}>sdk版本:</span>
                    <span style={{ color: '#ab00ff' }}>{this.state.dataList ? this.state.dataList.sdkVersion : ''}</span>
                </div>

            </div>
        );
    }
}
