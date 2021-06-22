"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _row=require("antd/es/row"),_row2=_interopRequireDefault(_row),_col=require("antd/es/col"),_col2=_interopRequireDefault(_col),_input=require("antd/es/input"),_input2=_interopRequireDefault(_input),_table=require("antd/es/table"),_table2=_interopRequireDefault(_table),_icon=require("antd/es/icon"),_icon2=_interopRequireDefault(_icon),_button=require("antd/es/button"),_button2=_interopRequireDefault(_button),_message2=require("antd/es/message"),_message3=_interopRequireDefault(_message2),_modal=require("antd/es/modal"),_modal2=_interopRequireDefault(_modal),_tabs=require("antd/es/tabs"),_tabs2=_interopRequireDefault(_tabs),_form=require("antd/es/form"),_form2=_interopRequireDefault(_form);require("antd/es/row/style"),require("antd/es/col/style"),require("antd/es/input/style"),require("antd/es/table/style"),require("antd/es/icon/style"),require("antd/es/button/style"),require("antd/es/message/style"),require("antd/es/modal/style"),require("antd/es/tabs/style"),require("antd/es/form/style");var _react=require("react"),_react2=_interopRequireDefault(_react),_antd=require("antd"),_fetch=require("./../../../../util/fetch"),_fetch2=_interopRequireDefault(_fetch),_tabRouter=require("./../../../../util/tabRouter.js"),_index=require("./../../../../constant/index");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function ownKeys(t,e){var r,n=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)),n}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(r),!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(r){var n=_isNativeReflectConstruct();return function(){var e,t=_getPrototypeOf(r);return _possibleConstructorReturn(this,n?(e=_getPrototypeOf(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments))}}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}require("./../../../common/style/index.less");var FormItem=_form2.default.Item,TabPane=_tabs2.default.TabPane,menuManage=function(){_inherits(t,_react.Component);var e=_createSuper(t);function t(){var i;return _classCallCheck(this,t),_defineProperty(_assertThisInitialized(i=e.call(this)),"goToEdit",function(t){return function(){var e={pathname:_index.IS_OPEN_MULTI_TABNAV?"/systemManage/menuManage/menuEdit/"+t:"/systemManage/menuManage/menuEdit",state:{menuName:i.state.menuName,menuId:t,parentMenuId:i.state.parentMenuId,pageFlag:"index"}};(0,_tabRouter.goTo)(e,"编辑菜单")}}),_defineProperty(_assertThisInitialized(i),"deleteMenu",function(n){return function(){var r=_assertThisInitialized(i),e=n.menuId,t=n.menuName;_modal2.default.confirm({title:"您确定删除当前菜单["+t+"]？",content:"删除后将无法返回...",onOk:function(){(0,_fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/rbac/deleteMenu",data:{menuId:e}}).then(function(e){var t;"S"==e.reply.returnCode.type&&(_message3.default.info("删除成功"),t={menuName:r.state.menuName,parentMenuId:r.state.parentMenuId},r.fetchData(t))})},onCancel:function(){_message3.default.info("删除取消")}})}}),_defineProperty(_assertThisInitialized(i),"handlerMenuQuery",function(){var e=i.refs.menuName.refs.input.value,t=i.refs.parentMenuId.refs.input.value;i.setState({menuName:e,parentMenuId:t});var r={menuName:e,parentMenuId:t},n=Object.assign({},r);i.fetchData(n)}),_defineProperty(_assertThisInitialized(i),"fetchData",function(e){i.setState({loading:!0});var t=e.menuName,r=e.parentMenuId;(0,_fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/rbac/queryMenuList",data:{menuName:t,parentMenuId:r}}).then(function(e){var t=i.createPermTree(e.reply.menuList);i.setState({data:t,loading:!1})})}),_defineProperty(_assertThisInitialized(i),"createPermTree",function(e){var t,r=new Array,n={};for(var a in e){e[a].key=a,(t=e[a]).children=new Array,n[t.menuId]=t}for(var a in e.sort(i.sortBy("sort")),e){(t=e[a]).parentMenuId in n?n[t.parentMenuId].children.push(t):r.push(t)}return r=i.deleteChildren(r)}),_defineProperty(_assertThisInitialized(i),"sortBy",function(a){return function(e,t){var r,n;if("object"===_typeof(e)&&"object"===_typeof(t)&&e&&t)return(r=e[a])===(n=t[a])?0:_typeof(r)===_typeof(n)?r<n?-1:1:_typeof(r)<_typeof(n)?-1:1;throw"error"}}),_defineProperty(_assertThisInitialized(i),"deleteChildren",function(e){for(var t in e){var r=e[t];0==r.children.length?delete r.children:i.deleteChildren(r.children)}return e}),_defineProperty(_assertThisInitialized(i),"goToDetail",function(t){return function(){var e={pathname:_index.IS_OPEN_MULTI_TABNAV?"/systemManage/menuManage/menuDetail/"+t:"/systemManage/menuManage/menuDetail",state:{menuName:i.state.menuName,menuId:t,parentMenuId:i.state.parentMenuId}};(0,_tabRouter.goTo)(e,"菜单信息")}}),_defineProperty(_assertThisInitialized(i),"goToCreateMenu",function(){(0,_tabRouter.goTo)({pathname:"/systemManage/menuManage/menuCreate"},"创建菜单")}),_defineProperty(_assertThisInitialized(i),"onChildQuery",function(e){i.setState(_objectSpread({},e))}),_defineProperty(_assertThisInitialized(i),"onRef",function(e){i.child=e}),_defineProperty(_assertThisInitialized(i),"reSetQuery",function(){var e;i.state.queryCondition&&(e={menuName:i.state.queryCondition.menuName,parentMenuId:i.state.queryCondition.parentMenuId},i.child.props.form.setFieldsValue(_objectSpread({},e)))}),i.state={loading:!1,menuName:"",parentMenuId:"",data:[],columns:[{title:"菜单名称",dataIndex:"menuName",render:function(e,t){var r=t.menuId;return _react2.default.createElement("div",{style:{display:"inline-block"}},_react2.default.createElement("a",{onClick:i.goToDetail(r)},e))}},{title:"菜单ID",dataIndex:"menuId"},{title:"父菜单ID",dataIndex:"parentMenuId"},{title:"action",dataIndex:"action"},{title:"tab",dataIndex:"tab"},{title:"排序",dataIndex:"sort"},{title:"操作",width:210,dataIndex:"",render:function(e,t){var r=t.menuId;return _react2.default.createElement("div",null,_react2.default.createElement(_button2.default,{className:"pandora-btn-fontsize",onClick:i.goToEdit(r),style:{marginLeft:5,width:64,borderRadius:5,background:"#fff",color:"rgba(0,0,0,0.65)"}},"编辑"),_react2.default.createElement(_button2.default,{className:"deleteBtn pandora-btn-fontsize",onClick:i.deleteMenu(t),style:{marginLeft:5,width:64,borderRadius:5,background:"#fff",color:"rgba(0,0,0,0.65)"}},"删除"))}}]},i}return _createClass(t,[{key:"componentDidMount",value:function(){var e,t=this,r={};this.props.location.state&&(e=this.props.location.state,this.setState(_objectSpread(_objectSpread({},e),{},{queryCondition:{menuName:e.menuName,parentMenuId:e.parentMenuId}}),function(){t.reSetQuery()}),r={menuName:e.menuName,parentMenuId:e.parentMenuId}),this.fetchData(r)}},{key:"render",value:function(){return _react2.default.createElement("div",null,_react2.default.createElement("div",{className:"pandora-main-content"},_react2.default.createElement("div",{className:"portlet-tab"},_react2.default.createElement(_tabs2.default,{defaultActiveKey:"1",style:{marginBottom:7}},_react2.default.createElement(TabPane,{tab:"菜单查询",key:"1"},_react2.default.createElement("div",{className:"portlet-body"},_react2.default.createElement("div",{className:"query-condition"},_react2.default.createElement(WrapperQueryForm,{reSetQuery:this.onRef,callbackParent:this.onChildQuery})),_react2.default.createElement("div",{className:"role-table"},_react2.default.createElement("div",{className:"role-header"},_react2.default.createElement("div",{className:"role-list"},"菜单列表"),_react2.default.createElement("div",{className:"role-create1",onClick:this.goToCreateMenu},_react2.default.createElement(_icon2.default,{className:"role-icon",type:"plus"}),_react2.default.createElement("span",null,"创建菜单")))),_react2.default.createElement(_table2.default,{indentsize:"50px",pagination:!1,loading:this.state.loading,dataSource:this.state.data,columns:this.state.columns,style:{paddingLeft:10,paddingRight:10},scroll:{x:1400},size:"middle",rowkKey:"menuId"})))))))}}]),t}();exports.default=menuManage;var QueryForm=function(_React$Component){_inherits(QueryForm,_React$Component);var _super2=_createSuper(QueryForm);function QueryForm(props){var _this4;return _classCallCheck(this,QueryForm),_this4=_super2.call(this,props),_defineProperty(_assertThisInitialized(_this4),"displayField",function(e,t,r){switch(e){case"TEXT":return _react2.default.createElement(_input2.default,{placeholder:"",style:{width:155}})}}),_defineProperty(_assertThisInitialized(_this4),"handleReset",function(){_this4.props.form.resetFields()}),_defineProperty(_assertThisInitialized(_this4),"handleSearch",function(e){e.preventDefault(),_this4.props.form.validateFields(function(e,t){var r,n;e||(r={menuName:t.menuName,parentMenuId:t.parentMenuId},n=Object.assign({},r),_this4.fetchData(n))})}),_defineProperty(_assertThisInitialized(_this4),"fetchData",function(e){_this4.setState(_objectSpread({loading:!0},e));var t=e.menuName,r=e.parentMenuId;(0,_fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/rbac/queryMenuList",data:{menuName:t,parentMenuId:r}}).then(function(e){var t=_this4.createPermTree(e.reply.menuList);_this4.setState({data:t,loading:!1}),_this4.props.callbackParent(_this4.state)})}),_defineProperty(_assertThisInitialized(_this4),"createPermTree",function(e){var t,r=new Array,n={};for(var a in e){e[a].key=a,(t=e[a]).children=new Array,n[t.menuId]=t}for(var a in e.sort(_this4.sortBy("sort")),e){(t=e[a]).parentMenuId in n?n[t.parentMenuId].children.push(t):r.push(t)}return r=_this4.deleteChildren(r)}),_defineProperty(_assertThisInitialized(_this4),"sortBy",function(a){return function(e,t){var r,n;if("object"===_typeof(e)&&"object"===_typeof(t)&&e&&t)return(r=e[a])===(n=t[a])?0:_typeof(r)===_typeof(n)?r<n?-1:1:_typeof(r)<_typeof(n)?-1:1;throw"error"}}),_defineProperty(_assertThisInitialized(_this4),"deleteChildren",function(e){for(var t in e){var r=e[t];0==r.children.length?delete r.children:_this4.deleteChildren(r.children)}return e}),_defineProperty(_assertThisInitialized(_this4),"getLenAndRegExpFromText",function(length,validationTmpl){var len=length||"",_validationTmpl=new RegExp;return validationTmpl&&validationTmpl.indexOf("null")<0&&(_validationTmpl=new RegExp(eval("/"+validationTmpl+"/"))),{len:len,regExp:_validationTmpl}}),_this4.state={loading:!1,menuName:"",parentMenuId:"",data:[]},_this4}return _createClass(QueryForm,[{key:"componentDidMount",value:function(){this.props.reSetQuery(this)}},{key:"render",value:function(){var e={labelCol:{span:5},wrapperCol:{span:19}},t=this.props.form.getFieldDecorator;return _react2.default.createElement(_form2.default,{onSubmit:this.handleSearch},_react2.default.createElement(_row2.default,{style:{marginTop:18}},_react2.default.createElement(_col2.default,{span:5,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"菜单名称",labelCol:{span:10},wrapperCol:{span:14}}),t("menuName")(this.displayField("TEXT","menuName","")))),_react2.default.createElement(_col2.default,{span:5,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"父菜单ID",labelCol:{span:10},wrapperCol:{span:14}}),t("parentMenuId",{rules:[{max:this.getLenAndRegExpFromText(20,"").len,message:"数据长度过长"}]})(this.displayField("TEXT","parentMenuId","")))),_react2.default.createElement(_col2.default,{span:7,offset:1,style:{display:"block"}},_react2.default.createElement(_button2.default,{className:"query-btn operatorBtn pandora-btn-fontsize",htmlType:"submit",type:"primary"},"查询"),_react2.default.createElement(_button2.default,{className:"query-btn pandora-btn-fontsize",onClick:this.handleReset},"清空"))))}}]),QueryForm}(_react2.default.Component),WrapperQueryForm=_form2.default.create()(QueryForm);module.exports=exports.default;