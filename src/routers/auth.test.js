const supertest = require('supertest');

const app = require('../app');
const request = supertest(app);

describe('POST /api/sign-up', () => {
  it('should respond with an email validation error ', async (done) => {
    const response = await request
      .post('/api/sign-up')
      .send({
        'email': 'usuario@.br',
        'password': 'pass123IOKJ1234'
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('email: should match pattern "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"');
    done();
  });

  it('should respond with a password validation error ', async (done) => {
    const response = await request
      .post('/api/sign-up')
      .send({
        'email': 'usuario@com.br',
        'password': 'pass123'
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Password must have: at least one digit (0-9), at least one lowercase character (a-z), at least one uppercase character (A-Z), at least 8 characters');
    done();
  });

  it('should respond with an user and token ', async (done) => {
    const response = await request
      .post('/api/sign-up')
      .send({
        'email': 'usuario@com.br',
        'password': 'pass123PASS'
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(['user','id']);
    expect(response.body).toHaveProperty(['user', 'email']);
    expect(response.body).toHaveProperty('token');
    done();
  });

  it('should respond with an error (user already registered) ', async (done) => {
    const response = await request
      .post('/api/sign-up')
      .send({
        'email': 'usuario@com.br',
        'password': 'pass123PASSa'
      });
    expect(response.status).toBe(409);
    expect(response.body.message).toBe('Email already registered.');
    done();
  });
});

describe('POST /api/login', () => {
  it('should respond with a login error (user not found)', async (done) => {
    const response = await request
      .post('/api/login')
      .send({
        'email': 'usuarioDesconhecido@com.br',
        'password': 'pass123PASS'
      });
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Unable to login.');
    done();
  });

  it('should respond with a login error (wrong password)', async (done) => {
    const response = await request
      .post('/api/login')
      .send({
        'email': 'usuario@com.br',
        'password': 'pass123'
      });
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Unable to login.');
    done();
  });

  it('should respond with an user and token ', async (done) => {
    const response = await request
      .post('/api/login')
      .send({
        'email': 'usuario@com.br',
        'password': 'pass123PASS'
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(['user','id']);
    expect(response.body).toHaveProperty(['user', 'email']);
    expect(response.body).toHaveProperty('token');
    done();
  });
});
