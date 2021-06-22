
const prefix = '$pandora';

const common = {
  COMM_CONTENT_WIDTH: 990,
  DATE_FORMAT_MOMENT: 'YYYY-MM-DD',
  DATE_FORMAT: 'yyyy-MM-dd',
  DATE_REQUEST_FORMAT: 'YYYYMMDD',
  DATE_INITIAL_DATE: '2016-01-01',
  DATE_MAX_DURATION: '1',
};

const namespace = {
  NAMESPACE_AUTH: `${prefix}_auth`,
  NAMESPACE_MENU: `${prefix}_menu`,
  NAMESPACE_NAV: `${prefix}_nav`, // pandora2.0
  NAMESPACE_CACHE: `${prefix}_cache`,
  NAMESPACE_USER: `${prefix}_user`,
}

const auth = {
  AUTH_USER_INFO: 'user_info',
  LOCAL_USER_NAME: 'user_name',
  AUTH_USER_ISLOGIN: 'use_islogin',
  MENU_INFO: 'menu_info',
  OAUTH_HREF: 'oauth_href',
  INIT_URL: 'init_url', // pandora1.4.0-SNAPSHOT新增
  CACHE_DICT_LIST: 'dict_list',
  CACHE_ORG_LIST: 'org_list',
  MULTISUBSYSTYPE: 'multisubsysType', // pandora1.6.0-SNAPSHOT新增
  SELECTED_MULTISUBSYS: 'selected_multisubsys', // pandora1.6.0-SNAPSHOT新增
  CURRENT_SUBSYS_NAME: 'current_subsys_name', // pandora1.6.0-SNAPSHOT新增
  SUB_SYSTEM_LIST: 'subSystem_list', // pandora1.6.0-SNAPSHOT新增,pandora1.7.0-SNAPSHOT修改
  CURRENT_PERMTYPE: 'current_permType',  //pandora1.7.1-SNAPSHOT新增
  CACHE_APP_ELEMENTLIST: 'app_element_list',    //pandora1.7.3-SNAPSHOT新增
  CACHE_USERTASK_ELEMENTLIST: 'usertask_element_list',    //pandora1.7.3-SNAPSHOT新增
  FROM_HOME_INDEX: 'from_home_index', //pandora1.7.3-SNAPSHOT新增, //pandora1.9.0-SNAPSHOT新增
  BREADCRUMB_PATH: 'breadcrumb_path', // Pandora1.8.0-SNAPSHOT新增
  CACHE_ROLE_INFO: 'role_info',// pandora2.3.0-SNAPSHOT新增
  IS_USE_SECURITY_ROLES: 'is_use_security_roles',// pandora2.6.0-SNAPSHOT新增
  IS_USE_ROLE_LEVEL: 'is_use_role_level',// pandora2.6.0-SNAPSHOT新增
  CURRENT_SUPREME_ROLELEVEL: 'current_supreme_rolelevel',// pandora2.6.0-SNAPSHOT新增
}

const ajax = {
  AJAX_SYSTEM_ERROR: "system_error",
  AJAX_LOGIN_TIMEOUT_ERROR: 'timeout_error',
  AJAX_BUSINESS_ERROR: 'business_error',
  AJAX_SUCCESS_CODE: '000000',
  AJAX_NET_ERROR: 'net_error',
};
const validata = {
  VALIDATA_ERROR: "validate_error",
};


/* pandora1.3.0-SNAPSHOT新增 start*/

const login = {
  LOGIN_SYSTEM_APPID: '5T6',
  LOGIN_PATH: '/login',
}

const fetchRequestUrl = {
  BACKSTAGE_PROJ_NAME: 'tesla-gateway-console-app'
}
/* pandora1.3.0-SNAPSHOT新增 end*/

/* pandora1.4.0-SNAPSHOT新增 start*/

// 流程管理按钮是否展示的开关
const isShowBtn = {
  MYTODOTASK_DETAIL_CLOSE: true, // 关闭
  MYTODOTASK_DETAIL_DELEGATE: true, // 委派
  MYTODOTASK_DETAIL_DELEGATE_COMMENT: false, // 委派时是否填写批注，不填写默认为：A将【二级复核】任务委派给B （示例）
  MYTODOTASK_DETAIL_TRANSFER: true, // 转办
  MYTODOTASK_DETAIL_TRANSFER_COMMENT: false, // 转办时是否填写批注，不填写默认为：A将【二级复核】任务转给B （示例）
  MYRESULT_DETAIL_RETRACT: true, // 撤回
  IS_QUERY_BY_STARTUSERORGID: true, //pandora2.6.0-SNAPSHOT新增 待办列表页是否使用 流程发起人所属机构 作为查询条件
  IS_SHOW_COMMONENTLIST_INTAB: true, // pandora2.6.0-SNAPSHOT新增 待签收详情、待办详情、已办详情页面中的批注列表是否在tab栏中单独展示，默认在tab栏中单独展示
}
// 个性化首页
const isSelfHomePage = {
  NEED_SELFHOME_PAGE: false, // 是否需要自定义主页
  LOGIN_SELFHOME_URL: '/homePage' //请严格按照该例子配置您的首页地址
}
/* pandora1.4.0-SNAPSHOT新增 end*/

