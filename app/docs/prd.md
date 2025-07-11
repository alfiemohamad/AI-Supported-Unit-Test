# Product Requirements Document: Secure To-Do List API

## 1. Overview

Secure To-Do List API adalah RESTful API yang memungkinkan pengguna untuk membuat, mengelola, dan mengatur daftar tugas mereka dengan aman. Sistem mengimplementasikan autentikasi JWT untuk memastikan data pengguna terisolasi dan aman.

## 2. Target Users

- Pengembang frontend yang membutuhkan backend API untuk aplikasi to-do list
- Pengguna yang mencari solusi to-do list dengan keamanan data yang baik
- Tim pengembangan yang memerlukan API to-do list dengan dokumentasi yang lengkap

## 3. Core Features

### 3.1 User Authentication

| Feature | Description | Priority |
|---------|-------------|----------|
| User Registration | Pengguna dapat mendaftar dengan username dan password | High |
| User Login | Pengguna dapat login dan menerima token JWT | High |
| Authentication | Semua endpoint (kecuali register/login) mengharuskan autentikasi | High |

### 3.2 Lists Management

| Feature | Description | Priority |
|---------|-------------|----------|
| View All Lists | Pengguna dapat melihat semua list yang dimilikinya | High |
| Create List | Pengguna dapat membuat list baru | High |
| View List Details | Pengguna dapat melihat detail list berdasarkan ID | High |
| Update List | Pengguna dapat mengubah informasi list | Medium |
| Delete List | Pengguna dapat menghapus list | Medium |

### 3.3 Tasks Management

| Feature | Description | Priority |
|---------|-------------|----------|
| View Tasks in List | Pengguna dapat melihat semua task dalam suatu list | High |
| Create Task | Pengguna dapat membuat task baru dalam suatu list | High |
| View Task Details | Pengguna dapat melihat detail task berdasarkan ID | High |
| Update Task | Pengguna dapat mengubah informasi task | Medium |
| Delete Task | Pengguna dapat menghapus task | Medium |

## 4. Technical Requirements

- Database PostgreSQL untuk penyimpanan data
- Implementasi JWT untuk autentikasi
- Dokumentasi Swagger/OpenAPI
- Koleksi Postman untuk testing

## 5. API Endpoints

### 5.1 Authentication Endpoints

#### 5.1.1 Register New User

- **Endpoint**: `POST /auth/register`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response (Success - 201)**:
  ```json
  {
    "id": "number",
    "username": "string"
  }
  ```
- **Response (Error - 400)**:
  ```json
  {
    "error": "Username already taken"
  }
  ```

#### 5.1.2 User Login

- **Endpoint**: `POST /auth/login`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response (Success - 200)**:
  ```json
  {
    "token": "string"
  }
  ```
- **Response (Error - 401)**:
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

### 5.2 Lists Endpoints

#### 5.2.1 Get All Lists

- **Endpoint**: `GET /lists`
- **Authentication**: Bearer Token
- **Response (Success - 200)**:
  ```json
  [
    {
      "id": "number",
      "name": "string",
      "userId": "number",
      "createdAt": "string (ISO date)"
    }
  ]
  ```

#### 5.2.2 Create New List

- **Endpoint**: `POST /lists`
- **Authentication**: Bearer Token
- **Request Body**:
  ```json
  {
    "name": "string"
  }
  ```
- **Response (Success - 201)**:
  ```json
  {
    "id": "number",
    "name": "string",
    "userId": "number",
    "createdAt": "string (ISO date)"
  }
  ```

#### 5.2.3 Get List by ID

- **Endpoint**: `GET /lists/:id`
- **Authentication**: Bearer Token
- **Response (Success - 200)**:
  ```json
  {
    "id": "number",
    "name": "string",
    "userId": "number",
    "createdAt": "string (ISO date)"
  }
  ```
- **Response (Error - 404)**:
  ```json
  {
    "error": "List not found"
  }
  ```

