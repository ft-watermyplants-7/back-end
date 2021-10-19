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

describe('[POST] /api/register', () => {
});