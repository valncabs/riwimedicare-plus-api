# Medicine Management API

## Project Information

**Coder:** Valentina Rey Cabas Miranda 
**Clan:** Node / Nest AM
**Repository:** https://github.com/valncabs/riwimedicare-plus-api.git
**Project:** Medicine Management API

---

## 1. Project Description

The **Medicine Management API** is a RESTful backend application developed to manage medicines, clinics, warehouses, inventory, medicine requests, and request history.

The application provides a structured API that allows authenticated users to interact with the system according to their assigned role.

The main functionalities include:

* User registration and management
* User authentication
* JWT-based authentication
* Role-based authorization
* Clinic management
* Warehouse management
* Medicine management
* Medicine inventory management
* Medicine requests
* Request history
* Database migrations
* Sequelize CLI seeders
* JSON data loading through an upload endpoint
* Interactive API documentation using Swagger

The project follows a layered architecture using controllers, services, repositories, models, and middleware.

---

# 2. Technologies Used

The project was developed using the following technologies:

| Technology        | Purpose                         |
| ----------------- | ------------------------------- |
| **Node.js**       | Backend runtime environment     |
| **TypeScript**    | Main programming language       |
| **Express.js**    | REST API framework              |
| **PostgreSQL**    | Relational database             |
| **Sequelize**     | Object-Relational Mapping (ORM) |
| **Sequelize CLI** | Database migrations and seeders |
| **JWT**           | Authentication                  |
| **Multer**        | File upload handling            |
| **Swagger**       | API documentation and testing   |
| **Helmet**        | HTTP security                   |
| **CORS**          | Cross-origin request management |
| **dotenv**        | Environment variable management |

---

# 3. Project Structure

The project is organized into different layers according to their responsibilities.

```text
.
├── archivo.json
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── config
│   │   ├── config.js
│   │   └── database.ts
│   │
│   ├── controllers
│   │   ├── auth.controller.ts
│   │   ├── clinic.controller.ts
│   │   ├── medicine.controller.ts
│   │   ├── request.controller.ts
│   │   ├── requestHistory.controller.ts
│   │   ├── seed.controller.ts
│   │   ├── user.controller.ts
│   │   ├── warehouse.controller.ts
│   │   └── warehouseMedicine.controller.ts
│   │
│   ├── docs
│   │   └── swagger.ts
│   │
│   ├── dto
│   │   └── request
│   │       └── user.dto.ts
│   │
│   ├── index.ts
│   │
│   ├── middleware
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   ├── upload.middleware.ts
│   │   └── validateUser.ts
│   │
│   ├── models
│   │   ├── Clinic.ts
│   │   ├── index.ts
│   │   ├── Medicine.ts
│   │   ├── RefreshToken.ts
│   │   ├── RequestHistory.ts
│   │   ├── Request.ts
│   │   ├── Role.ts
│   │   ├── User.ts
│   │   ├── WarehouseMedicine.ts
│   │   └── Warehouse.ts
│   │
│   ├── repositories
│   │   ├── clinic.repository.ts
│   │   ├── interfaces
│   │   │   └── user.repository.interface.ts
│   │   ├── medicine.repository.ts
│   │   ├── refreshToken.repository.ts
│   │   ├── requestHistory.repository.ts
│   │   ├── request.repository.ts
│   │   ├── user.repository.ts
│   │   ├── warehouseMedicine.repository.ts
│   │   └── warehouse.repository.ts
│   │
│   ├── routes
│   │   ├── auth.routes.ts
│   │   ├── clinic.routes.ts
│   │   ├── medicine.routes.ts
│   │   ├── requestHistory.routes.ts
│   │   ├── request.routes.ts
│   │   ├── seed.routes.ts
│   │   ├── user.routes.ts
│   │   ├── warehouseMedicine.routes.ts
│   │   └── warehouse.routes.ts
│   │
│   ├── seeders
│   │   └── 20260830190632-roles.js
│   │
│   ├── services
│   │   ├── auth.service.ts
│   │   ├── clinic.service.ts
│   │   ├── medicine.service.ts
│   │   ├── requestHistory.service.ts
│   │   ├── request.service.ts
│   │   ├── seed.service.ts
│   │   ├── user.service.ts
│   │   ├── warehouseMedicine.service.ts
│   │   └── warehouse.service.ts
│   │
│   ├── types
│   │   └── express.d.ts
│   │
│   └── utils
│       ├── jwt.ts
│       └── password.ts
│
└── tsconfig.json
```

