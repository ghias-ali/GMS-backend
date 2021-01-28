// Initializes the `acceptedRequestes` service on path `/accepted-requestes`
const { AcceptedRequestes } = require('./accepted-requestes.class');
const createModel = require('../../models/accepted-requestes.model');
const hooks = require('./accepted-requestes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/accepted-requestes', new AcceptedRequestes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('accepted-requestes');

  service.hooks(hooks);
};
