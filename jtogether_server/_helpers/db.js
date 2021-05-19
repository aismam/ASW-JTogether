const config = require('config.json');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/JTogether',{useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex: true})


module.exports = {
    User: require('../model/db-model')
};
