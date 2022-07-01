import React, { Component, forwardRef } from "react";
// import PropTypes from 'prop-types';
import './dashboard.css';
import tableIcons from "../../Shared/material-table-icons/material-table-icons";
import MaterialTable from 'material-table'
import api from "../../Services/apiService";
import RegularInput from "../../Shared/regular-input/regular-input";
import LoaderScreen from "../../Shared/loader/loader";

import { useNavigate } from 'react-router-dom';

import BannerImage from '../../../assets/dashboard-banner.png'
import BannerIllustration from '../../../assets/dashboard-illustration.png'
import commentsIllustration from '../../../assets/comments.svg'
import Header from '../../Shared/header/header';
import {Account} from '../../Services/Account';


class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true, vacancydata: [], paginationData: {} , isLoggedIn:true  }
    this.searchCandidate = this.searchCandidate.bind(this)
  }

  componentDidMount() {
    api.axiosCall('/api/v1/vacancy/getVacancies', { search: '', order_by: '', sort_by: '' }, 'POST', '').then((result) => {
      if (result.statusCode === 200) {
        this.setState({ vacancydata: result.data.data, isLoading: false, paginationData: result.data.pagination })
      }
    });
  }

  redirectToVacancyDetails(rowData) {
    this.props.navigate('/job-role-info', { state: { id: rowData.id } });
  }

  searchCandidate = (search_keyword) => {
    api.axiosCall('/api/v1/vacancy/getVacancies', { search: search_keyword, order_by: '', sort_by: '' }, 'POST', '').then((result) => {
      if (result.statusCode === 200) {
        // console.log(result.data.data)
        this.setState({ vacancydata: result.data.data, paginationData: result.data.pagination, isLoading: false })
      }
    });
  }

  render() {

    if (this.state.isLoading) {
      return <LoaderScreen />
    }

    const columns = [
      { title: "Vacancy No", field: "vacancy_code" },
      { title: "Job Title", field: "job_title" },
      { title: "Department/Division/Unit", field: "department_division" },
      { title: "Location", field: "location" },
      { title: "Vacancy Status", field: "status", render: rowData => <div className="vacancy-status-open">{rowData.status}</div> }
    ];

    return (
      <>
      <Account><Header/></Account>
      <div className="dashboard-container col-lg-12">
        <div className="dashboard-header p-3"><h3>Dashboard</h3></div>
        <div className="mt-3 mx-3">
          <div className="filter-section d-flex mb-3">
            <label>Filters</label>
            <RegularInput placeholder="Search" onChange={this.searchCandidate.bind(this)} />
          </div>
          <MaterialTable title="Basic Table" options={{ showTitle: false, search: false, paging: true, pageSize: this.state.paginationData.total_count }} icons={tableIcons} columns={columns} data={this.state.vacancydata} onRowClick={(event, rowData) => this.redirectToVacancyDetails(rowData)}
          />
          <div className="table-banner-section">
            <img src={BannerIllustration} className="table-banner-illustration" alt="" />
            <img src={BannerImage} className="table-banner-image" alt="" />
            <div className="table-banner-comments">
              <img src={commentsIllustration} alt="" />
              <div className="text-section">
                <p>More vacancies will show up here as you add them.</p>
                <p style={{ color: '#000000', fontSize: '14px' }}>Please email to solutions@heptagon.in</p>
                <p>to upload more vacancies /resumes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <Dashboard {...props} navigate={navigate} />
}

export default WithNavigate;
