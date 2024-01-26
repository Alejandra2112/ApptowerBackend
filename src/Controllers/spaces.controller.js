const { response } = require('express');
const SpacesModel = require('../Models/spaces.model');
const { upload, updateFile } = require('../Helpers/uploads.helpers');

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

        console.log(req.files.image)
        const imageUrl = await upload(req.files.image)

        const { image, status, ...others } = req.body;

        console.log(image)


        const space = await SpacesModel.create({
            image: imageUrl,
            ...others
        })

        res.json({
            message: 'Space created'
        })

        console.log(space)

    } catch (e) {
        console.error('Error creating space:', e);
        const message = e.message || 'Error creating space.';
        res.status(500).json({ message });
    }
};

const putSpace = async (req, res = response) => {
    try {
        const { idSpace, ...newData } = req.body;

        console.log(req.files , "MOSTRA pues")

        const space = await SpacesModel.findOne({ where: { idSpace: idSpace } });

        // console.log(space.image, "Old img")

        const newImg = space.image == "" || space.image == null ?
            await upload(req.files.image, ['png', 'jpg', 'jpeg'], 'Images') :
            await updateFile(req.files, space.image, ['png', 'jpg', 'jpeg'], 'Images')


        if (!space) {
            return res.status(404).json({ msg: 'Zona comun no encontrada.' });
        }


        const updatedSpace = await space.update({
            spaceName: newData.spaceName,
            spaceType: newData.spaceType,
            image: newImg,
            area: newData,
            capacity: newData.capacity,
            status: newData.status
        });

        res.json({
            msg: "Zona comun actualizada",
            tower: updatedSpace
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
