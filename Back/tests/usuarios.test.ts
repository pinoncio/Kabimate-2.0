import request from 'supertest';
import Server from '../src/db/server';
import { Usuario } from '../src/models/usuarioModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let server: Server;

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

const mockUsuarioInstance = {
    dataValues: mockUsuario,
    ...mockUsuario,
    get: jest.fn((key: keyof typeof mockUsuario) => mockUsuario[key]),
    toJSON: jest.fn(() => mockUsuario),
} as any;



beforeAll(() => {
    server = new Server();
    server.listen();
});

afterAll(() => {
    if (server) {
        server.close();
    }
});

describe('Pruebas para /api/usuarios', () => {
    test('Debería responder con una lista de usuarios y un código de estado 200', async () => {
        const response = await request(server['app']).get('/api/usuarios/list');
        expect(response.status).toBe(200); 
        expect(response.body).toBeInstanceOf(Object); 
    });

    test('Debería devolver un usuario con ID_USUARIO: 1 en /api/usuarios/1', async () => {
        const response = await request(server['app']).get('/api/usuarios/1');
        expect(response.status).toBe(200); 
        expect(response.body).toBeInstanceOf(Object);

        expect(response.body.ID_USUARIO).toBe(1); 
    });

    test('Debería devolver un código de estado 404 si el usuario no existe al intentar actualizar', async () => {
        const response = await request(server['app'])
            .put('/api/usuarios/update/9999')
            .send({
                NOMBRE1_USUARIO: 'NuevoNombre',
                APELLIDO1_USUARIO: 'NuevoApellido'
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'El usuario ingresado no existe');
    });



});

describe('Pruebas para /login', () => {
    test('Debería devolver un error si la cuenta está bloqueada', async () => {
        jest.spyOn(Usuario, 'findOne').mockResolvedValue({
            ...mockUsuarioInstance,
            ESTADO_CUENTA: false,
        });
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);

        const response = await request(server['app'])
            .post('/api/usuarios/login')
            .send({ email: 'test@example.com', contrasenia: 'password' });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('msg', 'La cuenta esta bloqueada, porfavor contacta al administrador');
    });

    test('Debería devolver un error si la contraseña es incorrecta', async () => {
        jest.spyOn(Usuario, 'findOne').mockResolvedValue(mockUsuarioInstance);
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        const response = await request(server['app'])
            .post('/api/usuarios/login')
            .send({ email: 'test@example.com', contrasenia: 'wrongpassword' });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('msg', 'Contraseña Incorrecta');
    });

    test('Debería iniciar sesión exitosamente y devolver un token', async () => {
        jest.spyOn(Usuario, 'findOne').mockResolvedValue(mockUsuarioInstance);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true); 

        const response = await request(server['app'])
            .post('/api/usuarios/login')
            .send({ email: 'test@example.com', contrasenia: 'password' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token', 'mockToken');
        expect(response.body).toHaveProperty('rol', mockUsuario.ID_ROL_USUARIO);
        expect(response.body).toHaveProperty('idUsuario', mockUsuario.ID_USUARIO);
    });
});