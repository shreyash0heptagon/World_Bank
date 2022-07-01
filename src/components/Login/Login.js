import React, { useState, useContext } from 'react';
import WorldBankLogo from '../../assets/World_Bank_Group_logo.svg';
import BannerIllustration from '../../assets/group.svg';
import './Login.css';
import api from "../Services/apiService";

import LoaderScreen from "../Shared/loader/loader";

import { useNavigate, Navigate } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {AccountContext} from '../Services/Account'


const Login = ({ history }) => {

  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    textChange: 'Sign In'
  });
  const { email, password1 } = formData;
  const { authenticate } = useContext(AccountContext);
  const [loading,setLoading]=useState(false);
  const [redirect,setRedirect]=useState(false);
  const [error,setError]=useState(false);
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  let navigate = useNavigate();


  const login = (e) => {
    setLoading(true )
    let loggedin=false;
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: 'Submitting' });
      
      authenticate(email,password1)
      .then(data=>{
        console.log("logged in ",data)
        loggedin=true;
        console.log(loggedin)
        toast.info("Logged in")
        if(loggedin===true){
          console.log("loggedin");
          setLoading(false);
          navigate('/dashboard')
        }
        // history.push('/dashboard');
        // return <Navigate to="/dashboard" />
      })
      .catch(err =>{
        console.error("failed to login ",err)
        console.error(err.toString().split(" ")[0])
        if(err.toString().split(" ")[0]==="NotAuthorizedException:")
        navigate('/');
          toast.error("Incorrect username or password")    
      })
    } else {
      toast.error('Please fill all fields');
      setLoading(false)
      setError(true);
    }
  }
    if (loading) {
      return <LoaderScreen />
    }

    const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setError(false)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );

    return (
      <div className="row login-wrapper m-0">
        <div className="col-lg-6 banner-section">
          <div className="banner-info-wrapper">
            <img src={WorldBankLogo} alt="logo" />
            <h4 className="banner-info mt-4">Welcome to the combined listing of current job openings at the World Bank Group</h4>
            <p className="banner-description mt-4">Skillate is an advanced decision-making engine to make hiring easy, fast, and transparent.</p>
          </div>
          <img src={BannerIllustration} alt="" className="banner-illustration mx-4" />
        </div>
        <div className="col-lg-6 m-auto login-form-section">
          <div className="login-form-wrapper m-auto col-lg-8">
            <h4>Log in to your account</h4>
            <label className="mt-4">Email Address</label>
            <input type="text" className="col-lg-12 login-form-input" onChange={handleChange('email')}
                  value={email} />
            <label className="mt-4">Password</label>
            <input type="password" className="col-lg-12 login-form-input" onChange={handleChange('password1')}
                  value={password1} />
            <div className="mt-2 forgot-password-label"><a href="#" className="text-decoration-none">Forgot Password?</a></div>
            <div className="login-btn mt-2 col-md-12" onClick={login}>Log In</div>
            <hr className="col-lg-12 mt-4" />
            <div className="text-center"><label>or</label></div>
            <div className="login-sso-btn mt-3 col-md-12">Log in with SSO</div>
          </div>
        </div>
        <Snackbar
          open={error}
          autoHideDuration={5000}
          onClose={() => setError(false)}
          message="Login failed. Please check the credentials !"
          action={action}
        />
      </div>
    );
  
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <Login {...props} navigate={navigate} />
}

export default WithNavigate;
