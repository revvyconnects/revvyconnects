import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import Navbar from '../../components/Navbar';

function SponsorDashboard() {
  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Sponsor Dashboard
          </Typography>
          <Typography variant="body1">
            Welcome to your sponsor dashboard. Manage your campaigns and track performance.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default SponsorDashboard;
