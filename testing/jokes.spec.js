const request = require('supertest'); // calling it "request" is a common practice
const server = require('../api/server'); // this is our first red, file doesn't exist yet
const db = require('../database/dbConfig');
const Jokes = require('../jokes/jokes-model');
const jokesRouter = require('../jokes/jokes-router');


describe('jokes-router.js', () => {
    describe('getJokes', ()=>{
        it('returns 200 OK', async() =>{
            const register = await request(server)
                .post('/api/auth/register')
                .send({ username: 'test', password: 'pass' })
            
            const login = await request(server)
                .post('/api/auth/login')
                .send({ username: 'test', password: 'pass'})
           

            const jokes = await request(server)
                .get('/api/jokes')
                .set('Authorization', login.body.token)
                expect(jokes.status).toBe(200);
        })

        it('Cant reach without AUTH (so its supposed to give back a 404)', async()=>{
            const jokes = await request(server)
            .get('/api/jokes')
            
            expect(jokes.status).toBe(401);
        })
    })
    
})