import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
import './index.less'

export default class Loading extends Component {
    constructor(props,context){
        super(props,context);
    }
    render(){
        return (
            <div className = "loading">
                <Spin size = "large" tip = "Loading" />
            </div>
        )
    }
}