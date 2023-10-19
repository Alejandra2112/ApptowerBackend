const { response } = require('express');
const Turnos = require('../Models/turnosVigilantes');

const getTurnos = async (req, res = response) => {
  
    try {
      const turnos = await Turnos.findAll();

      console.log('Turnos obtenidos correctamente:', turnos);
  
      res.json({
        turnos,
      });
      
    } catch (error) {

      console.error('Error al obtener turnos:', error);
  
      res.status(500).json({
        error: 'Error al obtener turnos',
      });
    }  
};


const deleteTurnos = async (req, res = response) => {
    try {
      const fechaLimite = new Date();
      fechaLimite.setDate(fechaLimite.getDate() - 14); 
      
      await Turnos.destroy({
        where: {
          inicio: {
            [Op.lt]: fechaLimite,
          },
        },
      });

      console.log('Turnos antiguos eliminados correctamente');

      res.json({
        turnos: 'Turnos antiguos eliminados correctamente',
      });
    } catch (error) {
      console.error('Error al eliminar:', error);
      res.status(500).json({
        error: 'Error al eliminar ',
      });
    }
};

module.exports = {
    getTurnos, 
    deleteTurnos
}






