const { response } = require('express');
const OwnersModel = require('../Models/owners.model');
const { upload, updateFile } = require('../Helpers/uploads.helpers');
const ApartmentResidentModel = require('../Models/apartment.residents.model');
const ApartmentOwnerModel = require('../Models/apartment.owners.model');
const ResidentModel = require('../Models/resident.model');
const User = require('../Models/users.model');
const bcryptjs = require('bcryptjs')



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

        res.json({

            msg: "Aqui crearia un usuario si tuviera un rol."

        })

        // const imageUrl = await upload(req.files.pdf, ['pdf'], 'Documents')

        // const { idApartment, question, pdf, userBool, status, ...ownerAtributes } = req.body;


        // console.log(question)
        // console.log(idApartment)

        // // Create owner

        // const owner = await OwnersModel.create({
        //     pdf: imageUrl,
        //     status: 'Inactive',
        //     ...ownerAtributes
        // })

        // // Create owener per apartment


        // const apartmentOwner = await ApartmentOwnerModel.create({
        //     idApartment: idApartment,
        //     idOwner: owner.idOwner,
        //     ...ownerAtributes

        // });



        // console.log(question)

        // if (idApartment && question === "true") {

        //     // Create owner like resident too

        //     const resident = await ResidentModel.create({
        //         pdf: imageUrl,
        //         residentType: "owner",
        //         status: 'Inactive',
        //         ...ownerAtributes,
        //     });

        //     // Create resident per resident by owner

        //     const apartmentResident = await ApartmentResidentModel.create({
        //         idApartment: idApartment,
        //         idResident: resident.idResident,
        //         residentStartDate: ownerAtributes.OwnershipStartDate
        //     });

        //     console.log(userBool)

        //     let user;
        //     // Criptar contraseña 


        //     if (userBool === "true") {

        //         const salt = bcryptjs.genSaltSync();
        //         ownerAtributes.password = bcryptjs.hashSync(ownerAtributes.password, salt);

        //         user = await User.create({
        //             pdf: imageUrl,
        //             documentType: owner.docType,
        //             document: owner.docNumber,
        //             lastname: owner.lastName,
        //             phone: owner.phoneNumber,
        //             password: ownerAtributes.password,
        //             idrole: 2,
        //             ...ownerAtributes
        //         });
        //     }

        //     console.log(user)


        //     res.json({
        //         messageOwner: 'Propietario creado',
        //         owner,
        //         apartmentOwnerMessage: 'Propietario por residente creado',
        //         apartmentOwner,
        //         ApartmentResidenMenssage: "Residente creado",
        //         resident,
        //         ApartmentOwnerMenssage: " Propietario por apartamento creado",
        //         apartmentResident,
        //         userMenssage: "Nuevo usuario creado",
        //         user
        //     });


        // } else {
        //     res.json({
        //         messageOwner: 'Propietario creado',
        //         owner,

        //     });
        // }


    } catch (e) {
        console.error('Error creando propietario:', e);
        const message = e.message || 'Error creando propietario.';
        res.status(500).json({ message });
    }
};

const putOwner = async (req, res = response) => {

    try {

        res.json({

            msg: "Aqui editaria un porpietario si tuviera un rol."

        })
        // const owner = await OwnersModel.findByPk(req.body.idOwner);


        // if (!owner) {
        //     return res.status(400).json({ msg: "Id owner not found." });
        // }

        // const newPdf = await updateFile(req.files, owner.pdf, ['pdf'], 'Documents')
        // const { pdf, ...others } = req.body

        // const updatedSpace = await owner.update({
        //     pdf: newPdf,
        //     ...others
        // }, {
        //     where: { idOwner: req.body.idOwner }
        // });

        // res.json({
        //     spaces: 'Owner update',
        //     // updatedSpace: updatedSpace.toJSON()
        // });
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
