import React, { Component } from "react";
import './create-vacancy.css';
import { useNavigate, useLocation } from 'react-router-dom';
import LoaderScreen from "../../Shared/loader/loader";
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {education,proficiency} from './education';
import Header from "../../Shared/header/header";
import {Account} from '../../Services/Account';
import { isThisISOWeek } from "date-fns";
import { withStyles } from "@material-ui/core/styles";


class CreateVacancy extends Component {

    constructor(props) {
      super(props);
      this.state = { isLoading: true, openEdu:false,openExp:false,degree:"",spec:"",specWeightage:'',edu:[],role:'',years:'',months:'',expWeightage:'',exp:[],openLang:false,lang:'',profi:'',langWeightage:"",language:[],openSkills:false,skill:'',skillWeightage:'',skills:[]}
    }
    
    handleClickOpen = () => {
      this.setState({openEdu:true});
    };
    handleClickExpOpen = () => {
      this.setState({openExp:true});
    };
    handleClickLangOpen = () => {
      this.setState({openLang:true});
    };

    handleClickSkillOpen = () => {
      this.setState({openSkills:true});
    };

    handleCloseExp = () => {
      this.setState({openExp:false});
    };
    handleCloseLang = () => {
      this.setState({openLang:false});
    };
    handleCloseSkills = () => {
      this.setState({openSkills:false});
    };
    handleClose = () => {
        this.setState({openEdu:false});
    };
    redirectToDashboard = () => {
        this.props.navigate('/dashboard');
      }
      componentDidMount() {
            this.setState({isLoading: false })
      }    
      handleChange=(e)=>{
        var de=e.target.value;
        let obj = education.find(o => o.value === e.target.value);
        this.setState({degree:obj.value});
      }

