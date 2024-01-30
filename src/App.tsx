import React from 'react';
import './App.css';
import SignInPage from './components/SignInPage';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LinkedInCallback } from "react-linkedin-login-oauth2";

function App() {
  return (
      <Router>
        <div className='App'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/linkedin" element={<LinkedInCallback />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
