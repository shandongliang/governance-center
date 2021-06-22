import fetch, { $uploadfile } from './../../../../util/fetch'
import { $downloadfetchs } from './../../../../util/downloadfetch'
import url from './urlConfig'

// 模块
export function querySgModuleConfigApproveList(params) { //查询模块
  return fetch({
    url: url.querySgModuleConfigApproveList,
    data: params
  })
}
export function exportModuleConfig(params) { //批量导出模块
  return $downloadfiles({
    url: url.exportModuleConfig,
    data: params
  })
}
export function deleteSgModuleConfigApproveList(params) { //批量删除模块
  return fetch({
    url: url.deleteSgModuleConfigApproveList,
    data: params
  })
}
export function downloadModuleExcelTemplate(params) { //下载模块模版
  return $downloadfiles({
    url: url.downloadModuleExcelTemplate,
    data: params
  })
}
export function importModuleExcel(params) { //导入模块
  return $uploadfile({
    url: url.importModuleExcel,
    data: params
  })
}
export function editSgModuleConfigApprove(params) { //审核、编辑模块
  return fetch({
    url: url.editSgModuleConfigApprove,
    data: params
  })
}
export function querySgModuleConfigApproveDetail(params) { //模块详情
  return fetch({
    url: url.querySgModuleConfigApproveDetail,
    data: params
  })
}
export function queryAllModuleName(params) { //查询所有模块和服务单元
  return fetch({
    url: url.queryAllModuleName,
    data: params
  })
}
export function selectLdc(params) { //查询ldc
  return fetch({
    url: url.selectLdc,
    data: params
  })
}
export function downloadModuleSimplifyExcelTemplate(params) { //下载模块简易模版
  return $downloadfiles({
    url: url.downloadModuleSimplifyExcelTemplate,
    data: params
  })
}
export function createSgModuleConfigApprove(params) { //创建模块
  return fetch({
    url: url.createSgModuleConfigApprove,
    data: params
  })
}
export function queryModuleChangeHistory(params) { //查询模块历史版本
  return fetch({
    url: url.queryModuleChangeHistory,
    data: params
  })
}

// ******************************************************************//

// 服务单元
export function querySgSubmoduleConfigApproveList(params) { //查询服务单元
  return fetch({
    url: url.querySgSubmoduleConfigApproveList,
    data: params
  })
}
export function exportSubModuleConfig(params) { //批量导出服务单元
  return $downloadfiles({
    url: url.exportSubModuleConfig,
    data: params
  })
}
export function deleteSgSubmoduleConfigApproveList(params) { //批量删除服务单元
  return fetch({
    url: url.deleteSgSubmoduleConfigApproveList,
    data: params
  })
}
export function downloadSubmoduleExcelTemplate(params) { //下载服务单元模版
  return $downloadfiles({
    url: url.downloadSubmoduleExcelTemplate,
    data: params
  })
}
export function importSubmoduleConfigExcel(params) { //导入服务单元
  return $uploadfile({
    url: url.importSubmoduleConfigExcel,
    data: params
  })
}
export function editSgSubmoduleConfigApprove(params) { //审核、编辑服务单元
  return fetch({
    url: url.editSgSubmoduleConfigApprove,
    data: params
  })
}
export function querySgSubmoduleConfigApproveDetail(params) { //服务参数详情
  return fetch({
    url: url.querySgSubmoduleConfigApproveDetail,
    data: params
  })
}
export function downloadSubmoduleSimplifyExcelTemplate(params) { //下载服务单元简易模版
  return $downloadfiles({
    url: url.downloadSubmoduleSimplifyExcelTemplate,
    data: params
  })
}
export function createSgSubmoduleConfigApprove(params) { //创建服务单元
  return fetch({
    url: url.createSgSubmoduleConfigApprove,
    data: params
  })
}
export function querySubmoduleChangeHistory(params) { //查询服务单元历史版本
  return fetch({
    url: url.querySubmoduleChangeHistory,
    data: params
  })
}

