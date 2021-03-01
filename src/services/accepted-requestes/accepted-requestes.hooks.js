const { authenticate } = require("@feathersjs/authentication").hooks;
var AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
});

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [
      (context) => {
        context.params.query =
          context.params.query.byUser === true
            ?( delete context.params.query.byUser, {
                ...context.params.query,
                "userInfo._id": `${context.params.user._id}`,
              } )
            : { ...context.params.query };
            console.log(context.params.query)
      },
    ],
    get: [],
    create: [
      (context) => {
        context.data.acceptedBy = context.params.user;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
