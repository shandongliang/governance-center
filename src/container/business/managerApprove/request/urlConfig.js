const baseUrl = '/tesla-gateway-console-app/approve/';

const url = {
  // 导出审核通过的数据
  exportConfigTxtByType: `${baseUrl}exportConfigTxtByType`,
  // 导出审核通过的数据(兼容旧版)
  exportOldConfigTxtByType: `${baseUrl}exportOldConfigTxtByType`,
  // 模块
  createSgModuleCommonConfigApprove: `${baseUrl}createSgModuleCommonConfigApprove`,//模块非业务新增数据功能
  querySgModuleCommonConfigApproveList: `${baseUrl}querySgModuleCommonConfigApproveList`,//模块非业务数据列表查询功能，详情查询功能
  editSgModuleCommonConfigApprove: `${baseUrl}editSgModuleCommonConfigApprove`,//模块非业务数据修改功能
  deleteSgModuleCommonConfigApprove: `${baseUrl}deleteSgModuleCommonConfigApprove`,//模块非业务数据删除修改功能

  // 服务单元
  querySgSubmoduleCommonConfigApproveList: `${baseUrl}querySgSubmoduleCommonConfigApproveList`,//服务单元非业务数据列表查询功能
  createSgSubmoduleCommonConfigApprove: `${baseUrl}createSgSubmoduleCommonConfigApprove`,//服务单元非业务新增数据功能
  editSgSubmoduleCommonConfigApprove: `${baseUrl}editSgSubmoduleCommonConfigApprove`,//服务单元非业务数据修改功能
  deleteSgSubmoduleCommonConfigApproveList: `${baseUrl}deleteSgSubmoduleCommonConfigApproveList`,//服务单元非业务数据删除服务单元数据功能
  querySgSubmoduleCommonConfigApproveDetail: `${baseUrl}querySgSubmoduleCommonConfigApproveDetail`,//服务单元非业务数据查询详情功能
};

export default url;