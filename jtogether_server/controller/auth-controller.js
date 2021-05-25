const express = require('express');
const router = express.Router();
const authModel = require('../model/auth-model')
const validator = require('../validators/validator')
const authValidator = require('../validators/validator-auth')
const jwt = require('../_helpers/jwt')
const sendMessage = require('./controller-util')

const SIGNUP_SUCCESSFUL_MESSAGE = 'Registrazione con successo';
const LOGOUT_SUCCESSFUL_MESSAGE = 'Logout effettuato con successo'

router.post('/login',authValidator.userLoginValidationRules,validator,login)
router.post('/signup',authValidator.userSignupValidationRules,validator,signup)
router.post('/logout',jwt.authenticateJWT,logout)
router.get('/token',authValidator.tokenValidationRules,validator,jwt.refreshToken)

module.exports = router;

async function signup(req,res,next){
    authModel.signup(req.body)
        .then(() => {
            return sendMessage(res, SIGNUP_SUCCESSFUL_MESSAGE);
        })
        .catch(err => next(err))
}

async function login(req,res,next) {
    authModel.login(req.body)
        .then(tokens => res.json(tokens))
        .catch(err => next(err))
}

async function logout(req,res) {
    authModel.logout(req.body,req.user).then(() => sendMessage(res, LOGOUT_SUCCESSFUL_MESSAGE))
}


