import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Select, Form, Row, Col } from "antd";
import { randomNamber } from "../../util/publicFuc";
import $fetch from "../../util/fetch";
import "./selectSubModule.less";

const FormItem = Form.Item;
const Option = Select.Option;

//因antd版本不支持，创建loading组件
function Loading(props) {
  const loadingStatus = props.loadingStatus;
  const itemCol = props.itemCol;
  const emptyItemName = `ant-col-${itemCol} loading-empty`;
  if (loadingStatus === true) {
    return (
      <div className="loadingDIY">
        <div className={emptyItemName} />
        <div className="ant-col-16">
          <div className="loadingImage" />
          <span className="loadingText">获取中，请稍后···</span>
        </div>
      </div>
    );
  } else {
    return <div className="loadingDIY" />;
  }
}
class SelectSubModule extends PureComponent {
  static contextTypes = {
    router: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      moduleCodeList: [], //层级选择完成后，请求的模块名数组
      subModuleCodeList: [], //模块选择完成后，请求的子模块数组
      loadingModule: false, //控制select2(选择模块)的loading状态
      loadingSubModule: false, //控制select3(选择子模块)的loading状态
      disabledModule: true, //module的disabled状态
      disabledSubModule: true //subModule的disabled状态
    };
  }
  componentDidMount() {
    this.queryModule();
  }

  // 根据层级查询模块
  queryModule = level => {
    $fetch({
      url:
        "/tesla-gateway-console-app/approve/querySgModuleCommonConfigApproveList",
      data: {
        sgModuleCommonConfigApproveVo: {
          page: {
            doPagination: false
          }
        }
      }
    }).then(res => {
      if (res.reply.returnCode.type == "S") {
        let moduleCodeList = [];
        let moduleList = res.reply.result.configList;
        for (let i = 0; i < moduleList.length; i++) {
          moduleCodeList.push({
            moduleCode: moduleList[i].moduleCode,
            moduleName: moduleList[i].moduleName
          });
        }
        this.setState({
          moduleCodeList,
          loadingModule: false,
          disabledModule: false
        });
      }
    });
  };

  // 根据模块查询子模块
  querySubModule = moduleCode => {
    $fetch({
      url:
        "/tesla-gateway-console-app/approve/querySgSubmoduleCommonConfigApproveList",
      data: {
        sgSubmoduleCommonConfigApproveVo: {
          moduleCode,
          page: {
            doPagination: false
          }
        }
      }
    }).then(res => {
      if (res.reply.returnCode.type === "S") {
        let subModuleCodeList = [];
        let subModuleConfigList = res.reply.result.list;
        for (let i = 0; i < subModuleConfigList.length; i++) {
          subModuleCodeList.push({
            subModuleCode: subModuleConfigList[i].subModuleCode,
            subModuleName: subModuleConfigList[i].subModuleName
          });
        }
        this.setState({
          subModuleCodeList,
          loadingSubModule: false,
          disabledSubModule: false
        });
      }
    });
  };

  //所属模块选择后调用此方法
  moduleChange = val => {
    //清空下面的表单值
    this.props.form.resetFields(["subModuleCode"]);
    this.subModuleChange("");
    this.setState(
      {
        subModuleCodeList: [],
        loadingSubModule: val ? true : false,
        disabledSubModule: true
      },
      () => {
        if (val) {
          this.querySubModule(val);
        }
      }
    );
  };
  //所属子模块选择后调用此方法
  subModuleChange = val => {
    let subModuleCode = val ? val : "";
    //将最后一个select框值（val）存入状态subModuleCode，然后利用父组件callbackParent，将此值传入父组件处理
    this.setState(
      {
        subModuleCode
      },
      () => {
        this.props.callbackParent(this.state.subModuleCode);
      }
    );
  };
  render() {
    const { mode, itemCol, wrapperCol, form } = this.props;
    const itemColTier = itemCol ? itemCol : 8;
    const wrapperColTier = wrapperCol ? wrapperCol : 16;
    const formItemLayout = {
      labelCol: { span: itemColTier },
      wrapperCol: { span: wrapperColTier }
    };
    const modeTier = mode ? mode : "";
    const { getFieldDecorator } = form;
    const {
      loadingModule,
      loadingSubModule,
      disabledModule,
      disabledSubModule,
      moduleCodeList,
      subModuleCodeList
    } = this.state;

    //所属模块
    let moduleGroup =
      moduleCodeList.length > 0
        ? moduleCodeList.map(item => {
            return (
              <Option key={item.moduleCode} value={item.moduleCode}>
                {`${item.moduleName}(${item.moduleCode})`}
              </Option>
            );
          })
        : null;
    //所属子模块
    let subModuleGroup =
      subModuleCodeList.length > 0
        ? subModuleCodeList.map(item => {
            return (
              <Option key={item.subModuleCode} value={item.subModuleCode}>{`${
                item.subModuleName
              }(${item.subModuleCode})`}</Option>
            );
          })
        : null;

    return (
      <Form className="tierForm">
        <Row>
          <Col span={12}>
            <FormItem label="模块：" {...formItemLayout}>
              {getFieldDecorator("moduleCode", {
                rules: [{ required: true, message: "请选择模块" }]
              })(
                <Select
                  onChange={this.moduleChange}
                  loading={loadingModule}
                  disabled={disabledModule}
                  allowClear
                  showSearch
                >
                  {moduleGroup}
                </Select>
              )}
            </FormItem>
            <Loading loadingStatus={loadingModule} itemCol={itemColTier} />
          </Col>
          <Col span={12}>
            <FormItem label="服务单元：" {...formItemLayout}>
              {getFieldDecorator("subModuleCode", {
                rules: [{ required: true, message: "请选择服务单元" }]
              })(
                <Select
                  onChange={this.subModuleChange}
                  loading={loadingSubModule}
                  disabled={disabledSubModule}
                  allowClear
                  showSearch
                  mode={modeTier}
                >
                  {subModuleGroup}
                </Select>
              )}
            </FormItem>
            <Loading loadingStatus={loadingSubModule} itemCol={itemColTier} />
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(SelectSubModule);
