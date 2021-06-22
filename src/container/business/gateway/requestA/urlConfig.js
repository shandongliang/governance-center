const baseUrl = '/tesla-gateway-console-app/sg/'
const url = {

  // 静态节点
  queryServerConfigList: `${baseUrl}queryServerConfigList`,//查询静态节点
  deleteServerConfig: `${baseUrl}deleteServerConfig`,//删除静态节点
  exportServerConfigV1: `${baseUrl}exportServerConfigV1`,//导出静态节点
  deleteServerNodeBatch: `${baseUrl}deleteServerNodeBatch`,//批量删除静态节点
  queryServerConfigStatistics: `${baseUrl}queryServerConfigStatistics`,//查询静态节点变更查询

  // ELK统计管理
  queryLogFullRetrievalByELK: `${baseUrl}queryLogFullRetrievalByELK`,//日志全文检索
  queryRegisterByElk: `${baseUrl}queryRegisterByElk`,//注册信息 聚合
  queryRegisterDetailByElk: `${baseUrl}queryRegisterDetailByElk`,//注册信息 列表
  queryIsolationByElk: `${baseUrl}queryIsolationByElk`,//服务故障隔离信息 聚合
  queryIsolationDetailByElk: `${baseUrl}queryIsolationDetailByElk`,//服务故障隔离信息 列表
  queryServiceRelationshipByElk: `${baseUrl}queryServiceRelationshipByElk`,//服务血缘关系 聚合
  queryServiceRelationshipDetailByElk: `${baseUrl}queryServiceRelationshipDetailByElk`,//服务血缘关系 列表
  queryErrorByElk: `${baseUrl}queryErrorByElk`,//错误统计
  queryServiceSubscribeByElk: `${baseUrl}queryServiceSubscribeByElk`,//服务订阅 聚合
  queryServiceSubscribeDetailByElk: `${baseUrl}queryServiceSubscribeDetailByElk`,//服务订阅 列表
}
export default url