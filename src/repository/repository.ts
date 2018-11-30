import { PARSEUS_META_KEY } from '../helpers/constant'
import { parseFactory } from '../parses'
import { Parse } from '../utils'

export interface IParameterlessConstructor<T> {
  new (): T
}

export class Parseus {
  static fromJSON(json: object) {
    return new ParseusJSON(json)
  }
}

class ParseusJSON {
  constructor(private json: object) {}

  to<T>(model: IParameterlessConstructor<T>): T {
    const obj = new model()
    const metadata = Reflect.getMetadata(PARSEUS_META_KEY, obj)
    return parseFactory(obj, metadata, this.json)
  }
}
