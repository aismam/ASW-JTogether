const express = require('express');
const app = express();
const http = require('http').Server(app)
const {resourceNotFoundHandler,errorHandler} = require('./_helpers/error-handler')
const cors = require('cors')
const {SocketIoController} = require('./controller/socket-io-controller')
const USER_PATH = '/user'

// fillDisagio()

app.use(express.json())// for json body parse
    .use(cors())
    .use(require('./controller/auth-controller'))
    .use(USER_PATH,require('./controller/user-controller'))
    .use(USER_PATH,require('./controller/activity-controller')(new SocketIoController(http)))
    .use(errorHandler)
    .use(resourceNotFoundHandler)

const port = 3000;
http.listen(port,function(){
    console.log(`listening on http://localhost:${port}`);
})

async function fillDisagio(){
    const userModel = require('./model/user-model')
    const authModel = require('./model/auth-model')
    const activityModel = require('./model/activity-model')
    try{
        await authModel.signup({username: 'ismo',email : 'ciao@gmail.com', password: 'sasso vero'})
        await authModel.signup({username: 'Jotaro',email : 'jotaro.kujo@speedwagon.com', password: 'jojo.1919'})
        await authModel.signup({username: 'gardo',email : 'bellarega@gmail.com', password: 'ritardato vero'})

        const ismoActivity = await activityModel.createActivity(
            {name : 'sesso non protetto', description: 'Marco é il nuovo re del server disord, Ismam abdica', date_time: '2021-05-23 12:45'},{username : 'ismo'})
        const ismo2Activity = await activityModel.createActivity(
            {name : 'Turbo Jojo', description: 'A Ismam piacciono i gatti, apprezza molto anche rocket league e la programmazione funzionale', date_time: '2021-05-23 17:12'},{username : 'ismo'})
        const ismo3Activity = await activityModel.createActivity(
            {name : 'Pillar man', description: 'A vlad sta bene il reggiseno della chiara, Lorenzo apprezza', date_time: '2021-05-23 10:41'},{username : 'ismo'})

        await activityModel.createParticipation({activity_id : ismoActivity._id},{username : 'gardo'})
        await userModel.createParticipation({username : 'gardo'},{activity_id : ismoActivity._id})

        await activityModel.createParticipation({activity_id : ismoActivity._id},{username : 'Jotaro'})
        await userModel.createParticipation({username : 'Jotaro'},{activity_id : ismoActivity._id})
    }catch (e) {
        console.log(e)
    }
}
