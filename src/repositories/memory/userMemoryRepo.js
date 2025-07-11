"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoryUserRepository = void 0;
const users = [];
exports.memoryUserRepository = {
    async create(user) {
        users.push(user);
        return user;
    },
    async findByUsername(username) {
        return users.find(u => u.username === username) || null;
    },
    async findByEmail(email) {
        // Perbaikan: pastikan email tidak null dan tipe data sesuai
        if (!email)
            return null;
        return users.find(u => u.email === email) || null;
    },
    async findById(id) {
        return users.find(u => u.id === id) || null;
    },
    reset() {
        users.length = 0;
    }
};
