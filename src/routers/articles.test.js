const supertest = require('supertest');

const app = require('../app');
const request = supertest(app);
const endpoint = '/api/articles';
const endpointAdmin = '/api/admin/articles';

let userToken;
let adminToken;

beforeAll((done) => {
  request
    .post('/api/login')
    .send({
      email: 'user@example.com',
      password: 'pass123PASS',
    })
    .end((err, response) => {
      userToken = response.body.token;
      done();
    });
});

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

describe('GET /api/articles?category=:slug', () => {
  it('should respond with an array of articles', async (done) => {
    const response = await request.get(`${endpoint}?category=microservices`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        author: {
          name: 'Martin Fowler',
          picture: 'https://martinfowler.com/mf.jpg',
        },
        category: 'microservices',
        title: 'Monolith First',
        summary: 'Why you shouldn\'t start a new project with microservices',
      },
    ]);
    done();
  });

  it('should respond with an empty array', async (done) => {
    const response = await request.get(`${endpoint}?category=devops`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
    done();
  });

  it('shoud respond with an error', async (done) => {
    const response = await request.get(`${endpoint}?category=`);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Category is required.');
    done();
  });
});

describe('GET /api/articles/:id', () => {
  it('should respond with a not found error', async (done) => {
    const response = await request.get(`${endpoint}/503`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Not found: /api/articles/503');
    done();
  });

  it('should respond with an article (without the text body of the article)', async (done) => {
    const response = await request.get(`${endpoint}/1`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      author: {
        name: 'Martin Fowler',
        picture: 'https://martinfowler.com/mf.jpg',
      },
      category: 'microservices',
      title: 'Monolith First',
      summary: 'Why you shouldn\'t start a new project with microservices',
      firstParagraph:
        '<p>As I hear stories about teams using a microservices architecture, I\'ve noticed a common pattern.</p>',
    });
    done();
  });

  it('should respond with an article (with the text body of the article)', async (done) => {
    const response = await request
      .get(`${endpoint}/1`)
      .set({ Authorization: `Bearer ${userToken}` });
    expect(response.body).toEqual({
      author: {
        name: 'Martin Fowler',
        picture: 'https://martinfowler.com/mf.jpg',
      },
      category: 'microservices',
      title: 'Monolith First',
      summary: 'Why you shouldn\'t start a new project with microservices',
      firstParagraph:
        '<p>As I hear stories about teams using a microservices architecture, I\'ve noticed a common pattern.</p>',
      body:
        '<p>1. Almost all the successful microservice stories have started with a monolith that got too big and was broken up.</p> <p>Almost all the cases where I\'ve heard of a system that was built as a microservice system from scratch, it has ended up in serious trouble.</p>',
    });
    done();
  });
});

describe('GET /api/admin/articles', () => {
  it('should respond with an unauthorized error', async (done) => {
    const response = await request
      .get(endpointAdmin)
      .set({ Authorization: `Bearer ${userToken}` });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Please authenticate.');
    done();
  });

  it('should respond with an array of articles', async (done) => {
    const response = await request
      .get(endpointAdmin)
      .set({ Authorization: `Bearer ${adminToken}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { author: {
        name: 'Martin Fowler',
        picture: 'https://martinfowler.com/mf.jpg',
      },
      body: '<p>1. Almost all the successful microservice stories have started with a monolith that got too big and was broken up.</p> <p>Almost all the cases where I\'ve heard of a system that was built as a microservice system from scratch, it has ended up in serious trouble.</p>',
      category: 'microservices',
      firstParagraph:
          '<p>As I hear stories about teams using a microservices architecture, I\'ve noticed a common pattern.</p>',
      summary: 'Why you shouldn\'t start a new project with microservices',
      title: 'Monolith First',
      },
      {author: {
        name: 'Tania Rascia',
        picture: 'https://www.taniarascia.com/static/tania2020small-2e26928e592931dfb9698970daff8edc.jpg',
      },
      body: '<p>The former basically says, "don\'t worry about trying to set up the perfect system; nothing will ever be perfect, so just relax and get used to chaos, and try to put all your focus on one thing at a time". The latter says, "set up self-imposed personal rules, because your quality of life will improve when your standards are clear".</p>',
      category: 'productivity',
      firstParagraph:
          '<p>At some point in my life, I read A Case Against Optimizing Your Life , and I took it to heart, and I lived by it. Now I think Wise People Have Rules For Themselves is the right approach for me.</p>',
      summary: 'Systems that improves everyday life',
      title: 'Everyday Systems That Help Me',
      },
    ]);
    done();
  });
});

describe('POST /api/admin/articles', () => {
  it('should respond with a created article', async (done) => {
    const response = await request
      .post(endpointAdmin)
      .set({ Authorization: `Bearer ${adminToken}` })
      .send({
        category: 'microservices',
        first_paragraph:
            '<p>Infrastructure as code is the approach to defining ...</p>',
        body: '<p>...</p>',
        summary: 'Infrastructure As Code',
        title: 'Infrastructure As Code',
        author_id: 1,
      });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 3,
      category: 'microservices',
      first_paragraph:
        '<p>Infrastructure as code is the approach to defining ...</p>',
      body: '<p>...</p>',
      summary: 'Infrastructure As Code',
      title: 'Infrastructure As Code',
      author_id: 1,
    });
    done();
  });

  it('should respond with an error: author does not exist', async (done) => {
    const response = await request
      .post(endpointAdmin)
      .set({ Authorization: `Bearer ${adminToken}` })
      .send({
        category: 'microservices',
        first_paragraph:
            '<p>Infrastructure as code is the approach to defining ...</p>',
        body: '<p>...</p>',
        summary: 'Infrastructure As Code',
        title: 'Infrastructure As Code',
        author_id: 100,
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Author does not exist.');
    done();
  });

  it('should respond with an error: validation error', async (done) => {
    const response = await request
      .post(endpointAdmin)
      .set({ Authorization: `Bearer ${adminToken}` })
      .send({
        category: 'microservices',
        summary: 'Infrastructure As Code',
        title: 'Infrastructure As Code',
        author_id: 1,
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'first_paragraph: is a required property, body: is a required property'
    );
    done();
  });
});

describe('PATCH /api/admin/articles/:id', () => {
  it('should update a given article', async (done) => {
    const response = await request
      .patch(`${endpointAdmin}/1`)
      .set({ Authorization: `Bearer ${adminToken}` })
      .send({category: 'devops' });
    expect(response.status).toBe(204);
    done();
  });

  it('should respond with an error', async (done) => {
    const response = await request
      .patch(`${endpointAdmin}/100`)
      .set({ Authorization: `Bearer ${adminToken}` })
      .send({ category: 'devops' });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Article does not exist.');
    done();
  });
});

describe('DELETE /api/admin/articles/:id', () => {
  it('should delete a given article', async (done) => {
    const response = await request
      .delete(`${endpointAdmin}/3`)
      .set({ Authorization: `Bearer ${adminToken}` });
    expect(response.status).toBe(204);
    done();
  });

  it('should respond with an error', async (done) => {
    const response = await request
      .delete(`${endpointAdmin}/100`)
      .set({ Authorization: `Bearer ${adminToken}` });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Article does not exist.');
    done();
  });
});
