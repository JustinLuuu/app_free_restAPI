const express = require('express');
const { check } = require('express-validator');
const { checkInvalidFields } = require('../middlewares/check-invalid-fields');
const { checkUnexpectedFields } = require('../middlewares/check-unexpected-fields');
const { UserController: { getUsersAction, getUserAction, createUserAction, updateUserAction, deleteUserAction
} } = require('../controllers/UserController');
const { checkEmptyRequestBody } = require('../middlewares/check-empty-body');


const routerUsers = express.Router();

// endpoints for users 
routerUsers.get('/', getUsersAction);
routerUsers.get('/:id', getUserAction);
routerUsers.delete('/:id', deleteUserAction);

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


routerUsers.put('/', [
    checkEmptyRequestBody,
    checkUnexpectedFields('name', 'age', 'number'),
    check('name', 'Name field is required'),
    check('name', 'Name field must have at least 3 characters').isLength({ min: 3 }),
    check('age', 'Age field is required').not().isEmpty(),
    check('age', 'Age field is numeric').isNumeric(),
    check('age', 'Age field must be greater than or equal to 1').isInt({ min: 1 }),
    check('number', 'Number field is required').not().isEmpty(),
    check('number', 'Number field must be between 10 and 17 characters').isLength({ min: 10, max: 17 }),
    checkInvalidFields
], updateUserAction);


module.exports = routerUsers;