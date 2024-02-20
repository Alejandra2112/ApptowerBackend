const { response } = require('express');
const { hotmailTransporter } = require('../Helpers/emailConfig');
const RecoveryCode = require('../Models/RecoveryCode.model');
const { Op } = require('sequelize');
const successRegistrationEmail = require('../Helpers/Mails');
const Mails = require('../Helpers/Mails');
const UserModel = require('../Models/users.model');


setInterval(async () => {
    const now = new Date();
    await RecoveryCode.destroy({
        where: {
            expiresAt: {
                [Op.lt]: now,
            },
        },
    });
}, 60 * 1000);


const postEmailUser = async (req, res = response) => {
    const { email } = req.body;

    const user = await UserModel.findOne({ where: { email: email } });


    if (!user) {
        return res.status(400).json({ message: 'El correo electrónico no está registrado' });
    }

    function generateSixDigitCode() {
        return Math.floor(Math.random() * 900000) + 100000;
    }

    const recoveryCode = generateSixDigitCode();


    const expirationDate = new Date(Date.now() + 5 * 60 * 1000);

    res.cookie('recoveryCode', recoveryCode, { maxAge: 60000 });


    try {
        const recovery = await RecoveryCode.create({
            code: recoveryCode,
            userEmail: email,
            expiresAt: expirationDate,
        });

        const mailOptions = Mails.recorvedPasswordEmail(recoveryCode, email);

        hotmailTransporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
                res.status(500).json({ message: 'Error al enviar el correo' });
            } else {
                console.log('Correo enviado:', info.response);
                res.json({ message: 'Correo con código de recuperación enviado' });
            }
        });

    } catch (error) {
        console.error('Error al guardar el código en la base de datos:', error);
        res.status(500).json({ message: 'Error al guardar el código en la base de datos' });
    }
};



const verifyCode = async (req, res = response) => {
    const { recoveryCode } = req.body;

    try {
        const code = String(recoveryCode);
        const recoveryRecord = await RecoveryCode.findOne({
            where: {
                code: code,
                expiresAt: {
                    [Op.gt]: new Date(),
                },
            },
        });

        if (recoveryRecord) {
            return res.json({ message: 'Código correcto' });
        } else {
            return res.status(400).json({ message: 'Código incorrecto o ha expirado' });
        }
    } catch (error) {
        console.error('Error al verificar el código en la base de dato:', error);
        return res.status(500).json({ message: 'Error al verificar el código en la base de datos' });
    }
};

module.exports = {
    postEmailUser,
    verifyCode
};
