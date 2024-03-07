const { response } = require('express');
const Visitors = require('../Models/visitors.model');

const getVisitorsAll = async (req, res = response) => {
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

const getVisitorsOne = async (req, res = response) => {
    try {
        const { idVisitor } = req.params;

        const visitors = await Visitors.findOne({ where: { idVisitor: idVisitor } });

        if (!visitors) {
            return res.status(404).json({ error: 'No se encontró un visitante con ese ID' });
        }

        res.json({
            visitors,
        });
    } catch (error) {
        console.error('Error al obtener visitante:', error);
        res.status(500).json({
            error: 'Error al obtener visitante',
        });
    }
}

const postVisitors = async (req, res) => {
    let message = '';
    const body = req.body;                                                     //| 1
    try {
        // Verificar si ya existe un visitante con el mismo número de cédula
        const existingVisitor = await Visitors.findOne({                       //| 2
            where: {
                documentNumber: body.documentNumber
            }
        });

        if (existingVisitor) {                                                 //| 3
            // Si ya existe, retornar un mensaje de error
            message = 'Ya existe un visitante con este número de cédula.';
            return res.status(400).json({
                message,
            });
        }

        // Si no existe, crear el nuevo visitante
        const visitorCreated = await Visitors.create(body);                    //| 4
        message = 'Visitante Registrado Exitosamente';
        res.json({
            visitor: visitorCreated,
            message,
        });
    } catch (e) {                                                              //| 5
        message = 'Error al registrar visitante: ' + e.message;
        res.status(500).json({
            message,
        });
    }
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
    getVisitorsAll,
    getVisitorsOne,
    postVisitors,
    putVisitors,
}
