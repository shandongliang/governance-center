/**
 * @author Ivocin
 * 
 * Contains all strings for the default language (zh-cn).
 * Version 1 - 2018-10-23
 */
if(!ORYX) var ORYX = {};

if(!ORYX.I18N) ORYX.I18N = {};

ORYX.I18N.Language = "zh_cn"; //Pattern <ISO language code>_<ISO country code> in lower case!

if(!ORYX.I18N.Oryx) ORYX.I18N.Oryx = {};

ORYX.I18N.Oryx.title		= "Oryx 编辑器";
ORYX.I18N.Oryx.noBackendDefined	= "注意！ \n后台没有定义。\n 无法加载请求的模型。请尝试使用插件加载配置。";
ORYX.I18N.Oryx.pleaseWait 	= "正在加载中，请等待 ......";
ORYX.I18N.Oryx.notLoggedOn = "没有登陆";
ORYX.I18N.Oryx.editorOpenTimeout = "编辑器好像还没有启动。请禁用你的弹出窗口阻止功能或者允许本站点弹出窗口。我们不会在本网站上展示广告。";

if(!ORYX.I18N.AddDocker) ORYX.I18N.AddDocker = {};

ORYX.I18N.AddDocker.group = "Docker";
ORYX.I18N.AddDocker.add = "添加 Docker";
ORYX.I18N.AddDocker.addDesc = "通过点击，添加一个 Docker 到旁边";
ORYX.I18N.AddDocker.del = "删除 Docker";
ORYX.I18N.AddDocker.delDesc = "删除 Docker";

if(!ORYX.I18N.Arrangement) ORYX.I18N.Arrangement = {};

ORYX.I18N.Arrangement.groupZ = "Z-Order";
ORYX.I18N.Arrangement.btf = "至于顶层";
ORYX.I18N.Arrangement.btfDesc = "至于顶层";
ORYX.I18N.Arrangement.btb = "至于底层";
ORYX.I18N.Arrangement.btbDesc = "至于底层";
ORYX.I18N.Arrangement.bf = "上移一层";
ORYX.I18N.Arrangement.bfDesc = "上移一层";
ORYX.I18N.Arrangement.bb = "下移一层";
ORYX.I18N.Arrangement.bbDesc = "下移一层";
ORYX.I18N.Arrangement.groupA = "对齐";
ORYX.I18N.Arrangement.ab = "底部对齐";
ORYX.I18N.Arrangement.abDesc = "底部";
ORYX.I18N.Arrangement.am = "垂直居中";
ORYX.I18N.Arrangement.amDesc = "居中";
ORYX.I18N.Arrangement.at = "顶端对齐";
ORYX.I18N.Arrangement.atDesc = "顶端";
ORYX.I18N.Arrangement.al = "左对齐";
ORYX.I18N.Arrangement.alDesc = "左";
ORYX.I18N.Arrangement.ac = "水平居中";
ORYX.I18N.Arrangement.acDesc = "居中";
ORYX.I18N.Arrangement.ar = "右对齐";
ORYX.I18N.Arrangement.arDesc = "右";
ORYX.I18N.Arrangement.as = "置为相同大小";
ORYX.I18N.Arrangement.asDesc = "相同大小";

if(!ORYX.I18N.Edit) ORYX.I18N.Edit = {};

ORYX.I18N.Edit.group = "编辑";
ORYX.I18N.Edit.cut = "剪切";
ORYX.I18N.Edit.cutDesc = "剪切所选到 Oryx 剪切板";
ORYX.I18N.Edit.copy = "拷贝";
ORYX.I18N.Edit.copyDesc = "拷贝所选到 Oryx 剪切板";
ORYX.I18N.Edit.paste = "粘贴";
ORYX.I18N.Edit.pasteDesc = "从 Oryx 剪切板粘贴到画布上";
ORYX.I18N.Edit.del = "删除";
ORYX.I18N.Edit.delDesc = "删除全部所选形状";

