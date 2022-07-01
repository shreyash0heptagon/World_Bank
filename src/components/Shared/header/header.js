import React, { useState, useContext ,useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WorldBankLogo from '../../../assets/World_Bank_Group_logo.svg';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import {AccountContext} from '../../Services/Account';
import './header.css';


const Header =({history})=>{

  // constructor(props) {
  //   super(props);
  //   this.state = { activeElem: "shortlist-automation",open:false, anchorEl: null };
  // }
  const [activeElem,setActiveElem]=useState("shortlist-automation");
  const [open,setOpen]=useState(false);
  const [anchorEl,setAnchorEl]=useState(null);

  let navigate = useNavigate();
  const { logout } = useContext(AccountContext);

 const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
    setOpen(!open)
  };
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };
  const handleLogout =()=>{
    console.log("logout entered");
    logout();
    navigate('/');
  }
  useEffect(() => {
    if(localStorage.getItem("activeElem")!==null){
      setActiveElem(localStorage.getItem("activeElem"))
    }
  }, [])
  
  const changeActiveElem = (activeElem) => {
    localStorage.setItem("activeElem",activeElem);
    setActiveElem(activeElem);
    if(activeElem==="talent-pool"){
      navigate("/create-vacancy")
    }
    if(activeElem==="shortlist-automation"){
      navigate("/dashboard");
    }
  }



    return (
      <div className="header-wrapper row">
        <div className="col-lg-2">
          <img src={WorldBankLogo} className="p-3" alt="" />
        </div>
        <div className="col-lg-6">
          <ul className="header-tabs-bar h-100">
            <li className={activeElem === 'shortlist-automation' ? 'tab-item my-auto mx-3 active' : 'tab-item my-auto mx-3'} onClick={() => changeActiveElem('shortlist-automation')}>Shortlist Automation</li>
            <li className={activeElem === 'talent-pool' ? 'tab-item my-auto mx-3 active' : 'tab-item my-auto mx-3'} onClick={() => changeActiveElem('talent-pool')}>Talent Pool</li>
          </ul>
        </div>
        <div className="col-lg-2 offset-lg-2 my-auto">
              <span className="user-name">Test</span>
              <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <ArrowDropDownIcon style={{ color: 'white', fontSize:40 }}/>
          </IconButton>
        </div>
        <Menu
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorEl={anchorEl}   
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}   
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      </div >
    );
}
function WithNavigate(props) {
  let navigate = useNavigate();
  const location = useLocation();
  return <Header {...props} navigate={navigate} location={location} />
}

export default WithNavigate;
