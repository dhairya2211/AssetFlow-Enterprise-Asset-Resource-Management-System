# AssetFlow Backend API Documentation

## Base URL
`http://localhost:5000/api/v1`

## Authentication
All private routes require a JWT token in the `Authorization` header as `Bearer <token>`

---

## Endpoints

### Health
- **GET** `/health` - Health check

---

### Authentication
- **POST** `/auth/register` - Register a new user
- **POST** `/auth/login` - Login user

---

### Master Data

#### Departments
- **GET** `/departments` - Get all departments
- **GET** `/departments/:id` - Get department by ID
- **POST** `/departments` - Create department (Admin)
- **PUT** `/departments/:id` - Update department (Admin)
- **DELETE** `/departments/:id` - Delete department (Admin)

#### Asset Categories
- **GET** `/categories` - Get all categories
- **GET** `/categories/:id` - Get category by ID
- **POST** `/categories` - Create category (Admin)
- **PUT** `/categories/:id` - Update category (Admin)
- **DELETE** `/categories/:id` - Delete category (Admin)

#### Users
- **GET** `/users` - Get all users (Admin)
- **GET** `/users/:id` - Get user by ID (Admin)
- **PUT** `/users/:id` - Update user (Admin)
- **PATCH** `/users/:id/status` - Update user status (Admin)
- **DELETE** `/users/:id` - Delete user (Admin)

---

### Asset Management
- **GET** `/assets` - Get all assets
- **GET** `/assets/dashboard/counts` - Get asset counts
- **GET** `/assets/available` - Get available assets
- **GET** `/assets/recent` - Get recent assets
- **GET** `/assets/search` - Search assets
- **GET** `/assets/:id` - Get asset by ID
- **POST** `/assets` - Create asset (Admin, with image)
- **PUT** `/assets/:id` - Update asset (Admin)
- **PATCH** `/assets/:id/status` - Update asset status (Admin)
- **DELETE** `/assets/:id` - Delete asset (Admin)

---

### Asset Allocation
- **GET** `/allocations` - Get all allocations
- **GET** `/allocations/dashboard` - Get dashboard counts
- **GET** `/allocations/active` - Get active allocations
- **GET** `/allocations/overdue` - Get overdue allocations
- **GET** `/allocations/:id` - Get allocation by ID
- **POST** `/allocations` - Create allocation (Manager/Admin)
- **PUT** `/allocations/:id` - Update allocation (Manager/Admin)
- **PATCH** `/allocations/:id/return` - Return asset (Manager/Admin)
- **DELETE** `/allocations/:id` - Delete allocation (Admin)

---

### Asset Transfer
- **GET** `/transfers` - Get all transfers
- **GET** `/transfers/:id` - Get transfer by ID
- **POST** `/transfers` - Request transfer
- **PATCH** `/transfers/:id/approve` - Approve transfer (Manager/Admin)
- **PATCH** `/transfers/:id/reject` - Reject transfer (Manager/Admin)
- **DELETE** `/transfers/:id` - Delete transfer (Admin)

---

### Resource Booking
- **GET** `/bookings` - Get all bookings
- **GET** `/bookings/:id` - Get booking by ID
- **POST** `/bookings` - Create booking
- **PUT** `/bookings/:id` - Update booking
- **DELETE** `/bookings/:id` - Delete booking

---

### Maintenance
- **GET** `/maintenance` - Get all maintenance requests
- **GET** `/maintenance/pending` - Get pending requests
- **GET** `/maintenance/in-progress` - Get in-progress requests
- **GET** `/maintenance/resolved` - Get resolved requests
- **GET** `/maintenance/:id` - Get request by ID
- **POST** `/maintenance` - Create request (Manager/Admin)
- **PUT** `/maintenance/:id` - Update request (Manager/Admin)
- **PATCH** `/maintenance/:id/assign` - Assign request (Manager/Admin)
- **PATCH** `/maintenance/:id/resolve` - Resolve request (Manager/Admin)
- **DELETE** `/maintenance/:id` - Delete request (Admin)

---

### Audits
- **GET** `/audits` - Get all audits
- **GET** `/audits/:id` - Get audit by ID with items
- **POST** `/audits` - Create audit (Manager/Admin)
- **PUT** `/audits/:id` - Update audit (Manager/Admin)
- **PATCH** `/audits/:id/close` - Close audit (Manager/Admin)
- **DELETE** `/audits/:id` - Delete audit (Admin)
- **POST** `/audits/:id/items` - Add items to audit (Manager/Admin)
- **PUT** `/audits/items/:itemId` - Update audit item (Manager/Admin)
- **PATCH** `/audits/items/:itemId/verify` - Verify audit item (Manager/Admin)

---

### Dashboard
- **GET** `/dashboard/overview` - Get dashboard overview
- **GET** `/dashboard/statistics` - Get dashboard statistics
- **GET** `/dashboard/recent-activity` - Get recent activity

---

### Reports
- **GET** `/reports/utilization` - Get utilization report (Manager/Admin)
- **GET** `/reports/maintenance` - Get maintenance report (Manager/Admin)
- **GET** `/reports/idle-assets` - Get idle assets report (Manager/Admin)
- **GET** `/reports/bookings` - Get bookings report (Manager/Admin)
- **GET** `/reports/transfers` - Get transfers report (Manager/Admin)
- **GET** `/reports/audits` - Get audits report (Manager/Admin)
- **GET** `/reports/export` - Export report (Manager/Admin)

---

### Notifications
- **GET** `/notifications` - Get user's notifications
- **GET** `/notifications/unread` - Get user's unread notifications
- **PATCH** `/notifications/:id/read` - Mark notification as read
- **PATCH** `/notifications/read-all` - Mark all notifications as read
- **DELETE** `/notifications/:id` - Delete notification

---

## Status Codes
- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error
