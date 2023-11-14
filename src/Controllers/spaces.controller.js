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

        const imageUrl = await upload(req.files.image)

        const { image, ...others } = req.body;

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
        const space = await SpacesModel.findByPk(req.body.idSpace);


        if (!space) {
            return res.status(400).json({ msg: "Id space not found." });
        }

        const imageUrl = await updateFile(req.files, space.image)


        const updatedSpace = await space.update({
            spaceType: req.body.spaceType,
            image: imageUrl,
            spaceName: req.body.spaceName,
            area: req.body.area,
            capacity: req.body.capacity,
            status: req.body.status,

        }, {
            where: { idSpace: req.body.idSpace }
        });

        res.json({
            spaces: 'Spaces update',
            // updatedSpace: updatedSpace.toJSON()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
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
