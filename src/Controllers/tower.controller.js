const { response } = require('express');
const TowerModel = require('../Models/tower.model');
const { body } = require('express-validator');
const { upload, updateFile } = require('../Helpers/uploads.helpers');
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

        console.log(req.files)

        const imgUrl = req.files !== null ? await upload(req.files.towerImg, ['png', 'jpg', 'jpeg'], 'Images') : null

        console.log(imgUrl)

        const tower = await TowerModel.create({
            towerImg: imgUrl,
            ...towerAtributes
        })

        res.json({
            message: `Se agrego ${towerAtributes.towerName}.`,
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
        const { idTower, ...newData } = req.body;

        console.log(req.files, "file")

        const tower = await TowerModel.findOne({ where: { idTower: idTower } });

        if (!tower) {
            return res.status(404).json({ msg: 'Torre no encontrada.' });
        }

        const newImg = tower.towerImg == "" && req.files ?
            await upload(req.files.towerImg, ['png', 'jpg', 'jpeg'], 'Images') :
            req.files ? await updateFile(req.files, tower.towerImg, ['png', 'jpg', 'jpeg'], 'Images', "towerImg"): ""
        

        const updatedTower = await tower.update({
            towerName: newData.towerName,
            towerImg: newImg == "" ? newData.towerImg : newImg,
            status: newData.status
        });

        res.json({
            message: `Se modificoel el bloque ${updatedTower.towerName}.`,
            tower: updatedTower
        });

    } catch (error) {
        console.error('Error al editar torre:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};






module.exports = {

    getOneTower,
    getAllTower,
    postTower,
    putTower,

};
