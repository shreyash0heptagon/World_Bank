import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/job-role-info" element={<JobRoleInfo />} />
              <Route path="/candidate-overall-info" element={<CandidateOverallInfo />} />
              <Route path="/compare-candidates" element={<CompareCandidates />} />
              <Route path="/create-vacancy" element={<CreateVacancy />} />
              <Route path="/organization" element={<Organization />} />
              <Route path="/user-list" element={<UserList />} />
              <Route path="/loader" element={<Loader />} />
            </Routes>
          </div>
        </Scrollbars>
      </Router>
    </Suspense>
  );
}

export default App;
