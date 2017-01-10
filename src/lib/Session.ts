import Operation from './Operation'
import Generator from './Generator'

export default class Session {
  private _generator: Generator
  private _operations: Operation[]

  get generator () {
    return this._generator
  }

  get operations () {
    return this._operations
  }

  generate () {
    
  }
}
