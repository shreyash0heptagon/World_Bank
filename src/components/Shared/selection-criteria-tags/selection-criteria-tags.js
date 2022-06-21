import React, { Component } from "react";
import PropTypes from 'prop-types';
import './selection-criteria-tags.css';

class SelectionCriteriaTags extends Component {

  constructor(props) {
    super(props);
    switch (props.weight) {
      case "1":
        this.tagColor = '#B9D48D'
        this.weightColor = '#538E54'
        break
      case "2":
        this.tagColor = '#B9D48D'
        this.weightColor = '#538E54'
        break
      case "3":
        this.tagColor = '#96F4D2'
        this.weightColor = '#439775'
        break
      case "4":
        this.tagColor = '#CCF8D8'
        this.weightColor = '#1FB45E'
        break
      case "5":
        this.tagColor = '#CCF8D8'
        this.weightColor = '#1FB45E'
        break
    }
    this.state = {};
  }

  tagColor = ''
  weightColor = ''

  render() {

    // console.log(this.state.activeElem);

    return (
      <div style={{ backgroundColor: this.tagColor }} className="sc-tag d-flex align-items-center"><span className="sc-name">{this.props.name}</span><div style={{ backgroundColor: this.weightColor }} className="weightage-value">{this.props.weight}</div></div>
    );
  }
}

export default SelectionCriteriaTags;