// ******************************************************************//

// 服务
export function querySgServiceConfigApproveList(params) { //查询服务
  return fetch({
    url: url.querySgServiceConfigApproveList,
    data: params
  })
}
export function exportServiceExcel(params) { //批量导出服务
  return $downloadfiles({
    url: url.exportServiceExcel,
    data: params
  })
}
export function deleteSgServiceConfigApproveList(params) { //批量删除服务
  return fetch({
    url: url.deleteSgServiceConfigApproveList,
    data: params
  })
}
export function downloadServiceExcelTemplate(params) { //下载服务模版
  return $downloadfiles({
    url: url.downloadServiceExcelTemplate,
    data: params
  })
}
export function importServiceExcel(params) { //导入服务
  return $uploadfile({
    url: url.importServiceExcel,
    data: params
  })
}
export function editSgServiceConfigApprove(params) { //审核、编辑服务
  return fetch({
    url: url.editSgServiceConfigApprove,
    data: params
  })
}
export function querySgServiceConfigApproveDetail(params) { //服务参数详情
  return fetch({
    url: url.querySgServiceConfigApproveDetail,
    data: params
  })
}
export function downloadServiceSimplifyExcelTemplate(params) { //下载服务简易模版
  return $downloadfiles({
    url: url.downloadServiceSimplifyExcelTemplate,
    data: params
  })
}
export function createSgServiceConfigApprove(params) { //创建服务
  return fetch({
    url: url.createSgServiceConfigApprove,
    data: params
  })
}
export function queryServiceHistory(params) { //查询服务历史版本
  return fetch({
    url: url.queryServiceHistory,
    data: params
  })
}

// ******************************************************************//

// 血缘关系
export function querySgServiceRelationshipApproveList(params) { //查询血缘关系
  return fetch({
    url: url.querySgServiceRelationshipApproveList,
    data: params
  })
}
export function exportServiceRelationshipExcel(params) { //批量导出血缘关系
  return $downloadfiles({
    url: url.exportServiceRelationshipExcel,
    data: params
  })
}
export function deleteSgServiceRelationshipApproveList(params) { //批量删除血缘关系
  return fetch({
    url: url.deleteSgServiceRelationshipApproveList,
    data: params
  })
}
export function downloadServiceRelationshipExcelTemplate(params) { //下载血缘关系模版
  return $downloadfiles({
    url: url.downloadServiceRelationshipExcelTemplate,
    data: params
  })
}
export function importServiceRelationshipExcel(params) { //导入血缘关系
  return $uploadfile({
    url: url.importServiceRelationshipExcel,
    data: params
  })
}
export function editSgServiceRelationshipApprove(params) { //审核、编辑血缘关系
  return fetch({
    url: url.editSgServiceRelationshipApprove,
    data: params
  })
}
export function querySgServiceRelationshipApproveDetail(params) { //血缘关系详情
  return fetch({
    url: url.querySgServiceRelationshipApproveDetail,
    data: params
  })
}
export function querySgServiceRelationshipApprovalList(params) { //血缘关系审批列表
  return fetch({
    url: url.querySgServiceRelationshipApprovalList,
    data: params
  })
}
export function createServiceRelationshipApprove(params) { //创建血缘关系
  return fetch({
    url: url.createServiceRelationshipApprove,
    data: params
  })
}

// ******************************************************************//

