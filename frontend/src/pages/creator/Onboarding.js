import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import Navbar from '../../components/Navbar';

function CreatorOnboarding() {
  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Creator Onboarding
          </Typography>
          <Typography variant="body1">
            Welcome to Revvy! Let's get your creator profile set up.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default CreatorOnboarding;
