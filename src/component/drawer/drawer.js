import React, { Component } from "react";
import PropTypes from "prop-types";
import "./drawer.less";
import { Icon } from "antd";

class Drawer extends Component {
  static contextTypes = {
    router: PropTypes.any
  };
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    footer: PropTypes.array
  };
  static defaultProps = {
    visible: false,
    onClose: () => {},
    title: "标题",
    fotter: [],
    destroyOnClose: false
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      isDesChild: false
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.visible&&nextProps.destroyOnClose){
      this.setState({
        isDesChild: false
      })
    }
  }

  handleClose = () => {
    const { destroyOnClose, onClose } = this.props;
    this.props.onClose();
    if(destroyOnClose){
      this.setState({
        isDesChild: true
      })
    }
  };

  render() {
    const { isDesChild } = this.state;
    const { width = "300px", onClose, children, visible, title } = this.props;

    return (
      <div className="container" style={visible ? { left: 0, right: 0 } : {}}>
        <div className="mask" onClick={this.handleClose} />
        <div className="drawer" style={{ width, right: visible ? "0" : "-100%" }}>
          <h5 className="title">{title}</h5>
          <div className="body">{isDesChild?null:children}</div>
          <Icon type="close-circle-o" className="closeBtn" onClick={this.handleClose} />
        </div>
      </div>
    );
  }
}

export default Drawer;
