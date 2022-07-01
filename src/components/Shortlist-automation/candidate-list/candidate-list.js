import React, { Component, forwardRef } from "react";
import PropTypes from 'prop-types';
import './candidate-list.css';

import api from "../../Services/apiService";

import HelpIcon from '../../../assets/help-circle.svg';
import ExportIcon from '../../../assets/download-cloud.svg';

import RegularButtonWhite from "../../Shared/regular-button-white/regular-button-white";
import RegularInput from "../../Shared/regular-input/regular-input";

import MaterialTable from "material-table";
import Pagination from '@mui/material/Pagination';
import tableIcons from "../../Shared/material-table-icons/material-table-icons";

import FileIcon from "../../../assets/file-text.svg";
import MailIcon from "../../../assets/mail.svg";
import MapPinIcon from "../../../assets/map-pin.svg";
import PhoneIcon from "../../../assets/phone.svg";
import SortIcon from "./../../../assets/sort.svg"
import StarIcon from "./../../../assets/star.svg"

import { useNavigate } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LoaderScreen from "../../Shared/loader/loader";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';

import { useRef } from 'react'

class CandidateList extends Component {

  constructor(props) {
    super(props);
    this.state = { candidateList: [], selectedCandidateIdArr: [], pagination: {}, search_keyword: '', order_by: 'asc', sort_by: 'first_name', page: 1, previousSortKey: '', leastCriteriaCheck: false, exceedCriteriaCheck: false, moveToCheck: false, error: false, isOpen: false };
    this.searchCandidate = this.searchCandidate.bind(this);
    this.exportData = this.exportData.bind(this);
  }

  isAsc = false

  componentDidMount() {
    this.getCandidateData()
  }

  openModal = () => {
    this.setState({ isOpen: true })
  }

  closeDialog = () => this.setState({ isOpen: false });

  updateSelectedRows(rows) {
    this.state.selectedCandidateIdArr = rows.map(row => row.id)
  }

  redirectToCandidateDetails(rowData) {
    this.props.navigate('/candidate-overall-info', { state: { candidateId: rowData.id, vacancyId: this.props.vacancyId, vacancyCode: this.props.vacancyCode, jobTitle: this.props.jobTitle } });
  }

  redirectToCompare = () => {
    if (this.state.selectedCandidateIdArr.length <= 1) {
      this.setState({ leastCriteriaCheck: true })
    } else if (this.state.selectedCandidateIdArr.length > 5) {
      this.setState({ exceedCriteriaCheck: true })
    } else {
      this.props.navigate('/compare-candidates', { state: { candidateList: this.state.selectedCandidateIdArr, vacancyId: this.props.vacancyId, vacancyCode: this.props.vacancyCode, jobTitle: this.props.jobTitle } });
    }
  }

  searchCandidate = (search_keyword) => {
    this.setState({ search_keyword: search_keyword },
      () => {
        this.getCandidateData()
      })
  }

  exportData = () => {
    api.axiosCall('/api/v1/candidate/getCandidates', { search: '', order_by: '', sort_by: '', page: '1', id: this.props.vacancyId, api: '' }, 'POST', '').then((result) => {
      if (result.statusCode === 200) {
        window.open(result.data.fileUrl)
      } else {
        this.setState({ error: true })
      }
    });
  }

  updateCandidatedecision = (decision) => {
    // console.log(this.state.selectedCandidateIdArr)
    this.setState({ isLoading: true })
    if (this.state.selectedCandidateIdArr.length >= 1) {
      api.axiosCall('/api/v1/candidate/updateCandidate', { candidate_ids: this.state.selectedCandidateIdArr, decision: decision }, 'POST', '').then((result) => {
        if (result.statusCode === 200) {
          this.getCandidateData()
        }
      });
    } else {
      this.setState({ moveToCheck: true, isLoading: false })
    }
  }

  moveToTalentPool = (talentpoolCategory) => {
    let candidateList = this.state.candidateList
    let selectedCandidateList = this.state.selectedCandidateIdArr
    candidateList = candidateList.map(function (candidate) {
      if (selectedCandidateList.includes(candidate.id)) {
        candidate.talentpool_category = talentpoolCategory
      }
      return candidate
    })
    // console.log(candidateList)
    this.setState({ candidateList: candidateList, isOpen: false, selectedCandidateIdArr: [] })
    this.state.candidateList.forEach(d => { if (d.tableData) d.tableData.checked = false });
  }

