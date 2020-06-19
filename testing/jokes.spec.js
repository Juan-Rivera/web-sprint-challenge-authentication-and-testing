const request = require('supertest'); // calling it "request" is a common practice
const server = require('../api/server'); // this is our first red, file doesn't exist yet
const db = require('../database/dbConfig');
const Jokes = require('../jokes/jokes-model');
const axios = require('axios');


describe('jokes-router.js', () => {
    describe('getJokes', ()=>{
        it('returns 200 OK', async() =>{
            const register = await request(server)
                .post('/api/auth/register')
                .send({ username: 'test5', password: 'pass' })
            
            const login = await request(server)
                .post('/api/auth/login')
                .send({ username: 'test5', password: 'pass'})

            const getJokes = await request(server)
                .get('/api/joke')
                .set('Authorization', login.body.token)
                .then(res => {
                    expect(res.status).toBe(200);
                })
                await db('users').truncate();
        })

        // it('returns all jokes', async() =>{
        //     const register = await request(server)
        //     .post('/api/auth/register')
        //     .send({ username: 'test', password: 'pass' })
        
        //     const login = await request(server)
        //     .post('/api/auth/login')
        //     .send({ username: 'test', password: 'pass'})

        //     const getJokes = await request(server)
        //     .get('/api/joke')
        //     .set('Authorization', login.body.token)
        //     .then(res => {
        //         expect(res.body).toBe();
        //     })
        // })
    })
    
})