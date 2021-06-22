const baseUrl = '/tesla-gateway-console-app/eda/';
const baseCommonUrl = '/tesla-gateway-console-app/';

const url = {
  // 查询集群
  queryEdaMiddlewareList: '/tesla-gateway-console-app/eda/queryEdaMiddlewareList',
  // 主题
  createEdaTopic: `${baseUrl}createEdaTopic`,//主题新增数据功能
  queryEdaTopicList: `${baseUrl}queryEdaTopicList`,//主题数据列表查询功能，详情查询功能
  editEdaTopic: `${baseUrl}editEdaTopic`,//主题数据修改功能
  deleteEdaTopic: `${baseUrl}deleteEdaTopic`,//主题数据删除修改功能

  // 消费者
  createEdaConsumer: `${baseUrl}createEdaConsumer`,//消费者新增数据功能
  queryEdaConsumerList: `${baseUrl}queryEdaConsumerList`,//消费者数据列表查询功能，详情查询功能
  editEdaConsumer: `${baseUrl}editEdaConsumer`,//消费者数据修改功能
  deleteEdaConsumer: `${baseUrl}deleteEdaConsumer`,//消费者数据删除修改功能

  // 生产者
  createEdaProducer: `${baseUrl}createEdaProducer`,//生产者新增数据功能
  queryEdaProducerList: `${baseUrl}queryEdaProducerList`,//生产者数据列表查询功能，详情查询功能
  editEdaProducer: `${baseUrl}editEdaProducer`,//生产者数据修改功能
  deleteEdaProducer: `${baseUrl}deleteEdaProducer`,//生产者数据删除修改功能

  // 主题消费者关系
  createEdaTopicRelation: `${baseUrl}createEdaTopicRelation`,//主题消费者关系新增数据功能
  queryEdaTopicRelationList: `${baseUrl}queryEdaTopicRelationList`,//主题消费者关系数据列表查询功能，详情查询功能
  editEdaTopicRelation: `${baseUrl}editEdaTopicRelation`,//主题消费者关系数据修改功能
  deleteEdaTopicRelation: `${baseUrl}deleteEdaTopicRelation`,//主题消费者关系数据删除修改功能

  // 订阅关系
  createEdaSubscribe: `${baseUrl}createEdaSubscribe`,//订阅关系新增数据功能
  queryEdaSubscribeList: `${baseUrl}queryEdaSubscribeList`,//订阅关系数据列表查询功能，详情查询功能
  editEdaSubscribe: `${baseUrl}editEdaSubscribe`,//订阅关系数据修改功能
  deleteEdaSubscribe: `${baseUrl}deleteEdaSubscribe`,//订阅关系数据删除修改功能

    //批量下载
    exportZkData: `${baseCommonUrl}exportZkData`,//批量下载
};

export default url;