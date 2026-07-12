/**
 * Global Error Handler Middleware.
 * Catches all errors passed via next(error) and returns a consistent JSON response.
 */
const errorMiddleware = (err, req, res, next) => {
  console.error(`[Error] ${err.message}`);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * 404 Not Found Handler.
 * Catches requests to undefined routes.
 */
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = { errorMiddleware, notFoundHandler };
