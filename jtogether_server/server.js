const express = require('express');
const app = express();
const errorHandler = require('./_helpers/error-handler')


app.use(express.json())// for json body parse
    .use(require('./logic/auth-controller'))
    .use(errorHandler)


const port = 3000;
app.listen(port,function(){
    console.log(`listening on http://localhost:${port}`);
})
