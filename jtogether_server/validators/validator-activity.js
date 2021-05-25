const {check} = require('express-validator');

const activityDeletionRules = [
    check('id',`Inserire l'id di un'attività valida`)
        .notEmpty(),
]

const activityCreationRules = [
    check('name',`Il nome dell'attività non può essere vuoto`)
        .notEmpty(),

    check('description',`La descrizione non può essere vuota`)
        .notEmpty(),

    check('date_time','Inserire una data ed un orario validi')
        .isISO8601()
        .toDate(),
]


module.exports = {
    activityCreationRules,
    activityDeletionRules,
}
