import fetch, { $uploadfile } from './../../../../util/fetch'
import downloadfetch from './../../../../util/downloadfetch'
import url from './urlConfig'

// 模块
export function queryModuleListV1(params) { //查询模块列表
  return fetch({
    url: url.queryModuleListV1,
    data: params
  })
}
export function deleteModuleV1(params) { //单个删除模块
  return fetch({
    url: url.deleteModuleV1,
    data: params
  })
}
export function exportModuleTxtV1(params) { //导出模块
  return downloadfetch({
    url: url.exportModuleTxtV1,
    data: params
  })
}
export function queryAllModuleListV1(params) { //查询所有模块
  return fetch({
    url: url.queryAllModuleListV1,
    data: params
  })
}

// ******************************************************************//

// 服务单元
export function querySubModuleListV1(params) { //查询服务单元列表
  return fetch({
    url: url.querySubModuleListV1,
    data: params
  })
}
export function queryAllSubModuleListV1(params) { //查询所有服务单元
  return fetch({
    url: url.queryAllSubModuleListV1,
    data: params
  })
}
export function deleteSubModuleV1(params) { //单个删除服务单元
  return fetch({
    url: url.deleteSubModuleV1,
    data: params
  })
}
export function exportSubModuleTxtV1(params) { //导出服务单元
  return downloadfetch({
    url: url.exportSubModuleTxtV1,
    data: params
  })
}
export function deleteSubModuleConfigBatch(params) { //批量删除服务单元
  return fetch({
    url: url.deleteSubModuleConfigBatch,
    data: params
  })
}

// ******************************************************************//

// 服务
export function queryServiceListV1(params) { //查询服务列表
  return fetch({
    url: url.queryServiceListV1,
    data: params
  })
}
export function deleteServiceV1(params) { //单个删除服务
  return fetch({
    url: url.deleteServiceV1,
    data: params
  })
}
export function exportServiceTxtV1(params) { //导出服务
  return downloadfetch({
    url: url.exportServiceTxtV1,
    data: params
  })
}
export function deleteServiceBatch(params) { //批量删除服务
  return fetch({
    url: url.deleteServiceBatch,
    data: params
  })
}
export function queryServiceCodeList(params) { //查询所有服务
  return fetch({
    url: url.queryServiceCodeList,
    data: params
  })
}
export function queryAllServiceListV1(params) { //查询所有服务
  return fetch({
    url: url.queryAllServiceListV1,
    data: params
  })
}

// ******************************************************************//

// 血缘关系
export function getRelationByParams(params) { //根据查询血缘关系列表
  return fetch({
    url: url.getRelationByParams,
    data: params
  })
}
export function queryRelationshipListByServiceCode(params) { //根据查询血缘关系列表（批量编辑用）
  return fetch({
    url: url.queryRelationshipListByServiceCode,
    data: params
  })
}
export function createServiceRelationship(params) { //批量编辑血缘关系
  return fetch({
    url: url.createServiceRelationship,
    data: params
  })
}
export function queryServiceRelationshipStatistics(params) { //查询血缘关系数量
  return fetch({
    url: url.queryServiceRelationshipStatistics,
    data: params
  })
}
export function exportServiceRelationshipTxtV1(params) { //批量下载血缘关系
  return downloadfetch({
    url: url.exportServiceRelationshipTxtV1,
    data: params
  })
}
export function queryServiceRelationshipStatisticsByDate(params) { //查询血缘关系变更查询
  return fetch({
    url: url.queryServiceRelationshipStatisticsByDate,
    data: params
  })
}
export function exportRelationByParams(params) { //下载血缘关系
  return downloadfetch({
    url: url.exportRelationByParams,
    data: params
  })
}

// ******************************************************************//

// 服务参数
export function queryParameterByServiceCode(params) { //根据查询服务参数列表（批量编辑用）
  return fetch({
    url: url.queryParameterByServiceCode,
    data: params
  })
}
export function createParameter(params) { //批量编辑服务参数
  return fetch({
    url: url.createParameter,
    data: params
  })
}
export function queryServiceParameterStatistics(params) { //查询服务参数数量
  return fetch({
    url: url.queryServiceParameterStatistics,
    data: params
  })
}
// export function exportServiceRelationshipTxtV1(params) { //下载服务参数
//   return downloadfetch({
//     url: url.exportServiceRelationshipTxtV1,
//     data: params
//   })
// }

// ******************************************************************//

// 静态节点
export function queryServerConfigList(params) { //查询静态节点
  return fetch({
    url: url.queryServerConfigList,
    data: params
  })
}
export function deleteServerConfig(params) { //删除静态节点
  return fetch({
    url: url.deleteServerConfig,
    data: params
  })
}
export function exportServerConfigV1(params) { //下载静态节点
  return downloadfetch({
    url: url.exportServerConfigV1,
    data: params
  })
}
export function deleteServerNodeBatch(params) { //批量删除静态节点
  return fetch({
    url: url.deleteServerNodeBatch,
    data: params
  })
}
export function queryServerConfigStatistics(params) { //查询静态节点变更查询
  return fetch({
    url: url.queryServerConfigStatistics,
    data: params
  })
}

// ******************************************************************//

// 集群切换
export function clusterSwitchSubModuleList(params) { //查询集群列表
  return fetch({
    url: url.clusterSwitchSubModuleList,
    data: params
  })
}
export function clusterSwitchSubmit(params) { //切换集群
  return fetch({
    url: url.clusterSwitchSubmit,
    data: params
  })
}
export function clusterSwitchReverse(params) { //切回
  return fetch({
    url: url.clusterSwitchReverse,
    data: params
  })
}

// ******************************************************************//

// ELK统计管理
export function queryLogFullRetrievalByELK(params) { //日志全文检索
  return fetch({
    url: url.queryLogFullRetrievalByELK,
    data: params
  })
}
export function queryRegisterByElk(params) { //注册信息 聚合
  return fetch({
    url: url.queryRegisterByElk,
    data: params
  })
}
export function queryRegisterDetailByElk(params) { //注册信息 列表
  return fetch({
    url: url.queryRegisterDetailByElk,
    data: params
  })
}
export function queryIsolationByElk(params) { //服务故障隔离信息 聚合
  return fetch({
    url: url.queryIsolationByElk,
    data: params
  })
}
export function queryIsolationDetailByElk(params) { //服务故障隔离信息 列表
  return fetch({
    url: url.queryIsolationDetailByElk,
    data: params
  })
}
export function queryServiceRelationshipByElk(params) { //服务血缘关系 聚合
  return fetch({
    url: url.queryServiceRelationshipByElk,
    data: params
  })
}
export function queryServiceRelationshipDetailByElk(params) { //服务血缘关系 列表
  return fetch({
    url: url.queryServiceRelationshipDetailByElk,
    data: params
  })
}
export function queryErrorByElk(params) { //错误统计
  return fetch({
    url: url.queryErrorByElk,
    data: params
  })
}
export function queryServiceSubscribeByElk(params) { //服务订阅 聚合
  return fetch({
    url: url.queryServiceSubscribeByElk,
    data: params
  })
}
export function queryServiceSubscribeDetailByElk(params) { //服务订阅 列表
  return fetch({
    url: url.queryServiceSubscribeDetailByElk,
    data: params
  })
}
