const supertest = require('supertest');

const app = require('../app');
const request = supertest(app);
const endpoint = '/api/admin/authors';

let adminToken;
beforeAll((done) => {
  request
    .post('/api/login')
    .send({
      email: 'admin@example.com',
      password: 'pass123PASS',
    })
    .end((err, response) => {
      adminToken = response.body.token;
      done();
    });
});

describe('GET /api/admin/authors/:id', () => {
  it('should respond with a not found error', async (done) => {
    const response = await request.get(`${endpoint}/100`).set({Authorization: `Bearer ${adminToken}`});
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Author not found.');
    done();
  });

  it('should respond with an author', async (done) => {
    const response = await request.get(`${endpoint}/1`).set({Authorization: `Bearer ${adminToken}`});
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: 'Martin Fowler',
      picture: 'https://martinfowler.com/mf.jpg',
    });
    done();
  });
});

describe('GET /api/admin/authors', () => {
  it('should respond with an unauthorized error', async (done) => {
    const response = await request
      .get(endpoint);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Please authenticate.');
    done();
  });

  it('should respond with an array of authors', async (done) => {
    const response = await request
      .get(endpoint)
      .set({ Authorization: `Bearer ${adminToken}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        'name': 'Martin Fowler',
        'picture': 'https://martinfowler.com/mf.jpg',
      },
      {
        'name': 'Tania Rascia',
        'picture': 'https://www.taniarascia.com/static/tania2020small-2e26928e592931dfb9698970daff8edc.jpg'
      },
    ]);
    done();
  });
});

describe('POST /api/admin/authors', () => {
  it('should respond with a created author', async (done) => {
    const response = await request
      .post(endpoint)
      .set({ Authorization: `Bearer ${adminToken}` })
      .send({
        name: 'Oskar uit de Bos',
        picture: 'https://miro.medium.com/fit/c/96/96/1*TRGym9kC6krhzxx38tvdqQ.png'
      });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 3,
      name: 'Oskar uit de Bos',
      picture: 'https://miro.medium.com/fit/c/96/96/1*TRGym9kC6krhzxx38tvdqQ.png'
    });
    done();
  });

  it('should respond with an error: validation error', async (done) => {
    const response = await request
      .post(endpoint)
      .set({ Authorization: `Bearer ${adminToken}` })
      .send({
        name: 'Oskar uit de Bos'
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'picture: is a required property'
    );
    done();
  });
});

describe('PATCH /api/admin/authors/:id', () => {
  it('should update a given author', async (done) => {
    const response = await request
      .patch(`${endpoint}/3`)
      .set({ Authorization: `Bearer ${adminToken}` })
      .send({name: 'Michael Feathers' });
    expect(response.status).toBe(204);
    done();
  });

  it('should respond with an error', async (done) => {
    const response = await request
      .patch(`${endpoint}/100`)
      .set({ Authorization: `Bearer ${adminToken}` })
      .send({name: 'Michael Feathers' });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Author does not exist.');
    done();
  });
});

describe('DELETE /api/admin/authors/:id', () => {
  it('should delete a given author', async (done) => {
    const response = await request
      .delete(`${endpoint}/3`)
      .set({ Authorization: `Bearer ${adminToken}` });
    expect(response.status).toBe(204);
    done();
  });

  it('should respond with an error', async (done) => {
    const response = await request
      .delete(`${endpoint}/100`)
      .set({ Authorization: `Bearer ${adminToken}` });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Author does not exist.');
    done();
  });
});
