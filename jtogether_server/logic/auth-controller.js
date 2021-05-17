const express = require('express');
const router = express.Router();
const authModel = require('../model/auth-model')

router.get('/login',login)
router.get('/signup',signup)
router.get('/logout',logout)

module.exports = router;

async function signup(req,res,next){
    authModel.signup(req.body)
        .then(() => sendMessage(res,'registration successful'))
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

