"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listService = void 0;
const todoMemoryRepo_1 = require("../repositories/memory/todoMemoryRepo");
const todoSqlRepo_1 = require("../repositories/sql/todoSqlRepo");
const isProduction = process.env.NODE_ENV === 'production';
const listRepo = isProduction ? todoSqlRepo_1.sqlListRepository : todoMemoryRepo_1.memoryListRepository;
exports.listService = {
    async createList(list) {
        // @ts-ignore
        return listRepo.create(list);
    },
    async getListsByUser(user_id) {
        return listRepo.findByUser(user_id);
    },
    async getListById(id) {
        return listRepo.findById(id);
    },
    async updateList(id, data) {
        return listRepo.update(id, data);
    },
    async deleteList(id) {
        return listRepo.delete(id);
    },
};
