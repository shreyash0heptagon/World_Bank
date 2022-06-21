import React, { Component } from "react";
import PropTypes from 'prop-types';
import './job-role-info.css';
import api from "../../Services/apiService";

import PinIcon from '../../../assets/map-pin-grey.svg';
import StarIcon from '../../../assets/star.svg';

import DigitalSummary from "../digital-summary/digital-summary";
import CandidateList from "../candidate-list/candidate-list";
import AddResume from "../add-resume/add-resume"
import { useNavigate, useLocation } from 'react-router-dom';
import LoaderScreen from "../../Shared/loader/loader";
import Header from '../../Shared/header/header';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


class JobRoleInfo extends Component {

  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      isLoading: true,
      activeMenu: this.props.location.state.activeMenu ? this.props.location.state.activeMenu : 'digital-summary',
      vacancy_detail: {},
      jd_keyword: [],
      selection_keyword: [],
      isLoggedIn:true,
      showResume:false
    };
  }

  componentDidMount() {
    api.axiosCall('/api/v1/vacancy/vacancyDetail', { id: this.props.location.state.id }, 'POST', '').then((result) => {
      if (result.statusCode === 200) {
        this.setState({ vacancy_detail: result.data.vacancy_detail, jd_keyword: result.data.jd_keyword, selection_keyword: result.data.selection_keyword, isLoading: false })
      }
    });
  }

  changeActiveElem = (activeItem) => {
    this.setState({ activeMenu: activeItem });
  }
  setShowResume = () => {
    this.setState({ showResume: true });
  }
  redirectToDashboard = () => {
    this.props.navigate('/dashboard');
  }

  render() {

    if (this.state.isLoading) {
      return <LoaderScreen />
    }

    return (
      <>
      <Header/>
      <div>
        {/* Role info Section */}
        <div className='role-info'>
          <div className="nav-label-wrapper">
            <a className='nav-label' onClick={this.redirectToDashboard}>Dashboard</a><label className="mx-2">{'>'}</label><label className="nav-text"> {this.state.vacancy_detail.vacancy_code}, {this.state.vacancy_detail.job_title}</label>{this.state.showResume?<><label className="mx-2">{'>'}</label><label className="nav-text">Add Resume</label></>:""}
          </div>
          {/* <div className="row div-margin-x">
            <ul className="role-details p-0 d-flex">
              <li><label className="role-name">{this.state.vacancy_detail.department_division}</label></li>
              <li><label className="pipe-seperator">|</label></li>
              <li className="role-details-item"><img src={PinIcon} alt="" className="mx-2" />{this.state.vacancy_detail.location}</li>
              <li className="role-details-item"><label className="mr-2">Applicants :</label>{this.state.vacancy_detail.applicants}</li>
              <li className="role-details-item"><label className="mr-2">Average Rating :</label>{this.state.vacancy_detail.avg_rating}<img src={StarIcon} alt="" className="rating-icon mx-1" /></li>
              <li className="role-details-item"><label className="mr-2">Vacancy Status :</label><label className="vacancy-status-open">{this.state.vacancy_detail.status}</label></li>
            </ul>
          </div> */}
        </div>
        {/* Toggle Menu Section */}
        {this.state.showResume?"":
        <div className="toggle-menu-wrapper">
          <div className="row">
          <div className="toggle-menu div-margin-x col-lg-3">
            <div className="row">
            <div className={this.state.activeMenu === 'digital-summary' ? 'toggle-menu-item active col-lg-6' : 'toggle-menu-item col-lg-6'} onClick={() => this.changeActiveElem('digital-summary')}>Summary</div>
            <div className={this.state.activeMenu === 'candidate-list' ? 'toggle-menu-item active col-lg-6' : 'toggle-menu-item col-lg-6'} onClick={() => this.changeActiveElem('candidate-list')}>Candidate List</div>
            </div>
          </div>
          {this.state.activeMenu==="candidate-list"?
          <div className="col-lg-3 offset-lg-10">
          <Button variant="contained" startIcon={<AddIcon/>} style={{maxWidth:"10rem",minWidth:"12rem", minHeight:"3rem",color:"#fff", borderRadius:"0.3rem", backgroundColor:"#32cd32"}} size="large" onClick={this.setShowResume}>
          ADD Resume              
          </Button>
          </div>:""}
          </div>
          
        </div>}
        {/* Digital Summary / Candidate List Section */}
        {this.state.showResume ? <AddResume/> :
        <div>
          {this.state.activeMenu === 'digital-summary' ? <DigitalSummary skData={this.state.selection_keyword} jdData={this.state.jd_keyword} jobTitle={this.state.vacancy_detail.job_title} vacancyCode={this.state.vacancy_detail.vacancy_code} vacancyId={this.state.vacancy_detail.id} /> : <CandidateList jobTitle={this.state.vacancy_detail.job_title} vacancyCode={this.state.vacancy_detail.vacancy_code} vacancyId={this.props.location.state.id} />}
        </div>}
         
      </div>
      </>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  const location = useLocation();
  return <JobRoleInfo {...props} navigate={navigate} location={location} />
}

export default WithNavigate;
