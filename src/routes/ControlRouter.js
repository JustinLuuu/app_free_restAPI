const express = require('express');
const {ControlController: {getControlMenuAction, catchControlAll}} = require('../controllers/ControlController');

const controlApiRouter = express.Router();

// endpoints for general purpose
controlApiRouter.get('/', getControlMenuAction);
controlApiRouter.all('*', catchControlAll);

module.exports = controlApiRouter;