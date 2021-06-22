import fetch, { $uploadfile } from './../../../../util/fetch'
import $downloadfetchs from './../../../../util/downloadfetch'
import url from './urlConfig'

// 模块
export function createSgModuleCommonConfig(params) { //模块非业务新增数据功能
  return fetch({
    url: url.createSgModuleCommonConfig,
    data: params
  })
}

export function querySgModuleCommonConfigList(params) { //模块非业务数据列表查询功能，详情查询功能
  return fetch({
    url: url.querySgModuleCommonConfigList,
    data: params
  })
}

export function editSgModuleCommonConfig(params) { //模块非业务数据修改功能
  return fetch({
    url: url.editSgModuleCommonConfig,
    data: params
  })
}

export function deleteSgModuleCommonConfig(params) { //模块非业务数据删除修改功能
  return fetch({
    url: url.deleteSgModuleCommonConfig,
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

export function createSgSubmoduleCommonConfig(params) { //服务单元非业务新增数据功能
  return fetch({
    url: url.createSgSubmoduleCommonConfig,
    data: params
  })
}

export function editSgSubmoduleCommonConfig(params) { //服务单元非业务数据修改功能
  return fetch({
    url: url.editSgSubmoduleCommonConfig,
    data: params
  })
}

export function deleteSgSubmoduleCommonConfig(params) { //服务单元非业务数据删除服务单元数据功能
  return fetch({
    url: url.deleteSgSubmoduleCommonConfig,
    data: params
  })
}

export function querySgSubmoduleCommonConfigDetail(params) { //服务单元非业务数据查询详情功能
  return fetch({
    url: url.querySgSubmoduleCommonConfigDetail,
    data: params
  })
}