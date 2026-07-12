const { errorResponse } = require('../utils/responseHandler');

/**
 * Middleware to protect routes - verifies JWT token
 * Attaches decoded user to req.user
 */
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'No token provided', null, 401);
    }

    const token = authHeader.split(' ')[1];
    const { verifyToken } = require('../utils/jwt');
    const decoded = verifyToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token expired', null, 401);
    }
    if (error.name === 'JsonWebTokenError') {
      return errorResponse(res, 'Invalid token', null, 401);
    }
    return errorResponse(res, 'Authentication failed', null, 401);
  }
};

/**
 * Middleware to authorize based on user roles
 * @param  {...string} roles - Allowed roles
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Authentication required', null, 401);
    }

    if (!roles.includes(req.user.role)) {
      return errorResponse(
        res,
        `Access denied. Required roles: ${roles.join(', ')}`,
        null,
        403
      );
    }

    next();
  };
};

module.exports = {
  authenticate,
  authorizeRoles
};
