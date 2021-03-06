import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test endpoints Sucess', () => {
  describe('POST /images', () => {
    it('Respond with status 201', (done) => {
      request
        .post('/api/images')
        .query({ filename: 'santamonica', width: 600, height: 400 })
        .expect(201, done);
    });
  });

  describe('GET /images', () => {
    it('Respond with status 200', (done) => {
      request
        .get('/api/images')
        .query({ filename: 'santamonica', width: 600, height: 400 })
        .set('Accept', 'image/jpg')
        .expect(200, done);
    });
  });
});

describe('Test endpoints Error 404', () => {
  describe('POST /images', () => {
    it('Respond with status 404', (done) => {
      request
        .post('/api/images')
        .query({ filename: 'riodejaneiro', width: 600, height: 400 })
        .expect(404, done);
    });
  });

  describe('GET /images', () => {
    it('Respond with status 404', (done) => {
      request
        .get('/api/images')
        .query({ filename: 'riodejaneiro', width: 600, height: 400 })
        .set('Accept', 'image/jpg')
        .expect(404, done);
    });
  });
});

describe('Test endpoints Error 400', () => {
  describe('POST /images', () => {
    it('Respond with status 400', (done) => {
      request
        .post('/api/images')
        .query({ filename: 'santamonica', width: 'invalid', height: 400 })
        .expect(400, done);
    });
  });

  describe('GET /images', () => {
    it('Respond with status 400', (done) => {
      request
        .get('/api/images')
        .query({ filename: 'santamonica', width: 600, height: 'invalid' })
        .set('Accept', 'image/jpg')
        .expect(400, done);
    });
  });
});
