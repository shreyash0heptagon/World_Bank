import React, { Component } from "react";
import PropTypes from 'prop-types';
import './digital-summary.css';
import api from "../../Services/apiService";

import JobDescriptionTags from "../../Shared/job-description-tags/job-description-tags";
import SelectionCriteriaTags from "../../Shared/selection-criteria-tags/selection-criteria-tags";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { Modal } from "react-bootstrap";
import { Slider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import Tooltip from '@mui/material/Tooltip';

import TrashIcon from '../../../assets/trash.svg'

class DigitalSummary extends Component {

  constructor(props) {
    super(props);
    this.state = { isOpen: false, skData: this.props.skData, modalData: { keywords: [] }, modalKeywordsComponent: '', addNewKeyword: '', addNewKeywordWeight: 1, comments: '' };
  }

  changeActiveElem = (activeElem) => {
    this.setState({
      activeElem: activeElem
    });
  }

  openModal = (keyword_component) => {
    this.setState({ modalData: keyword_component })
    this.setState({ isOpen: true })
  }

  closeModal = () => this.setState({ isOpen: false });

  changeNewKeywordWeight = (keyword_weight) => {
    this.setState({ addNewKeywordWeight: keyword_weight })
  }

  changeNewKeyword = (keyword) => {
    this.setState({ addNewKeyword: keyword })
  }

  // deleteKeywords = () => {

  // }

  saveKeywords = () => {
    let modalData = {
      digital_summary_component_id: this.state.modalData.keywords[0].digital_summary_component_id,
      vacancy_id: this.props.vacancyId,
      comments: this.state.comments,
      keyword_list: this.state.modalData.keywords,
      digital_summary_component_id: this.state.modalData.keywords[0].digital_summary_component_id
    }
    modalData.keyword_list = modalData.keyword_list.map(function (keyword) {
      let keywordObj = {
        id: keyword.id,
        keyword: keyword.keyword,
        weightage: keyword.weightage
      }
      return keywordObj
    })
    if (this.state.addNewKeyword != '') {
      let newKeywordObj = {
        id: '',
        keyword: this.state.addNewKeyword,
        weightage: this.state.addNewKeywordWeight
      }
      modalData.keyword_list.push(newKeywordObj)
    }

    console.log(modalData)
    api.axiosCall('/api/v1/vacancy/saveVacancyKeyword', modalData, 'POST', '').then((result) => {
      if (result.statusCode === 200) {
        console.log(result)
        this.getVacancyDetails(this.props.vacancyId)
        this.setState({ isOpen: false })
      }
    });
  }

  getVacancyDetails = (vacancy_id) => {
    api.axiosCall('/api/v1/vacancy/vacancyDetail', { id: vacancy_id }, 'POST', '').then((result) => {
      if (result.statusCode === 200) {
        this.setState({ skData: result.data.selection_keyword })
      }
    });
  }

  componentDidMount() {
    console.log(this.state.skData)
  }

  render() {

    var self = this

    var jd_item = this.props.jdData.map(function (item) {
      var keyword_components = item.keywords.map(function (keyword) {
        return (
          <JobDescriptionTags name={keyword.keyword} />
        )
      })
      if (item.keywords.length == 0) {
        return (
          <div className="job-description-item">
            <h6 className="job-description-item-header">{item.component_name}</h6>
            <div className="row">
              <p className="empty-text">No {item.component_name} found.</p>
            </div>
          </div>
        )
      }
      return (
        <div className="job-description-item">
          <h6 className="job-description-item-header">{item.component_name}</h6>
          <div className="row">
            {keyword_components}
          </div>
        </div>
      )
    })

    var sk_item = this.state.skData.map(function (item) {
      var selection_keyword_components = item.keywords.map(function (keyword) {
        return (
          <Tooltip style={{ width: 'fit-content' }} title={keyword.keyword_label} placement="top-start" arrow><div><SelectionCriteriaTags name={keyword.keyword} weight={keyword.weightage} /></div></Tooltip>
        )
      })
      if (item.keywords.length == 0) {
        return (
          <div className="selection-criteria-item row" onClick={() => { self.openModal(item) }}>
            <div className="col-lg-8">
              <h6 className="selection-criteria-item-header">{item.component_name}</h6>
              <div className="row">
                <p className="empty-text">No keywords for {item.component_name.toLowerCase()} found.</p>
              </div>
            </div>
          </div>
        )
      }
      return (
        <div className="selection-criteria-item row" onClick={() => { self.openModal(item) }}>
          <div className="col-lg-8">
            <h6 className="selection-criteria-item-header">{item.component_name}</h6>
            <div className="row">
              {selection_keyword_components}
            </div>
          </div>
          <div className="col-lg-4 d-flex justify-content-end">
            <CircularProgressbar
              className="circular-progress-bar"
              value={item.weightage}
              text={item.weightage}
              maxValue={5}
              styles={buildStyles({
                pathTransitionDuration: 0.5,
                // Colors
                pathColor: `#1FB45E`,
                textColor: '#1FB45E',
                backgroundColor: '#1FB45E',
              })} />
          </div>
        </div>
      )
    })

    return (
      <div className="digital-summary-wrapper pt-2">
        <div className="row div-margin-x">
          <h3 className="digital-summary-header mb-4 p-0 col-lg-5">Vacancy No: {this.props.vacancyCode}, {this.props.jobTitle}</h3>
        </div>
        <div className="digital-summary mt-2 div-margin-x row">
          <div className="job-description col-lg-6">
            <h4 className="job-description-header">JOB DETAILS</h4>
            {jd_item}
          </div>
          <div className="selection-criteria selection-criteria-selector col-lg-6">
            <h4 className="selection-criteria-header">SELECTION CRITERIA</h4>
            {sk_item}
          </div>
        </div>
        <Modal show={this.state.isOpen} onHide={this.closeModal} className="modal-component">
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">{this.state.modalData.component_name}</Modal.Title>
          </Modal.Header>
          <Scrollbars style={{ height: "80vh" }}>
            <Modal.Body className="modal-body">
              <div className="col-lg-12">
                <div className="overall-rating-wrapper pt-4 row">
                  <div className="col-lg-6 p-0">
                    <p className="rating-title">Overall</p>
                  </div>
                  <div className="col-lg-6">
                    <Slider
                      defaultValue={this.state.modalData.weightage}
                      min={1}
                      step={1}
                      max={5}
                      graduated
                      renderMark={mark => {
                        return mark;
                      }}
                    />
                  </div>
                </div>
                <hr className="col-lg-12"></hr>
                {
                  this.state.modalData.keywords.map(function (item) {
                    return (
                      <div className="overall-rating-wrapper py-2 row">
                        <div className="col-lg-6 p-0 d-flex">
                          <p className="rating-title">{item.keyword}</p><img src={TrashIcon} alt="" className="delete-keyword-icon" />
                        </div>
                        <div className="col-lg-6">
                          <Slider
                            defaultValue={item.weightage}
                            min={1}
                            step={1}
                            max={5}
                            barClassName="modal-slider-elem"
                            graduated
                            renderMark={mark => {
                              return mark;
                            }}
                          />
                        </div>
                      </div>
                    )
                  })
                }
                <div className="overall-rating-wrapper pt-4 row">
                  <div className="col-lg-6 p-0">
                    <input type="text" placeholder="Enter Keyword" className="new-keyword-input col-lg-7" onChange={event => this.changeNewKeyword(event.target.value)} />
                  </div>
                  <div className="col-lg-6">
                    <Slider
                      defaultValue={0}
                      min={1}
                      step={1}
                      max={5}
                      graduated
                      onChange={(value) => this.changeNewKeywordWeight(value)}
                      renderMark={mark => {
                        return mark;
                      }}
                    />
                  </div>
                </div>
                <hr className="col-lg-12"></hr>
                <div className="col-lg-12">
                  <p className="comments-label">Comments:</p>
                  <textarea className="tag-comments col-lg-12" value={this.state.modalData.comments} rows={4} />
                </div>
                <div className="save-btn mt-2 my-4 col-lg-12" onClick={this.saveKeywords}>Save</div>
              </div>
            </Modal.Body>
          </Scrollbars>
        </Modal>
      </div>
    );
  }
}

export default DigitalSummary;
