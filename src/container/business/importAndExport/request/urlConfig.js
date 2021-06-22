const baseCommonUrl = '/tesla-gateway-console-app/';
const baseSgUrl = '/tesla-gateway-console-app/sg/';
const baseEDAUrl = '/tesla-gateway-console-app/eda/';
const url = {
  //批量下载
  exportZkData: `${baseCommonUrl}exportZkData`,//批量下载
  queryExpoetZkData: `${baseCommonUrl}queryExpoetZkData`,//数据查询

  //文件上传
  importCompressedFile: `${baseCommonUrl}importCompressedFile`,//文件上传

  //服务治理数据下载
  querySgServiceList: `${baseSgUrl}querySgServiceList`,//服务数据查询
  queryServiceUnitListByConfig: `${baseSgUrl}queryServiceUnitListByConfig`,//根据服务数据查服务单元
  queryModuleListByConfig: `${baseSgUrl}queryModuleListByConfig`,//根据服务单元数据查模块
  exportCompressedFile: `${baseSgUrl}exportCompressedFile`,//服务治理数据下载

  //事件驱动数据下载
  queryEdaTopicRelationList: `${baseEDAUrl}queryEdaTopicRelationList`,//关联关系查询
  queryEDAServiceUnitListByConfig: `${baseEDAUrl}queryServiceUnitListByConfig`,//根据关联关系数据查服务单元
  queryEDAModuleListByConfig: `${baseEDAUrl}queryModuleListByConfig`,//根据关联关系数据查模块
  exportEDACompressedFile: `${baseEDAUrl}exportCompressedFile`,//事件驱动数据下载
}
export default url