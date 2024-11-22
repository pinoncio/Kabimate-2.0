import request from 'supertest';
import { Usuario } from '../src/models/usuarioModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// URL del servidor en ejecución
const BASE_URL = 'http://localhost:3001';


beforeEach(() => {
    jest.clearAllMocks();
});

describe('Pruebas para /login', () => {
    test('Debería devolver un error si la cuenta está bloqueada', async () => {

        const response = await request(BASE_URL) // Ajusta el puerto si es necesario
            .post('/api/usuarios/login')
            .send({ email: 'usuariobloqueado@pruebas.cl', contrasenia: 'pruebas' });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty(
            'msg',
            'La cuenta esta bloqueada, porfavor contacta al administrador'
        );
    });

    test('Debería devolver un error si la contraseña es incorrecta', async () => {

        const response = await request(BASE_URL)
            .post('/api/usuarios/login')
            .send({ email: 'usuario@pruebas.cl', contrasenia: 'wrongpassword' });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('msg', 'Contraseña Incorrecta');
    });

    test('Debería iniciar sesión exitosamente y devolver un token', async () => {
    
        const response = await request(BASE_URL)
            .post('/api/usuarios/login')
            .send({ email: 'usuario@pruebas.cl', contrasenia: 'pruebas' });
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('rol');
        expect(response.body).toHaveProperty('idUsuario');
})
});