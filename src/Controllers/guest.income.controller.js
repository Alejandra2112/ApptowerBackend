const GuestIncome = require("../Models/guest.income.model");
const Visitors = require("../Models/visitors.model");
const ApartmentModel = require("../Models/apartment.model");
const { response } = require("express");
const GuestIncomeParking = require("../Models/guestIncomeParking.model");
const ParkingSpacesModel = require("../Models/parking.spaces.model");
const UserModel = require("../Models/users.model");
const Notification = require("../Models/notification.model");
const GuestIncomeToApartments = require("../Models/guest.income.to.apartments.model");
const ApartmentResidentModel = require("../Models/apartment.residents.model");
const ResidentModel = require("../Models/resident.model");

const getGuestIncomeAll = async (req, res = response) => {
  try {
    const guestIncome = await GuestIncome.findAll({
      include: [
        {
          model: Visitors,
          as: "asociatedVisitor",
        },
      ],
    });

    const guestIncomeApartment = await GuestIncomeToApartments.findAll({
      include: [
        {
          model: ApartmentModel,
          as: "asociatedApartment",
          attributes: ["apartmentName"],
        },
      ],
    });

    //Se le adiciona a cada respuesta el apartamento asociado a ese ingreso
    const guestIncomeWithApartment = guestIncome.map((income) => {
      const apartment = guestIncomeApartment.find(
        (apartment) => apartment.idGuest_income === income.idGuest_income
      );
      return { ...income.toJSON(), guestIncomeApartment: apartment };
    });

    console.log("ingresos obtenidos correctamente:", guestIncomeWithApartment);

    res.json({
      guestIncome: guestIncomeWithApartment,
    });
  } catch (error) {
    console.error("Error al obtener ingresos:", error);

    res.status(500).json({
      error: "Error al obtener ingresos",
      errormessage: error.message,
    });
  }
};

const getGuestIncomeOne = async (req, res = response) => {
  try {
    const { idGuest_income } = req.params;

    const parkingGuestIncome = await GuestIncomeParking.findOne({
      where: { idGuest_income: idGuest_income },
      include: [{ model: ParkingSpacesModel, as: "asociatedParkingSpace" }],
    });

    const guestIncome = await GuestIncome.findOne({
      where: { idGuest_income: idGuest_income },
      include: [
        { model: Visitors, as: "asociatedVisitor" },
        { model: ApartmentModel, as: "asociatedApartment" },
      ],
    });

    const guestIncomeVehicle = await GuestIncomeParking.findOne({
      where: { idGuest_income: idGuest_income },
      include: [
        { model: ParkingSpacesModel, as: "asociatedParkingSpace" }, // Adjusted alias
      ],
    });

    if (!guestIncome) {
      return res
        .status(404)
        .json({ error: "No se encontró un ingreso con ese ID" });
    }

    res.json({
      guestIncome,
      guestIncomeVehicle: guestIncomeVehicle ? guestIncomeVehicle : null,
    });
  } catch (error) {
    console.error("Error al obtener ingreso:", error);
    res.status(500).json({
      error: "Error al obtener ingreso",
      msg: error.message,
    });
  }
};

const getGuestIncomeByApartment = async (req, res = response) => {
  try {
    const { idApartment } = req.params;

    const guestIncomeToApartment = await GuestIncomeToApartments.findAll({
      where: { idApartment: idApartment },
      include: [
        {
          model: GuestIncome,
          as: "asociatedGuestIncome",
          where: { departureDate: null },
          include: [{ model: Visitors, as: "asociatedVisitor" }],
        },
        { model: ApartmentModel, as: "asociatedApartment" },
      ],
    });

    // const guestIncome = await GuestIncome.findAll({
    //   where: { idApartment: idApartment, departureDate: null },
    //   include: [
    //     { model: Visitors, as: "asociatedVisitor" },
    //     { model: ApartmentModel, as: "asociatedApartment" },
    //   ],
    // });

    if (guestIncomeToApartment.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron ingresos para ese apartamento" });
    }

    res.json({
      guestIncomeToApartment: guestIncomeToApartment,
    });
  } catch (error) {
    console.error("Error al obtener ingresos por apartamento:", error);
    res.status(500).json({
      error: "Error al obtener ingresos por apartamento",
    });
  }
};

