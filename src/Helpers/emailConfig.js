const nodemailer = require('nodemailer');

const hotmailTransporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'apptower@outlook.com',
        pass: process.env.passwordEmail
    }
});

module.exports = {
    hotmailTransporter,
};
