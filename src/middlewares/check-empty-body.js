
const checkEmptyRequestBody = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: `Invalid attempt on ${req.method} request`,
            errors: `The body on request its empty`
        });
    }
    next();
}

module.exports = {
    checkEmptyRequestBody
};