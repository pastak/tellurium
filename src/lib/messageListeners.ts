import Session from './Session'
import * as requests from './requests'
import Generator from './Generator'

export function createSession (socket, data: requests.CreateSession, ack) {
  const session = new Session(data.generator)
  session.save()
  socket.emit('startCapture', { sessionId: session.id })

  ack({ message: 'success', sessionId: session.id })
}

export function destroySession (socket, data) {
  console.log(data, Session.all)
  const session = Session.find(data.sessionId)
  const code = session.generate()

  socket.emit('complete', { message: 'complete', code: code })
}

export function createOperation (socket, data) {
  const session = Session.find(data.sessionId)
  session.operations.push(data.operation)
  console.log(data) // 操作データを蓄積
}
