const { check,oneOf} = require('express-validator');

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
        .isLength({ min : USERNAME_LENGTH}),

    check('email',`Inserisci una mail valida`)
        .isEmail()
        .normalizeEmail(),

    check('password',`La password deve essere lunga almeno ${PASSWORD_LENGTH} caratteri`)
        .isLength({min : PASSWORD_LENGTH})
        .matches(PASSWORD_REGEX)
        .withMessage("La password deve contenere almeno una maiuscola, un carattere speciale e un numero")
]

const tokenValidationRules = [
    check('refresh_token','Inserire il refresh token').notEmpty()
]

module.exports = {
    tokenValidationRules,
    userSignupValidationRules,
    userLoginValidationRules
}