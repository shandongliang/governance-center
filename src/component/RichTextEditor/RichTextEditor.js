"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _icon=require("antd/es/icon"),_icon2=_interopRequireDefault(_icon),_message2=require("antd/es/message"),_message3=_interopRequireDefault(_message2);require("antd/es/icon/style"),require("antd/es/message/style");var _react=require("react"),_react2=_interopRequireDefault(_react),_antd=require("antd");require("braft-editor/dist/index.css"),require("braft-extensions/dist/table.css"),require("braft-extensions/dist/color-picker.css");var _braftEditor=require("braft-editor"),_braftEditor2=_interopRequireDefault(_braftEditor),_table=require("braft-extensions/dist/table"),_table2=_interopRequireDefault(_table),_colorPicker=require("braft-extensions/dist/color-picker"),_colorPicker2=_interopRequireDefault(_colorPicker),_headerId=require("braft-extensions/dist/header-id"),_headerId2=_interopRequireDefault(_headerId),_index=require("../../constant/index");require("./RichTextEditor.less");var _$fetch=require("$fetch"),_$fetch2=_interopRequireDefault(_$fetch);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ownKeys(t,e){var r,o=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),o.push.apply(o,r)),o}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(r),!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(r){var o=_isNativeReflectConstruct();return function(){var e,t=_getPrototypeOf(r);return _possibleConstructorReturn(this,o?(e=_getPrototypeOf(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments))}}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var tableOPtions={defaultColumns:3,defaultRows:3,withDropdown:!0,columnResizable:!0,exportAttrString:'border="1" style="border-collapse:collapse"'},colorOPtions={theme:"light"},headerOPtions={};_braftEditor2.default.use((0,_table2.default)(tableOPtions)),_braftEditor2.default.use((0,_colorPicker2.default)(colorOPtions)),_braftEditor2.default.use((0,_headerId2.default)(headerOPtions));var RichTextEditor=function(){_inherits(r,_react2.default.Component);var t=_createSuper(r);function r(e){var a;return _classCallCheck(this,r),_defineProperty(_assertThisInitialized(a=t.call(this,e)),"handleSaveContent",function(){var e=a.props.fetchUrl,t=a.props.fetchParam,r=a.state.editorState.toHTML(),o=a.state.editorState.toRAW(),n=a.state.editorState.toRAW(!0),i={htmlContentStr:r,rawContentStr:o,rawContentObj:n};e||_message3.default.error("富文本编辑器的 fetchUrl 属性不能为空"),t&&(i=_objectSpread({htmlContentStr:r,rawContentStr:o,rawContentObj:n},t)),(0,_$fetch2.default)({url:"/"+_index.BACKSTAGE_PROJ_NAME+e,data:i}).then(function(e){"S"===e.reply.returnCode.type?_message3.default.success("编辑内容保存成功"):_message3.default.error("编辑内容保存失败")})}),_defineProperty(_assertThisInitialized(a),"handleEditorChange",function(e){a.setState({editorState:e})}),a.state={language:"zh-cn",editorState:_braftEditor2.default.createEditorState(null),controls:["headings","font-size","line-height","letter-spacing","separator","text-color","bold","italic","underline","strike-through","separator","text-indent","text-align","separator","superscript","subscript","remove-styles","separator","list-ul","list-ol","blockquote","code","separator","media","table","link","hr","separator","undo","redo","clear"],fontSizes:[12,14,16,18,20,24,28,30,32,36,40,48,56,64,72,96,120,144],lineHeights:[1,1.2,1.5,1.75,2,2.5,3,4],textAligns:["left","center","right","justify"],imageControls:["float-left","float-right","align-left","align-center","align-right","link","size","remove"]},a}return _createClass(r,[{key:"componentDidMount",value:function(){var e=this.state.editorState;this.setState({editorState:_braftEditor2.default.createEditorState(e)})}},{key:"render",value:function(){var e=this.state.editorState,t=[{key:"editor-extend-saveBtn",type:"component",title:"保存编辑内容",component:_react2.default.createElement(_icon2.default,{type:"save",onClick:this.handleSaveContent})}],r=this.props.readOnly||!1,o=this.props.controls||this.state.controls,n=this.props.fontSizes||this.state.fontSizes,i=this.props.lineHeights||this.state.lineHeights,a=this.props.textAligns||this.state.textAligns,s=this.props.imageControls||this.state.imageControls,l=this.props.hooks||{},c=this.props.contentStyle||{},u=this.props.controlBarStyle||{},f=this.props.contentClassName||"",p=this.props.controlBarClassName||"";return _react2.default.createElement("div",{className:"editor-container"},_react2.default.createElement(_braftEditor2.default,{id:"rich-text-editor",className:"rich-text-editor",placeholder:"请输入内容...",value:e,readOnly:r,controls:o,excludeControls:this.props.excludeControls,extendControls:t,imageResizable:this.props.imageResizable||!0,imageControls:s,fontSizes:n,lineHeights:i,textAligns:a,contentStyle:c,contentClassName:f,controlBarStyle:u,controlBarClassName:p,hooks:l,onChange:this.handleEditorChange,onSave:this.handleSaveContent}))}}]),r}();exports.default=RichTextEditor,module.exports=exports.default;