if(!ORYX.I18N.EPCSupport) ORYX.I18N.EPCSupport = {};

ORYX.I18N.EPCSupport.group = "EPC";
ORYX.I18N.EPCSupport.exp = "导出 EPC";
ORYX.I18N.EPCSupport.expDesc = "导出图形到 EPML";
ORYX.I18N.EPCSupport.imp = "导入 EPC";
ORYX.I18N.EPCSupport.impDesc = "导入 EPML 文件";
ORYX.I18N.EPCSupport.progressExp = "导出模型";
ORYX.I18N.EPCSupport.selectFile = "选择一个 EPML (.empl) 文件来导入";
ORYX.I18N.EPCSupport.file = "文件";
ORYX.I18N.EPCSupport.impPanel = "导入 EPML 文件";
ORYX.I18N.EPCSupport.impBtn = "导入";
ORYX.I18N.EPCSupport.close = "关闭";
ORYX.I18N.EPCSupport.error = "错误";
ORYX.I18N.EPCSupport.progressImp = "导入...";

if(!ORYX.I18N.ERDFSupport) ORYX.I18N.ERDFSupport = {};

ORYX.I18N.ERDFSupport.exp = "导出到 ERDF";
ORYX.I18N.ERDFSupport.expDesc = "导出到 ERDF";
ORYX.I18N.ERDFSupport.imp = "从 ERDF 导入";
ORYX.I18N.ERDFSupport.impDesc = "从 ERDF 导入";
ORYX.I18N.ERDFSupport.impFailed = "导入 ERDF 请求失败.";
ORYX.I18N.ERDFSupport.impFailed2 = "导入时发生错误！ <br/>请查看错误信息：<br/><br/>";
ORYX.I18N.ERDFSupport.error = "错误";
ORYX.I18N.ERDFSupport.noCanvas = "xml 文档没有包含 Oryx 画布节点信息！";
ORYX.I18N.ERDFSupport.noSS = "Oryx 画布节点未定义 stencil set！";
ORYX.I18N.ERDFSupport.wrongSS = "stencil set 与当前编辑器不匹配！";
ORYX.I18N.ERDFSupport.selectFile = "选择 ERDF (.xml) 文件 或输入 ERDF 导入！";
ORYX.I18N.ERDFSupport.file = "文件";
ORYX.I18N.ERDFSupport.impERDF = "导入 ERDF";
ORYX.I18N.ERDFSupport.impBtn = "导入";
ORYX.I18N.ERDFSupport.impProgress = "导入中...";
ORYX.I18N.ERDFSupport.close = "关闭";
ORYX.I18N.ERDFSupport.deprTitle = "确定导出 eRDF 吗？";
ORYX.I18N.ERDFSupport.deprText = "不再推荐导出 eRDF， 因为以后的 Oryx 编辑器不再支持 eRDF。如果有需要，将模型导出为 JSON 格式。你仍然要导出吗？";

if(!ORYX.I18N.jPDLSupport) ORYX.I18N.jPDLSupport = {};

