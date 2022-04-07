const express = require('express');
const { check, body } = require('express-validator');
const { checkInvalidFields } = require('../middlewares/check-invalid-fields');
const { checkUnexpectedFields } = require('../middlewares/check-unexpected-fields');
const { checkEmptyRequestBody } = require('../middlewares/check-empty-body');
const { checkValidBsonId } = require('../middlewares/check-valid-bsonidjs');
const { PersonController: { getPersonsAction, getPersonAction, createPersonAction,
 updatePersonAction, deletePersonAction
} } = require('../controllers/PersonController');


const routerPersons = express.Router();

// endpoints for people 
routerPersons.get('/', getPersonsAction);
routerPersons.get('/:id', checkValidBsonId, getPersonAction);
routerPersons.delete('/:id', checkValidBsonId, deletePersonAction);

routerPersons.post('/', [
    checkEmptyRequestBody,
    checkUnexpectedFields('name', 'age', 'number'),

    check('name', 'Name field is required').not().isEmpty()
    .isLength({min:3}).withMessage('Name field must have at least 3 characters'),
    
    check('age', 'Age field is required').not().isEmpty()
    .isNumeric().withMessage('Age field is numeric')
    .isInt({min:1}).withMessage('Age field must be greater than or equal to 1'),

    check('number', 'Number field is required').not().isEmpty()
    .isNumeric().withMessage('Number field is numeric')
    .isLength({min: 10, max: 17}).withMessage('Number field must be between 10 and 17 characters'),

    checkInvalidFields
], createPersonAction);
  
routerPersons.put('/:id', [
    checkValidBsonId,
    checkEmptyRequestBody,
    checkUnexpectedFields('name', 'age', 'number'),

    check('name', 'Name field is required').if(body('name').exists()).not().isEmpty()
    .isLength({min: 3}).withMessage('Name field must have at least 3 characters'),

    check('age', 'Age field is required').if(body('age').exists()).not().isEmpty()
    .isNumeric().withMessage('Age field is numeric')
    .isInt({min: 1}).withMessage('Age field must be greater than or equal to 1'),

    check('number', 'Number field is required').if(body('number').exists()).not().isEmpty()
    .isNumeric().withMessage('Number must be numeric')
    .isLength({ min: 10, max: 17 }).withMessage('Number field must be between 10 and 17 characters'),

    checkInvalidFields
], updatePersonAction);

routerPersons.all('/', (_, res)=> {res.status(405).send('Method not allowed')})

module.exports = routerPersons;