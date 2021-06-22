"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _row=require("antd/es/row"),_row2=_interopRequireDefault(_row),_col=require("antd/es/col"),_col2=_interopRequireDefault(_col),_upload=require("antd/es/upload"),_upload2=_interopRequireDefault(_upload),_button=require("antd/es/button"),_button2=_interopRequireDefault(_button),_datePicker=require("antd/es/date-picker"),_datePicker2=_interopRequireDefault(_datePicker),_select=require("antd/es/select"),_select2=_interopRequireDefault(_select),_input=require("antd/es/input"),_input2=_interopRequireDefault(_input),_table=require("antd/es/table"),_table2=_interopRequireDefault(_table),_icon=require("antd/es/icon"),_icon2=_interopRequireDefault(_icon),_tabs=require("antd/es/tabs"),_tabs2=_interopRequireDefault(_tabs),_form=require("antd/es/form"),_form2=_interopRequireDefault(_form);require("antd/es/row/style"),require("antd/es/col/style"),require("antd/es/upload/style"),require("antd/es/button/style"),require("antd/es/date-picker/style"),require("antd/es/select/style"),require("antd/es/input/style"),require("antd/es/table/style"),require("antd/es/icon/style"),require("antd/es/tabs/style"),require("antd/es/form/style");var _react=require("react"),_react2=_interopRequireDefault(_react),_antd=require("antd"),_index=require("./../../../../../constant/index"),_$fetch=require("$fetch"),_$fetch2=_interopRequireDefault(_$fetch),_tabRouter=require("./../../../../../util/tabRouter.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ownKeys(t,e){var r,a=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a.push.apply(a,r)),a}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(r),!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(r){var a=_isNativeReflectConstruct();return function(){var e,t=_getPrototypeOf(r);return _possibleConstructorReturn(this,a?(e=_getPrototypeOf(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments))}}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}require("./../../../../common/style/index.less");var FormItem=_form2.default.Item,TabPane=_tabs2.default.TabPane,BusiAPIManageIndex=function(){_inherits(r,_react.Component);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),_defineProperty(_assertThisInitialized(n=t.call(this,e)),"fetchData",function(e){n.setState({loading:!0});e.current,e.pageSize;(0,_$fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/workflow/queryActBusiConfigList",data:_objectSpread({},e)}).then(function(e){var t=n.state.pagination;t.total=e.reply.page.total,t.current=e.reply.page.pageNo,n.setState({pagination:t,data:e.reply.actBusiConfigList,loading:!1})})}),_defineProperty(_assertThisInitialized(n),"tableChangeHandle",function(e,t,r){n.setState({pagination:e});var a=_objectSpread(_objectSpread({},n.state.param),{},{pageNo:e.current,recordsPerPage:e.pageSize});n.fetchData(a)}),_defineProperty(_assertThisInitialized(n),"toDetail",function(t){return function(){var e={pathname:_index.IS_OPEN_MULTI_TABNAV?"/processManager/myProcess/busiAPIManage/detail/"+t:"/processManager/myProcess/busiAPIManage/detail",state:{pagination:n.state.pagination,procdefKey:n.state.procdefKey,compName:n.state.compName,funcName:n.state.funcName,id:t}};(0,_tabRouter.goTo)(e,"流程配置信息")}}),_defineProperty(_assertThisInitialized(n),"toCreate",function(){(0,_tabRouter.goTo)({pathname:"/processManager/myProcess/busiAPIManage/create"},"创建流程配置")}),_defineProperty(_assertThisInitialized(n),"getDate",function(e){if(e){var t=new Date(parseInt(e)).toLocaleString().replace(/\//g,"-");return t.substring(0,t.indexOf(" "))}return""}),_defineProperty(_assertThisInitialized(n),"onChildQuery",function(e){n.setState(_objectSpread({},e))}),_defineProperty(_assertThisInitialized(n),"onRef",function(e){n.child=e}),_defineProperty(_assertThisInitialized(n),"reSetQuery",function(){var e;n.state.queryCondition&&(e={procdefKey:n.state.queryCondition.procdefKey,compName:n.state.queryCondition.compName,funcName:n.state.queryCondition.funcName},n.child.props.form.setFieldsValue(_objectSpread({},e)))}),n.state={loading:!1,data:[],param:{},pagination:{pageSize:10,pageSizeChanger:!0,current:1},columns:[{title:"业务API配置KEY",dataIndex:"procdefKey",render:function(e){return _react2.default.createElement("a",{href:"javascript:;",onClick:n.toDetail(e)},e)}},{title:"模块名称",dataIndex:"compName"},{title:"方法名称",dataIndex:"funcName"}]},n}return _createClass(r,[{key:"componentDidMount",value:function(){var e,t=this,r={},r=this.props.location.state?(e=this.props.location.state,this.setState(_objectSpread({queryCondition:e},e),function(){t.reSetQuery()}),{pageNo:e.pagination.current,recordsPerPage:e.pagination.pageSize,procdefKey:e.procdefKey,compName:e.compName,funcName:e.funcName}):{pageNo:this.state.pagination.current,recordsPerPage:this.state.pagination.pageSize};this.fetchData(r)}},{key:"render",value:function(){return _react2.default.createElement("div",null,_react2.default.createElement("div",{className:"pandora-main-content"},_react2.default.createElement("div",{className:"portlet-tab"},_react2.default.createElement(_tabs2.default,{defaultActiveKey:"1",style:{marginBottom:7}},_react2.default.createElement(TabPane,{tab:"流程配置查询",key:"1"},_react2.default.createElement("div",{className:"portlet-body"},_react2.default.createElement("div",{className:"query-condition"},_react2.default.createElement(WrapperQueryForm,{reSetQuery:this.onRef,callbackParent:this.onChildQuery})),_react2.default.createElement("div",{className:"role-table"},_react2.default.createElement("div",{className:"role-header"},_react2.default.createElement("div",{className:"role-list"},"流程配置列表"),_react2.default.createElement("div",{className:"role-create1",onClick:this.toCreate},_react2.default.createElement(_icon2.default,{className:"role-icon",type:"plus"}),_react2.default.createElement("span",null,"创建流程配置")))),_react2.default.createElement(_table2.default,{pagination:this.state.pagination,loading:this.state.loading,dataSource:this.state.data,columns:this.state.columns,onChange:this.tableChangeHandle,size:"middle",rowKey:"procdefKey",style:{paddingLeft:10,paddingRight:10}})))))))}}]),r}();exports.default=BusiAPIManageIndex;var QueryForm=function(_React$Component){_inherits(QueryForm,_React$Component);var _super2=_createSuper(QueryForm);function QueryForm(props){var _this3;return _classCallCheck(this,QueryForm),_this3=_super2.call(this,props),_defineProperty(_assertThisInitialized(_this3),"displayField",function(e,t,r){switch(e){case"TEXT":return _react2.default.createElement(_input2.default,{placeholder:""});case"NUMBER":return _react2.default.createElement(_input2.default,{type:"number",style:{width:210}});case"FLOAT":return _react2.default.createElement(_input2.default,{placeholder:"",style:{width:210}});case"SELECT":_valueRange=r||"";var a=_valueRange.split("|"),n=1;return _react2.default.createElement(_select2.default,{style:{width:210},getPopupContainer:function(e){return e.parentNode}},a.map(function(e){return _react2.default.createElement(_select2.default.Option,{key:n++,value:e},e)}));case"DATE":return _react2.default.createElement(_datePicker2.default,{style:{width:210},format:_index.DATE_FORMAT_MOMENT});case"TIME":case"MULTISELECT":return _react2.default.createElement(_input2.default,{placeholder:"",style:{width:210}});case"UPLOAD":return _react2.default.createElement(_upload2.default,null,_react2.default.createElement(_button2.default,{type:"ghost"},_react2.default.createElement(_icon2.default,{type:"upload"})," Upload"))}}),_defineProperty(_assertThisInitialized(_this3),"handleReset",function(){_this3.props.form.resetFields()}),_defineProperty(_assertThisInitialized(_this3),"handleSearch",function(e){e.preventDefault(),_this3.props.form.validateFields(function(e,t){e||(_this3.setState(_objectSpread({},t)),_this3.setState({loading:!0}),(0,_$fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/workflow/queryActBusiConfigList",data:t}).then(function(e){var t=_this3.state.pagination;t.total=e.reply.page.total,t.current=e.reply.page.pageNo,_this3.setState({pagination:t,data:e.reply.actBusiConfigList,loading:!1}),_this3.props.callbackParent(_this3.state)}))})}),_defineProperty(_assertThisInitialized(_this3),"getLenAndRegExpFromText",function(length,validationTmpl){var len=length||"",_validationTmpl=new RegExp;return validationTmpl&&validationTmpl.indexOf("null")<0&&(_validationTmpl=new RegExp(eval("/"+validationTmpl+"/"))),{len:len,regExp:_validationTmpl}}),_this3.state={pagination:{current:1,pageSize:10}},_this3}return _createClass(QueryForm,[{key:"componentDidMount",value:function(){this.props.reSetQuery(this)}},{key:"render",value:function(){var e={labelCol:{span:10},wrapperCol:{span:14}},t=this.props.form.getFieldDecorator;return _react2.default.createElement(_form2.default,{onSubmit:this.handleSearch,style:{marginLeft:18}},_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:8,offset:1},_react2.default.createElement(FormItem,_extends({},e,{label:"业务API配置KEY"}),t("procdefKey",{rules:[{max:this.getLenAndRegExpFromText(50,"").len,message:"数据长度过长"}]})(this.displayField("TEXT","procdefKey","")))),_react2.default.createElement(_col2.default,{span:8,offset:1},_react2.default.createElement(FormItem,_extends({},e,{label:"模块名称"}),t("compName")(this.displayField("TEXT","compName",""))))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:8,offset:1},_react2.default.createElement(FormItem,_extends({},e,{label:"方法名称"}),t("funcName")(this.displayField("TEXT","funcName","")))),_react2.default.createElement(_col2.default,{span:7,offset:4},_react2.default.createElement(_button2.default,{className:"query-btn operatorBtn pandora-btn-fontsize",htmlType:"submit",type:"primary"},"查询"),_react2.default.createElement(_button2.default,{className:"query-btn pandora-btn-fontsize",onClick:this.handleReset},"清空"))))}}]),QueryForm}(_react2.default.Component),WrapperQueryForm=_form2.default.create()(QueryForm);module.exports=exports.default;