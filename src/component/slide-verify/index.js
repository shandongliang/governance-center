import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, message, Table, Tabs } from 'antd';
import { Form, Row, Col, Input } from 'antd';
import sha256 from 'js-sha256';
import $fetch from '$fetch';
import { authStore, menuStore, cacheStore } from '../../util/store';
import Constant, { BACKSTAGE_PROJ_NAME } from '../../constant/index';

import './index.less';
import logo from './../../../assets/images/tesla_logo.png';
//import ver from './../../../assets/images/slide_verify.jpg';
// import slideVerifyImg from './../../assets/images/slide_verify.jpg';
import slideVerify from 'slideVerify';



export default class SlideVerify extends React.Component {
    static contextTypes = {
        router: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state = {
            btnDisble: true,
            reset: false,
        }

    }

    slideVerifyInit = () => {
        $("#slideVerify").html("");
        $("#slideVerify").slideVerify({
            type: 2,		//类型
            vOffset: 5,	//误差量，根据需求自行调整
            vSpace: 5,	    //间隔
            imgName: ['../assets/images/slide_verify.jpg'],
            imgSize: {
                width: '248px',
                height: '120px',
            },
            blockSize: {
                width: '40px',
                height: '40px',
            },
            barSize: {
                width: '248px',
                height: '40px',
            },
            ready: function () {

            },
            success: () => {

                $("#slideTips").css({ 'display': 'block' });
                this.setState({
                    btnDisble: false
                }, () => {

                    this.props.callbackParent(this.state.btnDisble);
                });
            },
            error: () => {
                this.setState({
                    reset: !this.state.reset,
                })
            }

        });
    }

    componentDidMount() {
        this.slideVerifyInit();
    }

    componentDidUpdate(prevProps, prevState) {
        this.slideVerifyInit();
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.reset !== this.state.reset
    }

    render() {
        return (
            <div>
                <div id="slideVerify" ref='slideVerify' ></div>
                <div id="slideTips" className="slide-tips">验证通过！</div>
            </div>
        );
    }
}

