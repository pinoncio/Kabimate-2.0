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
const usuarioModel_1 = require("../src/models/usuarioModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
let server;
jest.mock('bcrypt', () => ({
    compare: jest.fn(),
}));
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mockToken'),
}));
const mockUsuario = {
    ID_USUARIO: 1,
    EMAIL_USUARIO: "test@example.com",
    CONTRASENIA_USUARIO: 'hashedPassword',
    ESTADO_CUENTA: true,
    ID_ROL_USUARIO: 2,
};
const mockUsuarioInstance = Object.assign(Object.assign({ dataValues: mockUsuario }, mockUsuario), { get: jest.fn((key) => mockUsuario[key]), toJSON: jest.fn(() => mockUsuario) });
beforeAll(() => {
    server = new server_1.default();
    server.listen();
});
afterAll(() => {
    if (server) {
        server.close();
    }
});
describe('Pruebas para /api/usuarios', () => {
    test('Debería responder con una lista de usuarios y un código de estado 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server['app']).get('/api/usuarios/list');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    }));
    test('Debería devolver un usuario con ID_USUARIO: 1 en /api/usuarios/1', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server['app']).get('/api/usuarios/1');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.ID_USUARIO).toBe(1);
    }));
    test('Debería devolver un código de estado 404 si el usuario no existe al intentar actualizar', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server['app'])
            .put('/api/usuarios/update/9999')
            .send({
            NOMBRE1_USUARIO: 'NuevoNombre',
            APELLIDO1_USUARIO: 'NuevoApellido'
        });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'El usuario ingresado no existe');
    }));
});
describe('Pruebas para /login', () => {
    test('Debería devolver un error si la cuenta está bloqueada', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(usuarioModel_1.Usuario, 'findOne').mockResolvedValue(Object.assign(Object.assign({}, mockUsuarioInstance), { ESTADO_CUENTA: false }));
        bcrypt_1.default.compare.mockResolvedValue(true);
        const response = yield (0, supertest_1.default)(server['app'])
            .post('/api/usuarios/login')
            .send({ email: 'test@example.com', contrasenia: 'password' });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('msg', 'La cuenta esta bloqueada, porfavor contacta al administrador');
    }));
    test('Debería devolver un error si la contraseña es incorrecta', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(usuarioModel_1.Usuario, 'findOne').mockResolvedValue(mockUsuarioInstance);
        bcrypt_1.default.compare.mockResolvedValue(false);
        const response = yield (0, supertest_1.default)(server['app'])
            .post('/api/usuarios/login')
            .send({ email: 'test@example.com', contrasenia: 'wrongpassword' });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('msg', 'Contraseña Incorrecta');
    }));
    test('Debería iniciar sesión exitosamente y devolver un token', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(usuarioModel_1.Usuario, 'findOne').mockResolvedValue(mockUsuarioInstance);
        bcrypt_1.default.compare.mockResolvedValue(true);
        const response = yield (0, supertest_1.default)(server['app'])
            .post('/api/usuarios/login')
            .send({ email: 'test@example.com', contrasenia: 'password' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token', 'mockToken');
        expect(response.body).toHaveProperty('rol', mockUsuario.ID_ROL_USUARIO);
        expect(response.body).toHaveProperty('idUsuario', mockUsuario.ID_USUARIO);
    }));
});
