const request = require('supertest');

const server = require('./server');
const db = require('../data/dbConfig');

it('sanity control', () => {
  expect(true).toBe(true);
})

beforeAll(async() => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('[POST] /api/auth/register', () => {
  const newUser = {username: 'gimli', password: 'andMyAxe'}
  let res;
  beforeEach(async () => {
    res = await request(server).post('/api/auth/register')
      .send(newUser);
  });
  it('adds new user into the database', async () => {
    const users = await db('users');
    expect(users).toHaveLength(2);
  });
  it('responds with proper error when fields missing', async () => {
    const res = await request(server).post('api/auth/register')
      .send({junk: 'junk'});
    expect(res.body).toMatchObject({
      message: 'username and password are required'
    });
  });
});