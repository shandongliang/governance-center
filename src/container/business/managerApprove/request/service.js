import fetch, { $uploadfile } from './../../../../util/fetch';
import $downloadfetchs from './../../../../util/downloadfetch';
import url from './urlConfig'

//导出审核通过的数据
export function exportConfigTxtByType(params) { //导出审核通过的数据
  return $downloadfetchs({
    url: url.exportConfigTxtByType,
    data: params
  })
}
//导出审核通过的数据(兼容旧版)
export function exportOldConfigTxtByType(params) { //导出审核通过的数据(兼容旧版)
  return $downloadfetchs({
    url: url.exportOldConfigTxtByType,
    data: params
  })
}
// 模块
export function createSgModuleCommonConfigApprove(params) { //模块非业务新增数据功能
  return fetch({
    url: url.createSgModuleCommonConfigApprove,
    data: params
  })
}

export function querySgModuleCommonConfigApproveList(params) { //模块非业务数据列表查询功能，详情查询功能
  return fetch({
    url: url.querySgModuleCommonConfigApproveList,
    data: params
  })
}

export function editSgModuleCommonConfigApprove(params) { //模块非业务数据修改功能
  return fetch({
    url: url.editSgModuleCommonConfigApprove,
    data: params
  })
}

export function deleteSgModuleCommonConfigApprove(params) { //模块非业务数据删除修改功能
  return fetch({
    url: url.deleteSgModuleCommonConfigApprove,
    data: params
  })
}

// 服务单元
export function querySgSubmoduleCommonConfigApproveList(params) { //服务单元非业务新增数据功能
  return fetch({
    url: url.querySgSubmoduleCommonConfigApproveList,
    data: params
  })
}

export function createSgSubmoduleCommonConfigApprove(params) { //服务单元非业务新增数据功能
  return fetch({
    url: url.createSgSubmoduleCommonConfigApprove,
    data: params
  })
}

export function editSgSubmoduleCommonConfigApprove(params) { //服务单元非业务数据修改功能
  return fetch({
    url: url.editSgSubmoduleCommonConfigApprove,
    data: params
  })
}

export function deleteSgSubmoduleCommonConfigApproveList(params) { //服务单元非业务数据删除服务单元数据功能
  return fetch({
    url: url.deleteSgSubmoduleCommonConfigApproveList,
    data: params
  })
}

export function querySgSubmoduleCommonConfigApproveDetail(params) { //服务单元非业务数据查询详情功能
  return fetch({
    url: url.querySgSubmoduleCommonConfigApproveDetail,
    data: params
  })
}