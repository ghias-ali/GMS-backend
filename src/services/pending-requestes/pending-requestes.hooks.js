const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [async (context) => {
      context.data.userInfo = context.params.user;
      await context.app.services.grids.get(context.data.gridId).then(res => {
        console.log({ res });
        context.data.gridInfo = res
      }).catch(err => {
      })
    }],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
