const express = require('express');
const router = express.Router();
const userService = require('./userApi');


module.exports = (app) => {
    app.route('/user/:id')
        .get(getById)
        .delete(_delete)
        .post(update);

    app.get('/authenticate', authenticate);
}

function authenticate(req, res, next){
    userService.authenticate()
        .then(user => res.send("evvai"))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.authenticate()
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
