
# User Management REST API
A simple, well-structured REST API using Node.js, Express and SQLite.

## Features
CRUD operations for users
SQLite database (file-based)
Validation for required fields
Partial updates (PATCH)
Search users (`GET /api/users?q=...`)

# Endpoints
GET /api/users — list all users (optional ?q= search by name/email)
GET /api/users/:id — get a single user
POST /api/users — create user (body: name, email, optional phone, company, street, city, zipcode, lat, lng)
PUT /api/users/:id — replace user (requires name and email)
PATCH /api/users/:id — partial update
DELETE /api/users/:id — delete user
