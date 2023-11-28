const { response } = require('express');
const ApartmentOwnerModel = require('../Models/apartment.owners.model');
const OwnersModel = require('../Models/owners.model');
const ApartmentModel = require('../Models/apartment.model');

const getOneApartmentOwners = async (req, res = response) => {
    try {
        const { idApartment } = req.params;

        const apartmentOwners = await ApartmentOwnerModel.findAll({
            where: { idApartment: idApartment },
        });

        
        const apartments = await ApartmentModel.findAll({
            attributes: ['idApartment', 'apartmentName', 'area', 'status']

        });

        const owners = await OwnersModel.findAll({
            attributes: ['idOwner', 'docType', 'docNumber', 'name', 'lastName', 'email', 'phoneNumber', "status"],

        });

        const data = apartmentOwners.map(ao => {

            const apartment = apartments.find(apartment => apartment.idApartment === ao.idApartment);
            const owner = owners.find(ow => ow.idOwner === ao.idOwner);

            return {
                ...ao.dataValues,
                apartment,
                owner
            }
        })

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Id apartment not found.' });
        }

        res.json({
            apartmentOwners: data,
        });
    } catch (error) {
        console.error('Error to get apartment.', error);
        res.status(500).json({
            error: 'Error to get apartment.',
        });
    }
};


const getAllApartmentOwners = async (req, res) => {

    try {

        const apartmentOwners = await ApartmentOwnerModel.findAll();

        const apartments = await ApartmentModel.findAll({
            attributes: ['idApartment', 'apartmentName', 'area', 'status']

        });

        const owners = await OwnersModel.findAll({
            attributes: ['idOwner', 'docType', 'docNumber', 'name', 'lastName', 'email', 'phoneNumber', 'status'],

        });

        const data = apartmentOwners.map(ao => {

            const apartment = apartments.find(apartment => apartment.idSpace === ao.idApartment);
            const owner = owners.find(ow => ow.idOwner === ao.idOwner);
            
            return {
                ...ao.dataValues,
                apartment,
                owner
            }
        })

        res.json({

            spaceOwners: data

        });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Error getting space owners' });

    }

}


const postApartmentOwner = async (req, res) => {


    let message = '';
    const body = req.body;

    console.log(body)

    try {

        await ApartmentOwnerModel.create(body);
        message = 'Apartment owner create';

    } catch (e) {

        message = e.message;

    }
    res.json({

        apartmentOwners: message,

    });
};


const putApartmentOwner = async (req, res = response) => {

    const body = req.body;
    let message = '';

    try {

        const { idApartmentOwner, ...update } = body;

        const [updatedRows] = await ApartmentOwnerModel.update(update, {

            where: { idSpaceOwner: idSpaceOwner },

        });

        if (updatedRows > 0) {

            message = 'Apartment owner assigned to space ok.';

        } else {

            message = 'Id apartment owner not found';

        }

    } catch (error) {

        message = 'Error update space owner' + error.message;

    }
    res.json({

        apartmentOwners: message,

    });
};


const deleteApartmentOwner = async (req, res) => {

    const { idApartmentOwner } = req.body;
    let message = '';

    try {

        const rowsDeleted = await ApartmentOwnerModel.destroy({ where: { idApartmentOwner: idApartmentOwner } });

        if (rowsDeleted > 0) {

            message = 'Apartment owner delete ok.';

        } else {

            res.status(404).json({ error: 'Id apartment owner not found.' });

        }

    } catch (e) {

        res.status(500).json({ error: 'Error delete apartment owner.', message: e.message });
    }

    res.json({

        apartmentOwners: message,

    });
};


module.exports = {
    getOneApartmentOwners,
    getAllApartmentOwners,
    postApartmentOwner,
    putApartmentOwner,
    deleteApartmentOwner,
};
