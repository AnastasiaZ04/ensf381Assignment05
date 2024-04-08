import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router and Routes
import Homepage from './components/Homepage';
import Productpage from './components/Productpage';
import LoginPage from './components/LoginPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const loginState = localStorage.getItem('loginSuccess');
    if (loginState === "true"){
      setLoggedIn(true);
      localStorage.clear();
    }
    else{
      setLoggedIn(false);
    }
  }, [])

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={localStorage.getItem('loginSuccess') ? <Productpage/> : <LoginPage/>} />    
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
