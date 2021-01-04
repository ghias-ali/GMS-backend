// Initializes the `/mailer` service on path `/mailer`
const hooks = require('./mailer.hooks');
const Mailer = require('feathers-mailer');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports = function (app) {
  app.use('/mailer', Mailer(smtpTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "FA17-BSCS-367@lgu.edu.pk",
      pass: "wsmever302"
    }
  })));
  
  const service = app.service('mailer');
  service.hooks(hooks);
};