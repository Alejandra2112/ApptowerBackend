module.exports = {
    registerSuccessEmail: (name, lastName, email) => {
        return {
            from: 'domuscomplex.solutions@gmail.com',
            to: email,
            subject: 'Confirmación de registro exitoso',
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
                <h1>Registro Exitoso</h1>
                <p>Cordial Saludo Señor@ ${name} ${lastName}</p>
                <p>Su registro ha sido completado con éxito. Su cuenta está actualmente en proceso de activación por parte del administrador. Recibirá una notificación tan pronto como su cuenta esté lista para su uso.</p>
                <p>Si tiene alguna duda, por favor, comuníquese con el administrador.</p>
                <p class="footer">Gracias por confiar en nosotros,<br />Equipo Apptower</p>
            </div>
        </body>
        </html>`,
        }
    },


    changedStatusEmail: (name, lastName, email, username) => {
        return {
            from: 'domuscomplex.solutions@gmail.com',
            to: email,
            subject: 'Mensaje de bienvenida',
            html: ` <html>
        <head>
            <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                text-align: center;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
            }
                h1 {
                    color: #007bff;
                    margin-bottom: 20px;
                    font-size: 24px;
                }
                p {
                    line-height: 1.6;
                    margin-bottom: 20px;
                    color: #666;
                    font-size: 16px;
                    text-align: left;
                }
                .footer {
                    color: #777;
                    font-size: 14px;
                    text-align: center;
                    margin-top: 20px;
                }
                .logo {
                    margin-top: -110px;
                }
                img {
                    max-width: 100%;
                    height: auto;
                    margin-top: -110px;
                }
            </style>
        </head>
        <body>
        <div class="container">
            <h1>Bienvenido a Domus Complex</h1>
            <p>Estimado/a ${name} ${lastName},</p>
            <p>¡Nos complace darle la bienvenida a Domus Complex! Su cuenta ha sido creada con éxito y ahora tiene acceso a todas las funcionalidades de nuestra aplicación.</p>
            <p>Su usuario: ${username}</p>
            <p>Su contraseña temporal está compuesta por:</p>
            <li>La primera letra de su nombre en mayúscula.</li>
            <li>La primera letra de su apellido en minúscula.</li>
            <li>Su número de documento.</li>
            <li>Un carácter especial: *</li>

            <p>Ejemplo: Jp12345678*</p>
            
            <p>Recomendamos que cambie su contraseña por una personal y segura después de iniciar sesión por primera vez.</p>
            <p>Si tiene alguna pregunta o necesita asistencia, no dude en ponerse en contacto con nuestro equipo de soporte.</p>            
            <p class="footer">Gracias por confiar en nosotros,<br />Equipo Domus Complex</p>
            <img class="logo" src="https://res.cloudinary.com/ddptpzasb/image/upload/v1709731660/DomusLogo/jxqemopqnvnnrri02vgm.png" alt="Logo-Domus-Complex" border="0">
        </div>
    </body>
    </html>`
        }
    },


    recorvedPasswordEmail: (recoveryCode, email) => {
        return {
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
                    <p class="footer">Gracias por confiar en nosotros,<br />Equipo Apptower</p>
                </div>
            </body>
            </html>`,
        }
    },


}