import * as http from 'http'
import * as socketIO from 'socket.io'
import * as listeners from './messageListeners'

export default class Server {
  private _io: SocketIO.Server

  constructor () {
    this._io = socketIO()
    this._io.on('connection', (socket) => {
      for (const name in listeners) {
        socket.on(name, (data, ack) => {
          listeners[name].call(this, this._io, data, ack)
        })
      }
    })
  }

  get io () {
    return this._io
  }

  listen () {
    this._io.listen(9000)
  }
}
