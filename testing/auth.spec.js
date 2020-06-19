
const request = require('supertest'); // calling it "request" is a common practice
const server = require('../api/server'); // this is our first red, file doesn't exist yet
const db = require('../database/dbConfig');



describe('auth-router.js', async() => {

  describe('Register', () => {
    it('should return 201 Created (registeration completed)', async() => {
        
        return request(server)
            .post('/api/auth/register')
            .send({ username: 'testing1', password: 'pass'})
            .then(res => {
                expect(res.status).toBe(201);
            })
    });

    it('should return the correct object', async () => {
        return request(server)
            .post('/api/auth/register')
            .send({ username: 'testing2', password: 'pass'})
            .then(res => {
                expect(res.body.data.username).toBe('testing2');
            })
    });

  });


  describe('Login', () => {
    it('should return 200 OK', () => {
        return request(server)
        .post('/api/auth/login')
        .send({ username: 'testing1', password: 'pass'})
        .then(res => {
            expect(res.status).toBe(200);
        })
    });

    it('should return a welcome message', async () => {
        return request(server)
            .post('/api/auth/login')
            .send({ username: 'testing2', password: 'pass'})
            .then(res => {
                expect(res.body.message).toBe('Welcome to our API');
            })
    });
   
  });
  
    await db('users').truncate();


});