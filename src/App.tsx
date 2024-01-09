import React from 'react';
import './App.css';
import SignInPage from './components/SignInPage';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
      <Router>
        <div className='App'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignInPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
