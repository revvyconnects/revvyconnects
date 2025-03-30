import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: '2rem auto',
  padding: theme.spacing(2),
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const CreatorSettings = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    bio: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Replace with actual API call
      // await api.updateCreatorProfile(formData);
      console.log('Saving profile:', formData);
      
      setSnackbar({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to update profile. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box className="p-4 min-h-screen bg-gray-50">
      <StyledCard>
        <CardHeader 
          title="Profile Settings" 
          className="border-b pb-4"
        />
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <StyledTextField
              label="Display Name"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              placeholder="Enter your display name"
            />
            <StyledTextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              placeholder="Enter your email"
            />
            <StyledTextField
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Tell us about yourself"
            />
            <Button 
              type="submit"
              variant="contained" 
              color="primary"
              size="large"
              className="mt-4"
            >
              Save Changes
            </Button>
          </form>
        </CardContent>
      </StyledCard>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreatorSettings; 