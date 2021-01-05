const { authenticate } = require('@feathersjs/authentication').hooks

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword('password'), (context) => {
      if (context.data && !context.data.hasOwnProperty('area')) {
        context.data.area = "headquarter";
      }
    }],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [context => {
      // const filteredData = context.result.data.filter(d => {
      //   console.log({ d });
      //   // return d._id !== context.params.user._id
      // })
      // context.result = {
      //   ...context.result,
      //   data: filteredData
      // }
    }],
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
}
