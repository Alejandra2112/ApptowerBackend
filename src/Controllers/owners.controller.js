const { response } = require('express');
const OwnersModel = require('../Models/owners.model');
const { upload, updateFile } = require('../Helpers/uploads.helpers');
const ApartmentResidentModel = require('../Models/apartment.residents.model');
const ApartmentOwnerModel = require('../Models/apartment.owners.model');
const ResidentModel = require('../Models/resident.model');


const getOneOwner = async (req, res = response) => {
    try {
        const { idOwner } = req.params;

        const owner = await OwnersModel.findOne({ where: { idOwner: idOwner } });

        if (!owner) {
            return res.status(404).json({ error: 'Id owner not found.' });
        }

        res.json({
            owner,
        });
    } catch (error) {
        console.error('Error to get owner.', error);
        res.status(500).json({
            error: 'Error to get owner.',
        });
    }
};

const getAllOwners = async (req, res = response) => {
    try {

        const owners = await OwnersModel.findAll();

        console.log('Owner get ok', owners);

        res.json({

            owners,

        });

    } catch (error) {

        console.error('Error to get spaces', error);

        res.status(500).json({
            error: 'Error to get spaces 500',
        })
    };

}

const postOwner = async (req, res) => {


    try {

        const imageUrl = await upload(req.files.pdf, ['pdf'], 'Documents')

        const { idApartment,question, pdf, status, ...ownerAtributes } = req.body;

        
        console.log(question)
        console.log(idApartment)

        const owner = await OwnersModel.create({
            pdf: imageUrl,
            status: 'Inactive',
            ...ownerAtributes
        })

        const apartmentOwner = await ApartmentOwnerModel.create({
            idApartment: idApartment,
            idOwner: owner.idOwner,
            OwnershipStartDate: "2023-11-03",
            OwnershipEndDate: "2023-11-03"
        });

        if (idApartment && question) {

            const resident = await ResidentModel.create({
                pdf: imageUrl,
                residentType: "owner",
                status: 'Inactive',
                ...ownerAtributes,
            });

            const apartmentResident = await ApartmentResidentModel.create({
                idApartment: idApartment,
                idResident: resident.idResident,
                residentStartDate: apartmentOwner.OwnershipStartDate
            });
    

            res.json({
                messageOwner: 'Propietario creado',
                owner,
                apartmentOwnerMessage: 'Propietario por residente creado',
                apartmentOwner,
                ApartmentResidenMenssage: "Residente creado",
                resident,
                ApartmentOwnerMenssage: "Propietario creado",
                apartmentResident,
            });


        } else {
            res.json({
                messageOwner: 'Propietario creado',
                owner,
                
            });
        }


    } catch (e) {
        console.error('Error creating owner:', e);
        const message = e.message || 'Error creating owner.';
        res.status(500).json({ message });
    }
};

const putOwner = async (req, res = response) => {

    try {
        const owner = await OwnersModel.findByPk(req.body.idOwner);


        if (!owner) {
            return res.status(400).json({ msg: "Id owner not found." });
        }

        const newPdf = await updateFile(req.files, owner.pdf, ['pdf'], 'Documents')
        const { pdf, ...others } = req.body

        const updatedSpace = await owner.update({
            pdf: newPdf,
            ...others
        }, {
            where: { idOwner: req.body.idOwner }
        });

        res.json({
            spaces: 'Owner update',
            // updatedSpace: updatedSpace.toJSON()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};



// const deleteOwner = async (req, res) => {

//     const { idOwner } = req.body;
//     let message = '';

//     try {

//         const rowsDeleted = await OwnersModel.destroy({ where: { idOwner: idOwner } });

//         if (rowsDeleted > 0) {

//             message = 'Owner dalete ok';

//         } else {

//             res.status(404).json({ error: 'Id owner not found' });

//         }
//     } catch (e) {

//         res.status(500).json({ error: 'Error delete owner', message: e.message });

//     }
//     res.json({

//         owners: message,

//     });
// };


module.exports = {
    getOneOwner,
    getAllOwners,
    postOwner,
    putOwner,
    // deleteOwner,
};
