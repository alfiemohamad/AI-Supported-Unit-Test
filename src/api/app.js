"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./auth"));
const todo_1 = __importDefault(require("./todo"));
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check endpoint
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.use('/auth', auth_1.default);
app.use('/', todo_1.default);
(0, swagger_1.setupSwaggerDocs)(app);
exports.default = app;