// 服务参数
export function querySgServiceParameterApproveList(params) { //查询服务参数
  return fetch({
    url: url.querySgServiceParameterApproveList,
    data: params
  })
}
export function exportParameterExcel(params) { //批量导出服务参数
  return $downloadfiles({
    url: url.exportParameterExcel,
    data: params
  })
}
export function deleteSgServiceParameterApproveList(params) { //批量删除服务参数
  return fetch({
    url: url.deleteSgServiceParameterApproveList,
    data: params
  })
}
export function downloadServiceParameterExcelTemplate(params) { //下载服务参数模版
  return $downloadfiles({
    url: url.downloadServiceParameterExcelTemplate,
    data: params
  })
}
export function importServiceParameterExcel(params) { //导入服务参数
  return $uploadfile({
    url: url.importServiceParameterExcel,
    data: params
  })
}
export function editSgServiceParameterApprove(params) { //审核、编辑服务参数
  return fetch({
    url: url.editSgServiceParameterApprove,
    data: params
  })
}
export function querySgServiceParameterApproveDetail(params) { //服务参数详情
  return fetch({
    url: url.querySgServiceParameterApproveDetail,
    data: params
  })
}
export function importServiceParameterCoreSystemExcel(params) { //core数据导入
  return $uploadfile({
    url: url.importServiceParameterCoreSystemExcel,
    data: params
  })
}

// ******************************************************************//

// 数据字典
export function queryDictionaryConfigApproveList(params) { //查询数据字典
  return fetch({
    url: url.queryDictionaryConfigApproveList,
    data: params
  })
}
export function exportSGDictionaryConfig(params) { //批量导出数据字典
  return $downloadfiles({
    url: url.exportSGDictionaryConfig,
    data: params
  })
}
export function deleteSgDictionaryApproveList(params) { //批量删除数据字典
  return fetch({
    url: url.deleteSgDictionaryApproveList,
    data: params
  })
}
export function downloadDictionaryExcelTemplate(params) { //下载数据字典模版
  return $downloadfiles({
    url: url.downloadDictionaryExcelTemplate,
    data: params
  })
}
export function importDictionaryExcel(params) { //导入数据字典
  return $uploadfile({
    url: url.importDictionaryExcel,
    data: params
  })
}
export function editSGDictionaryConfigApprove(params) { //审核、编辑数据字典
  return fetch({
    url: url.editSGDictionaryConfigApprove,
    data: params
  })
}
export function querySgDictionaryApproveDetail(params) { //数据字典详情
  return fetch({
    url: url.querySgDictionaryApproveDetail,
    data: params
  })
}

// ******************************************************************//

// 错误码
export function querySgServiceErrorCodeList(params) { //查询错误码清单
  return fetch({
    url: url.querySgServiceErrorCodeList,
    data: params
  })
}
export function querySgServiceErrorCodeDetail(params) { //查询错误码详情
  return fetch({
    url: url.querySgServiceErrorCodeDetail,
    data: params
  })
}
export function createSgServiceErrorCode(params) { //创建错误码
  return fetch({
    url: url.createSgServiceErrorCode,
    data: params
  })
}
export function editSgServiceErrorCode(params) { //编辑错误码详情
  return fetch({
    url: url.editSgServiceErrorCode,
    data: params
  })
}
export function deleteSgServiceErrorCode(params) { //删除错误码详情
  return fetch({
    url: url.deleteSgServiceErrorCode,
    data: params
  })
}
export function importErrorCodeExcel(params) { //错误码导入
  return $uploadfile({
    url: url.importErrorCodeExcel,
    data: params
  })
}
export function downloadErrorCodeExcelTemplate(params) { //下载错误码模版
  return $downloadfiles({
    url: url.downloadErrorCodeExcelTemplate,
    data: params
  })
}
export function querySgErrorCodeServiceRelationList(params) { //查询错误码与服务关联关系
  return fetch({
    url: url.querySgErrorCodeServiceRelationList,
    data: params
  })
}
export function querySgErrorCodeServiceRelationDetail(params) { //查询错误码与服务关联关系详情
  return fetch({
    url: url.querySgErrorCodeServiceRelationDetail,
    data: params
  })
}
export function createSgErrorCodeServiceRelation(params) { //创建错误码与服务关联关系
  return fetch({
    url: url.createSgErrorCodeServiceRelation,
    data: params
  })
}
export function editSgErrorCodeServiceRelation(params) { //编辑错误码与服务关联关系
  return fetch({
    url: url.editSgErrorCodeServiceRelation,
    data: params
  })
}
export function deleteSgErrorCodeServiceRelation(params) { //删除错误码与服务关联关系
  return fetch({
    url: url.deleteSgErrorCodeServiceRelation,
    data: params
  })
}
export function importErrorCodeServiceRelationExcel(params) { //错误码与服务关联关系导入
  return $uploadfile({
    url: url.importErrorCodeServiceRelationExcel,
    data: params
  })
}
export function downloadErrorCodeServiceRelationExcelTemplate(params) { //下载错误码模版
  return $downloadfiles({
    url: url.downloadErrorCodeServiceRelationExcelTemplate,
    data: params
  })
}

