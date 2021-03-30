const app = require('../../src/app');

describe('\'change-grid-status\' service', () => {
  it('registered the service', () => {
    const service = app.service('change-grid-status');
    expect(service).toBeTruthy();
  });
});
