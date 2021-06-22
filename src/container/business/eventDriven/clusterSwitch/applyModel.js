
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
import { goTo, goToAndClose } from '../../../../util/tabRouter';

const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;



class ApplyCreateModel extends PureComponent {

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
        // console.log(this.props);
        this.props.onRef(this)
        // console.log(this.props);
        this.props.onRef(this)



    }

    toIndex = () => {
        let path = {
          pathname: '/consumer/index'
        };
        goTo(path, "消费者查询");
    }
    forDate = (date) => {
        // console.log('70', date);

        this.handleSubmit()

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

    cengji = (itm) => {
        if (itm == '01') {
            return '行内渠道接入层';
        } else if (itm == '02') {
            return '行外渠道接入层';
        } else if (itm == '03') {
            return '业务协同层';
        } else if (itm == '04') {
            return '服务集成层';
        } else if (itm == '05') {
            return '产品服务层';
        } else if (itm == '06') {
            return '管理分析层';
        }
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 15 }
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='applySwitch'>
                <Form onSubmit={this.handleSubmit} autoComplete='on' >
                    <Row >


                        <FormItem label="更改集群"  {...formItemLayout}>
                            {getFieldDecorator('targetLDC', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true, message: '请选择集群'
                                    },
                                ],
                            })(
                                <Select  >
                                    <Option value="M">M-马坡 m1</Option>
                                    <Option value="P">P-鹏博士m2</Option>
                                    <Option value="Z">Z-郑州</Option>
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
})(ApplyCreateModel)