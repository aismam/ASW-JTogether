const express = require('express');
const router = express.Router();
const activityModel = require('../model/activity-model')
const userModel = require('../model/user-model')
const validator = require('../validators/validator')
const activityValidator = require('../validators/validator-activity')
const jwt = require('../_helpers/jwt')
const sendMessage = require('./controller-util')

const DELETION_SUCCESSFUL_MESSAGE = name => `L'attività ${name} è stata cancellata`
const ACTIVITY_MODIFIED_MESSAGE = name => `L'attività ${name} è stata modificata`

module.exports = socketController => {
    router.post('/create-activity',jwt.authenticateJWT,activityValidator.activityCreationRules,validator,createActivity)
    router.post('/modify-activity',jwt.authenticateJWT,activityValidator.activityModificationRules,validator,modifyActivity)
    router.post('/delete-activity',jwt.authenticateJWT,activityValidator.activityDeletionRules,validator,deleteActivity)
    router.post('/create-participation',jwt.authenticateJWT,activityValidator.participationRules,validator,createParticipation)
    router.post('/delete-participation',jwt.authenticateJWT,activityValidator.participationRules,validator,deleteParticipation)
    router.post('/get-activities',jwt.authenticateJWT,activityValidator.getActivitiesRules,validator,getActivities)
    router.get('/get-near-activities',jwt.authenticateJWT,activityValidator.getNearActivitiesRules,validator,getNearActivities)
    router.get('/search-activities',jwt.authenticateJWT,activityValidator.searchActivityRules,validator,searchActivities)
    return router;

    async function createActivity(req,res,next){
        activityModel.createActivity(req.body,req.user)
            .then(activity => {
                userModel.createActivity(req.user,{activity_id : activity._id})
                res.json(activity.toJSON())
            })
            .catch(err => next(err))
    }

    async function getNearActivities(req,res,next){
        activityModel.getNearActivities(req.query)
            .then(activities => res.json(activities.map(a => a.toJSON())))
            .catch(err => next(err))
    }

    async function searchActivities(req,res,next){
        activityModel.searchActivities(req.query)
            .then(activities => res.json(activities.map(a => a.toJSON())))
            .catch(err => next(err))
    }

    async function getActivities(req,res,next){
        activityModel.getActivities(req.body)
            .then(activities => res.json(activities.map(a => a.toJSON())))
            .catch(err => next(err))
    }

    async function modifyActivity(req,res,next){
        activityModel.modifyActivity(req.body,req.user)
            .then(modifiedActivity => {
                socketController.notify(ACTIVITY_MODIFIED_MESSAGE(modifiedActivity.name))
                res.json(modifiedActivity.toJSON())
            })
            .catch(err => next(err))
    }

    async function deleteActivity(req,res,next){
        Promise.all([userModel.deleteActivity(req.user, req.body),activityModel.deleteActivity(req.body,req.user)])
            .then(values => {
                const users = values[0]
                const deletedActivity = values[1]
                users.forEach(user => socketController.notify(user.username,ACTIVITY_MODIFIED_MESSAGE(deletedActivity.name)))
                return deletedActivity
            })
            .then( deletedActivity => sendMessage(res,DELETION_SUCCESSFUL_MESSAGE(deletedActivity.name)))
            .catch(err => next(err))
    }

    async function createParticipation(req,res,next){
        userModel.createParticipation(req.user,req.body)
            .then(() => activityModel.createParticipation(req.body,req.user))
            .then(activity => res.json(activity.toJSON()))
            .catch(err => next(err))
    }

    async function deleteParticipation(req,res,next){
        userModel.deleteParticipation(req.body,req.user)
            .then(() => activityModel.deleteParticipation(req.body,req.user))
            .then(activity => res.json(activity.toJSON()))
            .catch(err => next(err))
    }
};
