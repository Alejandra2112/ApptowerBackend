const { response } = require('express');
const Shifts = require('../Models/guardShifts');

const getShifts = async (req, res = response) => {
  
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
    shifts: mensaje,
  });
};

const deleteShifts = async (req, res = response) => {
    try {
      const Deadline = new Date();
      Deadline.setDate(Deadline.getDate() - 14); 
      
      await Shifts.destroy({
        where: {
          star: {
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
    postShifts
}






