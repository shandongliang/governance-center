import fetch, { $uploadfile } from './../../../../util/fetch';
import $downloadfetchs from './../../../../util/downloadfetch';
import url from './urlConfig'

//查询集群
export function queryEdaMiddlewareList(params) { //导出审核通过的数据
  return fetch({
    url: url.queryEdaMiddlewareList,
    data: params
  })
}
//导出审核通过的数据
export function exportConfigTxtByType(params) { //导出审核通过的数据
  return $downloadfetchs({
    url: url.exportConfigTxtByType,
    data: params
  })
}
//导出审核通过的数据(兼容旧版)
export function exportOldConfigTxtByType(params) { //导出审核通过的数据(兼容旧版)
  return $downloadfetchs({
    url: url.exportOldConfigTxtByType,
    data: params
  })
}
// 主题
export function createEdaTopicApprove(params) { //主题非业务新增数据功能
  return fetch({
    url: url.createEdaTopicApprove,
    data: params
  })
}

export function queryEdaTopicApproveList(params) { //主题非业务数据列表查询功能，详情查询功能
  return fetch({
    url: url.queryEdaTopicApproveList,
    data: params
  })
}

export function editEdaTopicApprove(params) { //主题非业务数据修改功能
  return fetch({
    url: url.editEdaTopicApprove,
    data: params
  })
}

export function deleteEdaTopicApprove(params) { //主题非业务数据删除修改功能
  return fetch({
    url: url.deleteEdaTopicApprove,
    data: params
  })
}

// 消费者
export function createEdaTopicConsumerApprove(params) { //消费者新增数据功能
  return fetch({
    url: url.createEdaTopicConsumerApprove,
    data: params
  })
}

export function queryEdaTopicConsumerApproveList(params) { //消费者数据列表查询功能，详情查询功能
  return fetch({
    url: url.queryEdaTopicConsumerApproveList,
    data: params
  })
}

export function editEdaTopicConsumerApprove(params) { //消费者数据修改功能
  return fetch({
    url: url.editEdaTopicConsumerApprove,
    data: params
  })
}

export function deleteEdaTopicConsumerApprove(params) { //消费者数据删除修改功能
  return fetch({
    url: url.deleteEdaTopicConsumerApprove,
    data: params
  })
}

// 生产者
export function createEdaTopicProducerApprove(params) { //生产者新增数据功能
  return fetch({
    url: url.createEdaTopicProducerApprove,
    data: params
  })
}

export function queryEdaTopicProducerApproveList(params) { //生产者数据列表查询功能，详情查询功能
  return fetch({
    url: url.queryEdaTopicProducerApproveList,
    data: params
  })
}

export function editEdaTopicProducerApprove(params) { //生产者数据修改功能
  return fetch({
    url: url.editEdaTopicProducerApprove,
    data: params
  })
}

export function deleteEdaTopicProducerApprove(params) { //生产者数据删除修改功能
  return fetch({
    url: url.deleteEdaTopicProducerApprove,
    data: params
  })
}

// 主题消费者关系
export function createEdaTopicProducerRelationshipApprove(params) { //主题消费者关系新增数据功能
  return fetch({
    url: url.createEdaTopicProducerRelationshipApprove,
    data: params
  })
}

export function queryEdaTopicProducerRelationshipApproveList(params) { //主题消费者关系数据列表查询功能，详情查询功能
  return fetch({
    url: url.queryEdaTopicProducerRelationshipApproveList,
    data: params
  })
}

export function editEdaTopicProducerRelationshipApprove(params) { //主题消费者关系数据修改功能
  return fetch({
    url: url.editEdaTopicProducerRelationshipApprove,
    data: params
  })
}

export function deleteEdaTopicProducerRelationshipApprove(params) { //主题消费者关系数据删除修改功能
  return fetch({
    url: url.deleteEdaTopicProducerRelationshipApprove,
    data: params
  })
}

// 订阅者关系
export function createEdaTopicSubscribeRelationshipApprove(params) { //订阅者关系新增数据功能
  return fetch({
    url: url.createEdaTopicSubscribeRelationshipApprove,
    data: params
  })
}

export function queryEdaTopicSubscribeRelationshipApproveList(params) { //订阅者关系数据列表查询功能，详情查询功能
  return fetch({
    url: url.queryEdaTopicSubscribeRelationshipApproveList,
    data: params
  })
}

export function editEdaTopicSubscribeRelationshipApprove(params) { //订阅者关系数据修改功能
  return fetch({
    url: url.editEdaTopicSubscribeRelationshipApprove,
    data: params
  })
}

export function deleteEdaTopicSubscribeRelationshipApprove(params) { //订阅者关系数据删除修改功能
  return fetch({
    url: url.deleteEdaTopicSubscribeRelationshipApprove,
    data: params
  })
}