#### 5.2.4 Update List

- **Endpoint**: `PUT /lists/:id`
- **Authentication**: Bearer Token
- **Request Body**:
  ```json
  {
    "name": "string"
  }
  ```
- **Response (Success - 200)**:
  ```json
  {
    "id": "number",
    "name": "string",
    "userId": "number",
    "updatedAt": "string (ISO date)"
  }
  ```
- **Response (Error - 404)**:
  ```json
  {
    "error": "List not found"
  }
  ```

#### 5.2.5 Delete List

- **Endpoint**: `DELETE /lists/:id`
- **Authentication**: Bearer Token
- **Response (Success - 204)**: No Content
- **Response (Error - 404)**:
  ```json
  {
    "error": "List not found"
  }
  ```

### 5.3 Tasks Endpoints

#### 5.3.1 Get Tasks in a List

- **Endpoint**: `GET /lists/:listId/tasks`
- **Authentication**: Bearer Token
- **Response (Success - 200)**:
  ```json
  [
    {
      "id": "number",
      "title": "string",
      "description": "string",
      "completed": "boolean",
      "listId": "number",
      "createdAt": "string (ISO date)"
    }
  ]
  ```

#### 5.3.2 Create Task in a List

- **Endpoint**: `POST /lists/:listId/tasks`
- **Authentication**: Bearer Token
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "completed": "boolean"
  }
  ```
- **Response (Success - 201)**:
  ```json
  {
    "id": "number",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "listId": "number",
    "createdAt": "string (ISO date)"
  }
  ```
- **Response (Error - 404)**:
  ```json
  {
    "error": "List not found"
  }
  ```

#### 5.3.3 Get Task by ID

- **Endpoint**: `GET /tasks/:id`
- **Authentication**: Bearer Token
- **Response (Success - 200)**:
  ```json
  {
    "id": "number",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "listId": "number",
    "createdAt": "string (ISO date)"
  }
  ```
- **Response (Error - 404)**:
  ```json
  {
    "error": "Task not found"
  }
  ```

#### 5.3.4 Update Task

- **Endpoint**: `PUT /tasks/:id`
- **Authentication**: Bearer Token
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "completed": "boolean"
  }
  ```
- **Response (Success - 200)**:
  ```json
  {
    "id": "number",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "listId": "number",
    "updatedAt": "string (ISO date)"
  }
  ```
- **Response (Error - 404)**:
  ```json
  {
    "error": "Task not found"
  }
  ```

#### 5.3.5 Delete Task

- **Endpoint**: `DELETE /tasks/:id`
- **Authentication**: Bearer Token
- **Response (Success - 204)**: No Content
- **Response (Error - 404)**:
  ```json
  {
    "error": "Task not found"
  }
  ```

## 6. Security Requirements

1. Semua password harus di-hash sebelum disimpan di database
2. JWT token harus memiliki masa berlaku (expire time)
3. Semua endpoint dilindungi dengan autentikasi JWT (kecuali register dan login)
4. Data pengguna harus terisolasi - pengguna hanya bisa mengakses list dan task miliknya sendiri
5. Validasi input untuk semua endpoint

## 7. Performance Requirements

1. API harus mampu menangani minimal 100 request per detik
2. Waktu respons tidak boleh melebihi 200ms untuk sebagian besar endpoint
3. Database harus dioptimasi dengan indeks yang sesuai

## 8. Testing Requirements

1. Unit test untuk semua service dan repository
2. Integration test untuk semua endpoint API
3. Koleksi Postman untuk manual testing

## 9. Deployment Requirements

1. Mendukung deployment ke container (Docker)
2. Environment variables untuk konfigurasi (database, JWT secret, dll)
3. Log yang komprehensif untuk debugging

## 10. Future Enhancements

1. Task reminder dengan notifikasi
2. Fitur berbagi list dengan pengguna lain
3. Kategorisasi task dengan label/tag
4. Filter dan pencarian task
5. Task priority level
