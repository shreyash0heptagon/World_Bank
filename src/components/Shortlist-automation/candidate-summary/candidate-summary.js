import React, { Component } from "react";
import PropTypes from 'prop-types';
import './candidate-summary.css';

import VisibilitySensor from "react-visibility-sensor";

import SelectionCriteriaTags from "../../Shared/selection-criteria-tags/selection-criteria-tags";
import CompareSelectionCriteriaTags from "../../Shared/compare-selection-criteria-tags/compare-selection-criteria-tags";

import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Tooltip from '@mui/material/Tooltip';

class CandidateSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  changeActiveElem = (activeElem) => {
    this.setState({
      activeElem: activeElem
    });
  }

  componentDidMount() {
  }

  render() {
    console.log(this.props.keywordsData);

    var keywordItem = this.props.keywordsData.map(function (item) {
      console.log(item)
      var keyword_components = item.keywords.map(function (keyword) {
        var hoverMappingDetails = keyword.candidate_keyword_mapping.map(function (keyword_label) {
          return (
            <li>{keyword_label.keyword_label}</li>
          )
        })
        return (
          <Tooltip style={{ width: 'fit-content' }} title={hoverMappingDetails} placement="top-start" arrow><span><CompareSelectionCriteriaTags name={keyword.keyword} weight={Math.round(keyword.keyword_total_score)} colorCode={keyword.color_score} /></span></Tooltip>
        )
      })
      if (item.keywords.length == 0) {
        return (
          <div className="col-lg-6 px-2 candidate-summary">
            <div className="selection-criteria-item row">
              <div className="col-lg-8">
                <h6 className="selection-criteria-item-header">{item.component_name}</h6>
                <div className="row">
                  <p className="empty-text">No keywords for {item.component_name.toLowerCase()} found.</p>
                </div>
              </div>
              <div className="col-lg-4 m-auto">
                <VisibilitySensor>
                  {({ isVisible }) => {
                    const value = isVisible ? item.total_score : 0;
                    return (
                      <div className="progressbar-wrapper">
                        <CircularProgressbarWithChildren
                          className="sample"
                          value={0}
                          maxValue={25}
                          styles={buildStyles({
                            pathTransitionDuration: 3.0,
                            // Colors
                            pathColor: `#1B7AF6`,
                            textColor: '#1B7AF6',
                            backgroundColor: '#1FB45E',
                          })} >
                        </CircularProgressbarWithChildren>
                      </div>
                    );
                  }}
                </VisibilitySensor>
              </div>
            </div >
          </div >
        )
      }
      return (
        <div className="col-lg-6 px-2 candidate-summary">
          <div className="selection-criteria-item row">
            <div className="col-lg-8">
              <h6 className="selection-criteria-item-header">{item.component_name}</h6>
              <div className="row">
                {keyword_components}
              </div>
            </div>
            <div className="col-lg-4 m-auto">
              <VisibilitySensor>
                {({ isVisible }) => {
                  const value = isVisible ? item.total_score : 0;
                  return (
                    <div className="progressbar-wrapper">
                      <CircularProgressbarWithChildren
                        className="sample"
                        value={value}
                        maxValue={item.component_total_score}
                        styles={buildStyles({
                          pathTransitionDuration: 3.0,
                          // Colors
                          pathColor: `#1B7AF6`,
                          textColor: '#1B7AF6',
                          backgroundColor: '#1FB45E',
                        })} >
                        <div className="summary-section" style={{ fontSize: 12, marginRight: '-31%', marginTop: '61%', textAlign: 'center' }}>
                          <strong className="summary-overall-value-label">{item.total_score}</strong><strong className="summary-overall-value-label" style={{ color: '#454F5B' }}> {'/ ' + item.component_total_score}</strong>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>
                  );
                }}
              </VisibilitySensor>
            </div>
          </div >
        </div >
      )
    })

    return (
      <div className="digital-summary-wrapper pt-2" >
        <div className="digital-summary mt-2 div-margin-x row">
          <div className="selection-criteria col-lg-12 row">
            <h4 className="selection-criteria-header">Digital Summary</h4>

            {keywordItem}

          </div>
        </div>
      </div>
    );
  }
}

export default CandidateSummary;
