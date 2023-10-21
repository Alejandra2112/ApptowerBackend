const { response } = require('express');
const Residents = require('../Models/residents');


const getResidents = async (req, res = response) => {
    try {

      const residents = await Residents.findAll();

      // API answer
    
      res.json({

        residents,

      });
      
    } catch (error) {

      console.error('Error: Issue with residents', error);
  
      res.status(500).json({

        error: 'Error: to get residents',

      });

    }  
};


const postResidents = async (req, res) => {

  let message = '';
  const body = req.body; 

  try {
    await Residents.create(body);
    message = 'Residents create ok';
  } catch (e) {
    message = e.message;
  }

  res.json({

    Residents: message,

  });

};


// const putResidents = async (req, res = response) => {

//   const body = req.body;
//   let mensaje = '';

//   try {
//     const { idResidents, ...actualizacion } = body;

//     const [updatedRows] = await Residents.update(actualizacion, {
//       where: { idResidents: idResidents },
//     });

//     if (updatedRows > 0) {
//       mensaje = 'Residents modificado exitosamente.';
//     } else {
//       mensaje = 'No se encontró un Residents con ese ID';
//     }
//   } catch (error) {
//     mensaje = 'Error al modificar Residents: ' + error.message;
//   }
//   res.json({
//     Residents: mensaje,
//   });
// };


// const deleteResidents = async (req, res) => {
//   const { idResidents } = req.query;
//   let mensaje = '';
//   try {
//     const rowsDeleted = await Residents.destroy({ where: { idResidents: idResidents } });

//     if (rowsDeleted > 0) {
//       mensaje = 'Residents eliminado exitosamente';
//     } else {
//       res.status(404).json({ error: 'No se encontró un Residents con ese ID' });
//     }
//   } catch (e) {
//     res.status(500).json({ error: 'Error al eliminar Residents', message: e.message });
//   }
//   res.json({
//     Residents: mensaje,
//   });
// };


module.exports = {
  getResidents,
  postResidents,
//   putResidents,
//   deleteResidents,
};