ORYX.I18N.jPDLSupport.group = "ExecBPMN";
ORYX.I18N.jPDLSupport.exp = "导出到 jPDL";
ORYX.I18N.jPDLSupport.expDesc = "导出到 jPDL";
ORYX.I18N.jPDLSupport.imp = "从 jPDL 导入";
ORYX.I18N.jPDLSupport.impDesc = "从 jPDL 文件导入";
ORYX.I18N.jPDLSupport.impFailedReq = "从 jPDL 导入请求失败。";
ORYX.I18N.jPDLSupport.impFailedJson = "传输 jPDL 失败。";
ORYX.I18N.jPDLSupport.impFailedJsonAbort = "导入失败。";
ORYX.I18N.jPDLSupport.loadSseQuestionTitle = "需要加载 jBPM stencil set 扩展"; 
ORYX.I18N.jPDLSupport.loadSseQuestionBody = "为了导入 jPDL，必须加载 stencil set 扩展。想要执行吗？";
ORYX.I18N.jPDLSupport.expFailedReq = "导出模型请求失败。";
ORYX.I18N.jPDLSupport.expFailedXml = "导出 jPDL 失败。导出报告： ";
ORYX.I18N.jPDLSupport.error = "错误";
ORYX.I18N.jPDLSupport.selectFile = "选择 jPDL (.xml) 文件或输入 jPDL 导入！";
ORYX.I18N.jPDLSupport.file = "文件";
ORYX.I18N.jPDLSupport.impJPDL = "导入 jPDL";
ORYX.I18N.jPDLSupport.impBtn = "导入";
ORYX.I18N.jPDLSupport.impProgress = "导入中...";
ORYX.I18N.jPDLSupport.close = "关闭";

if(!ORYX.I18N.Save) ORYX.I18N.Save = {};

ORYX.I18N.Save.group = "文件";
ORYX.I18N.Save.save = "保存";
ORYX.I18N.Save.saveDesc = "保存";
ORYX.I18N.Save.saveAs = "存储为...";
ORYX.I18N.Save.saveAsDesc = "存储为...";
ORYX.I18N.Save.unsavedData = "存在没有保存的数据，请离开前保存，否则你的修改会丢失！";
ORYX.I18N.Save.newProcess = "新建流程";
ORYX.I18N.Save.saveAsTitle = "存储为...";
ORYX.I18N.Save.saveBtn = "保存";
ORYX.I18N.Save.close = "关闭";
ORYX.I18N.Save.savedAs = "存储为";
ORYX.I18N.Save.saved = "已保存！";
ORYX.I18N.Save.failed = "保存失败。";
ORYX.I18N.Save.noRights = "你没有权限执行保存操作。";
ORYX.I18N.Save.saving = "保存中";
ORYX.I18N.Save.saveAsHint = "流程图形存储在： ";

if(!ORYX.I18N.File) ORYX.I18N.File = {};

ORYX.I18N.File.group = "文件";
ORYX.I18N.File.print = "打印";
ORYX.I18N.File.printDesc = "打印当前模型";
ORYX.I18N.File.pdf = "导出为 PDF";
ORYX.I18N.File.pdfDesc = "导出为 PDF";
ORYX.I18N.File.info = "信息";
ORYX.I18N.File.infoDesc = "信息";
ORYX.I18N.File.genPDF = "正在生成 PDF";
ORYX.I18N.File.genPDFFailed = "生成 PDF 失败。";
ORYX.I18N.File.printTitle = "打印";
ORYX.I18N.File.printMsg = "打印功能暂时有一些问题。建议使用导出 PDF 功能导出图形。你还要继续打印吗？";

if(!ORYX.I18N.Grouping) ORYX.I18N.Grouping = {};

ORYX.I18N.Grouping.grouping = "组合";
ORYX.I18N.Grouping.group = "组合";
ORYX.I18N.Grouping.groupDesc = "将全部所选形状组合";
ORYX.I18N.Grouping.ungroup = "解除组合";
ORYX.I18N.Grouping.ungroupDesc = "删除所选形状的全部组合";

if(!ORYX.I18N.Loading) ORYX.I18N.Loading = {};

ORYX.I18N.Loading.waiting ="请稍等...";

if(!ORYX.I18N.PropertyWindow) ORYX.I18N.PropertyWindow = {};

ORYX.I18N.PropertyWindow.name = "名称";
ORYX.I18N.PropertyWindow.value = "值";
ORYX.I18N.PropertyWindow.selected = "被选中";
ORYX.I18N.PropertyWindow.clickIcon = "点击图标";
ORYX.I18N.PropertyWindow.add = "添加";
ORYX.I18N.PropertyWindow.rem = "移除";
ORYX.I18N.PropertyWindow.complex = "复杂类型的编辑器";
ORYX.I18N.PropertyWindow.text = "文本类型的编辑器";
ORYX.I18N.PropertyWindow.ok = "确定";
ORYX.I18N.PropertyWindow.cancel = "取消";
ORYX.I18N.PropertyWindow.dateFormat = "m/d/y";

