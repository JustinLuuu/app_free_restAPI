
const checkExistFields = (...expectedFields) => {
    expectedFields = new Set(expectedFields);
    return (req, res, next) => {
        for (const param in req.body) {
            if (!expectedFields.has(param)) {
                return res.status(400).send({
                    
                });
            }
        }
        next();
    }
}

module.exports = {
    checkExistFields
};