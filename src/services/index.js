const users = require('./users/users.service.js')
const grids = require('./grids/grids.service.js');
const pendingRequestes = require('./pending-requestes/pending-requestes.service.js');
const acceptedRequestes = require('./accepted-requestes/accepted-requestes.service.js');
const rejectedRequestes = require('./rejected-requestes/rejected-requestes.service.js');

const mailer = require('./mailer/mailer.service.js');
const authmanagement = require('./authmanagement/authmanagement.service.js');
const changeGridStatus = require('./change-grid-status/change-grid-status.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(grids);
  app.configure(pendingRequestes);
  app.configure(acceptedRequestes);
  app.configure(rejectedRequestes);
  app.configure(mailer);
  app.configure(authmanagement);
  app.configure(changeGridStatus);
}
