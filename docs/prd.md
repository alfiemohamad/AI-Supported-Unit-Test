# Product Requirements Document (PRD)

## Project: Secure To-Do List API

### Overview
Develop a RESTful To-Do List API with secure authentication using Bearer Token (JWT). The API will support user registration, login, and CRUD operations for Lists and Tasks. All core endpoints must be protected and require a valid bearer token. The project will also include comprehensive API documentation (OpenAPI/Swagger) and a Postman/Insomnia collection for frontend integration.

---

## Goals
- Provide secure, real-world-ready API endpoints for To-Do List management.
- Ensure only authenticated users can access and modify their data.
- Deliver clear, executable API documentation and request collections for frontend and AI consumption.
- Store user and task data in a robust relational database (PostgreSQL).

---

## Features

### 1. Authentication
- **User Registration**: Endpoint to create a new user account. User data will be stored securely in a PostgreSQL database.
- **User Login**: Endpoint to authenticate and receive a JWT bearer token. Login credentials akan diverifikasi dari data di PostgreSQL.
- **Bearer Token Security**: All List and Task endpoints require a valid JWT in the `Authorization` header.

### 2. To-Do List Management
- **Lists CRUD**: Create, Read, Update, Delete operations for To-Do Lists. Data lists disimpan di PostgreSQL.
- **Tasks CRUD**: Create, Read, Update, Delete operations for Tasks within Lists. Data tasks disimpan di PostgreSQL.
- **User Data Isolation**: Each user can only access their own Lists and Tasks.

### 3. Documentation & Collections
- **OpenAPI/Swagger**: Complete API documentation accessible at `/docs` endpoint.
- **Postman/Insomnia Collection**: Organized collection of all API requests, including authentication and CRUD operations, with example payloads and headers.

---

## Database
- Menggunakan PostgreSQL sebagai database utama untuk menyimpan data user, lists, dan tasks.
- Struktur tabel akan mencakup users, lists, dan tasks dengan relasi yang sesuai.

---

## API Endpoints (Summary)
- `POST /auth/register` — Register new user
- `POST /auth/login` — User login (returns JWT)
- `GET /lists` — Get all lists (auth required)
- `POST /lists` — Create new list (auth required)
- `GET /lists/:id` — Get list by ID (auth required)
- `PUT /lists/:id` — Update list (auth required)
- `DELETE /lists/:id` — Delete list (auth required)
- `GET /lists/:listId/tasks` — Get tasks in a list (auth required)
- `POST /lists/:listId/tasks` — Create task in a list (auth required)
- `GET /lists/:listId/tasks/:taskId` — Get task by ID (auth required)
- `PUT /lists/:listId/tasks/:taskId` — Update task (auth required)
- `DELETE /lists/:listId/tasks/:taskId` — Delete task (auth required)

---

## Security Requirements
- All endpoints (except registration/login) require a valid JWT bearer token.
- JWT must be sent in the `Authorization: Bearer <token>` header.
- Users can only access and modify their own data.

---

## Deliverables
1. Secure To-Do List API with JWT authentication.
2. OpenAPI/Swagger documentation at `/docs`.
3. Postman/Insomnia collection with all endpoints and example requests.
4. PRD document (`/docs/prd.md`).

---

## Success Criteria
- All endpoints are protected and function as described.
- Documentation and collections are clear, complete, and usable by frontend developers.
- API is ready for real-world frontend integration.



