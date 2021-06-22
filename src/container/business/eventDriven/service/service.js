import fetch, { $uploadfile } from '../../../../util/fetch';
import $downloadfetchs, { downloadMultipleFiles } from '../../../../util/downloadfetch';
import url from './urlConfig';
import { randomNamber } from '../../../../util/publicFuc';

export function queryEdaTopicByParam(params) { // 查询主题
  return fetch({
    url: url.queryEdaTopicByParam,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};
export function queryEdaConsumerListByParam(params) { // 查询消费者
  return fetch({
    url: url.queryEdaConsumerListByParam,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};
export function queryEdaMiddlewareDetail(params) { // 查询单元
  return fetch({
    url: url.queryEdaMiddlewareDetail,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};
export function moveOffset(params) { // 重置位点
  return fetch({
    url: url.moveOffset,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};
export function queryEdaMiddlewareList(params) { // 查询中间件列表
  return fetch({
    url: url.queryEdaMiddlewareList,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};
export function changeLDC(params) { // 切换LDC
  return fetch({
    url: url.changeLDC,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};
export function queryLDC(params) { // 查询LDC
  return fetch({
    url: url.queryLDC,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};
export function queryEdaTopicDetailByTopicName(params) { // 根据主题查询中间件集群名称
  return fetch({
    url: url.queryEdaTopicDetailByTopicName,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};

// ******************************************************************//

// ZK使用情况查看
export function querySubmoduleSDKVersion(params) { // 查询版本号
  return fetch({
    url: url.querySubmoduleSDKVersion,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};
export function syncSubmoduleSDKVersionFromZK(params) { // 同步ZK数据
  return fetch({
    url: url.syncSubmoduleSDKVersionFromZK,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};
export function statisticsSubmoduleSDKVersion(params) { // 统计版本使用情况
  return fetch({
    url: url.statisticsSubmoduleSDKVersion,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};
export function queryZKMeta(params) { // 路径查询
  return fetch({
    url: url.queryZKMeta,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};

// ******************************************************************//

export function queryEdaClusterList(params) { // 查询所有集群
  return fetch({
    url: url.queryEdaClusterList,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};
export function checkTopicExist(params) { // 查询主题是否在集群创建
  return fetch({
    url: url.checkTopicExist,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};
export function reCreateTopic(params) { // 补创主题
  return fetch({
    url: url.reCreateTopic,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};

// ******************************************************************//

export function queryProfiles(params) { // 查询配置列表
  return fetch({
    url: url.queryProfiles,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};
export function changeProfileOnlineStatus(params) { // 变更配置线上状态
  return fetch({
    url: url.changeProfileOnlineStatus,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};

export function downloadProfiles(params) { // 下载配置
  return fetch({
    url: url.downloadProfiles,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};

// ******************************************************************//

export function queryFunctionCallRecords(params) { // 查询操作记录
  return fetch({
    url: url.queryFunctionCallRecords,
    data: {
      reqSeqNo: randomNamber(),
      ...params
    }
  })
};