---

# 4. Architecture

The application follows a layered architecture.

```text
Client
   │
   ▼
Routes
   │
   ▼
Middleware
   │
   ├── Authentication
   ├── Authorization
   └── Validation
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
Models
   │
   ▼
PostgreSQL
```

### Routes

Def```text
Role
 │
 └── User
       │
       └── RefreshToken


Clinic
 │
 └── Request


Medicine
 │
 ├── WarehouseMedicine
 │
 └── Request


Warehouse
 │
 ├── WarehouseMedicine
 │
 └── Request


Request
 │
 └── RequestHistoryine the available API endpoints.

### Middleware

Responsible for authentication, authorization, file uploads, and validation.

### Controllers

Receive HTTP requests and return HTTP responses.

### Services

Contain the application's business logic.

### Repositories

Handle database operations through Sequelize.

### Models

Represent the database tables and their structures.

### Utils

Contain reusable functions such as password encryption and JWT management.

---

# 5. Database Entities

The main entities of the application are:

```text
Role
User
RefreshToken
Clinic
Warehouse
Medicine
WarehouseMedicine
Request
RequestHistory
```

The relationships can be summarized as:


---

# 6. Authentication

The application uses **JWT (JSON Web Token)** for authentication.

Users must authenticate through the login endpoint before accessing protected resources.

The authentication process is:

```text
User
 ↓
Login
 ↓
Credentials validation
 ↓
JWT generation
 ↓
Authorization header
 ↓
Protected endpoint
```

The token must be sent using the following HTTP header:

```text
Authorization: Bearer YOUR_TOKEN
```

Example:

```text
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

# 7. Authorization and Roles

The API implements role-based access control.

The current roles are:

| Role      | Description                                    |
| --------- | ---------------------------------------------- |
| **admin** | Administrative access to system resources      |
| **user**  | Limited access, mainly focused on consultation |

The authorization middleware checks the authenticated user's role before allowing access to protected endpoints.

If a user does not have permission, the API returns:

```json
{
  "message": "No tienes permisos para realizar esta acción"
}
```

with HTTP status:

```text
403 Forbidden
```

---

# 8. API Endpoints

## Authentication

```text
POST /auth/login
```

Used to authenticate users and generate the JWT token.

---

## Users

```text
POST   /users
GET    /users
GET    /users/:id
PUT    /users/:id
DELETE /users/:id
```

The user resource allows administrators to manage registered users.

---

## Clinics

```text
POST   /clinics
GET    /clinics
GET    /clinics/:id
PUT    /clinics/:id
DELETE /clinics/:id
```

Clinics represent the institutions requesting medicines.

---

## Medicines

```text
POST   /medicines
GET    /medicines
GET    /medicines/:id
PUT    /medicines/:id
DELETE /medicines/:id
```

A medicine contains information such as:

```text
id
name
description
status
createdAt
updatedAt
```

Example:

```json
{
  "name": "Acetaminophen",
  "description": "Pain reliever and fever reducer"
}
```

---

## Warehouses

```text
POST   /warehouses
GET    /warehouses
GET    /warehouses/:id
PUT    /warehouses/:id
DELETE /warehouses/:id
```

Warehouses are responsible for storing medicines.

A warehouse contains:

```text
id
name
location
status
createdAt
updatedAt
```

---

## Warehouse Medicines

This resource manages the relationship between medicines and warehouses.

```text
POST   /warehouses/:warehouseId/medicines
GET    /warehouses/:warehouseId/medicines
PUT    /warehouses/:warehouseId/medicines/:medicineId
DELETE /warehouses/:warehouseId/medicines/:medicineId
```

It is used to manage medicine inventory.

Example:

```json
{
  "medicineId": 1,
  "stock": 100
}
```

The relationship is:

```text
Warehouse
     │
     │ 1:N
     ▼
WarehouseMedicine
     ▲
     │ N:1
     │
Medicine
```

---

## Requests

Requests allow clinics to request medicines from warehouses.

```text
POST   /requests
GET    /requests
GET    /requests/:id
PUT    /requests/:id
DELETE /requests/:id
```

Example:

```json
{
  "clinicId": 1,
  "medicineId": 1,
  "warehouseId": 1,
  "quantity": 50
}
```

The default request status is:

```text
pending
```

---

## Request History

Request history stores the status changes associated with a request.

```text
POST /request-history
GET  /request-history
GET  /request-history/:id
```

