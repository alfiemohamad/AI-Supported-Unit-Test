"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listService_1 = require("./listService");
describe('listService (memory)', () => {
    let listId;
    const userId = 12345;
    it('should create list', async () => {
        const list = await listService_1.listService.createList({ name: 'Service List', user_id: userId });
        expect(list).toHaveProperty('id');
        expect(list).toHaveProperty('name', 'Service List');
        expect(list).toHaveProperty('user_id', userId);
        listId = list.id;
    });
    it('should get list by id', async () => {
        const list = await listService_1.listService.getListById(listId);
        expect(list).not.toBeNull();
        expect(list?.id).toBe(listId);
    });
    it('should get lists by user', async () => {
        const lists = await listService_1.listService.getListsByUser(userId);
        expect(Array.isArray(lists)).toBe(true);
        expect(lists.some(l => l.id === listId)).toBe(true);
    });
    it('should update list', async () => {
        const updated = await listService_1.listService.updateList(listId, { name: 'Updated Service List' });
        expect(updated).toHaveProperty('name', 'Updated Service List');
    });
    it('should delete list', async () => {
        const deleted = await listService_1.listService.deleteList(listId);
        expect(deleted).toBe(true);
        const list = await listService_1.listService.getListById(listId);
        expect(list).toBeNull();
    });
});
