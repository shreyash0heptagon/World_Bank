import React, { Component } from "react";
import PropTypes from 'prop-types';
import './compare-candidates.css';
import { useNavigate, useLocation } from 'react-router-dom';

import api from "../../Services/apiService";

import CompareSelectionCriteriaTags from "../../Shared/compare-selection-criteria-tags/compare-selection-criteria-tags";

import LoaderScreen from "../../Shared/loader/loader";
import Header from '../../Shared/header/header';
import Tooltip from '@mui/material/Tooltip';

import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

class CompareCandidates extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true, candidatesData: [], selectedcandidatesArr: [], moveToCheck: false, isLoggedIn:true };
  }

  componentDidMount() {
    this.getCandidateData()
  }

  getCandidateData = () => {
    api.axiosCall('/api/v1/candidate/candidateDetail', { candidate_ids: this.props.location.state.candidateList, vacancy_id: this.props.location.state.vacancyId }, 'POST', '').then((result) => {
      if (result.statusCode === 200) {
        this.setState({ candidatesData: result.data, isLoading: false, selectedcandidatesArr: [] })
        // console.log(this.state.candidatesData)
      }
    });
  }

  updateSelectedCandidatesList = (id, event) => {
    let selectedCandidatesList = this.state.selectedcandidatesArr
    if (event.target.checked) {
      selectedCandidatesList.push(id)
    } else {
      selectedCandidatesList.splice(selectedCandidatesList.indexOf(id), 1);
    }
    this.setState({ selectedcandidatesArr: selectedCandidatesList })
    // console.log(selectedCandidatesList)
  }

  updateCandidateDecision = (decision) => {
    this.setState({ isLoading: true })
    if (this.state.selectedcandidatesArr.length > 0) {
      api.axiosCall('/api/v1/candidate/updateCandidate', { candidate_ids: this.state.selectedcandidatesArr, decision: decision }, 'POST', '').then((result) => {
        if (result.statusCode === 200) {
          this.getCandidateData()
        }
      });
    } else {
      this.setState({ moveToCheck: true, isLoading: false })
    }
  }

  redirectToJobRoleInfo = () => {
    this.props.navigate('/job-role-info', { state: { id: this.props.location.state.vacancyId, activeMenu: 'digital-summary' } });
  }

  redirectToCandidateList = () => {
    this.props.navigate('/job-role-info', { state: { id: this.props.location.state.vacancyId, activeMenu: 'candidate-list' } });
  }

  render() {

    let self = this

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

    var tableHeaders = this.state.candidatesData.map(function (candidate) {
      // console.log(candidate)
      return (
        <th>
          <div className="header-cell d-flex">
            <div className="table-header d-flex">
              <div>
                <input type="checkbox" className="header-checkbox" onChange={(event) => self.updateSelectedCandidatesList(candidate.candidate_info.id, event)} />
              </div>
              <div className="header-text">
                <h6>{candidate.candidate_info.first_name} {candidate.candidate_info.last_name}</h6>
                <p>{candidate.candidate_info.age}yrs ({candidate.candidate_info.gender})</p>
              </div>
            </div>
            <div className="score-circle">
              <h5 className="m-0">{candidate.candidate_info.score}</h5>
              <p>Score</p>
            </div>
          </div>
        </th>
      )
    })

    var decisionRow = this.state.candidatesData.map(function (candidate) {
      let curClassName = ''
      switch (candidate.candidate_info.decision) {
        case "Rejected List":
          curClassName = 'list-btn moveto-reject m-auto'
          break
        case "Wait List":
          curClassName = 'list-btn moveto-waitlist m-auto'
          break
        case "Long List":
          curClassName = 'list-btn moveto-longlist m-auto'
          break
        case "Talent Pool":
          curClassName = 'list-btn moveto-talentpool m-auto'
          break
      }
      if (candidate.candidate_info.decision) {
        return (
          <td className="decision-cell">
            <div className={curClassName}>{candidate.candidate_info.decision}</div>
          </td>
        )
      } else {
        return (
          <td className="decision-cell">
          </td>
        )
      }
    })

    return (
      <>
      <Header/>
      <div>
        <div className="nav-label-wrapper my-3">
          <div className="mx-3">
            <a className='nav-label' href={"/dashboard"}>Dashboard</a><label className="mx-2">{'>'}</label><a className='nav-label' onClick={this.redirectToJobRoleInfo}>{this.props.location.state.vacancyCode}, {this.props.location.state.jobTitle}</a><label className="mx-2">{'>'}</label><a className='nav-label' onClick={this.redirectToCandidateList}>Candidate List</a><label className="mx-2">{'>'}</label><label>Compare</label>
          </div>
        </div>
        <div className="toolbar-wrapper">
          <h5 className="mx-3 compare-heading">Compare</h5>
          <div className="move-to-section d-flex p-2">
            <div className="moveto-wrapper d-flex mx-1">
              <div className="mx-1">Move to:</div>
              <div className="moveto-btn moveto-reject" onClick={() => this.updateCandidateDecision('Rejected List')}>Reject</div>
              <div className="moveto-btn moveto-waitlist" onClick={() => this.updateCandidateDecision('Wait List')}>Wait List</div>
              <div className="moveto-btn moveto-longlist" onClick={() => this.updateCandidateDecision('Long List')}>Long List</div>
            </div>
            <div className="moveto-wrapper d-flex d-none mx-1">
              <div className="mx-1">Move to:</div>
              <div className="moveto-btn moveto-talentpool" onClick={() => this.updateCandidateDecision('Talent Pool')}>Talent Pool</div>
            </div>
          </div>
        </div>
        <div className="compare-table-outer">
          <div className="compare-table-wrapper">
            <table className="compare-table">
              <tr>
                <th style={{ width: '11%' }}><h6 className="text-center">Candidate</h6></th>
                {tableHeaders}
              </tr>

              <tr>
                <td className="first-col">Decision</td>
                {decisionRow}
              </tr>

              <tr>
                <td className="first-col">Education</td>
                {
                  this.state.candidatesData.map(function (candidate) {
                    return (
                      <td>
                        {
                          candidate.candidate_keywords.map(function (keyword_category) {
                            if (keyword_category.component_name === 'Education') {
                              return (
                                <div className="d-flex flex-wrap justify-content-center">
                                  {
                                    keyword_category.keywords.map(function (keyword) {
                                      var hoverMappingDetails = keyword.candidate_keyword_mapping.map(function (keyword_label) {
                                        if (keyword_label.keyword_label) {
                                          return (
                                            <li>{keyword_label.keyword_label}</li>
                                          )
                                        }
                                      })
                                      return (
                                        <Tooltip title={hoverMappingDetails} placement="top" arrow>
                                          <span><CompareSelectionCriteriaTags name={keyword.keyword} weight={Math.round(keyword.keyword_total_score)} colorCode={keyword.color_score} /></span>
                                        </Tooltip>
                                      )
                                    })
                                  }
                                </div>
                              )
                            }
                          })
                        }
                      </td>
                    )
                  })
                }
              </tr>

              <tr>
                <td className="first-col">Work Experience</td>
                {
                  this.state.candidatesData.map(function (candidate) {
                    return (
                      <td>
                        {
                          candidate.candidate_keywords.map(function (keyword_category) {
                            if (keyword_category.component_name === 'Work Experience') {
                              return (
                                <div className="d-flex flex-wrap justify-content-center">
                                  {
                                    keyword_category.keywords.map(function (keyword) {
                                      var hoverMappingDetails = keyword.candidate_keyword_mapping.map(function (keyword_label) {
                                        if (keyword_label.keyword_label) {
                                          return (
                                            <li>{keyword_label.keyword_label}</li>
                                          )
                                        }
                                      })
                                      return (
                                        <Tooltip title={hoverMappingDetails} placement="top" arrow>
                                          <span><CompareSelectionCriteriaTags name={keyword.keyword} weight={Math.round(keyword.keyword_total_score)} colorCode={keyword.color_score} /></span>
                                        </Tooltip>

                                      )
                                    })
                                  }
                                </div>
                              )
                            }
                          })
                        }
                      </td>
                    )
                  })
                }
              </tr>

              <tr>
                <td className="first-col">Language</td>
                {
                  this.state.candidatesData.map(function (candidate) {
                    return (
                      <td>
                        {
                          candidate.candidate_keywords.map(function (keyword_category) {
                            if (keyword_category.component_name === 'Language') {
                              return (
                                <div className="d-flex flex-wrap justify-content-center">
                                  {
                                    keyword_category.keywords.map(function (keyword) {
                                      var hoverMappingDetails = keyword.candidate_keyword_mapping.map(function (keyword_label) {
                                        if (keyword_label.keyword_label) {
                                          return (
                                            <li>{keyword_label.keyword_label}</li>
                                          )
                                        }
                                      })
                                      return (
                                        <Tooltip title={hoverMappingDetails} placement="top" arrow>
                                          <span><CompareSelectionCriteriaTags name={keyword.keyword} weight={Math.round(keyword.keyword_total_score)} colorCode={keyword.color_score} /></span>
                                        </Tooltip>
                                      )
                                    })
                                  }
                                </div>
                              )
                            }
                          })
                        }
                      </td>
                    )
                  })
                }
              </tr>

              <tr>
                <td className="first-col">Expertise</td>
                {
                  this.state.candidatesData.map(function (candidate) {
                    return (
                      <td>
                        {
                          candidate.candidate_keywords.map(function (keyword_category) {
                            if (keyword_category.component_name === 'Expertise') {
                              return (
                                <div className="d-flex flex-wrap justify-content-center">
                                  {
                                    keyword_category.keywords.map(function (keyword) {
                                      var hoverMappingDetails = keyword.candidate_keyword_mapping.map(function (keyword_label) {
                                        if (keyword_label.keyword_label) {
                                          return (
                                            <li>{keyword_label.keyword_label}</li>
                                          )
                                        }
                                      })
                                      return (
                                        <Tooltip title={hoverMappingDetails} placement="top" arrow>
                                          <span><CompareSelectionCriteriaTags name={keyword.keyword} weight={Math.round(keyword.keyword_total_score)} colorCode={keyword.color_score} /></span>
                                        </Tooltip>
                                      )
                                    })
                                  }
                                </div>
                              )
                            }
                          })
                        }
                      </td>
                    )
                  })
                }
              </tr>

              <tr>
                <td className="first-col">Soft Skills</td>
                {
                  this.state.candidatesData.map(function (candidate) {
                    return (
                      <td>
                        {
                          candidate.candidate_keywords.map(function (keyword_category) {
                            if (keyword_category.component_name === 'Soft Skills') {
                              return (
                                <div className="d-flex flex-wrap justify-content-center">
                                  {
                                    keyword_category.keywords.map(function (keyword) {
                                      var hoverMappingDetails = keyword.candidate_keyword_mapping.map(function (keyword_label) {
                                        if (keyword_label.keyword_label) {
                                          return (
                                            <li>{keyword_label.keyword_label}</li>
                                          )
                                        }
                                      })
                                      return (
                                        <Tooltip title={hoverMappingDetails} placement="top" arrow>
                                          <span><CompareSelectionCriteriaTags name={keyword.keyword} weight={Math.round(keyword.keyword_total_score)} colorCode={keyword.color_score} /></span>
                                        </Tooltip>
                                      )
                                    })
                                  }
                                </div>
                              )
                            }
                          })
                        }
                      </td>
                    )
                  })
                }
              </tr>

              <tr>
                <td className="first-col">Focus Keywords</td>
                {
                  this.state.candidatesData.map(function (candidate) {
                    return (
                      <td>
                        {
                          candidate.candidate_keywords.map(function (keyword_category) {
                            if (keyword_category.component_name === 'Focus keywords') {
                              return (
                                <div className="d-flex flex-wrap justify-content-center">
                                  {
                                    keyword_category.keywords.map(function (keyword) {
                                      var hoverMappingDetails = keyword.candidate_keyword_mapping.map(function (keyword_label) {
                                        if (keyword_label.keyword_label) {
                                          return (
                                            <li>{keyword_label.keyword_label}</li>
                                          )
                                        }
                                      })
                                      return (
                                        <Tooltip title={hoverMappingDetails} placement="top" arrow>
                                          <span><CompareSelectionCriteriaTags name={keyword.keyword} weight={Math.round(keyword.keyword_total_score)} colorCode={keyword.color_score} /></span>
                                        </Tooltip>
                                      )
                                    })
                                  }
                                </div>
                              )
                            }
                          })
                        }
                      </td>
                    )
                  })
                }
              </tr>

            </table>
          </div>
        </div>
        <Snackbar
          open={this.state.moveToCheck}
          autoHideDuration={5000}
          onClose={() => this.setState({ moveToCheck: false })}
          message="Please select atleast a candidate."
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
  return <CompareCandidates {...props} navigate={navigate} location={location} />
}

export default WithNavigate; 
