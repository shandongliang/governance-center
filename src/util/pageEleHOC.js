import React from "react";
import Constant from '../constant/index';
import { authStore, menuStore, cacheStore, navStore } from './store';

function wrapAuth(WrappedComponent){
  let eleList = authStore.get(Constant.CACHE_APP_ELEMENTLIST).map(item=>{
    return item.eleId;
  });
  return class extends React.Component {
    constructor(props){
      super(props);
    }

    createNewProps = props => {
      let newProps = {
        hidden: true
      };
      if(eleList.indexOf(props.id)>-1){
        newProps.hidden = false;
      }
      return newProps;
    }

    render(){
      return <WrappedComponent {...this.props} {...this.createNewProps(this.props)}/>
    }
  }
}

export default wrapAuth;