  openTalentPoolList = () => {
    if (this.state.selectedCandidateIdArr.length > 0) {
      this.setState({ isOpen: true })
    } else {
      this.setState({ moveToCheck: true })
    }
  }

  getCandidateData = () => {
    api.axiosCall('/api/v1/candidate/getCandidates', { search: this.state.search_keyword, order_by: this.state.order_by, sort_by: this.state.sort_by, page: this.state.page, id: this.props.vacancyId }, 'POST', '').then((result) => {
      if (result.statusCode === 200) {
        console.log(result.data.data)
        this.setState({ isLoading: false, candidateList: result.data.data, pagination: result.data.pagination, selectedCandidateIdArr: [] })
      }
    });
  }

  onPageChange = (event, value) => {
    console.log(value)
    this.setState({ isLoading: true })
    this.setState({ page: value },
      () => {
        console.log(this.state)
        this.getCandidateData()
      })
  }

  sortTable = (e) => {
    let key = e.target.previousSibling.innerHTML
    switch (key) {
      case 'Full Name':
        key = 'first_name'
        break
      case 'Applicant ID':
        key = 'id'
        break
      case 'Score':
        key = 'score'
        break
      case 'Rating':
        key = 'rating'
        break
      case 'Gender':
        key = 'gender'
        break
      case 'Age':
        key = 'age'
        break
      case 'Nationality':
        key = 'nationality'
        break
    }

    if (this.state.previousSortKey == key) {
      if (this.isAsc == true) {
        this.isAsc = false
      } else if (this.isAsc == false) {
        this.isAsc = true
      }
    }
    console.log(!this.isAsc)
    let order = this.isAsc ? 'asc' : 'desc'
    this.setState({ sort_by: key, order_by: order, previousSortKey: key, isLoading: true },
      () => {
        console.log(this.state)
        this.getCandidateData()
      })
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
          onClick={() => this.setState({ leastCriteriaCheck: false, exceedCriteriaCheck: false, moveToCheck: false })}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );

    const columns = [
      { title: "Applicant ID", field: "candidate_code", customSort: () => 0 },
      { title: "Full Name", field: "first_name", width: "20%", render: (rowData) => <div><div>{rowData.first_name} {rowData.last_name}</div><div><img className="" title={rowData.email} src={MailIcon} alt="" /><img className="mx-1" title={rowData.mobile_number} src={PhoneIcon} alt="" /><img className="mx-1" title={rowData.location} src={MapPinIcon} alt="" /></div></div>, customSort: () => 0 },
      { title: "Score", field: "score", customSort: () => 0 },
      {
        title: "Rating", field: "flag", customSort: () => 0, render: (rowData) => {
          let ratingClassName = ''
          switch (rowData.flag) {
            case "High":
              ratingClassName = 'rating-btn rating-high'
              break
            case "Medium":
              ratingClassName = 'rating-btn rating-medium'
              break
            case "Low":
              ratingClassName = 'rating-btn rating-low'
              break
          }
          if (rowData.flag) {
            return (
              <div className={ratingClassName}>{rowData.flag}</div>
            )
          }
        }
      },
      { title: "Gender", field: "gender", customSort: () => 0 },
      { title: "Age", field: "age", sorting: false, customSort: () => 0 },
      { title: "Nationality", field: "nationality", customSort: () => 0 },
      {
        title: "Decision", field: "decision", render: (rowData) => {
          let curClassName = ''
          switch (rowData.decision) {
            case "Rejected List":
              curClassName = 'list-btn moveto-reject'
              break
            case "Wait List":
              curClassName = 'list-btn moveto-waitlist'
              break
            case "Long List":
              curClassName = 'list-btn moveto-longlist'
              break
          }
          if (rowData.decision) {
            return (
              <div className={curClassName}>{rowData.decision}</div>
            )
          }
        }
      },
      {
        title: "Talent Pool", field: "talentpool_category", render: (rowData) => {
          if (rowData.talentpool_category) {
            return <div className="list-btn moveto-talentpool">{rowData.talentpool_category}</div>
          }
        }
      },
      { title: "Documents", field: "resume", sorting: false, render: (rowData) => <div><InsertDriveFileOutlinedIcon className="resume-icon mx-1" title="Resume" /><ContactPageOutlinedIcon className="application-icon mx-1" title="Application" /><ArticleOutlinedIcon className="interests-icon mx-1" title="Statement of Interests" /></div> }
    ];

