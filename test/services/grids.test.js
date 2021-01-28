const app = require('../../src/app');

describe('\'grids\' service', () => {
  it('registered the service', () => {
    const service = app.service('grids');
    expect(service).toBeTruthy();
  });
});
