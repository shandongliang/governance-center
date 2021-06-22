"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _button=require("antd/es/button"),_button2=_interopRequireDefault(_button),_select=require("antd/es/select"),_select2=_interopRequireDefault(_select),_row=require("antd/es/row"),_row2=_interopRequireDefault(_row),_col=require("antd/es/col"),_col2=_interopRequireDefault(_col),_version2=require("antd/es/version"),_version3=_interopRequireDefault(_version2),_message2=require("antd/es/message"),_message3=_interopRequireDefault(_message2),_input=require("antd/es/input"),_input2=_interopRequireDefault(_input),_tabs=require("antd/es/tabs"),_tabs2=_interopRequireDefault(_tabs),_radio=require("antd/es/radio"),_radio2=_interopRequireDefault(_radio),_form=require("antd/es/form"),_form2=_interopRequireDefault(_form);require("antd/es/button/style"),require("antd/es/select/style"),require("antd/es/row/style"),require("antd/es/col/style"),require("antd/es/version/style"),require("antd/es/message/style"),require("antd/es/input/style"),require("antd/es/tabs/style"),require("antd/es/radio/style"),require("antd/es/form/style");var _react=require("react"),_react2=_interopRequireDefault(_react),_reactDom=require("react-dom"),_reactDom2=_interopRequireDefault(_reactDom),_antd=require("antd"),_fetch=require("./../../../../util/fetch"),_fetch2=_interopRequireDefault(_fetch),_index=require("./../../../../constant/index");require("./../../../common/style/index.less");var _tabRouter=require("./../../../../util/tabRouter.js"),_routerWrap=require("./../../../../util/routerWrap"),_routerWrap2=_interopRequireDefault(_routerWrap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function ownKeys(t,e){var a,r=Object.keys(t);return Object.getOwnPropertySymbols&&(a=Object.getOwnPropertySymbols(t),e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,a)),r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(a),!0).forEach(function(e){_defineProperty(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):ownKeys(Object(a)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}function _defineProperty(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(a){var r=_isNativeReflectConstruct();return function(){var e,t=_getPrototypeOf(a);return _possibleConstructorReturn(this,r?(e=_getPrototypeOf(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments))}}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var FormItem=_form2.default.Item,RadioGroup=_radio2.default.Group,TabPane=_tabs2.default.TabPane,TextArea=_input2.default.TextArea,EditAttribute=function(){_inherits(r,_react.Component);var a=_createSuper(r);function r(e){var t;return _classCallCheck(this,r),(t=a.call(this,e)).state={displayType:"",minRadio:"0",maxRadio:"0",queryParams:t.props.location.state},t}return _createClass(r,[{key:"render",value:function(){return _react2.default.createElement("div",null,_react2.default.createElement("div",{className:"pandora-main-content"},_react2.default.createElement("div",{className:"portlet-tab"},_react2.default.createElement(_tabs2.default,{defaultActiveKey:"1",style:{marginBottom:7}},_react2.default.createElement(TabPane,{tab:"编辑属性",key:"1"},_react2.default.createElement("div",{className:"portlet-body"},_react2.default.createElement(WrapperEditForm,{queryParams:this.state.queryParams})))))))}}]),r}();exports.default=_index.IS_OPEN_MULTI_TABNAV?(0,_routerWrap2.default)(EditAttribute):EditAttribute;var EditForm=function(){_inherits(a,_react2.default.Component);var t=_createSuper(a);function a(e){var _;return _classCallCheck(this,a),_defineProperty(_assertThisInitialized(_=t.call(this,e)),"displayField",function(e,t,a){switch(e){case"TEXT":return _react2.default.createElement(_input2.default,{style:{width:200}})}}),_defineProperty(_assertThisInitialized(_),"goToDetail",function(){var e=/\/([^/]+)$/.exec(window.location.hash),t=e&&e[1],a={pathname:_index.IS_OPEN_MULTI_TABNAV?"/tmplManage/attributeDef/attributeDetail/"+t:"/tmplManage/attributeDef/attributeDetail",state:_objectSpread({},_.props.queryParams)};(0,_tabRouter.goToAndClose)(a)}),_defineProperty(_assertThisInitialized(_),"addItem",function(e){var t=e.srcElement||e.target,a="",r="";"BUTTON"==t.tagName?(a=t.parentElement,r=t):"I"==t.tagName&&(a=t.parentElement.parentElement,r=t.parentElement);var l=a.children[0].cloneNode(!0);l.style.display="block",l.children[0].value="",l.children[1].onclick=_.removeItem,a.insertBefore(l,r)}),_defineProperty(_assertThisInitialized(_),"removeItem",function(e){var t=e.srcElement||e.target;"BUTTON"==t.tagName?t.parentElement.remove?t.parentElement.remove():t.parentElement.parentElement.removeChild(t.parentElement):"I"==t.tagName&&(t.parentElement.parentElement.remove?t.parentElement.parentElement.remove():t.parentElement.parentElement.parentElement.removeChild(t.parentElement.parentElement))}),_defineProperty(_assertThisInitialized(_),"addItemMulti",function(e){var t=_reactDom2.default.findDOMNode(_.refs.addMulti),a=t.previousElementSibling.cloneNode(!0);a.style.display="block",a.children[0].value=e,a.children[1].onclick=_.removeItem,t.parentElement.insertBefore(a,t)}),_defineProperty(_assertThisInitialized(_),"addItemSelect",function(e){var t=_reactDom2.default.findDOMNode(_.refs.addSelect),a=t.previousElementSibling.cloneNode(!0);a.style.display="block",a.children[0].value=e,a.children[1].onclick=_.removeItem,t.parentElement.insertBefore(a,t)}),_defineProperty(_assertThisInitialized(_),"remove",function(e){alert("delete")}),_defineProperty(_assertThisInitialized(_),"changeHandler",function(e){_.state.displayType=e;var t=_reactDom2.default.findDOMNode(_.refs.float),a=_reactDom2.default.findDOMNode(_.refs.length),r=_reactDom2.default.findDOMNode(_.refs.reg),l=_reactDom2.default.findDOMNode(_.refs.min),n=_reactDom2.default.findDOMNode(_.refs.max),i=_reactDom2.default.findDOMNode(_.refs.select),o=_reactDom2.default.findDOMNode(_.refs.multiSelect);switch(e){case"FLOAT":a.style.display="none",r.style.display="none",l.style.display="none",n.style.display="none",o.style.display="none",i.style.display="none",t.style.display="block";break;case"TEXT":t.style.display="none",l.style.display="none",n.style.display="none",o.style.display="none",i.style.display="none",a.style.display="block",r.style.display="block";break;case"NUMBER":t.style.display="none",a.style.display="none",r.style.display="none",o.style.display="none",i.style.display="none",l.style.display="block",n.style.display="block";break;case"SELECT":t.style.display="none",a.style.display="none",r.style.display="none",l.style.display="none",n.style.display="none",o.style.display="none",i.style.display="block";break;case"MULTISELECT":t.style.display="none",a.style.display="none",r.style.display="none",l.style.display="none",n.style.display="none",i.style.display="none",o.style.display="block";break;case"DATE":case"TIME":t.style.display="none",a.style.display="none",r.style.display="none",l.style.display="none",n.style.display="none",i.style.display="none",o.style.display="none"}}),_defineProperty(_assertThisInitialized(_),"changeMaxRadio",function(e){_.setState({maxRadio:e.target.value})}),_defineProperty(_assertThisInitialized(_),"changeMinRadio",function(e){_.setState({minRadio:e.target.value})}),_defineProperty(_assertThisInitialized(_),"handleSubmit",function(e){e.preventDefault(),_.props.form.validateFieldsAndScroll(function(e,t){_.setState({loading:!0});var a,r,l={},n=_.state.displayType;if(l.name=t.name,l.attrTmplId=_.props.queryParams.attrTmplId,l.label=t.label,l.type="attrDef",l.displayType=n,l.description=t.description,"FLOAT"==n)l.accuracy=t.floatInput;else if("TEXT"==n)l.length=t.lengthInput,l.validationTmpl=t.regInput;else if("SELECT"==n){var i=document.getElementById("selectItem"),o=i.children.length;if(o<=2)return void _message3.default.info("请先添加选项！");l.valueRange="";for(var s=1;s<o-1;s++){var u=i.children[s].children[0].value;l.valueRange=l.valueRange+"|"+u}l.valueRange=l.valueRange.substr(1)}else if("MULTISELECT"==n){var d=document.getElementById("multiSelect"),c=d.children.length;if(c<=2)return void _message3.default.info("请先添加选项！");l.valueRange="";for(var f=1;f<c-1;f++){var p=d.children[f].children[0].value;l.valueRange=l.valueRange+"|"+p}l.valueRange=l.valueRange.substr(1)}else{"NUMBER"==n&&(a="[",r="]","1"==_.state.minRadio&&(a="("),"1"==_.state.maxRadio&&(r=")"),l.valueRange=a+t.minInput+","+t.maxInput+r)}(0,_fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/tmpl/editAttrDef",data:{attrDef:l}}).then(function(e){"S"==e.reply.returnCode.type&&_.goToDetail()})})}),_defineProperty(_assertThisInitialized(_),"queryHandler",function(){_.setState({loading:!0}),(0,_fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/tmpl/queryAttrDefDetail",data:{attrTmplId:_.props.queryParams.attrTmplId}}).then(function(e){if("S"==e.reply.returnCode.type){var t,a,r,l,n,i,o,s=e.reply.attrDef;if(_.setState({name:s.name,label:s.label,displayType:s.displayType,lengthInput:s.length,validationTmpl:s.validationTmpl,userName:s.userName,description:s.description,accuracy:s.accuracy}),"SELECT"==s.displayType)for(var u=s.valueRange.split("|"),d=0;d<u.length;d++)_.addItemSelect(u[d]);else if("MULTISELECT"==s.displayType)for(var c=s.valueRange.split("|"),f=0;f<c.length;f++)_.addItemMulti(c[f]);else{"NUMBER"==s.displayType&&(a=(t=s.valueRange).length,r=t.substring(0,1),l=t.substring(a-1,a),n=t.indexOf(","),i=t.substring(1,n),o=t.substring(n+1,a-1),minRadio="("==r?"1":"0",maxRadio=")"==l?"1":"0",_.setState({minInput:i,maxInput:o,minRadio:minRadio,maxRadio:maxRadio}))}_.changeHandler(s.displayType)}})}),_.state={displayType:"",minRadio:"0",maxRadio:"0"},_}return _createClass(a,[{key:"componentDidMount",value:function(){this.queryHandler()}},{key:"render",value:function(){var e,t={labelCol:{span:6},wrapperCol:{span:18}},a=12,r=1,l=this.props.form.getFieldDecorator,n=_version3.default.split(".")[0];return"2"==n?e=_react2.default.createElement(_input2.default,{type:"textarea",style:{height:200}}):"3"==n&&(e=_react2.default.createElement(TextArea,{style:{height:200}})),_react2.default.createElement(_form2.default,{onSubmit:this.handleSubmit,style:{marginTop:18}},_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:a,offset:r},_react2.default.createElement(FormItem,_extends({},t,{label:"属性名称"}),l("name",{initialValue:this.state.name,rules:[{required:!0,message:"请输入属性名称"}]})(this.displayField("TEXT","name",""))))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:a,offset:r},_react2.default.createElement(FormItem,_extends({},t,{label:"属性别名"}),l("label",{initialValue:this.state.label})(this.displayField("TEXT","label",""))))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:a,offset:r},_react2.default.createElement(FormItem,_extends({},t,{label:"展示类型"}),l("displayType",{initialValue:this.state.displayType,rules:[{required:!0,message:"请选择展示类型"}]})(_react2.default.createElement(_select2.default,{style:{width:200},placeholder:"请选择展示类型",onChange:this.changeHandler,getPopupContainer:function(e){return e.parentNode}},_react2.default.createElement(_select2.default.Option,{value:""},"--请选择--"),_react2.default.createElement(_select2.default.Option,{value:"TIME"},"时间"),_react2.default.createElement(_select2.default.Option,{value:"FLOAT"},"浮点"),_react2.default.createElement(_select2.default.Option,{value:"TEXT"},"文本"),_react2.default.createElement(_select2.default.Option,{value:"DATE"},"日期"),_react2.default.createElement(_select2.default.Option,{value:"SELECT"},"单选"),_react2.default.createElement(_select2.default.Option,{value:"UPLOAD"},"上传"),_react2.default.createElement(_select2.default.Option,{value:"MULTISELECT"},"多选"),_react2.default.createElement(_select2.default.Option,{value:"NUMBER"},"整数")))))),_react2.default.createElement(_row2.default,{style:{display:"none"},ref:"float"},_react2.default.createElement(_col2.default,{span:a,offset:r},_react2.default.createElement(FormItem,_extends({},t,{label:"精度"}),l("floatInput",{initialValue:this.state.accuracy})(this.displayField("TEXT","floatInput",""))))),_react2.default.createElement(_row2.default,{style:{display:"none"},ref:"length"},_react2.default.createElement(_col2.default,{span:a,offset:r},_react2.default.createElement(FormItem,_extends({},t,{label:"长度"}),l("lengthInput",{initialValue:this.state.lengthInput})(this.displayField("TEXT","lengthInput",""))))),_react2.default.createElement(_row2.default,{style:{display:"none"},ref:"reg"},_react2.default.createElement(_col2.default,{span:a,offset:r},_react2.default.createElement(FormItem,_extends({},t,{label:"正则表达式"}),l("regInput",{initialValue:this.state.validationTmpl})(this.displayField("TEXT","regInput",""))))),_react2.default.createElement(_row2.default,{style:{display:"none"},ref:"min"},_react2.default.createElement(_col2.default,{span:a,offset:r},_react2.default.createElement(FormItem,_extends({},t,{label:"最小值(是否包含)"}),l("minInput",{initialValue:this.state.minInput,rules:[{required:!0,message:"请输入最小值"}]})(_react2.default.createElement("div",null,_react2.default.createElement(_input2.default,{value:this.state.minInput,style:{width:210,marginRight:8}}),_react2.default.createElement(RadioGroup,{onChange:this.changeMinRadio,value:this.state.minRadio},_react2.default.createElement(_radio2.default,{value:"0"},"是"),_react2.default.createElement(_radio2.default,{value:"1"},"否"))))))),_react2.default.createElement(_row2.default,{style:{display:"none"},ref:"max"},_react2.default.createElement(_col2.default,{span:a,offset:r},_react2.default.createElement(FormItem,_extends({},t,{label:"最大值(是否包含)"}),l("maxInput",{initialValue:this.state.maxInput,rules:[{required:!0,message:"请输入最大值"}]})(_react2.default.createElement("div",null,_react2.default.createElement(_input2.default,{value:this.state.maxInput,style:{width:210,marginRight:8}}),_react2.default.createElement(RadioGroup,{onChange:this.changeMaxRadio,value:this.state.maxRadio},_react2.default.createElement(_radio2.default,{value:"0"},"是"),_react2.default.createElement(_radio2.default,{value:"1"},"否"))))))),_react2.default.createElement(_row2.default,{style:{display:"none"},ref:"select"},_react2.default.createElement(_col2.default,{span:a,offset:r},_react2.default.createElement(FormItem,_extends({},t,{label:"选项"}),l("selectItem",{})(_react2.default.createElement("div",null,_react2.default.createElement("div",{ref:"selectItem",style:{display:"none",width:300}},_react2.default.createElement(_input2.default,{style:{width:"210px"},placeholder:"",size:"default",ref:"selectInput"}),_react2.default.createElement(_button2.default,{className:"pandora-btn-circle",shape:"circle",icon:"minus",size:"default",ref:"removeBtn"})),_react2.default.createElement(_button2.default,{className:"pandora-btn-circle",shape:"circle",icon:"plus",size:"default",onClick:this.addItem,ref:"addSelect"})))))),_react2.default.createElement(_row2.default,{style:{display:"none"},ref:"multiSelect"},_react2.default.createElement(_col2.default,{span:a,offset:r},_react2.default.createElement(FormItem,_extends({},t,{label:"选项"}),l("multiSelect",{})(_react2.default.createElement("div",null,_react2.default.createElement("div",{ref:"multiSelectItem",style:{display:"none",width:300}},_react2.default.createElement(_input2.default,{style:{width:"210px"},placeholder:"",size:"default",ref:"multiSelectInput"}),_react2.default.createElement(_button2.default,{className:"pandora-btn-circle",shape:"circle",icon:"minus",size:"default",ref:"removeBtn"})),_react2.default.createElement(_button2.default,{className:"pandora-btn-circle",shape:"circle",icon:"plus",size:"default",onClick:this.addItem,ref:"addMulti"})))))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:a,offset:r},_react2.default.createElement(FormItem,_extends({},t,{label:"描述"}),l("description",{initialValue:this.state.description})(e)))),_react2.default.createElement(_row2.default,{type:"flex"},_react2.default.createElement(_col2.default,{span:7,offset:5},_react2.default.createElement(_button2.default,{className:"query-btn operatorBtn pandora-btn-fontsize",htmlType:"submit"},"提交"),_react2.default.createElement(_button2.default,{className:"query-btn pandora-btn-fontsize",onClick:this.goToDetail},"取消"))))}}]),a}(),WrapperEditForm=_form2.default.create()(EditForm);module.exports=exports.default;