    // console.log(this.state.activeElem);

    return (
      <div className="candidate-list-wrapper pt-2">
        <div className="header-row row div-margin-x">
          <h3 className="candidate-list-header mb-4 p-0 col-lg-5">Vacancy No: {this.props.vacancyCode}, {this.props.jobTitle}</h3>
          <div className="d-flex col-lg-7 filter-section text-right">
            <div className="help-label mx-3"><img src={HelpIcon} alt="" className="m-2" />Help</div>
            <RegularButtonWhite name="Export" icon={ExportIcon} onClick={this.exportData.bind(this)} />
            <RegularInput placeholder="Search" onChange={this.searchCandidate.bind(this)} />
          </div>
        </div>
        <div className="candidate-list mx-3">
          <div className="move-to-section d-flex p-2">
            <div className="compare-btn mx-1" onClick={this.redirectToCompare}>Compare</div>
            <div className="moveto-wrapper d-flex mx-1">
              <div className="mx-1">Move to:</div>
              <div className="moveto-btn moveto-reject" onClick={() => this.updateCandidatedecision('Rejected List')}>Reject</div>
              <div className="moveto-btn moveto-waitlist" onClick={() => this.updateCandidatedecision('Wait List')}>Wait List</div>
              <div className="moveto-btn moveto-longlist" onClick={() => this.updateCandidatedecision('Long List')}>Long List</div>
            </div>
            <div className="moveto-wrapper d-flex mx-1">
              <div className="mx-1">Move to:</div>
              <div className="moveto-btn moveto-talentpool" onClick={() => this.openTalentPoolList()}>Talent Pool</div>
            </div>
          </div>
          <MaterialTable title="Basic Table" options={{ showTitle: false, search: false, pageSize: 10, selection: true, paging: true }} icons={{ SortArrow: () => <img src={SortIcon} alt="" className="mx-1" onClick={(event) => { this.sortTable(event) }} /> }} columns={columns} data={this.state.candidateList} onRowClick={(event, rowData) => this.redirectToCandidateDetails(rowData)} onSelectionChange={(rows) => this.updateSelectedRows(rows)} />
          <div className="pagination-section">
            <div className="pagination-wrapper">
              <Pagination count={this.state.pagination.pages} defaultPage={this.state.page} shape="rounded" onChange={(event, value) => this.onPageChange(event, value)} showFirstButton showLastButton />
            </div>
          </div>
        </div>
        <Snackbar
          open={this.state.leastCriteriaCheck}
          autoHideDuration={5000}
          onClose={() => this.setState({ leastCriteriaCheck: false })}
          message="Please select atleast 2 candidates to compare."
          action={action}
        />
        <Snackbar
          open={this.state.exceedCriteriaCheck}
          autoHideDuration={5000}
          onClose={() => this.setState({ exceedCriteriaCheck: false })}
          message="Please select atmost 5 candidates only."
          action={action}
        />
        <Snackbar
          open={this.state.moveToCheck}
          autoHideDuration={5000}
          onClose={() => this.setState({ moveToCheck: false })}
          message="Please select atleast a candidate."
          action={action}
        />
        <Snackbar
          open={this.state.error}
          autoHideDuration={5000}
          onClose={() => this.setState({ error: false })}
          message="Something went wrong !"
          action={action}
        />
        <Dialog onClose={() => this.closeDialog()} className="talentpool-dialog" open={this.state.isOpen}>
          <DialogTitle className="dialog-title">Move to:</DialogTitle>
          <List sx={{ pt: 0 }}>
            <ListItem autoFocus button onClick={() => this.moveToTalentPool('Finance')}>
              <ListItemAvatar>
                <Avatar>
                  <PlaylistAddOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <p className="dialog-item">Finance Talent Pool</p>
            </ListItem>
            <ListItem button onClick={() => this.moveToTalentPool('IT')}>
              <ListItemAvatar>
                <Avatar>
                  <PlaylistAddOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <p className="dialog-item">IT Talent Pool</p>
            </ListItem>
            <ListItem button onClick={() => this.moveToTalentPool('Education')}>
              <ListItemAvatar>
                <Avatar>
                  <PlaylistAddOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <p className="dialog-item">Education Talent Pool</p>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <CandidateList {...props} navigate={navigate} />
}

export default WithNavigate;
