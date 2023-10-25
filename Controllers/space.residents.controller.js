const { response } = require('express');
const ResidentsModel = require('../Models/resident.model');
const SpaceResidentModel = require('../Models/space.residents.model');
const SpaceModel = require('../Models/spaces.model');


const getSpaceResidents = async (req, res) => {

    try {
  
      const spaceResidents = await SpaceResidentModel.findAll();
  
      const spaces = await SpaceModel.findAll({
        attributes: ['idSpace', 'spaceType', 'spaceName', 'status']

    });
  
      const residents = await ResidentsModel.findAll({
        attributes: ['idResident', 'residentType', 'docNumber', 'name', 'lastName', 'email', 'phoneNumber' ],

    });
      
    const data = spaceResidents.map(sr => {
        
        const space = spaces.find(space => space.idSpace === sr.idSpace);
        const resident = residents.find(re => re.idResident === re.idResident);
    
        return {
           ...so.dataValues,
           space,
           resident
        }
    })
  
      res.json({

        spaceResidents: data

    });
  
    } catch (error) {
  
      console.error(error);
      res.status(500).json({ error: 'Error getting space owners' });
  
    }
  
  }



const postSpaceResident = async (req, res) => {


    let message = '';
    const body = req.body;

    console.log(body)
    
    try {

        await ResidentsModel.create(body);
        message = 'Resident created';

    } catch (e) {

        message = e.message;

    }
    res.json({

        spaceResidents: message,

    });
};


const putSpaceResident = async (req, res = response) => {

    const body = req.body;
    let message = '';

    try {
        const { idSpaceResident, ...update } = body;

        const [updatedRows] = await SpaceResidentModel.update(update, {
            where: { idSpaceResident: idSpaceResident },
        });

        if (updatedRows > 0) {

            message = 'Space resident update ok';

        } else {

            message = 'Id space resident is not found';

        }

    } catch (error) {

        message = 'Error update owner: ' + error.message;

    }
    res.json({

        spaceResidents: message,

    });
};


const deleteSpaceResident = async (req, res) => {

    const { idSpaceResident } = req.body;
    let message = '';

    try {

        const rowsDeleted = await SpaceResidentModel.destroy({ where: { idSpaceResident: idSpaceResident } });

        if (rowsDeleted > 0) {

            message = 'Space resident dalete ok';

        } else {

            res.status(404).json({ error: 'Id space resident not found' });

        }
    } catch (e) {

        res.status(500).json({ error: 'Error delete space resident', message: e.message });

    }
    res.json({

        spaceResidents: message,

    });
};


module.exports = {
    getSpaceResidents,
    postSpaceResident,
    putSpaceResident,
    deleteSpaceResident,
};
