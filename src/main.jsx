import { StrictMode } from 'react';  
import { createRoot } from 'react-dom/client';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';   
import './index.css';  
import Sign from './components/Sign';  
import Login from './components/Login';  
import Dashboard from './components/Dashboard'
createRoot(document.getElementById('root')).render(  
  <StrictMode>  
    <Router>  
      <Routes>  
        <Route path="/" element={<Sign />} />   
        <Route path="/login" element={<Login />} /> 
        <Route path='/dashboard' element = {<Dashboard/>}  />
      </Routes>  
    </Router>  
  </StrictMode>,  
);