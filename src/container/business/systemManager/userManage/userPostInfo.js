// 该组件由应用系统自行开发，组件名限定为 UserPostInfo ，不可更改；
//可将处理后的数据传递到父组件的 setPostInfoData 方法中，要求postIds的数据类型为String数组类型。
import React, { Component } from 'react';

export default class UserPostInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userPostInfoData: 'userPostInfo'
        }
    }

    componentDidMount() {
        let userId = this.props.userId;
        // 将处理后的数据传到父组件中
        this.props.setPostInfoData({
            componentName: 'rbac',
            funcName: 'editPostIds',
            postIds: ['post-tesla', 'post-pandora'],
        });
    }

    render() {
        return (
            <div></div>
        );
    }
}
