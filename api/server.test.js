const request = require('supertest');

const server = require('./server');
const db = require('../data/dbConfig');
const buildToken = require('../api/auth/token-builder');

const token = buildToken({username: 'testUser', user_id: 1});

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
    expect(res.body.token).toBeTruthy();
  });
  it('sends proper error message on invalid credentials', async () => {
    res = await request(server).post('/api/auth/login')
      .send({username: 'testUser', password: 'youShallNotPass'});
    expect(res.body).toMatchObject({
      message: 'invalid credentials'
    });
    res = await request(server).post('/api/auth/login')
      .send({username: 'Gandalf', password: 'youShallNotPass'});
    expect(res.body).toMatchObject({
      message: 'invalid credentials'
    });
  });
});

describe('PUT /api/auth/', () => {
  let res;
  beforeEach(async () => {
    password = await db('users').where('user_id', 1).first().then(user => {
      return user.password;
    });
    res = await request(server).put('/api/auth/')
      .send({username: 'newUser', password: 'moreSecure'})
      .set({authorization: token});
  });
  it('successfuly updates user data', async () => {
    const newUser = await db('users').where('user_id', 1).first(); 
    expect(res.body).toMatchObject({message: 'working'});
    expect(newUser.username).toBe('newUser');
    expect(password).not.toBe(newUser.password);
  });
  it('fails when token is not provided', async () => {
    res = await request(server).put('/api/auth/')
      .send({username: 'sneaky', password: 'theyWillNeverKnow'})
    expect(res.body).toMatchObject({
      message: 'token required'
    });
  });
  it('fails when invalid token is provided', async () => {
    res = await request(server).put('/api/auth/')
      .send({username: 'sneaky', password: 'theyWillNeverKnow'})
      .set({authorization: 'totallyAValidTokenJFSOFISJDLFKSJDFKOKEFJSLD'})
    expect(res.body).toMatchObject({
      message: 'token invalid'
    });
  });
});
