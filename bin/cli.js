#!/usr/bin/env node

const tellurium = require('../index').default
const server = new tellurium.Server()
server.listen()
