
const request = require('supertest'); // calling it "request" is a common practice
const server = require('../api/server'); // this is our first red, file doesn't exist yet
const db = require('../database/dbConfig');
const authRouter = require('../auth/auth-router');


describe('auth-router.js', () => {

  describe('Register', () => {
    it('should return 201 Created (registeration completed)', async() => {
        
         request(authRouter)
            .post('/register')
            .send({ username: 'testing1', password: 'pass'})
            .expect(200);
            
    });

    it('should return the correct object', async () => {
        request(authRouter)
            .post('/register')
            .send({ username: 'testing2', password: 'pass'})
            .expect('testing2');
            
    });

  });


  describe('Login', () => {
    it('should return 200 OK', () => {
        request(authRouter)
        .post('/login')
        .send({ username: 'testing1', password: 'pass'})
        .expect(200);
        
    });

    it('should return a welcome message', async () => {
        request(authRouter)
            .post('/login')
            .send({ username: 'testing2', password: 'pass'})
            .expect('Welcome to our API');
           
    });
   
  });
  
    



});