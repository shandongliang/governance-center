const baseUrl = '/tesla-gateway-console-app/sg/';
const baseConfigUrl = '/tesla-gateway-console-app/sg/';
const baseCommonUrl = '/tesla-gateway-console-app/';
const url = {
  //查询LDC
  queryLDCList: `${baseConfigUrl}queryLdcConfig`,
  // 模块
  querySgModuleBusinessConfigList: `${baseUrl}querySgModuleBusinessConfigList`,//治理：模块业务数据列表查询功能，详情查询功能
  createSgModuleBusinessConfig: `${baseUrl}createSgModuleBusinessConfig`,//治理：模块业务新增数据功能
  editSgModuleBusinessConfig: `${baseUrl}editSgModuleBusinessConfig`,//治理：模块业务修改数据功能
  deleteSgModuleBusinessConfig: `${baseUrl}deleteSgModuleBusinessConfig`,//治理：模块业务删除数据功能

  // 服务单元
  querySgSubmoduleBusinessConfigList: `${baseUrl}querySgSubmoduleBusinessConfigList`,//审核：服务单元业务数据列表查询功能，详情查询功能
  createSgSubmoduleBusinessConfig: `${baseUrl}createSgSubmoduleBusinessConfig`,//治理：服务单元非业务数据新增功能
  editSgSubmoduleBusinessConfig: `${baseUrl}editSgSubmoduleBusinessConfig`,//治理：服务单元业务修改数据功能
  deleteSgSubmoduleBusinessConfig: `${baseUrl}deleteSgSubmoduleBusinessConfig`,//治理：服务单元业务删除数据功能

  // 服务
  querySgServiceList: `${baseUrl}querySgServiceList`,//审核：服务业务数据列表查询功能，详情查询功能
  createSgServices: `${baseUrl}createSgServices`,//治理：服务非业务数据新增功能
  editSgServices: `${baseUrl}editSgServices`,//治理：服务业务修改数据功能
  deleteSgServices: `${baseUrl}deleteSgServices`,//治理：服务业务删除数据功能
  provideSgService: `${baseUrl}provideSgService`,//服务发布(静态/动态)
  consumeSgService: `${baseUrl}consumeSgService`,//服务订阅
  querySgServiceProvider: `${baseUrl}querySgServiceProvider`,//查看服务发布(静态/动态)
  querySgServiceConsumer: `${baseUrl}querySgServiceConsumer`,//查看服务订阅	
  querySgServiceStatus: `${baseUrl}querySgServiceStatus`,//服务状态

  // 注册节点
  createServerConfigList: `${baseConfigUrl}createServerConfigList`,//创建注册节点

  //批量下载
  exportZkData: `${baseCommonUrl}exportZkData`,//批量下载

  //查询所有模块和服务单元
  querySgModuleCodeAndServiceUnitCodeList: `${baseCommonUrl}querySgModuleCodeAndServiceUnitCodeList`,//查询所有模块和服务单元
  
}
export default url