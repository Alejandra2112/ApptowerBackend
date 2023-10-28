const { check } = require('express-validator');
const ParkingSpacesModel = require('../Models/parking.spaces.model');

const postPersonalInfoValidation = [

    check('docType')
        .isIn(['CC', 'CE'])
        .withMessage('Document type not valid'),

    check('docNumber')
        .notEmpty()
        .withMessage('Doc number is required.')
        .isString()
        .isLength({ min: 8, max: 12 })
        .withMessage('Document number must be between 8 and 12 characters.'),

    check('name')
        .notEmpty()
        .withMessage('Name is required.')
        .isString()
        .isLength({ min: 3, max: 50 })
        .withMessage('Name mush be between 3 and 20 characters.')
        .trim(),

    check('lastName')
        .notEmpty()
        .withMessage('Last name is required.')
        .isString()
        .isLength({ min: 3, max: 20 })
        .withMessage('Last name mush be between 3 and 20 characters.')
        .trim(),

    check('birthday')
        .notEmpty()
        .withMessage('Birthday date is required.')
        .isISO8601()
        .withMessage('Birthday date mush be Year/Moth/day.'),

    check('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail(),

    check('phoneNumber')
        .notEmpty()
        .withMessage('Phone number is required.')
        .isLength({ min: 10 })
        .withMessage('Phone number must be at least 10 characters.'),

    check('status')
        .isIn(['Active', 'Inactive'])
        .withMessage('Status spaces is not valid.')
]

const postResidentInfoValidation = [


    check('sex')
        .isIn(['M', 'F'])
        .withMessage('Sex is not valid.'),
    check('residentType')
        .isIn(['tenant', 'owner'])
        .withMessage('Status spaces is not valid.'),

]

module.exports = {

    postResidentInfoValidation,
    postPersonalInfoValidation
} 