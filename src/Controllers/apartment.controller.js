const { response } = require('express');
const ApartmentModel = require('../Models/apartment.model');
const ApartmentResidentModel = require('../Models/apartment.residents.model');
const ResidentModel = require('../Models/resident.model');
const TowerModel = require('../Models/tower.model');
const Guest_income = require('../Models/guest.income.model');
const Vehicle = require('../Models/vehicle.model');
const Fines = require('../Models/fines.model');

const getOneApartment = async (req, res = response) => {
    try {
        const { idApartment } = req.params;

        const spartment = await ApartmentModel.findOne({ where: { idApartment: idApartment } });

        if (!spartment) {
            return res.status(404).json({ error: 'Id apartment not found.' });
        }

        res.json({
            spartment,
        });
    } catch (error) {
        console.error('Error to get apartment.', error);
        res.status(500).json({
            error: 'Error to get apartment.',
        });
    }
};


const getAllApartment = async (req, res = response) => {
    try {
        const list = [];

        const apartments = await ApartmentModel.findAll({

            include: [
                {
                    model: TowerModel,

                }
            ]
        });



        for (const apartment of apartments) {

            const residents = await ApartmentResidentModel.findAll({
                where: { idApartment: apartment.idApartment },
            });
            const guestIncomes = await Guest_income.findAll({
                where: { idApartment: apartment.idApartment },

            })

            const vehicles = await Vehicle.findAll({
                where: { idApartment: apartment.idApartment },

            })

            const fines = await Fines.findAll({
                where: { idApartment: apartment.idApartment },

            })

            apartment.dataValues.residentList = residents.map(resident => resident.toJSON());
            apartment.dataValues.residents = residents.length;

            apartment.dataValues.guestIncomes = guestIncomes.length;

            apartment.dataValues.vehicles = vehicles.length;

            apartment.dataValues.fines = fines.length;
            

            list.push(apartment);

        }

        res.json({
            apartments: list,
        });


    } catch (error) {
        console.error('Error al obtener los apartamentos', error);
        res.status(500).json({
            error: 'Error al obtener los apartamentos 500',
        });
    }
};





const postApartment = async (req, res) => {

    let message = '';
    let newAparments = 0;
    const body = req.body;

    const { idTower, rangeStart, rangeEnd, apartmentsFloor, ...others } = body

    // console.log("Apartments per floor: " + apartmentsFloor)
    // console.log("Floor number: " + floorNumber)

    let floors = rangeEnd - rangeStart + 1;


    try {

        for (let floor = 0; floor < floors; floor++) {

            console.log(newAparments)
            console.log(floor, "floor")


            for (let apartmentNumber = 1; apartmentNumber <= apartmentsFloor; apartmentNumber++) {
                newAparments++
                await ApartmentModel.create({

                    idTower: idTower,
                    apartmentName: (apartmentNumber < 10) ? `${rangeStart + floor}0${apartmentNumber}` : `${rangeStart + floor}${apartmentNumber}`,
                    ...others

                });

                console.log(`creado: ${newAparments}`)


            }

        }

        message = `Creaste ${newAparments} apartamentos.`;

    } catch (e) {
        message = e.message;
    }
    res.json({
        apartments: message,
        newAparments: newAparments
    });
};


const putApartment = async (req, res = response) => {

    const body = req.body;
    let message = '';

    try {
        const { idApartment, ...update } = body;

        const [updatedRows] = await ApartmentModel.update(update, {
            where: { idApartment: idApartment },
        });

        if (updatedRows > 0) {

            message = 'Apartment updated successfully.';

        } else {

            message = 'Id apartment not found';

        }

    } catch (error) {

        message = 'Error updating apartment: ' + error.message;

    }
    res.json({

        apartments: message,

    });
};




module.exports = {
    getOneApartment,
    getAllApartment,
    postApartment,
    putApartment,
    // deleteSpace,
};
