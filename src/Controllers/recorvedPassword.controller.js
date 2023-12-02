const { response } = require('express');
const { hotmailTransporter } = require('../Helpers/emailConfig');
const RecoveryCode = require('../Models/RecoveryCode.model');

const postEmailUser = async (req, res = response) => {
    const { email } = req.body;

    function generateSixDigitCode() {
        return Math.floor(Math.random() * 900000) + 100000;
    }

    const recoveryCode = generateSixDigitCode();

    const expirationDate = new Date(Date.now() + 5 * 60 * 1000);

    res.cookie('recoveryCode', recoveryCode, { maxAge: 60000 });


    try {
        await RecoveryCode.create({
            code: recoveryCode,
            userEmail: email,
            expiresAt: expirationDate,
        });

        const mailOptions = {
            from: 'apptower@outlook.com',
            to: email,
            subject: 'Recuperación de contraseña',
            html: ` <html>
            <head>
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        background-color: #f9f9f9;
                        margin: 0;
                        padding: 0;
                        text-align: center;
                    }
                    .container {
                        max-width: 600px;
                        margin: 10px auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
                    }

                    a {
                        color: #007bff;
                        text-decoration: none;
                    }
                    h1 {
                        color: #007bff;
                        margin-bottom: 20px;
                    }
                    p {
                        line-height: 1.6;
                        margin-bottom: 20px;
                        color: #333;
                    }
                    .code {
                        font-size: 25px;
                        margin-bottom: 20px;
                        font-weight: bold;
                        color: #007bff;
                    }
                    .button {
                        display: inline-block;
                        padding: 15px 30px;
                        margin-bottom: 10px;
                        background-color: rgb(176, 196, 222);
                        color: #007bff;
                        text-decoration: none;
                        border-radius: 5px;
                        transition: background-color 0.3s ease;
                    }
                    .button:hover {
                        background-color: rgb(173, 216, 230);
                    }
                    .footer {
                        color: #777;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Recuperación de contraseña</h1>
                    <p>Hola,</p>
                    <p>Recibimos una solicitud para restablecer tu contraseña.</p>
                    <p>Tu código de recuperación es: <span class="code">${recoveryCode}</span></p>
                    <p>Utiliza este código para recuperar tu contraseña. Si no solicitaste esto, puedes ignorar este mensaje.</p>
                    <a class="button" href="https://tuaplicacion.com/recuperar-contrasena">Recuperar contraseña</a>
                    <p class="footer">Gracias por confiar en nosotros,<br />Equipo Apptower</p>
                </div>
            </body>
            </html>`,
        };

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
        const recoveryRecord = await RecoveryCode.findOne({
            where: {
                code: recoveryCode,
                expiresAt: {
                    [Op.gt]: new Date(),
                },
            },
        });

        if (recoveryRecord) {
            const expirationTime = new Date(recoveryRecord.expiresAt).getTime();
            const currentTime = new Date().getTime();
            const fiveMinutes = 5 * 60 * 1000;

            if (expirationTime - currentTime <= fiveMinutes) {
                return res.json({ message: 'Código correcto' });
            } else {
                return res.status(400).json({ message: 'Código correcto pero ha expirado' });
            }
        } else {
            return res.status(400).json({ message: 'Código incorrecto o ha expirado' });
        }
    } catch (error) {
        console.error('Error al verificar el código en la base de datos:', error);
        return res.status(500).json({ message: 'Error al verificar el código en la base de datos' });
    }
};

module.exports = {
    postEmailUser,
    verifyCode
};
