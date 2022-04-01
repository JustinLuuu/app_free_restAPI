module.exports.Response = (res, status = 200, message = "ok", data = null) => {
    res.status(status).send({
        message, data
    });
}