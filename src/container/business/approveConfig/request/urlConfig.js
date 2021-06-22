const baseUrl = "/tesla-gateway-console-app/approve/";

const url = {
  //查询LDC
  queryLDCList: "/tesla-gateway-console-app/sg/queryLdcConfig",
  // 导出审核通过的数据
  exportConfigTxtByType: `${baseUrl}exportConfigTxtByType`,
  // 导出审核通过的数据(兼容旧版)
  exportOldConfigTxtByType: `${baseUrl}exportOldConfigTxtByType`,
  // 模块
  querySgModuleBusinessConfigApproveList: `${baseUrl}querySgModuleBusinessConfigApproveList`, //审核：模块业务数据列表查询功能，详情查询功能
  createSgModuleBusinessConfigApprove: `${baseUrl}createSgModuleBusinessConfigApprove`, //审核：模块务新增业数据功能
  editSgModuleBusinessConfigApprove: `${baseUrl}editSgModuleBusinessConfigApprove`, //审核：模块非业务数据修改功能
  deleteSgModuleBusinessConfigApprove: `${baseUrl}deleteSgModuleBusinessConfigApprove`, //审核：模块业务数据删除修改功能

  // 服务单元
  querySgSubmoduleBusinessConfigApproveList: `${baseUrl}querySgSubmoduleBusinessConfigApproveList`, //审核：服务单元业务数据列表查询功能，详情查询功能
  createSgSubmoduleBusinessConfigApprove: `${baseUrl}createSgSubmoduleBusinessConfigApprove`, //审核：服务单元务新增业数据功能
  editSgSubmoduleBusinessConfigApprove: `${baseUrl}editSgSubmoduleBusinessConfigApprove`, //审核：服务单元非业务数据修改功能
  deleteSgSubmoduleBusinessConfigApprove: `${baseUrl}deleteSgSubmoduleBusinessConfigApprove`, //审核：服务单元业务数据删除修改功能

  // 服务
  querySgServiceApproveList: `${baseUrl}querySgServiceApproveList`, //审核：服务业务数据列表查询功能，详情查询功能
  createSgServiceApproves: `${baseUrl}createSgServiceApproves`, //审核：服务务新增业数据功能
  editSgServiceApproves: `${baseUrl}editSgServiceApproves`, //审核：服务非业务数据修改功能
  deleteSgServiceApproves: `${baseUrl}deleteSgServiceApproves`, //审核：服务业务数据删除修改功能
  
};

export default url;
