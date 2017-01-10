export function createSession (socket, data) {
  console.log(data)
  // socket.emit('complete', {message: 'aaa'})
  socket.emit('startCapture', { message: 'hoge' })
}

export function destroySession (socket, data) {
  socket.emit('complete', { message: 'complete' })
}

export function createOperation (socket, data) {
  console.log(data) // 操作データを蓄積
}