if(!ORYX.I18N.ShapeMenuPlugin) ORYX.I18N.ShapeMenuPlugin = {};

ORYX.I18N.ShapeMenuPlugin.drag = "拖拽";
ORYX.I18N.ShapeMenuPlugin.clickDrag = "点击或拖拽";
ORYX.I18N.ShapeMenuPlugin.morphMsg = "变换图形";

if(!ORYX.I18N.SyntaxChecker) ORYX.I18N.SyntaxChecker = {};

ORYX.I18N.SyntaxChecker.group = "校验";
ORYX.I18N.SyntaxChecker.name = "语法检查";
ORYX.I18N.SyntaxChecker.desc = "检查语法";
ORYX.I18N.SyntaxChecker.noErrors = "没有语法错误。";
ORYX.I18N.SyntaxChecker.invalid = "服务器响应非法。";
ORYX.I18N.SyntaxChecker.checkingMessage = "正在检查 ...";

if(!ORYX.I18N.FormHandler) ORYX.I18N.FormHandler = {};

ORYX.I18N.FormHandler.group = "表单处理";
ORYX.I18N.FormHandler.name = "表单处理器";
ORYX.I18N.FormHandler.desc = "处理测试";

if(!ORYX.I18N.Deployer) ORYX.I18N.Deployer = {};

ORYX.I18N.Deployer.group = "发布";
ORYX.I18N.Deployer.name = "发布";
ORYX.I18N.Deployer.desc = "发布到引擎上";

if(!ORYX.I18N.Tester) ORYX.I18N.Tester = {};

ORYX.I18N.Tester.group = "测试";
ORYX.I18N.Tester.name = "测试流程";
ORYX.I18N.Tester.desc = "打开测试组件测试本流程定义";

if(!ORYX.I18N.Undo) ORYX.I18N.Undo = {};

ORYX.I18N.Undo.group = "撤销";
ORYX.I18N.Undo.undo = "撤销";
ORYX.I18N.Undo.undoDesc = "撤销上次操作";
ORYX.I18N.Undo.redo = "恢复";
ORYX.I18N.Undo.redoDesc = "恢复上次操作";

if(!ORYX.I18N.View) ORYX.I18N.View = {};

ORYX.I18N.View.group = "缩放";
ORYX.I18N.View.zoomIn = "放大";
ORYX.I18N.View.zoomInDesc = "放大模型";
ORYX.I18N.View.zoomOut = "缩小";
ORYX.I18N.View.zoomOutDesc = "缩小模型";
ORYX.I18N.View.zoomStandard = "恢复缩放";
ORYX.I18N.View.zoomStandardDesc = "恢复缩放到正常水平";
ORYX.I18N.View.zoomFitToModel = "缩放以适应模型大小";
ORYX.I18N.View.zoomFitToModelDesc = "缩放以适应模型大小";

if(!ORYX.I18N.XFormsSerialization) ORYX.I18N.XFormsSerialization = {};

