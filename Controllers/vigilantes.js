const { response } = require('express');
const Vigilantes = require('../Models/vigilantes');


const getVigilantes = async (req, res = response) => {
    try {
      const vigilante = await Vigilantes.findAll();
      
      console.log('vigilantes obtenidos correctamente:', vigilante);
  
      res.json({
        vigilante,
      });
    } catch (error) {

      console.error('Error al obtener vigilantes:', error);
  
      res.status(500).json({
        error: 'Error al obtener vigilantes',
      });
    }  
};


const postVigilante = async (req, res) => {
  let mensaje = '';
  const body = req.query; 
  try {
    await Vigilantes.create(body); 
    mensaje = 'Vigilante Registrado Exitosamente';
  } catch (e) {
    mensaje = e.message;
  }
  res.json({
    vigilante: mensaje,
  });
};


const putVigilante = async (req, res = response) => {
  const body = req.query;
  let mensaje = '';

  try {
    const { idvigilante, ...actualizacion } = body;

    const [updatedRows] = await Vigilantes.update(actualizacion, {
      where: { idvigilante: idvigilante },
    });

    if (updatedRows > 0) {
      mensaje = 'Vigilante modificado exitosamente.';
    } else {
      mensaje = 'No se encontró un vigilante con ese ID';
    }
  } catch (error) {
    mensaje = 'Error al modificar vigilante: ' + error.message;
  }
  res.json({
    vigilante: mensaje,
  });
};


const deleteVigilante = async (req, res) => {
  const { idvigilante } = req.query;
  let mensaje = '';
  try {
    const rowsDeleted = await Vigilantes.destroy({ where: { idvigilante: idvigilante } });

    if (rowsDeleted > 0) {
      mensaje = 'Vigilante eliminado exitosamente';
    } else {
      res.status(404).json({ error: 'No se encontró un vigilante con ese ID' });
    }
  } catch (e) {
    res.status(500).json({ error: 'Error al eliminar vigilante', message: e.message });
  }
  res.json({
    vigilante: mensaje,
  });
};


module.exports = {
  getVigilantes,
  postVigilante,
  putVigilante,
  deleteVigilante,
};
