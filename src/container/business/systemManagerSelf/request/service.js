import fetch, { $uploadfile } from './../../../../util/fetch'
import $downloadfetchs from './../../../../util/downloadfetch'
import url from './urlConfig'

// 模块
export function querySgModuleCommonConfigList(params) { //模块非业务数据列表查询功能，详情查询功能
  return fetch({
    url: url.querySgModuleCommonConfigList,
    data: params
  })
}

// 服务单元
export function querySgSubmoduleCommonConfigList(params) { //服务单元非业务新增数据功能
  return fetch({
    url: url.querySgSubmoduleCommonConfigList,
    data: params
  })
}

// 模块关联用户
export function addSysUserModule(params) { //模块关联用户
  return fetch({
    url: url.addSysUserModule,
    data: params
  })
}

export function querySysUserModule(params) { //查询模块关联用户
  return fetch({
    url: url.querySysUserModule,
    data: params
  })
}

export function editSysUserModule(params) { //编辑模块关联用户
  return fetch({
    url: url.editSysUserModule,
    data: params
  })
}

export function deleteSysUserModule(params) { //删除模块关联用户
  return fetch({
    url: url.deleteSysUserModule,
    data: params
  })
}

// 服务单元关联用户
export function addSysUserSubmodule(params) { //服务单元关联用户
  return fetch({
    url: url.addSysUserSubmodule,
    data: params
  })
}

export function querySysUserSubmodule(params) { //查询服务单元关联用户
  return fetch({
    url: url.querySysUserSubmodule,
    data: params
  })
}

export function editSysUserSubmodule(params) { //编辑服务单元关联用户
  return fetch({
    url: url.editSysUserSubmodule,
    data: params
  })
}

export function deleteSysUserSubmodule(params) { //删除服务单元关联用户
  return fetch({
    url: url.deleteSysUserSubmodule,
    data: params
  })
}

// 查询所有用户
export function queryUserList(params) { //查询所有用户
  return fetch({
    url: url.queryUserList,
    data: params
  })
}

// 查询权限
export function queryPermList(params) { //查询权限
  return fetch({
    url: url.queryPermList,
    data: params
  })
}

// 页面元素
export function querySysPermEle(params) { //查询页面元素
  return fetch({
    url: url.querySysPermEle,
    data: params
  })
}

export function insertSysPermEle(params) { //增加页面元素
  return fetch({
    url: url.insertSysPermEle,
    data: params
  })
}

export function editSysPermEle(params) { //编辑页面元素
  return fetch({
    url: url.editSysPermEle,
    data: params
  })
}

export function deleteSysPermEle(params) { //删除页面元素
  return fetch({
    url: url.deleteSysPermEle,
    data: params
  })
}