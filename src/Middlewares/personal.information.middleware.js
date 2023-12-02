const { check } = require('express-validator');
const ParkingSpacesModel = require('../Models/parking.spaces.model');
const OwnersModel = require('../Models/owners.model');
const ResidentModel = require('../Models/resident.model');

// POST VALIDATIONS

// Entity Owner Document Number Validation

const postDocNumberOwner = [

    check('docNumber')
        .notEmpty()
        .withMessage('Doc number is required.')
        .isString()
        .isLength({ min: 8, max: 12 })
        .withMessage('Document number must be between 8 and 12 characters.')

        .custom(async (value) => {
            const existing = await OwnersModel.findOne({ where: { docNumber: value } });

            // if (existing) {
            //     throw new Error('Owner document number is already in use');
            // }

            return true;
        }),
]

// Entity resident Document Number Validation

const postDocNumberResident = [


    check('docNumber')
        .notEmpty()
        .withMessage('Doc number is required.')
        .isString()
        .isLength({ min: 8, max: 12 })
        .withMessage('Document number must be between 8 and 12 characters.')

    // .custom(async (value) => {
    //     const existing = await ResidentModel.findOne({ where: { docNumber: value } });

    //     if (existing) {
    //         throw new Error('Resident document number is already in use');
    //     }

    //     return true;
    // }),
]

// Entity owner and resident Validation

const postPersonalInfoValidation = [

    check('docType')
        .isIn(['CC', 'CE'])
        .withMessage('Document type not valid'),

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

// PUT VALIDATION

const putDocNumberOwner = [

    check('docNumber')
        .optional()
        .isString()
        .isLength({ min: 8, max: 12 })
        .withMessage('Document number must be between 8 and 12 characters.')

        .custom(async (value, { req }) => {
            const body = req.body;
            const { docNumber } = body;

            const existingDocOwner = await OwnersModel.findOne({ where: { docNumber: value } });

            if (value === docNumber) {
                return true;
            } else {

                if (existingDocOwner) {
                    throw new Error('Owner document number is already in use');
                }
                return true;

            }

        }),
]

const putDocNumberResident = [

    check('docNumber')
        .optional()
        .isString()
        .isLength({ min: 8, max: 12 })
        .withMessage('Document number must be between 8 and 12 characters.')
        .custom(async (value, { req }) => {
            const body = req.body;
            const { docNumber } = body;

            const existingDocRecident = await ResidentModel.findOne({ where: { docNumber: value } });

            if (value === docNumber) {
                return true;
            } else {

                if (existingDocRecident) {
                    throw new Error('Resident document number is already in use');
                }
                return true;

            }

        }),
]

const putPersonalInfoValidation = [

    check('docType')
        .isIn(['CC', 'CE'])
        .withMessage('Document type not valid'),

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


const putResidentInfoValidation = [

    check('sex')
        .isIn(['M', 'F'])
        .withMessage('Sex is not valid.'),
    check('residentType')
        .isIn(['tenant', 'owner'])
        .withMessage('Status spaces is not valid.'),


]


module.exports = {

    postResidentInfoValidation,
    postPersonalInfoValidation,
    postDocNumberOwner,
    postDocNumberResident,

    putDocNumberOwner,
    putDocNumberResident,
    putPersonalInfoValidation,
    putResidentInfoValidation
} 