// ******************************************************************//

// 结构体
export function queryStructureBodyApproveList(params) { //查询结构体
  return fetch({
    url: url.queryStructureBodyApproveList,
    data: params
  })
}
export function exportStructureBodyConfig(params) { //批量导出结构体
  return $downloadfiles({
    url: url.exportStructureBodyConfig,
    data: params
  })
}
export function deleteStructureBodyApproveList(params) { //批量删除结构体
  return fetch({
    url: url.deleteStructureBodyApproveList,
    data: params
  })
}
export function downloadStructureBodyExcelTemplate(params) { //下载结构体模版
  return $downloadfiles({
    url: url.downloadStructureBodyExcelTemplate,
    data: params
  })
}
export function importStructureBodyExcel(params) { //导入结构体
  return $uploadfile({
    url: url.importStructureBodyExcel,
    data: params
  })
}
export function editStructureBodyConfigApprove(params) { //审核、编辑结构体
  return fetch({
    url: url.editStructureBodyConfigApprove,
    data: params
  })
}
export function queryStructureBodyApproveDetail(params) { //结构体详情
  return fetch({
    url: url.queryStructureBodyApproveDetail,
    data: params
  })
}

// ******************************************************************//

// 注册节点
export function queryRegisterNodeList(params) { //查询注册节点
  return fetch({
    url: url.queryRegisterNodeList,
    data: params
  })
}
export function exportRegisterNode(params) { //批量导出注册节点
  return $downloadfiles({
    url: url.exportRegisterNode,
    data: params
  })
}
export function deleteRegisterNode(params) { //批量删除注册节点
  return fetch({
    url: url.deleteRegisterNode,
    data: params
  })
}
export function downloadRegisterNodeExcelTemplate(params) { //下载注册节点模版
  return $downloadfiles({
    url: url.downloadRegisterNodeExcelTemplate,
    data: params
  })
}
export function importRegisterNodeExcel(params) { //导入注册节点
  return $uploadfile({
    url: url.importRegisterNodeExcel,
    data: params
  })
}
export function updateRegisterNode(params) { //审核、编辑注册节点
  return fetch({
    url: url.updateRegisterNode,
    data: params
  })
}
export function queryRegisterNodeDetail(params) { //注册节点详情
  return fetch({
    url: url.queryRegisterNodeDetail,
    data: params
  })
}
export function createRegisterNodeList(params) { //创建注册节点
  return fetch({
    url: url.createRegisterNodeList,
    data: params
  })
}

// ******************************************************************//

// 服务清单
export function queryServiceList(params) { //查询服务清单
  return fetch({
    url: url.queryServiceList,
    data: params
  })
}

// ******************************************************************//

// 联系人
export function querySgMailContactApproveList(params) { //查询联系人
  return fetch({
    url: url.querySgMailContactApproveList,
    data: params
  })
}
export function editSgMailContactApprove(params) { //编辑联系人
  return fetch({
    url: url.editSgMailContactApprove,
    data: params
  })
}

// ******************************************************************//

// 统计信息
export function querySgModuleConfigList(params) { //查询模块和服务单元统计信息
  return fetch({
    url: url.querySgModuleConfigList,
    data: params
  })
}
