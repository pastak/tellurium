import Operation from './Operation'
import capybaraGenerator from '../generators/capybara'

type GeneratorFunc = (ope: Operation) => string
type GeneratorFuncMap = { [opeType: string]: GeneratorFunc }

class Generator {
  private _generatorFuncs: GeneratorFuncMap

  constructor (generatorFuncs: GeneratorFuncMap) {
    this._generatorFuncs = generatorFuncs
  }

  generate (operations: Operation[]): string {
    var code = ''

    for (const ope of operations) {
      const line = `${this._generatorFuncs[ope.type](ope)}\n`
      code = code.concat(line)
    }

    return code
  }

  private static _generators: { [generatorName: string]: Generator }

  static initialize () {
    this._generators = {}
  }

  static register (name: string, generatorFuncs: GeneratorFuncMap) {
    this._generators[name] = new Generator(generatorFuncs)
  }

  static get (name: string) {
    return this._generators[name]
  }
}

Generator.initialize()
Generator.register('capybara', capybaraGenerator)

export default Generator
