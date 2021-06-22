"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _row=require("antd/es/row"),_row2=_interopRequireDefault(_row),_autoComplete=require("antd/es/auto-complete"),_autoComplete2=_interopRequireDefault(_autoComplete),_col=require("antd/es/col"),_col2=_interopRequireDefault(_col),_upload=require("antd/es/upload"),_upload2=_interopRequireDefault(_upload),_icon=require("antd/es/icon"),_icon2=_interopRequireDefault(_icon),_select=require("antd/es/select"),_select2=_interopRequireDefault(_select),_table=require("antd/es/table"),_table2=_interopRequireDefault(_table),_alert=require("antd/es/alert"),_alert2=_interopRequireDefault(_alert),_version2=require("antd/es/version"),_version3=_interopRequireDefault(_version2),_popover=require("antd/es/popover"),_popover2=_interopRequireDefault(_popover),_button=require("antd/es/button"),_button2=_interopRequireDefault(_button),_modal=require("antd/es/modal"),_modal2=_interopRequireDefault(_modal),_input=require("antd/es/input"),_input2=_interopRequireDefault(_input),_datePicker=require("antd/es/date-picker"),_datePicker2=_interopRequireDefault(_datePicker),_tabs=require("antd/es/tabs"),_tabs2=_interopRequireDefault(_tabs),_form=require("antd/es/form"),_form2=_interopRequireDefault(_form);require("antd/es/row/style"),require("antd/es/auto-complete/style"),require("antd/es/col/style"),require("antd/es/upload/style"),require("antd/es/icon/style"),require("antd/es/select/style"),require("antd/es/table/style"),require("antd/es/alert/style"),require("antd/es/version/style"),require("antd/es/popover/style"),require("antd/es/button/style"),require("antd/es/modal/style"),require("antd/es/input/style"),require("antd/es/date-picker/style"),require("antd/es/tabs/style"),require("antd/es/form/style");var _react=require("react"),_react2=_interopRequireDefault(_react),_moment=require("moment"),_moment2=_interopRequireDefault(_moment);require("moment/locale/zh-cn");var _store=require("../../../../util/store"),_antd=require("antd"),_index=require("./../../../../constant/index"),_index2=_interopRequireDefault(_index),_$fetch=require("$fetch"),_$fetch2=_interopRequireDefault(_$fetch),_transferAndDelegate=require("./transferAndDelegate.js"),_tabRouter=require("./../../../../util/tabRouter.js");require("./../../../common/style/index.less");var _commonUtil=require("../../../../util/commonUtil"),_commonUtil2=_interopRequireDefault(_commonUtil);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ownKeys(t,e){var a,r=Object.keys(t);return Object.getOwnPropertySymbols&&(a=Object.getOwnPropertySymbols(t),e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,a)),r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(a),!0).forEach(function(e){_defineProperty(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):ownKeys(Object(a)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(a){var r=_isNativeReflectConstruct();return function(){var e,t=_getPrototypeOf(a);return _possibleConstructorReturn(this,r?(e=_getPrototypeOf(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments))}}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _defineProperty(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}_moment2.default.locale("zh-cn");var FormItem=_form2.default.Item,TabPane=_tabs2.default.TabPane,RangePicker=_datePicker2.default.RangePicker,TextArea=_input2.default.TextArea,MyTodotaskIndex=function(){_inherits(r,_react.Component);var a=_createSuper(r);function r(){var e,o;_classCallCheck(this,r),_defineProperty(_assertThisInitialized(o=a.call(this)),"toCreate",function(a,e){return function(){var e,t={pathname:_index.IS_OPEN_MULTI_TABNAV?"/processManager/mytodotask/tdetail/"+a.taskId:"/processManager/mytodotask/tdetail",state:_objectSpread(_objectSpread({},o.state.formDataShow),{},(_defineProperty(e={pagination:o.state.pagination,taskDefinitionKey:a.taskDefinitionKey,processDefinitionId:a.processDefinitionId,processInstanceId:a.processInstanceId,businessKey:a.businessKey},"taskDefinitionKey",a.taskDefinitionKey),_defineProperty(e,"procDefinitionKey",a.processDefinitionId.split(":")[0]),_defineProperty(e,"taskId",a.taskId),_defineProperty(e,"pathName","/processManager/mytodotask/index"),_defineProperty(e,"tabName","办理我的待办"),e))};(0,_tabRouter.goTo)(t,"办理我的待办")}}),_defineProperty(_assertThisInitialized(o),"toSignOut",function(e,t){return function(){(0,_$fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/workflow/signOutTask",data:{taskId:e.taskId}}).then(function(e){o.fetchSortData(o.state.formDataShow)})}}),_defineProperty(_assertThisInitialized(o),"toTransfer",function(e,t,r){return function(){o.setState({visible:!0,selectedTransferRowKey:e.taskId,operationType:r,queryUserParams:{processInstanceId:e.processInstanceId,taskId:e.taskId}});var a=Date.parse(new Date);(0,_$fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/workflow/queryUserByOrg",data:{processInstanceId:e.processInstanceId,taskId:e.taskId}}).then(function(e){var t=e.reply.result.users;t.forEach(function(e){e.rowKey=e.userId+"-"+a},_assertThisInitialized(o)),o.setState({modalTableData:t})})}}),_defineProperty(_assertThisInitialized(o),"selectConfirm",function(){var e;o.state.selectedRowKeys.length?"transfer"==(e=o.state.operationType)&&_index2.default.MYTODOTASK_DETAIL_TRANSFER_COMMENT||"transfer"!=e&&_index2.default.MYTODOTASK_DETAIL_DELEGATE_COMMENT?o.setState({commentVisible:!0,visible:!1}):o.selectSubmit():_modal2.default.error({title:"异常信息",width:560,content:"transfer"==o.state.operationType?"请选择转办人员":"请选择委派人员",okText:"确认"})}),_defineProperty(_assertThisInitialized(o),"selectSubmit",function(){if(o.state.selectedRowKeys.length){var e=o.state.selectedRowKeys[0],t=o.state.selectedTransferRowKey,a=o.state.operationType,r="";if(("transfer"==a&&_index2.default.MYTODOTASK_DETAIL_TRANSFER_COMMENT||"transfer"!=a&&_index2.default.MYTODOTASK_DETAIL_DELEGATE_COMMENT)&&!(r=o.state.commentValue))return void _modal2.default.error({title:"警告信息",width:560,content:"请输入批注",okText:"确认"});var n=o.state.selectedRows[0].userName;(0,_$fetch2.default)({url:"transfer"==a?"/"+_index.BACKSTAGE_PROJ_NAME+"/workflow/turnToDo":"/"+_index.BACKSTAGE_PROJ_NAME+"/workflow/delegateTask",data:{userId:e,taskId:t,comment:r,userName:n}}).then(function(e){o.setState({visible:!1,commentVisible:!1,selectedRowKeys:[],selectedRows:[],selectedTransferRowKey:"",commentValue:""},function(){o.fetchSortData(o.state.formDataShow)})})}else _modal2.default.error({title:"异常信息",width:560,content:"transfer"==o.state.operationType?"请选择转办人员":"请选择委派人员",okText:"确认"})}),_defineProperty(_assertThisInitialized(o),"hide",function(){o.setState({visible:!1,selectedRowKeys:[],selectedRows:[],selectedTransferRowKey:""})}),_defineProperty(_assertThisInitialized(o),"hideComment",function(){o.setState({visible:!0,commentVisible:!1})}),_defineProperty(_assertThisInitialized(o),"fetchSortData",function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},n=o.state.pagination;_store.authStore.has(_index2.default.AUTH_USER_INFO)&&_store.authStore.get(_index2.default.AUTH_USER_INFO);var t=_objectSpread(_objectSpread({pageNo:n.current,recordsPerPage:n.pageSize},e),{},{isQueryByStartUserOrgId:_index.IS_QUERY_BY_STARTUSERORGID.toString()});o.setState({loading:!0}),(0,_$fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/workflow/queryMyNeedHandleTask",data:t}).then(function(e){n.total=e.reply.result.page.total;var a=_store.cacheStore.get(_index2.default.CACHE_ORG_LIST),t=e.reply.result.taskList,r=e.reply.result.promptMessage;t.map(function(t){var e;!t.startUserName&&t.userName&&(t.userName.indexOf(":")?((e=t.userName.split(":")[1])&&"null"!=e||(e="null"==t.userName.split(":")[0]?"":t.userName.split(":")[0]),t.startUserName=e):t.startUserName=t.userName),a&&0<a.length&&a.map(function(e){t.startUserOrgId===e.orgId&&(t.startUserOrgId=e.orgName)})}),o.setState({pagination:n,data:t,procDefNameList:e.reply.result.procDefNameList,loading:!1,promptMessage:r,isShowTipInfo:!0})})}),_defineProperty(_assertThisInitialized(o),"tableChangeHandle",function(e,t,a){var r=a.order?a.order.substring(0,a.order.lastIndexOf("e")).toUpperCase():"",n=_objectSpread({},o.state.pagination);n.current=e.current,o.setState({pagination:n},function(){""!=r&&(this.setState({sorter:{orderBy:a.field,orderWay:r}}),_objectSpread({orderBy:a.field,orderWay:r,pageNo:e.current,recordsPerPage:e.pageSize},this.state.param)),this.fetchSortData(this.state.formDataShow)})}),_defineProperty(_assertThisInitialized(o),"getDate",function(e){var t=new Date(parseInt(e)).toLocaleString().replace(/\//g,"-");return t.substring(0,t.indexOf(" "))}),_defineProperty(_assertThisInitialized(o),"onChildQuery",function(e){var t,a,r,n;e.res?((t=o.state.pagination).total=e.res.reply.result.page.total,t.current=1,a=e.res.reply.result.promptMessage,r=_store.cacheStore.get(_index2.default.CACHE_ORG_LIST),(n=e.res.reply.result.taskList).map(function(t){var e;!t.startUserName&&t.userName&&(t.userName.indexOf(":")?((e=t.userName.split(":")[1])&&"null"!=e||(e="null"==t.userName.split(":")[0]?"":t.userName.split(":")[0]),t.startUserName=e):t.startUserName=t.userName),r&&0<r.length&&r.map(function(e){t.startUserOrgId===e.orgId&&(t.startUserOrgId=e.orgName)})}),o.setState({pagination:t,data:n,formDataShow:e.param,promptMessage:a,isShowTipInfo:!0})):o.setState({formDataShow:e})}),_defineProperty(_assertThisInitialized(o),"rowSelectHandle",function(e,t){var a=[],r=e[0];a.push(r.split("-")[0]),o.setState({selectedRowKeys:a,selectedRows:t})}),_defineProperty(_assertThisInitialized(o),"rowClassNameHandle",function(e,t){return 0<o.state.selectedRowKeys.length&&e.id==o.state.selectedRowKeys[0]?"row-selected-style":""}),_defineProperty(_assertThisInitialized(o),"onRef",function(e){o.child=e}),_defineProperty(_assertThisInitialized(o),"reSetQuery",function(){var e,t,a,r,n,i,s;(o.state.queryCondition.procDefName||o.state.queryCondition.createTimeS||o.state.queryCondition.createTimeE)&&(e=o.state.queryCondition.procDefName,t=o.state.queryCondition.createTimeS||"",a=o.state.queryCondition.createTimeE||"",r="YYYY/MM/DD",n=t.split(" ")[0].split("-").join("/"),i=a.split(" ")[0].split("-").join("/"),s=[(0,_moment2.default)(n,r),(0,_moment2.default)(i,r)],o.child.props.form.setFieldsValue({procDefName:e,rangeDt:s}))}),_defineProperty(_assertThisInitialized(o),"onQueryNextApprover",function(e){o.setState({modalTableData:e.users})}),_defineProperty(_assertThisInitialized(o),"handleCommentValue",function(e){o.setState({commentValue:e.target.value})}),_defineProperty(_assertThisInitialized(o),"handleOnClose",function(){o.setState({isShowTipInfo:!1})});var t=[{title:"任务ID",dataIndex:"taskId",fixed:"left",width:90,render:function(e,t,a){return _react2.default.createElement("a",{href:"javascript:;",onClick:o.toCreate(t,a)},e)}},{title:"业务ID",dataIndex:"businessKey",width:200,render:function(e){var t="";return null!=e&&(t=e.split(".")[1]),_react2.default.createElement("p",null,t)}},{title:"流程节点",dataIndex:"taskName"},{title:"流程名称",dataIndex:"procDefName",width:220},{title:"发起人",dataIndex:"startUserName"},{title:"创建时间",dataIndex:"createTime",width:180,render:function(e){if(e)return _react2.default.createElement("p",null,_commonUtil2.default.formatDateHour(e))}},{title:"操作",dataIndex:"operation",width:350,render:function(e,t,a){var r=1==t.canSignOut?"inline-block":"none",n=t.businessKey,i=t.taskDefinitionKey,s=t.processDefinitionId.split(":")[0];return _react2.default.createElement("div",null,_react2.default.createElement(_button2.default,{className:"process-list-default pandora-btn-fontsize",onClick:o.toCreate(t,a)},"办理任务"),(0,_transferAndDelegate.isShowTransferBtn)(n,i,s)&&_index2.default.MYTODOTASK_DETAIL_TRANSFER?_react2.default.createElement(_button2.default,{className:"process-list-default pandora-btn-fontsize",onClick:o.toTransfer(t,a,"transfer")},"转办"):"",(0,_transferAndDelegate.isShowDelegateBtn)(n,i,s)&&_index2.default.MYTODOTASK_DETAIL_DELEGATE?_react2.default.createElement(_button2.default,{className:"process-list-default pandora-btn-fontsize",onClick:o.toTransfer(t,a,"delegateTask")},"委派"):"",_react2.default.createElement(_button2.default,{className:"process-list-default pandora-btn-fontsize",onClick:o.toSignOut(t,a),style:{display:r}},"反签收"))}}];return _index.IS_QUERY_BY_STARTUSERORGID&&t.splice(5,0,{title:"发起机构",dataIndex:"startUserOrgId",width:140}),o.state=(_defineProperty(e={loading:!1,data:[],pagination:{pageSize:15,pageSizeChanger:!0,current:1},sorter:{orderBy:"",orderWay:""},visible:!1,commentVisible:!1},"data",[]),_defineProperty(e,"selectedRowKeys",[]),_defineProperty(e,"selectedTransferRowKey",""),_defineProperty(e,"modalTableData",[]),_defineProperty(e,"operationType",""),_defineProperty(e,"formDataShow",{createTimeS:"",createTimeE:""}),_defineProperty(e,"columns",t),_defineProperty(e,"userColumns",[{title:"操作人员",dataIndex:"userName"},{title:"角色名称",dataIndex:"roleName",render:function(e){if(null==e)return _react2.default.createElement("p",{style:{width:120,textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden",marginRight:5}},e);var t=e.split(","),a=_react2.default.createElement("div",null,t.map(function(e,t){return _react2.default.createElement("p",{key:t},e)}));return _react2.default.createElement(_popover2.default,{content:a,title:"角色列表",trigger:"hover"},_react2.default.createElement("p",{style:{width:120,textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden",marginRight:5}},e))}},{title:"所属机构",dataIndex:"orgName"},{title:"移动电话",dataIndex:"mobile"}]),_defineProperty(e,"commentValue",""),_defineProperty(e,"promptMessage",""),_defineProperty(e,"isShowTipInfo",!0),e),o}return _createClass(r,[{key:"componentDidMount",value:function(){var e,t=this,a={},a=this.props.location.state?(e=this.props.location.state,this.setState({formDataShow:e,pagination:e.pagination,queryCondition:{procDefName:e.procDefName,createTimeS:e.createTimeS,createTimeE:e.createTimeE}},function(){t.reSetQuery()}),{pageNo:e.pagination.current,recordsPerPage:e.pagination.pageSize,createTimeE:e.createTimeE,createTimeS:e.createTimeS,procDefName:e.procDefName}):_objectSpread({pageNo:this.state.pagination.current,recordsPerPage:this.state.pagination.pageSize},this.state.formDataShow);this.fetchSortData(a)}},{key:"componentDidUpdate",value:function(){var e=this;this.state.promptMessage&&this.state.isShowTipInfo&&(this.timer=setTimeout(function(){e.setState({isShowTipInfo:!1})},1e4))}},{key:"componentWillUnmount",value:function(){this.timer&&clearTimeout(this.timer)}},{key:"render",value:function(){this.state.selectedRowKeys;var e,t={type:"radio",onChange:this.rowSelectHandle,selections:!0},a=_version3.default.split(".")[0];return"2"==a?e=_react2.default.createElement(_input2.default,{type:"textarea",id:"comment",value:this.state.commentValue,onChange:this.handleCommentValue}):"3"==a&&(e=_react2.default.createElement(TextArea,{id:"comment",value:this.state.commentValue,onChange:this.handleCommentValue})),_react2.default.createElement("div",null,_react2.default.createElement("div",{className:"pandora-main-content"},_react2.default.createElement("div",{className:"portlet-tab"},_react2.default.createElement(_tabs2.default,{defaultActiveKey:"1",style:{marginBottom:7}},_react2.default.createElement(TabPane,{tab:"我的待办查询",key:"1"},_react2.default.createElement("div",{className:"portlet-body"},_react2.default.createElement("div",{className:"query-condition"},_react2.default.createElement(WrapperQueryForm,{reSetQuery:this.onRef,callbackParent:this.onChildQuery,procDefNameList:this.state.procDefNameList})),_react2.default.createElement("div",{className:"role-table"},this.state.promptMessage&&this.state.isShowTipInfo?_react2.default.createElement(_alert2.default,{style:{margin:"0 10px"},message:this.state.promptMessage,type:"warning",closable:!0,showIcon:!0,onClose:this.handleOnClose}):"",_react2.default.createElement("div",{className:"role-header"},_react2.default.createElement("div",{className:"role-list"},"我的待办列表"))),_react2.default.createElement(_modal2.default,{title:"transfer"==this.state.operationType?"请选择转办人":"请选择委派人",visible:this.state.visible,width:"960px",onOk:this.selectConfirm,maskClosable:!1,onCancel:this.hide,okText:"确认",cancelText:"取消"},_react2.default.createElement(WrapperQueryNextApprover,{callbackParent:this.onQueryNextApprover,queryUserParams:this.state.queryUserParams}),_react2.default.createElement(_table2.default,{pagination:!1,dataSource:this.state.modalTableData,columns:this.state.userColumns,rowSelection:t,size:"small",rowKey:"rowKey",style:{paddingLeft:10,paddingRight:10,marginTop:10,marginBottom:10}})),_react2.default.createElement(_modal2.default,{title:"transfer"==this.state.operationType?"请输入转办批注":"请输入委派批注",visible:this.state.commentVisible,width:"500px",onOk:this.selectSubmit,maskClosable:!1,onCancel:this.hideComment,okText:"确认",cancelText:"取消"},"批注：",e),_react2.default.createElement(_table2.default,{pagination:this.state.pagination,loading:this.state.loading,dataSource:this.state.data,columns:this.state.columns,onChange:this.tableChangeHandle,size:"middle",rowKey:"taskId",scroll:{x:1350},style:{paddingLeft:10,paddingRight:10}})))))))}}]),r}();exports.default=MyTodotaskIndex;var QueryForm=function(){_inherits(a,_react2.default.Component);var t=_createSuper(a);function a(e){var l;return _classCallCheck(this,a),_defineProperty(_assertThisInitialized(l=t.call(this,e)),"displayField",function(e,t,a){switch(e){case"TEXT":return _react2.default.createElement(_input2.default,{placeholder:"",style:{width:210}});case"DATESELECT":return _react2.default.createElement(RangePicker,{allowClear:!1,getCalendarContainer:function(e){return e.parentNode}});case"NUMBER":return _react2.default.createElement(_input2.default,{type:"number",style:{width:210}});case"FLOAT":return _react2.default.createElement(_input2.default,{placeholder:"",style:{width:210}});case"SELECT":_valueRange=a||"";var r=_valueRange.split("|"),n=1;return _react2.default.createElement(_select2.default,{style:{width:210}},r.map(function(e){return _react2.default.createElement(_select2.default.Option,{key:n++,value:e},e)}));case"DATE":return _react2.default.createElement(_datePicker2.default,{style:{width:210},format:_index.DATE_FORMAT_MOMENT});case"TIME":case"MULTISELECT":return _react2.default.createElement(_input2.default,{placeholder:"",style:{width:210}});case"UPLOAD":return _react2.default.createElement(_upload2.default,null,_react2.default.createElement(_button2.default,{type:"ghost"},_react2.default.createElement(_icon2.default,{type:"upload"})," Upload"))}}),_defineProperty(_assertThisInitialized(l),"handleReset",function(){l.setState({orgId:""}),l.props.form.resetFields()}),_defineProperty(_assertThisInitialized(l),"handleSearch",function(e){e.preventDefault(),l.props.form.validateFields(function(e,t){var a=_store.authStore.has(_index2.default.AUTH_USER_INFO)?_store.authStore.get(_index2.default.AUTH_USER_INFO).userId:"",r=t.procDefName,n=t.busiId,i=t.startUserName,s=t.orgName,o={userId:a,procDefName:r,busiId:n,startUserName:i,isQueryByStartUserOrgId:_index.IS_QUERY_BY_STARTUSERORGID.toString()};t.rangeDt&&0<t.rangeDt.length&&null!=t.rangeDt[0]&&(o.createTimeS=t.rangeDt[0].format("YYYY-MM-DD")+" 00:00:00",o.createTimeE=t.rangeDt[1].format("YYYY-MM-DD")+" 23:59:59"),_index.IS_QUERY_BY_STARTUSERORGID&&(o.startUserOrgId=s?l.state.orgId:""),(0,_$fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/workflow/queryMyNeedHandleTask",data:_objectSpread(_objectSpread({},o),{pageNo:1,recordsPerPage:15})}).then(function(e){l.props.callbackParent({res:e,param:o})})})}),_defineProperty(_assertThisInitialized(l),"handleFilter",function(e,t){return-1!==t.props.children.indexOf(e)}),_defineProperty(_assertThisInitialized(l),"toggle",function(){l.setState({expand:!l.state.expand})}),_defineProperty(_assertThisInitialized(l),"handleSelectStartOrg",function(){l.setState({startOrgVisibal:!0})}),_defineProperty(_assertThisInitialized(l),"handleStartOrgOk",function(){var e=l.state.selectedRows,t=e?e[0]:{name:"",orgId:""};l.props.form.setFieldsValue({orgName:t.name}),l.setState({startOrgVisibal:!1,orgId:t.orgId})}),_defineProperty(_assertThisInitialized(l),"handleStartOrgCancle",function(){l.setState({startOrgVisibal:!1})}),_defineProperty(_assertThisInitialized(l),"handleOrgInfo",function(e,t){l.setState({selectedRows:t,isRenderChild:!1})}),_defineProperty(_assertThisInitialized(l),"handleClearOrgInfo",function(){l.props.form.setFieldsValue({orgName:""}),l.setState({orgId:""})}),l.state={expand:!1,startOrgVisibal:!1,orgId:"",isRenderChild:!0},l}return _createClass(a,[{key:"componentDidMount",value:function(){this.props.reSetQuery(this)}},{key:"render",value:function(){var e=this.state.expand,t={labelCol:{span:8},wrapperCol:{span:16}},a=e?{span:7,offset:0}:{span:6,offset:0},r=[];this.props.procDefNameList&&this.props.procDefNameList.map(function(e){e&&r.push(e)});var n=this.props.form.getFieldDecorator,i={type:"radio",onChange:this.handleOrgInfo};return _react2.default.createElement("div",null,_react2.default.createElement(_form2.default,{onSubmit:this.handleSearch,style:{marginTop:18},className:"ant-advanced-search-form"},_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:a.span,offset:a.offset},_react2.default.createElement(FormItem,_extends({},t,{label:"业务ID"}),n("busiId",{initialValue:""})(_react2.default.createElement(_input2.default,null)))),_react2.default.createElement(_col2.default,{span:a.span,offset:a.offset},_react2.default.createElement(FormItem,_extends({},t,{label:"流程名称"}),n("procDefName",{initialValue:""})(_react2.default.createElement(_autoComplete2.default,{dataSource:r,filterOption:this.handleFilter})))),_react2.default.createElement(_col2.default,{span:a.span,offset:a.offset},_react2.default.createElement(FormItem,_extends({},t,{label:"发起人"}),n("startUserName",{initialValue:""})(_react2.default.createElement(_input2.default,null)))),_react2.default.createElement(_col2.default,{span:2,style:{display:e?"block":"none",lineHeight:"40px",paddingLeft:15}},_react2.default.createElement("a",{onClick:this.toggle},e?"收起":"展开",_react2.default.createElement(_icon2.default,{type:e?"up":"down"}))),e?"":_react2.default.createElement(_col2.default,{span:6,offset:0},_react2.default.createElement(_button2.default,{className:"query-btn operatorBtn pandora-btn-fontsize",htmlType:"submit",type:"primary"},"查询"),_react2.default.createElement(_button2.default,{className:"query-btn pandora-btn-fontsize",onClick:this.handleReset},"清空"),_react2.default.createElement("a",{onClick:this.toggle},e?"收起":"展开",_react2.default.createElement(_icon2.default,{type:e?"up":"down"})))),_react2.default.createElement(_row2.default,{style:{display:e?"block":"none"}},_index.IS_QUERY_BY_STARTUSERORGID?_react2.default.createElement(_col2.default,{span:a.span,offset:a.offset},_react2.default.createElement(FormItem,_extends({},t,{label:"发起机构"}),n("orgName",{initialValue:""})(_react2.default.createElement(_input2.default,{suffix:_react2.default.createElement(_icon2.default,{type:"close",onClick:this.handleClearOrgInfo,style:{color:"#999",fontSize:12}}),onClick:this.handleSelectStartOrg})))):"",_react2.default.createElement(_col2.default,{span:a.span,offset:a.offset},_react2.default.createElement(FormItem,_extends({},t,{label:"创建时间"}),n("rangeDt",{initialValue:""})(this.displayField("DATESELECT","rangeDt","")))),e?_react2.default.createElement(_col2.default,{span:7,offset:0},_react2.default.createElement(_button2.default,{style:{float:"right",margin:"4px 0px 0px 10px"},className:"query-btn pandora-btn-fontsize",onClick:this.handleReset},"清空"),_react2.default.createElement(_button2.default,{style:{float:"right"},className:"query-btn operatorBtn pandora-btn-fontsize",htmlType:"submit",type:"primary"},"查询")):"")),_react2.default.createElement(ProcessStartOrgList,{startOrgVisibal:this.state.startOrgVisibal,isSendRequest:this.state.isRenderChild,handleStartOrgOk:this.handleStartOrgOk,handleStartOrgCancle:this.handleStartOrgCancle,rowSelection:i}))}}]),a}(),WrapperQueryForm=_form2.default.create()(QueryForm),ProcessStartOrgList=function(){_inherits(a,_react2.default.Component);var t=_createSuper(a);function a(e){var r;return _classCallCheck(this,a),_defineProperty(_assertThisInitialized(r=t.call(this,e)),"handleTablePagination",function(e){var t={realOrgId:"",orgName:""};r.setState({pagination:e},function(){r.fetchData(t)})}),_defineProperty(_assertThisInitialized(r),"fetchData",function(e){var a=r.state.pagination;(0,_$fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/rbac/queryOrgList",data:_objectSpread(_objectSpread({},e),{},{pageNo:a.current,recordsPerPage:a.pageSize})}).then(function(e){var t=e.reply.orgList;a.total=e.reply.page.total,a.current=e.reply.page.pageNo,r.setState({startOrgList:t,pagination:a})})}),r.state={pagination:{pageSize:10,pageSizeChanger:!0,current:1},startOrgColumns:[{title:"机构ID",dataIndex:"orgId"},{title:"机构名称",dataIndex:"name"}],startOrgList:[]},r}return _createClass(a,[{key:"componentWillReceiveProps",value:function(e){e.startOrgVisibal&&e.isSendRequest&&this.fetchData({realOrgId:"",orgName:""})}},{key:"render",value:function(){return _react2.default.createElement(_modal2.default,{className:"process-showOrg-modal",width:800,title:"选择发起机构",visible:this.props.startOrgVisibal,onOk:this.props.handleStartOrgOk,onCancel:this.props.handleStartOrgCancle},_react2.default.createElement(SearchProcessStartOrg,{fetchData:this.fetchData}),_react2.default.createElement(_table2.default,{pagination:this.state.pagination,columns:this.state.startOrgColumns,dataSource:this.state.startOrgList,onChange:this.handleTablePagination,rowSelection:this.props.rowSelection,rowKey:"orgId"}))}}]),a}(),InnerSearchProcessStartOrg=function(){_inherits(a,_react2.default.Component);var t=_createSuper(a);function a(e){var r;return _classCallCheck(this,a),_defineProperty(_assertThisInitialized(r=t.call(this,e)),"handleReset",function(){r.props.form.resetFields()}),_defineProperty(_assertThisInitialized(r),"handleSearchOrg",function(e){e.preventDefault(),r.props.form.validateFields(function(e,t){var a={realOrgId:t.orgId,orgName:t.orgName};r.props.fetchData(a)})}),r.state={},r}return _createClass(a,[{key:"render",value:function(){var e={labelCol:{span:8},wrapperCol:{span:16}},t=7,a=1,r=this.props.form.getFieldDecorator;return _react2.default.createElement(_form2.default,{onSubmit:this.handleSearchOrg},_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:t,offset:a},_react2.default.createElement(FormItem,_extends({},e,{label:"机构ID"}),r("orgId")(_react2.default.createElement(_input2.default,null)))),_react2.default.createElement(_col2.default,{span:t,offset:a},_react2.default.createElement(FormItem,_extends({},e,{label:"机构名称"}),r("orgName")(_react2.default.createElement(_input2.default,null)))),_react2.default.createElement(_col2.default,{span:t,offset:a},_react2.default.createElement(_button2.default,{className:"query-btn operatorBtn pandora-btn-fontsize",htmlType:"submit",type:"primary"},"查询"),_react2.default.createElement(_button2.default,{className:"query-btn pandora-btn-fontsize",onClick:this.handleReset},"清空"))))}}]),a}(),SearchProcessStartOrg=_form2.default.create()(InnerSearchProcessStartOrg),QueryNextApprover=function(){_inherits(a,_react2.default.Component);var t=_createSuper(a);function a(e){var r;return _classCallCheck(this,a),_defineProperty(_assertThisInitialized(r=t.call(this,e)),"displayField",function(e,t,a){switch(e){case"TEXT":return _react2.default.createElement(_input2.default,{placeholder:"",style:{width:210}})}}),_defineProperty(_assertThisInitialized(r),"handleQueryApprover",function(e){e.preventDefault(),r.props.form.validateFields(function(e,t){var a=Date.parse(new Date);(0,_$fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/workflow/queryUserByOrg",data:{processInstanceId:r.props.queryUserParams.processInstanceId,taskId:r.props.queryUserParams.taskId,roleName:t.roleName}}).then(function(e){var t=e.reply.result.users;t.forEach(function(e){e.rowKey=e.userId+"-"+a},_assertThisInitialized(r)),r.props.callbackParent({users:t})})})}),r.state={},r}return _createClass(a,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return _react2.default.createElement("div",null,_react2.default.createElement(_form2.default,{onSubmit:this.handleQueryApprover,style:{marginTop:18}},_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:7,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},{labelCol:{span:6},wrapperCol:{span:18}},{label:"角色名称"}),e("roleName")(this.displayField("TEXT","roleName","")))),_react2.default.createElement(_col2.default,{span:2,offset:1,style:{display:"block"}},_react2.default.createElement(_button2.default,{className:"query-btn operatorBtn pandora-btn-fontsize",htmlType:"submit",type:"primary"},"查询")))))}}]),a}(),WrapperQueryNextApprover=_form2.default.create()(QueryNextApprover);module.exports=exports.default;