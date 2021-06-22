const baseUrl = '/tesla-gateway-console-app/commonConfig/';


const url = {
  // 模块
  createSgModuleCommonConfig: `${baseUrl}createSgModuleCommonConfig`,//模块非业务新增数据功能
  querySgModuleCommonConfigList: `${baseUrl}querySgModuleCommonConfigList`,//模块非业务数据列表查询功能，详情查询功能
  editSgModuleCommonConfig: `${baseUrl}editSgModuleCommonConfig`,//模块非业务数据修改功能
  deleteSgModuleCommonConfig: `${baseUrl}deleteSgModuleCommonConfig`,//模块非业务数据删除修改功能

  // 服务单元
  querySgSubmoduleCommonConfigList: `${baseUrl}querySgSubmoduleCommonConfigList`,//服务单元非业务数据列表查询功能
  createSgSubmoduleCommonConfig: `${baseUrl}createSgSubmoduleCommonConfig`,//服务单元非业务新增数据功能
  editSgSubmoduleCommonConfig: `${baseUrl}editSgSubmoduleCommonConfig`,//服务单元非业务数据修改功能
  deleteSgSubmoduleCommonConfig: `${baseUrl}deleteSgSubmoduleCommonConfig`,//服务单元非业务数据删除服务单元数据功能
  querySgSubmoduleCommonConfigDetail: `${baseUrl}querySgSubmoduleCommonConfigDetail`,//服务单元非业务数据查询详情功能
};

export default url;