ORYX.I18N.XFormsSerialization.group = "XForms 序列化";
ORYX.I18N.XFormsSerialization.exportXForms = "XForms 导出";
ORYX.I18N.XFormsSerialization.exportXFormsDesc = "导出 XForms+XHTML 标记";
ORYX.I18N.XFormsSerialization.importXForms = "导入 XForms";
ORYX.I18N.XFormsSerialization.importXFormsDesc = "导入 XForms+XHTML 标记";
ORYX.I18N.XFormsSerialization.noClientXFormsSupport = "不支持 XForms";
ORYX.I18N.XFormsSerialization.noClientXFormsSupportDesc = "<h2>你的浏览器不支持 XForms。火狐浏览器请安装 <a href=\"https://addons.mozilla.org/firefox/addon/824\" target=\"_blank\">Mozilla XForms Add-on</a> 。</h2>";
ORYX.I18N.XFormsSerialization.ok = "确定";
ORYX.I18N.XFormsSerialization.selectFile = "选择 XHTML (.xhtml) 文件或输入 XForms+XHTML 来导入";
ORYX.I18N.XFormsSerialization.selectCss = "请插入 css 文件的 url";
ORYX.I18N.XFormsSerialization.file = "文件";
ORYX.I18N.XFormsSerialization.impFailed = "导入文档请求失败。";
ORYX.I18N.XFormsSerialization.impTitle = "导入 XForms+XHTML 文档";
ORYX.I18N.XFormsSerialization.expTitle = "导出 XForms+XHTML 文档";
ORYX.I18N.XFormsSerialization.impButton = "导入";
ORYX.I18N.XFormsSerialization.impProgress = "导入中...";
ORYX.I18N.XFormsSerialization.close = "关闭";

/** New Language Properties: 08.12.2008 */

ORYX.I18N.PropertyWindow.title = "属性";

if(!ORYX.I18N.ShapeRepository) ORYX.I18N.ShapeRepository = {};
ORYX.I18N.ShapeRepository.title = "形状仓库";

ORYX.I18N.Save.dialogDesciption = "请输入名字、描述和备注。";
ORYX.I18N.Save.dialogLabelTitle = "标题";
ORYX.I18N.Save.dialogLabelDesc = "描述";
ORYX.I18N.Save.dialogLabelType = "类型";
ORYX.I18N.Save.dialogLabelComment = "版本备注";

if(!ORYX.I18N.Perspective) ORYX.I18N.Perspective = {};
ORYX.I18N.Perspective.no = "没有 Perspective"
ORYX.I18N.Perspective.noTip = "卸载当前 perspective"

/** New Language Properties: 21.04.2009 */
ORYX.I18N.JSONSupport = {
    imp: {
        name: "从 JSON 导入",
        desc: "从 JSON 导入模型",
        group: "导出",
        selectFile: "选择 JSON (.json) 文件或者输入 JSON 导入！",
        file: "文件",
        btnImp: "导入",
        btnClose: "关闭",
        progress: "导入中 ...",
        syntaxError: "语法错误"
    },
    exp: {
        name: "导出为 JSON",
        desc: "将当前模型导出为 JSON",
        group: "导出"
    }
};

/** New Language Properties: 09.05.2009 */
if(!ORYX.I18N.JSONImport) ORYX.I18N.JSONImport = {};

ORYX.I18N.JSONImport.title = "导入 JSON";
ORYX.I18N.JSONImport.wrongSS = "导入文件({0})的 stencil set 与已加载的 stencil set ({1}) 不匹配。"

/** New Language Properties: 14.05.2009 */
if(!ORYX.I18N.RDFExport) ORYX.I18N.RDFExport = {};
ORYX.I18N.RDFExport.group = "导出";
ORYX.I18N.RDFExport.rdfExport = "导出到 RDF";
ORYX.I18N.RDFExport.rdfExportDescription = "将当前模型导出为 XML serialization defined for the Resource Description Framework (RDF)";

