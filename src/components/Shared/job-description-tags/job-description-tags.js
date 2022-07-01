import React, { Component } from "react";
import PropTypes from 'prop-types';
import './job-description-tags.css';

class JobDescriptionTags extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    // console.log(this.state.activeElem);

    return (
      <div className="jd-tag">{this.props.name}</div>
    );
  }
}

export default JobDescriptionTags;
