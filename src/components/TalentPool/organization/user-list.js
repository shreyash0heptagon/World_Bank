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
import { Link } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


class UserList extends Component {

    constructor(props) {
      super(props);
      this.state = { isLoading: true}
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
    
        // if (this.state.previousSortKey == key) {
        //   if (this.isAsc == true) {
        //     this.isAsc = false
        //   } else if (this.isAsc == false) {
        //     this.isAsc = true
        //   }
        // }
        // console.log(!this.isAsc)
        // let order = this.isAsc ? 'asc' : 'desc'
        // this.setState({ sort_by: key, order_by: order, previousSortKey: key, isLoading: true },
        //   () => {
        //     console.log(this.state)
        //     this.getCandidateData()
        //   })
      }
    
    render() {

        const columns = [
            { title: "Name", field: "name",render: (rowData) => <div><div>{rowData.name}</div></div>, customSort: () => 0 },
            { title: "Email", field: "email", width: "20%", render: (rowData) => <div><div>{rowData.email}</div></div>, customSort: () => 0 },
            { title: "Designation", field: "designation",render: (rowData) => <div><div>{rowData.designation}</div></div>, customSort: () => 0 },
            { title: "Department", field: "department", render: (rowData) => <div><div>{rowData.department}</div></div>, customSort: () => 0 },
            { title: "Mobile Number", field: "phone", render: (rowData) => <div><div>{rowData.department}</div></div>, sorting: false, customSort: () => 0 },
            { title: "", field: "action", sorting: false, render: (rowData) => <div><EditOutlinedIcon/><DeleteOutlineOutlinedIcon/></div> }
          ];
      

          
        return (
            <>
                <div className='role-info'>
                    <div className="nav-label-wrapper">
                        <a className='navbar-crumb'>Organization</a><label className="mx-2">{'>'}</label><label className="navbar-crumb"> Organization Name</label><label className="mx-2">{'>'}</label><label className="nav-text"> User List</label>
                    </div>
                </div>
                <div className="toggle-menu-wrapper">
                    <div className="organization-wrapper">
                        <div className="col-2">
                            <img src=""/>
                        </div>
                        <div className="col-8">
                        <Typography variant="body1" style={{fontWeight:"bold"}}>Organization Name</Typography>
                                <Typography variant="body2" color="text.secondary">
                                        <IconButton aria-label="settings">
                                            <PersonOutlineOutlinedIcon /> 
                                        </IconButton>
                                        Michael
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                        <IconButton aria-label="settings">
                                            <EmailOutlinedIcon /> 
                                        </IconButton>
                                        Sample@gmail.com
                                        </Typography>
                        </div>
                        <div className="col-2 button-wrapper">
                            <Button variant="outlined" endIcon={<EditOutlinedIcon />}>
                                Edit
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-2">
                            <h4 style={{fontWeight:"bold",padding:"1rem"}}>User List</h4>
                        </div>
                        <div className="col-lg-2 offset-lg-6">
                            <TextField
                            label="Search"
                            id="filled-start-adornment"
                            sx={{ m: 1, width: '25ch' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>,
                            }}
                            fullWidth
                            />
                        </div>
                       <div className="col-lg-2">
                       <Link to="/add-user" style={{textDecoration:"none"}}>
                            <Button variant="contained" startIcon={<AddIcon/>} style={{maxWidth:"10rem",minWidth:"14rem", minHeight:"3.5rem",color:"#fff", borderRadius:"0.3rem", backgroundColor:"#32cd32"}} size="large">
                                Add Users             
                            </Button>
                            </Link>
                        </div>
                    </div>

                    <MaterialTable title="Basic Table" options={{ showTitle: false, search: false, pageSize: 10, selection: true, paging: true }} icons={{ SortArrow: () => <img src={SortIcon} alt="" className="mx-1" onClick={(event) => { this.sortTable(event) }} /> }} columns={columns} data={users}  />
                   
                </div>
            </>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <UserList {...props} navigate={navigate} />
}

export default WithNavigate;

  