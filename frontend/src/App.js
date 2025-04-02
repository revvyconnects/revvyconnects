import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Auth Context
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/layout/Layout';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Creator pages
import CreatorDashboard from './pages/creator/Dashboard';
import CreatorOnboarding from './pages/creator/Onboarding';
import CreatorLinks from './pages/creator/Links';
import CreatorSettings from './pages/creator/Settings';
import CreatorProfile from './pages/creator/Profile';

// Sponsor pages
import SponsorDashboard from './pages/sponsor/Dashboard';
import SponsorOnboarding from './pages/sponsor/Onboarding';
import Campaigns from './pages/sponsor/Campaigns';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

function App() {
  console.log('App component rendering');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Creator routes */}
            <Route
              path="/creator"
              element={
                <PrivateRoute>
                  <Layout role="creator">
                    <CreatorDashboard />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/creator/onboarding"
              element={
                <PrivateRoute>
                  <Layout role="creator">
                    <CreatorOnboarding />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/creator/links"
              element={
                <PrivateRoute>
                  <Layout role="creator">
                    <CreatorLinks />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/creator/settings"
              element={
                <PrivateRoute>
                  <Layout role="creator">
                    <CreatorSettings />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/creator/profile"
              element={
                <PrivateRoute>
                  <Layout role="creator">
                    <CreatorProfile />
                  </Layout>
                </PrivateRoute>
              }
            />

            {/* Sponsor routes */}
            <Route
              path="/sponsor"
              element={
                <PrivateRoute>
                  <Layout role="sponsor">
                    <SponsorDashboard />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/sponsor/onboarding"
              element={
                <PrivateRoute>
                  <Layout role="sponsor">
                    <SponsorOnboarding />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/sponsor/campaigns"
              element={
                <PrivateRoute>
                  <Layout role="sponsor">
                    <Campaigns />
                  </Layout>
                </PrivateRoute>
              }
            />

            {/* Default route */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;



