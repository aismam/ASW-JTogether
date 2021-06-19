class NotificationController {
    _NOTIFICATIONS_CHANNEL_NAME = 'notifications'
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
            socket.on(this._REGISTRATION_CHANNEL_NAME, userId => {
                this._socketToUser.set(socket,userId)
                this._userToSocket.set(userId,socket)
            })
            socket.on('disconnect',() => {
                this._userToSocket.delete(this._socketToUser.get(socket))
                this._socketToUser.delete(socket)
            })
        })
    }
    userIsOnline(userId){
        return this._userToSocket.has(userId)
    }

    notify(userId,msg){
        if(this.userIsOnline(userId)){
            this._userToSocket.get(userId).emit(this._NOTIFICATIONS_CHANNEL_NAME,msg)
        }
    }
}

module.exports = {SocketIoController: NotificationController}