/* pandora1.6.0-SNAPSHOT新增 start*/

// 是否展示用户详情页面的编辑按钮
const isShowEditUserBtn = {
  ISSHOW_EDITUSER_BTN: true
}

// 子系统路径
const isShowSubSystem = {
  SHOW_SUBSYSTEM_URL: '/subSystem'
}
/* pandora1.6.0-SNAPSHOT新增 end*/

/* pandora1.7.1-SNAPSHOT新增 start*/

// 是否展示页面左下角 切换主题 的按钮
const isShowSwitchThemeBtn = {
  ISSHOW_SWITCHCOMPONENT: false
}


// Logo右侧的项目名称：可以选择使用图片或文字，若图片路径为空,则默认展示文字
const projectTitleInfo = {
  // PROJECTTITLEIMG:'./../../assets/images/project_name.png', //(当前文件  到  图片所在文件夹的相对路径)
  PROJECTTITLETEXT: 'Pandora',
}

// menu宽度设置
const menuSetting = {
  MENU_WIDTH_EXPANDED: 224, // pandora1.9.0去掉  可在src/app/layout.js文件中直接设置
}

/* pandora1.7.1-SNAPSHOT新增 end*/

/* pandora1.7.3-SNAPSHOT新增 start*/
const loginedHomeIndex = {
  NEED_HOME_INDEX: false,
  LOGINED_SELFHOME_URL: '/homeIndex'
}

// (该版本中只有未对接统一身份认证平台的代码中需要新增如下常量，对接统一身份认证平台的不需要新增)
// 未对接统一身份认证平台的登录界面中LOGO及项目名称自定义
const loginSetting = {
  PROJECT_LOGO: './../../assets/images/logo-img.png',
  PROJECT_NAME: 'PANDORA'
}
/* pandora1.7.3-SNAPSHOT新增 end*/

// pandora2.0-SNAPSHOT新增 start
const nav = {
  NAV_LIST: 'nav_list',
  TABS: 'tabs',
}

const isShowClosableAllTagsBtn = {
  ISSHOW_CLOSE_ALLTAGS_BTN: true, // 是否展示 关闭全部页签 按钮
  CLOSABLE_TAGS_NUMBER: 5, //打开的可关闭页签数量超过 CLOSABLE_TAGS_NUMBER 时才展示 关闭全部页签 按钮，默认值：5
}
// pandora2.0-SNAPSHOT新增 end

// pandora2.1-SNAPSHOT新增 start

// 是否展示业务已办、业务待办的按钮
const isShowBusiTodoTaskBtn = {
  BUSITODOTASK_DETAIL_CLOSE: false, // 关闭
  BUSITODOTASK_INDEX_DELEGATE: true, // 委派
  BUSITODOTASK_INDEX_TRANSFER: true, // 转办
  BUSIDONETASK_DETAIL_RETRACT: false, // 撤回
  BUSITODOTASK_DETAIL_DELEGATE_COMMENT: false, // 委 派时是否填写批注，不填写默认为：A将【二级复核】任务委派给B （示例）
  BUSITODOTASK_DETAIL_TRANSFER_COMMENT: false, // 转办时是否填写批注，不填写默认为：A将【二级复核】任务转给B （示例）
}

// pandora2.1-SNAPSHOT新增 end

// pandora2.2-SNAPSHOT新增 start

// 是否清除统一身份认证的session，清除:跳转第三方登录页，不清：关闭当前页签 或 指定页面
const isCloseBrowserCurrentTag = {
  IS_CLEAR_THIRDPARTY_SESSION: true,
  LOGOUT_REDIRECT_URL: '/homePage',// 跳转制定页面，如：'http://197.3.153.33:18888/pandora-web/#/home' 或 '/homePage'
  NS_LOGIN_URL: '/login',// 跳转不对接统一身份认证平台的登录页面， 如：'/login'
}

// 是否需要展示岗位
const isNeedShowPost = {
  IS_NEED_SHOW_POST: false,
  USER_OR_ROLE_POST: 'USER'   //该值为USER 和 ROLE
}

// Pandora基线模块是否使用页签多开功能，默认：使用页签多开功能
const isOpenMultiTabNav = {
  IS_OPEN_MULTI_TABNAV: true,
};
// pandora2.2-SNAPSHOT新增 end

// const all = Object.assign({},common,namespace,auth,i18n,ajax,api);


export default Object.assign({},
  common,
  ajax,
  namespace,
  auth,
  nav,
  login,
  fetchRequestUrl,
  isShowBtn,
  isSelfHomePage,
  isShowSubSystem,
  isShowEditUserBtn,
  isShowSwitchThemeBtn,
  projectTitleInfo,
  menuSetting,
  loginSetting,
  loginedHomeIndex,
  isShowClosableAllTagsBtn,
  isShowBusiTodoTaskBtn,
  isCloseBrowserCurrentTag,
  isNeedShowPost,
  isOpenMultiTabNav,
);


// export  {all as default,common,namespace,auth,i18n,ajax,api };
