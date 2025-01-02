import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


export const PrivateRoute = () => {
  return localStorage.getItem('user') ? <Outlet /> : <Navigate to="/home" />;
};
