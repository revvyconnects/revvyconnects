import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';

console.log("✅ Login component loaded");

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('creator');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting login with role:", role);
    // TODO: Implement actual authentication
    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('userRole', role);
    const path = `/${role}`;
    console.log("Navigating to:", path);
    // Use replace: true to prevent back button from returning to login
    navigate(path, { replace: true });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Welcome to Revvy
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <ToggleButtonGroup
              value={role}
              exclusive
              onChange={(e, newRole) => {
                console.log("Role changed to:", newRole);
                if (newRole) setRole(newRole);
              }}
            >
              <ToggleButton value="creator">Creator</ToggleButton>
              <ToggleButton value="sponsor">Sponsor</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/register')}
            >
              Don't have an account? Sign Up
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;
