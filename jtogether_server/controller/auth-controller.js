const express = require('express');
const router = express.Router();
const authModel = require('../model/auth-model')
const {validationRules,validate} = require('../_helpers/validator')
const { check, validationResult } = require('express-validator');
const {authenticateJwt} = require('../_helpers/jwt')

router.get('/login',login)
router.get('/signup',validationRules,validate,signup)
router.get('/logout',authenticateJwt,logout)

module.exports = router;

async function signup(err,req,res,next){
    checkError(err,next)
    authModel.signup(req.body)
        .then(() => sendMessage(res,'registration successful'))
        .catch(err => next(err))

}

async function login(err,req,res,next) {
    checkError(err,next)
    authModel.login(req.body)
        .then(tokens => res.json(tokens))
        .catch(err => next(err))
}

async function logout(err,req,res,next) {
    checkError(err,next)
    authModel.logout()
        .then(() => sendMessage(res, 'logout successful'))
}

function sendMessage(res,message){
    res.json({message: message})
}

function checkError(err,next){
    if(err){
        next(err)
    }
}
