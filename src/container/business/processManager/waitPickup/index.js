"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _row=require("antd/es/row"),_row2=_interopRequireDefault(_row),_col=require("antd/es/col"),_col2=_interopRequireDefault(_col),_autoComplete=require("antd/es/auto-complete"),_autoComplete2=_interopRequireDefault(_autoComplete),_upload=require("antd/es/upload"),_upload2=_interopRequireDefault(_upload),_icon=require("antd/es/icon"),_icon2=_interopRequireDefault(_icon),_input=require("antd/es/input"),_input2=_interopRequireDefault(_input),_table=require("antd/es/table"),_table2=_interopRequireDefault(_table),_button=require("antd/es/button"),_button2=_interopRequireDefault(_button),_modal=require("antd/es/modal"),_modal2=_interopRequireDefault(_modal),_datePicker=require("antd/es/date-picker"),_datePicker2=_interopRequireDefault(_datePicker),_tabs=require("antd/es/tabs"),_tabs2=_interopRequireDefault(_tabs),_form=require("antd/es/form"),_form2=_interopRequireDefault(_form);require("antd/es/row/style"),require("antd/es/col/style"),require("antd/es/auto-complete/style"),require("antd/es/upload/style"),require("antd/es/icon/style"),require("antd/es/input/style"),require("antd/es/table/style"),require("antd/es/button/style"),require("antd/es/modal/style"),require("antd/es/date-picker/style"),require("antd/es/tabs/style"),require("antd/es/form/style");var _react=require("react"),_react2=_interopRequireDefault(_react),_moment=require("moment"),_moment2=_interopRequireDefault(_moment);require("moment/locale/zh-cn");var _store=require("../../../../util/store"),_index=require("../../../../constant/index"),_index2=_interopRequireDefault(_index),_antd=require("antd"),_index3=require("./../../../../constant/index"),_$fetch=require("$fetch"),_$fetch2=_interopRequireDefault(_$fetch),_tabRouter=require("./../../../../util/tabRouter.js");require("./../../../common/style/index.less");var _commonUtil=require("../../../../util/commonUtil"),_commonUtil2=_interopRequireDefault(_commonUtil);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ownKeys(t,e){var r,a=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a.push.apply(a,r)),a}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(r),!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(r){var a=_isNativeReflectConstruct();return function(){var e,t=_getPrototypeOf(r);return _possibleConstructorReturn(this,a?(e=_getPrototypeOf(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments))}}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}_moment2.default.locale("zh-cn");var FormItem=_form2.default.Item,TabPane=_tabs2.default.TabPane,RangePicker=_datePicker2.default.RangePicker,WaitPickupIndex=function(){_inherits(t,_react.Component);var e=_createSuper(t);function t(){var l;return _classCallCheck(this,t),_defineProperty(_assertThisInitialized(l=e.call(this)),"fetchData",function(e){l.setState({loading:!0}),(0,_$fetch2.default)({url:"/"+_index3.BACKSTAGE_PROJ_NAME+"/workflow/waitingClaimTask",data:_objectSpread({},e)}).then(function(e){var t=l.state.pagination;t.total=e.reply.result.page.total;var r=_store.cacheStore.get(_index2.default.CACHE_ORG_LIST),a=e.reply.result.taskList;a.map(function(t){var e;!t.startUserName&&t.userName&&(t.userName.indexOf(":")?((e=t.userName.split(":")[1])&&"null"!=e||(e="null"==t.userName.split(":")[0]?"":t.userName.split(":")[0]),t.startUserName=e):t.startUserName=t.userName),r&&0<r.length&&r.map(function(e){t.startUserOrgId===e.orgId&&(t.startUserOrgId=e.orgName)})}),l.setState({pagination:t,data:a,procDefNameList:e.reply.result.procDefNameList,loading:!1})})}),_defineProperty(_assertThisInitialized(l),"tableChangeHandle",function(e,t,r){l.setState({loading:!0,pagination:e});var a=e.current,n=e.pageSize,i=_objectSpread(_objectSpread({},l.state.param),{},{pageNo:a,recordsPerPage:n},l.state.formDataShow);(0,_$fetch2.default)({url:"/"+_index3.BACKSTAGE_PROJ_NAME+"/workflow/waitingClaimTask",data:_objectSpread({},i)}).then(function(e){var t=l.state.pagination;t.total=e.reply.result.page.total;var r=_store.cacheStore.get(_index2.default.CACHE_ORG_LIST),a=e.reply.result.taskList;a.map(function(t){var e;!t.startUserName&&t.userName&&(t.userName.indexOf(":")?((e=t.userName.split(":")[1])&&"null"!=e||(e="null"==t.userName.split(":")[0]?"":t.userName.split(":")[0]),t.startUserName=e):t.startUserName=t.userName),r.map(function(e){t.startUserOrgId===e.orgId&&(t.startUserOrgId=e.orgName)})}),l.setState({pagination:t,data:a,loading:!1})})}),_defineProperty(_assertThisInitialized(l),"goToCreate",function(e,r){return function(){var e=l.state.data[r],t={pathname:_index3.IS_OPEN_MULTI_TABNAV?"/processManager/waitPickup/taskDetail/"+e.taskId:"/processManager/waitPickup/taskDetail",state:_objectSpread(_objectSpread({},l.state.formDataShow),{},{pagination:l.state.pagination,taskId:e.taskId,processInstanceId:e.processInstanceId})};(0,_tabRouter.goTo)(t,"办理我的待签收")}}),_defineProperty(_assertThisInitialized(l),"toSign",function(e){return function(){(0,_$fetch2.default)({url:"/"+_index3.BACKSTAGE_PROJ_NAME+"/workflow/signInTask",data:{taskId:e}}).then(function(e){"S"===e.reply.returnCode.type&&("workflow.signInTask.taskAlreadyClaimed"===e.reply.result.code?_modal2.default.warning({title:e.reply.result.message,okText:"确定",onOk:l.toSignSuccess}):_modal2.default.success({title:"签收成功",content:"请去我的待办查看任务！",okText:"确定",onOk:l.toSignSuccess}))})}}),_defineProperty(_assertThisInitialized(l),"toSignSuccess",function(){l.setState({loading:!0}),l.setState({loading:!0});var e=parseInt(l.state.pagination.pageSize),t=_objectSpread({firstResult:0*e,pageSize:e},l.state.formDataShow);(0,_$fetch2.default)({url:"/"+_index3.BACKSTAGE_PROJ_NAME+"/workflow/waitingClaimTask",data:_objectSpread({},t)}).then(function(e){var t=l.state.pagination;t.total=e.reply.result.total;var r=_store.cacheStore.get(_index2.default.CACHE_ORG_LIST),a=e.reply.result.taskList;a.map(function(t){var e;!t.startUserName&&t.userName&&(t.userName.indexOf(":")?((e=t.userName.split(":")[1])&&"null"!=e||(e="null"==t.userName.split(":")[0]?"":t.userName.split(":")[0]),t.startUserName=e):t.startUserName=t.userName),r.map(function(e){t.startUserOrgId===e.orgId&&(t.startUserOrgId=e.orgName)})}),l.setState({pagination:t,data:a,loading:!1})})}),_defineProperty(_assertThisInitialized(l),"getDate",function(e){if(e){var t=new Date(parseInt(e)).toLocaleString().replace(/\//g,"-");return t.substring(0,t.indexOf(" "))}return""}),_defineProperty(_assertThisInitialized(l),"onChildQuery",function(e){var t,r,a;e.res?((t=l.state.pagination).total=e.res.reply.result.page.total,t.current=1,r=_store.cacheStore.get(_index2.default.CACHE_ORG_LIST),(a=e.res.reply.result.taskList).map(function(t){var e;!t.startUserName&&t.userName&&(t.userName.indexOf(":")?((e=t.userName.split(":")[1])&&"null"!=e||(e="null"==t.userName.split(":")[0]?"":t.userName.split(":")[0]),t.startUserName=e):t.startUserName=t.userName),r.map(function(e){t.startUserOrgId===e.orgId&&(t.startUserOrgId=e.orgName)})}),l.setState({pagination:t,data:a,formDataShow:e.param})):l.setState({formDataShow:e})}),_defineProperty(_assertThisInitialized(l),"onRef",function(e){l.child=e}),_defineProperty(_assertThisInitialized(l),"reSetQuery",function(){var e,t,r,a,n,i,o;(l.state.queryCondition.procDefName||l.state.queryCondition.createTimeS||l.state.queryCondition.createTimeE)&&(e=l.state.queryCondition.procDefName,t=l.state.queryCondition.createTimeS,r=l.state.queryCondition.createTimeE,a="YYYY/MM/DD",n=t.split(" ")[0].split("-").join("/"),i=r.split(" ")[0].split("-").join("/"),o=[(0,_moment2.default)(n,a),(0,_moment2.default)(i,a)],l.child.props.form.setFieldsValue({procDefName:e,rangeDt:o}))}),l.state={loading:!1,data:[],param:{},pagination:{pageSize:15,pageSizeChanger:!0,current:1},formDataShow:{createTimeS:"",createTimeE:""},columns:[{title:"任务ID",dataIndex:"taskId",fixed:"left",render:function(e,t,r){return _react2.default.createElement("a",{href:"javascript:;",onClick:l.goToCreate(t,r)},e)}},{title:"业务ID",dataIndex:"businessKey",width:200,render:function(e){var t="";return null!=e&&(t=e.split(".")[1]),_react2.default.createElement("p",null,t)}},{title:"流程节点",dataIndex:"taskName"},{title:"任务内容",dataIndex:"description"},{title:"流程名称",dataIndex:"procDefName",width:220},{title:"流程版本",dataIndex:"processDefinitionId",render:function(e){var t=e.split(":")[1];return _react2.default.createElement("p",null,t)}},{title:"发起人",dataIndex:"startUserName"},{title:"创建时间",dataIndex:"createTime",width:180,render:function(e){if(e)return _react2.default.createElement("p",null,_commonUtil2.default.formatDateHour(e))}},{title:"操作",dataIndex:"operation",fixed:"right",width:150,render:function(e,t){return _react2.default.createElement("div",null,_react2.default.createElement(_button2.default,{className:"pandora-btn-fontsize",onClick:l.toSign(t.taskId),style:{marginRight:12,width:100,borderRadius:5,background:"#fff",color:"rgba(0,0,0,0.65)"}},"签收"))}}]},l}return _createClass(t,[{key:"componentDidMount",value:function(){var e,t=this,r=this.state.pagination,a={},a=this.props.location.state?(e=this.props.location.state,this.setState({formDataShow:e,pagination:e.pagination,queryCondition:{procDefName:e.procDefName,createTimeS:e.createTimeS,createTimeE:e.createTimeE}},function(){t.reSetQuery()}),{pageNo:e.pagination.current,recordsPerPage:e.pagination.pageSize,createTimeE:e.createTimeE,createTimeS:e.createTimeS,procDefName:e.procDefName}):_objectSpread({pageNo:r.current,recordsPerPage:r.pageSize},this.state.formDataShow);this.fetchData(a)}},{key:"render",value:function(){return _react2.default.createElement("div",null,_react2.default.createElement("div",{className:"pandora-main-content"},_react2.default.createElement("div",{className:"portlet-tab"},_react2.default.createElement(_tabs2.default,{defaultActiveKey:"1",style:{marginBottom:7}},_react2.default.createElement(TabPane,{tab:"待签收查询",key:"1"},_react2.default.createElement("div",{className:"portlet-body"},_react2.default.createElement("div",{className:"query-condition"},_react2.default.createElement(WrapperQueryForm,{reSetQuery:this.onRef,callbackParent:this.onChildQuery,procDefNameList:this.state.procDefNameList})),_react2.default.createElement("div",{className:"role-table"},_react2.default.createElement("div",{className:"role-header"},_react2.default.createElement("div",{className:"role-list"},"待签收列表"))),_react2.default.createElement(_table2.default,{pagination:this.state.pagination,loading:this.state.loading,dataSource:this.state.data,columns:this.state.columns,onChange:this.tableChangeHandle,size:"middle",rowKey:"taskId",scroll:{x:1400},style:{paddingLeft:10,paddingRight:10}})))))))}}]),t}();exports.default=WaitPickupIndex;var QueryForm=function(){_inherits(r,_react2.default.Component);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),_defineProperty(_assertThisInitialized(n=t.call(this,e)),"displayField",function(e,t,r){switch(e){case"TEXT":return _react2.default.createElement(_input2.default,{placeholder:"",style:{width:210}});case"DATESELECT":return _react2.default.createElement(RangePicker,{allowClear:!1,getCalendarContainer:function(e){return e.parentNode}});case"NUMBER":return _react2.default.createElement(_input2.default,{type:"number",style:{width:210}});case"FLOAT":return _react2.default.createElement(_input2.default,{placeholder:"",style:{width:210}});case"DATE":return _react2.default.createElement(_datePicker2.default,{style:{width:210},format:_index3.DATE_FORMAT_MOMENT});case"TIME":case"MULTISELECT":return _react2.default.createElement(_input2.default,{placeholder:"",style:{width:210}});case"UPLOAD":return _react2.default.createElement(_upload2.default,null,_react2.default.createElement(_button2.default,{type:"ghost"},_react2.default.createElement(_icon2.default,{type:"upload"})," Upload"))}}),_defineProperty(_assertThisInitialized(n),"handleReset",function(){n.props.form.resetFields()}),_defineProperty(_assertThisInitialized(n),"handleSearch",function(e){e.preventDefault(),n.props.form.validateFields(function(e,t){var r;_store.authStore.has(_index2.default.AUTH_USER_INFO)&&(void 0===(r=_store.authStore.get(_index2.default.AUTH_USER_INFO)).userId?r["user-id"]:r.userId);var a={procDefName:t.procDefName};t.rangeDt&&0<t.rangeDt.length&&null!=t.rangeDt[0]&&(a.createTimeS=t.rangeDt[0].format("YYYY-MM-DD")+" 00:00:00",a.createTimeE=t.rangeDt[1].format("YYYY-MM-DD")+" 23:59:59"),(0,_$fetch2.default)({url:"/"+_index3.BACKSTAGE_PROJ_NAME+"/workflow/waitingClaimTask",data:_objectSpread(_objectSpread({},a),{pageNo:1,recordsPerPage:15})}).then(function(e){n.props.callbackParent({res:e,param:a})})})}),_defineProperty(_assertThisInitialized(n),"handleFilter",function(e,t){return-1!==t.props.children.indexOf(e)}),n.state={},n}return _createClass(r,[{key:"componentDidMount",value:function(){this.props.reSetQuery(this)}},{key:"render",value:function(){var e={labelCol:{span:6},wrapperCol:{span:18}},t=this.props.form.getFieldDecorator,r=[];return this.props.procDefNameList&&this.props.procDefNameList.map(function(e){e&&r.push(e)}),_react2.default.createElement("div",null,_react2.default.createElement(_form2.default,{onSubmit:this.handleSearch},_react2.default.createElement(_row2.default,{style:{marginTop:18}},_react2.default.createElement(_col2.default,{span:7,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"流程名称"}),t("procDefName",{initialValue:""})(_react2.default.createElement(_autoComplete2.default,{dataSource:r,style:{width:200},filterOption:this.handleFilter})))),_react2.default.createElement(_col2.default,{span:7,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"创建时间"}),t("rangeDt")(this.displayField("DATESELECT","rangeDt","")))),_react2.default.createElement(_col2.default,{span:7,style:{display:"block"}},_react2.default.createElement(_button2.default,{className:"query-btn operatorBtn pandora-btn-fontsize",htmlType:"submit",type:"primary"},"查询"),_react2.default.createElement(_button2.default,{className:"query-btn pandora-btn-fontsize",onClick:this.handleReset},"清空")))))}}]),r}(),WrapperQueryForm=_form2.default.create()(QueryForm);module.exports=exports.default;