const postGuestIncome = async (req, res) => {
  try {

    const { idApartment, idParkingSpace, isGuestIncomeVehicle, ...body } = req.body;

    let guestIncomeApartment;
    let guestIncomeParking;
    let createdGuestIncome;

    let parkingSpace;

    const visitor = await Visitors.findOne({
      where: { idVisitor: body.idVisitor },
    });

    if (!visitor) {
      return res.status(404).json({
        error: "No se encontró un visitante con ese ID",
      });
    }

    if (visitor.access == false) {
      return res.status(400).json({
        error: "El visitante no tiene acceso",
      });
    }

    const existincome = await GuestIncome.findOne({
      where: { idVisitor: body.idVisitor, departureDate: null },
    });

    if (existincome) {
      return res.status(400).json({
        error: "El visitante ya tiene un ingreso activo",
      });

    } else {
      createdGuestIncome = await GuestIncome.create(body);
    }

    if (idApartment) {
      guestIncomeApartment = await GuestIncomeToApartments.create({
        idGuest_income: createdGuestIncome.idGuest_income,
        idApartment: idApartment,
      });
    }

    if (isGuestIncomeVehicle && idParkingSpace) {
      guestIncomeParking = await GuestIncomeParking.create({
        idGuest_income: createdGuestIncome.idGuest_income,
        idParkingSpace: idParkingSpace,
      });

      parkingSpace = await ParkingSpacesModel.findOne({
        where: { idParkingSpace: idParkingSpace },
      });

      if (!parkingSpace) {
        return res
          .status(404)
          .json({ error: "No se encontró un espacio de parqueo con ese ID" });
      } else if (parkingSpace.status == "Inactive") {
        throw new Error("El espacio de parqueo se encuentra inactivo");
      } else {
        await ParkingSpacesModel.update(
          { status: "Inactive" },
          {
            where: { idParkingSpace: idParkingSpace },
          }
        );
      }
    }


    // Notification funtion

    const userLogged = await UserModel.findByPk(body.idUserLogged);

    let notification;

    // Buscar al visitante y al apartamento asociado
    const apartment = await ApartmentModel.findByPk(guestIncomeApartment.idApartment);

    const residents = await ApartmentResidentModel.findAll({
      where: { idApartment: apartment.idApartment },
      include: [
        {
          model: ResidentModel,
          as: 'resident',
          include: [
            {
              model: UserModel,
              as: 'user', 
            },
          ],
        },
      ],
    })

    console.log(residents, 'residents')

    let message = `
    Se registra el ingreso de ${visitor.name} ${visitor.lastname}
    ${apartment ? `al apartamento ${apartment.apartmentName}` : `al conjunto`}
    ${parkingSpace ? `ocupará el parqueadero 
    ${parkingSpace.parkingType == 'Public' ? 'publico' : 'privado'} ${parkingSpace.parkingName}` : ''}
    `

    if (body.idUserLogged && userLogged) {
      notification = await Notification.create({
        iduser: body.idUserLogged,
        type: 'success',
        content: {
          message: message,
          information: { userLogged, guest_income: createdGuestIncome, resident: residents }
        },
        datetime: new Date()
      });
    }


    res.json({
      guestIncome: createdGuestIncome,
      guestIncomeApartment: guestIncomeApartment,
      guestIncomeParking: guestIncomeParking,
      message: notification.content.message,
    });

    // const userLogged = await UserModel.findByPk(body.idUserLogged);

    // let notification;

    // Buscar al visitante y al apartamento asociado
    // const visitor = await Visitors.findByPk(createdGuestIncome.idVisitor);
    // const apartment = await ApartmentModel.findByPk(createdGuestIncome.idApartment);
  } catch (e) {
    console.error("Error al registrar ingreso:", e);
    res.status(500).json({
      error: e.message,
    });
  }
};

