# Task List for Secure To-Do List API Implementation

## 1. Project Setup
- [x] Inisialisasi project Node.js dengan TypeScript
- [x] Setup Vite untuk build script
- [x] Setup struktur folder (src/api, src/services, src/repositories, migrations, etc)
- [x] Setup environment variables (dotenv)

## 2. Database & Migration
- [x] Setup koneksi PostgreSQL
- [x] Buat migrasi tabel users, lists, tasks
- [x] Buat skrip migrasi di folder `migrations`
- [x] Implementasi repository SQL dan memory store

## 3. Authentication
- [x] Implementasi endpoint register (`POST /auth/register`)
- [x] Implementasi endpoint login (`POST /auth/login`)
- [x] Implementasi JWT token generation & verification
- [x] Middleware autentikasi JWT

## 4. To-Do List API (CRUD)
- [x] Endpoint CRUD Lists (`/lists`)
- [x] Endpoint CRUD Tasks (`/lists/:listId/tasks`)
- [x] Validasi dan isolasi data per user

## 5. Service Layer
- [x] Implementasi service untuk user, list, dan task
- [x] Tambahkan validasi dan aturan bisnis di service

## 6. Repository Layer
- [x] Implementasi repository memory store (untuk dev/test)
- [x] Implementasi repository SQL (untuk production)

## 7. API Documentation
- [x] Implementasi dokumentasi OpenAPI/Swagger
- [x] Pastikan dapat diakses di endpoint `/docs`

## 8. Postman/Insomnia Collection
- [ ] Buat koleksi request untuk semua endpoint (auth, lists, tasks)
- [ ] Sertakan contoh header, payload, dan response

## 9. Testing & QA
- [ ] Uji semua endpoint dengan memory store
- [ ] Uji semua endpoint dengan database SQL
- [ ] Review checklist dan dokumentasi

---

Setiap tugas di atas wajib dicek sebelum deployment/penyerahan project.
