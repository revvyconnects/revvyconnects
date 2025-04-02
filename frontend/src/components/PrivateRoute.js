import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Typography } from '@mui/material';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Validate children prop
  const validChildren = React.isValidElement(children) ? children : null;
  if (!validChildren) {
    console.error('PrivateRoute: Invalid children prop provided. Expected a valid React element.');
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Error: Invalid content provided to protected route
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('PrivateRoute CHILDREN TYPE:', typeof children, children);
  return React.isValidElement(children)
    ? <>{children}</>
    : <Typography color="error">Invalid children in PrivateRoute</Typography>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute; 