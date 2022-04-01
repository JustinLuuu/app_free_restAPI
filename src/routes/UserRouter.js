const express = require('express');
const { check, body } = require('express-validator');
const { checkInvalidFields } = require('../middlewares/check-invalid-fields');
const { checkUnexpectedFields } = require('../middlewares/check-unexpected-fields');
const { checkEmptyRequestBody } = require('../middlewares/check-empty-body');
const { checkValidBsonId } = require('../middlewares/check-valid-bsonidjs');
const { UserController: { getUsersAction, getUserAction, createUserAction, updateUserAction, deleteUserAction
} } = require('../controllers/UserController');


const routerUsers = express.Router();

// endpoints for users 
routerUsers.get('/', getUsersAction);
routerUsers.get('/:id', checkValidBsonId, getUserAction);
routerUsers.delete('/:id', checkValidBsonId, deleteUserAction);

routerUsers.post('/', [
    checkEmptyRequestBody,
    checkUnexpectedFields('name', 'age', 'number'),
    check('name', 'Name field is required').not().isEmpty(),
    check('name', 'Name field must have at least 3 characters').isLength({ min: 3 }),
    check('age', 'Age field is required').not().isEmpty(),
    check('age', 'Age field is numeric').isNumeric(),
    check('age', 'Age field must be greater than or equal to 1').isInt({ min: 1 }),
    check('number', 'Number field is required').not().isEmpty(),
    check('number', 'Number field must be between 10 and 17 characters').isLength({ min: 10, max: 17 }),
    checkInvalidFields
], createUserAction);
  
routerUsers.put('/:id', [
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
], updateUserAction);


module.exports = routerUsers;