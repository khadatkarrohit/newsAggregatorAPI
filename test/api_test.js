let app = require('../src/server'),
  chai = require('chai'),
  request = require('supertest');

describe('News Aggregator API Testing', function() {

  it('Login API', function(done) {
     request(app)
    .post('/login')
    .send({
      "email": "ravi@gmail.com",
      "password": "ravi123"
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    })
  });

  it('Register API', function(done) {
    request(app)
   .post('/register')
   .send({
    first_name: 'Test',
    last_name: 'Test',
    email: 'test@test.com',
    password: 'test123',
    mobile: '1231231234'
    })
   .set('Accept', 'application/json')
   .expect('Content-Type', /json/)
   .expect(201)
   .end(function(err, res) {
     if (err) return done(err);
     done();
   })
 });
  
});