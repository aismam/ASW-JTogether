const { check, validationResult } = require('express-validator');


const  validationRules = [
    check('username','Username must be at least 1 character').notEmpty(),
    check('password','Password must be at least 1 character').notEmpty()
]

function validate(req,res,next){
    const err = validationResult(req)
    if(err.isEmpty()){
        next()
    }
    else{
        err.message = err.errors
        err.name = 'UnprocessableEntity'
        next(err)
    }
}

module.exports = {
    validationRules,
    validate
}