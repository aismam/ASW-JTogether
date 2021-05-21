const express = require('express');
const router = express.Router();
const userModel = require('../model/user-model')
const validator = require('../_helpers/validator')
const jwt = require('../_helpers/jwt')

router.post('/create-activity',
    jwt.authenticateJWT,
    validator.activityValidationRules,
    validator.validate,
    createActivity)

module.exports = router;

async function createActivity(req,res,next){
    userModel.createActivity(req.body)
        .then(activity => res.json(activity))
        .catch(err => next(err))
}
