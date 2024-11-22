import request from 'supertest';

const BASE_URL = 'http://localhost:3001';
describe('Pruebas para /api/usuarios', () => {
    test('Debería responder con una lista de usuarios y un código de estado 200', async () => {
        const response = await request(BASE_URL).get('/api/usuarios/list');
        expect(response.status).toBe(200); 
        expect(response.body).toBeInstanceOf(Object); 
    });

    test('Debería devolver un usuario con ID_USUARIO: 1 en /api/usuarios/1', async () => {
        const response = await request(BASE_URL).get('/api/usuarios/1');
        expect(response.status).toBe(200); 
        expect(response.body).toBeInstanceOf(Object);

        expect(response.body.ID_USUARIO).toBe(1); 
    });

    test('Debería devolver un código de estado 404 si el usuario no existe al intentar actualizar', async () => {
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