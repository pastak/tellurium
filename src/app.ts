import Server from './lib/server'
const server = new Server()

server.run(9000, () => {
  console.log('listening')
})