Example:

```json
{
  "requestId": 1,
  "status": "approved"
}
```

A history record contains:

```text
id
requestId
userId
status
createdAt
```

---

# 9. Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=medicine_management
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key
```

### Important

The `.env` file contains sensitive information and should not be committed to GitHub.

Recommended `.gitignore` entries:

```text
node_modules/
.env
dist/
```

---

# 10. Installation Instructions

## Step 1 — Clone the repository

```bash
git clone YOUR_PUBLIC_GITHUB_REPOSITORY_URL
```

Move into the project directory:

```bash
cd YOUR_PROJECT_NAME
```

---

## Step 2 — Install dependencies

Run:

```bash
npm install
```

---

## Step 3 — Configure PostgreSQL

Create a PostgreSQL database.

Example:

```text
Database: medicine_management
Host: localhost
Port: 5432
User: postgres
```

Make sure the database credentials match the values configured in the environment variables.

---

## Step 4 — Configure the environment

Create the `.env` file and add the required variables:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=medicine_management
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
```

---

# 11. Database Migrations

The project uses Sequelize CLI to manage database migrations.

To execute all migrations:

```bash
npx sequelize-cli db:migrate
```

To check migration status:

```bash
npx sequelize-cli db:migrate:status
```

To undo the last migration:

```bash
npx sequelize-cli db:migrate:undo
```

To undo all migrations:

```bash
npx sequelize-cli db:migrate:undo:all
```

---

# 12. Sequelize Seeder

The project includes a Sequelize CLI Seeder for loading static information into the database.

The Seeder is located at:

```text
src/seeders/20260830190632-roles.js
```

This Seeder is responsible for creating the initial roles:

```text
admin
user
```

To execute the Seeder:

```bash
npx sequelize-cli db:seed:all
```

To undo the Seeder:

```bash
npx sequelize-cli db:seed:undo:all
```

---

# 13. JSON Seeder

The project also includes a dynamic JSON Seeder.

Unlike the Sequelize CLI Seeder, this functionality allows the administrator to upload a JSON file through an API endpoint.

The implementation uses:

* **Multer** for receiving the file
* **Seed Controller** for handling the request
* **Seed Service** for processing the information
* **Sequelize** for inserting the data

The relevant files are:

```text
src/controllers/seed.controller.ts
src/services/seed.service.ts
src/routes/seed.routes.ts
src/middleware/upload.middleware.ts
```

The JSON file used for testing is located in the project root:

```text
archivo.json
```

---

# 14. JSON Seeder File

The JSON Seeder supports base information such as clinics, warehouses, and medicines.

Example:

```json
{
  "clinics": [
    {
      "name": "Clínica Central",
      "nit": "900123456-7",
      "address": "Calle 72 #45-10",
      "phone": "3001234567",
      "responsible": "María González"
    },
    {
      "name": "Clínica Norte",
      "nit": "900765432-1",
      "address": "Carrera 50 #80-20",
      "phone": "3007654321",
      "responsible": "Carlos Rodríguez"
    }
  ],
  "warehouses": [
    {
      "name": "Almacén Central",
      "location": "Calle 30 #20-15"
    },
    {
      "name": "Almacén Norte",
      "location": "Carrera 46 #80-25"
    }
  ],
  "medicines": [
    {
      "name": "Acetaminophen",
      "description": "Pain reliever and fever reducer"
    },
    {
      "name": "Ibuprofen",
      "description": "Anti-inflammatory and pain reliever"
    },
    {
      "name": "Amoxicillin",
      "description": "Antibiotic"
    }
  ]
}
```

---

# 15. How to Execute the JSON Seeder

First, start the API:

```bash
npm run dev
```

Then use the Seeder endpoint.

```text
POST /seed
```

The endpoint receives the JSON file through `multipart/form-data`.

The form field must be:

```text
file
```

---

## Using cURL

Example:

```bash
curl -X POST \
  http://localhost:3000/seed \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@archivo.json"
```

Replace:

```text
YOUR_TOKEN
```

with a valid JWT obtained through the login endpoint.

---

# 16. JSON Seeder Process

The complete process is:

```text
archivo.json
      │
      ▼
POST /seed
      │
      ▼
Multer
      │
      ▼
File validation
      │
      ▼
JSON parsing
      │
      ▼
Seed Service
      │
      ▼
Sequelize
      │
      ▼
PostgreSQL
```

This functionality makes it easier to populate the database with test data.

