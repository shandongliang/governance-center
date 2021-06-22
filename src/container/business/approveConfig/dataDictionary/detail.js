import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Row, Col, Form, Tabs, Input, Select, Button } from 'antd'
import { querySgDictionaryApproveDetail } from '../requestA/service';
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item
const TabPane = Tabs.TabPane
class ExcelDetail extends Component {
  static contextTypes = {
    router: PropTypes.any
  }
  constructor(props, context) {
    super(props, context)
    this.state = {
      dataDetail: {}
    }
  }

  componentDidMount(){
    let dictionaryId = localStorage.getItem('dictionaryId')
    this.queryDetail(dictionaryId)
  }

  // 根据id查详情
  queryDetail = (id) => {
    let data = {
      id: id
    }
    querySgDictionaryApproveDetail(data).then(res=>{
      let dataDetail = res.reply.result.sgSubClassDictionary
      this.setState({
        dataDetail
      })
    })
  }
  // 返回列表页
  toBack = () => {
    let path = {
			pathname: '/approve/dataDictionary/index'
		};
		goToAndClose(path, "数据字典查询");
  }
  render(){
    const { dataDetail } = this.state
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="pandora-main-content">
          <div className="portlet-tab">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="数据字典详情" key="1">
                <Form>
                  <Row>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label='字典大类代码'>
                        {getFieldDecorator('dictionaryCode', 
                          {initialValue: dataDetail.dictionaryCode})
                          (<Input disabled />)
                        }
                      </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label='字典大类英文'>
                        {getFieldDecorator('bigClassKey', 
                          {initialValue: dataDetail.bigClassKey})
                          (<Input disabled />)
                        }
                      </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label='字典大类中文'>
                        {getFieldDecorator('bigClassName', 
                          {initialValue: dataDetail.bigClassName})
                          (<Input disabled />)
                        }
                      </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label='字典小类英文'>
                        {getFieldDecorator('subClassKey', 
                          {initialValue: dataDetail.subClassKey})
                          (<Input disabled />)
                        }
                      </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label='字典小类中文'>
                        {getFieldDecorator('subClassName', 
                          {initialValue: dataDetail.subClassName})
                          (<Input disabled />)
                        }
                      </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label='数据版本号'>
                        {getFieldDecorator('dataVersion', 
                          {initialValue: dataDetail.dataVersion})
                          (<Input disabled />)
                        }
                      </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label='审核状态'>
                        {getFieldDecorator('approveStatus', 
                          {initialValue: dataDetail.approveStatus})(
                            <Select disabled>
                              <Select.Option value='00'>未审核</Select.Option>
                              <Select.Option value='01'>审核通过</Select.Option>
                              <Select.Option value='11'>审核未通过</Select.Option>
                            </Select>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label='变更类型'>
                        {getFieldDecorator('changeType', 
                          {initialValue: dataDetail.changeType})(
                          <Select disabled>
                            <Select.Option key='00' value='00'>新增</Select.Option>
                            <Select.Option key='10' value='10'>修改</Select.Option>
                            <Select.Option key='01' value='01'>删除</Select.Option>
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                        <FormItem {...formItemLayout} label='审核意见'>
                          {getFieldDecorator('approveText', 
                          {initialValue: dataDetail.approveText})
                          (<Input type='textarea' disabled />)
                        }
                        </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                        <FormItem {...formItemLayout} label='变更说明'>
                          {getFieldDecorator('changeDescribe', 
                          {initialValue: dataDetail.changeDescribe})
                          (<Input type='textarea' disabled />)
                        }
                        </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                        <FormItem {...formItemLayout} label='字典小类描述'>
                          {getFieldDecorator('subClassText', 
                          {initialValue: dataDetail.subClassText})
                          (<Input type='textarea' disabled />)
                        }
                        </FormItem>
                    </Col>
                  </Row>
                  <Row type="flex" justify="center">
                    <Col span={24}>
                      <Button size="large" style={{marginLeft: 10}} onClick={this.toBack}>取消</Button>
                    </Col>
                  </Row>
                </Form>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}
export default ExcelDetail = Form.create()(ExcelDetail);