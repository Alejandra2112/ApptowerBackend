const { response } = require('express');
const Shifts = require('../Models/guardShifts.model');
const moment = require('moment-timezone');


const getAllShifts = async (req, res = response) => {
  try {
    const shifts = await Shifts.findAll();
    console.log('Turnos obtenidos correctamente:', shifts);
    res.json({
      shifts,
    });
  } catch (error) {
    console.error('Error al obtener turnos:', error);
    res.status(500).json({
      error: 'Error al obtener turnos',
    });
  }
}


const getShifts = async (req, res = response) => {
  const { idwatchman } = req.params;

  try {
    const shifts = await Shifts.findAll({
      where: {
        idwatchman: idwatchman
      }
    });

    console.log('Turnos obtenidos correctamente:', shifts);

    res.json({
      shifts,
    });

  } catch (error) {

    console.error('Error al obtener turnos:', error);

    res.status(500).json({
      error: 'Error al obtener turnos',
    });
  }
};

const postShifts = async (req, res) => {
  let mensaje = '';
  const body = req.body;

  const start = moment.utc(body.start).tz('America/Bogota');
  body.start = start.format('YYYY-MM-DD HH:mm:ss');


  if (body.end) {
    const end = moment.utc(body.end).tz('America/Bogota');
    body.end = end.format('YYYY-MM-DD HH:mm:ss');
  }

  try {

    const existingShift = await Shifts.findOne({ where: { idwatchman: body.idwatchman, end: null } });
    if (existingShift) {
      await existingShift.update(body);
      mensaje = 'Turno Actualizado Exitosamente';
    } else {
      await Shifts.create(body);
      mensaje = 'Turno Registrado Exitosamente';
    }
  } catch (e) {
    mensaje = e.message;
  }
  res.json({
    shifts: mensaje,
  });
};


const deleteShifts = async (req, res = response) => {
  try {
    const Deadline = new Date();
    Deadline.setDate(Deadline.getDate() - 14);

    await Shifts.destroy({
      where: {
        start: {
          [Op.lt]: Deadline,
        },
      },
    });

    console.log('turnos antiguos eliminados correctamente');

    res.json({
      shifts: 'turnos antiguos eliminados correctamente',
    });
  } catch (error) {
    console.error('Error al eliminar:', error);
    res.status(500).json({
      error: 'Error al eliminar ',
    });
  }
};

module.exports = {
  getShifts,
  deleteShifts,
  postShifts,
  getAllShifts
}






