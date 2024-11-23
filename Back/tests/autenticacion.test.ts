import request from 'supertest';

const BASE_URL = 'http://localhost:3001';
describe('Pruebas para /login', () => {
    test('MA-0001: Debería devolver un error si la cuenta está bloqueada', async () => {
        const response = await request(BASE_URL) 
            .post('/api/usuarios/login')
            .send({ email: 'usuariobloqueado@pruebas.cl', contrasenia: 'pruebas' });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty(
            'msg',
            'La cuenta esta bloqueada, porfavor contacta al administrador'
        );
    });

    test('MA-0002: Debería devolver un error si la contraseña es incorrecta', async () => {
        const response = await request(BASE_URL)
            .post('/api/usuarios/login')
            .send({ email: 'usuario@pruebas.cl', contrasenia: 'wrongpassword' });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('msg', 'Contraseña Incorrecta');
    });

    test('MA-0003: Debería iniciar sesión exitosamente y devolver un token', async () => {
        const response = await request(BASE_URL)
            .post('/api/usuarios/login')
            .send({ email: 'usuario@pruebas.cl', contrasenia: 'pruebas' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('rol');
        expect(response.body).toHaveProperty('idUsuario');
})
});