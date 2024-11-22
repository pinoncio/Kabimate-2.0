import request from 'supertest';

// URL del servidor que ya está corriendo
const BASE_URL = 'http://localhost:3001'; // Cambia el puerto si es necesario

describe('Pruebas para /api/cabanas', () => {
    test('Debería devolver las cabañas de un usuario válido', async () => {
        const response = await request(BASE_URL).get('/api/cabanas/list/1');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array); 
    });
    
    test('Debería devolver un error 400 si el usuario no existe', async () => {
        const response = await request(BASE_URL).get('/api/cabanas/list/9999');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('msg', 'El usuario ingresado no existe');
    });

    test('Debería activar una cabaña exitosamente', async () => {
        const response = await request(BASE_URL)
            .put('/api/cabanas/activar/1')
            .send({ trigger: 1 });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty(
            'msg',
            'Se ha activado la cabaña con id: 1 correctamente'
        );
    });
    
    test('Debería devolver un error 404 si la cabaña no existe al activar', async () => {
        const response = await request(BASE_URL)
            .put('/api/cabanas/activar/9999')
            .send({ trigger: 1 });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'La cabaña con id: 9999 no existe');
    });
});