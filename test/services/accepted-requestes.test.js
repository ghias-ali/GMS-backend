const app = require('../../src/app');

describe('\'acceptedRequestes\' service', () => {
  it('registered the service', () => {
    const service = app.service('accepted-requestes');
    expect(service).toBeTruthy();
  });
});
