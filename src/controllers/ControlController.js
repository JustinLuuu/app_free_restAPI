const getControlMenuAction = (req, res)=> {
    const menu = {
        products: `https://${req.headers.host}/api/products`,
        users: `https://${req.headers.host}/api/users`,
    }
    res.status(200).send(menu);
}

const catchControlAction = (req, res) => {
    res.status(400).send('Route not found or method not allowed');
}


module.exports.ControlController = {getControlMenuAction, catchControlAction};