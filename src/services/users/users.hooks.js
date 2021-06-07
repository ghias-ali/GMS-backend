const { authenticate } = require('@feathersjs/authentication').hooks;
const search = require('feathers-mongodb-fuzzy-search');
const verifyHooks = require('feathers-authentication-management').hooks;
const accountService = require('../authmanagement/notifier');
const commonHooks = require('feathers-hooks-common');

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), 
    // search(), // full text search on text indexes
    // search({  // regex search on given fields
    //   fields: ['name']
    // })
  ],
    get: [authenticate('jwt')],
    create: [hashPassword('password'), verifyHooks.addVerification(), 
    // (context) => {
    //   console.log({context});
    // }
    // // (context) => {
    // //         if (context.data && !context.data.hasOwnProperty('area')) {
    // //           context.data.area = "headquarter";
    // //         }
    // //       }
        ],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [
      commonHooks.iff(
        commonHooks.isProvider('external'),
        commonHooks.preventChanges(
          'email',
          'isVerified',
          'verifyToken',
          'verifyShortToken',
          'verifyExpires',
          'verifyChanges',
          'resetToken',
          'resetShortToken',
          'resetExpires'
        ),
        hashPassword('password'),
        authenticate('jwt')
      )
    ],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [
      // context => {
      //   accountService(context.app).notifier('resendVerifySignup', context.result);
      // },
      verifyHooks.removeVerification()
    ],
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
