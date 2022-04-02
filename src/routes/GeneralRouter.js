const express = require('express');
const { GeneralController: { getGeneralMenuAction, getGeneralPageAction, catchGeneralAction } } = require('../controllers/GeneralController');

const generalApiRouter = express.Router();

// endpoints for general
generalApiRouter.get('/', getGeneralPageAction);
generalApiRouter.get('/api', getGeneralMenuAction);

// must be the last to be configured, cause it may
// catch the request as not required and the referenced action will response
generalApiRouter.all('*', catchGeneralAction); 

module.exports = generalApiRouter;