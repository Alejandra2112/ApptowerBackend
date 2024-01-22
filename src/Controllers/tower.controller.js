const { response } = require('express');
const TowerModel = require('../Models/tower.model');
const { body } = require('express-validator');

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

        res.json({
            towers,
        });
    }

    catch (error) {
        console.error('Error al obtener las torres', error);
        res.status(500).json({
            error: 'Error al obtener las torres',
        });
    }

}

const postTower = async (req, res) => {
    try {

        const { ...towerAtributes } = req.body;

        const tower = await TowerModel.create({ ...towerAtributes })

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
