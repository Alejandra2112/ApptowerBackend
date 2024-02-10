module.exports = {
    registerSuccessEmail: (name, lastName, email) => {
        return {
            from: 'apptower@outlook.com',
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


    changedStatusEmail: (name, lastName, email) => {
        return {
            from: 'apptower@outlook.com',
            to: email,
            subject: 'Cuenta activada exitosamente',
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
                <h1>Confirmación de Activación de Cuenta</h1>
                <p>Estimado/a ${name} ${lastName},</p>
                <p>Nos complace informarle que su cuenta ha sido activada con éxito.</p>
                <p>A partir de este momento, tiene pleno acceso a nuestra plataforma y puede comenzar a disfrutar de todos los servicios que ofrecemos.</p>
                <p>Si tiene alguna pregunta o necesita asistencia, no dude en ponerse en contacto con nuestro equipo de soporte.</p>            
                <p class="footer">Gracias por confiar en nosotros,<br />Equipo Apptower</p>
            </div>
        </body>
        </html>`,
            from: 'apptower@outlook.com',
            to: email,
            subject: 'Cuenta activada exitosamente',
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
                <h1>Confirmación de Activación de Cuenta</h1>
                <p>Estimado/a ${name} ${lastName},</p>
                <p>Nos complace informarle que su cuenta ha sido activada con éxito.</p>
                <p>A partir de este momento, tiene pleno acceso a nuestra plataforma y puede comenzar a disfrutar de todos los servicios que ofrecemos.</p>
                <p>Si tiene alguna pregunta o necesita asistencia, no dude en ponerse en contacto con nuestro equipo de soporte.</p>            
                <p class="footer">Gracias por confiar en nosotros,<br />Equipo Apptower</p>
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