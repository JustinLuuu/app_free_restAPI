module.exports.Response = (res, status = 200, message = "ok", data = {}) => {
    res.status(status).send({
        message, data
    });
}