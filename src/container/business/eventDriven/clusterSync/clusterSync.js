import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table, Collapse, message } from 'antd';
import moment from 'moment';
import { randomNamber } from './../../../../util/publicFuc';
import SelectSubModule from  "../../../../component/selectSubModule/selectCommonSubModule"
import $fetch from '$fetch';


// import './../../../common/style/index.less';
import './clusterSync.less';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class ClusterSync extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    constructor() {
        super();
        this.state = {
            loading: false,
            dataCluster: [],
            data: [],
            dataWuliCluster: [],
            logicClusterId: '',
            module4Data: [],
            param: {},
            pagination: {
                pageSize: 10,
                pageSizeChanger: true,
                current: 1
            },

        };
    }
    componentDidMount() {
        this.queryCluster()


    }

    queryCluster = () => {
        let reqSeqNo = randomNamber();
        this.setState({ loading: true });

        let params = {

            reqSeqNo: reqSeqNo
        }

        $fetch({
            url: '/tesla-gateway-console-app/eda/queryEdaClusterList',
            data: {
                ...params
            }
        }).then((res) => {

            let data1 = res.reply.queryClusterList.clusterList
            let arr1 = data1.map((item, index) => {
                return item.clusterName
            })

            let arr2 = data1.map((item, index) => {
                return item.middlewareEngName
            }).filter((item, index, self) => {
                return self.indexOf(item) === index;
            })

            this.setState({
                dataWuliCluster: arr1,
                dataCluster: arr2
            })
        }).catch(error => {



        });

    }
    queryWuliCluster = () => {
        let reqSeqNo = randomNamber();
        this.setState({ loading: true });

        let params = {

            reqSeqNo: reqSeqNo,
            middlewareEngName: this.state.logicClusterId
        }

        $fetch({
            url: '/tesla-gateway-console-app/eda/queryEdaMiddlewareDetail',
            data: {
                ...params
            }
        }).then((res) => {
            let arr = res.reply.edaMiddleware.list
            let data = arr.map((item, index) => {
                return item.clusterName
            })
            this.setState({
                dataWuliCluster: data,

            })
        }).catch(error => {



        });

    }
    changeFirst = (e) => {
        this.props.form.resetFields(['physicalClusterId']);
        this.setState({
            logicClusterId: e
        }, () => {
            this.queryWuliCluster()
        })
    }

    onRef = (ref) => {
        this.child = ref
    }
    click = (e) => {
        this.child.forDate()
        //console.log('209');
    }
    onChildQuery = (map) => {
      this.props.form.resetFields(["consumerId"]);
        if(map===""){
          this.setState({
            module4Data: []
          })
          return;
        }

        let subModuleId = map
        let reqSeqNo = randomNamber();
        $fetch({
            url: '/tesla-gateway-console-app/eda/queryEdaConsumerListByParam',
            data: { subModuleId: subModuleId, clusterId: '', reqSeqNo: reqSeqNo }
        }).then(res => {

            let arr = res.reply.consumerList.consumerList
            let data = arr.map((item, index) => {
                return item.consumerId
            })

            this.setState({
                module4Data: data,
                loading: false
            });

        });
    }
    onSearch = () => {
        this.props.form.validateFields((err, value) => {
            if (err) {

                return false;
            } else {
                console.log(111);
                this.setState({
                    a: true,
                })
                this.tongbu(value)

            }
        })
    }
    tongbu = (value) => {
        console.log(222);
        let reqSeqNo = randomNamber();
        let param = {
            logicClusterId: value.logicClusterId,
            physicalClusterId: value.physicalClusterId,
            consumerId: value.consumerId,
            reqSeqNo
        }
        $fetch({
            url: '/tesla-gateway-console-app/eda/syncClusterData',
            data: { ...param }
        }).then(res => {
            let par = res.reply.result.result
            this.setState({
                a: false,
            })
            this.messages(par)

        }).catch(error => {

            this.setState({ a: false, });

        });
    }
    messages = (par) => {
        let _this = this;
        Modal.confirm({
            title: "状态",
            content: <div>
                {par}

            </div>,
            onOk() {
                _this.chongzhi()
                _this.setState({
                    clear: true
                })
            },
            onCancel() {
                message.info('取消');
            },
        });
    }
    chongzhi = () => {
        this.props.form.resetFields(['consumerId']);
        this.props.form.resetFields(['logicClusterId']);
        this.props.form.resetFields(['physicalClusterId']);
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 10 }
        }
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="clusterSync">
                <div className="maskc" style={{ display: this.state.a ? 'block' : 'none' }}></div>
                <div className="maskc1" style={{ display: this.state.a ? 'block' : 'none' }}>正在同步...</div>
                <SelectSubModule callbackParent={this.onChildQuery} >
                </SelectSubModule  >
                <Form>
                    <FormItem label="消费者id:"  {...formItemLayout} >

                        {getFieldDecorator('consumerId', {
                            initialValue: '',
                            rules: [

                                {
                                    required: false,
                                    message: '请输入 consumerId'
                                },
                            ],
                        })(

                            <Select showSearch   >
                                {
                                    (JSON.stringify(this.state.module4Data) != '[]') ? this.state.module4Data.map((item) => {

                                        return (
                                            <Option value={item} >{item}</Option>
                                        )
                                    }) : null
                                }

                            </Select>

                            )}

                    </FormItem>
                    <FormItem label="逻辑集群ID"  {...formItemLayout} >

                        {getFieldDecorator('logicClusterId', {
                            initialValue: '',
                            rules: [

                                {
                                    required: true,
                                    message: '请输入logicClusterId'
                                },
                            ],
                        })(

                            <Select onChange={this.changeFirst}>
                                {
                                    JSON.stringify(this.state.dataCluster) != '[]' ? this.state.dataCluster.map((item) => {

                                        return (
                                            <Option value={item} >{item}</Option>
                                        )
                                    }) : null
                                }

                            </Select>

                            )}

                    </FormItem>
                    <FormItem label="物理集群ID"  {...formItemLayout} >

                        {getFieldDecorator('physicalClusterId', {
                            initialValue: '',
                            rules: [

                                {
                                    required: false,
                                    message: '请输入physicalClusterId'
                                },
                            ],
                        })(

                            <Select>
                                {
                                    JSON.stringify(this.state.dataWuliCluster) != '[]' ? this.state.dataWuliCluster.map((item) => {

                                        return (
                                            <Option value={item} >{item}</Option>
                                        )
                                    }) : null
                                }

                            </Select>

                            )}

                    </FormItem>

                </Form>
                <Button type='primary' onClick={this.onSearch} style={{ height: '32px', marginBottom: '20px' }}>同步</Button>
                <br></br>

            </div>

        )
    }
}
export default Form.create()(ClusterSync)