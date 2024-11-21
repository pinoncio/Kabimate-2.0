import request from 'supertest';
import Server from '../src/db/server';

let server: Server;

beforeAll(() => {
    // Inicia el servidor antes de las pruebas
    server = new Server();
    server.listen();
});

//cerramos despues de manera asincrona
afterAll(async () => {
    if (server) {
        server.close();
    }
});



describe('Pruebas para /api/usuarios', () => {
    test('Debería responder con una lista de usuarios y un código de estado 200', async () => {
        const response = await request(server['app']).get('/api/usuarios/list'); // Usa la propiedad app directamente
        expect(response.status).toBe(200); // Verifica que el estado sea 200
        expect(response.body).toBeInstanceOf(Array); // Verifica que el cuerpo sea un arreglo
    });
});

