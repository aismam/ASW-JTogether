const { check, validationResult,oneOf} = require('express-validator');

const USERNAME_LENGTH = 3
const PASSWORD_LENGTH = 8

const PASSWORD_REGEX = `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*()_+{}|"/?\\"]).{${PASSWORD_LENGTH},}$`

const userLoginValidationRules = [
    oneOf([
        check('username').notEmpty(),
        check('email').notEmpty()
    ],"Inserire username o email per accedere"),
    check('password','Inserire la password').notEmpty()
]

const userSignupValidationRules = [

    check('username',`L'username deve contenere almeno ${USERNAME_LENGTH} caratteri`)
        .isLength({ min : 3}),

    check('email',`Inserisci una mail valida`)
        .isEmail()
        .normalizeEmail(),

    check('password',`La password deve essere lunga almeno ${PASSWORD_LENGTH} caratteri`)
        .isLength({min : PASSWORD_LENGTH})
        .matches(PASSWORD_REGEX)
        .withMessage("La password deve contenere almeno una maiuscola, un carattere speciale e un numero")
]

const activityValidationRules = [
    check('name',`Il nome dell'attività non può essere vuoto`)
        .notEmpty(),

    check('description',`La descrizione non può essere vuota`)
        .notEmpty(),

    check('date_time','Inserire una data ed un orario validi')
        .isISO8601()
        .toDate(),
]

const tokenValidationRules = [
    check('token','Token non valido').notEmpty()
]


function validate(req,res,next){
    const errs = validationResult(req)
    errs.isEmpty() ? next() : res.status(422).json({ message: errs.errors.map(err => err.msg).join(", ")})
}

module.exports = {
    userLoginValidationRules,
    userSignupValidationRules,
    activityValidationRules,
    tokenValidationRules,
    validate
}
