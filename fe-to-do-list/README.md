# FE To-Do List (React + TypeScript + Vite)

Aplikasi frontend untuk Secure To-Do List API. Dibangun dengan React, TypeScript, dan Vite. Mendukung autentikasi JWT, CRUD List & Task, serta integrasi dengan backend API.

---

## 🛠️ Alur Kerja Pengembangan

1. **Membuat file open-api-spec.json**
   - Spesifikasi endpoint backend ditulis dalam format OpenAPI (Swagger) dan disimpan di file `open-api-spec.json`.
2. **Generate dokumen tasks.md**
   - Berdasarkan open-api-spec.json, dibuat dokumen `tasks.md` yang berisi panduan pengerjaan fitur frontend dan checklist development.
   - Dokumen ini digunakan sebagai acuan agar proses development lebih terstruktur dan tidak berulang.
3. **Development FE**
   - Pengembangan frontend dilakukan dengan mengacu pada checklist di `tasks.md`.

---

## ⚠️ Tantangan Pengembangan dengan AI & Solusinya

Menggunakan AI (seperti Copilot, ChatGPT, dsb) dalam pengembangan frontend dapat mempercepat proses, namun ada beberapa tantangan yang sering dihadapi:

- **Konteks Kurang Lengkap:** AI kadang tidak memahami keseluruhan arsitektur atau dependensi project, sehingga kode yang dihasilkan bisa tidak sesuai atau tidak terintegrasi dengan baik.
- **Duplikasi & Inkonsistensi:** AI bisa saja menghasilkan kode yang mirip/duplikat di beberapa tempat, atau style yang tidak konsisten.
- **Kurang Spesifik pada Kebutuhan:** Saran AI seringkali terlalu generik dan tidak selalu sesuai dengan kebutuhan bisnis atau user flow aplikasi.
- **Potensi Bug & Error:** Kode dari AI tetap perlu dicek, karena bisa saja ada bug, typo, atau error logic.

**Solusi Praktis:**
- Selalu gunakan dokumen `tasks.md` sebagai acuan utama pengerjaan fitur.
- Review dan refactor kode hasil AI sebelum merge ke main branch.
- Lakukan testing manual pada setiap fitur yang selesai dibuat.
- Diskusikan dengan tim jika ada keraguan pada hasil kode AI.
- Dokumentasikan setiap perubahan penting agar mudah dipahami anggota tim lain.

Dengan pendekatan ini, AI dapat menjadi asisten yang efektif tanpa mengorbankan kualitas dan konsistensi aplikasi.

---

## 🚀 Cara Menjalankan Aplikasi

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Jalankan aplikasi**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173` (atau port lain sesuai output terminal).

3. **Pastikan backend API** sudah berjalan di `http://localhost:3000` (atau sesuai konfigurasi backend Anda).

---

## 📝 Cara Menggunakan

1. **Register Akun**
   - Buka aplikasi FE di browser.
   - Klik "Register" dan isi username & password.

2. **Login**
   - Masukkan username & password yang sudah didaftarkan.
   - Setelah login, token akan otomatis disimpan dan digunakan untuk request selanjutnya.

3. **CRUD List**
   - Tambah List: Isi nama list dan submit.
   - Edit/Hapus List: Gunakan tombol edit/delete di samping list.
   - Klik nama list untuk melihat/mengelola task di dalamnya.

4. **CRUD Task**
   - Tambah Task: Isi judul, deskripsi, dan status selesai.
   - Edit/Hapus Task: Gunakan tombol edit/delete di samping task.
   - Update status selesai langsung dari daftar task.

5. **Logout**
   - Klik tombol logout di pojok atas untuk keluar.

---

## ⚙️ Konfigurasi API

- Secara default, aplikasi mengakses backend di `http://localhost:3000`.
- Jika backend berjalan di alamat berbeda, ubah base URL di file `src/api/auth.ts` dan `src/api/lists.ts`.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Folder Structure and Base Files

To get started, here's a recommended folder structure and some base files:

```
|-- src/
|   |-- components/
|   |-- pages/
|   |-- api/
|   |-- hooks/
|   |-- utils/
|   |-- theme/
|   |-- App.tsx
|   |-- main.tsx
|   |-- index.css
|-- public/
|   |-- assets/
```

- `components/`: Reusable components
- `pages/`: Page components for routing
- `api/`: API calls and services
- `hooks/`: Custom React hooks
- `utils/`: Utility functions
- `theme/`: Theme and styling variables
- `App.tsx`: Main app component
- `main.tsx`: Entry point
- `index.css`: Global styles
