const { check, validationResult } = require('express-validator');


const userValidationRules = [
    check('username','Username must be at least 1 character').notEmpty(),
    check('password','Password must be at least 1 character').notEmpty()
]

const tokenValidationRules = [
    check('token','Username must be at least 1 character').notEmpty()
]


function validate(req,res,next){
    const err = validationResult(req)
    err.isEmpty() ? next() : res.status(422).json({ message: err.message })
}

module.exports = {
    userValidationRules,
    tokenValidationRules,
    validate
}