/** New Language Properties: 15.05.2009*/
if(!ORYX.I18N.SyntaxChecker.BPMN) ORYX.I18N.SyntaxChecker.BPMN={};
ORYX.I18N.SyntaxChecker.BPMN_NO_SOURCE = "边必须有 source。";
ORYX.I18N.SyntaxChecker.BPMN_NO_TARGET = "边必须有 target。";
ORYX.I18N.SyntaxChecker.BPMN_DIFFERENT_PROCESS = "同一个流程中必须同时包括 source 和 target 节点。";
ORYX.I18N.SyntaxChecker.BPMN_SAME_PROCESS = "source 和 target 节点必须在不同的 pools 里。";
ORYX.I18N.SyntaxChecker.BPMN_FLOWOBJECT_NOT_CONTAINED_IN_PROCESS = "流程里必须有 flow 对象。";
ORYX.I18N.SyntaxChecker.BPMN_ENDEVENT_WITHOUT_INCOMING_CONTROL_FLOW = "结束事件必须有输入连线。";
ORYX.I18N.SyntaxChecker.BPMN_STARTEVENT_WITHOUT_OUTGOING_CONTROL_FLOW = "开始事件必须有输出连线。";
ORYX.I18N.SyntaxChecker.BPMN_STARTEVENT_WITH_INCOMING_CONTROL_FLOW = "开始事件不能有输入连线。";
ORYX.I18N.SyntaxChecker.BPMN_ATTACHEDINTERMEDIATEEVENT_WITH_INCOMING_CONTROL_FLOW = "Attached intermediate events 不能有输入连线。";
ORYX.I18N.SyntaxChecker.BPMN_ATTACHEDINTERMEDIATEEVENT_WITHOUT_OUTGOING_CONTROL_FLOW = "Attached intermediate events 只能有一条输出连线。";
ORYX.I18N.SyntaxChecker.BPMN_ENDEVENT_WITH_OUTGOING_CONTROL_FLOW = "结束事件不能有输出连线。";
ORYX.I18N.SyntaxChecker.BPMN_EVENTBASEDGATEWAY_BADCONTINUATION = "基于事件的网关不能接网关和子流程。";
ORYX.I18N.SyntaxChecker.BPMN_NODE_NOT_ALLOWED = "不支持的节点类型。";

if(!ORYX.I18N.SyntaxChecker.IBPMN) ORYX.I18N.SyntaxChecker.IBPMN={};
ORYX.I18N.SyntaxChecker.IBPMN_NO_ROLE_SET = "Interactions 必须有 sender 和 receiver role set";
ORYX.I18N.SyntaxChecker.IBPMN_NO_INCOMING_SEQFLOW = "本节点必须有输入连线。";
ORYX.I18N.SyntaxChecker.IBPMN_NO_OUTGOING_SEQFLOW = "本节点必须有输出连线。";

if(!ORYX.I18N.SyntaxChecker.InteractionNet) ORYX.I18N.SyntaxChecker.InteractionNet={};
ORYX.I18N.SyntaxChecker.InteractionNet_SENDER_NOT_SET = "没有设置 Sender";
ORYX.I18N.SyntaxChecker.InteractionNet_RECEIVER_NOT_SET = "没有设置 Receiver";
ORYX.I18N.SyntaxChecker.InteractionNet_MESSAGETYPE_NOT_SET = "未设置消息类型";
ORYX.I18N.SyntaxChecker.InteractionNet_ROLE_NOT_SET = "没有设置角色";

if(!ORYX.I18N.SyntaxChecker.EPC) ORYX.I18N.SyntaxChecker.EPC={};
ORYX.I18N.SyntaxChecker.EPC_NO_SOURCE = "边必须有 source。";
ORYX.I18N.SyntaxChecker.EPC_NO_TARGET = "边必须有 target。";
ORYX.I18N.SyntaxChecker.EPC_NOT_CONNECTED = "节点必须和边连接。";
ORYX.I18N.SyntaxChecker.EPC_NOT_CONNECTED_2 = "节点必须和更多的边连接。";
ORYX.I18N.SyntaxChecker.EPC_TOO_MANY_EDGES = "节点连接了过多的边。";
ORYX.I18N.SyntaxChecker.EPC_NO_CORRECT_CONNECTOR = "节点连接不正确。";
ORYX.I18N.SyntaxChecker.EPC_MANY_STARTS = "只能有一个开始事件。";
ORYX.I18N.SyntaxChecker.EPC_FUNCTION_AFTER_OR = "OR/XOR 后不能有 functions。";
ORYX.I18N.SyntaxChecker.EPC_PI_AFTER_OR = "OR/XOR 后不能有流程接口。";
ORYX.I18N.SyntaxChecker.EPC_FUNCTION_AFTER_FUNCTION =  "function 后不能接 function。";
ORYX.I18N.SyntaxChecker.EPC_EVENT_AFTER_EVENT =  "事件后不能接事件。";
ORYX.I18N.SyntaxChecker.EPC_PI_AFTER_FUNCTION =  "function 后不能接流程接口。";
ORYX.I18N.SyntaxChecker.EPC_FUNCTION_AFTER_PI =  "流程接口后不能有 function。";
ORYX.I18N.SyntaxChecker.EPC_SOURCE_EQUALS_TARGET = "一条边必须连接两个不同的节点。"

