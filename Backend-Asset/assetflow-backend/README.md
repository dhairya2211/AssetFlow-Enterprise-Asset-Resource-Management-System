# Enterprise AssetFlow Backend

## Description
Enterprise Asset Management System Backend API - Built with Node.js, Express.js, and MySQL.

## Tech Stack
- Node.js
- Express.js
- MySQL (mysql2)
- JWT Authentication
- bcrypt
- REST API
- MVC Architecture

## Installation

### Prerequisites
- Node.js v16 or higher
- MySQL v8 or higher
- npm or yarn

### Steps
1. Clone or download the project files
2. Navigate to the project directory: `cd assetflow-backend`
3. Install dependencies: `npm install`
4. Create a `.env` file in the root directory and configure the environment variables (see `.env.example`)
5. Set up the MySQL database using the schema in `controllers/database/assetflow.sql`
6. Start the server:
   - Development mode: `npm run dev`
   - Production mode: `npm start`

## Project Structure

```
assetflow-backend/
├── config/
│   └── database.js       # MySQL connection pool and transactions
├── controllers/      # Request handlers
├── middleware/   # Auth, error handling
├── models/       # Database models
├── routes/       # API routes
├── services/     # Business logic
├── utils/        # Utilities (JWT, responses)
├── validators/  # Request validation
├── uploads/     # File uploads
├── .env.example
├── package.json
└── server.js
```

## Database Setup

1. Create a MySQL database
2. Import the schema from `controllers/database/assetflow.sql`

## Environment Variables

| Variable | Description |
|------------|-------------|
| PORT | Server port (default: 5000) |
| NODE_ENV | Environment (development/production) |
| DB_HOST | MySQL host (default: localhost) |
| DB_PORT | MySQL port (default: 3306) |
| DB_USER | MySQL username |
| DB_PASSWORD | MySQL password |
| DB_NAME | MySQL database name |
| JWT_SECRET | Secret key for JWT tokens |
| JWT_EXPIRES_IN | JWT token expiration (default: 7d) |

## API Prefix
All API endpoints are prefixed with: `http://localhost:5000/api/v1`

## Authentication
- Authentication is done via JWT tokens
- Send token in the `Authorization` header as `Bearer <token>`

## Modules

- **Authentication
  - `/auth`
  - Master Data: departments, categories, users
  - Asset Management
  - Asset Allocation & Transfer
  - Resource Booking
  - Maintenance & Audit
  - Dashboard Analytics & Reports
  - Notifications

## Security
- Passwords are encrypted using bcrypt
- All private routes are protected with JWT
- Role-based authorization
- Helmet.js for security headers
