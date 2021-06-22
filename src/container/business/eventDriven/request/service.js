import fetch, { $uploadfile } from './../../../../util/fetch';
import downloadfetch from './../../../../util/downloadfetch';
import url from './urlConfig'

//查询集群
export function queryEdaMiddlewareList(params) { //导出审核通过的数据
  return fetch({
    url: url.queryEdaMiddlewareList,
    data: params
  })
}
// 主题
export function createEdaTopic(params) { //主题非业务新增数据功能
  return fetch({
    url: url.createEdaTopic,
    data: params
  })
}

export function queryEdaTopicList(params) { //主题非业务数据列表查询功能，详情查询功能
  return fetch({
    url: url.queryEdaTopicList,
    data: params
  })
}

export function editEdaTopic(params) { //主题非业务数据修改功能
  return fetch({
    url: url.editEdaTopic,
    data: params
  })
}

export function deleteEdaTopic(params) { //主题非业务数据删除修改功能
  return fetch({
    url: url.deleteEdaTopic,
    data: params
  })
}

// 消费者
export function createEdaConsumer(params) { //消费者新增数据功能
  return fetch({
    url: url.createEdaConsumer,
    data: params
  })
}

export function queryEdaConsumerList(params) { //消费者数据列表查询功能，详情查询功能
  return fetch({
    url: url.queryEdaConsumerList,
    data: params
  })
}

export function editEdaConsumer(params) { //消费者数据修改功能
  return fetch({
    url: url.editEdaConsumer,
    data: params
  })
}

export function deleteEdaConsumer(params) { //消费者数据删除修改功能
  return fetch({
    url: url.deleteEdaConsumer,
    data: params
  })
}

// 生产者
export function createEdaProducer(params) { //生产者新增数据功能
  return fetch({
    url: url.createEdaProducer,
    data: params
  })
}

export function queryEdaProducerList(params) { //生产者数据列表查询功能，详情查询功能
  return fetch({
    url: url.queryEdaProducerList,
    data: params
  })
}

export function editEdaProducer(params) { //生产者数据修改功能
  return fetch({
    url: url.editEdaProducer,
    data: params
  })
}

export function deleteEdaProducer(params) { //生产者数据删除修改功能
  return fetch({
    url: url.deleteEdaProducer,
    data: params
  })
}

// 主题消费者关系
export function createEdaTopicRelation(params) { //主题消费者关系新增数据功能
  return fetch({
    url: url.createEdaTopicRelation,
    data: params
  })
}

export function queryEdaTopicRelationList(params) { //主题消费者关系数据列表查询功能，详情查询功能
  return fetch({
    url: url.queryEdaTopicRelationList,
    data: params
  })
}

export function editEdaTopicRelation(params) { //主题消费者关系数据修改功能
  return fetch({
    url: url.editEdaTopicRelation,
    data: params
  })
}

export function deleteEdaTopicRelation(params) { //主题消费者关系数据删除修改功能
  return fetch({
    url: url.deleteEdaTopicRelation,
    data: params
  })
}

// 订阅者关系
export function createEdaSubscribe(params) { //订阅者关系新增数据功能
  return fetch({
    url: url.createEdaSubscribe,
    data: params
  })
}

export function queryEdaSubscribeList(params) { //订阅者关系数据列表查询功能，详情查询功能
  return fetch({
    url: url.queryEdaSubscribeList,
    data: params
  })
}

export function editEdaSubscribe(params) { //订阅者关系数据修改功能
  return fetch({
    url: url.editEdaSubscribe,
    data: params
  })
}

export function deleteEdaSubscribe(params) { //订阅者关系数据删除修改功能
  return fetch({
    url: url.deleteEdaSubscribe,
    data: params
  })
}

// 批量下载
export function exportZkData(params) { //批量下载
  return downloadfetch({
    url: url.exportZkData,
    data: params
  })
}