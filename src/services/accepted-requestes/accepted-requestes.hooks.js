const { authenticate } = require('@feathersjs/authentication').hooks;
var AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [(context) => {
      context.data.acceptedBy = context.params.user;
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
