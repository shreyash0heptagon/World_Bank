import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route,  Navigate } from 'react-router-dom';
import Header from './components/Shared/header/header';

import { Scrollbars } from 'react-custom-scrollbars';
import Loader from './components/Shared/loader/loader';
import { Account } from '../src/components/Services/Account';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const Login = lazy(() => import('./components/Login/Login'));
  const Dashboard = lazy(() => import('./components/Shortlist-automation/dashboard/dashboard'));
  const JobRoleInfo = lazy(() => import('./components/Shortlist-automation/job-role-info/job-role-info'));
  const CandidateOverallInfo = lazy(() => import('./components/Shortlist-automation/candidate-overall-info/candidate-overall-info'));
  const CompareCandidates = lazy(() => import('./components/Shortlist-automation/compare-candidates/compare-candidates'));
  const CreateVacancy = lazy(()=> import('./components/TalentPool/create-vacancy/create-vacany'));
  const Organization = lazy(()=> import('./components/TalentPool/organization/organization'));
  const UserList= lazy(()=> import('./components/TalentPool/organization/user-list'));
  const CreateOrganization= lazy(()=> import('./components/TalentPool/organization/create-organization'));
  const AddUser= lazy(()=> import('./components/TalentPool/organization/add-user'));
  let session=localStorage.getItem('login_status');
  console.log(localStorage.getItem('login_status'))
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Scrollbars style={{ height: "100vh" }}>
          {/* <div className='col-lg-12'>
            {window.location.pathname === '/' ? '' : <Header isLoggedIn={isLoggedIn} />}
          </div> */}
          <div className='col-lg-12'>
            <Routes>
              <Route path="/" element={<Account><Login /></Account>} />
              <Route path="/dashboard" element={<Account><Dashboard /></Account> } />
              <Route path="/job-role-info" element={localStorage.getItem('login_status')!=="true" ? <Navigate to="/" /> : <JobRoleInfo />} />
              <Route path="/candidate-overall-info" element={localStorage.getItem('login_status')!=="true" ? <Navigate to="/" /> : <CandidateOverallInfo />} />
              <Route path="/compare-candidates" element={localStorage.getItem('login_status')!=="true" ? <Navigate to="/" /> : <CompareCandidates />} />
              <Route path="/create-vacancy" element={localStorage.getItem('login_status')!=="true" ? <Navigate to="/" /> : <CreateVacancy />} />
              <Route path="/organization" element={localStorage.getItem('login_status')!=="true" ? <Navigate to="/" /> : <Organization />} />
              <Route path="/user-list" element={localStorage.getItem('login_status')!=="true" ? <Navigate to="/" /> : <UserList />} />
              <Route path="/create-organization" element={localStorage.getItem('login_status')!=="true" ? <Navigate to="/" /> : <CreateOrganization />} />
              <Route path="/add-user" element={localStorage.getItem('login_status')!=="true" ? <Navigate to="/" /> : <AddUser />} />
              <Route path="/loader" element={<Loader />} />
            </Routes>
          </div>
        </Scrollbars>
      </Router>
    </Suspense>
  );
}

export default App;
