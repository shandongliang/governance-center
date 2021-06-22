const baseUrl = '/tesla-gateway-console-app/approve/';

const url = {
  // 查询集群
  queryEdaMiddlewareList: '/tesla-gateway-console-app/eda/queryEdaMiddlewareList',
  // 导出审核通过的数据
  exportConfigTxtByType: `${baseUrl}exportConfigTxtByType`,
  // 导出审核通过的数据(兼容旧版)
  exportOldConfigTxtByType: `${baseUrl}exportOldConfigTxtByType`,
  // 主题
  createEdaTopicApprove: `${baseUrl}createEdaTopicApprove`,//主题新增数据功能
  queryEdaTopicApproveList: `${baseUrl}queryEdaTopicApproveList`,//主题数据列表查询功能，详情查询功能
  editEdaTopicApprove: `${baseUrl}editEdaTopicApprove`,//主题数据修改功能
  deleteEdaTopicApprove: `${baseUrl}deleteEdaTopicApprove`,//主题数据删除修改功能

  // 消费者
  createEdaTopicConsumerApprove: `${baseUrl}createEdaTopicConsumerApprove`,//消费者新增数据功能
  queryEdaTopicConsumerApproveList: `${baseUrl}queryEdaTopicConsumerApproveList`,//消费者数据列表查询功能，详情查询功能
  editEdaTopicConsumerApprove: `${baseUrl}editEdaTopicConsumerApprove`,//消费者数据修改功能
  deleteEdaTopicConsumerApprove: `${baseUrl}deleteEdaTopicConsumerApprove`,//消费者数据删除修改功能

  // 生产者
  createEdaTopicProducerApprove: `${baseUrl}createEdaTopicProducerApprove`,//生产者新增数据功能
  queryEdaTopicProducerApproveList: `${baseUrl}queryEdaTopicProducerApproveList`,//生产者数据列表查询功能，详情查询功能
  editEdaTopicProducerApprove: `${baseUrl}editEdaTopicProducerApprove`,//生产者数据修改功能
  deleteEdaTopicProducerApprove: `${baseUrl}deleteEdaTopicProducerApprove`,//生产者数据删除修改功能

  // 主题消费者关系
  createEdaTopicProducerRelationshipApprove: `${baseUrl}createEdaTopicProducerRelationshipApprove`,//主题消费者关系新增数据功能
  queryEdaTopicProducerRelationshipApproveList: `${baseUrl}queryEdaTopicProducerRelationshipApproveList`,//主题消费者关系数据列表查询功能，详情查询功能
  editEdaTopicProducerRelationshipApprove: `${baseUrl}editEdaTopicProducerRelationshipApprove`,//主题消费者关系数据修改功能
  deleteEdaTopicProducerRelationshipApprove: `${baseUrl}deleteEdaTopicProducerRelationshipApprove`,//主题消费者关系数据删除修改功能

  // 订阅关系
  createEdaTopicSubscribeRelationshipApprove: `${baseUrl}createEdaTopicSubscribeRelationshipApprove`,//订阅关系新增数据功能
  queryEdaTopicSubscribeRelationshipApproveList: `${baseUrl}queryEdaTopicSubscribeRelationshipApproveList`,//订阅关系数据列表查询功能，详情查询功能
  editEdaTopicSubscribeRelationshipApprove: `${baseUrl}editEdaTopicSubscribeRelationshipApprove`,//订阅关系数据修改功能
  deleteEdaTopicSubscribeRelationshipApprove: `${baseUrl}deleteEdaTopicSubscribeRelationshipApprove`,//订阅关系数据删除修改功能
};

export default url;