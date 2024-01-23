const { response } = require('express');
const TowerModel = require('../Models/tower.model');
const { body } = require('express-validator');
const { upload } = require('../Helpers/uploads.helpers');
const ApartmentModel = require('../Models/apartment.model');

const getOneTower = async (req, res = response) => {
    try {
        const { idTower } = req.params;


        const tower = await TowerModel.findOne({ where: { idTower: idTower } });

        if (!tower) {
            return res.status(404).json({ error: 'Torre no encontrada' });
        }

        res.json({
            tower,
        });
    } catch (error) {
        console.error('Error para obtener la torre', error);
        res.status(500).json({
            error: 'Error para obtener la torre.',
        });
    }
};

const getAllTower = async (req, res = response) => {
    try {
        const towers = await TowerModel.findAll();

        // Usar Promise.all para esperar a que todas las promesas se resuelvan
        const towersList = await Promise.all(towers.map(async (tower) => {
            const apartments = await ApartmentModel.findAll({
                where: { idTower: tower.idTower }
            });

            tower.dataValues.apartments = apartments.length;

            return tower;
        }));

        console.log(towersList);

        res.json({
            towers: towersList,
        });
    } catch (error) {
        // Manejar errores aquí
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const postTower = async (req, res) => {
    try {

        const { ...towerAtributes } = req.body;

        const imgUrl = await upload(req.files.towerImg, ['png', 'jpg', 'jpeg'], 'Images')

        const tower = await TowerModel.create({
            towerImg: imgUrl,
            ...towerAtributes
        })

        res.json({
            msg: 'Torre creada ',
            tower
        })


    } catch (e) {
        console.error('Error al crear la torre:', e);
        const message = e.message || 'Error al crear la torre.';
        res.status(500).json({ message });
    }
};

const putTower = async (req, res = response) => {
    try {


        const { idTower, ...towerAtributes } = req.body


        const [tower] = await TowerModel.update(towerAtributes, {
            where: { idTower: idTower },
        });

        if (tower > 0) {

            msg = 'Torre actualizada.';

        } else {

            msg = 'Torre no encontrada.';

        }

    } catch (error) {

        msg = 'Error modificando torre: ' + error.message;

    }
    res.json({

        msg: msg,

    });
};





module.exports = {

    getOneTower,
    getAllTower,
    postTower,
    putTower,

};
