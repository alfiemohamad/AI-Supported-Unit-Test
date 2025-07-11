"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoryTaskRepository = exports.memoryListRepository = void 0;
const lists = [];
const tasks = [];
exports.memoryListRepository = {
    async create(list) {
        if (!list.id)
            list.id = lists.length + 1;
        lists.push(list);
        return list;
    },
    async findByUser(user_id) {
        return lists.filter(l => l.user_id === user_id);
    },
    async findById(id) {
        return lists.find(l => l.id === id) || null;
    },
    async update(id, data) {
        const idx = lists.findIndex(l => l.id === id);
        if (idx === -1)
            return null;
        lists[idx] = { ...lists[idx], ...data };
        return lists[idx];
    },
    async delete(id) {
        const idx = lists.findIndex(l => l.id === id);
        if (idx === -1)
            return false;
        lists.splice(idx, 1);
        return true;
    },
};
exports.memoryTaskRepository = {
    async create(task) {
        if (!task.id)
            task.id = tasks.length + 1;
        tasks.push(task);
        return task;
    },
    async findByList(list_id) {
        return tasks.filter(t => t.list_id === list_id);
    },
    async findById(id) {
        return tasks.find(t => t.id === id) || null;
    },
    async update(id, data) {
        const idx = tasks.findIndex(t => t.id === id);
        if (idx === -1)
            return null;
        tasks[idx] = { ...tasks[idx], ...data };
        return tasks[idx];
    },
    async delete(id) {
        const idx = tasks.findIndex(t => t.id === id);
        if (idx === -1)
            return false;
        tasks.splice(idx, 1);
        return true;
    },
};
