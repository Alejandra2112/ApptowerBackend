const { check } = require("express-validator");
const ParkingSpacesModel = require("../Models/parking.spaces.model");
const AssignedParking = require("../Models/assigned.parking.model");

const parkingValidationForPost = [
  check("floor")
    .notEmpty()
    .withMessage("El nombre del piso obligatorio.")
    .matches(/^[0-9A-Z]+$/)
    .withMessage("El nombre del piso solo puede contener números y letras.")
    .custom(async (value, { req }) => {
      const existingParking = await ParkingSpacesModel.findAll();
      const parkingNames = existingParking.map((parking) =>
        parking.parkingName.substring(0, parking.parkingName.length - 2)
      );

      console.log(parkingNames, "spaceNames");

      if (parkingNames.includes(value)) {
        throw new Error(
          `El piso ${value} ya tiene los parqueaderos registrados.`
        );
      }

      return true;
    }),

  check("parkingPerFloor")
    .notEmpty()
    .withMessage("Numero de parqueaderos por piso es obligatorio.")
    .isInt({ min: 1 })
    .withMessage(
      "El número de plazas de aparcamiento por piso debe ser un número entero positivo."
    )
    .toInt(),

  check("parkingType")
    .notEmpty()
    .withMessage("El tipo de parqueadero es obligatorio.")
    .isIn(["Private", "Public"])
    .withMessage("El tipo de espacio de estacionamiento no es válido."),
];

const parkingValidationForPut = [
  check('idParkingSpace')
    .custom(async (value, { req }) => {
      try {
        console.log(value, 'idOwner');

        const assignedParking = await AssignedParking.findAll({ where: { idParkingSpace: value } });
        const parking = await ParkingSpacesModel.findByPk(value);

        // const resident = await ResidentModel.findOne({ where: { iduser: owner.iduser } });;
        // let apartmentResident;

        // if (resident ) {

        //     apartmentResident = await ApartmentResidentModel.findAll({ where: { idResident: resident.idResident, status: 'Active' } });
        //     if (apartmentResident && apartmentResident.length > 0) {
        //         throw new Error('El residente tiene residencia activas.');
        //     }
        // }

        if (assignedParking && assignedParking.length > 0 || req.status == 'Inactive') {
          throw new Error('El parqueadero esta asignado a un apartamento.');
        }

        return true;
      } catch (error) {
        console.error('Error en la validación:', error.message);
        throw error; // Re-lanzamos el error para que sea capturado por el manejo de errores del validador
      }
    }),
  check("parkingName")
    .optional()
    .isLength({ min: 4 })
    .withMessage(
      "El nombre del espacio de estacionamiento debe tener al menos 3 caracteres."
    )
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage(
      "El nombre del espacio de estacionamiento solo debe contener letras y números."
    )
    .custom(async (value, { req }) => {
      const body = req.body;

      const existingParkingById = await ParkingSpacesModel.findOne({
        where: { idParkingSpace: body.idParkingSpace },
      });
      const existingParkingByName = await ParkingSpacesModel.findOne({
        where: { parkingName: value },
      });

      if (!existingParkingById || !existingParkingByName) {
        return true; // Permitir el registro
      } else if (
        existingParkingById.parkingName !== existingParkingByName.parkingName
      ) {
        throw new Error(`Nombre del parqueadero "${value}" ya está en uso.`);
      } else {
        return true;
      }
    }),

  check("parkingType")
    .optional()
    .isIn(["Private", "Public"])
    .withMessage("El tipo de espacio de estacionamiento no es válido."),

  check("status")
    .isIn(["Active", "Inactive"])
    .withMessage("El estado del espacio de estacionamiento no es válido.")


];

module.exports = {
  parkingValidationForPost,
  parkingValidationForPut,
};
