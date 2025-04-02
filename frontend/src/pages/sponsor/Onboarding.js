import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';

function SponsorOnboarding() {
  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Sponsor Onboarding
          </Typography>
          <Typography variant="body1">
            Welcome to Revvy! Let's get your sponsor profile set up.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default SponsorOnboarding;
