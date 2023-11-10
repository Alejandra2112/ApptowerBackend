const { response } = require('express');
const ResidentsModel = require('../Models/resident.model');
const ApartmentResidentModel = require('../Models/apartment.residents.model');
const ApartmentModel = require('../Models/apartment.model');

const getOneApartmentResidents = async (req, res = response) => {
    try {
        const { idApartment } = req.params;

        const apartmentResidents = await ApartmentModel.findAll({
            where: { idApartment: idApartment }
        });
        const residents = await ResidentsModel.findAll({
            attributes: ['idResident', 'residentType', 'docNumber', 'name', 'lastName', 'email', 'phoneNumber' ],
        });

        const data = apartmentResidents.map(sp => {
            const resident = residents.find(re => re.idResident === sp.idResident);

            return {
                ...sp.dataValues,
                resident 
            }
        });

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Id apartment not found.' });
        }

        res.json({
            spaceResidents: data,
        });
    } catch (error) {
        console.error('Error to get apartment residents.', error);
        res.status(500).json({
            error: 'Error to get apartment residents.',
        });
    }
};


const getAllApartmentResidents = async (req, res) => {

    try {
  
      const apartmentResidents = await Apart.findAll();
  
      const apartments = await SpaceModel.findAll({
        attributes: ['idApartment', 'apartmentName', 'area', 'status']

    });
  
      const residents = await ResidentsModel.findAll({
        attributes: ['idResident', 'residentType', 'docNumber', 'name', 'lastName', 'email', 'phoneNumber' ],

    });
      
    const data = apartmentResidents.map(sr => {
        
        const apartment = apartments.find(apartment => apartment.idSpace === sr.idApartment);
        const resident = residents.find(re => re.idResident === re.idResident);
    
        return {
           ...sr.dataValues,
           apartment,
           resident
        }
    })
  
      res.json({

        apartmentResidents: data

    });
  
    } catch (error) {
  
      console.error(error);
      res.status(500).json({ error: 'Error getting space owners' });
  
    }
  
  }



const postApartmentResident = async (req, res) => {


    let message = '';
    const body = req.body;

    console.log(body)
    
    try {

        await ApartmentResidentModel.create(body);
        message = 'Add resident to apartment.';

    } catch (e) {

        message = e.message;

    }
    res.json({

        apartmentResidents: message,

    });
};


const putApartmentResident = async (req, res = response) => {

    const body = req.body;
    let message = '';

    try {
        const { idApartmentResident, ...update } = body;

        const [updatedRows] = await ApartmentResidentModel.update(update, {
            where: { idApartmentResident: idApartmentResident },
        });

        if (updatedRows > 0) {

            message = 'Aparment resident update ok';

        } else {

            message = 'Id apartment resident is not found';

        }

    } catch (error) {

        message = 'Error update apartment: ' + error.message;

    }
    res.json({

        apartmentResidents: message,

    });
};


const deleteApartmentResident = async (req, res) => {

    const { idApartmentResident } = req.body;
    let message = '';

    try {

        const rowsDeleted = await ApartmentResidentModel.destroy({ where: { idApartmentResident: idApartmentResident } });

        if (rowsDeleted > 0) {

            message = 'Apartment resident dalete ok';

        } else {

            res.status(404).json({ error: 'Id apartment resident not found' });

        }
    } catch (e) {

        res.status(500).json({ error: 'Error delete apartment resident', message: e.message });

    }
    res.json({

        spaceResidents: message,

    });
};


module.exports = {
    getOneApartmentResidents,
    getAllApartmentResidents,
    postApartmentResident,
    putApartmentResident,
    deleteApartmentResident,
};
