const supertest = require('supertest');
const app = require('../server');

describe('Endpoints: ', () => {

  it('/', () => supertest(app).get('/').expect(200))

  it('/api', () => supertest(app).get('/api').expect(200))

  it('/api/payment', () => supertest(app).get('/api/payment').expect(200))

})