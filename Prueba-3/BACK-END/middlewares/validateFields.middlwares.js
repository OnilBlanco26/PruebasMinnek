const { validationResult } = require("express-validator");

exports.validateFields = (req, res, next) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({
            status: 'Error',
            errors: errors.mapped()
        })
    }

    next()
}