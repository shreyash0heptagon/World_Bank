import React, { Component } from "react";
import PropTypes from 'prop-types';
import './compare-selection-criteria-tags.css';

class CompareSelectionCriteriaTags extends Component {

  constructor(props) {
    super(props);
    console.log(props.colorCode.toFixed(1))
    switch (props.colorCode.toFixed(1)) {
      case "0.0":
        this.weightColor = '#F83939'
        break
      case "0.1":
        this.weightColor = '#F83939'
        break
      case "0.2":
        this.weightColor = '#F83939'
        break
      case "0.3":
        this.weightColor = '#F83939'
        break
      case "0.4":
        this.weightColor = '#439775'
        break
      case "0.5":
        this.weightColor = '#439775'
        break
      case "0.6":
        this.weightColor = '#439775'
        break
      case "0.7":
        this.weightColor = '#1FB45E'
        break
      case "0.8":
        this.weightColor = '#1FB45E'
        break
      case "0.8":
        this.weightColor = '#1FB45E'
        break
      case "1.0":
        this.weightColor = '#1FB45E'
        break
    }
    this.state = {};
  }

  tagColor = '#EFEEEE'
  weightColor = ''

  render() {

    // console.log(this.state.activeElem);

    return (
      <div style={{ backgroundColor: this.tagColor }} className="sc-tag d-flex"><span className="keyword-text-value">{this.props.name}</span><div style={{ backgroundColor: this.weightColor }} className="weightage-value">{this.props.weight}</div></div>
    );
  }
}

export default CompareSelectionCriteriaTags;
