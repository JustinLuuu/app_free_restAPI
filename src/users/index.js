const express = require('express');
const {UserController: {getUsersAction, getUserAction, createUserAction, deleteUserAction
}} = require('./controller');


const routerUsers = express.Router();

// endpoints for users 
routerUsers.get('/', getUsersAction);
routerUsers.get('/:id', getUserAction);
routerUsers.post('/', createUserAction);
routerUsers.delete('/:id', deleteUserAction);

module.exports = routerUsers;