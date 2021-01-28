// Initializes the `grids` service on path `/grids`
const { Grids } = require('./grids.class');
const createModel = require('../../models/grids.model');
const hooks = require('./grids.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/grids', new Grids(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('grids');

  service.hooks(hooks);
};