if(!ORYX.I18N.SyntaxChecker.PetriNet) ORYX.I18N.SyntaxChecker.PetriNet={};
ORYX.I18N.SyntaxChecker.PetriNet_NOT_BIPARTITE = "The graph is not bipartite";
ORYX.I18N.SyntaxChecker.PetriNet_NO_LABEL = "Label not set for a labeled transition";
ORYX.I18N.SyntaxChecker.PetriNet_NO_ID = "There is a node without id";
ORYX.I18N.SyntaxChecker.PetriNet_SAME_SOURCE_AND_TARGET = "Two flow relationships have the same source and target";
ORYX.I18N.SyntaxChecker.PetriNet_NODE_NOT_SET = "A node is not set for a flowrelationship";

/** New Language Properties: 02.06.2009*/
ORYX.I18N.Edge = "边";
ORYX.I18N.Node = "节点";

/** New Language Properties: 03.06.2009*/
ORYX.I18N.SyntaxChecker.notice = "鼠标移到红色叉号图标上查看错误信息。";

/** New Language Properties: 05.06.2009*/
if(!ORYX.I18N.RESIZE) ORYX.I18N.RESIZE = {};
ORYX.I18N.RESIZE.tipGrow = "增加画布大小：";
ORYX.I18N.RESIZE.tipShrink = "减小画布大小：";
ORYX.I18N.RESIZE.N = "上";
ORYX.I18N.RESIZE.W = "左";
ORYX.I18N.RESIZE.S ="下";
ORYX.I18N.RESIZE.E ="右";

/** New Language Properties: 15.07.2009*/
if(!ORYX.I18N.Layouting) ORYX.I18N.Layouting ={};
ORYX.I18N.Layouting.doing = "Layouting...";

/** New Language Properties: 18.08.2009*/
ORYX.I18N.SyntaxChecker.MULT_ERRORS = "多个错误";

/** New Language Properties: 08.09.2009*/
if(!ORYX.I18N.PropertyWindow) ORYX.I18N.PropertyWindow = {};
ORYX.I18N.PropertyWindow.oftenUsed = "常用的";
ORYX.I18N.PropertyWindow.moreProps = "更多属性";

/** New Language Properties 01.10.2009 */
if(!ORYX.I18N.SyntaxChecker.BPMN2) ORYX.I18N.SyntaxChecker.BPMN2 = {};

ORYX.I18N.SyntaxChecker.BPMN2_DATA_INPUT_WITH_INCOMING_DATA_ASSOCIATION = "A Data Input must not have any incoming Data Associations.";
ORYX.I18N.SyntaxChecker.BPMN2_DATA_OUTPUT_WITH_OUTGOING_DATA_ASSOCIATION = "A Data Output must not have any outgoing Data Associations.";
ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_TARGET_WITH_TOO_MANY_INCOMING_SEQUENCE_FLOWS = "Targets of Event-based Gateways may only have one incoming Sequence Flow.";

