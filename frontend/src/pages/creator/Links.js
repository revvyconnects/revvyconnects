import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  IconButton,
  Link
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 1200,
  margin: '2rem auto',
  padding: theme.spacing(2),
}));

const Links = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    targetUrl: ''
  });
  const [links, setLinks] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ''
  });

  const fetchLinks = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/links`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch links');
      const data = await response.json();
      setLinks(data);
    } catch (error) {
      console.error('Error fetching links:', error);
      setSnackbar({
        open: true,
        message: 'Error fetching links'
      });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchLinks();
    }
  }, [fetchLinks, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setLinks([data, ...links]);
        setFormData({ name: '', targetUrl: '' });
        setSnackbar({
          open: true,
          message: 'Link created successfully!'
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error creating link: ' + error.message
      });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbar({
      open: true,
      message: 'Link copied to clipboard!'
    });
  };

  return (
    <Box className="p-4 min-h-screen bg-gray-50">
      <StyledCard>
        <CardContent>
          <Typography variant="h5" component="h2">
            {'Create Short Link'}
          </Typography>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
              label="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Target URL"
              value={formData.targetUrl}
              onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
              fullWidth
              required
              type="url"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Generate Link
            </Button>
          </form>
        </CardContent>
      </StyledCard>

      <StyledCard>
        <CardContent>
          <Typography variant="h5" component="h2">
            {'Your Links'}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">
                      {'Product'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">
                      {'Short Link'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">
                      {'Clicks'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1">
                      {'Actions'}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {links.map((link) => {
                  const name = typeof link?.name === 'string' ? link.name : 'Unnamed Link';
                  const shortUrl = typeof link?.shortUrl === 'string' ? link.shortUrl : '';
                  const clicks = typeof link?.clicks === 'number' ? link.clicks.toString() : '0';
                  const targetUrl = typeof link?.targetUrl === 'string' ? link.targetUrl : '';
                  
                  return (
                    <TableRow key={link?.id || Math.random()}>
                      <TableCell>
                        <Typography variant="body1">
                          {name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {shortUrl ? (
                          <Link href={shortUrl} target="_blank" rel="noopener noreferrer">
                            <Typography variant="body1">
                              {shortUrl}
                            </Typography>
                          </Link>
                        ) : (
                          <Typography variant="body1">
                            {'Invalid Link'}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body1">
                          {clicks}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton 
                          onClick={() => copyToClipboard(shortUrl)} 
                          size="small"
                        >
                          <ContentCopyIcon />
                        </IconButton>
                        {targetUrl && (
                          <IconButton 
                            component="a" 
                            href={targetUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            size="small"
                          >
                            <OpenInNewIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </StyledCard>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  );
};

export default Links;
