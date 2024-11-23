import request from 'supertest';

const BASE_URL = 'http://localhost:3001';
describe('Pruebas para /api/usuarios', () => {
    test('GU-0001: Debería responder con una lista de usuarios y un código de estado 200', async () => {
        const response = await request(BASE_URL).get('/api/usuarios/list');
        expect(response.status).toBe(200); 
        expect(response.body).toBeInstanceOf(Object); 
    });

    test('GU-0002: Debería devolver un usuario con ID_USUARIO: 1 en /api/usuarios/1', async () => {
        const response = await request(BASE_URL).get('/api/usuarios/1');
        expect(response.status).toBe(200); 
        expect(response.body).toBeInstanceOf(Object);

        expect(response.body.ID_USUARIO).toBe(1); 
    });

    test('GU-0003: Debería devolver un código de estado 404 si el usuario no existe al intentar actualizar', async () => {
        const response = await request(BASE_URL)
            .put('/api/usuarios/update/9999')
            .send({
                NOMBRE1_USUARIO: 'NuevoNombre',
                APELLIDO1_USUARIO: 'NuevoApellido',
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'El usuario ingresado no existe');
    });
});