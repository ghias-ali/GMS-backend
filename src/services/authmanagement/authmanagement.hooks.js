const { authenticate } = require('@feathersjs/authentication').hooks;

let allHook = [];

function checkIfItIsResetPasswordThings(option) {
  console.log({option});
  switch (option.data.action) {
    case 'sendResetPwd':
      return true;
    case 'resetPwdLong':
      return true;
    case 'resetPwdShort':
      return true;
    default:
      return false
  }
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
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
