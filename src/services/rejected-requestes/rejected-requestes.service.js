// Initializes the `rejectedRequestes` service on path `/rejected-requestes`
const { RejectedRequestes } = require('./rejected-requestes.class');
const createModel = require('../../models/rejected-requestes.model');
const hooks = require('./rejected-requestes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/rejected-requestes', new RejectedRequestes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('rejected-requestes');

  service.hooks(hooks);
};
