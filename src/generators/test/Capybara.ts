import Generator from '../../lib/Generator'
import RubyGenerator from '../lang/ruby'

export default class CapybaraGenerator extends Generator {
  lang: RubyGenerator
  options: {}

  constructor (opts = {}) {
    super(opts)
    this.lang = new RubyGenerator(opts['ruby'])
  }

  click (event, locator) {
    var call = 'click_on'
    var loc

    switch (event.target.tagName) {
      case 'a':
        call = 'click_link'
        loc = locator('id', 'linkText')
        break
      case 'button':
      case 'input':
        call = 'click_button'
        loc = locator('id', 'value')
        break
    }

    return this.lang.method(call, {}, loc)
  }

  fillIn (event, locator) {
    return this.lang.method('fill_in', { with: event.target.value }, locator('id', 'value'))
  }
}

Generator.register('capybara', CapybaraGenerator)
