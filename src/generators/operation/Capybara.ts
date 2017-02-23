import Generator from '../../lib/Generator'
import RubyGenerator from '../lang/Ruby'

export default class CapybaraGenerator extends Generator {
  lang: RubyGenerator
  options: {}

  constructor (opts = {}) {
    super(opts)
    this.lang = new RubyGenerator(opts['ruby'])
  }

  click (event) {
    var call = 'click_on'
    var locator

    switch (event.target.tagName) {
      case 'a':
        locator = this.locator(event, 'linkText', 'title', 'id')
        return this.lang.method('click_link', locator.opts, locator.value)
      case 'button':
      case 'input':
        locator = this.locator(event, 'value', 'title', 'id')
        return this.lang.method('click_button', locator.opts, locator.value)
      default:
        console.error('Unsupported click element:', event)
        return
    }
  }

  change (event) {
    if (event.target.tagName === 'select') {
      const locator = this.locator(event, 'name', 'id')
      return this.lang.method('select', Object.assign({ from: locator.value }, locator.opts), event.selectedOptions[0])
    } else {
      const locator = this.locator(event, 'id', 'name')

      switch (event.target.attributes['type']) {
        case 'radio':
          return this.lang.method('choose', locator.opts, locator.value)
        case 'checkbox':
          if (event.target.checked) {
            return this.lang.method('check', locator.opts, locator.value)
          } else {
            return this.lang.method('uncheck', locator.opts, locator.value)
          }
        case 'file':
          return this.lang.method('attach_file', locator.opts, locator.value, event.target.value)
        default:
          return this.lang.method('fill_in', Object.assign({ with: event.target.value }, locator.opts), locator.value)
      }
    }
  }

  private action (name, args, locator) {
    var opts = Object.assign({}, args)

    if (!locator.isUnique) {
      opts = Object.assign(opts, { match: this.lang.symbolValue('first') })
    }

    return this.lang.method(name, opts, locator.value)
  }

  private locator (event, ...locatorTypes: string[]) {
    const availableType = locatorTypes.find((type) => event.locators[type])
    const locator = event.locators[availableType]

    if (locator.isUnique) {
      return { value: locator.value, opts: {} }
    } else {
      return { value: locator.value, opts: { match: this.lang.symbolValue('first') } }
    }
  }
}

Generator.register('capybara', CapybaraGenerator)
