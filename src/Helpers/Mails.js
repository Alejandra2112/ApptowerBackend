module.exports = {

    payFineEmail: (name, lastName, email, fine) => {

        const incidentDate = new Date(fine?.incidentDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
        const paymentDate = new Date(fine?.paymentDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

        return {
            from: 'domuscomplex.solutions@gmail.com',
            to: email,
            subject: `Multa pagada exitosamente`,
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

                .left-align {
                    text-align: left;
                }
            
                .no-bullet {
                    list-style-type: none;
                    padding-left: 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <p>Estimado/a ${name} ${lastName},</p>
                <p>Nos complace informarle que su multa ha sido registrada como pagada en nuestros registros.
                 Queremos expresar nuestro agradecimiento por su pronta atención a este asunto.</p>
                
                <ul class="left-align no-bullet">
                    <li>Fecha del incidente: ${incidentDate}</li>
                    <li>Fecha limite de pago: ${paymentDate}</li>
                    <li>Estado: <a href="http://localhost:5173/#/admin/fines/details/${fine?.idFines}">${fine.state}</a></li>
                </ul>

                <p>Si tiene alguna pregunta o necesita asistencia, no dude en ponerse en contacto con administración.</p>
                <p class="footer">Gracias por confiar en nosotros,<br />Equipo Domus Complex</p>
                <img class="logo" src="https://res.cloudinary.com/ddptpzasb/image/upload/v1709731660/DomusLogo/jxqemopqnvnnrri02vgm.png" alt="Logo-Domus-Complex" border="0">
            </div>
        </body>
    </html>`
        }
    },

    proofFineEmail: (name, lastName, email, fine) => {

        const incidentDate = new Date(fine?.incidentDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
        const paymentDate = new Date(fine?.paymentDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

        return {
            from: 'domuscomplex.solutions@gmail.com',
            to: email,
            subject: `Confirmación de recepción del comprobante de pago para multa`,
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

                .left-align {
                    text-align: left;
                }
            
                .no-bullet {
                    list-style-type: none;
                    padding-left: 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
            
                <p>Estimado/a ${name} ${lastName},</p>
                <p>Confirmamos la recepción del <a href="${fine.paymentproof}">comprobante de pago</a> y queremos informarle que nuestro equipo administrativo 
                está en proceso de revisión.</br>Una vez que se haya verificado la validez del pago, procederemos
                 a marcar la multa como pagada en nuestros registros. Por favor, tenga en cuenta que este 
                 proceso puede tomar un tiempo breve.</br>
                 Le agradecemos su colaboración y paciencia mientras completamos esta revisión. Si tiene alguna pregunta adicional, no dude en comunicarse con nosotros.</p>
                 
                 <ul class="left-align no-bullet">
                    <li><a href="http://localhost:5173/#/admin/fines/details/${fine?.idFines}">Multa de referencia </a></li>
                    <li>Estado: ${fine.state}</li>
                </ul>
                 

                <p>Si tiene alguna pregunta o necesita asistencia, no dude en ponerse en contacto con administracion.</p>
                <p class="footer">Gracias por confiar en nosotros,<br />Equipo Domus Complex</p>
                <img class="logo" src="https://res.cloudinary.com/ddptpzasb/image/upload/v1709731660/DomusLogo/jxqemopqnvnnrri02vgm.png" alt="Logo-Domus-Complex" border="0">
            </div>
        </body>
    </html>`
        }
    },

    fineEmail: (name, lastName, email, fine, apartment) => {

        const incidentDate = new Date(fine?.incidentDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
        const paymentDate = new Date(fine?.paymentDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

        return {
            from: 'domuscomplex.solutions@gmail.com',
            to: email,
            subject: `Multa por ${fine?.fineType} el dia ${incidentDate}`,
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

                .left-align {
                    text-align: left;
                }
            
                .no-bullet {
                    list-style-type: none;
                    padding-left: 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
            
                <p>Estimado/a ${name} ${lastName},</p>
                <p>Le informamos que la administracion a inpuesto una multa a los residentes del 
                apartamento ${apartment.apartmentName} por motivo de ${fine?.fineType}. A continuación, se detallan los datos de la multa:</p>
                <ul class="left-align no-bullet">

                    <li>De: Administración</li>
                    <li>Para: <a href="http://localhost:5173/#/admin/apartments/details/${fine?.idApartment}">Inquilinos apartamento ${apartment.apartmentName}</a></li>
                    </br>
                    <li>Motivo: ${fine?.fineType} <p>${fine?.details}</p></li>
                    </br>
                    <li>Fecha de incidente: ${incidentDate}</li>
                    <li>Fecha limite de pago: ${paymentDate}</li>
                    </br>
                    <li>Monto: ${fine?.amount}</li>
                    </br>
                    <li>Estado de pago: ${fine?.state}</li>
                    </br>
                    <li>Evidencias de la multa:</li>
                    <ul>
                        ${fine?.evidenceFiles?.map((evidence, index) => `</br><li><a href="${evidence}">Evidencia N°${index + 1} </a></li>`).join('')}
                    </ul>
                    </br>
                    <li>Link para agregar comprobante de pago</li>
                    </br>
                    <li><a href="http://localhost:5173/#/admin/fines/details/${fine?.idFines}">Agregar comprobante de pago</a></li>

                </ul>
                <p>Por favor, asegúrese de revisar y resolver esta situación lo antes posible.</p>
                <p>Si tiene alguna pregunta o necesita asistencia, no dude en ponerse en contacto con administracion.</p>
                <p class="footer">Gracias por confiar en nosotros,<br />Equipo Domus Complex</p>
                <img class="logo" src="https://res.cloudinary.com/ddptpzasb/image/upload/v1709731660/DomusLogo/jxqemopqnvnnrri02vgm.png" alt="Logo-Domus-Complex" border="0">
            </div>
        </body>
    </html>`
        }
    },


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