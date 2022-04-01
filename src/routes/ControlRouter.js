const express = require('express');
const { ControlController: { getControlMenuAction, catchControlAction } } = require('../controllers/ControlController');

const controlApiRouter = express.Router();

// endpoints for general
controlApiRouter.all('*', catchControlAction);
controlApiRouter.get('/', (_, res) => { res.redirect('/api') });
controlApiRouter.get('/api', getControlMenuAction);

module.exports = controlApiRouter;