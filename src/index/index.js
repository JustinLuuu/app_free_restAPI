const express = require('express');
const controlApiRouter = express.Router();

controlApiRouter.get('/', (req, res) => {
    const menu = {
        products: `https://${req.headers.host}/api/products`,
        users: `https://${req.headers.host}/api/users`,
    }
    res.status(200).send(menu);
});

controlApiRouter.all('*', (req, res)=> {
    res.status(404).send('Route not found or method not allowed');
});

module.exports = controlApiRouter;