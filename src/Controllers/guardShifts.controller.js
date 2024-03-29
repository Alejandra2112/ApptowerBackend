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

  try {
    await Shifts.create(body);
    mensaje = 'Turno Registrado Exitosamente';
  } catch (e) {
    mensaje = e.message;
  }
  res.json({
    message: mensaje,
  });
};


const putShifts = async (req, res = response) => {
  const { idshifts } = req.params;
  const { body } = req;

  try {
    await Shifts.update(body, {
      where: {
        idshifts: idshifts,
      },
    });

    res.json({
      message: 'Turno actualizado correctamente',
    });
  } catch (error) {
    console.error('Error al actualizar:', error);
    res.status(500).json({
      error: 'Error al actualizar',
    });
  }
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
  getAllShifts,
  putShifts
}






