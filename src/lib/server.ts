import * as express from 'express'
import * as http from 'http'
import * as socket from 'socket.io'
import * as bodyParser from 'body-parser'

export default class Server {
  private _app: express.Application
  private _server: http.Server
  private _ws: SocketIO.Server

  constructor () {
    this._app = express()
    this._app.use(bodyParser.json({extended: true}))
    this._server = http.createServer(this._app)
    this._ws = socket(this._server)
  }

  run (port: number, cb?: Function) {
    this._app.post('/sessions', (req, res) => {

    })

    this._app.delete('/sessions/:id', (req, res) => {

    })

    this._app.post('/sessions/:id/events', (req, res) => {
      console.log(req.body)
      res.json({status: 'ok'})
    })

    this._ws.on('connection', function (client) {
      client.on('startCapture', (res) => {

      })

      client.on('endCapture', (res) => {

      })

      client.on('complete', (res) => {

      })
    })

    this._server.listen(port, cb)
  }
}
