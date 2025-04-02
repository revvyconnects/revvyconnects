require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import routes
const authRoutes = require('./routes/auth');
const creatorRoutes = require('./routes/creator');
const sponsorRoutes = require('./routes/sponsor');
const trackingRoutes = require('./routes/tracking');
const linksRoutes = require('./routes/links');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Revvy API is running!' });
});

// Database connection
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection string:', process.env.MONGODB_URI);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Start server only after successful database connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

// Handle MongoDB connection errors after initial connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

// Kill any existing processes on port 5000
const killPort = async () => {
  try {
    await new Promise((resolve, reject) => {
      require('child_process').exec('lsof -i :5000 | grep LISTEN | awk \'{print $2}\' | xargs kill -9', (error) => {
        if (error) {
          console.log('No process found on port 5000');
        } else {
          console.log('Killed process on port 5000');
        }
        resolve();
      });
    });
  } catch (error) {
    console.error('Error killing port:', error);
  }
};

// Start the application
const startApp = async () => {
  await killPort();
  await connectDB();
};

startApp();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/creator', creatorRoutes);
app.use('/api/sponsor', sponsorRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/links', linksRoutes);
app.use('/l', linksRoutes); // For short link redirects

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
}); 