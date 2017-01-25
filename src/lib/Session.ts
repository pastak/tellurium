import Operation from './Operation'
import Generator from './Generator'

export default class Session {
  private _id: number
  private _generator: Generator
  private _operations: Operation[]

  constructor (generatorName: string) {
    this._generator = Generator.get(generatorName)
    this._operations = []
  }

  get generator () {
    return this._generator
  }

  get operations () {
    return this._operations
  }

  get id () {
    return this._id
  }

  save () {
    Session.add(this)
  }

  private static _sessions: Session[]
  private static _lastId: number

  static initialize() {
    this._sessions = []
    this._lastId = 0
  }

  static get all () {
    return this._sessions
  }

  static add (session: Session) {
    const nextId = this.nextId()
    session._id = nextId
    this.all.push(session)

    return session
  }

  static find (id: number): Session {
    return this._sessions.find((s) => s.id === id)
  }

  static delete (id: number) {
    const target = this.find(id)
    const targetIndex = this.all.indexOf(target)
    this.all.splice(targetIndex, 1)
    target._id = undefined

    return target
  }

  private static nextId (): number {
    this._lastId++
    return this._lastId
  }
}

Session.initialize()
