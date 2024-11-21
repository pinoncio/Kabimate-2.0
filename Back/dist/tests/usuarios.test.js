"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../src/db/server"));
let server;
beforeAll(() => {
    // Inicia el servidor antes de las pruebas
    server = new server_1.default();
    server.listen();
});
//cerramos despues de manera asincrona
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    if (server) {
        server.close();
    }
}));
describe('Pruebas para /api/usuarios', () => {
    test('Debería responder con una lista de usuarios y un código de estado 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server['app']).get('/api/usuarios/list'); // Usa la propiedad app directamente
        expect(response.status).toBe(200); // Verifica que el estado sea 200
        expect(response.body).toBeInstanceOf(Array); // Verifica que el cuerpo sea un arreglo
    }));
});
