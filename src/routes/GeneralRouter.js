const express = require('express');
const { GeneralController: { getGeneralMenuAction, getGeneralPageAction,
catchGeneralNotFoundAction } } = require('../controllers/GeneralController');

const generalApiRouter = express.Router();

// endpoints for general
generalApiRouter.get('/', getGeneralPageAction);
generalApiRouter.get('/api', getGeneralMenuAction);

// must be the last to be configured, cause it may
// catch the request as not required and the referenced action will response
generalApiRouter.all('*', catchGeneralNotFoundAction); 

module.exports = generalApiRouter;