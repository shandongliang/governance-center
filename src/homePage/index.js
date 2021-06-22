import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Spin } from 'antd'
import fetch from '../util/fetch'
import sha256 from 'js-sha256'
import { goTo, goToAndClose } from '../util/tabRouter';
import { handleAfterLogin } from '../login/afterLogin';


export default class HomeIndex extends Component {
    constructor() {
        super();
        this.state = {}
    }
    componentDidMount(){
        let search = window.location.href.split("?")[1].split("&")
        let token, userId
        search.map(item=>{
          let index = item.indexOf("=")
          if(item.substring(0,index)==="token"){
            token = item.substring(index+1)
          } else if(item.substring(0,index)==="username"){
            userId = item.substring(index+1)
          }
        })
        this.getUserInfo(token, userId)
    }
    getUserInfo = (token, userId) => {
      fetch({
        url: '/tesla-gateway-console-app/commonConfig/apaasLogin',
        data: {
          token,
          userId
        }
      }).then(res=>{
        handleAfterLogin(res)
      }
      )
    }
    render() {
        return (
            <div style={loading}>
              <Spin size = "large" tip = "Loading" />
                {/* <img style={{ width: '100%', height: '100%' }} alt={'logo'} src={logo} /> */}
            </div>
        )
    }
}
const loading = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  // background: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}