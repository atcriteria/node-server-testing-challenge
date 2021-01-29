// My tests for the server endpoints. Whoop Whoop

const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');

const frodo = { name: "frodo"};
// const sam = { name: "sam" };

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  });
  beforeEach(async () => {
    await db('hobbits').truncate()
  });
  afterAll(async () => {
    await db.destroy()
});

describe('server', () => {
    describe('[GET] /hobits', () => {
        it('responsts with 200 OK', async () => {
            const res = await request(server).get('/hobbits');
            expect(res.status).toBe(200);
        });
        it('responds with the correct number of hobbits', async () => {
            await db('hobbits').insert(frodo);
            let res = await request(server).get('/hobbits');
            expect(res.body).toHaveLength(1);
        });
    });
    describe('[POST] /hobbits', () => {
        it('responds with 201 created', async () => {
            const res = await request(server).post('/hobbits').send(frodo);
            expect(res.status).toBe(201);
        });
        it('responds with a newly created hobbit', async () => {
            const res = await request(server).post('/hobbits').send(frodo);
            expect(res.body).toMatchObject({ id: 1, ...frodo })
        });

    });
    describe('[DELETE] /hobbits/:id', () => {
        it('responds with 200 OK', async () => {
            await db('hobbits').insert(frodo);
            let res = await request(server).delete(`/hobbits/${1}`);
            expect(res.status).toBe(200);
        });
        it('returns the deleted hobbit', async () => {
            await db('hobbits').insert(frodo);
            let res = await request(server).delete(`/hobbits/${1}`);
            expect(res.body).toMatchObject({id: 1, ...frodo});
        });
    });
})