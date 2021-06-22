const baseUrl = "/tesla-approve-console-app/gateway/";

const url = {
  // 模块
  querySgModuleConfigApproveList: `${baseUrl}querySgModuleConfigApproveList`, //查询模块
  exportModuleConfig: `${baseUrl}exportModuleConfig`, //批量导出模块
  deleteSgModuleConfigApproveList: `${baseUrl}deleteSgModuleConfigApproveList`, //批量删除模块
  downloadModuleExcelTemplate: `${baseUrl}downloadModuleExcelTemplate`, //下载模块模版
  importModuleExcel: `${baseUrl}importModuleExcel`, //导入模块
  editSgModuleConfigApprove: `${baseUrl}editSgModuleConfigApprove`, //审核、编辑模块
  querySgModuleConfigApproveDetail: `${baseUrl}querySgModuleConfigApproveDetail`, //服务参数详情
  queryAllModuleName: `${baseUrl}queryAllModuleName`, //查询所有模块和服务单元
  selectLdc: `${baseUrl}selectLdc`, //查询ldc
  downloadModuleSimplifyExcelTemplate: `${baseUrl}downloadModuleSimplifyExcelTemplate`, //下载模块简易模板
  createSgModuleConfigApprove: `${baseUrl}createSgModuleConfigApprove`, //创建模块
  queryModuleChangeHistory: `${baseUrl}queryModuleChangeHistory`, //查询模块历史版本
  // 服务单元
  querySgSubmoduleConfigApproveList: `${baseUrl}querySgSubmoduleConfigApproveList`, //查询服务单元
  exportSubModuleConfig: `${baseUrl}exportSubModuleConfig`, //批量导出服务单元
  deleteSgSubmoduleConfigApproveList: `${baseUrl}deleteSgSubmoduleConfigApproveList`, //批量删除服务单元
  downloadSubmoduleExcelTemplate: `${baseUrl}downloadSubmoduleExcelTemplate`, //下载服务单元模版
  importSubmoduleConfigExcel: `${baseUrl}importSubmoduleConfigExcel`, //导入服务单元
  editSgSubmoduleConfigApprove: `${baseUrl}editSgSubmoduleConfigApprove`, //审核、编辑服务单元
  querySgSubmoduleConfigApproveDetail: `${baseUrl}querySgSubmoduleConfigApproveDetail`, //服务参数详情
  downloadSubmoduleSimplifyExcelTemplate: `${baseUrl}downloadSubmoduleSimplifyExcelTemplate`, //下载服务单元简易模板
  createSgSubmoduleConfigApprove: `${baseUrl}createSgSubmoduleConfigApprove`, //创建服务单元
  querySubmoduleChangeHistory: `${baseUrl}querySubmoduleChangeHistory`, //查询服务单元历史版本
  // 服务
  querySgServiceConfigApproveList: `${baseUrl}querySgServiceConfigApproveList`, //查询服务
  exportServiceExcel: `${baseUrl}exportServiceExcel`, //批量导出服务
  deleteSgServiceConfigApproveList: `${baseUrl}deleteSgServiceConfigApproveList`, //批量删除服务
  downloadServiceExcelTemplate: `${baseUrl}downloadServiceExcelTemplate`, //下载服务模版
  importServiceExcel: `${baseUrl}importServiceExcel`, //导入服务
  editSgServiceConfigApprove: `${baseUrl}editSgServiceConfigApprove`, //审核、编辑服务
  querySgServiceConfigApproveDetail: `${baseUrl}querySgServiceConfigApproveDetail`, //服务参数详情
  downloadServiceSimplifyExcelTemplate: `${baseUrl}downloadServiceSimplifyExcelTemplate`, //下载服务简易模板
  createSgServiceConfigApprove: `${baseUrl}createSgServiceConfigApprove`, //创建服务
  queryServiceHistory: `${baseUrl}queryServiceHistory`, //查询服务历史版本
  // 血缘关系
  querySgServiceRelationshipApproveList: `${baseUrl}querySgServiceRelationshipApproveList`, //查询血缘关系
  exportServiceRelationshipExcel: `${baseUrl}exportServiceRelationshipExcel`, //批量导出血缘关系
  deleteSgServiceRelationshipApproveList: `${baseUrl}deleteSgServiceRelationshipApproveList`, //批量删除血缘关系
  downloadServiceRelationshipExcelTemplate: `${baseUrl}downloadServiceRelationshipExcelTemplate`, //下载血缘关系模版
  importServiceRelationshipExcel: `${baseUrl}importServiceRelationshipExcel`, //导入血缘关系
  editSgServiceRelationshipApprove: `${baseUrl}editSgServiceRelationshipApprove`, //审核、编辑血缘关系
  querySgServiceRelationshipApproveDetail: `${baseUrl}querySgServiceRelationshipApproveDetail`, //血缘关系详情
  querySgServiceRelationshipApprovalList: `${baseUrl}querySgServiceRelationshipApprovalList`, //血缘关系审批列表
  createServiceRelationshipApprove: `${baseUrl}createServiceRelationshipApprove`, //创建血缘关系
  
  // 服务参数
  querySgServiceParameterApproveList: `${baseUrl}querySgServiceParameterApproveList`, //查询服务参数
  exportParameterExcel: `${baseUrl}exportParameterExcel`, //批量导出服务参数
  deleteSgServiceParameterApproveList: `${baseUrl}deleteSgServiceParameterApproveList`, //批量删除服务参数
  downloadServiceParameterExcelTemplate: `${baseUrl}downloadServiceParameterExcelTemplate`, //下载服务参数模版
  importServiceParameterExcel: `${baseUrl}importServiceParameterExcel`, //导入服务参数
  editSgServiceParameterApprove: `${baseUrl}editSgServiceParameterApprove`, //审核、编辑服务参数
  querySgServiceParameterApproveDetail: `${baseUrl}querySgServiceParameterApproveDetail`, //服务参数详情
  importServiceParameterCoreSystemExcel: `${baseUrl}importServiceParameterCoreSystemExcel`, //core数据导入
  // 数据字典
  queryDictionaryConfigApproveList: `${baseUrl}queryDictionaryConfigApproveList`, //查询数据字典
  exportSGDictionaryConfig: `${baseUrl}exportSGDictionaryConfig`, //批量导出数据字典
  deleteSgDictionaryApproveList: `${baseUrl}deleteSgDictionaryApproveList`, //批量删除数据字典
  downloadDictionaryExcelTemplate: `${baseUrl}downloadDictionaryExcelTemplate`, //下载数据字典模版
  importDictionaryExcel: `${baseUrl}importDictionaryExcel`, //导入数据字典
  editSGDictionaryConfigApprove: `${baseUrl}editSGDictionaryConfigApprove`, //审核、编辑数据字典
  querySgDictionaryApproveDetail: `${baseUrl}querySgDictionaryApproveDetail`, //数据字典详情
  // 错误码
  querySgServiceErrorCodeList: `${baseUrl}querySgServiceErrorCodeList`, //查询错误码清单
  querySgServiceErrorCodeDetail: `${baseUrl}querySgServiceErrorCodeDetail`, //查询错误码详情
  createSgServiceErrorCode: `${baseUrl}createSgServiceErrorCode`, //创建错误码
  editSgServiceErrorCode: `${baseUrl}editSgServiceErrorCode`, //编辑错误码
  deleteSgServiceErrorCode: `${baseUrl}deleteSgServiceErrorCode`, //删除错误码
  importErrorCodeExcel: `${baseUrl}importErrorCodeExcel`, //导入错误码
  downloadErrorCodeExcelTemplate: `${baseUrl}downloadErrorCodeExcelTemplate`, //下载错误码导入模版
  querySgErrorCodeServiceRelationList: `${baseUrl}querySgErrorCodeServiceRelationList`, //查询错误码与服务关联关系
  querySgErrorCodeServiceRelationDetail: `${baseUrl}querySgErrorCodeServiceRelationDetail`, //查询错误码与服务关联关系详情
  createSgErrorCodeServiceRelation: `${baseUrl}createSgErrorCodeServiceRelation`, //创建错误码与服务关联关系
  editSgErrorCodeServiceRelation: `${baseUrl}editSgErrorCodeServiceRelation`, //编辑错误码与服务关联关系
  deleteSgErrorCodeServiceRelation: `${baseUrl}deleteSgErrorCodeServiceRelation`, //删除错误码与服务关联关系
  importErrorCodeServiceRelationExcel: `${baseUrl}importErrorCodeServiceRelationExcel`, //导入错误码与服务关联关系
  downloadErrorCodeServiceRelationExcelTemplate: `${baseUrl}downloadErrorCodeServiceRelationExcelTemplate`, //下载关联关系导入模版
  // 结构体
  queryStructureBodyApproveList: `${baseUrl}queryStructureBodyApproveList`, //查询结构体
  exportStructureBodyConfig: `${baseUrl}exportStructureBodyConfig`, //批量导出结构体
  deleteStructureBodyApproveList: `${baseUrl}deleteStructureBodyApproveList`, //批量删除结构体
  downloadStructureBodyExcelTemplate: `${baseUrl}downloadStructureBodyExcelTemplate`, //下载结构体模版
  importStructureBodyExcel: `${baseUrl}importStructureBodyExcel`, //导入结构体
  editStructureBodyConfigApprove: `${baseUrl}editStructureBodyConfigApprove`, //审核、编辑结构体
  queryStructureBodyApproveDetail: `${baseUrl}queryStructureBodyApproveDetail`, //结构体详情
  // 注册节点
  queryRegisterNodeList: `${baseUrl}queryRegisterNodeList`, //查询注册节点
  exportRegisterNode: `${baseUrl}exportRegisterNode`, //批量导出注册节点
  deleteRegisterNode: `${baseUrl}deleteRegisterNode`, //批量删除注册节点
  downloadRegisterNodeExcelTemplate: `${baseUrl}downloadRegisterNodeExcelTemplate`, //下载注册节点模版
  importRegisterNodeExcel: `${baseUrl}importRegisterNodeExcel`, //导入注册节点
  updateRegisterNode: `${baseUrl}updateRegisterNode`, //审核、编辑注册节点
  queryRegisterNodeDetail: `${baseUrl}queryRegisterNodeDetail`, //注册节点详情
  createRegisterNodeList: `${baseUrl}createRegisterNodeList`, //创建注册节点
  //服务清单
  queryServiceList: `${baseUrl}queryServiceList`, //查询服务清单
  // 联系人
  querySgMailContactApproveList: `${baseUrl}querySgMailContactApproveList`, //查询联系人
  editSgMailContactApprove: `${baseUrl}editSgMailContactApprove`, //编辑联系人
  // 统计信息
  querySgModuleConfigList: `${baseUrl}querySgModuleConfigList`, //查询模块和服务单元统计信息
};

export default url;
