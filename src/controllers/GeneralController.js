const returnRoutesData = require("../common/returnRoutesData");

const getGeneralMenuAction = (req, res) => {
    const routesWithName = returnRoutesData().reduce((objRoutes, route) => (
    { ...objRoutes, [route.name]: `https://${req.headers.host}/api/${route.name}` } ) 
    , {});

    res.status(200).send(routesWithName);
}

const getGeneralPageAction = (req, res) => {
    const routesData = returnRoutesData();
    const hostname = req.headers.host;
    res.render('../src/views/', { routesData, hostname });
}

const catchGeneralNotFoundAction = (req, res) => {
    res.status(404).send('Route not found');
}

module.exports.GeneralController = { getGeneralMenuAction, getGeneralPageAction, catchGeneralNotFoundAction };