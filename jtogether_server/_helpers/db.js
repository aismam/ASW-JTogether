const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/JTogether',
    {useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex: true,useFindAndModify : false})

module.exports = require('../model/db-model')

