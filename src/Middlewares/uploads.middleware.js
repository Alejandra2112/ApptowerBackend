const { check } = require('express-validator');

const fileValidationForPost = [

    check('pdf')

    // .custom((value, { req }) => {

    //     if (!req.files.pdf) {
    //         throw new Error('El debes sub es obligatorio.');
    //     }
    //     return true;

    // })

    .custom((value, { req }) => {

        if (!req.files) {
            throw new Error('El documento PDF es obligatorio.');
        }
        return true;

    })
];

module.exports = {

    fileValidationForPost
}