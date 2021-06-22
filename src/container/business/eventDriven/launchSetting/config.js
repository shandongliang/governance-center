export const tabList = [
  {
    name: "根据日期搜索配置",
    key: "1"
  },
  {
    name: "根据日期发送邮件提醒",
    key: "2"
  },
  {
    name: "根据配置搜索配置",
    key: "3"
  },
  {
    name: "根据配置发送邮件提醒",
    key: "4"
  }
];



const topicColumns = [
  {
    title: '主题名称',
    dataIndex: 'topicName',
    width: 300
  },
  {
    title: '集群编号',
    dataIndex: 'clusterId',
    width: 200
  },
  {
    title: '可靠',
    dataIndex: 'kekao',
    width: 100,
    render: (text, record, index) => {
      return (
        <span>{text==="Y"?"是":"否"}</span>
      );
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    render: (text, record, index) => {
      return (
        <span>{text==="Y"?"有效":"无效"}</span>
      );
    }
  }
]
const producerColumns = [
  {
    title: '生产者编号',
    dataIndex: 'producerId',
    width: 350
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    render: (text, record, index) => {
      return (
        <span>{text==="Y"?"有效":"无效"}</span>
      );
    }
  }
]
const consumerColumns = [
  {
    title: '消费者编号',
    dataIndex: 'consumerId',
    width: 350
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    render: (text, record, index) => {
      return (
        <span>{text==="Y"?"有效":"无效"}</span>
      );
    }
  }
]
const subscribeColumns = [
  {
    title: '事件主题（Topic）',
    dataIndex: 'topicName',
    width: 300
  },
  {
    title: '消费者编号(ConsumerId)',
    dataIndex: 'consumerId',
    width: 300
  },
  {
    title: '幂等',
    dataIndex: 'idempotent',
    width: 100,
    render: (text, record, index) => {
      return (
        <span>{text==="Y"?"是":"否"}</span>
      );
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    render: (text, record, index) => {
      return (
        <span>{text==="Y"?"有效":"无效"}</span>
      );
    }
  }
]
const topicRelationColumns = [
  {
    title: '事件主题（Topic）',
    dataIndex: 'topicName',
    width: 300
  },
  {
    title: '生产者编号(ProducerId)',
    dataIndex: 'producerId',
    width: 300
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    render: (text, record, index) => {
      return (
        <span>{text==="Y"?"有效":"无效"}</span>
      );
    }
  }
]

export const tableList = [
  {
    name: "主题配置列表",
    key: "topic",
    // columns: topicColumns,
    data: []
  },
  {
    name: "生产者配置列表",
    key: "producer",
    // columns: producerColumns,
    data: []
  },
  {
    name: "消费者配置列表",
    key: "consumer",
    // columns: consumerColumns,
    data: []
  },
  {
    name: "订阅关系配置列表",
    key: "subscribe",
    // columns: subscribeColumns,
    data: []
  },
  {
    name: "主题生产者关系配置列表",
    key: "topicRelation",
    // columns: topicRelationColumns,
    data: []
  }
]