const express = require('express');
const app = express();
const http = require('http').Server(app)
const {resourceNotFoundHandler,errorHandler} = require('./_helpers/error-handler')
const cors = require('cors')
const {SocketIoController} = require('./controller/socket-io-controller')
const USER_PATH = '/user'

//fillDisagio()
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
            {name : 'sesso non protetto', description: 'Marco é il nuovo re del server disord, Ismam abdica. Viva la monarchia, morte agli infedeli.', date_time: '2021-05-23 12:45'},{username : 'ismo'})
        await userModel.createActivity({username : 'ismo'},{activity_id: ismoActivity._id})

        const ismo2Activity = await activityModel.createActivity(
            {name : 'Turbo Jojo', description: 'A Ismam piacciono i gatti, apprezza molto anche rocket league e la programmazione funzionale (bugia). Non gli piace tuttavia il martedí', date_time: '2021-05-23 17:12'},{username : 'ismo'})
        await userModel.createActivity({username : 'ismo'},{activity_id: ismo2Activity._id})

        const ismo3Activity = await activityModel.createActivity(
            {name : 'Pillar man', description: 'A vlad sta bene il reggiseno della chiara, Lorenzo apprezza. Davide fa cose mentre chiara registra. Ismam dorme.', date_time: '2021-05-23 10:41'},{username : 'ismo'})
        await userModel.createActivity({username : 'ismo'},{activity_id: ismo3Activity._id})

        const ismo4Activity = await activityModel.createActivity(
            {name : 'Bertinoro City Gang', description: 'La Rocca, che si eleva maestosa sulla cima del colle Cesubeo, riassume in sé la storia di Bertinoro in tutte le sue vicende.', date_time: '2021-06-15 14:11'},{username : 'ismo'})
        await userModel.createActivity({username : 'ismo'},{activity_id: ismo4Activity._id})

        const ismo5Activity = await activityModel.createActivity(
            {name : 'Faenza City Bois', description: 'Faenza è un comune italiano di 58 335 abitanti della provincia di Ravenna in Emilia-Romagna.', date_time: '2021-06-11 09:12'},{username : 'ismo'})
        await userModel.createActivity({username : 'ismo'},{activity_id: ismo5Activity._id})

        await activityModel.createParticipation({activity_id : ismoActivity._id},{username : 'gardo'})
        await userModel.createParticipation({username : 'gardo'},{activity_id : ismoActivity._id})

        await activityModel.createParticipation({activity_id : ismoActivity._id},{username : 'Jotaro'})
        await userModel.createParticipation({username : 'Jotaro'},{activity_id : ismoActivity._id})
    }catch (e) {
        console.log(e)
    }
}
