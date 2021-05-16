const mongoose = require('mongoose');
const validator = require('express-validator');



const userSchemda = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

module.exports = userSchemda;
