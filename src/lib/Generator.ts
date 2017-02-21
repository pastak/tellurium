import * as event from 'eventemitter2'
import * as Rx from 'rxjs/Rx'
import LanguageGenerator from './LanguageGenerator'

type Constructor = new(...args: any[]) => any

export default class Generator {
  options: {}

  constructor (options) {
    this.options = options
  }

  generate (operation) {
    if (!this[operation.type]) {
      console.error('Unknown operation:', operation)
      return
    }
    return this[operation.type](operation.event, this.locator.bind(this, operation.event.locators))
  }

  locator (locators, ...types: string[]) {
    const availableType = types.find((type) => locators[type])
    const locator = locators[availableType]

    return locator.value
  }

  private static generators: { [generatorName: string]: Constructor }

  static initialize () {
    this.generators = {}
  }

  static register (name: string, generator: Constructor) {
    this.generators[name] = generator
  }

  static get (name: string, opts: {}): Generator {
    const ctor = this.generators[name]
    return new ctor(opts)
  }
}

Generator.initialize()
