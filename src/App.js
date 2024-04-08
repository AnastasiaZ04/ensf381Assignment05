import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import BrowserRouter as Router and Routes
import Homepage from './components/Homepage';
import Productpage from './components/Productpage';
import LoginPage from './components/LoginPage';



const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const goToProducts = () => {
    if (authenticated){
      return <Navigate to = "/products"/>
    }
    else{
      return <Navigate to = "/login"/>
    }

  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={goToProducts()} />    
          <Route path='/login' element={<LoginPage setAuthenticated = {setAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
