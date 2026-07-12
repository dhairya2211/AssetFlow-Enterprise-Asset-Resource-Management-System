require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const healthRoutes = require('./routes/healthRoutes');
const apiRoutes = require('./routes/apiRoutes');
const { errorMiddleware, notFoundHandler } = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// Security & Logging Middleware
// ============================================
app.use(helmet());
app.use(cors());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ============================================
// Body Parsing Middleware
// ============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// Static Files - Uploads Directory
// ============================================
app.use('/uploads', express.static('uploads'));

// ============================================
// API Routes
// ============================================

// Root & Health Check Routes
app.use('/', healthRoutes);

// API v1 Prefix (ready for future route modules)
app.use('/api/v1', apiRoutes);

// ============================================
// Error Handling
// ============================================
app.use(notFoundHandler);
app.use(errorMiddleware);

// ============================================
// Start Server
// ============================================
const server = app.listen(PORT, () => {
  console.log(`AssetFlow Backend running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API Base URL: http://localhost:${PORT}/api/v1`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the other process or change PORT in .env`);
    process.exit(1);
  }
  throw err;
});

module.exports = app;
