import fetch, { $uploadfile } from './../../../../util/fetch';
import $downloadfetchs from '../../../../util/downloadfetch';
import url from './urlConfig'

//查询LDC
export function queryLDCList(params) { //查询LDC
  return fetch({
    url: url.queryLDCList,
    data: params
  })
}
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
export function querySgModuleBusinessConfigApproveList(params) { //审核：模块业务数据列表查询功能，详情查询功能
  return fetch({
    url: url.querySgModuleBusinessConfigApproveList,
    data: params
  })
}
export function createSgModuleBusinessConfigApprove(params) { //审核：模块务新增业数据功能
  return fetch({
    url: url.createSgModuleBusinessConfigApprove,
    data: params
  })
}
export function editSgModuleBusinessConfigApprove(params) { //审核：模块非业务数据修改功能
  return fetch({
    url: url.editSgModuleBusinessConfigApprove,
    data: params
  })
}
export function deleteSgModuleBusinessConfigApprove(params) { //审核：模块业务数据删除修改功能
  return fetch({
    url: url.deleteSgModuleBusinessConfigApprove,
    data: params
  })
}

// 服务单元
export function querySgSubmoduleBusinessConfigApproveList(params) { //审核：服务单元业务数据列表查询功能，详情查询功能
  return fetch({
    url: url.querySgSubmoduleBusinessConfigApproveList,
    data: params
  })
}
export function createSgSubmoduleBusinessConfigApprove(params) { //审核：服务单元务新增业数据功能
  return fetch({
    url: url.createSgSubmoduleBusinessConfigApprove,
    data: params
  })
}
export function editSgSubmoduleBusinessConfigApprove(params) { //审核：服务单元非业务数据修改功能
  return fetch({
    url: url.editSgSubmoduleBusinessConfigApprove,
    data: params
  })
}
export function deleteSgSubmoduleBusinessConfigApprove(params) { //审核：服务单元业务数据删除修改功能
  return fetch({
    url: url.deleteSgSubmoduleBusinessConfigApprove,
    data: params
  })
}

// 服务
export function querySgServiceApproveList(params) { //审核：服务业务数据列表查询功能，详情查询功能
  return fetch({
    url: url.querySgServiceApproveList,
    data: params
  })
}
export function createSgServiceApproves(params) { //审核：服务务新增业数据功能
  return fetch({
    url: url.createSgServiceApproves,
    data: params
  })
}
export function editSgServiceApproves(params) { //审核：服务非业务数据修改功能
  return fetch({
    url: url.editSgServiceApproves,
    data: params
  })
}
export function deleteSgServiceApproves(params) { //审核：服务业务数据删除修改功能
  return fetch({
    url: url.deleteSgServiceApproves,
    data: params
  })
}
