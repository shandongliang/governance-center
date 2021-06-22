"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _upload=require("antd/es/upload"),_upload2=_interopRequireDefault(_upload),_icon=require("antd/es/icon"),_icon2=_interopRequireDefault(_icon),_timePicker=require("antd/es/time-picker"),_timePicker2=_interopRequireDefault(_timePicker),_datePicker=require("antd/es/date-picker"),_datePicker2=_interopRequireDefault(_datePicker),_select=require("antd/es/select"),_select2=_interopRequireDefault(_select),_row=require("antd/es/row"),_row2=_interopRequireDefault(_row),_col=require("antd/es/col"),_col2=_interopRequireDefault(_col),_button=require("antd/es/button"),_button2=_interopRequireDefault(_button),_popover=require("antd/es/popover"),_popover2=_interopRequireDefault(_popover),_version2=require("antd/es/version"),_version3=_interopRequireDefault(_version2),_table=require("antd/es/table"),_table2=_interopRequireDefault(_table),_modal=require("antd/es/modal"),_modal2=_interopRequireDefault(_modal),_timeline=require("antd/es/timeline"),_timeline2=_interopRequireDefault(_timeline),_input=require("antd/es/input"),_input2=_interopRequireDefault(_input),_tabs=require("antd/es/tabs"),_tabs2=_interopRequireDefault(_tabs),_form=require("antd/es/form"),_form2=_interopRequireDefault(_form),_checkbox=require("antd/es/checkbox"),_checkbox2=_interopRequireDefault(_checkbox);require("antd/es/upload/style"),require("antd/es/icon/style"),require("antd/es/time-picker/style"),require("antd/es/date-picker/style"),require("antd/es/select/style"),require("antd/es/row/style"),require("antd/es/col/style"),require("antd/es/button/style"),require("antd/es/popover/style"),require("antd/es/version/style"),require("antd/es/table/style"),require("antd/es/modal/style"),require("antd/es/timeline/style"),require("antd/es/input/style"),require("antd/es/tabs/style"),require("antd/es/form/style"),require("antd/es/checkbox/style");var _react=require("react"),_react2=_interopRequireDefault(_react),_moment=require("moment"),_moment2=_interopRequireDefault(_moment),_index=require("../../../../constant/index"),_index2=_interopRequireDefault(_index),_antd=require("antd"),_index3=require("./../../../../constant/index"),_$fetch=require("$fetch"),_$fetch2=_interopRequireDefault(_$fetch),_tabRouter=require("./../../../../util/tabRouter.js"),_index4=require("./../busiEntity/index"),BE=_interopRequireWildcard(_index4),_routerWrap=require("./../../../../util/routerWrap"),_routerWrap2=_interopRequireDefault(_routerWrap);require("./../../../common/style/index.less");var _HighlightDiagram=require("component/diagram-viewer/HighlightDiagram"),_HighlightDiagram2=_interopRequireDefault(_HighlightDiagram),_commonUtil=require("../../../../util/commonUtil"),_commonUtil2=_interopRequireDefault(_commonUtil);function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return _getRequireWildcardCache=function(){return e},e}function _interopRequireWildcard(e){if(e&&e.__esModule)return e;if(null===e||"object"!==_typeof(e)&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache();if(t&&t.has(e))return t.get(e);var a,r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e){Object.prototype.hasOwnProperty.call(e,i)&&((a=n?Object.getOwnPropertyDescriptor(e,i):null)&&(a.get||a.set)?Object.defineProperty(r,i,a):r[i]=e[i])}return r.default=e,t&&t.set(e,r),r}function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ownKeys(t,e){var a,r=Object.keys(t);return Object.getOwnPropertySymbols&&(a=Object.getOwnPropertySymbols(t),e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,a)),r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(a),!0).forEach(function(e){_defineProperty(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):ownKeys(Object(a)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(a){var r=_isNativeReflectConstruct();return function(){var e,t=_getPrototypeOf(a);return _possibleConstructorReturn(this,r?(e=_getPrototypeOf(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments))}}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _defineProperty(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var CheckboxGroup=_checkbox2.default.Group,FormItem=_form2.default.Item,TabPane=_tabs2.default.TabPane,TextArea=_input2.default.TextArea,TimeItem=_timeline2.default.Item,MyResultsFormDetail=function(){_inherits(a,_react2.default.Component);var t=_createSuper(a);function a(e){var r;return _classCallCheck(this,a),_defineProperty(_assertThisInitialized(r=t.call(this,e)),"toIndex",function(){var e={pathname:r.state.queryParams.pathName,state:_objectSpread({},r.state.queryParams)};(0,_tabRouter.goToAndClose)(e,null,!1)}),_defineProperty(_assertThisInitialized(r),"handleWithdrawTask",function(){var e=r.state.queryParams.taskId,n=_assertThisInitialized(r);(0,_$fetch2.default)({url:"/"+_index3.BACKSTAGE_PROJ_NAME+"/workflow/canTaskWithdraw",data:{taskId:e}}).then(function(e){var t=e.reply.result.canTaskWithdraw,a=e.reply.result.message,r=e.reply.result.promptMessage;t?t&&r?_modal2.default.confirm({title:"请您确认",content:r,okText:"是",cancelText:"否",width:560,maskClosable:!1,onOk:function(){n.confirmDraw()}}):t&&n.setState({visible:!0}):_modal2.default.warning({content:a})})}),_defineProperty(_assertThisInitialized(r),"confirmDraw",function(){r.setState({visible:!0})}),_defineProperty(_assertThisInitialized(r),"hide",function(){r.setState({visible:!1})}),_defineProperty(_assertThisInitialized(r),"SelectNextPerson",function(){var e=_assertThisInitialized(r),t={type:"radio",onChange:r.rowSelectHandle},a=e.state.hasDefaultListener;a&&"false"==a?_modal2.default.info({content:"根据现有条件不能查到候选人列表"}):_modal2.default.info({title:"请选择下一步审批人",closable:!1,width:560,onOk:e.selectConfirm,maskClosable:!1,content:_react2.default.createElement(_table2.default,{pagination:!0,dataSource:e.state.candidateUsers,columns:e.state.columnsModal,rowSelection:t,size:"small",rowKey:"userId",style:{paddingLeft:10,paddingRight:10,marginTop:10,marginBottom:10}}),okText:"确认"})}),_defineProperty(_assertThisInitialized(r),"selectConfirm",function(){var e,t;""!=r.state.selectedRowKeys?(e=r.state.selectedRowKeys,t=r.state.nextTaskId,(0,_$fetch2.default)({url:"/"+_index3.BACKSTAGE_PROJ_NAME+"/workflow/setAssigneeForTask",data:{userId:e,taskId:t}}).then(function(e){var t={pathname:r.state.queryParams.pathName};(0,_tabRouter.goToAndClose)(t)})):_modal2.default.info({content:"请选择下一步审批人！"})}),_defineProperty(_assertThisInitialized(r),"rowSelectHandle",function(e,t){r.setState({selectedRowKeys:e,selectedRows:t})}),_defineProperty(_assertThisInitialized(r),"displayField",function(e,t,a){var r,n=_version3.default.split(".")[0];switch("2"==n?r=_react2.default.createElement(_input2.default,{type:"textarea",autosize:{minRows:1},style:{width:210}}):"3"==n&&(r=_react2.default.createElement(TextArea,{autoSize:{minRows:1},style:{width:210}})),e){case"TEXTAREA":return r}}),r.state={loading:!1,pagination:{pageSize:20,pageSizeChanger:!0,current:1},selectedRowKeys:[],formData:{},tableData:[],visible:!1,businessName:"",triggerPoint:"",_visible:!1,columns:[{title:"任务ID",dataIndex:"taskId"},{title:"任务名称",dataIndex:"taskName"},{title:"办理人",dataIndex:"userName"},{title:"开始时间",dataIndex:"startTime",render:function(e,t){if(t.commentAction&&"Withdraw"==t.commentAction){var a=_commonUtil2.default.formatDateHour(t.commentTime);return _react2.default.createElement("p",null,a)}if(e){var r=_commonUtil2.default.formatDateHour(e);return _react2.default.createElement("p",null,r)}}},{title:"结束时间",dataIndex:"endTime",render:function(e,t){if(t.commentAction&&"Withdraw"==t.commentAction){var a=_commonUtil2.default.formatDateHour(t.commentTime);return _react2.default.createElement("p",null,a)}if(e){var r=_commonUtil2.default.formatDateHour(e);return _react2.default.createElement("p",null,r)}}},{title:"任务历时",dataIndex:"duration",render:function(e,t){if(t.commentAction&&"Withdraw"==t.commentAction)return _react2.default.createElement("p",null,"0时0分0秒");if(e){var a=parseInt(e);return _react2.default.createElement("p",null,parseInt(_moment2.default.duration(a).asHours())+"时"+_moment2.default.duration(a).minutes()+"分"+_moment2.default.duration(a).seconds()+"秒")}}},{title:"操作",dataIndex:"commentAction",render:function(e){var t="任务完成";if(e)return"AddComment"==e?t="任务完成":"TurnToDo"==e?t="发起转办":"DelegateTask"==e?t="发起委派":"ResolvedTask"==e?t="被委派人完成任务":"Close"==e?t="关闭流程":"Withdraw"==e?t="发起撤回":"Return"==e&&(t="发起退回"),_react2.default.createElement("p",null,t)}},{title:"批注信息",dataIndex:"commentFullMsg",render:function(e,t){var a=_react2.default.createElement("div",null,_react2.default.createElement("p",null,e));return _react2.default.createElement(_popover2.default,{content:a,title:"批注信息",trigger:"hover",overlayStyle:{maxWidth:300,overflowY:"auto"}},_react2.default.createElement("p",{style:{width:120,textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden",marginRight:5}},t.commentMessage))}}],columnsModal:[{title:"操作人员",dataIndex:"userName"}],candidateUsers:[],nextTaskId:"",queryParams:r.props.location.state},r}return _createClass(a,[{key:"componentWillMount",value:function(){var e=this.state.queryParams.taskId,t=this.state.queryParams.processInstanceId,c=this;(0,_$fetch.$fetchSync)("/"+_index3.BACKSTAGE_PROJ_NAME+"/workflow/myResolvedTaskDetail",{taskId:e,processInstanceId:t},function(e){var t,a,r,n,i,l,o,s,u;"S"==e.reply.returnCode.type&&(a=(t=e.reply.result.businessName).slice(1),r=t.slice(0,1).toLowerCase()+a,n={},n=e.reply.result[r]?e.reply.result[r]:e.reply.result[t],i=[],l=e.reply.result.triggerPoint,o=e.reply.result.candidateUsers,s=e.reply.result.nextTaskId,u=e.reply.result.hasDefaultListener,e.reply.result.commentList.forEach(function(e,t){e.tableKey=t,"pending"!=e.commentType&&i.push(e)}),c.setState({tableData:i,businessName:t,formData:n,triggerPoint:l,candidateUsers:o,nextTaskId:s,hasDefaultListener:u}),c.setState({loading:!1}))})}},{key:"render",value:function(){var e=this.state.candidateUsers;this.state.queryParams.pathName;return _react2.default.createElement("div",null,_react2.default.createElement("div",{className:"pandora-main-content"},_react2.default.createElement("div",{className:"portlet-tab"},_react2.default.createElement(_tabs2.default,{defaultActiveKey:"1",style:{marginBottom:7}},_react2.default.createElement(TabPane,{tab:this.state.queryParams.tabName,key:"1"},_react2.default.createElement("div",{className:"portlet-body"},_react2.default.createElement(WrapperFormDetail,{businessName:this.state.businessName,formData:this.state.formData,triggerPoint:this.state.triggerPoint,visible:this.state.visible,onCancel:this.hide,queryParams:this.state.queryParams})),1==_index3.IS_SHOW_COMMONENTLIST_INTAB||null==_index3.IS_SHOW_COMMONENTLIST_INTAB?"":_react2.default.createElement("div",null,_react2.default.createElement("div",{className:"table-title",style:{padding:"0 10px",fontWeight:"bold",marginBottom:10,marginTop:20}},"批注信息"),_react2.default.createElement(_table2.default,{pagination:{pageSize:10},loading:this.state.loading,dataSource:this.state.tableData,columns:this.state.columns,size:"middle",rowKey:function(e){return e.taskId+e.commentTime},style:{paddingLeft:10,paddingRight:10,marginLeft:0}})),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:14},e?_react2.default.createElement(_button2.default,{className:"query-btn pandora-btn-fontsize",onClick:this.SelectNextPerson,style:{width:150,height:32,marginLeft:10,borderRadius:3,background:"#108ee9",color:"#fff"}},"选择下一步审批人"):"",_index3.MYRESULT_DETAIL_RETRACT?_react2.default.createElement(_button2.default,{className:"query-btn pandora-btn-fontsize",onClick:this.handleWithdrawTask,style:{width:88,height:32,marginLeft:10,borderRadius:3,background:"#108ee9",color:"#fff"}},"撤回"):"",_react2.default.createElement(_button2.default,{className:"query-btn pandora-btn-fontsize",onClick:this.toIndex,style:{width:88,height:32,marginLeft:10,borderRadius:3}},"返回")))),1==_index3.IS_SHOW_COMMONENTLIST_INTAB||null==_index3.IS_SHOW_COMMONENTLIST_INTAB?_react2.default.createElement(TabPane,{tab:"处理记录",key:"2"},_react2.default.createElement("div",{className:"portlet-body"},_react2.default.createElement(CommentRecordComponent,{data:this.state.tableData}))):"",_react2.default.createElement(TabPane,{tab:"查看流程图",key:"3"},_react2.default.createElement("div",{className:"portlet-body"},_react2.default.createElement(ProcessChart,{processDefinitionId:this.state.queryParams.processDefinitionId,processInstanceId:this.state.queryParams.processInstanceId})))))))}}]),a}();exports.default=_index3.IS_OPEN_MULTI_TABNAV?(0,_routerWrap2.default)(MyResultsFormDetail):MyResultsFormDetail;var FormDetail=function(_React$Component2){_inherits(FormDetail,_React$Component2);var _super2=_createSuper(FormDetail);function FormDetail(props){var _this3;return _classCallCheck(this,FormDetail),_this3=_super2.call(this,props),_defineProperty(_assertThisInitialized(_this3),"displayField",function(e,t,a){var r,n,i=_version3.default.split(".")[0];switch("2"==i?(r=_react2.default.createElement(_input2.default,{type:"textarea",autosize:{minRows:3},style:{width:210}}),n=_react2.default.createElement(_input2.default,{type:"textarea",disabled:!0,autosize:{minRows:3},style:{width:210}})):"3"==i&&(r=_react2.default.createElement(TextArea,{autoSize:{minRows:3},style:{width:210}}),n=_react2.default.createElement(TextArea,{disabled:!0,autoSize:{minRows:3},style:{width:210}})),e){case"TEXT":return _react2.default.createElement(_input2.default,{style:{width:210}});case"TEXT_DISABLED":return _react2.default.createElement(_input2.default,{disabled:!0,style:{width:210}});case"TEXTAREA":return r;case"TEXTAREA_DISABLED":return n;case"NUMBER":return _react2.default.createElement(_input2.default,{type:"number",style:{width:210}});case"FLOAT":return _react2.default.createElement(_input2.default,{style:{width:210}});case"SELECT":_valueRange=a||"";var l=_valueRange.split("|"),o=1;return _react2.default.createElement(_select2.default,{style:{width:210}},l.map(function(e){return _react2.default.createElement(_select2.default.Option,{key:o++,value:e},e)}));case"DATE":return _react2.default.createElement(_datePicker2.default,{style:{width:210},format:_index3.DATE_FORMAT_MOMENT});case"TIME":return _react2.default.createElement(_timePicker2.default,{style:{width:210},placeholder:"请选择时间",format:"HH:mm:ss"});case"MULTISELECT":_valueRange=a||"";var s=_valueRange.split("|"),u=[];return s.forEach(function(e){u.push({label:e,value:e})}),_react2.default.createElement(CheckboxGroup,{options:u});case"UPLOAD":return _react2.default.createElement(_upload2.default,null,_react2.default.createElement(_button2.default,{type:"ghost"},_react2.default.createElement(_icon2.default,{type:"upload"})," Upload"))}}),_defineProperty(_assertThisInitialized(_this3),"validateMaxLen",function(r){return function(e,t,a){t.length>r&&a("数据长度过长！"),a()}}),_defineProperty(_assertThisInitialized(_this3),"getMinMaxFromNumber",function(e){valueRangeTmp=e||"";var t,a=0,r=0,n=valueRangeTmp.length;return 0<n&&(t=valueRangeTmp.split(","),"("==valueRangeTmp.charAt(0)?a=parseInt(t[0].substring(1))+1:"["==valueRangeTmp.charAt(0)&&(a=parseInt(t[0].substring(1))),")"==valueRangeTmp.charAt(n-1)?r=parseInt(t[1].substring(0,t[1].length-1))-1:"]"==valueRangeTmp.charAt(n-1)&&(r=parseInt(t[1].substring(0,t[1].length-1)))),{min:a,max:r}}),_defineProperty(_assertThisInitialized(_this3),"validateNumber",function(i,e){var l=_this3.getMinMaxFromNumber(e);return function(e,t,a){var r,n=(0,_this3.props.form.getFieldValue)(i);!n||((r=parseInt(n))<l.min||r>l.max)&&a("数值不在指定范围"),a()}}),_defineProperty(_assertThisInitialized(_this3),"getRegExpFromFloat",function(accuracy){var _accuracy=accuracy||"",_decimalLen=0,_intLen=0,_arr;0<_accuracy.length&&(_arr=_accuracy.split("|"),1<_arr.length&&(_decimalLen=parseInt(_arr[1]),_intLen=parseInt(_arr[0])-_decimalLen));var accuracyRegExpStr="/^\\d{0,"+_intLen+"}(\\.\\d{0,"+_decimalLen+"})?$/",accuracyRegExp=new RegExp(eval(accuracyRegExpStr));return accuracyRegExp}),_defineProperty(_assertThisInitialized(_this3),"getLenAndRegExpFromText",function(length,validationTmpl){var len=length||"",_validationTmpl=new RegExp;return validationTmpl&&validationTmpl.indexOf("null")<0&&(_validationTmpl=new RegExp(eval("/"+validationTmpl+"/"))),{len:len,regExp:_validationTmpl}}),_defineProperty(_assertThisInitialized(_this3),"addZero",function(e){return 9<e?e:"0"+e}),_defineProperty(_assertThisInitialized(_this3),"hide",function(){_this3.props.form.resetFields(),_this3.setState({withdrawDeleteReason:""}),_this3.props.onCancel()}),_defineProperty(_assertThisInitialized(_this3),"deleteSubmit",function(e){_assertThisInitialized(_this3);e.preventDefault();var n=_this3.props.queryParams.taskId;_this3.props.form.validateFields(function(e,t){var a=t.withdrawDeleteReason,r={taskId:n,withdrawDeleteReason:a};""!=a&&(_this3.hide(),(0,_$fetch2.default)({url:"/"+_index3.BACKSTAGE_PROJ_NAME+"/workflow/withdrawTaskWithCondi",data:_objectSpread({},r)}).then(function(e){var t,a=e.reply.result.canTaskWithdraw,r=e.reply.result.withdrawTask,n=e.reply.result.message;("S"!=e.reply.returnCode.type||a)&&("S"!=e.reply.returnCode.type||r)?"S"==e.reply.returnCode.type&&r&&(_this3.setState({loading:!1}),t={pathname:_this3.props.queryParams.pathName},(0,_tabRouter.goToAndClose)(t)):_modal2.default.error({title:"异常信息",content:n,width:560,okText:"确定"})}))})}),_defineProperty(_assertThisInitialized(_this3),"callbackParent",function(e){_this3.setState({map:e})}),_this3.state={withdrawDeleteReason:""},_this3}return _createClass(FormDetail,[{key:"render",value:function(){var e={labelCol:{span:7},wrapperCol:{span:17}},t=this.props.form.getFieldDecorator,a=this.props.formData||{},r=this.props.businessName,n=BE[r],i=this.props.triggerPoint,l="";return"add"==i?l=_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:7,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"流程启动点:"}),t("leaveReason",{initialValue:"新建"})(this.displayField("TEXT_DISABLED","triggerPoint",""))))):"upd"==i?l=_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:7,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"流程启动点:"}),t("leaveReason",{initialValue:"编辑"})(this.displayField("TEXT_DISABLED","triggerPoint",""))))):"del"==i?l=_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:7,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"流程启动点:"}),t("leaveReason",{initialValue:"删除"})(this.displayField("TEXT_DISABLED","triggerPoint",""))))):null==i&&(l=""),_react2.default.createElement("div",null,_react2.default.createElement(_form2.default,{onSubmit:this.handleSubmit},_react2.default.createElement(n,{callbackParent:this.callbackParent,formData:a,queryParams:this.props.queryParams}),l),_react2.default.createElement(_modal2.default,{title:"您选择撤回该任务的原因是",visible:this.props.visible,width:"600px",onOk:this.deleteSubmit,onCancel:this.hide,okText:"确认",cancelText:"取消"},_react2.default.createElement(_form2.default,{style:{paddingLeft:10,paddingRight:10,marginTop:10,marginBottom:10}},_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{style:{display:"block"}},_react2.default.createElement(FormItem,{label:"撤回原因",labelCol:{span:4},wrapperCol:{span:14}},t("withdrawDeleteReason",{initialValue:this.state.withdrawDeleteReason,rules:[{required:!0,message:"请填写撤回原因后再提交"}]})(this.displayField("TEXTAREA","withdrawDeleteReason",""))))))))}}]),FormDetail}(_react2.default.Component),WrapperFormDetail=_form2.default.create()(FormDetail);function CommentRecordComponent(e){var t=e.data,i={AddComment:"任务完成",TurnToDo:"发起转办",DelegateTask:"发起委派",ResolvedTask:"被委派人完成任务",Close:"关闭流程",Withdraw:"发起撤回",Return:"发起退回"};return t.map(function(e){var t,a,r,n;e.key=e.taskId+e.commentTime,e.endTime&&(e.endTime=_commonUtil2.default.formatDateHour(e.endTime)),e.startTime&&(e.startTime=_commonUtil2.default.formatDateHour(e.startTime)),e.duration&&(t=parseInt(e.duration),a=parseInt(_moment2.default.duration(t).asHours()),r=_moment2.default.duration(t).minutes(),n=_moment2.default.duration(t).seconds(),e.duration=a+"时"+r+"分"+n+"秒"),e.commentAction&&"Withdraw"==e.commentAction&&(e.endTime=new Date(e.commentTime).toLocaleString(),e.startTime=new Date(e.commentTime).toLocaleString(),e.duration="0时0分0秒"),e.commentAction=e.commentAction?i[e.commentAction]:"任务完成"}),_react2.default.createElement(_timeline2.default,{className:"process-comment-list"},t.map(function(e,t){return _react2.default.createElement(TimeItem,{key:e.key,className:"comment-time-item"},_react2.default.createElement("span",{className:"timeline-icon-left"}),_react2.default.createElement("section",{className:"comment-top-box clearfix"},_react2.default.createElement("h1",{className:"comment-taskname"},"环节：",e.taskName),_react2.default.createElement("p",{className:"comment-times"},_react2.default.createElement("span",null,"任务ID：",e.taskId),_react2.default.createElement("span",null,"处理人：",e.userName),_react2.default.createElement("span",null,"操作：",e.commentAction),_react2.default.createElement("span",null,e.startTime),_react2.default.createElement(_icon2.default,{type:"swap-right"}),_react2.default.createElement("span",{className:"comment-end-time"},e.endTime),_react2.default.createElement("span",null,"历时：",e.duration))),_react2.default.createElement("section",{className:"comment-bottom-box"},_react2.default.createElement("p",{className:"comment-info clearfix"},_react2.default.createElement("span",null,"批注信息："),_react2.default.createElement("span",null,e.commentFullMsg)),_react2.default.createElement("p",{className:"comment-option"},e.commentAction)))}))}var ProcessChart=function(){_inherits(r,_react.Component);var a=_createSuper(r);function r(e){var t;return _classCallCheck(this,r),(t=a.call(this,e)).state={diagram:{},highlight:{}},t}return _createClass(r,[{key:"componentDidMount",value:function(){var t=this,a={},r={},e=this.props.processDefinitionId,n=this.props.processInstanceId;(0,_$fetch2.default)({url:"/"+_index3.BACKSTAGE_PROJ_NAME+"/workflow/processDefinitionDiagramLayout",data:{processDefinitionId:e,processInstanceId:n}}).then(function(e){"S"==e.reply.returnCode.type&&(a.activities=e.reply.result.responseJSON.activities,a.sequenceFlows=e.reply.result.responseJSON.sequenceFlows,(0,_$fetch2.default)({url:"/"+_index3.BACKSTAGE_PROJ_NAME+"/workflow/processInstanceHighlightsFunction",data:{processInstanceId:n}}).then(function(e){e.reply.returnCode.type="S",r.activities=e.reply.result.responseJSON.activities,r.flows=e.reply.result.responseJSON.flows,t.setState({diagram:a,highlight:r})}))})}},{key:"render",value:function(){return _react2.default.createElement("div",null,_react2.default.createElement(_HighlightDiagram2.default,{diagram:this.state.diagram,highlight:this.state.highlight}))}}]),r}();module.exports=exports.default;