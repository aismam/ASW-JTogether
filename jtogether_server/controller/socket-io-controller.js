class SocketIoController{
    constructor(http) {
        this.io = require('socket.io')(http, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        })
        this.io.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
    }
    notify(userId,msg){
        this.io.emit(userId,msg)
    }
}

module.exports = {SocketIoController}
