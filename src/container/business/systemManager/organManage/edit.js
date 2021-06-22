"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _button=require("antd/es/button"),_button2=_interopRequireDefault(_button),_treeSelect=require("antd/es/tree-select"),_treeSelect2=_interopRequireDefault(_treeSelect),_row=require("antd/es/row"),_row2=_interopRequireDefault(_row),_col=require("antd/es/col"),_col2=_interopRequireDefault(_col),_input=require("antd/es/input"),_input2=_interopRequireDefault(_input),_tabs=require("antd/es/tabs"),_tabs2=_interopRequireDefault(_tabs),_form=require("antd/es/form"),_form2=_interopRequireDefault(_form);require("antd/es/button/style"),require("antd/es/tree-select/style"),require("antd/es/row/style"),require("antd/es/col/style"),require("antd/es/input/style"),require("antd/es/tabs/style"),require("antd/es/form/style");var _react=require("react"),_react2=_interopRequireDefault(_react),_antd=require("antd"),_fetch=require("./../../../../util/fetch"),_fetch2=_interopRequireDefault(_fetch),_tabRouter=require("./../../../../util/tabRouter.js"),_index=require("./../../../../constant/index");require("./../../../common/style/index.less");var _routerWrap=require("./../../../../util/routerWrap"),_routerWrap2=_interopRequireDefault(_routerWrap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}function ownKeys(t,e){var r,a=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a.push.apply(a,r)),a}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(r),!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(r){var a=_isNativeReflectConstruct();return function(){var e,t=_getPrototypeOf(r);return _possibleConstructorReturn(this,a?(e=_getPrototypeOf(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments))}}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var FormItem=_form2.default.Item,TabPane=_tabs2.default.TabPane,editOrgan=function(){_inherits(a,_react.Component);var r=_createSuper(a);function a(e){var t;return _classCallCheck(this,a),(t=r.call(this,e)).state={selectValue:"",queryParams:t.props.location.state},t}return _createClass(a,[{key:"render",value:function(){return _react2.default.createElement("div",null,_react2.default.createElement("div",{className:"pandora-main-content"},_react2.default.createElement("div",{className:"portlet-tab"},_react2.default.createElement(_tabs2.default,{defaultActiveKey:"1",style:{marginBottom:7}},_react2.default.createElement(TabPane,{tab:"编辑机构",key:"1"},_react2.default.createElement("div",{className:"portlet-body"},_react2.default.createElement(WrapperEditForm,{queryParams:this.state.queryParams})))))))}}]),a}();exports.default=_index.IS_OPEN_MULTI_TABNAV?(0,_routerWrap2.default)(editOrgan):editOrgan;var EditForm=function(){_inherits(r,_react2.default.Component);var t=_createSuper(r);function r(e){var s;return _classCallCheck(this,r),_defineProperty(_assertThisInitialized(s=t.call(this,e)),"queryDetail",function(){var e=s.props.queryParams.orgId;(0,_fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/rbac/queryOrgDetail",data:{orgId:e}}).then(function(e){var t,r,a,n,o,l;"S"==e.reply.returnCode.type&&(t=e.reply.org.realOrgId,r=e.reply.org.name,a=e.reply.org.shortName,n=e.reply.org.address,o=e.reply.org.parentOrgId,"NORMAL"==(l=e.reply.org.status)?l="正常":"CANCELLED"==l&&(l="作废"),s.setState({realOrgId:t,name:r,shortName:a,parentOrgId:o,address:n,status:l}))})}),_defineProperty(_assertThisInitialized(s),"queryAllOrgan",function(){(0,_fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/rbac/queryAllOrgList",data:{}}).then(function(e){var t,r;"S"==e.reply.returnCode.type&&(t=e.reply.orgList,r=s.getOrgTree(t),s.setState({treeData:r}))})}),_defineProperty(_assertThisInitialized(s),"getOrgTree",function(e){var t=s.props.queryParams.orgId,r=[],a={},n=[];e.forEach(function(e){var t={title:e.name,value:e.orgId,key:e.orgId,children:[],parentOrgId:e.parentOrgId};r.push(t),a[e.orgId]=t});var o=r.findIndex(function(e){return e.value==t});-1<o&&(r.splice(o,1),delete a[t]);for(var l=0,i=r;l<i.length;l++){var u=i[l];u.parentOrgId in a?a[u.parentOrgId].children.push(u):n.push(u)}return n}),_defineProperty(_assertThisInitialized(s),"displayField",function(e){switch(e){case"TEXT":return _react2.default.createElement(_input2.default,null)}}),_defineProperty(_assertThisInitialized(s),"goToDetail",function(){var e=/\/([^/]+)$/.exec(window.location.hash),t=e&&e[1],r={pathname:_index.IS_OPEN_MULTI_TABNAV?"/systemManage/organManager/organDetail/"+t:"/systemManage/organManager/organDetail",state:_objectSpread({},s.props.queryParams)};(0,_tabRouter.goToAndClose)(r)}),_defineProperty(_assertThisInitialized(s),"onChange",function(e){s.setState({parentOrgId:e})}),_defineProperty(_assertThisInitialized(s),"handleSubmit",function(e){e.preventDefault(),s.props.form.validateFieldsAndScroll(function(e,t){var r;e||(s.setState({loading:!0}),r=s.props.queryParams.orgId,(0,_fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/rbac/editOrg",data:{org:{orgId:r,realOrgId:t.realOrgId,orgName:t.name,shortName:t.shortName,parentOrgId:t.parentOrgId,address:t.address}}}).then(function(e){s.setState({loading:!1}),"S"==e.reply.returnCode.type&&s.goToDetail()}))})}),s.state={treeData:[]},s}return _createClass(r,[{key:"componentDidMount",value:function(){this.queryDetail(),this.queryAllOrgan()}},{key:"render",value:function(){var e={labelCol:{span:6},wrapperCol:{span:18}},t=this.props.form.getFieldDecorator;return _react2.default.createElement(_form2.default,{onSubmit:this.handleSubmit,style:{marginBottom:50}},_react2.default.createElement(_row2.default,{style:{marginTop:18}},_react2.default.createElement(_col2.default,{span:10,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"真实机构号"}),t("realOrgId",{initialValue:this.state.realOrgId})(this.displayField("TEXT","realOrgId",""))))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:10,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"机构名称"}),t("name",{initialValue:this.state.name,rules:[{required:!0,message:"请输入机构名称"}]})(this.displayField("TEXT","name",""))))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:10,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"机构简称"}),t("shortName",{initialValue:this.state.shortName,rules:[{required:!0,message:"请输入机构简称"}]})(this.displayField("TEXT","shortName",""))))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:10,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"机构地址"}),t("address",{initialValue:this.state.address})(this.displayField("TEXT","address",""))))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:10,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"上级机构"}),t("parentOrgId",{initialValue:this.state.parentOrgId,rules:[{required:!0,message:"请选择上级机构"}]})(_react2.default.createElement(_treeSelect2.default,{treeData:this.state.treeData,onChange:this.onChange,getPopupContainer:function(e){return e.parentNode}}))))),_react2.default.createElement(_row2.default,{type:"flex"},_react2.default.createElement(_col2.default,{span:7,offset:1,style:{marginLeft:142}},_react2.default.createElement(_button2.default,{className:"query-btn operatorBtn pandora-btn-fontsize",htmlType:"submit"},"提交"),_react2.default.createElement(_button2.default,{className:"query-btn pandora-btn-fontsize",onClick:this.goToDetail},"取消"))))}}]),r}(),WrapperEditForm=_form2.default.create()(EditForm);module.exports=exports.default;