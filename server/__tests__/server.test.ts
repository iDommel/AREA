import request from 'supertest';

const SERVER_URL = 'http://localhost:8080';
describe('Test the server', () => {
    test('GET / responds with 200', async () => {
        const response = await request(SERVER_URL).get('/');
        expect(response.statusCode).toBe(200);
    });
});
