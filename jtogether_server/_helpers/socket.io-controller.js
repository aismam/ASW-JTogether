class SocketIoController {
    _socketToUser = new Map()
    _userToSocket = new Map()

    constructor(http, writeMessage) {
        this.io = require('socket.io')(http, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        })
        this.io.on('connection',(socket) =>{
            /* notifications */
            socket.on('registration', username => {
                this._socketToUser.set(socket,username)
                this._userToSocket.set(username,socket)
            })
            socket.on('disconnect',() => {
                this._userToSocket.delete(this._socketToUser.get(socket))
                this._socketToUser.delete(socket)
            })
            /* messaging */
            /*socket.on('join-room',roomId => {
                socket.on(roomId,message => {
                    this.io.emit(roomId,message)
                })
            })*/
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

    sendMessage(roomId,message){
        this.io.emit(roomId,message)
    }
}
module.exports = {SocketIoController}
