// Initializes the `change-grid-status` service on path `/change-grid-status`
const { ChangeGridStatus } = require('./change-grid-status.class');
const createModel = require('../../models/change-grid-status.model');
const hooks = require('./change-grid-status.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/change-grid-status', new ChangeGridStatus(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('change-grid-status');

  service.hooks(hooks);
};
