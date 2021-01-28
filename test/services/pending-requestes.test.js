const app = require('../../src/app');

describe('\'pendingRequestes\' service', () => {
  it('registered the service', () => {
    const service = app.service('pending-requestes');
    expect(service).toBeTruthy();
  });
});
