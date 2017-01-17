import Operation from '../lib/Operation'

export default {
  clickElement (operation: Operation) {
    return `click_on "${operation.locator}"`
  }
}
