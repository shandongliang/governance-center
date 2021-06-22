"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _table=require("antd/es/table"),_table2=_interopRequireDefault(_table),_row=require("antd/es/row"),_row2=_interopRequireDefault(_row),_col=require("antd/es/col"),_col2=_interopRequireDefault(_col),_message2=require("antd/es/message"),_message3=_interopRequireDefault(_message2),_modal=require("antd/es/modal"),_modal2=_interopRequireDefault(_modal),_upload=require("antd/es/upload"),_upload2=_interopRequireDefault(_upload),_button=require("antd/es/button"),_button2=_interopRequireDefault(_button),_icon=require("antd/es/icon"),_icon2=_interopRequireDefault(_icon),_timePicker=require("antd/es/time-picker"),_timePicker2=_interopRequireDefault(_timePicker),_datePicker=require("antd/es/date-picker"),_datePicker2=_interopRequireDefault(_datePicker),_select=require("antd/es/select"),_select2=_interopRequireDefault(_select),_input=require("antd/es/input"),_input2=_interopRequireDefault(_input),_tabs=require("antd/es/tabs"),_tabs2=_interopRequireDefault(_tabs),_form=require("antd/es/form"),_form2=_interopRequireDefault(_form),_radio=require("antd/es/radio"),_radio2=_interopRequireDefault(_radio),_checkbox=require("antd/es/checkbox"),_checkbox2=_interopRequireDefault(_checkbox);require("antd/es/table/style"),require("antd/es/row/style"),require("antd/es/col/style"),require("antd/es/message/style"),require("antd/es/modal/style"),require("antd/es/upload/style"),require("antd/es/button/style"),require("antd/es/icon/style"),require("antd/es/time-picker/style"),require("antd/es/date-picker/style"),require("antd/es/select/style"),require("antd/es/input/style"),require("antd/es/tabs/style"),require("antd/es/form/style"),require("antd/es/radio/style"),require("antd/es/checkbox/style");var _react=require("react"),_react2=_interopRequireDefault(_react),_antd=require("antd"),_index=require("./../../../../constant/index"),_tabRouter=require("./../../../../util/tabRouter.js"),_$fetch=require("$fetch"),_$fetch2=_interopRequireDefault(_$fetch);require("./../../../common/style/index.less");var _commonUtil=require("./../../../../util/commonUtil"),_commonUtil2=_interopRequireDefault(_commonUtil);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function ownKeys(t,e){var a,r=Object.keys(t);return Object.getOwnPropertySymbols&&(a=Object.getOwnPropertySymbols(t),e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,a)),r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(a),!0).forEach(function(e){_defineProperty(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):ownKeys(Object(a)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}function _defineProperty(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(a){var r=_isNativeReflectConstruct();return function(){var e,t=_getPrototypeOf(a);return _possibleConstructorReturn(this,r?(e=_getPrototypeOf(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments))}}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var CheckboxGroup=_checkbox2.default.Group,RadioGroup=_radio2.default.Group,FormItem=_form2.default.Item,TabPane=_tabs2.default.TabPane,BusiProcConfDetail=function(){_inherits(r,_react.Component);var a=_createSuper(r);function r(e){var t;return _classCallCheck(this,r),(t=a.call(this,e)).state={queryParams:t.props.location.state},t}return _createClass(r,[{key:"render",value:function(){return _react2.default.createElement("div",null,_react2.default.createElement("div",{className:"pandora-main-content"},_react2.default.createElement("div",{className:"portlet-tab"},_react2.default.createElement(_tabs2.default,{defaultActiveKey:"1",style:{marginBottom:7}},_react2.default.createElement(TabPane,{tab:"业务流程配置详情",key:"1"},_react2.default.createElement("div",{className:"portlet-body"},_react2.default.createElement(WrapperFormDetail,{queryParams:this.state.queryParams})))))))}}]),r}();exports.default=BusiProcConfDetail;var FormDetail=function(){_inherits(r,_react2.default.Component);var t=_createSuper(r);function r(e){var a;return _classCallCheck(this,r),_defineProperty(_assertThisInitialized(a=t.call(this,e)),"displayField",function(e,t,a){switch(e){case"TEXT":return _react2.default.createElement(_input2.default,{placeholder:"",disabled:!0,style:{width:210}});case"NUMBER":return _react2.default.createElement(_input2.default,{type:"number",style:{width:210},disabled:!0});case"FLOAT":return _react2.default.createElement(_input2.default,{placeholder:"",disabled:!0,style:{width:210}});case"SELECT":_valueRange=a||"";var r=_valueRange.split("|"),l=1;return _react2.default.createElement(_select2.default,{style:{width:210},disabled:!0},r.map(function(e){return _react2.default.createElement(_select2.default.Option,{key:l++,value:e},e)}));case"DATE":return _react2.default.createElement(_datePicker2.default,{style:{width:210},format:_index.DATE_FORMAT_MOMENT,disabled:!0});case"TIME":return _react2.default.createElement(_timePicker2.default,{placeholder:"请选择时间",format:"HH:mm:ss",style:{width:210},disabled:!0});case"MULTISELECT":_valueRange=a||"";var n=_valueRange.split("|"),i=[];return n.forEach(function(e){i.push({label:e,value:e})}),_react2.default.createElement(CheckboxGroup,{options:i,disabled:!0});case"UPLOAD":return _react2.default.createElement(_upload2.default,null,_react2.default.createElement(_button2.default,{type:"ghost"},_react2.default.createElement(_icon2.default,{type:"upload"})," Upload"))}}),_defineProperty(_assertThisInitialized(a),"toEdit",function(){var e={pathname:"/processManager/busiProcConf/edit",state:_objectSpread({},a.props.queryParams)};(0,_tabRouter.goTo)(e,"编辑业务流程配置")}),_defineProperty(_assertThisInitialized(a),"toDelete",function(){var e=a.props.queryParams.id,t=_assertThisInitialized(a);_modal2.default.confirm({title:"您确定删除业务待办任务展示字段表？",content:"删除后将无法返回...",onOk:function(){t.setState({loading:!0}),(0,_$fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/workflow/deleteBusiProcConf",data:{id:e}}).then(function(e){"S"==e.reply.returnCode.type&&(t.toHandleCancle(),_message3.default.info("删除成功"))})},onCancel:function(){_message3.default.info("删除取消")}})}),_defineProperty(_assertThisInitialized(a),"toHandleCancle",function(){var e={pathname:"/processManager/busiProcConf/index",state:_objectSpread({},a.props.queryParams)};(0,_tabRouter.goToAndClose)(e)}),a.state={loading:!1,columns:[{title:"表名",dataIndex:"tableName",width:200},{title:"表字段名称",dataIndex:"columnName",width:200},{title:"表字段说明",dataIndex:"columnDec"},{title:"排序",dataIndex:"sort"},{title:"是否作为查询条件",dataIndex:"isQueryCriteria",width:200,render:function(e){return _react2.default.createElement("div",null,_react2.default.createElement(RadioGroup,{value:e},_react2.default.createElement(_radio2.default,{value:"1"},"是"),_react2.default.createElement(_radio2.default,{value:"0"},"否")))}},{title:"查询类型",dataIndex:"queryType",render:function(e){return _react2.default.createElement(_select2.default,{disabled:!0,style:{width:120},value:e,getPopupContainer:function(e){return e.parentNode}},_react2.default.createElement(_select2.default.Option,{value:"equal"},"精确查询"),_react2.default.createElement(_select2.default.Option,{value:"like"},"模糊查询"),_react2.default.createElement(_select2.default.Option,{value:"between"},"区间查询"),_react2.default.createElement(_select2.default.Option,{value:"greaterThanOrEqual"},"大于等于"),_react2.default.createElement(_select2.default.Option,{value:"greaterThan"},"大于"),_react2.default.createElement(_select2.default.Option,{value:"lessThanOrEqual"},"小于等于"),_react2.default.createElement(_select2.default.Option,{value:"lessThan"},"小于"))}},{title:"是否显示在表格",dataIndex:"isDisplaytable",width:200,render:function(e){return _react2.default.createElement("div",null,_react2.default.createElement(RadioGroup,{value:e},_react2.default.createElement(_radio2.default,{value:"1"},"是"),_react2.default.createElement(_radio2.default,{value:"0"},"否")))}},{title:"表格列宽",dataIndex:"columnWidth",render:function(e){return _react2.default.createElement(_input2.default,{type:"text",value:e,disabled:!0})}},{title:"表字段别名",dataIndex:"columnAlias"},{title:"表字段类型",dataIndex:"columnDataType"}]},a}return _createClass(r,[{key:"componentDidMount",value:function(){var o=this,e=this.props.queryParams.id;(0,_$fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/workflow/queryBusiProcConfDetail",data:{id:e}}).then(function(e){var t,a,r,l,n,i;"S"==e.reply.returnCode.type&&(t=e.reply.busiProcConf,a=e.reply.busiProcConf.latitude,r=e.reply.busiProcConfColumns,l=_commonUtil2.default.formatDateHour(t.createTime),n=t.updateTime?_commonUtil2.default.formatDateHour(t.updateTime):"",i={name:t.name,label:t.label,procKey:t.procKey,createUser:t.createUser.split(".")[1],updateUser:t.updateUser?t.updateUser.split(".")[1]:"",createTime:l,updateTime:n},o.setState(_objectSpread(_objectSpread({pagination:Object.assign({},o.state.pagination,e.reply.page),busiProcConfColumns:r,loading:!1},i),{},{latitude:a})),o.setState({loading:!1}))})}},{key:"render",value:function(){var e={labelCol:{span:10},wrapperCol:{span:14}},t=this.props.form.getFieldDecorator,a=this.state.latitude,r="业务名称",l="业务ID",n="业务关联的流程";return"BUSI"===a?(r="业务名称",l="业务ID",n="业务关联的流程"):"ROLE"===a?(r="角色名称",l="角色ID",n="角色关联的流程"):"POST"===a&&(r="岗位名称",l="岗位ID",n="岗位关联的流程"),_react2.default.createElement(_form2.default,{onSubmit:this.handleSubmit},_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:7,offset:1},_react2.default.createElement(FormItem,_extends({},e,{label:r}),t("name",{initialValue:this.state.name})(this.displayField("TEXT","name","")))),_react2.default.createElement(_col2.default,{span:7,offset:1},_react2.default.createElement(FormItem,_extends({},e,{label:l}),t("label",{initialValue:this.state.label})(this.displayField("TEXT","label",""))))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:7,offset:1},_react2.default.createElement(FormItem,_extends({},e,{label:n}),t("procKey",{initialValue:this.state.procKey})(this.displayField("TEXT","procKey","")))),_react2.default.createElement(_col2.default,{span:7,offset:1},_react2.default.createElement(FormItem,_extends({},e,{label:"创建用户"}),t("createUser",{initialValue:this.state.createUser})(this.displayField("TEXT","createUser",""))))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:7,offset:1},_react2.default.createElement(FormItem,_extends({},e,{label:"创建时间"}),t("createTime",{initialValue:this.state.createTime})(this.displayField("TEXT","createTime","")))),_react2.default.createElement(_col2.default,{span:7,offset:1},_react2.default.createElement(FormItem,_extends({},e,{label:"修改用户"}),t("updateUser",{initialValue:this.state.updateUser})(this.displayField("TEXT","updateUser",""))))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:7,offset:1},_react2.default.createElement(FormItem,_extends({},e,{label:"修改时间"}),t("updateTime",{initialValue:this.state.updateTime})(this.displayField("TEXT","updateTime",""))))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{className:"pandora-btn-fontsize",span:23,offset:1,style:{paddingLeft:10,height:32,color:"rgba(0,0,0,0.85)"}},_react2.default.createElement("p",null,"业务流程配置列表")),_react2.default.createElement(_col2.default,{span:23,offset:1},_react2.default.createElement(_table2.default,{pagination:this.state.pagination,loading:this.state.loading,dataSource:this.state.busiProcConfColumns,columns:this.state.columns,onChange:this.tableChangeHandle,style:{paddingLeft:10,paddingRight:10},size:"middle",rowKey:"id",scroll:{x:1600}}))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:22,offset:2},_react2.default.createElement(_button2.default,{onClick:this.toEdit,className:"operatorBtn pandora-btn-fontsize",style:{marginLeft:50,marginTop:20,width:88,borderRadius:5}},"编辑"),_react2.default.createElement(_button2.default,{onClick:this.toDelete,className:"delBtn pandora-btn-fontsize",style:{marginLeft:10,marginTop:20,width:88,borderRadius:5}},"删除"),_react2.default.createElement(_button2.default,{onClick:this.toHandleCancle,className:"cancelBtn pandora-btn-fontsize",style:{marginLeft:10,width:88,borderRadius:5}},"取消"))))}}]),r}(),WrapperFormDetail=_form2.default.create()(FormDetail);module.exports=exports.default;