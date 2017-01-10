#!/usr/bin/env node

const tellurium = require('../index').default
const server = new tellurium.Server()

server.run(9000, () => {
  console.log('listening')
})
