const ApartmentModel = require("../Models/apartment.model");
const ApartmentOwnerModel = require("../Models/apartment.owners.model");
const ApartmentResidentModel = require("../Models/apartment.residents.model");
const AssignedParking = require("../Models/assigned.parking.model");
const Booking = require("../Models/booking.model");
const Fines = require("../Models/fines.model");
const guardShifts = require("../Models/guardShifts.model");
const Guest_income = require("../Models/guest.income.model");
const GuestIncomeParking = require("../Models/guestIncomeParking.model");
const Notification = require("../Models/notification.model");
const OwnersModel = require("../Models/owners.model");
const ParkingSpacesModel = require("../Models/parking.spaces.model");
const ResidentModel = require("../Models/resident.model");
const SpacesModel = require("../Models/spaces.model");
const TowerModel = require("../Models/tower.model");
const fs = require('fs');

const XlsxPopulate = require('xlsx-populate');
const UserModel = require("../Models/users.model");
const Vehicle = require("../Models/vehicle.model");
const EnterpriseSecurity = require("../Models/enterprice.security.model");
const GuestIncomeToApartments = require("../Models/guest.income.to.apartments.model");
const Visitors = require("../Models/visitors.model");


const getExcelFile = async (req, res = response) => {
    try {

        const body = req.body


        console.log(body, 'excel body')

        const workbook = await XlsxPopulate.fromBlankAsync();

        const addSheetWithData = async (sheetName, data) => {
            if (data && data.length > 0) {
                const sheet = workbook.addSheet(sheetName);
                const columnHeaders = Object.keys(data[0].dataValues);
                columnHeaders.forEach((header, index) => {
                    sheet.cell(1, index + 1).value(header);
                });
                data.forEach((row, rowIndex) => {
                    Object.values(row.dataValues).forEach((value, colIndex) => {
                        sheet.cell(rowIndex + 2, colIndex + 1).value(value);
                    });
                });
            } else {
                console.log(`No se encontraron datos para la hoja "${sheetName}".`);
            }
        };

        // Logica de excel



        if (body.table == 'apartments') {

            const towers = await TowerModel.findAll()
            await addSheetWithData('Bloques', towers);

            const apartments = await ApartmentModel.findAll()
            await addSheetWithData('Apartamentos', apartments);

            const apartmentOwners = await ApartmentOwnerModel.findAll()
            await addSheetWithData('Propietarios de Apartamentos', apartmentOwners);

            const apartmentResidents = await ApartmentResidentModel.findAll()
            await addSheetWithData('Residentes de Apartamentos', apartmentResidents);

            const assignedParkingSpaces = await AssignedParking.findAll()
            await addSheetWithData('Espacios de Parqueo Asignados', assignedParkingSpaces);

            const vehicles = await Vehicle.findAll()
            await addSheetWithData('Vehiculos', vehicles);

        } else if (body.table == 'spaces') {

            const spaces = await SpacesModel.findAll()
            await addSheetWithData('Espacios', spaces);

        } else if (body.table == 'owners') {

            const owners = await OwnersModel.findAll()
            await addSheetWithData('Propietarios', owners);

        } else if (body.table == 'users') {

            const users = await UserModel.findAll()
            await addSheetWithData('Usuarios', users);


        } else if (body.table == 'residents') {

            const residents = await ResidentModel.findAll()
            await addSheetWithData('Residentes', residents);


        } else if (body.table == 'parkingSpaces') {

            const parkingSpaces = await ParkingSpacesModel.findAll()
            await addSheetWithData('Parqueaderos', parkingSpaces);


        } else if (body.table == 'bookings') {

            const bookings = await Booking.findAll()
            await addSheetWithData('Reservas', bookings);

        } else if (body.table == 'enterpriceSecurity' || body.table == 'guardShiftters') {

            const enterpriceSecurity = await EnterpriseSecurity.findAll()
            await addSheetWithData('Empresas de seguridad', enterpriceSecurity);

            const guardShiftters = await guardShifts.findAll()
            await addSheetWithData('Turnos de Guardia', guardShiftters);


        } else if (body.table == 'fines') {

            const fines = await Fines.findAll()
            await addSheetWithData('Multas', fines);


        } else if (body.table == 'visitors') {

            const visitors = await Visitors.findAll()
            await addSheetWithData('Visitantes', visitors);


        } else if (body.table == 'guestIncome' || body.table == 'guestIncomesToApartments' || body.table == 'guestIncomeParking') {

            const guestIncome = await Guest_income.findAll()
            await addSheetWithData('Ingresos de Invitados', guestIncome);

            const guestIncomesToApartments = await GuestIncomeToApartments.findAll()
            await addSheetWithData('Ingresos a apartamentos', guestIncomesToApartments);

            const guestIncomeParking = await GuestIncomeParking.findAll()
            await addSheetWithData('Ingresos de vehiculos', guestIncomeParking);


        } else {








            const notifications = await Notification.findAll()
            await addSheetWithData('Notificaciones', notifications);
        }





        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const fileName = `${year}-${month}-${day}.xlsx`;
        await workbook.toFileAsync(fileName);

        res.download(fileName, () => {
            fs.unlinkSync(fileName);
        });


    } catch (error) {
        console.error('Error al generar excel:', error);
        res.status(500).json({
            error: error.message,
        });
    }
};

module.exports = {
    getExcelFile,

};