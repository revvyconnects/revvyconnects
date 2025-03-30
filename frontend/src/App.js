import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Creator pages
import CreatorDashboard from './pages/creator/Dashboard';
import CreatorOnboarding from './pages/creator/Onboarding';
import CreatorLinks from './pages/creator/Links';

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

// Debug component to log route changes
function DebugRouter() {
  const location = useLocation();
  console.log('Current location:', location.pathname);
  return null;
}

function App() {
  console.log('App component rendered');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <DebugRouter />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/creator" element={<CreatorDashboard />} />
          <Route path="/creator/onboarding" element={<CreatorOnboarding />} />
          <Route path="/creator/links" element={<CreatorLinks />} />
          <Route path="/sponsor" element={<SponsorDashboard />} />
          <Route path="/sponsor/onboarding" element={<SponsorOnboarding />} />
          <Route path="/sponsor/campaigns" element={<Campaigns />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;