// const postGuestIncome = async (req, res) => {

//     try {

//         const body = req.body;

//         const createdGuestIncome = await GuestIncome.create(body);

//         const userLogged = await UserModel.findByPk(body.idUserLogged);

//         let notification;

//         // Buscar al visitante y al apartamento asociado
//         const visitor = await Visitors.findByPk(createdGuestIncome.idVisitor);
//         const apartment = await ApartmentModel.findByPk(createdGuestIncome.idApartment);

//         if (body.idUserLogged && userLogged) {
//             notification = await Notification.create({
//                 iduser: body.idUserLogged,
//                 type: 'success',
//                 content: {
//                     // Crear un mensaje de notificación con información del visitante y del apartamento
//                     message: `Se registró el ingreso de ${visitor.name} ${visitor.lastname}
//                     ${apartment ? `al apartamento ${apartment.apartmentName}` : ''} `,
//                     information: { userLogged, guest_income: createdGuestIncome }

//                 },
//                 datetime: new Date()
//             });
//         }
//         res.json({
//             guestIncome: createdGuestIncome,
//             message: notification.content.message,
//         });
//     } catch (e) {
//         res.status(500).json({
//             error: e.message
//         })

//     }

// };

const putGuestIncome = async (req, res = response) => {
  const body = req.body;
  let message = "";

  console.log(body, "Aqui el body");

  try {
    const { idGuest_income, departureDate } = body;

    // Verifica si el ingreso existe
    const verifyGuestIncome = await GuestIncome.findOne({
      where: { idGuest_income: idGuest_income },
    });
    // Si el ingreso no existe, se devuelve el error
    if (!verifyGuestIncome) {
      return res.status(404).json({
        error: "No se encontró un ingreso con ese ID",
      });
    }
    // Si el ingreso ya tiene fecha de salida registrada, se devuelve el error
    if (verifyGuestIncome.departureDate !== null) {
      return res.status(400).json({
        error: "El ingreso ya ha sido cerrado",
      });
    }
    // Se consulta si hay un ingreso con parqueadero asociado
    const guestIncomeparking = await GuestIncomeParking.findOne({
      where: { idGuest_income: idGuest_income },
    });
    // Si hay un ingreso con parqueadero asociado se busca el espacio de parqueo
    if (guestIncomeparking) {
      const parkingSpace = await ParkingSpacesModel.findOne({
        where: { idParkingSpace: guestIncomeparking.idParkingSpace },
      });
      // Si el espacio de parqueo no existe, se devuelve el error
      if (!parkingSpace) {
        return res
          .status(404)
          .json({ error: "No se encontró un espacio de parqueo con ese ID" });
      }
      // Si el espacio de parqueo existe, se actualiza el estado del espacio de parqueo
      if (parkingSpace) {
        await ParkingSpacesModel.update(
          { status: "Active" },
          {
            where: { idParkingSpace: guestIncomeparking.idParkingSpace },
          }
        );
      }
    }
    // Se actualiza el ingreso con la fecha de salida
    const [updatedRows] = await GuestIncome.update(
      {
        departureDate: departureDate,
      },
      {
        where: { idGuest_income: idGuest_income },
      }
    );

    if (updatedRows > 0) {
      message = "Ingreso modificado exitosamente.";
    } else {
      message = "No se encontró un ingreso con ese ID";
    }
  } catch (error) {
    message = "Error al modificar ingreso: " + error.message;
  }
  res.json({
    guestIncome: message,
  });
};

module.exports = {
  getGuestIncomeAll,
  getGuestIncomeOne,
  postGuestIncome,
  putGuestIncome,
  getGuestIncomeByApartment,
};
