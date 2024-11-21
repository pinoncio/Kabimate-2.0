import Server from '../../src/db/server';
import supertest from 'supertest';

const server = new Server();
export const app = server['app']; 
export const request = supertest(app); 