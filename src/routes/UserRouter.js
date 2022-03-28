const express = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const {UserController: {getUsersAction, getUserAction, createUserAction, deleteUserAction
}} = require('../controllers/UserController');


const routerUsers = express.Router();

// endpoints for users 
routerUsers.get('/', getUsersAction);
routerUsers.get('/:id', getUserAction);
routerUsers.delete('/:id', deleteUserAction);
routerUsers.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('name', 'Name must have at least 3 characters').isLength({min: 3}),
    check('age', 'Age field is numeric').isNumeric(),
    check('age', 'Age must be greater than or equal to 1').isInt({min: 1}),
    check('number', 'Number is required').not().isEmpty(),
    check('number', 'Number must be between 10 and 17 characters').isLength({min: 10, max: 17}),
    validateFields
], createUserAction);

module.exports = routerUsers;