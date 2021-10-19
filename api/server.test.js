const request = require('supertest');

const server = require('./server');
const db = require('../data/dbConfig');
let token;

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
    const res = await request(server).post('/api/auth/register')
      .send({junk: 'junk'});
    expect(res.body).toMatchObject({
      message: 'username and password are required'
    });
  });
  it('responds with proper error if username taken', async () => {
    res = await request(server).post('/api/auth/register')
      .send({username: 'testUser', password: 'password'});
    expect(res.body).toMatchObject({
      message: 'username is taken'
    });
  });
  it('payload entries are properly trimmed and verified', async () => {
    res = await request(server).post('/api/auth/register')
      .send({username: '  frodo ', password: 'nooooooooo'});
    expect(res.body.username).toBe('frodo');
    res = await request(server).post('/api/auth/register')
      .send({username: 'sam', password: 'boilem'});
    expect(res.body).toMatchObject({
      message: 'password length too short'
    });
    res = await request(server).post('/api/auth/register')
      .send({username: 'Gandalf the White', password: 'Fly you fools'});
    expect(res.body).toMatchObject({
      message: 'invalid entries'
    });
  });
});

describe('POST /api/auth/login', () => {
  let res;
  const user = {username: 'testUser', password: 'andMyAxe'};
  beforeEach(async () => {
    res = await request(server).post('/api/auth/login')
      .send(user);
  });
  it('can successfuly log in user', async () => {
    expect(res.body.message).toBe('welcome, testUser!');
    if(res.body.token) {token = res.body.token}
    expect(res.body.token).toBeTruthy();
  });
});