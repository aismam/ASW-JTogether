const express = require('express');
const app = express();


require('./users/controller')(app);
app.use(express.json)// for json body parse
    .use(require('./_helpers/error-handler'));// for error handling


const port = 3000;
app.listen(port,function(){
    console.log(`listening on http://localhost:${port}`);
})
