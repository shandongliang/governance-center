import fetch, { $uploadfile } from './../../../../util/fetch'
import downloadfetch from './../../../../util/downloadfetch'
import url from './urlConfig'

//查询LDC
export function queryLDCList(params) { //查询LDC
  return fetch({
    url: url.queryLDCList,
    data: params
  })
}
// 模块
export function querySgModuleBusinessConfigList(params) { //治理：模块业务数据列表查询功能，详情查询功能
  return fetch({
    url: url.querySgModuleBusinessConfigList,
    data: params
  })
}
export function createSgModuleBusinessConfig(params) { //治理：模块业务新增数据功能
  return fetch({
    url: url.createSgModuleBusinessConfig,
    data: params
  })
}
export function editSgModuleBusinessConfig(params) { //治理：模块业务修改数据功能
  return fetch({
    url: url.editSgModuleBusinessConfig,
    data: params
  })
}
export function deleteSgModuleBusinessConfig(params) { //治理：模块业务删除数据功能
  return fetch({
    url: url.deleteSgModuleBusinessConfig,
    data: params
  })
}

// 服务单元
export function querySgSubmoduleBusinessConfigList(params) { //审核：服务单元业务数据列表查询功能，详情查询功能
  return fetch({
    url: url.querySgSubmoduleBusinessConfigList,
    data: params
  })
}
export function createSgSubmoduleBusinessConfig(params) { //治理：服务单元非业务数据新增功能
  return fetch({
    url: url.createSgSubmoduleBusinessConfig,
    data: params
  })
}
export function editSgSubmoduleBusinessConfig(params) { //治理：服务单元业务修改数据功能
  return fetch({
    url: url.editSgSubmoduleBusinessConfig,
    data: params
  })
}
export function deleteSgSubmoduleBusinessConfig(params) { //治理：服务单元业务删除数据功能
  return fetch({
    url: url.deleteSgSubmoduleBusinessConfig,
    data: params
  })
}

// 服务
export function querySgServiceList(params) { //治理：服务业务数据列表查询功能，详情查询功能
  return fetch({
    url: url.querySgServiceList,
    data: params
  })
}
export function createSgServices(params) { //治理：服务非业务数据新增功能
  return fetch({
    url: url.createSgServices,
    data: params
  })
}
export function editSgServices(params) { //治理：服务业务修改数据功能
  return fetch({
    url: url.editSgServices,
    data: params
  })
}
export function deleteSgServices(params) { //治理：服务业务删除数据功能
  return fetch({
    url: url.deleteSgServices,
    data: params
  })
}
export function provideSgService(params) { //服务发布(静态/动态)
  return fetch({
    url: url.provideSgService,
    data: params
  })
}
export function consumeSgService(params) { //服务订阅	
  return fetch({
    url: url.consumeSgService,
    data: params
  })
}
export function querySgServiceProvider(params) { //查看服务发布(静态/动态)
  return fetch({
    url: url.querySgServiceProvider,
    data: params
  })
}
export function querySgServiceConsumer(params) { //治理：查看服务订阅	
  return fetch({
    url: url.querySgServiceConsumer,
    data: params
  })
}
export function querySgServiceStatus(params) { //服务状态
  return fetch({
    url: url.querySgServiceStatus,
    data: params
  })
}

// 注册节点
export function createServerConfigList(params) { //创建注册节点
  return fetch({
    url: url.createServerConfigList,
    data: params
  })
}

// 批量下载
export function exportZkData(params) { //批量下载
  return downloadfetch({
    url: url.exportZkData,
    data: params
  })
}

// 查询所有模块和服务单元
export function querySgModuleCodeAndServiceUnitCodeList(params) { //查询所有模块和服务单元
  return fetch({
    url: url.querySgModuleCodeAndServiceUnitCodeList,
    data: params
  })
}
