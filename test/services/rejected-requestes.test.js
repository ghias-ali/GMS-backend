const app = require('../../src/app');

describe('\'rejectedRequestes\' service', () => {
  it('registered the service', () => {
    const service = app.service('rejected-requestes');
    expect(service).toBeTruthy();
  });
});
