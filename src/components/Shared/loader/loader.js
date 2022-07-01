import React, { Component } from "react";
import PropTypes from 'prop-types';
import './loader.css';

import WorldBankLogo from '../../../assets/World_Bank_Group_logo.svg';
import Loader from "react-loader-spinner";

class LoaderScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <div className="loader d-flex">
        <div className="m-auto w-100 text-center">
          <img className="icon" src={WorldBankLogo} />
          <Loader
            type="ThreeDots"
            color="#FFFFFF"
            height={80}
            width={80}
          />
        </div>
      </div>
    );
  }
}

export default LoaderScreen;