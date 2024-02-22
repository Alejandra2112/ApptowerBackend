const nodemailer = require('nodemailer');

const GmailTransporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'domuscomplex.solutions@gmail.com',
        pass: process.env.passwordEmail || 'luyk rjbw llro nhxj'
    }
});

module.exports = {
    GmailTransporter,
};
