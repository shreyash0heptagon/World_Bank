import React, { Component } from "react";
import PropTypes from 'prop-types';
import './regular-input.css';
import SearchIcon from '../../../assets/feather-search.svg'

class RegularInput extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  search = (val) => {
    console.log(this.props.RegularInput(val));
  }

  render() {

    // console.log(this.state.activeElem);

    return (
      <input type="text" placeholder={this.props.placeholder} className="regular-input mx-3" onChange={event => this.props.onChange(event.target.value)} />
    );
  }
}

export default RegularInput;
