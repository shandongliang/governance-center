"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _button=require("antd/es/button"),_button2=_interopRequireDefault(_button),_modal=require("antd/es/modal"),_modal2=_interopRequireDefault(_modal),_table=require("antd/es/table"),_table2=_interopRequireDefault(_table),_icon=require("antd/es/icon"),_icon2=_interopRequireDefault(_icon),_row=require("antd/es/row"),_row2=_interopRequireDefault(_row),_col=require("antd/es/col"),_col2=_interopRequireDefault(_col),_inputNumber=require("antd/es/input-number"),_inputNumber2=_interopRequireDefault(_inputNumber),_select=require("antd/es/select"),_select2=_interopRequireDefault(_select),_version2=require("antd/es/version"),_version3=_interopRequireDefault(_version2),_message2=require("antd/es/message"),_message3=_interopRequireDefault(_message2),_input=require("antd/es/input"),_input2=_interopRequireDefault(_input),_tabs=require("antd/es/tabs"),_tabs2=_interopRequireDefault(_tabs),_form=require("antd/es/form"),_form2=_interopRequireDefault(_form),_radio=require("antd/es/radio"),_radio2=_interopRequireDefault(_radio);require("antd/es/button/style"),require("antd/es/modal/style"),require("antd/es/table/style"),require("antd/es/icon/style"),require("antd/es/row/style"),require("antd/es/col/style"),require("antd/es/input-number/style"),require("antd/es/select/style"),require("antd/es/version/style"),require("antd/es/message/style"),require("antd/es/input/style"),require("antd/es/tabs/style"),require("antd/es/form/style"),require("antd/es/radio/style");var _react=require("react"),_react2=_interopRequireDefault(_react),_antd=require("antd"),_fetch=require("./../../../../util/fetch"),_fetch2=_interopRequireDefault(_fetch),_tabRouter=require("./../../../../util/tabRouter.js"),_index=require("./../../../../constant/index");require("./../../../common/style/index.less");var _routerWrap=require("./../../../../util/routerWrap"),_routerWrap2=_interopRequireDefault(_routerWrap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function ownKeys(t,e){var a,r=Object.keys(t);return Object.getOwnPropertySymbols&&(a=Object.getOwnPropertySymbols(t),e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,a)),r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(a),!0).forEach(function(e){_defineProperty(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):ownKeys(Object(a)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}function _defineProperty(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(a){var r=_isNativeReflectConstruct();return function(){var e,t=_getPrototypeOf(a);return _possibleConstructorReturn(this,r?(e=_getPrototypeOf(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments))}}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var RadioGroup=_radio2.default.Group,FormItem=_form2.default.Item,TabPane=_tabs2.default.TabPane,TextArea=_input2.default.TextArea,createPower=function(){_inherits(r,_react.Component);var a=_createSuper(r);function r(e){var t;return _classCallCheck(this,r),(t=a.call(this,e)).state={queryParams:t.props.location.state},t}return _createClass(r,[{key:"render",value:function(){return _react2.default.createElement("div",{className:"pandora-main-content"},_react2.default.createElement("div",{className:"portlet-tab"},_react2.default.createElement(_tabs2.default,{defaultActiveKey:"1",style:{marginBottom:7}},_react2.default.createElement(TabPane,{tab:"编辑实体",key:"1"})),_react2.default.createElement("div",{className:"portlet-body"},_react2.default.createElement(WrapperEditForm,{queryParams:this.state.queryParams}))))}}]),r}();exports.default=_index.IS_OPEN_MULTI_TABNAV?(0,_routerWrap2.default)(createPower):createPower;var EditForm=function(){_inherits(t,_react2.default.Component);var e=_createSuper(t);function t(){var _;return _classCallCheck(this,t),_defineProperty(_assertThisInitialized(_=e.call(this)),"handleChangeGroup",function(e,t){var a=_.state.groups;a.splice(e,1,t);var r=_.state.groupOrder;r[e]=t.substring(t.length-1),_.setState({groups:a,groupOrder:r})}),_defineProperty(_assertThisInitialized(_),"handleChangeattrTmplOrder",function(e,t){var a=_.state.attrTmplOrder;a.splice(e,1,t),_.setState({attrTmplOrder:a})}),_defineProperty(_assertThisInitialized(_),"changeDisplaytable",function(e,t){isDisplaytable=_.state.isDisplaytable,isDisplaytable.splice(e,1,t.target.value),_.setState({isDisplaytable:isDisplaytable})}),_defineProperty(_assertThisInitialized(_),"changeQueryCriteria",function(e,t){isQueryCriteria=_.state.isQueryCriteria,isQueryCriteria.splice(e,1,t.target.value),_.setState({isQueryCriteria:isQueryCriteria})}),_defineProperty(_assertThisInitialized(_),"changeOptional",function(e,t){isOptional=_.state.isOptional,isOptional.splice(e,1,t.target.value),_.setState({isOptional:isOptional})}),_defineProperty(_assertThisInitialized(_),"showModal",function(){_.setState({visible:!0})}),_defineProperty(_assertThisInitialized(_),"handleOk",function(){var e=new Array,t=_.state.selects,a=_.state.selectedRowKeys,r=_.state.isDisplaytable,l=_.state.isQueryCriteria,n=_.state.isOptional,i=_.state.groups,s=_.state.groupOrder,u=_.state.attrTmplOrder;if(null!=a&&""!=a&&0!=a.length){for(var o=0;o<a.length;o++)for(var d=0;d<_.state.attrDefList.length;d++)a[o]!=_.state.attrDefList[d].attrTmplId||e.push(_.state.attrDefList[d]);for(var c=!1,p=0;p<e.length;p++){for(var f=0;f<t.length;f++){if(e[p].attrTmplId==t[f].attrTmplId){c=!0;break}c=!1}c||(c=!1,r.push("0"),l.push("1"),n.push("Y"),i.push("group1"),s.push("1"),u.push("1"),t.splice(t.length,0,e[p]))}_.setState({visible:!1,selects:t,selectedRowKeys:a,isDisplaytable:r,isQueryCriteria:l,isOptional:n,groups:i,groupOrder:s,attrTmplOrder:u})}else _message3.default.info("请先选择属性")}),_defineProperty(_assertThisInitialized(_),"handleCancel",function(){_.setState({visible:!1})}),_defineProperty(_assertThisInitialized(_),"goToDetail",function(){var e=/\/([^/]+)$/.exec(window.location.hash),t=e&&e[1],a={pathname:_index.IS_OPEN_MULTI_TABNAV?"/tmplManage/entityDef/entityDetail/"+t:"/tmplManage/entityDef/entityDetail",state:_objectSpread({},_.props.queryParams)};(0,_tabRouter.goToAndClose)(a)}),_defineProperty(_assertThisInitialized(_),"handleSubmit",function(e){e.preventDefault(),_.props.form.validateFieldsAndScroll(function(e,t){for(var a=_.props.queryParams.entityTmplId,r=t.entityTmplName,l=t.description,n=_.state.selects,i=_.state.isDisplaytable,s=_.state.isOptional,u=_.state.isQueryCriteria,o=_.state.groups,d=_.state.groupOrder,c=_.state.attrTmplOrder,p=new Array,f=0;f<n.length;f++)p.push({attrTmplId:n[f].attrTmplId,isOptional:s[f],isQueryCriteria:u[f],isDisplaytable:i[f],groups:o[f],groupOrder:d[f],attrTmplOrder:c[f]});(0,_fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/tmpl/editEntityDef",data:{entityDef:{entityTmplName:r,description:l,entityTmplId:a,attrList:p}}}).then(function(e){"S"==e.reply.returnCode.type&&_.goToDetail()})})}),_defineProperty(_assertThisInitialized(_),"queryHandler",function(){var e={beginIndex:null,recordsPerPage:"10",entityTmplId:_.props.queryParams.entityTmplId},t=Object.assign({},_.state.pagination,e);_.tableChangeHandle(t)}),_defineProperty(_assertThisInitialized(_),"fetchData",function(e){_.setState({loading:!0});var t=e.current,a=e.pageSize,l=e.displayType,n=e.name,i=e.label;(0,_fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/tmpl/queryAttrDefList",data:{beginIndex:(t-1)*a,pageNo:t,recordsPerPage:a,name:n,label:i,displayType:l}}).then(function(e){if("S"==e.reply.returnCode.type){if(attrDefList=e.reply.attrDefList,null!=attrDefList&&0<attrDefList.length)for(var t=0;t<attrDefList.length;t++)attrDefList[t].key=attrDefList[t].attrTmplId;var a=_.state.pagination;a.total=e.reply.page.total,a.current=e.reply.page.pageNo,_.setState({pagination:a,data:attrDefList,loading:!1},function(){var e,t,a,r;null!=l&&""!=l&&""!=l.trim()||null!=n&&""!=n&&""!=n.trim()||null!=i&&""!=i&&""!=i.trim()||(e=_.state.data,a=null!=(t=_.state.attrDefList)?t.concat(e):e,r=_.unique(a),_.setState({attrDefList:r},function(){var e={beginIndex:null,recordsPerPage:"10",entityTmplId:this.props.queryParams.entityTmplId},t=Object.assign({},this.state.pagination,e);this.fetchData2(t)}))})}})}),_defineProperty(_assertThisInitialized(_),"tableChangeFetchData",function(e){_.setState({loading:!0});var t=e.current,a=e.pageSize,l=e.displayType,n=e.name,i=e.label;(0,_fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/tmpl/queryAttrDefList",data:{beginIndex:(t-1)*a,pageNo:t,recordsPerPage:a,name:n,label:i,displayType:l}}).then(function(e){if("S"==e.reply.returnCode.type){if(attrDefList=e.reply.attrDefList,null!=attrDefList&&0<attrDefList.length)for(var t=0;t<attrDefList.length;t++)attrDefList[t].key=attrDefList[t].attrTmplId;var a=_.state.pagination;a.total=e.reply.page.total,a.current=e.reply.page.pageNo,_.setState({pagination:a,data:attrDefList,loading:!1},function(){var e,t,a,r;null!=l&&""!=l&&""!=l.trim()||null!=n&&""!=n&&""!=n.trim()||null!=i&&""!=i&&""!=i.trim()||(e=_.state.data,a=null!=(t=_.state.attrDefList)?t.concat(e):e,r=_.unique(a),_.setState({attrDefList:r},function(){var e={beginIndex:null,recordsPerPage:"10",entityTmplId:this.props.queryParams.entityTmplId};Object.assign({},this.state.pagination,e)}))})}})}),_defineProperty(_assertThisInitialized(_),"unique",function(e){for(var t={},a=[],r=0;r<e.length;r++)t[e[r].attrTmplId]||(t[e[r].attrTmplId]=!0,a.push(e[r]));return a}),_defineProperty(_assertThisInitialized(_),"fetchData2",function(e){_.setState({loading:!0}),(0,_fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/tmpl/queryEntityDefDetailList",data:e}).then(function(e){if("S"==e.reply.returnCode.type){for(var t=new Array,a=new Array,r=new Array,l=new Array,n=new Array,i=new Array,s=_.state.attrDefList,u=new Array,o=e.reply.entityAttrRelList,d=0;d<o.length;d++){t.push(o[d].isDisplaytable),a.push(o[d].isQueryCriteria),r.push(o[d].isOptional),l.push(o[d].groups),n.push(o[d].groupOrder+""),i.push(o[d].attrTmplOrder);for(var c=0;c<s.length;c++)o[d].attrTmplId==s[c].attrTmplId&&(u.push(o[d].attrTmplId),o[d].key=o[d].attrTmplId)}_.setState({entityAttrRelList:o,selectedRows:o,selectedRowKeys:u,selects:o,loading:!1,isDisplaytable:t,isQueryCriteria:a,isOptional:r,groups:l,groupOrder:n,attrTmplOrder:i,entityTmplName:o[0].entityTmplName,description:o[0].description})}})}),_defineProperty(_assertThisInitialized(_),"handlerquery",function(){var e=_.state.displayType,t=_.state.name,a=_.state.labels,r={pageNo:"1",recordsPerPage:"10"};null!=t&&""!=t&&""!=t.trim()&&(r.name=t),null!=a&&""!=a&&""!=a.trim()&&(r.label=a),null!=e&&""!=e&&""!=e.trim()&&(r.displayType=e),_.fetchData(Object.assign({},_.state.pagination,r))}),_defineProperty(_assertThisInitialized(_),"handlerClear",function(){_.setState({displayType:"",name:"",labels:""})}),_defineProperty(_assertThisInitialized(_),"handleChange",function(e){_.setState({displayType:e})}),_defineProperty(_assertThisInitialized(_),"handleChange2",function(e,t){var a={};a[e]=t.target.value,_.setState(a)}),_defineProperty(_assertThisInitialized(_),"onSelectChange",function(e){_.setState({selectedRowKeys:e})}),_defineProperty(_assertThisInitialized(_),"deletes",function(e){for(var t=_.state.selects,a=e.key,r=0,l=0;l<t.length;l++)if(a==t[l].key){r=l;break}var n=_.state.selectedRowKeys,i=_.state.isOptional,s=_.state.isDisplaytable,u=_.state.isQueryCriteria,o=_.state.groups,d=_.state.groupOrder,c=_.state.attrTmplOrder;t.splice(r,1);for(var p=0;p<n.length;p++)if(a==n[p]){n.splice(p,1);break}i.splice(r,1),s.splice(r,1),u.splice(r,1),o.splice(r,1),d.splice(r,1),c.splice(r,1),_.setState({selects:t,selectedRows:t,selectedRowKeys:n,isOptional:i,isDisplaytable:s,isQueryCriteria:u,groupOrder:d,groups:o,attrTmplOrder:c},null)}),_defineProperty(_assertThisInitialized(_),"tableChangeHandle",function(e,t,a){var r=_.state.pagination,l=Object.assign({},r,e,a);_.setState({pagination:l}),_.fetchData(l,_.props.requestData)}),_defineProperty(_assertThisInitialized(_),"attrTableChangeHandle",function(e,t,a){var r=_.state.pagination,l=Object.assign({},r,e,a);_.setState({pagination:l}),_.tableChangeFetchData(l,_.props.requestData)}),_defineProperty(_assertThisInitialized(_),"displayField",function(e,t,a){var r,l=_version3.default.split(".")[0];switch("2"==l?r=_react2.default.createElement(_input2.default,{type:"textarea",style:{width:200,height:65}}):"3"==l&&(r=_react2.default.createElement(TextArea,{style:{width:200,height:65}})),e){case"TEXT":return _react2.default.createElement(_input2.default,{style:{width:200}});case"TEXTAREA":return r}}),_defineProperty(_assertThisInitialized(_),"onChildQuery",function(e){_.setState(e)}),_.state={visible:!1,loading:!1,rowSelection:{},display:"",selectedRowKeys:[],selectedRows:[],pagination:{pageSize:10},groups:[],groupOrder:[],columns:[{title:"属性别名",dataIndex:"label",className:"ellipsisText",render:function(e){return _react2.default.createElement("span",{title:e},e)}},{title:"展示类型",dataIndex:"displayType",render:function(e){var t="";return"TIME"==e?t="时间":"FLOAT"==e?t="浮点":"TEXT"==e?t="文本":"DATE"==e?t="日期":"SELECT"==e?t="单选":"UPLOAD"==e?t="上传":"MULTISELECT"==e?t="多选":"NUMBER"==e&&(t="整数"),_react2.default.createElement("span",{title:e},t)}},{title:"排序",dataIndex:"updateTime",width:450,className:"sort",render:function(e,t,a){return _react2.default.createElement("div",null,_react2.default.createElement("div",{style:{display:"inline-block",marginRight:5}},_react2.default.createElement("span",null,"组类别："),_react2.default.createElement(_select2.default,{style:{width:85},defaultValue:_.state.groups[a],onChange:_.handleChangeGroup.bind(null,a),getPopupContainer:function(e){return e.parentNode}},_react2.default.createElement(_select2.default.Option,{value:"group1"},"组1"),_react2.default.createElement(_select2.default.Option,{value:"group2"},"组2"),_react2.default.createElement(_select2.default.Option,{value:"group3"},"组3"),_react2.default.createElement(_select2.default.Option,{value:"group4"},"组4"),_react2.default.createElement(_select2.default.Option,{value:"group5"},"组5"))),_react2.default.createElement("div",{style:{display:"inline-block",marginRight:5}},_react2.default.createElement("span",null,"组排序："),_react2.default.createElement(_select2.default,{disabled:!0,style:{width:60},value:_.state.groupOrder[a],getPopupContainer:function(e){return e.parentNode}},_react2.default.createElement(_select2.default.Option,{value:"1"},"1"),_react2.default.createElement(_select2.default.Option,{value:"2"},"2"),_react2.default.createElement(_select2.default.Option,{value:"3"},"3"),_react2.default.createElement(_select2.default.Option,{value:"4"},"4"),_react2.default.createElement(_select2.default.Option,{value:"5"},"5"))),_react2.default.createElement("div",{style:{display:"inline-block",marginRight:5}},_react2.default.createElement("span",null,"属性排序："),_react2.default.createElement(_inputNumber2.default,{value:_.state.attrTmplOrder[a],style:{width:60},step:1,required:!0,min:1,size:"default",name:"attrSort",onChange:_.handleChangeattrTmplOrder.bind(null,a)})))}},{title:"是否必输",dataIndex:"",width:180,render:function(e,t,a){return _react2.default.createElement("div",null,_react2.default.createElement(RadioGroup,{onChange:_.changeOptional.bind(null,a),value:_.state.isOptional[a]},_react2.default.createElement(_radio2.default,{value:"N"},"是"),_react2.default.createElement(_radio2.default,{value:"Y"},"否")))}},{title:"是否作为查询条件",dataIndex:"",width:180,render:function(e,t,a){return _react2.default.createElement("div",null,_react2.default.createElement(RadioGroup,{onChange:_.changeQueryCriteria.bind(null,a),value:_.state.isQueryCriteria[a]},_react2.default.createElement(_radio2.default,{value:"0"},"是"),_react2.default.createElement(_radio2.default,{value:"1"},"否")))}},{title:"是否显示在表格",dataIndex:"",width:180,render:function(e,t,a){return _react2.default.createElement("div",null,_react2.default.createElement(RadioGroup,{onChange:_.changeDisplaytable.bind(null,a),value:_.state.isDisplaytable[a]},_react2.default.createElement(_radio2.default,{value:"0"},"是"),_react2.default.createElement(_radio2.default,{value:"1"},"否")))}},{title:"操作",dataIndex:"operation",render:function(e,t){return _react2.default.createElement("a",{href:"javascript:;",onClick:_.deletes.bind(null,t)},"删除")}}],columns2:[{title:"属性名称",dataIndex:"name",render:function(e){return _react2.default.createElement("span",{title:e},e)}},{title:"属性别名",dataIndex:"label",className:"ellipsisText"},{title:"展示类型",dataIndex:"displayType"},{title:"创建时间",dataIndex:"createTime",render:function(e){var t=new Date(parseInt(e)).toLocaleString().replace(/\//g,"-"),a=t.substring(0,t.indexOf(" "));return _react2.default.createElement("span",null,a)}},{title:"内容",dataIndex:"valueRange",render:function(e){return _react2.default.createElement("span",{title:e},e)}}]},_}return _createClass(t,[{key:"componentDidMount",value:function(){this.queryHandler()}},{key:"render",value:function(){var r=this,e={labelCol:{span:6},wrapperCol:{span:18}},t=this.props.form.getFieldDecorator,a={selectedRowKeys:this.state.selectedRowKeys,onChange:function(e){r.setState({selectedRowKeys:e},null)},onSelect:function(e,t,a){r.setState({selectedRows:a},null)},onSelectAll:function(e,t){r.setState({selectedRows:t},null)}};return _react2.default.createElement(_form2.default,{onSubmit:this.handleSubmit,style:{marginTop:18}},_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:10,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"实体名称"}),t("entityTmplName",{initialValue:this.state.entityTmplName,rules:[{required:!0,message:"请输入实体名称"}]})(this.displayField("TEXT","entityTmplName",""))))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:10,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"实体描述"}),t("description",{initialValue:this.state.description})(this.displayField("TEXTAREA","description",""))))),_react2.default.createElement(_row2.default,{style:{paddingRight:"10px",paddingLeft:"10px"}},_react2.default.createElement(_col2.default,{className:"pandora-btn-fontsize",span:4,offset:1,style:{height:32,color:"rgba(0,0,0,0.85)"}},"已选的属性列表"),_react2.default.createElement(_col2.default,{span:3,offset:16},_react2.default.createElement("div",{className:"pandora-btn-fontsize",onClick:this.showModal,style:{height:32,borderRadius:3,color:"#fff",background:"#e96b10",textAlign:"center",paddingTop:5,cursor:"pointer"}},_react2.default.createElement(_icon2.default,{className:"role-icon",type:"plus"}),_react2.default.createElement("span",null,"关联属性")))),_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:23,offset:1,style:{display:"block"}},_react2.default.createElement(_table2.default,{pagination:!1,loading:this.state.loading,dataSource:this.state.selects,columns:this.state.columns,onChange:this.tableChangeHandle,style:{paddingLeft:10,paddingRight:10},size:"middle",rowKey:"attrTmplId",scroll:{x:1400}}))),_react2.default.createElement("div",{className:"modal"},_react2.default.createElement(_modal2.default,{title:"关联属性",visible:this.state.visible,width:926,onOk:this.handleOk,onCancel:this.handleCancel},_react2.default.createElement("div",null,_react2.default.createElement(WrapperQueryForm,{callbackParent:this.onChildQuery})),_react2.default.createElement(_table2.default,{pagination:this.state.pagination,loading:this.state.loading,dataSource:this.state.data,columns:this.state.columns2,onChange:this.attrTableChangeHandle,rowSelection:a,style:{paddingLeft:10,paddingRight:10},size:"middle"}))),_react2.default.createElement(_row2.default,{type:"flex"},_react2.default.createElement(_col2.default,{span:7,offset:1,style:{marginLeft:44,marginTop:20}},_react2.default.createElement(_button2.default,{className:"query-btn operatorBtn pandora-btn-fontsize",htmlType:"submit"},"提交"),_react2.default.createElement(_button2.default,{className:"query-btn pandora-btn-fontsize",onClick:this.goToDetail},"取消"))))}}]),t}(),WrapperEditForm=_form2.default.create()(EditForm),QueryForm=function(){_inherits(a,_react2.default.Component);var t=_createSuper(a);function a(e){var s;return _classCallCheck(this,a),_defineProperty(_assertThisInitialized(s=t.call(this,e)),"handleReset",function(){s.props.form.resetFields(),s.props.form.setFieldsValue({displayType:""})}),_defineProperty(_assertThisInitialized(s),"handleSearch",function(e){e.preventDefault(),s.props.form.validateFields(function(e,t){var a=t;a.pageNo=1,a.recordsPerPage=10,s.fetchData(Object.assign({},s.state.pagination,a))})}),_defineProperty(_assertThisInitialized(s),"unique",function(e){for(var t={},a=[],r=0;r<e.length;r++)t[e[r].attrTmplId]||(t[e[r].attrTmplId]=!0,a.push(e[r]));return a}),_defineProperty(_assertThisInitialized(s),"fetchData",function(e){s.setState({loading:!0});var l=e.displayType,n=e.name,i=e.label;(0,_fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+"/tmpl/queryAttrDefList",data:e}).then(function(e){if("S"==e.reply.returnCode.type){if(attrDefList=e.reply.attrDefList,null!=attrDefList&&0<attrDefList.length)for(var t=0;t<attrDefList.length;t++)attrDefList[t].key=attrDefList[t].attrTmplId;s.setState({pagination:Object.assign({},s.state.pagination,e.reply.page),data:attrDefList,loading:!1},function(){var e,t,a,r;null!=l&&""!=l&&""!=l.trim()||null!=n&&""!=n&&""!=n.trim()||null!=i&&""!=i&&""!=i.trim()||(e=s.state.data,a=null!=(t=s.state.attrDefList)?t.concat(e):e,r=s.unique(a),s.setState({attrDefList:r}))}),s.props.callbackParent(s.state)}})}),s.state={},s}return _createClass(a,[{key:"render",value:function(){var e={labelCol:{span:8},wrapperCol:{span:16}},t=this.props.form.getFieldDecorator;return _react2.default.createElement(_form2.default,{onSubmit:this.handleSearch,style:{marginTop:18}},_react2.default.createElement(_row2.default,null,_react2.default.createElement(_col2.default,{span:5,offset:1,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"属性名称"}),t("name")(_react2.default.createElement(_input2.default,{style:{width:85}})))),_react2.default.createElement(_col2.default,{span:5,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"属性别名"}),t("label")(_react2.default.createElement(_input2.default,{style:{width:85}})))),_react2.default.createElement(_col2.default,{span:5,style:{display:"block"}},_react2.default.createElement(FormItem,_extends({},e,{label:"展示类型"}),t("displayType",{initialValue:""})(_react2.default.createElement(_select2.default,{style:{width:95},onChange:this.handleChange,getPopupContainer:function(e){return e.parentNode}},_react2.default.createElement(_select2.default.Option,{value:""},"全部"),_react2.default.createElement(_select2.default.Option,{value:"TIME"},"时间"),_react2.default.createElement(_select2.default.Option,{value:"FLOAT"},"浮点"),_react2.default.createElement(_select2.default.Option,{value:"TEXT"},"文本"),_react2.default.createElement(_select2.default.Option,{value:"DATE"},"日期"),_react2.default.createElement(_select2.default.Option,{value:"SELECT"},"单选"),_react2.default.createElement(_select2.default.Option,{value:"UPLOAD"},"上传"),_react2.default.createElement(_select2.default.Option,{value:"MULTISELECT"},"多选"),_react2.default.createElement(_select2.default.Option,{value:"NUMBER"},"整数"))))),_react2.default.createElement(_col2.default,{span:6,style:{display:"block"}},_react2.default.createElement(FormItem,null,_react2.default.createElement(_button2.default,{htmlType:"submit",type:"primary",className:"operatorBtn pandora-btn-fontsize",style:{marginLeft:10,width:88,borderRadius:5}},"查询"),_react2.default.createElement(_button2.default,{className:"pandora-btn-fontsize",onClick:this.handleReset,style:{marginLeft:10,width:88,borderRadius:5}},"清空")))))}}]),a}(),WrapperQueryForm=_form2.default.create()(QueryForm);module.exports=exports.default;