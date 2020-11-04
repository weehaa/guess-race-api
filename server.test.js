const request = require('supertest');
const app = require('./server.js');

describe('root path', () => {
  test('responds with status 200 the GET method', () => {
    return request(app).get("/api/v1/words").then(response => {
      expect(response.statusCode).toBe(200);
    })
  });
})