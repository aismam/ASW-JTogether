const express = require('express');
const router = express.Router();
const authModel = require('../model/auth-model')
const validator = require('../_helpers/validator')
const jwt = require('../_helpers/jwt')

router.post('/login',validator.userLoginValidationRules,validator.validate,login)
router.post('/signup',validator.userSignupValidationRules,validator.validate,signup)
router.post('/logout',jwt.authenticateJWT,logout)
router.get('/token',validator.tokenValidationRules,validator.validate,jwt.refreshToken)

module.exports = router;

async function signup(req,res,next){
    authModel.signup(req.body)
        .then(() => sendMessage(res,'Registrazione con successo'))
        .catch(err => next(err))
}

async function login(req,res,next) {
    authModel.login(req.body)
        .then(tokens => res.json(tokens))
        .catch(err => next(err))
}

async function logout(req,res) {
    authModel.logout()
        .then(() => sendMessage(res, 'logout successful'))
}

function sendMessage(res,message){
    res.json({message: message})
}
