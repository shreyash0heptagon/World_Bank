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
import { Link } from 'react-router-dom';



class Organization extends Component {

    constructor(props) {
      super(props);
      this.state = { isLoading: true}
     }
    
 
    render() {

        

          
        return (
            <>
                <div className='role-info'>
                    <div className="nav-label-wrapper">
                        <a className='nav-labelo'>Organization</a>
                    </div>
                </div>
                <div className="toggle-menu-wrapper">
                    <div className="row">
                        <div className="col-lg-2 offset-lg-8">
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
                        <Link to="/create-organization" style={{textDecoration:"none"}}>
                            <Button variant="contained" startIcon={<AddIcon/>} style={{maxWidth:"10rem",minWidth:"14rem",fontSize:"12px", minHeight:"3.5rem",color:"#fff", borderRadius:"0.3rem", backgroundColor:"#32cd32"}} size="large">
                                Create Organization              
                            </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 mt-5">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="140"
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    />
                                    <Divider variant="outset" />
                                    <CardHeader
                                       
                                        action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                        }
                                        title="Organization Name 1"
                                    />
                                    <CardContent>
                                       
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
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                        <div className="col-lg-3 mt-5">
                        <Link to="/user-list" style={{textDecoration:"none"}}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="140"
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    />
                                    <Divider variant="outset" />
                                    <CardHeader
                                       
                                        action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                        }
                                        title="Organization Name 1"
                                    />
                                    <CardContent>
                                       
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
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            </Link>
                        </div>
                        <div className="col-lg-3 mt-5">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="140"
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    />
                                    <Divider variant="outset" />
                                    <CardHeader
                                       
                                        action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                        }
                                        title="Organization Name 1"
                                    />
                                    <CardContent>
                                       
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
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                        <div className="col-lg-3 mt-5">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="140"
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    />
                                    <Divider variant="outset" />
                                    <CardHeader
                                       
                                        action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                        }
                                        title="Organization Name 1"
                                    />
                                    <CardContent>
                                       
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
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                        <div className="col-lg-3 mt-5">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="140"
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    />
                                    <Divider variant="outset" />
                                    <CardHeader
                                       
                                        action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                        }
                                        title="Organization Name 1"
                                    />
                                    <CardContent>
                                       
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
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                        <div className="col-lg-3 mt-5">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="140"
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    />
                                    <Divider variant="outset" />
                                    <CardHeader
                                       
                                        action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                        }
                                        title="Organization Name 1"
                                    />
                                    <CardContent>
                                       
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
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                        <div className="col-lg-3 mt-5">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="140"
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    />
                                    <Divider variant="outset" />
                                    <CardHeader
                                       
                                        action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                        }
                                        title="Organization Name 1"
                                    />
                                    <CardContent>
                                       
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
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                        <div className="col-lg-3 mt-5">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="140"
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    />
                                    <Divider variant="outset" />
                                    <CardHeader
                                       
                                        action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                        }
                                        title="Organization Name 1"
                                    />
                                    <CardContent>
                                       
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
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    </div>
                </div>
            </>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <Organization {...props} navigate={navigate} />
}

export default WithNavigate;

  