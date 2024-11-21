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
describe('Pruebas para /api/cabanas', () => {
    test('Debería devolver las cabañas de un usuario válido', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server['app']).get('/api/cabanas/list/1');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    }));
    test('Debería devolver un error 400 si el usuario no existe', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server['app']).get('/api/cabanas/list/9999');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('msg', 'El usuario ingresado no existe');
    }));
    test('Debería activar una cabaña exitosamente', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server['app'])
            .put('/api/cabanas/activar/1')
            .send({ trigger: 1 });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('msg', 'Se ha activado la cabaña con id: 1 correctamente');
    }));
    test('Debería devolver un error 404 si la cabaña no existe al activar', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server['app'])
            .put('/api/cabanas/activar/9999')
            .send({ trigger: 1 });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'La cabaña con id: 9999 no existe');
    }));
});
