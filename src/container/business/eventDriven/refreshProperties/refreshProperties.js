import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import G6 from '@antv/g6'
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs } from 'antd';
import { Form, Row, Col, Input, Table } from 'antd';

import { randomNamber } from './../../../../util/publicFuc';
import $fetch from '$fetch';

// import './../../../common/style/index.less';

// import { useRouterHistory } from '../../../../../node_modules/_react-router@2.8.1@react-router/lib';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Search = Input.Search
let height = window.innerHeight
export default class RefreshProperties extends Component {
    static contextTypes = {
        router: PropTypes.any
    }
    constructor() {
        super();
        this.state = {
            loading: false,
            data: [],
            param: {},
            visible: false,

        };
    }
    componentDidMount() {



    }




    changeSearch = (e) => {
        //console.log('287', e.target.value);
        this.setState({
            searchValue: e.target.value
        })
    }
    onSearch = () => {
        let reqSeqNo = randomNamber()
        $fetch({
            url: '/tesla-gateway-console-app/eda/refreshProperties',
            data: { reqSeqNo }

        }).then((res) => {
            if (res.reply.returnCode.type == "S") {
                let val = res.reply.result.result.split('{')[1].split('}')[0].split(',')


                this.setState({
                    visible: true,
                    val: val
                })
            }

        })
    }
    handleok = () => {
        this.setState({
            visible: false,
            data: this.state.val
        })
    }

    render() {


        return (
            <div className="refreshProperties">


                <Button type='primary' onClick={this.onSearch} style={{ height: '32px' }}>??????????????????</Button>
                <Modal
                    visible={this.state.visible}
                    title='??????'
                    onOk={this.handleok}
                    footer={[
                        <Button key='submit' type='primary' onClick={this.handleok}>??????</Button>

                    ]}
                >
                    <div style={{ height: '36px', lineHeight: '36px', paddingLeft: '80px' }}>
                        ???????????????
                                        </div>
                </Modal>
                {
                    this.state.data ? this.state.data.map((item) => {
                        return (
                            <div style={{ paddingLeft: '20px', paddingTop: '5px' }}>
                                <span>{item}</span>
                            </div>
                        )
                    }) : null
                }

            </div>

        )
    }
}
