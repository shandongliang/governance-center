
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Breadcrumb, Icon, DatePicker, Button, TimePicker, Select, InputNumber, Checkbox, Upload, Modal, Tabs, message } from 'antd';
import { Form, Row, Col, Input, Radio } from 'antd';

import { DATE_FORMAT_MOMENT } from './../../../../constant/index';
import $fetch from '$fetch';
import { randomNamber, deploy } from './../../../../util/publicFuc';
import './../../../common/style/index.less';
import './clusterSwitch.less'
import { goTo, goToAndClose } from '../../../../util/tabRouter';
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;



class ClusterCreateModel extends PureComponent {

    static contextTypes = {
        router: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state = {

            clusterDate: [],
            data: []
        }
    }
    componentDidMount() {
        //console.log(this.props);
        this.props.onRef(this)
        let clusterDate = []
        for (let i = 0; i < this.props.clusterDate.length; i++) {
            if (this.props.clusterDate[i] != this.props.data.deployUnit) {
                clusterDate.push(this.props.clusterDate[i])
            }
        }
        this.setState({
            data: this.props.data,
            clusterDate: clusterDate
        }, () => {

            //console.log('46', this.state.data, this.state.clusterDate);
        })


    }

    toIndex = () => {
      let path = {
        pathname: '/consumer/index'
      };
      goTo(path, "消费者查询");
    }
    forDate = (date) => {
        //console.log('70', date);

        this.handleSubmit()

    }



    moduleThree = (val) => {

        this.setState({
            submoduleId: val,

        })
    }

    handleSubmit = (e) => {



        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                let param = this.state.data




               // console.log('169', param, values);
                this.props.callbackParent(values)
                this.setState({ loading: true });


            }
        })

    }
    timer = (t) => {

        return moment(t).format('YYYY-MM-DD')
    }
    timer1 = (t) => {

        return moment(t).format('YYYYMMDD')
    }
    status = (t) => {


        if (t == 'P') {
            return '审核通过'
        }
        if (t == 'W') {
            return '未审核'
        }
    }


    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 15 }
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='clusterSwitch'>
                <Form onSubmit={this.handleSubmit} autoComplete='on' >
                    <Row >

                        <FormItem label="当前逻辑集群"  {...formItemLayout}>
                            {getFieldDecorator('middlewareEngName', {
                                initialValue: this.state.data.middlewareEngName,
                                rules: [
                                    {
                                        required: true, message: '请选择集群'
                                    },
                                ],
                            })(<Input type="text" disabled />)}

                        </FormItem>

                        <FormItem label="当前集群单元"  {...formItemLayout}>
                            {getFieldDecorator('currentLDC', {
                                initialValue: this.state.data.deployUnit,
                                rules: [
                                    {
                                        required: true, message: '请选择集群'
                                    },
                                ],
                            })(<Select disabled>

                                <Option value={this.state.data.deployUnit}  >{deploy(this.state.data.deployUnit)}</Option>

                            </Select>)}

                        </FormItem>
                        <FormItem label="更改集群"  {...formItemLayout}>
                            {getFieldDecorator('targetLDC', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true, message: '请选择集群'
                                    },
                                ],
                            })(
                                <Select onChange={this.moduleThree} >
                                    {
                                        this.state.clusterDate ? this.state.clusterDate.map((item) => {

                                            return (
                                                <Option value={item} >{deploy(item)}</Option>
                                            )
                                        }) : null
                                    }

                                </Select>
                                )}

                        </FormItem>


                    </Row>
                </Form>
            </div>
        );
    }
}


export default Form.create({
    // onFieldsChange(props, changeFields) {
    //     props.onChange(changeFields);
    // },
    // mapPropsToFields(props){
    //     return {
    //         test:Form.createFormField({
    //             value:props.test,
    //         }),
    //         test1:Form.createFormField({
    //             value:props.test1,
    //         })
    //     }
    // },
    // onValuesChange(_, values) {
    //     console.log('192', values)
    // }
})(ClusterCreateModel)