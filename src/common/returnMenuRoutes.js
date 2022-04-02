let routesJson = require('../assets/routes.json');

const returnMenuRoutes = (hostName) => {    
    const routesObj = Object.keys(routesJson).reduce((objInc, routeName) => {
        objInc = {...objInc, [routeName]: routesJson[routeName].replace()}
        return objInc;
    }, {});
    
    return routesObj;
}

module.exports = returnMenuRoutes;