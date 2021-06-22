import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Row, Col, Form, Tabs, Input, Button, message, Modal } from 'antd'
import { querySgMailContactApproveList, editSgMailContactApprove } from '../requestA/service';
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const FormItem = Form.Item
const TabPane = Tabs.TabPane
const confirm = Modal.confirm;
class ModuleContactEdit extends Component {
    static contextTypes = {
      router: PropTypes.any
  }
  constructor(props, context) {
    super(props, context)
    this.state = {
      dataDetail: {},
      list: []
    }
  }

  componentDidMount(){
    const { moduleCode } = this.props.location.state
    let data = {
      moduleCode,
      contactLevel: "0"
    }
    this.queryModuleContact(data)
  }
  // 查询模块联系人
  queryModuleContact = (data) => {
    querySgMailContactApproveList(data).then((res) => {
        let dataDetail = res.reply.result.sgMailContactApproveModuleList[0]
        let list = dataDetail.children===null?[]:dataDetail.children.map(item=>{
          return {
            ...item,
            show: true
          }
        })
        this.setState({
          dataDetail,
          list: list
        },()=>{
            // console.log(this.state)
        })
    })
  }
  // 添加联系人
  addContact = () => {
    let list = this.state.list
    list.push({
      contact: '',
      email: '',
      phone: '',
      show: true
    })
    this.setState({
      list
    })
  }
  // 删除联系人
  deleteContact = (index) => {
    let list = this.state.list
    let _this = this;
    confirm({
        title: `你确定删除此联系人吗？`,
        okText: "确定",
        cancelText: "取消",
        onOk(){
          list[index].show = false
          _this.setState({
            list
          })
        },
        onCancel(){
            return
        },
    })
  }
  // 返回列表页
  submitEdit = () => {
    let list = []
    this.props.form.validateFields((err, values) => {
      if(err){
        return
      }
      this.state.list.map((item,index)=>{
        if(item.show){
          list.push({
            contact: values[`contact${index}`],
            email: values[`email${index}`],
            phone: values[`phone${index}`],
            key: `${this.state.dataDetail.moduleCode}${values[`email${index}`]}`
          })
        } 
      })
      let data = {
        sgMailContactApproveShow: {
          ...this.state.dataDetail,
          children: list
        }
      }
      editSgMailContactApprove(data).then(res=>{
        this.toBack();
      })
    })
  }
  // 返回列表页
  toBack = () => {
    let path = {
			pathname: '/approve/contact/module'
		};
		goToAndClose(path, "模块联系人");
  }
  render(){
    const { dataDetail, list } = this.state
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <div className="pandora-main-content">
          <div className="portlet-tab">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
              <TabPane tab="模块联系人编辑" key="1">
                <Form>
                  <Row>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label='模块编码'>
                        {getFieldDecorator('moduleCode', 
                          {initialValue: dataDetail.moduleCode})
                          (<Input disabled />)
                        }
                      </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                      <FormItem {...formItemLayout} label='模块名称'>
                        {getFieldDecorator('moduleName', 
                          {initialValue: dataDetail.moduleName})
                          (<Input disabled />)
                        }
                      </FormItem>
                    </Col>
                  </Row>
                  <Button onClick={this.addContact} size="large" type="dashed" icon="plus" style={{marginBottom:10}} >新增联系人</Button>
                  {this.state.list.length>0&&this.state.list.map((item,index)=>(
                    item.show&&<Row key = {index}>
                      <Col span={6}>
                        <FormItem {...formItemLayout} label='联系人'>
                          {getFieldDecorator(`contact${index}`, 
                            {
                              initialValue: item.contact,
                              rules: [{required: true, message: "请输入联系人姓名"}]
                            })
                            (<Input />)
                          }
                        </FormItem>
                      </Col>
                      <Col span={6}>
                        <FormItem {...formItemLayout} label='邮箱'>
                          {getFieldDecorator(`email${index}`, 
                            {
                              initialValue: item.email,
                              rules: [{required: true, message: "请输入邮箱"}]
                            })
                            (<Input />)
                          }
                        </FormItem>
                      </Col>
                      <Col span={6}>
                        <FormItem {...formItemLayout} label='电话'>
                          {getFieldDecorator(`phone${index}`, 
                            {
                              initialValue: item.phone,
                              rules: [{required: true, message: "请输入电话"}]
                            })
                            (<Input />)
                          }
                        </FormItem>
                      </Col>
                      <Col span={4} offset={1}>
                        <Button type="danger" onClick={()=>this.deleteContact(index)}>删除</Button>
                      </Col>
                    </Row>
                  ))}
                  <Row type="flex" justify="center">
                    <Col span={24}>
                      <Button size="large" type="primary" onClick={this.submitEdit}>提交</Button>
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
export default ModuleContactEdit = Form.create()(ModuleContactEdit)