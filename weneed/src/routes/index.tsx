import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import SignUp from '../pages/SignUp/SignUp';
import Login from '../pages/Login/Login';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/signup" element={<SignUp />} /> 
      <Route path="/login" element={<Login />} /> 
    </Routes>
  );
};

export default AppRoutes;
