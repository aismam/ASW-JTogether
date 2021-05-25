const express = require('express');
const app = express();
const http = require('http').Server(app)
const {resourceNotFoundHandler,errorHandler} = require('./_helpers/error-handler')

const USER_PATH = '/user'

app.use(express.json())// for json body parse
    .use(require('./controller/auth-controller'))
    .use(USER_PATH,require('./controller/auth-controller'))
    .use(USER_PATH,require('./controller/user-controller'))
    .use(USER_PATH,require('./controller/activity-controller'))
    .use(require('./controller/socket-io-controller')(http))
    .use(errorHandler)
    .use(resourceNotFoundHandler)

const port = 3000;
http.listen(port,function(){
    console.log(`listening on http://localhost:${port}`);
})
