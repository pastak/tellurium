import Generator from '../../lib/Generator'
import RubyGenerator from '../lang/ruby'

export default class CapybaraGenerator extends Generator {
  lang: RubyGenerator
  options: {}

  constructor (opts = {}) {
    super(opts)
    this.lang = new RubyGenerator(opts['ruby'])
  }

  click (event) {
    return this.lang.method('click_on', {}, event.locator.value)
  }

  fillIn (event) {
    return this.lang.method('fill_in', { with: event.value }, event.locator.value)
  }
}

Generator.register('capybara', CapybaraGenerator)
