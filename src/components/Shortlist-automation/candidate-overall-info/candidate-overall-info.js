import React, { Component } from "react";
import PropTypes from 'prop-types';
import './candidate-overall-info.css';
import VisibilitySensor from "react-visibility-sensor";
import { useNavigate, useLocation } from 'react-router-dom';

import api from "../../Services/apiService";

import RegularButtonWhite from "../../Shared/regular-button-white/regular-button-white";
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import MailIcon from '../../../assets/mail.svg';
import PhoneIcon from '../../../assets/phone.svg';
import MapPinIcon from '../../../assets/map-pin.svg';
import FileIcon from '../../../assets/file-text.svg';

import CandidateSummary from "../candidate-summary/candidate-summary";

import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import LoaderScreen from "../../Shared/loader/loader";
import Header from '../../Shared/header/header';
import {Account} from '../../Services/Account';
import Rating from '@mui/material/Rating';

class CandidateOverallInfo extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true, candidateInfo: [], candidate_keywords: [], prev: '', next: '', changeCandidateToast: false,isLoggedIn:true };
    this.changeCandidate = this.changeCandidate.bind(this);
  }

  componentDidMount() {
    console.log(this.props)
    api.axiosCall('/api/v1/candidate/candidateDetail', { candidate_ids: [this.props.location.state.candidateId], vacancy_id: this.props.location.state.vacancyId }, 'POST', '').then((result) => {
      if (result.statusCode === 200) {
        this.setState({ candidateInfo: result.data[0].candidate_info, candidate_keywords: result.data[0].candidate_keywords, isLoading: false, prev: result.data[0].candidate_info.navigation.previous, next: result.data[0].candidate_info.navigation.next, changeCandidateToast: false })
      }
    });
  }

  changeCandidate(key) {
    console.log(this.state)
    this.setState({ isLoading: true })
    let targetId = key == 'Next' ? this.state.next : this.state.prev
    if (targetId) {
      api.axiosCall('/api/v1/candidate/candidateDetail', { candidate_ids: [targetId], vacancy_id: this.props.location.state.vacancyId }, 'POST', '').then((result) => {
        if (result.statusCode === 200) {
          this.setState({ candidateInfo: result.data[0].candidate_info, candidate_keywords: result.data[0].candidate_keywords, isLoading: false, prev: result.data[0].candidate_info.navigation.previous, next: result.data[0].candidate_info.navigation.next, changeCandidateToast: false })
        }
      });
    } else {
      this.setState({ isLoading: false, changeCandidateToast: true })
    }
  }

  redirectToJobRoleInfo = () => {
    this.props.navigate('/job-role-info', { state: { id: this.props.location.state.vacancyId } });
  }

  redirectToCandidateList = () => {
    this.props.navigate('/job-role-info', { state: { id: this.props.location.state.vacancyId, activeMenu: 'candidate-list' } });
  }

  render() {
    if (this.state.isLoading) {
      return <LoaderScreen />
    }

    const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => this.setState({ changeCandidateToast: false })}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );

    return (
      <>
      <Account><Header/></Account>
      <div className="candidate-overall-info-wrapper">
        <div className="nav-label-wrapper my-3">
          <div className="mx-3">
            <a className='nav-label' href={"/dashboard"}>Dashboard</a><label className="mx-2">{'>'}</label><a className='nav-label' onClick={this.redirectToJobRoleInfo}>{this.props.location.state.vacancyCode}, {this.props.location.state.jobTitle}</a><label className="mx-2">{'>'}</label><a className='nav-label' onClick={this.redirectToCandidateList}>Candidate List</a><label className="mx-2">{'>'}</label><label>{this.state.candidateInfo.first_name} {this.state.candidateInfo.last_name}</label>
          </div>
        </div>
        <div className="candidate-name-nav row div-margin-x">
          <h4 className="candidate-name col-lg-7 p-0">Applicant ID {this.state.candidateInfo.candidate_code}, {this.state.candidateInfo.first_name} {this.state.candidateInfo.last_name}</h4>
          <div className="col-lg-5 d-flex nav-candidate-btn">
            <RegularButtonWhite name="Previous" onClick={this.changeCandidate.bind(this)} />
            <RegularButtonWhite style={{ width: "15%", textAlign: "center", marginLeft: "10px" }} name="Next" onClick={this.changeCandidate.bind(this)} />
          </div>
        </div>
        <div className="candidate-details-wrapper row">
          <div className="basic-details div-border-right col-lg-5 row p-3">
            <div className="col-lg-7 row">
              <h4 className="col-lg-12 mb-4">Candidate Details</h4>
              <div className="col-lg-5 detail-label">
                <p>Full Name:</p>
              </div>
              <div className="col-lg-7 detail-value">
                <p>{this.state.candidateInfo.first_name} {this.state.candidateInfo.last_name}</p>
              </div>
              <div className="col-lg-5 detail-label">
                <p>Decision:</p>
              </div>
              <div className="col-lg-7">
                <div className={"detail-value decision-btn" + ' ' + (this.state.candidateInfo.decision == 'Rejected List' ? 'moveto-reject' : '') + (this.state.candidateInfo.decision == 'Wait List' ? 'moveto-waitlist' : '') + (this.state.candidateInfo.decision == 'Long List' ? 'moveto-longlist' : '')}>
                  <p>{this.state.candidateInfo.decision}</p>
                </div>
              </div>
              <div className="col-lg-5 detail-label">
                <p>Comments:</p>
              </div>
              <div className="col-lg-7 detail-value">
                <p>{this.state.candidateInfo.comments}</p>
              </div>
            </div>
            <div className="col-lg-5 m-auto">
              <div className="col-lg-12 m-auto">
                <VisibilitySensor>
                  {({ isVisible }) => {
                    const value = isVisible ? this.state.candidateInfo.score : 0;
                    return (
                      <div className="progressbar-wrapper">
                        <CircularProgressbarWithChildren
                          className="overall-progress"
                          value={value}
                          maxValue={100}
                          styles={buildStyles({
                            pathTransitionDuration: 3.0,
                            // Colors
                            pathColor: `#1B7AF6`,
                            textColor: '#1B7AF6',
                            backgroundColor: '#1FB45E',
                          })} >
                          <div style={{ fontSize: 12, marginRight: '-31%', marginTop: '59%', textAlign: 'center' }}>
                            <strong className="summary-overall-value-label">{value}</strong><p className="out-of-label">Out of 100</p>
                          </div>
                        </CircularProgressbarWithChildren>
                      </div>
                    );
                  }}
                </VisibilitySensor>
              </div>
              <div className="col-lg-12">
                <div className="total-rating-wrapper">
                  <Rating name="half-rating-read" defaultValue={this.state.candidateInfo.rating} precision={0.5} readOnly />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 row contact-details div-border-left p-3">
            <h4 className="col-lg-12 mb-1">Contact Details</h4>
            <div className="col-lg-12 detail-value">
              <p><img className="m-2" src={PhoneIcon} alt="" />{this.state.candidateInfo.mobile_number}</p>
            </div>
            <div className="col-lg-12 detail-value">
              <p><img className="m-2" src={MailIcon} alt="" />{this.state.candidateInfo.email}</p>
            </div>
            <div className="col-lg-12 detail-value">
              <p><img className="m-2" src={MapPinIcon} alt="" />{this.state.candidateInfo.location}</p>
            </div>
          </div>
          <div className="col-lg-2 personal-details div-border-left row p-3">
            <h4 className="col-lg-12 mb-1">Personal Details</h4>
            <div className="col-lg-5 detail-label">
              <p>Gender:</p>
            </div>
            <div className="col-lg-7 detail-value">
              <p>{this.state.candidateInfo.gender}</p>
            </div>
            <div className="col-lg-5 detail-label">
              <p>Age:</p>
            </div>
            <div className="col-lg-7 detail-value">
              <p>{this.state.candidateInfo.age}</p>
            </div>
            <div className="col-lg-5 detail-label">
              <p>Nationality:</p>
            </div>
            <div className="col-lg-7 detail-value">
              <p>{this.state.candidateInfo.nationality}</p>
            </div>
          </div>
          <div className="col-lg-2 document-details div-border-left row p-3">
            <h4 className="col-lg-12 mb-1 px-1">Documents</h4>
            <div className="col-lg-12 detail-value">
              <p title="Click here to view or download resume"><img className="m-2" src={FileIcon} alt="" />Resume</p>
            </div>
            <div className="col-lg-12 detail-value">
              <p><img className="m-2" src={FileIcon} alt="" />Application</p>
            </div>
            <div className="col-lg-12 detail-value">
              <p><img className="m-2" src={FileIcon} alt="" />Statement of Interest</p>
            </div>
          </div>
        </div>
        <div className="digital-summary-section">
          <CandidateSummary keywordsData={this.state.candidate_keywords} />
        </div>
        <Snackbar
          open={this.state.changeCandidateToast}
          autoHideDuration={5000}
          onClose={() => this.setState({ changeCandidateToast: false })}
          message="No candidates available."
          action={action}
        />
      </div>
      </>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  const location = useLocation();
  return <CandidateOverallInfo {...props} navigate={navigate} location={location} />
}

export default WithNavigate;
