module.exports = function (app) {

    function getLink(type, hash) {
        console.log(process.env);
        const baseUrl = process.env === 'PRODUCTION' ? 'server.scminternational.org' : 'localhost:3030'
        const url =  baseUrl  +  '/' + type + '?token=' + hash
        return url
    }

    function sendEmail(email) {
        console.log(email);
        return app.service('mailer').create(email).then(function (result) {
            console.log('Sent email', result)
        }).catch(err => {
            console.log('Error sending email', err)
        })
    }

    return {
        notifier: function (type, user, notifierOptions) {
            console.log("notifier", type, user)
            let tokenLink
            let email
            switch (type) {
                case 'resendVerifySignup': //sending the user the verification email
                    tokenLink = getLink('verify', user.verifyToken)
                    console.log("email --->", process.env.FROM_EMAIL);
                    email = {
                        from: 'umair@scminternational.org',
                        to: user.email,
                        subject: 'Verify Signup',
                        html: `
                        ${tokenLink}
                        Please verify it's you!
                    `
                    }
                    return sendEmail(email);

                case 'verifySignup': // confirming verification
                    tokenLink = getLink('verify', user.verifyToken)
                    email = {
                        from: process.env.FROM_EMAIL,
                        to: user.email,
                        subject: 'Confirm Signup',
                        html: `
                            ${tokenLink}
                            Please verify it's you!
                        `
                    }
                    return sendEmail(email);

                case 'sendResetPwd':
                    tokenLink = getLink('reset', user.resetToken)
                    email = {
                        from: process.env.FROM_EMAIL,
                        to: user.email,
                        subject: 'Confirm Signup',
                        html: `
                        Please enter this token\n
                            ${user.resetToken}\n
                        `
                    }
                    return sendEmail(email)

                case 'resetPwd':
                    tokenLink = getLink('reset', user.resetToken);
                    email = {
                        from: 'umair@scminternational.org',
                        to: user.email,
                        subject: 'Confirm Signup',
                        html: `
                            ${tokenLink}
                            Please verify it's you!
                        `
                    };
                    return sendEmail(email);

                case 'passwordChange':
                    email = {}
                    return sendEmail(email)
                    break

                case 'identityChange':
                    tokenLink = getLink('verifyChanges', user.verifyToken)
                    email = {}
                    return sendEmail(email)
                    break

                default:
                    break
            }
        }
    };
};