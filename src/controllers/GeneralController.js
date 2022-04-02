const returnMenuRoutes = require("../common/returnMenuRoutes");

const getGeneralMenuAction = (req, res) => { 
    res.status(200).send(returnMenuRoutes(req.headers.host));
}

const getGeneralPageAction = (req, res) => {
    const menuRoutes = returnMenuRoutes(req.headers.host);
    res.render('../src/views/', {menuRoutes});
}

const catchGeneralAction = (req, res) => {
    res.status(400).send('Route not found or method  not allowed');
}

module.exports.GeneralController = { getGeneralMenuAction, getGeneralPageAction, catchGeneralAction };