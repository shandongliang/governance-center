"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _button=require("antd/es/button"),_button2=_interopRequireDefault(_button),_row=require("antd/es/row"),_row2=_interopRequireDefault(_row),_col=require("antd/es/col"),_col2=_interopRequireDefault(_col),_treeSelect=require("antd/es/tree-select"),_treeSelect2=_interopRequireDefault(_treeSelect),_input=require("antd/es/input"),_input2=_interopRequireDefault(_input),_tabs=require("antd/es/tabs"),_tabs2=_interopRequireDefault(_tabs),_form=require("antd/es/form"),_form2=_interopRequireDefault(_form),_tree=require("antd/es/tree"),_tree2=_interopRequireDefault(_tree);require("antd/es/button/style"),require("antd/es/row/style"),require("antd/es/col/style"),require("antd/es/tree-select/style"),require("antd/es/input/style"),require("antd/es/tabs/style"),require("antd/es/form/style"),require("antd/es/tree/style");var _react=require("react"),_react2=_interopRequireDefault(_react),_antd=require("antd"),_fetch=require("./../../../../util/fetch"),_fetch2=_interopRequireDefault(_fetch),_tabRouter=require("./../../../../util/tabRouter.js"),_index=require("./../../../../constant/index");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(r){var a=_isNativeReflectConstruct();return function(){var e,t=_getPrototypeOf(r);return _possibleConstructorReturn(this,a?(e=_getPrototypeOf(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments))}}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}require("./../../../common/style/index.less");var TreeNode=_tree2.default.TreeNode,FormItem=_form2.default.Item,TabPane=_tabs2.default.TabPane,createOrgan=function(){_inherits(r,_react.Component);var t=_createSuper(r);function r(){var e;return _classCallCheck(this,r),(e=t.call(this)).state={selectValue:""},e}return _createClass(r,[{key:"render",value:function(){return _react2.default.createElement("div",null,_react2.default.createElement("div",{className:"pandora-main-content"},_react2.default.createElement("div",{className:"portlet-tab"},_react2.default.createElement(_tabs2.default,{defaultActiveKey:"1",style:{marginBottom:7}},_react2.default.createElement(TabPane,{tab:"创建机构",key:"1"},_react2.default.createElement("div",{className:"portlet-body"},_react2.default.createElement(WrapperCreateForm,null)))))))}}]),r}();exports.default=createOrgan;var CreateForm=function(){_inherits(r,_react2.default.Component);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),_defineProperty(_assertThisInitialized(n=t.call(this,e)),"createPermTree",function(e){var t,r=new Array,a={};for(var n in e){e[n].key=n,(t=e[n]).children=new Array,t.id=t.orgId,a[t.orgId]=t}for(var n in e){(t=e[n]).parentOrgId in a?a[t.parentOrgId].children.push(t):r.push(t)}return r}),_defineProperty(_assertThisInitialized(n),"displayField",function(e,t,r){var a=function t(e){return e.map(function(e){return 0<e.children.length?_react2.default.createElement(TreeNode,{title:e.name,value:e.id,key:e.id},t(e.children)):_react2.default.createElement(TreeNode,{title:e.name,value:e.id,key:e.id})})}(n.state.treeData);switch(e){case"TEXT":return _react2.default.createElement(_input2.default,null);case"TREESELECT":return _react2.default.createElement(_treeSelect2.default,{onChange:n.onChange,getPopupContainer:function(e){return e.parentNode}},a)}}),_defineProperty(_assertThisInitialized(n),"toHandleSubmit",function(){(0,_tabRouter.goToAndClose)({pathname:"/systemManage/organManager/organQur"})}),_defineProperty(_assertThisInitialized(n),"toHandleCancle",function(){(0,_tabRouter.goToAndClose)({pathname:"/systemManage/organManager/organQur"},null,!1)}),_defineProperty(_assertThisInitialized(n),"onChange",function(e){n.setState({parentOrgId:e})}),_defineProperty(_assertThisInitialized(n),"handleSubmit",function(e){e.preventDefault(),n.props.form.validateFieldsAndScroll(function(e,t){e||(n.setState({loading:!0}),(0,_fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/rbac/createOrg",data:{org:{realOrgId:t.realOrgId,orgName:t.name,shortName:t.shortName,parentOrgId:t.parentOrgId,address:t.address}}}).then(function(e){n.setState({loading:!1}),"S"==e.reply.returnCode.type&&n.toHandleSubmit()}))})}),n.state={treeData:[]},n}return _createClass(r,[{key:"componentDidMount",value:function(){var a=this;(0,_fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/rbac/queryAllOrgList",data:{}}).then(function(e){var t,r;"S"==e.reply.returnCode.type&&(t=e.reply.orgList,r=a.createPermTree(t),a.setState({treeData:r}))})}},{key:"render",value:function(){var e={labelCol:{span:5},wrapperCol:{span:19}},t=this.props.form.getFieldDecorator;return _react2.default.createElement(_form2.default,{onSubmit:this.handleSubmit,style:{marginTop:18,marginBottom:50}},_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:10,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"真实机构号"}),t("realOrgId")(this.displayField("TEXT","realOrgId",""))))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:10,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"机构名称"}),t("name",{rules:[{required:!0,message:"请输入机构名称"}]})(this.displayField("TEXT","name",""))))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:10,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"机构简称"}),t("shortName",{rules:[{required:!0,message:"请输入机构简称"}]})(this.displayField("TEXT","shortName",""))))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:10,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"机构地址"}),t("address")(this.displayField("TEXT","address",""))))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:10,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"上级机构"}),t("parentOrgId",{initialValue:this.state.parentOrgId,rules:[{required:!0,message:"请选择上级机构"}]})(this.displayField("TREESELECT","parentOrgId",""))))),_react2.default.createElement(_row2.default,{type:"flex"},_react2.default.createElement(_col2.default,{span:7,offset:1,style:{marginLeft:126,marginTop:15}},_react2.default.createElement(_button2.default,{className:"query-btn operatorBtn pandora-btn-fontsize",htmlType:"submit"},"提交"),_react2.default.createElement(_button2.default,{className:"query-btn pandora-btn-fontsize",onClick:this.toHandleCancle},"取消"))))}}]),r}(),WrapperCreateForm=_form2.default.create()(CreateForm);module.exports=exports.default;