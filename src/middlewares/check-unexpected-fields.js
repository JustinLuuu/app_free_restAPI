
const checkUnexpectedFields = (...expectedFields) => {
    expectedFields = new Set(expectedFields);
    return (req, res, next) => {                
        for (const param in req.body) {
            if (!expectedFields.has(param)) {
                return res.status(400).send({
                    message: `Invalid field on ${req.method} request`,
                    errors: `Unexpected field: '${param}'`
                });
            }
        }
        next();
    }
}

module.exports = {
    checkUnexpectedFields
};