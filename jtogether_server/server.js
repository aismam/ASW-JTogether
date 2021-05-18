const express = require('express');
const app = express();
const {resourceNotFoundHandler,errorHandler} = require('./_helpers/error-handler')

app.use(express.json())// for json body parse
    .use(require('./controller/auth-controller'))
    .use(errorHandler)
    //.use(resourceNotFoundHandler)



const port = 3000;
app.listen(port,function(){
    console.log(`listening on http://localhost:${port}`);
})
