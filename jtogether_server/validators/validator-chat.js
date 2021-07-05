const {check, query} = require('express-validator');

const messageIncomingRule = [
    check('message', `Inserire un messaggio valido`)
        .notEmpty(),
    check('username', `Inserire un username valido`)
        .notEmpty(),
    check('activity_id', `Inserire un id chat valido`)
        .notEmpty()
]

module.exports = {
    messageIncomingRule,
}
