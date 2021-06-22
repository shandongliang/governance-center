const baseUrl = '/tesla-gateway-console-app/commonConfig/';
const rbacUrl = '/tesla-gateway-console-app/rbac/';


const url = {
  // 模块
  querySgModuleCommonConfigList: `${baseUrl}querySgModuleCommonConfigList`,//模块非业务新增数据功能

  // 服务单元
  querySgSubmoduleCommonConfigList: `${baseUrl}querySgSubmoduleCommonConfigList`,//服务单元非业务数据列表查询功能

  // 模块关联用户
  addSysUserModule: `${rbacUrl}addSysUserModule`,//模块关联用户
  querySysUserModule: `${rbacUrl}querySysUserModule`,//查询模块关联用户
  editSysUserModule: `${rbacUrl}editSysUserModule`,//编辑模块关联用户
  deleteSysUserModule: `${rbacUrl}deleteSysUserModule`,//删除模块关联用户

  // 服务单元关联用户
  querySysUserSubmodule: `${rbacUrl}querySysUserSubmodule`,//服务单元关联用户
  addSysUserSubmodule: `${rbacUrl}addSysUserSubmodule`,//查询服务单元关联用户
  editSysUserSubmodule: `${rbacUrl}editSysUserSubmodule`,//编辑服务单元关联用户
  deleteSysUserSubmodule: `${rbacUrl}deleteSysUserSubmodule`,//删除服务单元关联用户

  // 查询用户
  queryUserList: `${rbacUrl}queryUserList`,//查询用户
  
  // 查询权限
  queryPermList: `${rbacUrl}queryPermList`,//查询权限

  // 页面元素
  querySysPermEle: `${rbacUrl}querySysPermEle`,//查询页面元素
  insertSysPermEle: `${rbacUrl}insertSysPermEle`,//增加页面元素
  editSysPermEle: `${rbacUrl}editSysPermEle`,//编辑页面元素
  deleteSysPermEle: `${rbacUrl}deleteSysPermEle`,//删除页面元素
};

export default url;