const { response } = require('express');

const EnterpriseSecurity = require('../Models/enterprice.security.model');
const Watchman = require('../Models/watchmans.model');
const UserModel = require('../Models/users.model');

const getEnterpriseSecurity = async (req, res = response) => {
    try {
        const enterpriseSecurity = await EnterpriseSecurity.findAll();

        res.json({
            enterpriseSecurity,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener empresas de seguridad',
        });
    }
}

const getEnterpriceNIT = async (req, res = response) => {
    try {
        const { NIT } = req.params;

        const enterprice = await EnterpriseSecurity.findOne({ where: { NIT: NIT } });

        if (enterprice) {
            return res.status(409).json({ message: 'Ya existe un usuario con este documento.' });
        }

        res.status(200).json({
            enterprice,
        });

    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({
            error: 'Error al obtener usuario',
        });
    }
}

const getEnterpriceEmail = async (req, res = response) => {

    try {
        const { email } = req.params;

        const enterprice = await EnterpriseSecurity.findOne({ where: { email: email } });

        if (enterprice) {
            return res.status(409).json({ message: 'Ya existe una empresa con este correo.' });
        }

        res.status(200).json({
            enterprice,
        });

    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({
            error: 'Error al obtener usuario',
        });
    }
}

const postEnterpriseSecurity = async (req, res) => {
    let message = '';
    const body = req.body;
    try {
        await EnterpriseSecurity.create(body);
        message = 'Empresa Registrada Exitosamente';
    } catch (e) {
        message = e.message;
    }


    const enterpriceSecurity = await EnterpriseSecurity.findAll();

    res.json({
        message,
        enterpriceSecurity,
    });
}


const putEnterpriseSecurity = async (req, res) => {
    const { idEnterpriseSecurity } = req.body;

    try {
        const enterpriseSecurity = await EnterpriseSecurity.findByPk(idEnterpriseSecurity);

        if (!enterpriseSecurity) {
            return res.status(404).json({
                error: 'No existe empresa de seguridad con ese id',
            });
        }

        await enterpriseSecurity.update(req.body);

        const watchmen = await Watchman.findAll({ where: { idEnterpriseSecurity } });


        for (const watchman of watchmen) {
            await watchman.update({ state: req.body.state });

            const user = await UserModel.findByPk(watchman.iduser);
            if (user) {
                await user.update({ status: req.body.state });
            }
        }


        res.json({
            message: 'Empresa actualizada correctamente',
            enterpriseSecurity,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al actualizar empresa de seguridad',
        });
    }
}
module.exports = {
    getEnterpriseSecurity,
    postEnterpriseSecurity,
    putEnterpriseSecurity,
    getEnterpriceEmail,
    getEnterpriceNIT
}