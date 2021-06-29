const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const activityModel = require('../model/activity-model')
const userModel = require('../model/user-model')
const validator = require('../validators/validator')
const activityValidator = require('../validators/validator-activity')
const jwt = require('../_helpers/jwt')
const sendMessage = require('./controller-util')

const USERS_TO_BE_NOTIFIED = 0;
const DELETED_ACTIVITY = 1;
const DELETION_SUCCESSFUL_MESSAGE = name => `L'attività ${name} è stata cancellata`
const ACTIVITY_MODIFIED_MESSAGE = name => `L'attività ${name} è stata modificata`
const GEOLOCATION_URL = location => `https://eu1.locationiq.com/v1/search.php?key=pk.c7c99c10cf697dedb99068474806aab4&q=${encodeURI(location)}&format=json`

module.exports = notificationsController => {
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
        let activity = undefined;
        getGeolocation(req.body.location)
            .then(g => {
                req.body.latitude = g.latitude
                req.body.longitude = g.longitude
            })
            .then(() => activityModel.createActivity(req.body,req.user))
            .then(a => activity = a)
            .then(() => userModel.createActivity(req.user,{activity_id : activity._id}))
            .then(() => res.json(activity.toJSON()))
            .catch(err => next(err))
    }

    async function getNearActivities(req,res,next){
        activityModel.getNearActivities(req.user,req.query)
            .then(activities => res.json(activities.map(a => a.toJSON())))
            .catch(err => next(err))
    }

    async function searchActivities(req,res,next){
        activityModel.searchActivities(req.user,req.query)
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
                notificationsController.notify(ACTIVITY_MODIFIED_MESSAGE(modifiedActivity.name))
                res.json(modifiedActivity.toJSON())
            })
            .catch(err => next(err))
    }

    async function deleteActivity(req,res,next){
        Promise.all([userModel.deleteActivity(req.user, req.body),activityModel.deleteActivity(req.body,req.user)])
            .then(values => {
                values[USERS_TO_BE_NOTIFIED].forEach(user => {
                    const notificationText = ACTIVITY_MODIFIED_MESSAGE(values[DELETED_ACTIVITY].name)
                    if(notificationsController.userIsOnline(user.username)){
                        notificationsController.notify(user.username,notificationText)
                    }
                    else{
                        userModel.createNotification(user,{notification_text: notificationText})
                    }
                })
                return values[DELETED_ACTIVITY]
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
        userModel.deleteParticipation(req.user,req.body)
            .then(() => activityModel.deleteParticipation(req.body,req.user))
            .then(activity => res.json(activity.toJSON()))
            .catch(err => next(err))
    }

    async function getGeolocation(location){
        const FIRST_RESULT = 0
        return axios.get(GEOLOCATION_URL(location))
            .then(g => {
                if(g.data.length){
                    return {
                        latitude: parseFloat(g.data[FIRST_RESULT].lat),
                        longitude : parseFloat(g.data[FIRST_RESULT].lon)
                    }
                }else{
                    throw new Error('Luogo immesso non valido')
                }
            })
    }
};
