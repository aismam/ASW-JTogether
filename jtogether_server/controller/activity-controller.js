const express = require('express');
const router = express.Router();
const activityModel = require('../model/activity-model')
const validator = require('../validators/validator')
const activityValidator = require('../validators/validator-activity')
const jwt = require('../_helpers/jwt')
const sendMessage = require('./controller-util')

const DELETION_SUCCESSFUL_MESSAGE = 'Attività cancellata'
const PARTICIPATION_DELETED_MESSAGE = 'Partecipazione cancellata'

router.post('/create-activity',jwt.authenticateJWT,activityValidator.activityCreationRules,validator,createActivity)
router.post('/modify-activity',jwt.authenticateJWT,activityValidator.activityCreationRules,validator,modifyActivity)
router.post('/delete-activity',jwt.authenticateJWT,activityValidator.activityDeletionRules,validator,deleteActivity)
router.post('/create-participation',jwt.authenticateJWT,activityValidator.activityCreationRules,validator,createParticipation)
router.post('/delete-participation',jwt.authenticateJWT,activityValidator.activityCreationRules,validator,deleteParticipation)

module.exports = router;

async function createActivity(req,res,next){
    activityModel.createActivity(req.body,req.user)
        .then(activity => res.json(activity))
        .catch(err => next(err))
}

async function modifyActivity(req,res,next){
    activityModel.modifyActivity(req.body)
        .then(modifiedActivity => res.json(modifiedActivity))
        .catch(err => next(err))
}

async function deleteActivity(req,res,next){
    activityModel.deleteActivity(req.body)
        .then(() => sendMessage(res,DELETION_SUCCESSFUL_MESSAGE))
        .catch(err => next(err))
}

async function createParticipation(req,res,next){
    activityModel.creationParticipation(req.body)
        .then(participation => res.json(participation))
        .catch(err => next(err))
}

async function deleteParticipation(req,res,next){
    activityModel.deleteParticipation(req.body)
        .then(() => sendMessage(res,PARTICIPATION_DELETED_MESSAGE))
        .catch(err => next(err))
}
