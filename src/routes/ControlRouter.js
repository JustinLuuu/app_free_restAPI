const express = require('express');
const { ControlController: { getControlMenuAction, catchControlAction } } = require('../controllers/ControlController');

const controlApiRouter = express.Router();

// endpoints for landing and general
controlApiRouter.get('/', (_, res) => { res.redirect('https://google.com') });
controlApiRouter.get('/api', getControlMenuAction);

// must be the last to be configured, cause it may
// catch the request as not required and the referenced action will response
controlApiRouter.all('*', catchControlAction); 

module.exports = controlApiRouter;