-- Migration: Add email column to users table

-- Step 1: Tambahkan kolom email tanpa NOT NULL
ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR(100) UNIQUE;

-- Step 2: Isi email user lama dengan dummy/unique value
UPDATE users SET email = CONCAT(username, '@dummy.local') WHERE email IS NULL;

-- Step 3: Ubah kolom email jadi NOT NULL
ALTER TABLE users ALTER COLUMN email SET NOT NULL;
