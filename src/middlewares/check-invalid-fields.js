const { validationResult } = require('express-validator');

const checkInvalidFields = (req, res, next) => {

    //extract the errors that are caused in the petition
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            message: 'There is an error on request',
            errors: errors.mapped()
        });
    }

   next();
}


module.exports = {
    checkInvalidFields
}