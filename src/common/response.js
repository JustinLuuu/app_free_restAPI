const createError = require('http-errors');

module.exports.Response = {
    success: (res, status=200, message="ok", data={})=> {
        res.status(status).send({
            message, data
        });
    },
    error: (res, error=null) => {
        const {statusCode, message} = error ? error : new createError.InternalServerError();
        res.status(statusCode).json({message});
    }
}