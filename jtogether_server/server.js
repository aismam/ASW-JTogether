const express = require('express');
const app = express();
const http = require('http').Server(app)
const {resourceNotFoundHandler,errorHandler} = require('./_helpers/error-handler')
const cors = require('cors')
const {SocketIoController} = require('./_helpers/socket.io-controller')
const USER_PATH = '/user'
const socketController = new SocketIoController(http)

fillDisagio()
app.use(express.json())// for json body parse
    .use(cors())
    .use(require('./controller/auth-controller'))
    .use(USER_PATH,require('./controller/user-controller'))
    .use(USER_PATH,require('./controller/activity-controller')(socketController))
    .use(USER_PATH,require('./controller/chat-controller')(socketController))
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
        /* await authModel.signup({username: '',email : '@speedwagon.com', password: 'Sasso.1997', profile_pic: ''})
        const marco = await activityModel.createActivity({
            creator_username: '',
            name: '',
            description: '',
            date_time: new Date(),
            location: 'Forli',
            latitude: '44.222',
            longitude: '12.040',
            profile_pic: 'https://image.flaticon.com/icons/png/512/1176/1176208.png',
        }, {username: ''})
        await userModel.createActivity({username: ''}, {activity_id: marco._id}) */

        /* await authModel.signup({username: 'Chiara',email : 'chiara@speedwagon.com', password: 'Sasso.1997', profile_pic: 'https://image.flaticon.com/icons/png/512/1176/1176206.png'})
        const ac1 = await activityModel.createActivity({
            creator_username: 'Chiara',
            name: 'Monopoli Africa Gang',
            description: 'Parleremo di un viaggio infinito, Vlad che non torna, gardo che torna steso e Ismam che torna rotolando. Ne vedremo delle belle amici e amiche. Davie piccolo paccaro bastardo, viva il COMUNISMAM.',
            date_time: new Date(),
            location: 'Forli',
            latitude: '44.222',
            longitude: '12.040',
            profile_pic: 'https://image.flaticon.com/icons/png/512/1176/1176206.png',
        }, {username: 'Chiara'})
        await userModel.createActivity({username: 'Chiara'}, {activity_id: '60e3176acfe15a26e4580e74'}) */

        /* await authModel.signup({username: 'Vlad',email : 'vlad@speedwagon.com', password: 'Sasso.1997', profile_pic: 'https://image.flaticon.com/icons/png/512/1176/1176207.png'})
        const vlad = await activityModel.createActivity({
            creator_username: 'Vlad',
            name: 'Rimini fa SCHIFO',
            description: 'In sto posto chiamano crescione cassone, sale il crimine, ma d altronde non puoi dire Rimini se non dici crimini',
            date_time: new Date(),
            location: 'Forli',
            latitude: '44.222',
            longitude: '12.040',
            profile_pic: 'https://image.flaticon.com/icons/png/512/1176/1176207.png',
        }, {username: 'Vlad'})
        await userModel.createActivity({username: 'Vlad'}, {activity_id: vlad._id}) */

       /*  await authModel.signup({username: 'Marcotto',email : 'marcotto@speedwagon.com', password: 'Sasso.1997', profile_pic: 'https://image.flaticon.com/icons/png/512/1176/1176208.png'})
        const marco = await activityModel.createActivity({
            creator_username: 'Marcotto',
            name: 'Solarolo bois',
            description: 'Il territorio di Solarolo fu abitato fin dalla preistoria. Nella campagna solarolese è stato rinvenuto un villaggio dell\'Età del Bronzo. Il sito occupava l\'area di sette ettari e fu abitato per un periodo di tempo ragguardevole: quattro secoli, dal 1600 al 1200 a.C. Nel villaggio visse una comunità numerosa, stimata in 400-500 persone, dedite all\'allevamento dei bovini e alla coltivazione dei cereali (frumento, orzo, avena e miglio).',
            date_time: new Date(),
            location: 'Forli',
            latitude: '44.222',
            longitude: '12.040',
            profile_pic: 'https://image.flaticon.com/icons/png/512/1176/1176208.png',
        }, {username: 'Marcotto'})
        await userModel.createActivity({username: 'Marcotto'}, {activity_id: marco._id})
        const marco2 = await activityModel.createActivity({
            creator_username: 'Marcotto',
            name: 'Castelbolognese Jojo Fight',
            description: 'Castel Bolognese rappresenta un tipico esempio di centro di fondazione medievale, eretto per consolidare il dominio di una città su un territorio conteso con altre potenze dei dintorni. Nel XIII secolo Bologna era in forte espansione, sia verso Nord che verso Est. ',
            date_time: new Date(),
            location: 'Forli',
            latitude: '44.222',
            longitude: '12.040',
            profile_pic: 'https://image.flaticon.com/icons/png/512/1176/1176208.png',
        }, {username: 'Marcotto'})
        await userModel.createActivity({username: 'Marcotto'}, {activity_id: marco2._id})
        const marco3 = await activityModel.createActivity({
            creator_username: 'Marcotto',
            name: 'L.U. Steins:GATE',
            description: 'Le nozioni di tempo e viaggio nel tempo sono i temi principali dell\'uscita. Tuttavia anche il concetto di causa ed effetto ha un posto di rilievo nel corso della storia, in quanto il protagonista viaggia all\'indietro nel tempo numerose volte per eseguire azioni differenti nel tentativo di alterare ciò che è successo nel futuro',
            date_time: new Date(),
            location: 'Forli',
            latitude: '44.222',
            longitude: '12.040',
            profile_pic: 'https://image.flaticon.com/icons/png/512/1176/1176208.png',
        }, {username: 'Marcotto'})
        await userModel.createActivity({username: 'Marcotto'}, {activity_id: marco3._id})*/

        /*
        await authModel.signup({username: 'Riccardo',email : 'riccardo@speedwagon.com', password: 'Sasso.1997', profile_pic: 'https://image.flaticon.com/icons/png/512/1018/1018973.png'})
        const rik = await activityModel.createActivity({
            creator_username: 'Riccardo',
            name: 'Io pacco forte',
            description: 'La scatola è un contenitore di forma generalmente parallelepipeda o cilindrica e munito di coperchio usato per riporre o trasportare materiali solidi di vario genere. L\'atto di riporre qualcosa in una scatola viene detto inscatolamento.',
            date_time: new Date(),
            location: 'Forli',
            latitude: '44.222',
            longitude: '12.040',
            profile_pic: 'https://image.flaticon.com/icons/png/512/1018/1018973.png',
        }, {username: 'Riccardo'})
        await userModel.createActivity({username: 'Riccardo'}, {activity_id: rik._id})
        const rik2 = await activityModel.createActivity({
            creator_username: 'Riccardo',
            name: 'Sushi',
            description: 'Il sushi è un insieme di piatti tipici della cucina giapponese a base di riso insieme ad altri ingredienti come pesce, alghe nori o uova. Il ripieno è crudo o in alcune varianti cotto e può essere servito appoggiato sul riso, arrotolato in una striscia di alga, disposto in rotoli di riso o inserito in una piccola tasca di tofu.',
            date_time: new Date(),
            location: 'Forli',
            latitude: '44.222',
            longitude: '12.040',
            profile_pic: 'https://image.flaticon.com/icons/png/512/1018/1018973.png',
        }, {username: 'Riccardo'})
        await userModel.createActivity({username: 'Riccardo'}, {activity_id: rik2._id})
        const rik3 = await activityModel.createActivity({
            creator_username: 'Riccardo',
            name: 'Turbo TB',
            description: 'Oltre al ruolo diretto nella produzione del miele, l\'ape è un indicatore biologico della qualità dell\'ambiente e attualmente rappresenta una delle emergenze ecologiche in corso. Il maggior produttore di miele è l\'Argentina che ha ridotto del 27% le sue 75.000 tonnellate annue. In Italia nel 2007 sono morte il 50% delle api, persi 200.000 alveari e 250 milioni di euro nel settore agricolo.',
            date_time: new Date(),
            location: 'Forli',
            latitude: '44.222',
            longitude: '12.040',
            profile_pic: 'https://image.flaticon.com/icons/png/512/1018/1018973.png',
        }, {username: 'Riccardo'})
        await userModel.createActivity({username: 'Riccardo'}, {activity_id: rik3._id}) */




        /*
                await userModel.createNotification({username: "ismo"},{activityName: "activity sas", activityOwner: "coglione a caso", message: "sas sei un po' un coglione"})
                await userModel.createNotification({username: "ismo"},{activityName: "activity sas", activityOwner: "coglione a caso", message: "sas sei un po' un coglione2"})
                await userModel.createNotification({username: "ismo"},{activityName: "activity sas", activityOwner: "coglione a caso", message: "sas sei un po' un coglione3"})
                await userModel.createNotification({username: "ismo"},{activityName: "activity sas", activityOwner: "coglione a caso", message: "sas sei un po' un coglione4"})
                await userModel.createNotification({username: "ismo"},{activityName: "activity sas", activityOwner: "coglione a caso", message: "sas sei un po' un coglione5"})
                await userModel.createNotification({username: "ismo"},{activityName: "activity sas", activityOwner: "coglione a caso", message: "sas sei un po' un coglione6"})*/
        /*    {name : 'sesso non protetto', description: 'Marco é il nuovo re del server disord, Ismam abdica. Viva la monarchia, morte agli infedeli.', date_time: '2021-05-23 12:45'},{username : 'ismo'})
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
        await userModel.createParticipation({username : 'Jotaro'},{activity_id : ismoActivity._id})*/
    }catch (e) {
        console.log(e)
    }
}
