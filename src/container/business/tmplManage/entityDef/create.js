"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _button=require("antd/es/button"),_button2=_interopRequireDefault(_button),_modal=require("antd/es/modal"),_modal2=_interopRequireDefault(_modal),_table=require("antd/es/table"),_table2=_interopRequireDefault(_table),_icon=require("antd/es/icon"),_icon2=_interopRequireDefault(_icon),_row=require("antd/es/row"),_row2=_interopRequireDefault(_row),_col=require("antd/es/col"),_col2=_interopRequireDefault(_col),_inputNumber=require("antd/es/input-number"),_inputNumber2=_interopRequireDefault(_inputNumber),_select=require("antd/es/select"),_select2=_interopRequireDefault(_select),_version2=require("antd/es/version"),_version3=_interopRequireDefault(_version2),_message2=require("antd/es/message"),_message3=_interopRequireDefault(_message2),_input=require("antd/es/input"),_input2=_interopRequireDefault(_input),_tabs=require("antd/es/tabs"),_tabs2=_interopRequireDefault(_tabs),_form=require("antd/es/form"),_form2=_interopRequireDefault(_form),_radio=require("antd/es/radio"),_radio2=_interopRequireDefault(_radio);require("antd/es/button/style"),require("antd/es/modal/style"),require("antd/es/table/style"),require("antd/es/icon/style"),require("antd/es/row/style"),require("antd/es/col/style"),require("antd/es/input-number/style"),require("antd/es/select/style"),require("antd/es/version/style"),require("antd/es/message/style"),require("antd/es/input/style"),require("antd/es/tabs/style"),require("antd/es/form/style"),require("antd/es/radio/style");var _react=require("react"),_react2=_interopRequireDefault(_react),_antd=require("antd"),_fetch=require("./../../../../util/fetch"),_fetch2=_interopRequireDefault(_fetch),_tabRouter=require("./../../../../util/tabRouter.js"),_index=require("./../../../../constant/index");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function ownKeys(t,e){var a,r=Object.keys(t);return Object.getOwnPropertySymbols&&(a=Object.getOwnPropertySymbols(t),e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,a)),r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(a),!0).forEach(function(e){_defineProperty(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):ownKeys(Object(a)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function _defineProperty(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(a){var r=_isNativeReflectConstruct();return function(){var e,t=_getPrototypeOf(a);return _possibleConstructorReturn(this,r?(e=_getPrototypeOf(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments))}}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}require("./../../../common/style/index.less");var RadioGroup=_radio2.default.Group,FormItem=_form2.default.Item,TabPane=_tabs2.default.TabPane,TextArea=_input2.default.TextArea,createPower=function(){_inherits(t,_react.Component);var e=_createSuper(t);function t(){return _classCallCheck(this,t),e.apply(this,arguments)}return _createClass(t,[{key:"render",value:function(){return _react2.default.createElement("div",{className:"pandora-main-content"},_react2.default.createElement("div",{className:"portlet-tab"},_react2.default.createElement(_tabs2.default,{defaultActiveKey:"1",style:{marginBottom:7}},_react2.default.createElement(TabPane,{tab:"创建实体",key:"1"})),_react2.default.createElement("div",{className:"portlet-body"},_react2.default.createElement(WrapperCreateForm,null))))}}]),t}();exports.default=createPower;var CreateForm=function(){_inherits(t,_react2.default.Component);var e=_createSuper(t);function t(){var p;return _classCallCheck(this,t),_defineProperty(_assertThisInitialized(p=e.call(this)),"handleChangeGroup",function(e,t){var a=p.state.groups;a.splice(e,1,t);var r=p.state.groupOrder;r[e]=t.substring(t.length-1),p.setState({groups:a,groupOrder:r})}),_defineProperty(_assertThisInitialized(p),"handleChangeGroupOrder",function(e,t){var a=p.state.groupOrder;a.splice(e,1,t),p.setState({groupOrder:a})}),_defineProperty(_assertThisInitialized(p),"handleChangeattrTmplOrder",function(e,t){var a=p.state.attrTmplOrder;a.splice(e,1,t),p.setState({attrTmplOrder:a})}),_defineProperty(_assertThisInitialized(p),"changeDisplaytable",function(e,t){isDisplaytable=p.state.isDisplaytable,isDisplaytable.splice(e,1,t.target.value),p.setState({isDisplaytable:isDisplaytable})}),_defineProperty(_assertThisInitialized(p),"changeQueryCriteria",function(e,t){isQueryCriteria=p.state.isQueryCriteria,isQueryCriteria.splice(e,1,t.target.value),p.setState({isQueryCriteria:isQueryCriteria})}),_defineProperty(_assertThisInitialized(p),"changeOptional",function(e,t){isOptional=p.state.isOptional,isOptional.splice(e,1,t.target.value),p.setState({isOptional:isOptional})}),_defineProperty(_assertThisInitialized(p),"showModal",function(){p.setState({visible:!0})}),_defineProperty(_assertThisInitialized(p),"handleOk",function(){var e=p.state.selectedRowKeys,t=p.state.selects,a=new Array,r=new Array,l=new Array,n=new Array,i=new Array,s=new Array;if(null!=e&&""!=e&&0!=e.length){for(var u=0;u<e.length;u++)for(var o=0;o<p.state.attrDefList.length;o++)e[u]!=p.state.attrDefList[o].attrTmplId||t.push(p.state.attrDefList[o]);for(var d=0;d<t.length;d++)a.push("0"),r.push("1"),l.push("Y"),n.push("group1"),i.push("1"),s.push("1");t=p.unique(t),p.setState({visible:!1,selects:t,selectedRowKeys:e,isDisplaytable:a,isQueryCriteria:r,isOptional:l,groups:n,groupOrder:i,attrTmplOrder:s})}else _message3.default.info("请先选择属性")}),_defineProperty(_assertThisInitialized(p),"handleCancel",function(){p.setState({visible:!1})}),_defineProperty(_assertThisInitialized(p),"toHandleSubmit",function(){(0,_tabRouter.goToAndClose)({pathname:"/tmplManage/entityDef/entityQry"})}),_defineProperty(_assertThisInitialized(p),"toHandleCancle",function(){(0,_tabRouter.goToAndClose)({pathname:"/tmplManage/entityDef/entityQry"},null,!1)}),_defineProperty(_assertThisInitialized(p),"handleSubmit",function(e){e.preventDefault(),p.props.form.validateFieldsAndScroll(function(e,t){var a=t.entityTmplName,r=t.description;if(null!=a&&""!=a&&""!=a.trim()){var l=p.state.selects;if(null!=l&&0!=l.length){for(var n=p.state.isDisplaytable,i=p.state.isOptional,s=p.state.isQueryCriteria,u=p.state.groups,o=p.state.groupOrder,d=p.state.attrTmplOrder,c=new Array,f=0;f<l.length;f++)c.push({attrTmplId:l[f].attrTmplId,isOptional:i[f],isQueryCriteria:s[f],isDisplaytable:n[f],groups:u[f],groupOrder:o[f],attrTmplOrder:d[f]});(0,_fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/tmpl/createEntityDef",data:{entityDef:{entityTmplName:a,attrList:c,description:r}}}).then(function(e){"S"==e.reply.returnCode.type&&p.toHandleSubmit()})}else _message3.default.info("请先选择属性！")}else _message3.default.info("请先输入实体名称！")})}),_defineProperty(_assertThisInitialized(p),"queryHandler",function(){var e=Object.assign({},p.state.pagination,{pageNo:"1",recordsPerPage:"10"});p.tableChangeHandle(e)}),_defineProperty(_assertThisInitialized(p),"fetchData",function(e){p.setState({loading:!0});var l=e.name,n=e.label,i=e.displayType,t=e.current,a=e.pageSize;(0,_fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/tmpl/queryAttrDefList",data:{pageNo:t,recordsPerPage:a,name:l,label:n,displayType:i}}).then(function(e){if("S"==e.reply.returnCode.type){var t=e.reply.attrDefList;if(null!=t&&0<t.length)for(var a=0;a<t.length;a++)t[a].key=t[a].attrTmplId;var r=p.state.pagination;r.total=e.reply.page.total,r.current=e.reply.page.pageNo,p.setState({pagination:r,data:t,loading:!1},function(){var e,t,a,r;null!=i&&""!=i&&""!=i.trim()||null!=l&&""!=l&&""!=l.trim()||null!=n&&""!=n&&""!=n.trim()||(e=p.state.data,a=null!=(t=p.state.attrDefList)?t.concat(e):e,r=p.unique(a),p.setState({attrDefList:r}))})}})}),_defineProperty(_assertThisInitialized(p),"unique",function(e){for(var t={},a=[],r=0;r<e.length;r++)t[e[r].attrTmplId]||(t[e[r].attrTmplId]=!0,a.push(e[r]));return a}),_defineProperty(_assertThisInitialized(p),"handleChange",function(e){p.setState({displayType:e})}),_defineProperty(_assertThisInitialized(p),"handleChange2",function(e,t){var a={};a[e]=t.target.value,p.setState(a)}),_defineProperty(_assertThisInitialized(p),"deletes",function(e){var t=p.state.selects,a=p.state.selectedRowKeys,r=p.state.isOptional,l=p.state.isDisplaytable,n=p.state.isQueryCriteria,i=p.state.groups,s=p.state.groupOrder,u=p.state.attrTmplOrder;t.splice(e,1),a.splice(e,1),r.splice(e,1),l.splice(e,1),n.splice(e,1),i.splice(e,1),s.splice(e,1),u.splice(e,1),p.setState({selects:t,selectedRows:t,selectedRowKeys:a,isOptional:r,isDisplaytable:l,isQueryCriteria:n,groupOrder:s,groups:i,attrTmplOrder:u},null)}),_defineProperty(_assertThisInitialized(p),"tableChangeHandle",function(e){p.setState({pagination:e});var t={current:e.current,pageSize:e.pageSize,name:p.state.name,label:p.state.label,displayType:p.state.displayType};p.fetchData(t)}),_defineProperty(_assertThisInitialized(p),"displayField",function(e,t,a){var r,l=_version3.default.split(".")[0];switch("2"==l?r=_react2.default.createElement(_input2.default,{type:"textarea",style:{width:200,height:65}}):"3"==l&&(r=_react2.default.createElement(TextArea,{style:{width:200,height:65}})),e){case"TEXT":return _react2.default.createElement(_input2.default,{style:{width:200}});case"TEXTAREA":return r}}),_defineProperty(_assertThisInitialized(p),"onChildQuery",function(e){var t=e.name,a=e.label,r=e.displayType,l=e.attrDefList;p.setState({name:t,label:a,displayType:r,data:l})}),p.state={visible:!1,loading:!1,rowSelection:{},display:"",selectedRowKeys:[],selectedRows:[],pagination:{current:1,pageSize:10,pageSizeChanger:!0},selects:[],attrDefList:[],columns:[{title:"属性别名",dataIndex:"label",className:"ellipsisText",render:function(e){return _react2.default.createElement("span",{title:e},e)}},{title:"展示类型",dataIndex:"displayType",render:function(e){var t="";return"TIME"==e?t="时间":"FLOAT"==e?t="浮点":"TEXT"==e?t="文本":"DATE"==e?t="日期":"SELECT"==e?t="单选":"UPLOAD"==e?t="上传":"MULTISELECT"==e?t="多选":"NUMBER"==e&&(t="整数"),_react2.default.createElement("span",{title:e},t)}},{title:"排序",dataIndex:"updateTime",className:"sort",render:function(e,t,a){p.state.groupOrder.map(function(e){return _react2.default.createElement(_select2.default.Option,{key:e,value:e},e)});return _react2.default.createElement("div",null,_react2.default.createElement("div",{style:{display:"inline-block",marginRight:5}},_react2.default.createElement("span",null,"组类别："),_react2.default.createElement(_select2.default,{style:{width:85},defaultValue:"group1",onChange:p.handleChangeGroup.bind(null,a),getPopupContainer:function(e){return e.parentNode}},_react2.default.createElement(_select2.default.Option,{value:"group1"},"组1"),_react2.default.createElement(_select2.default.Option,{value:"group2"},"组2"),_react2.default.createElement(_select2.default.Option,{value:"group3"},"组3"),_react2.default.createElement(_select2.default.Option,{value:"group4"},"组4"),_react2.default.createElement(_select2.default.Option,{value:"group5"},"组5"))),_react2.default.createElement("div",{style:{display:"inline-block",marginRight:5}},_react2.default.createElement("span",null,"组排序："),_react2.default.createElement(_select2.default,{disabled:!0,style:{width:60},value:p.state.groupOrder[a],onChange:p.handleChangeGroupOrder.bind(null,a),getPopupContainer:function(e){return e.parentNode}},_react2.default.createElement(_select2.default.Option,{value:"1"},"1"),_react2.default.createElement(_select2.default.Option,{value:"2"},"2"),_react2.default.createElement(_select2.default.Option,{value:"3"},"3"),_react2.default.createElement(_select2.default.Option,{value:"4"},"4"),_react2.default.createElement(_select2.default.Option,{value:"5"},"5"))),_react2.default.createElement("div",{style:{display:"inline-block",marginRight:5}},_react2.default.createElement("span",null,"属性排序："),_react2.default.createElement(_inputNumber2.default,{value:p.state.attrTmplOrder[a],style:{width:60},step:1,required:!0,min:1,size:"default",name:"attrSort",onChange:p.handleChangeattrTmplOrder.bind(null,a)})))}},{title:"是否必输",dataIndex:"",render:function(e,t,a){return _react2.default.createElement("div",null,_react2.default.createElement(RadioGroup,{onChange:p.changeOptional.bind(null,a),value:p.state.isOptional[a]},_react2.default.createElement(_radio2.default,{value:"N"},"是"),_react2.default.createElement(_radio2.default,{value:"Y"},"否")))}},{title:"是否作为查询条件",dataIndex:"",render:function(e,t,a){return _react2.default.createElement("div",null,_react2.default.createElement(RadioGroup,{onChange:p.changeQueryCriteria.bind(null,a),value:p.state.isQueryCriteria[a]},_react2.default.createElement(_radio2.default,{value:"0"},"是"),_react2.default.createElement(_radio2.default,{value:"1"},"否")))}},{title:"是否显示在表格",dataIndex:"",render:function(e,t,a){return _react2.default.createElement("div",null,_react2.default.createElement(RadioGroup,{onChange:p.changeDisplaytable.bind(null,a),value:p.state.isDisplaytable[a]},_react2.default.createElement(_radio2.default,{value:"0"},"是"),_react2.default.createElement(_radio2.default,{value:"1"},"否")))}},{title:"操作",dataIndex:"operation",render:function(e,t,a){return _react2.default.createElement("div",null,_react2.default.createElement("a",{href:"javascript:;",onClick:p.deletes.bind(null,a)},"删除"))}}],columns2:[{title:"属性名称",dataIndex:"name",render:function(e){return _react2.default.createElement("span",{title:e},e)}},{title:"属性别名",dataIndex:"label",className:"ellipsisText"},{title:"展示类型",dataIndex:"displayType"},{title:"创建时间",dataIndex:"createTime",render:function(e){var t=new Date(parseInt(e)).toLocaleString().replace(/\//g,"-"),a=t.substring(0,t.indexOf(" "));return _react2.default.createElement("span",null,a)}},{title:"内容",dataIndex:"valueRange",render:function(e){return _react2.default.createElement("span",{title:e},e)}}]},p}return _createClass(t,[{key:"componentDidMount",value:function(){this.queryHandler()}},{key:"render",value:function(){var r=this,e={labelCol:{span:5},wrapperCol:{span:19}},t=this.props.form.getFieldDecorator,a={selectedRowKeys:this.state.selectedRowKeys,onChange:function(e){r.setState({selectedRowKeys:e},null)},onSelect:function(e,t,a){r.setState({selectedRows:a},null)},onSelectAll:function(e,t){r.setState({selectedRows:t},null)}};return _react2.default.createElement(_form2.default,{onSubmit:this.handleSubmit,style:{marginTop:18}},_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:10,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"实体名称"}),t("entityTmplName",{rules:[{required:!0,message:"请输入实体名称"}]})(this.displayField("TEXT","entityTmplName",""))))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:10,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"实体描述"}),t("description",{})(this.displayField("TEXTAREA","description",""))))),_react2.default.createElement(_row2.default,{style:{paddingRight:"10px",paddingLeft:"10px"}},_react2.default.createElement(_col2.default,{span:4,offset:1,className:"pandora-btn-fontsize",style:{height:32,color:"rgba(0,0,0,0.85)"}},"已选的属性列表"),_react2.default.createElement(_col2.default,{span:3,offset:16},_react2.default.createElement("div",{className:"pandora-btn-fontsize",onClick:this.showModal,style:{height:32,borderRadius:3,color:"#fff",background:"#e96b10",textAlign:"center",paddingTop:5,cursor:"pointer"}},_react2.default.createElement(_icon2.default,{className:"role-icon",type:"plus"}),_react2.default.createElement("span",null,"关联属性")))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:23,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,{label:""},t("selectedAttr",{})(_react2.default.createElement("div",null,_react2.default.createElement(_table2.default,{pagination:!1,loading:this.state.loading,dataSource:this.state.selects,columns:this.state.columns,style:{paddingLeft:10,paddingRight:10},size:"middle",rowKey:"label"})))))),_react2.default.createElement("div",{className:"modal"},_react2.default.createElement(_modal2.default,{title:"关联属性",visible:this.state.visible,width:926,onOk:this.handleOk,onCancel:this.handleCancel},_react2.default.createElement("div",null,_react2.default.createElement(WrapperQueryForm,{callbackParent:this.onChildQuery,pagination:this.state.pagination})),_react2.default.createElement(_table2.default,{pagination:this.state.pagination,loading:this.state.loading,dataSource:this.state.data,columns:this.state.columns2,onChange:this.tableChangeHandle,rowSelection:a,style:{paddingLeft:10,paddingRight:10},size:"middle",rowKey:"attrTmplId"}))),_react2.default.createElement(_row2.default,{type:"flex"},_react2.default.createElement(_col2.default,{span:7,offset:1},_react2.default.createElement(_button2.default,{className:"pandora-btn-fontsize",htmlType:"submit",style:{width:88,height:32,borderRadius:3,marginLeft:10,marginBottom:10,background:"#108ee9",color:"#fff"}},"提交"),_react2.default.createElement(_button2.default,{className:"pandora-btn-fontsize",onClick:this.toHandleCancle,style:{width:88,height:32,borderRadius:3,marginLeft:10,marginBottom:10}},"取消"))))}}]),t}(),WrapperCreateForm=_form2.default.create()(CreateForm),QueryForm=function(){_inherits(a,_react2.default.Component);var t=_createSuper(a);function a(e){var s;return _classCallCheck(this,a),_defineProperty(_assertThisInitialized(s=t.call(this,e)),"handleReset",function(){s.props.form.resetFields(),s.props.form.setFieldsValue({displayType:""})}),_defineProperty(_assertThisInitialized(s),"handleSearch",function(e){e.preventDefault(),s.props.form.validateFields(function(e,t){s.setState(_objectSpread({},t));var a=t;a.pageNo=s.state.pagination.current,a.recordsPerPage=s.state.pagination.pageSize,s.fetchData(a)})}),_defineProperty(_assertThisInitialized(s),"fetchData",function(e){s.setState({loading:!0});var l=e.name,n=e.label,i=e.displayType;(0,_fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/tmpl/queryAttrDefList",data:e}).then(function(e){var t,a,r;"S"==e.reply.returnCode.type&&(t=e.reply.attrDefList,(a=s.props.pagination).total=e.reply.page.total,a.current=e.reply.page.pageNo,s.setState({attrDefList:t,loading:!1},function(){var e;null!=i&&""!=i&&""!=i.trim()||null!=l&&""!=l&&""!=l.trim()||null!=n&&""!=n&&""!=n.trim()||(e=s.unique(s.state.attrDefList),s.setState({attrDefList:e}))}),r={name:l,label:n,displayType:i,attrDefList:t,pagination:a},s.props.callbackParent(r))})}),_defineProperty(_assertThisInitialized(s),"unique",function(e){for(var t={},a=[],r=0;r<e.length;r++)t[e[r].attrTmplId]||(t[e[r].attrTmplId]=!0,a.push(e[r]));return a}),s.state={pagination:s.props.pagination},s}return _createClass(a,[{key:"render",value:function(){var e={labelCol:{span:8},wrapperCol:{span:16}},t=this.props.form.getFieldDecorator;return _react2.default.createElement(_form2.default,{onSubmit:this.handleSearch,style:{marginTop:18}},_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:5,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"属性名称"}),t("name")(_react2.default.createElement(_input2.default,{style:{width:85}})))),_react2.default.createElement(_col2.default,{span:5,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"属性别名"}),t("label")(_react2.default.createElement(_input2.default,{style:{width:85}})))),_react2.default.createElement(_col2.default,{span:5,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"展示类型"}),t("displayType",{initialValue:""})(_react2.default.createElement(_select2.default,{style:{width:95},onChange:this.handleChange,getPopupContainer:function(e){return e.parentNode}},_react2.default.createElement(_select2.default.Option,{value:""},"全部"),_react2.default.createElement(_select2.default.Option,{value:"TIME"},"时间"),_react2.default.createElement(_select2.default.Option,{value:"FLOAT"},"浮点"),_react2.default.createElement(_select2.default.Option,{value:"TEXT"},"文本"),_react2.default.createElement(_select2.default.Option,{value:"DATE"},"日期"),_react2.default.createElement(_select2.default.Option,{value:"SELECT"},"单选"),_react2.default.createElement(_select2.default.Option,{value:"UPLOAD"},"上传"),_react2.default.createElement(_select2.default.Option,{value:"MULTISELECT"},"多选"),_react2.default.createElement(_select2.default.Option,{value:"NUMBER"},"整数"))))),_react2.default.createElement(_col2.default,{span:6,style:{display:"block"}},_react2.default.createElement(FormItem,null,_react2.default.createElement(_button2.default,{htmlType:"submit",type:"primary",className:"operatorBtn pandora-btn-fontsize",style:{marginLeft:10,width:88,borderRadius:5}},"查询"),_react2.default.createElement(_button2.default,{className:"pandora-btn-fontsize",onClick:this.handleReset,style:{marginLeft:10,width:88,borderRadius:5}},"清空")))))}}]),a}(),WrapperQueryForm=_form2.default.create()(QueryForm);module.exports=exports.default;