/** New Language Properties 02.10.2009 */
ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_WITH_TOO_LESS_OUTGOING_SEQUENCE_FLOWS = "An Event-based Gateway must have two or more outgoing Sequence Flows.";
ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_EVENT_TARGET_CONTRADICTION = "If Message Intermediate Events are used in the configuration, then Receive Tasks must not be used and vice versa.";
ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_WRONG_TRIGGER = "Only the following Intermediate Event triggers are valid: Message, Signal, Timer, Conditional and Multiple.";
ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_WRONG_CONDITION_EXPRESSION = "The outgoing Sequence Flows of the Event Gateway must not have a condition expression.";
ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_NOT_INSTANTIATING = "The Gateway does not meet the conditions to instantiate the process. Please use a start event or an instantiating attribute for the gateway.";

/** New Language Properties 05.10.2009 */
ORYX.I18N.SyntaxChecker.BPMN2_GATEWAYDIRECTION_MIXED_FAILURE = "The Gateway must have both multiple incoming and outgoing Sequence Flows.";
ORYX.I18N.SyntaxChecker.BPMN2_GATEWAYDIRECTION_CONVERGING_FAILURE = "The Gateway must have multiple incoming but most NOT have multiple outgoing Sequence Flows.";
ORYX.I18N.SyntaxChecker.BPMN2_GATEWAYDIRECTION_DIVERGING_FAILURE = "The Gateway must NOT have multiple incoming but must have multiple outgoing Sequence Flows.";
ORYX.I18N.SyntaxChecker.BPMN2_GATEWAY_WITH_NO_OUTGOING_SEQUENCE_FLOW = "A Gateway must have a minimum of one outgoing Sequence Flow.";
ORYX.I18N.SyntaxChecker.BPMN2_RECEIVE_TASK_WITH_ATTACHED_EVENT = "Receive Tasks used in Event Gateway configurations must not have any attached Intermediate Events.";
ORYX.I18N.SyntaxChecker.BPMN2_EVENT_SUBPROCESS_BAD_CONNECTION = "An Event Subprocess must not have any incoming or outgoing Sequence Flow.";

/** New Language Properties 13.10.2009 */
ORYX.I18N.SyntaxChecker.BPMN_MESSAGE_FLOW_NOT_CONNECTED = "At least one side of the Message Flow has to be connected.";

/** New Language Properties 24.11.2009 */
ORYX.I18N.SyntaxChecker.BPMN2_TOO_MANY_INITIATING_MESSAGES = "A Choreography Activity may only have one initiating message.";
ORYX.I18N.SyntaxChecker.BPMN_MESSAGE_FLOW_NOT_ALLOWED = "A Message Flow is not allowed here.";

/** New Language Properties 27.11.2009 */
ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_WITH_TOO_LESS_INCOMING_SEQUENCE_FLOWS = "An Event-based Gateway that is not instantiating must have a minimum of one incoming Sequence Flow.";
ORYX.I18N.SyntaxChecker.BPMN2_TOO_FEW_INITIATING_PARTICIPANTS = "A Choreography Activity must have one initiating Participant (white).";
ORYX.I18N.SyntaxChecker.BPMN2_TOO_MANY_INITIATING_PARTICIPANTS = "A Choreography Acitivity must not have more than one initiating Participant (white)."

ORYX.I18N.SyntaxChecker.COMMUNICATION_AT_LEAST_TWO_PARTICIPANTS = "The communication must be connected to at least two participants.";
ORYX.I18N.SyntaxChecker.MESSAGEFLOW_START_MUST_BE_PARTICIPANT = "The message flow's source must be a participant.";
ORYX.I18N.SyntaxChecker.MESSAGEFLOW_END_MUST_BE_PARTICIPANT = "The message flow's target must be a participant.";
ORYX.I18N.SyntaxChecker.CONV_LINK_CANNOT_CONNECT_CONV_NODES = "The conversation link must connect a communication or sub conversation node with a participant.";
