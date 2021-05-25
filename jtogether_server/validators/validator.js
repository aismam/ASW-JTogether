const {validationResult} = require('express-validator');

function validate(req,res,next){
    const errs = validationResult(req)
    errs.isEmpty() ? next() : res.status(422).json({ message: errs.errors.map(err => err.msg).join(", ")})
}

module.exports = validate
