const { ObjectId } = require("mongodb");

const checkValidBsonId = (req, res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        return res.status(400).send({
            message: `The param must be a valid bson object id`,
            errors: `Unexpected sent parameter: ${id}`
        });
    }
    next();
}

module.exports = {
    checkValidBsonId
};