const { response } = require('express');
const Watchman = require('../Models/watchman');


const getWatchman = async (req, res = response) => {
    try {
      const watchman = await Watchman.findAll();
      
      console.log('vigilantes obtenidos correctamente:', watchman);
  
      res.json({
        watchman,
      });
    } catch (error) {

      console.error('Error al obtener vigilantes:', error);
  
      res.status(500).json({
        error: 'Error al obtener vigilantes',
      });
    }  
};


const postWatchman = async (req, res) => {
  let message = '';
  const body = req.body; 
  console.log(req.body);
  try {
    await Watchman.create(body); 
    message = 'Vigilante Registrado Exitosamente';
  } catch (e) {
    message = e.message;
  }
  res.json({
    watchman: message,
  });
};


const putWatchman = async (req, res = response) => {
  const body = req.body;
  let message = '';

  try {
    const { idwatchman, ...update } = body;

    const [updatedRows] = await Watchman.update(update, {
      where: { idwatchman: idwatchman },
    });

    if (updatedRows > 0) {
      message = 'Vigilante modificado exitosamente.';
    } else {
      message = 'No se encontró un vigilante con ese ID';
    }
  } catch (error) {
    message = 'Error al modificar vigilante: ' + error.message;
  }
  res.json({
    watchman: message,
  });
};


const deleteWatchman = async (req, res) => {
  const { idwatchman } = req.body;
  let message = '';
  try {
    const rowsDeleted = await Watchman.destroy({ where: { idwatchman: idwatchman } });

    if (rowsDeleted > 0) {
      message = 'Vigilante eliminado exitosamente';
    } else {
      res.status(404).json({ error: 'No se encontró un vigilante con ese ID' });
    }
  } catch (e) {
    res.status(500).json({ error: 'Error al eliminar vigilante', message: e.message });
  }
  res.json({
    watchman: message,
  });
};


module.exports = {
  getWatchman,
  postWatchman,
  putWatchman,
  deleteWatchman,
};
