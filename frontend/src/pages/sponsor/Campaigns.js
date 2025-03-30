import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import Navbar from '../../components/Navbar';

function Campaigns() {
  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Campaigns
          </Typography>
          <Typography variant="body1">
            Manage your marketing campaigns and track their performance.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Campaigns;