Instead of manually creating each clinic, warehouse, or medicine through individual endpoints, the required information can be loaded from a single JSON file.

---

# 17. Project Execution

After completing the installation and database configuration, execute:

```bash
npm run dev
```

The server will start on:

```text
http://localhost:3000
```

If the project is compiled first, it can be executed using:

```bash
npm run build
npm start
```

---

# 18. Swagger Documentation

The API includes interactive Swagger documentation.

Once the server is running, open:

```text
http://localhost:3000/api-docs
```

Swagger allows developers to:

* View all available endpoints
* Review request parameters
* Review request bodies
* Review response codes
* Authenticate using JWT
* Execute API requests
* Test protected endpoints
* Upload the JSON Seeder file

---

# 19. Health Check

The application includes a health check endpoint:

```text
GET /health
```

Example response:

```json
{
  "status": "ok",
  "message": "Servidor funcionando"
}
```

This endpoint can be used to verify that the API is running correctly.

---

# 20. HTTP Status Codes

The API uses standard HTTP status codes.

| Status Code | Description                    |
| ----------- | ------------------------------ |
| `200`       | Request completed successfully |
| `201`       | Resource created successfully  |
| `400`       | Invalid request data           |
| `401`       | User is not authenticated      |
| `403`       | Access denied                  |
| `404`       | Resource not found             |
| `409`       | Resource conflict              |
| `500`       | Internal server error          |

---

# 21. Recommended Testing Flow

For testing the complete application, the following order is recommended:

```text
1. Create PostgreSQL database
        ↓
2. Configure .env
        ↓
3. Install dependencies
        ↓
4. Run migrations
        ↓
5. Run Sequelize Seeder
        ↓
6. Start the API
        ↓
7. Login
        ↓
8. Obtain JWT
        ↓
9. Load test data using /seed
        ↓
10. Verify clinics
        ↓
11. Verify warehouses
        ↓
12. Verify medicines
        ↓
13. Add medicines to warehouses
        ↓
14. Create medicine requests
        ↓
15. Update request status
        ↓
16. Create request history
        ↓
17. Verify data using GET endpoints
```

---

# 22. Security

The application implements several security mechanisms.

### JWT Authentication

Ensures that protected endpoints can only be accessed by authenticated users.

### Role-Based Authorization

Controls access to administrative and user operations.

### Helmet

Provides additional HTTP security headers.

### CORS

Allows controlled communication between different origins.

### Password Protection

Passwords are processed using the application's password utility instead of being stored directly as plain text.

### Environment Variables

Sensitive information such as database credentials and JWT secrets is stored in environment variables.

---

# 23. Seeder Types

The project provides two different ways to populate the database.

## Sequelize CLI Seeder

Used for static and essential information.

Example:

```bash
npx sequelize-cli db:seed:all
```

Current example:

```text
admin
user
```

## JSON Seeder Endpoint

Used for loading test or base data dynamically.

Example:

```bash
curl -X POST \
  http://localhost:3000/seed \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@archivo.json"
```

This approach allows multiple datasets to be loaded without creating a new Sequelize Seeder every time.

---

# 24. Quick Start

For a quick setup, execute the following commands:

```bash
# Clone the repository
git clone YOUR_PUBLIC_GITHUB_REPOSITORY_URL

# Enter the project
cd YOUR_PROJECT_NAME

# Install dependencies
npm install

# Configure environment variables
# Create .env


# Run Sequelize seeders
npx sequelize-cli db:seed:all

# Start the API
npm run dev
```

Then access Swagger:

```text
http://localhost:3000/api-docs
```

After obtaining an authentication token, the JSON Seeder can be executed with:

```bash
curl -X POST \
  http://localhost:3000/seed \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@archivo.json"
```

---

# 25. GitHub Repository

The complete source code of the project is available in a public GitHub repository.

**Repository:**

YOUR_PUBLIC_GITHUB_REPOSITORY_URL

---

# 26. Author

**Coder:** Valentina REy Cabas Miranda 

**Clan:** Node / Nest AM

---

# 27. Final Notes

This project was developed as a RESTful backend solution focused on medicine and inventory management.

The combination of **TypeScript, Express, Sequelize, PostgreSQL, JWT, Multer, and Swagger** provides a structured and scalable foundation for managing the application's resources.

The implementation of both **Sequelize CLI Seeders** and the **JSON Seeder endpoint** facilitates database initialization and testing by allowing essential information and test datasets to be loaded efficiently.
