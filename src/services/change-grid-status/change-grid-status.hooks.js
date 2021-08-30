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
          const status = { currentStatus: context.data.currentStatus };
          const res1 = await context.app.services.grids.get(
            context.data.gridId
          );
          console.log({ responsee: res1 });
          const res = await context.app.services.grids.patch(
            context.data.gridId,
            status
          );

          context.data.gridInfo = res1;
          // 60ca310c3af27b07d1a209f4 phase 6 s1
          // 612d1be73af27b07d1a20a0c phase 3 s2
          // 612d1bd43af27b07d1a20a0b phase 5 s3
          // 60ca3a493af27b07d1a209fb phase 4 s4
          let data = {};
          if (context.data.gridId === "60ca310c3af27b07d1a209f4") {
            data = {
              s1: context.data.currentStatus,
              s2: 7,
              s3: 7,
              s4: 7,
            };
          }
          if (context.data.gridId === "612d1be73af27b07d1a20a0c") {
            data = {
              s1: 7,
              s2: context.data.currentStatus,
              s3: 7,
              s4: 7,
            };
          }
          if (context.data.gridId === "612d1bd43af27b07d1a20a0b") {
            data = {
              s1: 7,
              s2: 7,
              s3: context.data.currentStatus,
              s4: 7,
            };
          }
          if (context.data.gridId === "60ca3a493af27b07d1a209fb") {
            data = {
              s1: 7,
              s2: 7,
              s3: 7,
              s4: context.data.currentStatus,
            };
          }

          await axios({
            method: "post",
            url: `https://o2re5hc0tg.execute-api.us-west-2.amazonaws.com/dev/publish-iot`,
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
          });
        } catch (err) {
          console.log(err);
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
