import React, { Component } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './organization.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Header from "../../Shared/header/header";
import AddIcon from '@mui/icons-material/Add';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MaterialTable from "material-table";
import Pagination from '@mui/material/Pagination';
import {users} from './dumyUsers';
import SortIcon from "./../../../assets/sort.svg"
import FileUpload from "react-material-file-upload";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { styled } from '@mui/material/styles';


class AddUser extends Component {

    constructor(props) {
      super(props);
      this.state = { isLoading: true,files:[]}

     }
    
    
    render() {

      
        const Input = styled('input')({
            display: 'none',
          });
          
        return (
            <>
                <div className='role-info'>
                    <div className="nav-label-wrapper">
                        <a className='navbar-crumb'>Organization</a><label className="mx-2">{'>'}</label><a className='navbar-crumb'>Organization Name</a><label className="mx-2">{'>'}</label><a className='navbar-crumb'>User List</a><label className="mx-2">{'>'}</label><label className="nav-text"> Add User</label>
                    </div>
                    <div className="nav-label-wrapper">
                        <a className='nav-labelo'>Add User</a>
                    </div>
                </div>
                <div className="toggle-menu-wrapper">
                    <div className="create-organization-wrapper">
                        <div className="col-4">
                           
                            <div className="org-field-wrapper">
                                <label for="logo" style={{marginBottom:"1rem"}}>Name</label>
                                <TextField
                            id="outlined-password-input"
                            label="Name"
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
                            <div className="org-field-wrapper">
                                <label for="logo" style={{marginBottom:"1rem"}}>Designation</label>
                                <TextField
                            id="outlined-password-input"
                            label="Designation"
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
                            <div className="org-field-wrapper">
                                <label for="logo" style={{marginBottom:"1rem"}}>Mobile Number</label>
                                <TextField
                            id="outlined-password-input"
                            label="1223456789"
                            type="number"
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
                        <div className="col-4">
                            <div className="org-field-wrapper">
                                <label for="logo" style={{marginBottom:"1rem"}}>Email</label>
                                <TextField
                            id="outlined-password-input"
                            label="Email"
                            type="email"
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
                            <div className="org-field-wrapper">
                                <label for="logo" style={{marginBottom:"1rem"}}>Department</label>
                                <TextField
                            id="outlined-password-input"
                            label="Department"
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
                            <div className="org-field-wrapper" style={{visibility:"hidden"}}>
                                <label for="logo" style={{marginBottom:"1rem"}}>Department</label>
                                <TextField
                            id="outlined-password-input"
                            label="Department"
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
                            <div style={{padding:"2rem",margin:"1rem"}}>
                            <Button variant="contained" style={{backgroundColor:"#e5e4e2",minHeight:"3rem", color:"#000",maxWidth:"10rem",minWidth:"10rem",marginRight:"2rem"}} size="large">
                        cancel
                        </Button>
                        <Button variant="contained" style={{maxWidth:"10rem",minWidth:"10rem",minHeight:"3rem", color:"#fff", backgroundColor:"#32cd32"}} size="large">
                        Add
                        </Button>
                        </div>
                        </div>
                        <div className="col-4">

                        </div>
                    </div>
                </div>
            </>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <AddUser {...props} navigate={navigate} />
}

export default WithNavigate;

  