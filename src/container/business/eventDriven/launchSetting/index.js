import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  DatePicker,
  Button,
  Table,
  Tabs,
  Form,
  Row,
  Col,
  Input,
  Select,
  Radio,
  message
} from "antd";
import {
  queryProfiles,
  changeProfileOnlineStatus,
  downloadProfiles
} from "../service/service";
import "./../../../common/style/index.less";
import "./index.less";
import { tabList, tableList} from './config'
import moment from 'moment';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
export default class LaunchSetting extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      resultShow: false,
      tabKey: "1",
      defaultValue: "",
      loading: false,
      data: [],
      filterValue: {},
      tableRenderList: tableList,
      topicColumns: [
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
          dataIndex: 'reliability',
          width: 100,
          render: (text, record, index) => {
            return (
              <span>{text?(text==="Y"?"是":"否"):""}</span>
            );
          }
        },
        {
          title: '状态',
          dataIndex: 'status',
          width: 100,
          render: (text, record, index) => {
            return (
              <span>{text?(text==="Y"?"有效":"无效"):""}</span>
            );
          }
        },
        {
					title: '上线状态',
					dataIndex: 'onlineStatus',
					width: 100,
					render: (text, record, index) => {
            let onlineStatus = "未上线";
            if(text==="1"){
              onlineStatus = "上线中";
            } else if(text==="2"){
              onlineStatus = "已上线";
            }
						return (
							<span>{onlineStatus}</span>
						);
					}
				}
      ],
      producerColumns: [
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
              <span>{text?(text==="Y"?"有效":"无效"):""}</span>
            );
          }
        },
        {
					title: '上线状态',
					dataIndex: 'onlineStatus',
					width: 100,
					render: (text, record, index) => {
            let onlineStatus = "未上线";
            if(text==="1"){
              onlineStatus = "上线中";
            } else if(text==="2"){
              onlineStatus = "已上线";
            }
						return (
							<span>{onlineStatus}</span>
						);
					}
				}
      ],
      consumerColumns: [
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
              <span>{text?(text==="Y"?"有效":"无效"):""}</span>
            );
          }
        },
        {
					title: '上线状态',
					dataIndex: 'onlineStatus',
					width: 100,
					render: (text, record, index) => {
            let onlineStatus = "未上线";
            if(text==="1"){
              onlineStatus = "上线中";
            } else if(text==="2"){
              onlineStatus = "已上线";
            }
						return (
							<span>{onlineStatus}</span>
						);
					}
				}
      ],
      subscribeColumns: [
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
              <span>{text?(text==="Y"?"有效":"无效"):""}</span>
            );
          }
        },
        {
          title: '消费模式',
          dataIndex: 'consumeMode',
          width: 100,
          render: (text, record, index) => {
            return (
              <span>{text?(text==="earliest"?"最早":"最新"):""}</span>
            );
          }
        },
        {
          title: '状态',
          dataIndex: 'status',
          width: 100,
          render: (text, record, index) => {
            return (
              <span>{text?(text==="Y"?"有效":"无效"):""}</span>
            );
          }
        },
        {
					title: '上线状态',
					dataIndex: 'onlineStatus',
					width: 100,
					render: (text, record, index) => {
            let onlineStatus = "未上线";
            if(text==="1"){
              onlineStatus = "上线中";
            } else if(text==="2"){
              onlineStatus = "已上线";
            }
						return (
							<span>{onlineStatus}</span>
						);
					}
				}
      ],
      topicRelationColumns: [
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
              <span>{text?(text==="Y"?"有效":"无效"):""}</span>
            );
          }
        },
        {
					title: '上线状态',
					dataIndex: 'onlineStatus',
					width: 100,
					render: (text, record, index) => {
            let onlineStatus = "未上线";
            if(text==="1"){
              onlineStatus = "上线中";
            } else if(text==="2"){
              onlineStatus = "已上线";
            }
						return (
							<span>{onlineStatus}</span>
						);
					}
				},
      ],
      topicResultColumns: [
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
          dataIndex: 'reliability',
          width: 100,
          render: (text, record, index) => {
            return (
              <span>{text?(text==="Y"?"是":"否"):""}</span>
            );
          }
        },
        {
          title: '状态',
          dataIndex: 'status',
          width: 100,
          render: (text, record, index) => {
            return (
              <span>{text?(text==="Y"?"有效":"无效"):""}</span>
            );
          }
        },
        {
					title: '上线状态',
					dataIndex: 'onlineStatus',
					width: 100,
					render: (text, record, index) => {
            let onlineStatus = "未上线";
            if(text==="1"){
              onlineStatus = "上线中";
            } else if(text==="2"){
              onlineStatus = "已上线";
            }
						return (
							<span>{onlineStatus}</span>
						);
					}
				},
        {
          title: '变更结果',
          dataIndex: 'result',
          width: 300
        }
      ],
      producerResultColumns: [
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
              <span>{text?(text==="Y"?"有效":"无效"):""}</span>
            );
          }
        },
        {
					title: '上线状态',
					dataIndex: 'onlineStatus',
					width: 100,
					render: (text, record, index) => {
            let onlineStatus = "未上线";
            if(text==="1"){
              onlineStatus = "上线中";
            } else if(text==="2"){
              onlineStatus = "已上线";
            }
						return (
							<span>{onlineStatus}</span>
						);
					}
				},
        {
          title: '变更结果',
          dataIndex: 'result',
          width: 300
        }
      ],
      consumerResultColumns: [
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
              <span>{text?(text==="Y"?"有效":"无效"):""}</span>
            );
          }
        },
        {
					title: '上线状态',
					dataIndex: 'onlineStatus',
					width: 100,
					render: (text, record, index) => {
            let onlineStatus = "未上线";
            if(text==="1"){
              onlineStatus = "上线中";
            } else if(text==="2"){
              onlineStatus = "已上线";
            }
						return (
							<span>{onlineStatus}</span>
						);
					}
				},
        {
          title: '变更结果',
          dataIndex: 'result',
          width: 300
        }
      ],
      subscribeResultColumns: [
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
              <span>{text?(text==="Y"?"是":"否"):""}</span>
            );
          }
        },
        {
          title: '消费模式',
          dataIndex: 'consumeMode',
          width: 100,
          render: (text, record, index) => {
            return (
              <span>{text?(text==="earliest"?"最早":"最新"):""}</span>
            );
          }
        },
        {
          title: '状态',
          dataIndex: 'status',
          width: 100,
          render: (text, record, index) => {
            return (
              <span>{text?(text==="Y"?"有效":"无效"):""}</span>
            );
          }
        },
        {
					title: '上线状态',
					dataIndex: 'onlineStatus',
					width: 100,
					render: (text, record, index) => {
            let onlineStatus = "未上线";
            if(text==="1"){
              onlineStatus = "上线中";
            } else if(text==="2"){
              onlineStatus = "已上线";
            }
						return (
							<span>{onlineStatus}</span>
						);
					}
				},
        {
          title: '变更结果',
          dataIndex: 'result',
          width: 300
        }
      ],
      topicRelationResultColumns: [
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
              <span>{text?(text==="Y"?"有效":"无效"):""}</span>
            );
          }
        },
        {
					title: '上线状态',
					dataIndex: 'onlineStatus',
					width: 100,
					render: (text, record, index) => {
            let onlineStatus = "未上线";
            if(text==="1"){
              onlineStatus = "上线中";
            } else if(text==="2"){
              onlineStatus = "已上线";
            }
						return (
							<span>{onlineStatus}</span>
						);
					}
				},
        {
          title: '变更结果',
          dataIndex: 'result',
          width: 300
        }
      ]
    };
  }
  
  componentDidMount() {}
  // 查询数据
  fetchData = () => {
    this.setState({ loading: true });
    const { filterValue, tabKey } = this.state;
    let data = {
      ...filterValue,
      queryType: (tabKey === "1"||tabKey === "2")?"Date":"Profile"
    };
    queryProfiles(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        this.setState(
          {
            data: res.reply.result,
            defaultValue: res.reply.result.length>0?res.reply.result[0].subModuleCode:"",
            loading: false,
            resultShow: false 
          },
          () => {
            this.subModuleChange(this.state.defaultValue)
          }
        );
      }
    });
  };
  // 变更线上状态
  changeOnlineStatus = () => {
    this.setState({ loading: true });
    const { filterValue, tabKey } = this.state;

    let data = {
      ...filterValue,
      changeType: tabKey === "1"?"Date":"Profile"
    };
    
    changeProfileOnlineStatus(data).then(res => {
      if (res.reply.returnCode.type === "S") {
        this.setState(
          {
            data: res.reply.result,
            defaultValue: res.reply.result.length>0?res.reply.result[0].subModuleCode:"",
            loading: false,
            resultShow: true
          },
          () => {
            this.subModuleChange(this.state.defaultValue)
          }
        );
      }
    });
  };
  // 下载文件
  downloadProfile = () => {
    const { filterValue, tabKey } = this.state;

    let data = {
      ...filterValue,
      queryType: tabKey === "1"?"Date":"Profile"
    };
    downloadProfiles(data).then(res => {
      let result = res.reply.result
      for(let key in result){
        this.downloadByA(key, new Blob([result[key].join("\n")], {type: "text/plain", endings: "native"}))
      }
    });
  }
  downloadByA =  (name, blob) => {
    let filename = `${name}.txt`;
    let a = document.createElement('a')
    document.body.appendChild(a)
    let url = window.URL.createObjectURL(blob)
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url)
  }

  subModuleChange = value => {
    const { data, tableRenderList } = this.state;
    let showItem;
    data.forEach(item=>{
      if(item.subModuleCode === value){
        showItem = item;
      }
    })
    let list = tableRenderList.map(item=>{
      return {
        ...item,
        data: value === "" ? [] : showItem[`${item.key}List`]
      }
    })
    this.setState({
      tableRenderList: list
    })
  }

  tabChange = value => {
    this.setState({
      data: [],
      defaultValue: "",
      tabKey: value,
      tableRenderList: tableList,
      resultShow: false,
      loading: false
    })
  }
  
  // 获取筛选数据
  onChildQuery = (filterValue, actionType) => {
    if(actionType==="reset"){
      this.setState({tableRenderList: tableList});
      return;
    }
    this.setState(
      {
        filterValue
      },
      () => {
        if(actionType==="search"){
          this.fetchData();
        } else if (actionType==="change"){
          this.changeOnlineStatus();
        } else if (actionType==="download"){
          this.downloadProfile();
        }
      }
    );
  };
  render() {
    const buttonStyle = {
      borderRadius: 5,
      marginLeft: 10
    };
    const { loading, tableRenderList, data, defaultValue, tabKey, resultShow } = this.state;
    return (
      <div style={{ position: "relative", height: "100%" }}>
        <div className="pandora-main-content">
          <div className="tableWrap">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }} onChange={this.tabChange}>
              {tabList.map(item=>(
                <TabPane tab={item.name} key={item.key}>
                {/* <div className="portlet-body">
                  <div className="query-condition"> */}
                    <WrapperQueryForm
                      callbackParent={this.onChildQuery}
                      tabKey={tabKey}
                    />
                  {/* </div>
                </div> */}
                </TabPane>
              ))}
            </Tabs>
            <div className="launchSetting">
              <span className="itemName">服务单元：</span>
              {loading?null:<Radio.Group defaultValue={defaultValue} buttonStyle="solid" onChange={e=>this.subModuleChange(e.target.value)}>
                {data.map(item=>(
                  <Radio.Button key={item.subModuleCode} value={item.subModuleCode}>{item.subModuleCode}</Radio.Button>
                ))}
              </Radio.Group>}
              {tableRenderList.map(item=>(
                <div key={item.key} className="tableItem">
                  <span className="itemName">{item.name}</span>
                  <Table
                    rowKey={record => record.id}
                    pagination={false}
                    dataSource={item.data}
                    columns={resultShow?this.state[`${item.key}ResultColumns`]:this.state[`${item.key}Columns`]}
                    loading={this.state.loading}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class QueryForm extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };
  constructor(props) {
    super(props);
    this.state = {
      type: "TopicRelation"
    };
  }
  componentDidMount() {}

  componentWillReceiveProps(nextProps){
    if(this.props.tabKey!==nextProps.tabKey){
      this.handleReset();
    }
  }

  typeChange = value => {
    if(this.state.type !== value){
      this.props.form.resetFields(["paramName"])
      this.setState({
        type: value
      })
    }
  }

  handleReset = () => {
    this.props.form.resetFields();
    this.props.callbackParent({},"reset");
  };
  handleSearch = actionType => {
    this.props.form.validateFields((err, values) => {
      if(err){
        return;
      }
      if(actionType==="change"&&!values.onlineStatus){
        message.warning("请选择需要变更状态！");
        return;
      }
      const { tabKey } = this.props;
      let data = {
        ...values,
        sendMail: (tabKey==="2"||tabKey==="4")&&values.sendMail==="1",
        date: (tabKey==="1"||tabKey==="2")?moment(values.date).format("YYYY/MM/DD HH:mm:ss"):undefined
      };
      this.props.callbackParent(data,actionType);
    });
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 }
    };
    const { tabKey, form } = this.props;
    const { getFieldDecorator } = form;
    const paramName = this.state.type === "TopicRelation" ? "生产者名称" : "消费者名称";
    return (
      <Form>
        <Row style={{ marginTop: 18 }}>
          {(tabKey==="1"||tabKey==="2")&&<Col span={8}>
            <FormItem {...formItemLayout} label="日期">
              {getFieldDecorator("date",{
                rules: [{required: true, message: '请选择日期'}]
              })(<DatePicker showTime style={{width: "100%"}} format = "YYYY-MM-DD HH:mm:ss" />)}
            </FormItem>
          </Col>}
          {(tabKey==="3"||tabKey==="4")&&<div>
            <Col span={8}>
              <FormItem {...formItemLayout} label="配置类型">
                {getFieldDecorator("type",{
                  initialValue: "TopicRelation",
                  rules: [{required: true, message: '请选择配置类型'}]
                })(
                  <Select onChange={this.typeChange}>
                    <Select.Option value="TopicRelation">生产者</Select.Option>
                    <Select.Option value="Subscribe">消费者</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label={paramName}>
                {getFieldDecorator("paramName",{
                  rules: [{required: true, message: `请填写${paramName}`}]
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label="主题名称">
                {getFieldDecorator("topicName",{
                  rules: [{required: true, message: `请填写主题名称`}]
                })(<Input />)}
              </FormItem>
            </Col>
          </div>}
          <Col span={8}>
            <FormItem {...formItemLayout} label="线上状态">
              {getFieldDecorator("onlineStatus",{
                initialValue: ""
               })(
                <Select>
                  <Select.Option value="0">未上线</Select.Option>
                  <Select.Option value="1">上线中</Select.Option>
                  <Select.Option value="2">已上线</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          {(tabKey==="2"||tabKey==="4")&&<Col span={8}>
            <FormItem {...formItemLayout} label="发送邮件">
              {getFieldDecorator("sendMail",{
                initialValue: "1",
                rules: [{required: true, message: '请选择配置类型'}]
               })(
                <Select>
                  <Select.Option value="0">否</Select.Option>
                  <Select.Option value="1">是</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>}
          <Col span={24}>
            <FormItem {...formItemLayout}>
              <Button
                onClick={()=>this.handleSearch("search")}
                type="primary"
                className="queryDataBtn"
              >
                查询
              </Button>
              <Button onClick={this.handleReset} className="queryDataBtn">
                清空
              </Button>
              {(tabKey==="1"||tabKey==="3")?<Button
                onClick={()=>this.handleSearch("change")}
                type="primary"
                className="queryDataBtn"
              >
                变更线上状态
              </Button>:null}
              {(tabKey==="1"||tabKey==="3")?<Button
                onClick={()=>this.handleSearch("download")}
                type="dashed"
                className="queryDataBtn"
                // disabled
              >
                下载配置
              </Button>:null}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
const WrapperQueryForm = Form.create()(QueryForm);
