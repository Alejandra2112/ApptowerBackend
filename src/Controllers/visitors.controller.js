const { response } = require('express');
const Visitors = require('../Models/visitors.model');

const getVisitors = async (req, res = response) => {
    try {
      const visitors = await Visitors.findAll();

      console.log('visitantes obtenidos correctamente:', visitors);
  
      res.json({
        visitors,
      });
    } catch (error) {

      console.error('Error al obtener visitantes:', error);
  
      res.status(500).json({
        error: 'Error al obtener visitantes',
      });
    }  
};

const postVisitors = async (req, res) => {
    let message = '';
    const body = req.body; 
    try {
        await Visitors.create(body); 
        message = 'Visitante Registrado Exitosamente';
    } catch (e) {
        message = e.message;
    }
    res.json({
        visitors: message,
    });
};

const putVisitors = async (req, res = response) => {
    const body = req.body;
    let message = '';

    try {
        const { idVisitor, access } = body;

        const [updatedRows] = await Visitors.update({ access:access}, {
            where: { idVisitor: idVisitor },
        });

        if (updatedRows > 0) {
            message = 'Visitante modificado exitosamente.';
        } else {
            message = 'No se encontró un visitante con ese ID';
        }
    } catch (error) {
        message = 'Error al modificar visitante: ' + error.message;
    }
    res.json({
        visitors: message,
    });
};



module.exports={
    getVisitors,
    postVisitors,
    putVisitors,
}
