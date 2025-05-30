import React from 'react';
import { Navigate } from 'react-router-dom';

// Check if JWT token is expired
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now(); // exp is in seconds
  } catch (err) {
    return true;
  }
};

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const admin = JSON.parse(localStorage.getItem('admin'));

  if (role === 'admin') {
    if (!admin || !admin.token || isTokenExpired(admin.token)) {
      localStorage.removeItem('admin');
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  if (!user || !user.token || isTokenExpired(user.token)) {
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
