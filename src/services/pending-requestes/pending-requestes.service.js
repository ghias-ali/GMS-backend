// Initializes the `pendingRequestes` service on path `/pending-requestes`
const { PendingRequestes } = require('./pending-requestes.class');
const createModel = require('../../models/pending-requestes.model');
const hooks = require('./pending-requestes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/pending-requestes', new PendingRequestes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pending-requestes');

  service.hooks(hooks);
};
