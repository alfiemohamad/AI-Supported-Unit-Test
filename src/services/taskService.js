"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = void 0;
const todoMemoryRepo_1 = require("../repositories/memory/todoMemoryRepo");
const todoSqlRepo_1 = require("../repositories/sql/todoSqlRepo");
const isProduction = process.env.NODE_ENV === 'production';
const taskRepo = isProduction ? todoSqlRepo_1.sqlTaskRepository : todoMemoryRepo_1.memoryTaskRepository;
exports.taskService = {
    async createTask(task) {
        // @ts-ignore
        return taskRepo.create(task);
    },
    async getTasksByList(list_id) {
        return taskRepo.findByList(list_id);
    },
    async getTaskById(id) {
        return taskRepo.findById(id);
    },
    async updateTask(id, data) {
        return taskRepo.update(id, data);
    },
    async deleteTask(id) {
        return taskRepo.delete(id);
    },
};
