import * as http from 'http'
import * as socket from 'socket.io'
import * as listeners from './messageListeners'

export default class Server {
  private _server: http.Server
  private _ws: SocketIO.Server

  constructor () {
    this._server = http.createServer()
    this._ws = socket(this._server)
    this._ws.on('connection', (socket) => {
      for (const name in listeners) {
        socket.on(name, (data) => {
          listeners[name].call(this, this._ws, data)
        })
      }
    })
  }

  get ws () {
    return this._ws
  }

  run (port: number, cb?: Function) {
    this._server.listen(port, cb)
  }
}
