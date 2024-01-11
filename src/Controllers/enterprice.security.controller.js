const { response } = require('express');

const EnterpriseSecurity = require('../Models/enterprice.security.model');

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

const postEnterpriseSecurity = async (req, res) => {
    let message = '';
    const body = req.body;
    try {
        await EnterpriseSecurity.create(body);
        message = 'Empresa Registrado Exitosamente';
    } catch (e) {
        message = e.message;
    }
    res.json({
        enterpriceSecurity: message,
    });
}


const putEnterpriseSecurity = async (req, res) => {
    const { idEnterpriseSecurity } = req.params;
    const body = req.body;

    try {
        const enterpriseSecurity = await EnterpriseSecurity.findByPk(idEnterpriseSecurity);

        if (!enterpriseSecurity) {
            return res.status(404).json({
                error: 'No existe empresa de seguridad con ese id',
            });
        }

        await enterpriseSecurity.update(body);

        res.json({
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
}