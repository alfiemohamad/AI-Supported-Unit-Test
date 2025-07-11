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
    async findById(id) {
        return users.find(u => u.id === id) || null;
    },
};
