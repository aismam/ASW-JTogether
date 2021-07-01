class SocketIoController {
    _REGISTRATION_CHANNEL_NAME = 'registration'

    _socketToUser = new Map()
    _userToSocket = new Map()

    constructor(http) {
        this.io = require('socket.io')(http, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        })
        this.io.on('connection',(socket) =>{
            console.log('connesso')
            socket.on(this._REGISTRATION_CHANNEL_NAME, username => {
                this._socketToUser.set(socket,username)
                this._userToSocket.set(username,socket)
                console.log(username)
            })
            socket.on('disconnect',() => {
                this._userToSocket.delete(this._socketToUser.get(socket))
                this._socketToUser.delete(socket)
            })
        })
    }

    userIsOnline(username){
        return this._userToSocket.has(username)
    }

    notify(username,msg){
        if(this.userIsOnline(username)){
            this._userToSocket.get(username).emit(username,msg)
        }
    }
}
module.exports = {SocketIoController}
