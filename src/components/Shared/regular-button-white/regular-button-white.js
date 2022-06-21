import React, { Component } from "react";
import PropTypes from 'prop-types';
import './regular-button-white.css';

class RegularButtonWhite extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    // console.log(this.state.activeElem);

    return (
      <div style={this.props.style} className="regular-button" onClick={() => this.props.onClick(this.props.name)}>{this.props.name}{this.props.icon ? <img src={this.props.icon} alt="" className="custom-icon" /> : ''}</div>
    );
  }
}

export default RegularButtonWhite;
