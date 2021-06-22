import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Icon,
  Button,
  Select,
  message,
  Tabs,
  Form,
  Row,
  Col,
  Input,
  Modal,
  Radio,
  Transfer,
  Spin,
  Tag
} from "antd";
import EditableTable from "../editableTable/editableTable";
import "../../container/common/style/index.less";
import debounce from 'lodash/debounce';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

export default class AccessInfoConfig extends React.Component {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);
    this.lastFetchId = 0;
    this.queryAllModuleAndServiceUnit = debounce(this.queryAllModuleAndServiceUnit, 800);
    this.state = {
      moduleCode: "",
      isAccessActive: true,
      allModuleAndSubModule: [],
      whiteList: [],
      blackList: [],
      whiteSelectList: [],
      blackSelectList: [],
      accessControlType: "MOUDLE_INNER_VISIBLE",
      coveredAccess: true,
      testAccessVisible: false,
      queryAccessVisible: false,
      testResult: "",
      whiteFetching: false,
      blackFetching: false
    };
  }
  componentDidMount() {
    this.setInitialValue();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.moduleCode !== this.props.moduleCode){
      this.setState({
        moduleCode: nextProps.moduleCode
      })
    }
  }

  async setInitialValue() {
    const { accessInfoConfig = {}, disabled=false, allModuleAndSubModule, form, moduleCode } = this.props;
    const { isAccessActive, accessControlType, coveredAccess, blackAccess, whiteAccess } = accessInfoConfig;
    let accessControlTypeConfig = accessControlType?accessControlType:"MOUDLE_INNER_VISIBLE";
    this.setState({
      accessControlType: accessControlTypeConfig,
      isAccessActive: typeof(isAccessActive)==="boolean"?isAccessActive:true,
      coveredAccess: typeof(coveredAccess)==="boolean"?coveredAccess:false,
      whiteSelectList: whiteAccess?whiteAccess:[],
      blackSelectList: blackAccess?blackAccess:[],
      // whiteList: whiteAccess?whiteAccess:[],
      // blackList: blackAccess?blackAccess:[],
      moduleCode
    })
  }

  getModuleAndSubModule = (configList = [], type) => {
    const { accessControlType } = this.state;
    const { moduleCode } = this.props;
    let whiteList = [], blackList = [];
    if(accessControlType === "MOUDLE_INNER_VISIBLE"){
      configList.forEach((item, index)=>{
        if(item.moduleCode === moduleCode){
          if(item.serviceUnitCode && type === "black"){
            blackList.push(item.serviceUnitCode);
          }
        } else {
          if(item.serviceUnitCode && type === "white"){
            whiteList.push(item.serviceUnitCode)
          } else if(item.moduleCode && type === "white"){
            whiteList.push(item.moduleCode)
          }
        }
      })
    } else {
      configList.forEach((item, index) => {
        let key;
        if(item.serviceUnitCode){
          key = item.serviceUnitCode
        } else if(item.moduleCode){
          key = item.moduleCode
        }
        if(accessControlTypeConfig === "MOUDLE_BETWEEN_VISIBLE"){
          blackList.push(key);
        } else if(accessControlTypeConfig === "INVISIBLE"){
          whiteList.push(key);
        }
      });
    }
    this.setState({
      whiteList,
      blackList,
      whiteFetching: false,
      blackFetching: false
    })
  }

  returnAccessInfoConfig = () => {
    const { whiteSelectList, blackSelectList } = this.state;
    this.props.returnAccessInfoConfig(whiteSelectList, blackSelectList)
  }

  testAccess = value => {
    const { accessControlType, blackSelectList, whiteSelectList } = this.state;
    let testResult = "";
    if(accessControlType ===  "INVISIBLE"){
      if(whiteSelectList.includes(value)){
        testResult = `${value}可见`;
      } else {
        testResult = `${value}不可见`
      }
    } else if(accessControlType ===  "MOUDLE_BETWEEN_VISIBLE"){
      if(blackSelectList.includes(value)){
        testResult = `${value}不可见`;
      } else {
        testResult = `${value}可见`;
      }
    } else if(accessControlType ===  "MOUDLE_INNER_VISIBLE"){
      if(whiteSelectList.includes(value)){
        testResult = `${value}可见`;
      } else if(blackSelectList.includes(value)){
        testResult = `${value}不可见`;
      }
    }
    this.setState({
      testResult
    })
  }

  getAccessControlType = accessControlType => {
    let text = "";
    if(accessControlType === "INVISIBLE"){
      text = "都不可见";
    } else if(accessControlType === "MOUDLE_INNER_VISIBLE"){
      text = "模块内可见";
    } else if(accessControlType === "MOUDLE_BETWEEN_VISIBLE"){
      text = "模块间可见";
    }
    return text;
  }

  hideModal = () => {
    this.setState({
      testAccessVisible: false,
      queryAccessVisible: false,
      testResult: ""
    })
  }

  isAccessActiveChange = value => {
    let isAccessActive = value.target.value;
    this.setState({
      isAccessActive
    });
    this.props.isAccessActiveChange(isAccessActive);
  };

  queryAllModuleAndServiceUnit = (value, type) => {
    if(!value){
      return
    }
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    if(type === "white"){
      this.setState({ whiteList: [], whiteFetching: true });
    } else {
      this.setState({ blackList: [], blackFetching: true });
    }
    let data = {
      key: value,
      page: {
        doPagination: false
      }
    }
    this.props.queryAllModuleAndServiceUnit(data).then(res => {
      let codeList = res.reply.result;
      this.getModuleAndSubModule(codeList, type)
    })
  }

  handleChange = async (value, type) => {
    // let configList = value.map(item => item);
    if(type === "white"){
      await this.setState({ whiteSelectList: value});
    } else {
      await this.setState({ blackSelectList: value});
    }
    await this.setState({
      whiteFetching: false,
      blackFetching: false
    });
    this.returnAccessInfoConfig();
  }

  render() {
    const { isAccessActive, blackList, whiteList, blackSelectList, whiteSelectList, accessControlType, testAccessVisible, coveredAccess, queryAccessVisible, testResult, whiteFetching, blackFetching } = this.state;
    const { form, moduleType = "", disabled = false,  allModuleAndSubModule = [] } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 }
    };
    const buttonStyle = {
      borderRadius: 5,
      margin: 5
    }
    return (
      <div>
        <Modal
          title="权限测试"
          visible={testAccessVisible}
          // onOk={this.testAccess}
          onCancel={this.hideModal}
          footer={null}
        >
          <Row type="flex" align="middle" style={{margin: 20}}>
            <Col span={6}>选择模块:</Col>
            <Col span={18}>
              <Select style={{width: "100%"}} onChange={value=>this.testAccess(value)} showSearch>
                {allModuleAndSubModule.map(item => (
                  <Option value={item.key}>{item.key}</Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>测试结果:</Col>
            <Col span={18}>{testResult}</Col>
          </Row>
        </Modal>
        <Modal
          title="查看权限控制视图"
          visible={queryAccessVisible}
          // onOk={this.testAccess}
          onCancel={this.hideModal}
          footer={null}
        >
          <Row type="flex" align="middle" style={{margin: 20}}>
            <Col span={7}>权限控制策略类型:</Col>
            <Col span={17}>{this.getAccessControlType(accessControlType)}</Col>
            <Col span={7}>是否合并上级:</Col>
            <Col span={17}>{coveredAccess?"是":"否"}</Col>
            <Col span={7}>白名单:</Col>
            <Col span={17}>{whiteSelectList.join(", ")}</Col>
            <Col span={7}>黑名单:</Col>
            <Col span={17}>{blackSelectList.join(", ")}</Col>
          </Row>
        </Modal>
        <Tabs defaultActiveKey="1" style={{ marginBottom: 7 }}>
          <TabPane
            tab={
              <span>
                访问控制策略配置
                <span style={{ color: "green", fontSize: 16, marginLeft: 40 }}>
                  <Radio.Group
                    value={isAccessActive}
                    onChange={this.isAccessActiveChange}
                    disabled={disabled}
                  >
                    <Radio value={true}>启用</Radio>
                    <Radio value={false}>停用</Radio>
                  </Radio.Group>
                </span>
              </span>
            }
            key="1"
          >
            {/* {status === "Y" && ( */}
              {isAccessActive?<div>
                <Row style={{ marginTop: 10 }}>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="权限控制策略类型">
                      {getFieldDecorator("accessControlType", {
                        initialValue: accessControlType,
                        // rules: [{ required: true, message: "请选择权限控制策略类型" }]
                      })(
                        <Select disabled={disabled} style={{width: "100%"}} onChange={value=>this.setState({accessControlType: value})}>
                          <Option value="MOUDLE_BETWEEN_VISIBLE">模块间可见</Option>
                          <Option value="MOUDLE_INNER_VISIBLE">模块内可见</Option>
                          <Option value="INVISIBLE">都不可见</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  {moduleType !== "module"?<Col span={12}>
                    <FormItem {...formItemLayout} label="是否合并上级">
                      {getFieldDecorator("coveredAccess", {
                        initialValue: coveredAccess,
                        // rules: [{ required: true, message: "请选择是否合并上层配置" }]
                      })(
                        <Select disabled={disabled} style={{width: "100%"}} onChange={value=>this.setState({coveredAccess: value})}>
                          <Option value={true}>是</Option>
                          <Option value={false}>否</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>:null}
                  </Row>
                  <Row>
                  {accessControlType==="MOUDLE_BETWEEN_VISIBLE"?null:<Col span={11}>
                    <p>配置白名单</p>
                    <Select
                      mode="multiple"
                      value={whiteSelectList}
                      notFoundContent={whiteFetching ? <Spin size="small" /> : null}
                      filterOption={false}
                      onSearch={value => this.queryAllModuleAndServiceUnit(value, "white")}
                      onChange={value => this.handleChange(value, "white")}
                      style={{ width: '100%' }}
                      disabled={disabled}
                    >
                      {whiteList.map(d => <Option value={d} key={d}>{d}</Option>)}
                  </Select>
                  </Col>}
                  {accessControlType==="INVISIBLE"?null:<Col span={11} offset={2}>
                    <p>配置黑名单</p>
                    <Select
                      mode="multiple"
                      value={blackSelectList}
                      notFoundContent={blackFetching ? <Spin size="small" /> : null}
                      filterOption={false}
                      onSearch={value => this.queryAllModuleAndServiceUnit(value, "black")}
                      onChange={value => this.handleChange(value, "black")}
                      style={{ width: '100%' }}
                      disabled={disabled}
                    >
                      {blackList.map(d => <Option value={d} key={d}>{d}</Option>)}
                  </Select>
                  </Col>}
                </Row>
              </div>:null}
              {disabled?null:<Row>
                <Button type="primary" style={buttonStyle} onClick={()=>this.setState({testAccessVisible: true})}>测试权限</Button>
                <Button type="primary" style={buttonStyle} onClick={()=>this.setState({queryAccessVisible: true})}>查看权限控制视图</Button>
              </Row>}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
