# Arsitektur Kode Secure To-Do List API

## 1. Overview
Aplikasi menggunakan arsitektur berlapis (layered architecture) untuk menjaga pemisahan tanggung jawab, kemudahan pengujian, dan skalabilitas.

## 2. Tech Stack
- expressjs (REST API framework)
- typescript (static typing)
- vite (build tool)
- postgresql (production database)
- memory store (untuk development/testing)
- swagger (OpenAPI docs)

## 3. Struktur Folder
```
/ (root)
  ├── src/
  │   ├── api/           # API layer (Express route handlers)
  │   ├── services/      # Service layer (business logic)
  │   ├── repositories/  # Repository layer (data access)
  │   │     ├── memory/  # In-memory repositories
  │   │     └── sql/     # SQL (PostgreSQL) repositories
  │   ├── models/        # TypeScript types/interfaces
  │   └── utils/         # Helper functions, JWT, etc
  ├── migrations/        # SQL migration scripts
  ├── docs/              # Documentation (PRD, tasks, OpenAPI, etc)
  ├── package.json
  ├── tsconfig.json
  └── vite.config.ts
```

## 4. Layered Architecture

### API Layer (`src/api/`)
- Menyediakan endpoint REST (Express router)
- Setiap endpoint diberi JSDoc/TSDoc
- Validasi request awal (misal: body, params)
- Forward ke service layer

### Service Layer (`src/services/`)
- Menangani logika bisnis dan validasi lanjutan
- Memanggil repository untuk akses data
- Menangani error dan aturan bisnis

### Repository Layer (`src/repositories/`)
- Abstraksi akses data (interface repository)
- Implementasi memory store (untuk dev/test)
- Implementasi SQL (PostgreSQL) untuk production
- Semua perubahan data dilakukan via repository

### Migration (`/migrations`)
- Skrip SQL untuk pembuatan dan perubahan tabel
- Semua perubahan skema database dilakukan via migrasi

### Dokumentasi (`/docs`)
- PRD, tasks, dan OpenAPI/Swagger
- Swagger UI dapat diakses di `/docs`

## 5. OpenAPI/Swagger
- Semua endpoint didokumentasikan dengan OpenAPI
- Swagger UI di-mount di `/docs`

## 6. Deployment
- Build dengan vite
- Konfigurasi environment untuk memilih memory store atau SQL repository

---

Arsitektur ini memudahkan pengembangan, pengujian, dan deployment aplikasi secara terpisah antara logika, API, dan data.
