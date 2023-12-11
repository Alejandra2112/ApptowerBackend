const { response } = require('express');
const Watchman = require('../Models/watchmans.model');
const User = require('../Models/users.model');

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

const getWatchmanOne = async (req, res = response) => {
  try {
    const { idwatchman } = req.params;

    const watchman = await Watchman.findOne({ where: { idwatchman: idwatchman } });
    console.log('Vigilante obtenido correctamente:', watchman);

    if (!watchman) {
      return res.status(404).json({ error: 'No se encontró un vigilante con ese ID' });
    }

    res.json({
      watchman,
    });
  } catch (error) {
    console.error('Error al obtener vigilante:', error);
    res.status(500).json({
      error: 'Error al obtener vigilante',
    });
  }
};

const getWatchmanDocument = async (req, res = response) => {
  try {
    const document = req.params.document;

    const watchman = await Watchman.findOne({ where: { document: document } });
    console.log('Vigilante obtenido correctamente:', watchman);

    if (!watchman) {
      return res.status(404).json({ error: 'No se encontró un vigilante con ese documento' });
    }

    res.json({
      watchman,
    });
  } catch (error) {
    console.error('Error al obtener vigilante:', error);
    res.status(500).json({
      error: 'Error al obtener vigilante',
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

    const existingWatchman = await Watchman.findByPk(idwatchman);

    if (!existingWatchman) {
      message = 'No se encontró un vigilante con ese ID';
    } else {
      const [updatedRows] = await Watchman.update(update, {
        where: { idwatchman: idwatchman },
        force: true
      });

      if (updatedRows > 0) {
        await existingWatchman.reload();

        const existingUser = await User.findOne({ where: { document: existingWatchman.document } });
        console.log(existingUser);

        if (existingUser) {
          await existingUser.update({
            name: existingWatchman.namewatchman,
            lastname: existingWatchman.lastnamewatchman,
            documentType: existingWatchman.documentType,
            phone: existingWatchman.phone,
            email: existingWatchman.email,
            state: existingWatchman.state,
            document: existingWatchman.document,
          });
        }

        message = 'Vigilante modificado exitosamente.';
      } else {
        message = 'No se encontró un vigilante con ese ID';
      }
    }
  } catch (error) {
    message = 'Error al modificar vigilante: ' + error.message;
  }
  res.json({
    watchman: message,
  });
};



// const deleteWatchman = async (req, res) => {
//   const { idwatchman } = req.body;
//   let message = '';
//   try {
//     const rowsDeleted = await Watchman.destroy({ where: { idwatchman: idwatchman }, });

//     if (rowsDeleted > 0) {
//       message = 'Vigilante eliminado exitosamente';
//     } else {
//       res.status(404).json({ error: 'No se encontró un vigilante con ese ID' });
//     }
//   } catch (e) {
//     res.status(500).json({ error: 'Error al eliminar vigilante', message: e.message });
//   }
//   res.json({
//     watchman: message,
//   });
// };


module.exports = {
  getWatchman,
  postWatchman,
  putWatchman,
  getWatchmanOne,
  getWatchmanDocument
};
