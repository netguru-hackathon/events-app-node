const { BASE_API_URL } = require('../../../config/config');
const request = require('supertest')(BASE_API_URL);
const nock = require('nock');

const valid = {
  id: 1,
  name: 'asd',
};

nock(BASE_API_URL)
  .get(`events/${valid.id}`)
  .reply(200, {
    id: 1,
    name: 'xyz',
    description: 'xyz',
  });

describe('events controller', () => {
  describe('GET /events/:id', () => {
    it('responds with event if it exists', (done) => {
      request
      .get('events/1')
      .end((err, res) => {
        expect(res.status.to.equal(200));
        done();
      });
    });
  });
});
