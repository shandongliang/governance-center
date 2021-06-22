import fetch, { $uploadfile } from '../../../../util/fetch'
import downloadfetch from '../../../../util/downloadfetch'
import url from './urlConfig'

// 批量下载
export function exportZkData(params) { //批量下载
  return downloadfetch({
    url: url.exportZkData,
    data: params
  })
}
export function queryExpoetZkData(params) { //查询数据
  return fetch({
    url: url.queryExpoetZkData,
    data: params
  })
}

export function importCompressedFile(params) { //查询数据
  return $uploadfile({
    url: url.importCompressedFile,
    data: params
  })
}

//服务治理数据下载
export function querySgServiceList(params) { //服务数据查询
  return fetch({
    url: url.querySgServiceList,
    data: params
  })
}
export function queryServiceUnitListByConfig(params) { //根据服务数据查服务单元
  return fetch({
    url: url.queryServiceUnitListByConfig,
    data: params
  })
}
export function queryModuleListByConfig(params) { //根据服务数据查模块
  return fetch({
    url: url.queryModuleListByConfig,
    data: params
  })
}
export function exportCompressedFile(params) { //服务治理数据下载
  return downloadfetch({
    url: url.exportCompressedFile,
    data: params
  })
}

//事件驱动数据下载
export function queryEdaTopicRelationList(params) { //关联关系数据查询
  return fetch({
    url: url.queryEdaTopicRelationList,
    data: params
  })
}
export function queryEDAServiceUnitListByConfig(params) { //根据关联关系数据查服务单元
  return fetch({
    url: url.queryEDAServiceUnitListByConfig,
    data: params
  })
}
export function queryEDAModuleListByConfig(params) { //根据关联关系数据查模块
  return fetch({
    url: url.queryEDAModuleListByConfig,
    data: params
  })
}
export function exportEDACompressedFile(params) { //事件驱动数据下载
  return downloadfetch({
    url: url.exportEDACompressedFile,
    data: params
  })
}