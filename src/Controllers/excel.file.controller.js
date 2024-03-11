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


const getExcelFile = async (req, res = response) => {
    try {

        // Logica de excel

        const users = await UserModel.findAll()

        const towers = await TowerModel.findAll()

        const apartments = await ApartmentModel.findAll()
        const apartmentOwners = await ApartmentOwnerModel.findAll()
        const apartmentResidents = await ApartmentResidentModel.findAll()
        const assignedParkingSpaces = await AssignedParking.findAll()

        const spaces = await SpacesModel.findAll()

        const owners = await OwnersModel.findAll()
        const residents = await ResidentModel.findAll()

        const parkingSpaces = await ParkingSpacesModel.findAll()


        const bookings = await Booking.findAll()

        const enterpriceSecurity = await Booking.findAll()
        const guardShiftters = await guardShifts.findAll()

        const fines = await Fines.findAll()
        const guestIncome = await Guest_income.findAll()
        const guestIncomeParking = await GuestIncomeParking.findAll()

        const notifications = await Notification.findAll()


        // Crear un nuevo libro de Excel
        const workbook = await XlsxPopulate.fromBlankAsync();

        // Función para agregar una hoja al libro y escribir los datos
        const addSheetWithData = async (sheetName, data) => {
            console.log(data, 'dataValues')
            const sheet = workbook.addSheet(sheetName);
            const columnHeaders = Object.keys(data[0].dataValues);
            columnHeaders.forEach((header, index) => {
                console.log(header, 'header')
                sheet.cell(1, index + 1).value(header);
            });
            data.forEach((row, rowIndex) => {
                console.log(row.dataValues, 'row')
                Object.values(row.dataValues).forEach((value, colIndex) => {
                    sheet.cell(rowIndex + 2, colIndex + 1).value(value);
                });
            });
        };

        // Agregar una hoja para cada modelo
        await addSheetWithData('Usuarios', users);

        await addSheetWithData('Bloques', towers);
        await addSheetWithData('Apartamentos', apartments);
        await addSheetWithData('Propietarios de Apartamentos', apartmentOwners);
        await addSheetWithData('Residentes de Apartamentos', apartmentResidents);
        await addSheetWithData('Espacios de Parqueo Asignados', assignedParkingSpaces);

        await addSheetWithData('Espacios', spaces);
        await addSheetWithData('Propietarios', owners);
        await addSheetWithData('Residentes', residents);
        await addSheetWithData('Parqueaderos', parkingSpaces);
        await addSheetWithData('Reservas', bookings);
        await addSheetWithData('Empresas de seguridad', enterpriceSecurity);

        await addSheetWithData('Turnos de Guardia', guardShiftters);
        await addSheetWithData('Multas', fines);
        await addSheetWithData('Ingresos de Invitados', guestIncome);
        await addSheetWithData('Ingresos de vehiculos', guestIncomeParking);
        await addSheetWithData('Notificaciones', notifications);


        // Asegúrate de hacer lo mismo para todos tus modelos

        // Guardar el libro como un archivo Excel
        const fileName = 'datos.xlsx';
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