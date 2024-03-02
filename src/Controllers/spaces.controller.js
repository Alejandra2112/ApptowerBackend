const { response } = require('express');
const SpacesModel = require('../Models/spaces.model');
const { upload, updateFile } = require('../Helpers/uploads.helpers');
const UserModel = require('../Models/users.model');
const Notification = require('../Models/notification.model');

const getOneSpace = async (req, res = response) => {
    try {
        const { idSpace } = req.params;

        const space = await SpacesModel.findOne({ where: { idSpace: idSpace } });

        if (!space) {
            return res.status(404).json({ error: 'Id space not found.' });
        }

        res.json({
            space,
        });
    } catch (error) {
        console.error('Error to get space.', error);
        res.status(500).json({
            error: 'Error to get space.',
        });
    }
};

const getAllSpaces = async (req, res = response) => {

    try {

        const spaces = await SpacesModel.findAll();

        // console.log('Space get ok', spaces);

        res.json({ spaces });

    } catch (error) {

        console.error('Error to get spaces', error);

        res.status(500).json({
            error: 'Error to get spaces 500',
        })
    };

}

const postSpace = async (req, res) => {
    try {
        const { ...spaceAttributes } = req.body;


        const imgUrl = req.files !== null ? await upload(req.files.image, ['png', 'jpg', 'jpeg'], 'Images') : null;

        console.log()

        spaceAttributes.schedule = JSON.parse(spaceAttributes.schedule)

        if (!spaceAttributes.schedule.startHour || !spaceAttributes.schedule.endHour) {
            spaceAttributes.schedule = { startHour: '10:00', endHour: '18:00' };
        }

        const space = await SpacesModel.create({
            image: imgUrl,
            ...spaceAttributes
        });

        console.log(space, 'spaces created');

        res.json({
            message: `Se agregó la zona común ${space.spaceName}`,
            space
        });
    } catch (e) {
        console.error('Error al crear la espacio:', e);
        const message = e.message || 'Error al crear la espacio.';
        res.status(500).json({ message });
    }
};


const putSpace = async (req, res = response) => {
    try {
        const { idSpace, ...newData } = req.body;

        const space = await SpacesModel.findOne({ where: { idSpace: idSpace } });

        // Parsea schedule 
        newData.schedule = JSON.parse(newData.schedule);

        const newImg = space.image == "" && req.files ?
            await upload(req.files.image, ['png', 'jpg', 'jpeg'], 'Images') :
            req.files ? await updateFile(req.files, space.image, ['png', 'jpg', 'jpeg', 'pdf'], 'Images', "image") : ""

        if (!space) {
            return res.status(404).json({ msg: 'Zona comun no encontrada.' });
        }


        const updatedSpace = await space.update({
            spaceName: newData.spaceName,
            spaceType: newData.spaceType,
            image: newImg == "" ? newData.image : newImg,
            area: newData.area,
            capacity: newData.capacity,
            schedule: newData.schedule,
            status: newData.status
        });



        // Notification

        const userLogged = await UserModel.findByPk(newData.idUserLogged)

        let notification;


        if (newData.idUserLogged && userLogged) {

            notification = await Notification.create({

                iduser: newData.idUserLogged,
                type: 'warning',
                content: {
                    message: `Se modifico ${updatedSpace.spaceName}
                      ${updatedSpace.status == 'Active' ?
                            ` ahora esta disponible en el horario de ${updatedSpace.schedule.startHour} 
                        hasta ${updatedSpace.schedule.endHour} ` : 'ahora NO esta disponible'}`,
                    information: { userLogged, space }
                },
                datetime: new Date(),

            })

        }

        res.json({

            message: notification.content.message,

        });

    } catch (error) {
        console.error('Error al editar zona comun:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};







// const deleteSpace = async (req, res) => {

//     const { idSpace } = req.body;
//     let message = '';

//     try {

//         const rowsDeleted = await SpacesModel.destroy({ where: { idSpace: idSpace } });

//         if (rowsDeleted > 0) {

//             message = 'Space dalete ok';

//         } else {

//             res.status(404).json({ error: 'Id space not found' });

//         }
//     } catch (e) {

//         res.status(500).json({ error: 'Error delete space', message: e.message });

//     }
//     res.json({

//         spaces: message,

//     });
// };


module.exports = {
    getOneSpace,
    getAllSpaces,
    postSpace,
    putSpace,
    // deleteSpace,
};
