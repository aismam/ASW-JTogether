const express = require('express')
const router = express.Router()

module.exports = http => {
    router.post('/mannaggia',((req, res) => {
        const bo = new SocketIoController(http)
        bo.notify('ismo sasso','sei un sasso')
        res.send("mandato")
    }))
    return router
}

class SocketIoController{
    constructor(http) {
        this.io = require('socket.io')(http)
    }
    notify(userId,msg){
        this.io.to(userId).emit(msg)
    }
}