      handleSpec=(e)=>{
        this.setState({spec:e.target.value})
      }
      handleSpecWeight=(e)=>{
        this.setState({specWeightage:e.target.value})
      }
      handleAddEducation=()=>{
          var edu=[];
          let obj = education.find(o => o.value === this.state.degree);
          this.state.edu.push({
            degree:obj.label,
            spec:this.state.spec,
            weightage:this.state.specWeightage
          });
          this.setState({degree:"", spec:"", specWeightage:""});
      }
      handleRemoveEducation=(e,index)=>{
        console.log(index);
        console.log(this.state.edu);
        var arr=this.state.edu;
        arr.splice(index, 1);
        this.setState({edu:arr})

      }
      handleRole=(e)=>{
        this.setState({role:e.target.value})
      }
      handleYears=(e)=>{
        this.setState({years:e.target.value})
      }
      handleMonths=(e)=>{
        this.setState({months:e.target.value})
      }
      handleExpWeight=(e)=>{
        this.setState({expWeightage:e.target.value})
      }
      handleAddExperience=()=>{
        this.state.exp.push({
          role:this.state.role,
          years:this.state.years,
          months:this.state.months,
          weightage:this.state.expWeightage
        });
        this.setState({role:"", years:"", months:"",expWeightage:''});
    }
    handleRemoveExperience=(e,index)=>{
      console.log(index);
      console.log(this.state.exp);
      var arr=this.state.exp;
      arr.splice(index, 1);
      this.setState({exp:arr})

    }
    handleChangeProfi=(e)=>{
      var de=e.target.value;
      let obj = proficiency.find(o => o.value === e.target.value);
      this.setState({profi:obj.value});
    }
    handleLang=(e)=>{
      this.setState({lang:e.target.value})
    }
    handleLangWeight=(e)=>{
      this.setState({langWeightage:e.target.value})
    }
    handleAddLanguage=()=>{
        var edu=[];
        let obj = proficiency.find(o => o.value === this.state.profi);
        this.state.language.push({
          profi:obj.label,
          lang:this.state.lang,
          weightage:this.state.langWeightage
        });
        this.setState({lang:"", profi:"", langWeightage:""});
    }
    handleRemoveLanguage=(e,index)=>{
      console.log(index);
      console.log(this.state.language);
      var arr=this.state.language;
      arr.splice(index, 1);
      this.setState({language:arr})

    }
    handleSkill=(e)=>{
      this.setState({skill:e.target.value})
    }
    handleSkillWeight=(e)=>{
      this.setState({skillWeightage:e.target.value})
    }
    handleAddSkills=()=>{
        this.state.skills.push({
          skill:this.state.skill,
          weightage:this.state.skillWeightage
        });
        this.setState({skill:"",skillWeightage:""});
    }
    handleRemoveSkill=(e,index)=>{
      console.log(index);
      console.log(this.state.skills);
      var arr=this.state.skills;
      arr.splice(index, 1);
      this.setState({skills:arr})

    }
    render() {

        if (this.state.isLoading) {
          return <LoaderScreen />
        }
        const height = 44;

          
        return (
            <>
                  <Account><Header/></Account>

            <div className='role-info'>
                <div className="nav-label-wrapper">
                    <a className='nav-label' onClick={this.redirectToDashboard}>Dashboard</a><label className="mx-2">{'>'}</label><label className="nav-text"> Create Vacancy</label>
                </div>
                <div className="row div-margin-x">
            <ul className="role-details p-0 d-flex">
              <li><label className="role-name">Create Vacancy</label></li>
            </ul>
          </div>
        </div>
        <div className="toggle-menu-wrapper">
            <div className="form-wrapper">
                <div className="half-side">
                    <div className="field-wrapper">
                        <label>Vacancy No.</label>
                            <div className="input-field">
                            <TextField
                            id="outlined-password-input"
                            label="Sample"
                            type="text"
                            autoComplete="current-password"
                            fullWidth
                            inputProps={{
                              style: {
                                fontSize: 14,
                                height: 50,
                                padding: '0 14px',
                              },
                          }}
                            />
                            </div>
                    </div>
                    <div className="field-wrapper">
                        <label>Job Title</label>
                            <div className="input-field">
                            <TextField
                            id="outlined-password-input"
                            label="Sample"
                            type="text"
                            autoComplete="current-password"
                            fullWidth
                            inputProps={{
                              style: {
                                fontSize: 14,
                                height: 50,
                                padding: '0 14px',
                              },
                          }}
                            />
                            </div>
                    </div>
                    <div className="field-wrapper">
                        <label>Department Division Unit</label>
                            <div className="input-field">
                            <TextField
                            id="outlined-password-input"
                            label="Sample"
                            type="text"
                            autoComplete="current-password"
                            fullWidth
                            inputProps={{
                              style: {
                                fontSize: 14,
                                height: 50,
                                padding: '0 14px',
                              },
                          }}
                            />
                            </div>
                    </div>
                    <div className="field-wrapper">
                        <div className="label-wrapper">
                            <div className="input-field">
                            <label>Education</label>
                            </div>
                            <div className="input-label-weight">
                            <label style={{marginRight:"10px"}}>Weightage</label>
                            <HelpOutlineIcon/>
                            </div>
                        </div>
                        <div className="label-wrapper">
                            <div className="input-field">
                                <TextField
                                id="outlined-password-input"
                                label="Sample"
                                type="text"
                                autoComplete="current-password"
                                fullWidth
                                onChange={this.handleClickOpen}
                                inputProps={{
                                  style: {
                                    fontSize: 14,
                                    height: 50,
                                    padding: '0 14px',
                                  },
                              }}
                                />
                            </div>
                            <div className="input-weight">
                                <TextField
                                id="outlined-password-input"
                                label="5"
                                type="text"
                                autoComplete="current-password"
                                fullWidth
                                inputProps={{
                                  style: {
                                    fontSize: 14,
                                    height: 50,
                                    padding: '0 14px',
                                  },
                              }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="field-wrapper">
                        <label>Skills</label>
                            <div className="input-field">
                            <TextField
                            id="outlined-password-input"
                            label="Sample"
                            type="text"
                            autoComplete="current-password"
                            fullWidth
                            onChange={this.handleClickSkillOpen}
                            inputProps={{
                              style: {
                                fontSize: 14,
                                height: 50,
                                padding: '0 14px',
                              },
                          }}
                            />
                            </div>
                    </div>

                </div>
                <div className="half-side">
                <div className="field-wrapper">
                        <label>Location</label>
                            <div className="input-field">
                            <TextField
                            variant="outlined"
                            id="outlined-password-input"
                            label="Location"
                            autoComplete="current-password"
                            fullWidth
                            type="search"
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <SearchIcon />
                                </InputAdornment>
                            )
                            }}
                            inputProps={{
                              style: {
                                fontSize: 14,
                                height: 50,
                                padding: '0 14px',
                              },
                          }}
                        />
                            </div>
                    </div>
                    <div className="field-wrapper">
                        <label>Hiring Manager</label>
                            <div className="input-field">
                            <TextField
                            id="outlined-password-input"
                            label="Sample"
                            type="text"
                            autoComplete="current-password"
                            fullWidth
                            inputProps={{
                              style: {
                                fontSize: 14,
                                height: 50,
                                padding: '0 14px',
                              },
                          }}
                            />
                            </div>
                    </div>
                    <div className="field-wrapper">
                        <label>No. of vacancy</label>
                            <div className="input-field">
                            <TextField
                            id="outlined-password-input"
                            label="Sample"
                            type="text"
                            autoComplete="current-password"
                            fullWidth
                            inputProps={{
                              style: {
                                fontSize: 14,
                                height: 50,
                                padding: '0 14px',
                              },
                          }}
                            />
                            </div>
                    </div>
                    <div className="field-wrapper">
                        <div className="label-wrapper">
                            <div className="input-field">
                            <label>Experience</label>
                            </div>
                            <div className="input-label-weight">
                            <label style={{marginRight:"10px"}}>Weightage</label>
                            <HelpOutlineIcon/>
                            </div>
                        </div>
                        <div className="label-wrapper">
                            <div className="input-field">
                                <TextField
                                id="outlined-password-input"
                                label="Sample"
                                type="text"
                                autoComplete="current-password"
                                onChange={this.handleClickExpOpen}
                                fullWidth
                                inputProps={{
                                  style: {
                                    fontSize: 14,
                                    height: 50,
                                    padding: '0 14px',
                                  },
                              }}
                                />
                            </div>
                            <div className="input-weight">
                                <TextField
                                id="outlined-password-input"
                                label="5"
                                type="text"
                                autoComplete="current-password"
                                fullWidth
                                inputProps={{
                                  style: {
                                    fontSize: 14,
                                    height: 50,
                                    padding: '0 14px',
                                  },
                              }}
                                />
                            </div>
                        </div>
                    </div>              
                    <div className="field-wrapper">
                        <div className="label-wrapper">
                            <div className="input-field">
                            <label>Languages</label>
                            </div>
                            <div className="input-label-weight">
                            <label style={{marginRight:"10px"}}>Weightage</label>
                            <HelpOutlineIcon/>
                            </div>
                        </div>
                        <div className="label-wrapper">
                            <div className="input-field">
                                <TextField
                                id="outlined-password-input"
                                label="Sample"
                                type="text"
                                autoComplete="current-password"
                                onChange={this.handleClickLangOpen}
                                fullWidth
                                inputProps={{
                                  style: {
                                    fontSize: 14,
                                    height: 50,
                                    padding: '0 14px',
                                  },
                              }}
                                />
                            </div>
                            <div className="input-weight">
                                <TextField
                                id="outlined-password-input"
                                label="5"
                                type="text"
                                autoComplete="current-password"
                                fullWidth
                                inputProps={{
                                  style: {
                                    fontSize: 14,
                                    height: 50,
                                    padding: '0 14px',
                                  },
                              }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="button-wrapper">
                    <Button variant="contained" style={{backgroundColor:"#e5e4e2",minHeight:"3rem", color:"#000",maxWidth:"10rem",minWidth:"10rem",marginRight:"2rem"}} size="large">
                        cancel
                        </Button>
                        <Button variant="contained" style={{maxWidth:"10rem",minWidth:"10rem",minHeight:"3rem", color:"#fff", backgroundColor:"#32cd32"}} size="large">
                        Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <Dialog
        onClose={this.handleClose}
        aria-labelledby="customized-dialog-title"
        open={this.state.openEdu}
        style={{maxWidth:"100% !important"}}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "948px",  // Set your width here
            },
          },
        }}
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
          Education
          <IconButton
          aria-label="close"
          onClick={this.handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="education-wrapper">
                <div className="wrapper-30">
                  <div className="popup-field-wrapper">
                    <label>Degree</label>
                    <div className="input-edu">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.degree}
                      label="Degree"
                      onChange={this.handleChange}
                      fullWidth
                     style={{height:"50px"}}
                     
                    >
                        {education.map((option) => (
                          <MenuItem style={{height:"40px",lineHeight:"40px"}} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>

                    </div>
                  </div>
                </div>
                <div className="wrapper-30">
                <div className="popup-field-wrapper">
                    <label>Specialization</label>
                    <div className="input-edu">
                        <TextField
                            id="outlined-password-input"
                            label="Sample"
                            type="text"
                            autoComplete="current-password"
                            value={this.state.spec}
                            fullWidth
                            onChange={this.handleSpec}

                            inputProps={{
                              style: {
                                fontSize: 14,
                                height: 50,
                                padding: '0 14px',
                              },
                          }}
                            />
                    </div>
                  </div>
                </div>
                <div className="wrapper-20">
                    <div className="popup-field-weight-wrapper">
                        <div>
                            <label style={{marginRight:"10px"}}>Weightage</label>
                            <HelpOutlineIcon/>
                        </div>
                        <div className="input-edu">
                        <TextField
                            id="outlined-password-input"
                            label="Weightage"
                            type="text"
                            autoComplete="current-password"
                            fullWidth
                            value={this.state.specWeightage}
                            onChange={this.handleSpecWeight}
                            inputProps={{
                              style: {
                                fontSize: 14,
                                height: 50,
                                padding: '0 14px',
                              },
                          }}
                            />
                    </div>
                    </div>
                </div>
                <div className="wrapper-20">
                    <Button variant="contained" style={{maxWidth:"10rem",minWidth:"10rem",maxHeight:"6rem",minHeight:"3.5rem", backgroundColor:"#32cd32",marginTop:"3.5rem"}} size="large" onClick={this.handleAddEducation}>
                        Add
                    </Button>
                </div>
          </div>
          <div className="education-wrapper">
                <div className="wrapper-30">
                  <div className="popup-field-wrapper">
                  <List sx={{ width: '100%' }}>
                    {this.state.edu.map((record, index) => {
                            return (
                              <>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {record.degree}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="outset" component="li" />
                      </>
                      );
                    })}
                    </List>
                    </div>   
                </div>
                <div className="wrapper-30">
                <div className="popup-field-wrapper">
                <List sx={{ width: '100%' }}>
                    {this.state.edu.map((record, index) => {
                            return (
                              <>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {record.spec}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="outset" component="li" />
                      </>
                      );
                    })}
                    </List>
                    </div>
                </div>
                <div className="wrapper-20">
                <div className="popup-field-weight-wrapper">
                <List sx={{ width: '100%' }}>
                    {this.state.edu.map((record, index) => {
                            return (
                              <>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {record.weightage}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="outset" component="li" />
                      </>
                      );
                    })}
                    </List>
                    </div>
                </div>
                <div className="wrapper-20">
                {this.state.edu.map((record, index) => {
                            return (
                    <Button variant="text" style={{maxWidth:"10rem",minWidth:"10rem",maxHeight:"6rem",minHeight:"3.5rem",marginTop:"1rem"}} size="large" onClick={(e)=>this.handleRemoveEducation(e,index)} color="error">
                      Remove
                    </Button>
                                          );
                                        })}
                    
                </div>
          </div>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={this.handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </Dialog>

      <Dialog
        onClose={this.handleCloseExp}
        aria-labelledby="customized-dialog-title"
        open={this.state.openExp}
        style={{maxWidth:"100% !important"}}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "948px",  // Set your width here
            },
          },
        }}
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseExp}>
          Experience
          <IconButton
          aria-label="close"
          onClick={this.handleCloseExp}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="education-wrapper">
                <div className="wrapper-30">
                  <div className="popup-field-wrapper">
                    <label>Job Role</label>
                    <div className="input-edu">
                    <TextField
                            id="outlined-password-input"
                            label="Sample"
                            type="text"
                            autoComplete="current-password"
                            value={this.state.role}
                            fullWidth
                            onChange={this.handleRole}
                            inputProps={{
                              style: {
                                fontSize: 14,
                                height: 50,
                                padding: '0 14px',
                              },
                          }}
                            />

                    </div>
                  </div>
                </div>
                <div className="wrapper-20">
                <div className="popup-field-weight-wrapper">
                    <label>Year(s)</label>
                    <div className="input-edu">
                        <TextField
                            id="outlined-password-input"
                            label="Sample"
                            type="text"
                            autoComplete="current-password"
                            value={this.state.years}
                            fullWidth
                            onChange={this.handleYears}
                            inputProps={{
                              style: {
                                fontSize: 14,
                                height: 50,
                                padding: '0 14px',
                              },
                          }}
                            />
                    </div>
                  </div>
                </div>
                <div className="wrapper-20">
                <div className="popup-field-weight-wrapper">
                    <label>Month(s)</label>
                    <div className="input-edu">
                        <TextField
                            id="outlined-password-input"
                            label="Sample"
                            type="text"
                            autoComplete="current-password"
                            value={this.state.months}
                            fullWidth
                            onChange={this.handleMonths}
                            inputProps={{
                              style: {
                                fontSize: 14,
                                height: 50,
                                padding: '0 14px',
                              },
                          }}
                            />
                    </div>
                  </div>
                </div>
                <div className="wrapper-15">
                    <div className="popup-field-weight-wrapper">
                        <div>
                            <label style={{marginRight:"10px"}}>Weightage</label>
                            <HelpOutlineIcon/>
                        </div>
                        <div className="input-edu">
                        <TextField
                            id="outlined-password-input"
                            label="Weightage"
                            type="text"
                            autoComplete="current-password"
                            fullWidth
                            value={this.state.expWeightage}
                            onChange={this.handleExpWeight}
                            inputProps={{
                              style: {
                                fontSize: 14,
                                height: 50,
                                padding: '0 14px',
                              },
                          }}
                            />
                    </div>
                    </div>
                </div>
                <div className="wrapper-15">
                    <Button variant="contained" style={{maxWidth:"10rem",minWidth:"10rem",maxHeight:"6rem",minHeight:"3.5rem", backgroundColor:"#32cd32",marginTop:"3.5rem"}} size="large" onClick={this.handleAddExperience}>
                        Add
                    </Button>
                </div>
          </div>
          <div className="education-wrapper">
                <div className="wrapper-30">
                  <div className="popup-field-wrapper">
                  <List sx={{ width: '100%' }}>
                    {this.state.exp.map((record, index) => {
                            return (
                              <>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {record.role}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="outset" component="li" />
                      </>
                      );
                    })}
                    </List>
                    </div>   
                </div>
                <div className="wrapper-20">
                <div className="popup-field-weight-wrapper">
                <List sx={{ width: '100%' }}>
                    {this.state.exp.map((record, index) => {
                            return (
                              <>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {record.years}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="outset" component="li" />
                      </>
                      );
                    })}
                    </List>
                    </div>
                </div>
                <div className="wrapper-20">
                <div className="popup-field-weight-wrapper">
                <List sx={{ width: '100%' }}>
                    {this.state.exp.map((record, index) => {
                            return (
                              <>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {record.months}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="outset" component="li" />
                      </>
                      );
                    })}
                    </List>
                    </div>
                </div>
                <div className="wrapper-15">
                <div className="popup-field-weight-wrapper">
                <List sx={{ width: '100%' }}>
                    {this.state.exp.map((record, index) => {
                            return (
                              <>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {record.weightage}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="outset" component="li" />
                      </>
                      );
                    })}
                    </List>
                    </div>
                </div>
                <div className="wrapper-15">
                {this.state.exp.map((record, index) => {
                            return (
                    <Button variant="text" style={{maxWidth:"10rem",minWidth:"10rem",maxHeight:"6rem",minHeight:"3.5rem",marginTop:"1rem"}} size="large" onClick={(e)=>this.handleRemoveExperience(e,index)} color="error">
                      Remove
                    </Button>
                                          );
                                        })}
                    
                </div>
          </div>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={this.handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </Dialog>

        {/* Language Dialog */}
      
      <Dialog
        onClose={this.handleCloseLang}
        aria-labelledby="customized-dialog-title"
        open={this.state.openLang}
        style={{maxWidth:"100% !important"}}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "948px",  // Set your width here
            },
          },
        }}
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseLang}>
          Language
          <IconButton
          aria-label="close"
          onClick={this.handleCloseLang}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="education-wrapper">
                <div className="wrapper-30">
                <div className="popup-field-wrapper">
                    <label>Language</label>
                    <div className="input-edu">
                        <TextField
                            id="outlined-password-input"
                            label="Sample"
                            type="text"
                            autoComplete="current-password"
                            value={this.state.lang}
                            fullWidth
                            onChange={this.handleLang}
                            />
                    </div>
                  </div>  
                </div>
                <div className="wrapper-30">
                <div className="popup-field-wrapper">
                    <label>Proficiency</label>
                    <div className="input-edu">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.profi}
                      label="Degree"
                      onChange={this.handleChangeProfi}
                      fullWidth
                      inputProps={{
                        style: {
                          fontSize: 14,
                          height: 50,
                          padding: '0 14px',
                        },
                    }}
                    >
                        {proficiency.map((option) => (
                          <MenuItem value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>

                    </div>
                  </div>
                
                </div>
                <div className="wrapper-20">
                    <div className="popup-field-weight-wrapper">
                        <div>
                            <label style={{marginRight:"10px"}}>Weightage</label>
                            <HelpOutlineIcon/>
                        </div>
                        <div className="input-edu">
                        <TextField
                            id="outlined-password-input"
                            label="Weightage"
                            type="text"
                            autoComplete="current-password"
                            fullWidth
                            value={this.state.langWeightage}
                            onChange={this.handleLangWeight}
                            inputProps={{
                              style: {
                                fontSize: 14,
                                height: 50,
                                padding: '0 14px',
                              },
                          }}
                            />
                    </div>
                    </div>
                </div>
                <div className="wrapper-20">
                    <Button variant="contained" style={{maxWidth:"10rem",minWidth:"10rem",maxHeight:"6rem",minHeight:"3.5rem", backgroundColor:"#32cd32",marginTop:"3.5rem"}} size="large" onClick={this.handleAddLanguage}>
                        Add
                    </Button>
                </div>
          </div>
          <div className="education-wrapper">
                <div className="wrapper-30">
                  <div className="popup-field-wrapper">
                  <List sx={{ width: '100%' }}>
                    {this.state.language.map((record, index) => {
                            return (
                              <>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {record.lang}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="outset" component="li" />
                      </>
                      );
                    })}
                    </List>
                    </div>   
                </div>
                <div className="wrapper-30">
                <div className="popup-field-wrapper">
                <List sx={{ width: '100%' }}>
                    {this.state.language.map((record, index) => {
                            return (
                              <>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {record.profi}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="outset" component="li" />
                      </>
                      );
                    })}
                    </List>
                    </div>
                </div>
                <div className="wrapper-20">
                <div className="popup-field-weight-wrapper">
                <List sx={{ width: '100%' }}>
                    {this.state.language.map((record, index) => {
                            return (
                              <>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {record.weightage}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="outset" component="li" />
                      </>
                      );
                    })}
                    </List>
                    </div>
                </div>
                <div className="wrapper-20">
                {this.state.language.map((record, index) => {
                            return (
                    <Button variant="text" style={{maxWidth:"10rem",minWidth:"10rem",maxHeight:"6rem",minHeight:"3.5rem",marginTop:"1rem"}} size="large" onClick={(e)=>this.handleRemoveLanguage(e,index)} color="error">
                      Remove
                    </Button>
                                          );
                                        })}
                    
                </div>
          </div>
        </DialogContent>
      </Dialog>

        {/* Skills Dialog */}
      
        <Dialog
        onClose={this.handleCloseSkills}
        aria-labelledby="customized-dialog-title"
        open={this.state.openSkills}
        style={{maxWidth:"100% !important"}}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "948px",  // Set your width here
            },
          },
        }}
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseSkills}>
          Skills
          <IconButton
          aria-label="close"
          onClick={this.handleCloseSkills}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="education-wrapper">
                <div className="wrapper-30">
                <div className="popup-field-wrapper">
                    <label>Skill</label>
                    <div className="input-edu">
                        <TextField
                            id="outlined-password-input"
                            label="Sample"
                            type="text"
                            autoComplete="current-password"
                            value={this.state.skill}
                            fullWidth
                            onChange={this.handleSkill}
                            inputProps={{
                              style: {
                                fontSize: 14,
                                height: 50,
                                padding: '0 14px',
                              },
                          }}
                            />
                    </div>
                  </div>  
                </div>
                <div className="wrapper-20">
                    <div className="popup-field-weight-wrapper">
                        <div>
                            <label style={{marginRight:"10px"}}>Weightage</label>
                            <HelpOutlineIcon/>
                        </div>
                        <div className="input-edu">
                        <TextField
                            id="outlined-password-input"
                            label="Weightage"
                            type="text"
                            autoComplete="current-password"
                            fullWidth
                            value={this.state.skillWeightage}
                            onChange={this.handleSkillWeight}
                            inputProps={{
                              style: {
                                fontSize: 14,
                                height: 50,
                                padding: '0 14px',
                              },
                          }}
                            />
                    </div>
                    </div>
                </div>
                <div className="wrapper-20">
                    <Button variant="contained" style={{maxWidth:"10rem",minWidth:"10rem",maxHeight:"6rem",minHeight:"3.5rem", backgroundColor:"#32cd32",marginTop:"3.5rem"}} size="large" onClick={this.handleAddSkills}>
                        Add
                    </Button>
                </div>
          </div>
          <div className="education-wrapper">
                <div className="wrapper-30">
                  <div className="popup-field-wrapper">
                  <List sx={{ width: '100%' }}>
                    {this.state.skills.map((record, index) => {
                            return (
                              <>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {record.skill}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="outset" component="li" />
                      </>
                      );
                    })}
                    </List>
                    </div>   
                </div>
                
                <div className="wrapper-20">
                <div className="popup-field-weight-wrapper">
                <List sx={{ width: '100%' }}>
                    {this.state.skills.map((record, index) => {
                            return (
                              <>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {record.weightage}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="outset" component="li" />
                      </>
                      );
                    })}
                    </List>
                    </div>
                </div>
                <div className="wrapper-20">
                {this.state.skills.map((record, index) => {
                            return (
                    <Button variant="text" style={{maxWidth:"10rem",minWidth:"10rem",maxHeight:"6rem",minHeight:"3.5rem",marginTop:"1rem"}} size="large" onClick={(e)=>this.handleRemoveSkill(e,index)} color="error">
                      Remove
                    </Button>
                                          );
                                        })}
                    
                </div>
          </div>
        </DialogContent>
      </Dialog>
      </>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <CreateVacancy {...props} navigate={navigate} />
}

export default WithNavigate;

  