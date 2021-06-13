const {check,query} = require('express-validator');

const activityDeletionRules = [
    check('activity_id',`Inserire l'id di un'attività valida`)
        .notEmpty(),
]

const searchActivityRules = [
    query('text',`Inserire un testo da cercare valido`)
        .notEmpty()
]

const getNearActivitiesRules = [
    query('latitude', 'Inserire una latitudine valida')
        .isNumeric(),

    query('longitude', 'Inserire una longitudine valida')
        .isNumeric(),
]

const activityCreationRules = [
    check('name', `Il nome dell'attività non può essere vuoto`)
        .notEmpty(),

    check('description', `La descrizione non può essere vuota`)
        .notEmpty(),

    check('location', 'Inserire un luogo')
        .notEmpty(),

    check('geolocation', 'Inserire coordinate valide')
        .notEmpty()
        .isArray({max: 2, min: 2}),


    check('date_time', 'Inserire una data ed un orario validi')
        .isISO8601()
        .toDate(),
    ...getNearActivitiesRules
];

const activityModificationRules = [
    ...activityDeletionRules,
    ...activityCreationRules
]

const participationRules = [
    ...activityDeletionRules
]

const getActivitiesRules = [
    check('activities_id','Inserire id di attività validi')
        .isArray()
]

module.exports = {
    searchActivityRules,
    getNearActivitiesRules,
    getActivitiesRules,
    participationRules,
    activityModificationRules,
    activityCreationRules,
    activityDeletionRules,
}
