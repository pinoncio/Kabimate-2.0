"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.app = void 0;
const server_1 = __importDefault(require("../../src/db/server"));
const supertest_1 = __importDefault(require("supertest"));
const server = new server_1.default();
exports.app = server['app'];
exports.request = (0, supertest_1.default)(exports.app);
