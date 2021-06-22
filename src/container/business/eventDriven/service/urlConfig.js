const baseEDAUrl = "/tesla-gateway-console-app/eda/";

const url = {
  queryEdaTopicByParam: `${baseEDAUrl}queryEdaTopicByParam`, // 查询主题
  queryEdaConsumerListByParam: `${baseEDAUrl}queryEdaConsumerListByParam`, // 查询消费者
  queryEdaMiddlewareDetail: `${baseEDAUrl}queryEdaMiddlewareDetail`, // 查询单元
  moveOffset: `${baseEDAUrl}moveOffset`, // 重置位点
  queryEdaMiddlewareList: `${baseEDAUrl}queryEdaMiddlewareList`, // 查询中间件列表
  changeLDC: `${baseEDAUrl}changeLDC`, // 切换LDC
  queryLDC: `${baseEDAUrl}queryLDC`, // 查询LDC
  queryEdaTopicDetailByTopicName: `${baseEDAUrl}queryEdaTopicDetailByTopicName`, // 根据主题查询中间件集群名称

  // ZK使用情况查看
  querySubmoduleSDKVersion: `${baseEDAUrl}querySubmoduleSDKVersion`, //查询版本号
  syncSubmoduleSDKVersionFromZK: `${baseEDAUrl}syncSubmoduleSDKVersionFromZK`, //同步ZK数据 
  statisticsSubmoduleSDKVersion: `${baseEDAUrl}statisticsSubmoduleSDKVersion`, //统计版本使用情况
  queryZKMeta: `${baseEDAUrl}queryZKMeta`, //路径查询
  

  // 
  queryEdaClusterList: `${baseEDAUrl}queryEdaClusterList`, //查询所有集群
  checkTopicExist: `${baseEDAUrl}checkTopicExist`, //查询主题是否在集群创建
  reCreateTopic: `${baseEDAUrl}reCreateTopic`, //补创主题

  // 上线配置管理
  queryProfiles: `${baseEDAUrl}queryProfiles`, //查询配置列表
  changeProfileOnlineStatus: `${baseEDAUrl}changeProfileOnlineStatus`, //变更配置线上状态
  downloadProfiles: `${baseEDAUrl}downloadProfiles`, //下载配置


  // 操作记录
  queryFunctionCallRecords: `${baseEDAUrl}queryFunctionCallRecords`, //查询操作记录  
};

export default url;