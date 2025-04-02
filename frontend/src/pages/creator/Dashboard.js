import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Container,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

console.log("✅ CreatorDashboard component loaded");

// Updated chart data to match the image
const data = [
  { name: 'Feb', clicks: Number(300), sales: Number(1398) },
  { name: 'Apr', clicks: Number(278), sales: Number(4800) },
  { name: 'Jun', clicks: Number(239), sales: Number(3800) },
];

function CreatorDashboard() {
  console.log("Rendering CreatorDashboard");
  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {'Creator Dashboard'}
          </Typography>
          
          <Grid container spacing={3}>
            {/* Stats Cards */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" component="div">
                  {'Total Clicks'}
                </Typography>
                <Typography variant="h4" component="div">
                  {'1,806'}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" component="div">
                  {'Total Sales'}
                </Typography>
                <Typography variant="h4" component="div">
                  {'$9,998'}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" component="div">
                  {'Active Links'}
                </Typography>
                <Typography variant="h4" component="div">
                  {'12'}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" component="div">
                  {'Conversion Rate'}
                </Typography>
                <Typography variant="h4" component="div">
                  {'2.4%'}
                </Typography>
              </Paper>
            </Grid>

            {/* Performance Chart */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {'Performance Overview'}
                </Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="name"
                        tickLine={false}
                      />
                      <YAxis 
                        tickLine={false}
                        domain={[0, 10000]}
                        ticks={[0, 2500, 5000, 7500, 10000]}
                      />
                      <Tooltip />
                      <Legend verticalAlign="top" height={36} />
                      <Line
                        type="monotone"
                        dataKey="clicks"
                        stroke="#8884d8"
                        name="Clicks"
                        dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#82ca9d"
                        name="Sales ($)"
                        dot={{ stroke: '#82ca9d', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {'Recent Sales'}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {[1, 2, 3].map((item) => (
                    <Box
                      key={item}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      <Typography variant="body1">
                        {`Product ${item}`}
                      </Typography>
                      <Typography variant="body1">
                        {'$299.99'}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>

            {/* Top Performing Links */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {'Top Performing Links'}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {[1, 2, 3].map((item) => (
                    <Box
                      key={item}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      <Typography variant="body1">
                        {`Link ${item}`}
                      </Typography>
                      <Typography variant="body1">
                        {'1,234 clicks'}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default CreatorDashboard; 