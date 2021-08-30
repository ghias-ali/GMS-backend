const { authenticate } = require("@feathersjs/authentication").hooks;

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [
      (context) => {
        context.params.query =
          context.params.query.byUser === true
            ? (delete context.params.query.byUser,
              {
                ...context.params.query,
                "userInfo._id": context.params.user._id,
              })
            : { ...context.params.query };
      },
    ],
    get: [],
    create: [
      async (context) => {
        context.data.userInfo = context.params.user;
        await context.app.services.grids
          .get(context.data.gridId)
          .then((res) => {
            context.data.gridInfo = res;
          })
          .catch((err) => {});
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
