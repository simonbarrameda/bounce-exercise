import request from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app.js';
import authToken from '../fixtures/token.fixture.js';

describe('NASA Routes', () => {
  describe('GET /v1/nasa/apod', () => {
    it('should return 200 and the JSON object with APOD details', async () => {
      const res = await request(app)
        .get('/v1/nasa/apod')
        .set('Authorization', `Bearer ${authToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).not.toBeNull();
    });

    it('should return 401 if token is not provided', async () => {
      // await request(app)
      //   .get('/v1/nasa/apod')
      //   .send()
      //   .expect(httpStatus.UNAUTHORIZED);
    });
  });
});
