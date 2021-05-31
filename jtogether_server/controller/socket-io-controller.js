class SocketIoController{
    constructor(http) {
        this.io = require('socket.io')(http, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        })
    }
    notify(userId,msg){
        this.io.emit(userId,msg)
    }
}

module.exports = {SocketIoController}
