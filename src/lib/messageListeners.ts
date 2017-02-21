import * as minimatch from 'minimatch'
import * as requests from './requests'
import Generator from './Generator'
import EventStream from './EventStream'

const eventStream = new EventStream
const targets = {}

export function createSession (socket, data) {
  const configFile = data.configFile
  const config = data.config
  var target = targets[configFile]

  if (!target) {
    const generator = Generator.get(config.generator.name, config.generator.options)

    target = targets[configFile] = {
      config: config,
      generator: generator
    }

    eventStream.on('operation', (ope) => {
      socket.emit('complete', { code: generator.generate(ope) })
    })

    console.log(target)
  }
}

export function destroySession (socket, data) {
  // console.log(data, Session.all)
  // const session = Session.find(data.sessionId)
  // const code = session.generate()

  // socket.emit('complete', { message: 'complete', code: code })
}

export function detectEvent (socket, data) {
  var matchedTarget = null

  for (const configFile in targets) {
    const target = targets[configFile]

    if (minimatch(data.url, target.config.url)) {
      matchedTarget = targets[configFile]
      break
    }
  }

  if (matchedTarget) eventStream.push(data.event)
}

export function recordingStarted (socket, data) {
  console.log(data)
}
