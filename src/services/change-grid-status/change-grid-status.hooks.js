const { authenticate } = require("@feathersjs/authentication").hooks;
const axios = require("axios");

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [
      async (context) => {
        try {
          context.data.userInfo = context.params.user;
          const res = await context.app.services.grids.get(context.data.gridId);
          context.data.gridInfo = res;
          const data = {
            currentStatus: context.data.currentStatus,
            gridId: context.data.gridInfo._id,
            user: context.data.userInfo,
            accessToken: context.params.headers.authorization,
          };
          await axios({
            method: "post",
            url: `https://o2re5hc0tg.execute-api.us-west-2.amazonaws.com/dev/toggle-iot`,
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
          });
        } catch (err) {
          throw err;
        }
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
