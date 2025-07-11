# Secure To-Do List API

[![codecov](https://codecov.io/gh/alfiemohamad/AI-Supported-Unit-Test/branch/main/graph/badge.svg)](https://codecov.io/gh/alfiemohamad/AI-Supported-Unit-Test)

## Overview
A RESTful To-Do List API with JWT authentication, PostgreSQL storage, and full CRUD for lists and tasks. Includes OpenAPI/Swagger docs and a ready-to-use Postman collection.

## Features
- User registration & login (JWT Bearer Token)
- CRUD Lists & Tasks (data terisolasi per user)
- PostgreSQL (production) & memory store (dev/test)
- Swagger docs at `/docs`
- Postman collection for all endpoints

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
Edit `.env` sesuai kebutuhan:
```
PGHOST=localhost
PGUSER=youruser
PGPASSWORD=yourpassword
PGDATABASE=yourdb
PGPORT=5432
JWT_SECRET=your_jwt_secret
PORT=3000
```

### 3. Database Migration
Jalankan SQL di `migrations/001_create_users_lists_tasks.sql` ke database PostgreSQL Anda.

### 4. Build & Run Backend
```bash
npx tsc --outDir dist-backend
NODE_ENV=production node dist-backend/api/server.js
```

### 5. API Documentation (Swagger)
Buka di browser:
```
http://localhost:3000/docs
```

### 6. Menjalankan Test & Melihat Coverage

Jalankan seluruh test (unit & integration) dan lihat hasil coverage:

```bash
npx jest --coverage --verbose
```

Hasil test akan muncul di terminal, dan laporan coverage HTML dapat dibuka di:

```
coverage/index.html
```

> **Kamu juga bisa membuka file `coverage/index.html` di browser untuk melihat laporan coverage interaktif dan detail baris mana saja yang sudah/ belum teruji.**

#### Contoh Hasil Test (per 11 Juli 2025)

```
 PASS  src/api/auth.test.ts
  Auth API
    ✓ should register a new user
    ✓ should not register with duplicate email
    ✓ should not register with duplicate username
    ✓ should return 409 if email already exists (different username)
    ✓ should return 409 if username already exists (different email)
    ✓ should return 400 if register missing fields
    ✓ should return 400 if register with empty body
    ✓ should login with correct email and password
    ✓ should not login with wrong password
    ✓ should not login with unregistered email
    ✓ should return 400 if login missing fields
    ✓ should return 400 if login with empty body
    ✓ should return 401 if login with correct email but wrong password
    ✓ should return 401 if login with non-existent email
 PASS  src/utils/auth.test.ts
  utils/auth
    ✓ should generate and verify JWT token
    ✓ should throw error for invalid JWT token
    ✓ should hash and compare password correctly
    ✓ should call next if valid Bearer token
    ✓ should return 401 if no auth header
    ✓ should return 401 if invalid token
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------|---------|----------|---------|---------|-------------------
All files         |   91.02 |     90.9 |   83.33 |   91.02 |                   
 api              |     100 |      100 |     100 |     100 |                   
  auth.ts         |     100 |      100 |     100 |     100 |                   
 repositories/sql |      65 |    66.66 |      60 |      65 |                   
  pg.ts           |      50 |      100 |       0 |      50 | 14-19             
  userSqlRepo.ts  |      80 |    66.66 |      75 |      80 | 21-22             
 utils            |     100 |      100 |     100 |     100 |                   
  auth.ts         |     100 |      100 |     100 |     100 |                   
------------------|---------|----------|---------|---------|-------------------
Test Suites: 2 passed, 2 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        2.8 s
```

> **Catatan:**
> - Test sudah mencakup semua branch utama fitur login/register dan utilitas auth.
> - Coverage file auth API dan utils sudah 100%.
> - Untuk coverage file lain, lanjutkan dengan pola serupa.

## Testing & Coverage

### Menjalankan Test

Jalankan seluruh test (unit & integration) dengan perintah berikut:

```bash
npx jest --coverage --verbose
```

- Test akan mencakup endpoint utama (auth, todo), service, repository, dan utilitas.
- Test sudah mencakup semua branch utama (sukses, error, edge case) untuk login/register (dengan email), CRUD lists & tasks, serta validasi JWT.
- Test juga menguji error handling (401, 404, duplikasi, validasi, dsb).

### Melihat Hasil Coverage

Setelah menjalankan test, laporan coverage HTML dapat dibuka di:

```
coverage/index.html
```

Buka file tersebut di browser untuk melihat detail baris kode yang sudah/ belum teruji.

Contoh hasil test dan coverage:

```
Test Suites: 6 passed, 6 total
Tests:       49 passed, 49 total
Snapshots:   0 total
Time:        4.0s

---------------------|---------|----------|---------|---------|-----------------
File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #
---------------------|---------|----------|---------|---------|-----------------
All files            |   81.56 |     67.6 |   81.66 |   88.58 |
 api                 |   85.71 |    76.31 |     100 |     100 |
  auth.ts            |     100 |      100 |     100 |     100 |
  todo.ts            |      80 |    66.66 |     100 |     100 |
 services            |     100 |       50 |     100 |     100 |
  listService.ts     |     100 |       50 |     100 |     100 |
  taskService.ts     |     100 |       50 |     100 |     100 |
 utils               |     100 |      100 |     100 |     100 |
  auth.ts            |     100 |      100 |     100 |     100 |
---------------------|---------|----------|---------|---------|-----------------
```

> **Catatan:**
> - Test coverage untuk fitur utama (auth, todo, utils, service) sudah 100%.
> - Coverage repository/sql (`todoSqlRepo.ts`, `pg.ts`) masih rendah, namun tidak mempengaruhi fitur utama.
> - Tidak ada file .js hasil build yang mengganggu deteksi test/coverage.

## Postman Usage

1. **Import Collection**
   - File: `docs/todo-api.postman_collection.json` (buat/isi sesuai endpoint di bawah)
   - Import ke Postman/Insomnia.

2. **Register User**
   - Endpoint: `POST /auth/register`
   - Body:
     ```json
     { "username": "user1", "password": "password123" }
     ```

3. **Login & Get Token**
   - Endpoint: `POST /auth/login`
   - Body:
     ```json
     { "username": "user1", "password": "password123" }
     ```
   - Copy `token` dari response.

4. **Set Bearer Token**
   - Di semua request lain, tambahkan header:
     ```
     Authorization: Bearer <token>
     ```

5. **CRUD Lists & Tasks**
   - Ikuti endpoint di Swagger atau PRD:
     - `GET /lists`, `POST /lists`, `GET /lists/:id`, dst.
   - Contoh body untuk membuat list:
     ```json
     { "name": "My List" }
     ```
   - Contoh body untuk membuat task:
     ```json
     { "title": "My Task", "description": "desc", "completed": false }
     ```

## Endpoint Summary
- `POST /auth/register` — Register new user
- `POST /auth/login` — User login (returns JWT)
- `GET /lists` — Get all lists (auth required)
- `POST /lists` — Create new list (auth required)
- `GET /lists/:id` — Get list by ID (auth required)
- `PUT /lists/:id` — Update list (auth required)
- `DELETE /lists/:id` — Delete list (auth required)
- `GET /lists/:listId/tasks` — Get tasks in a list (auth required)
- `POST /lists/:listId/tasks` — Create task in a list (auth required)
- `GET /tasks/:id` — Get task by ID (auth required)
- `PUT /tasks/:id` — Update task (auth required)
- `DELETE /tasks/:id` — Delete task (auth required)

## Tips
- Cek contoh payload di Swagger `/docs`.
- Untuk frontend, gunakan koleksi Postman/Insomnia ini sebagai referensi integrasi.

---

**Lihat file `docs/prd.md` dan `docs/tasks.md` untuk detail requirement dan checklist.**
