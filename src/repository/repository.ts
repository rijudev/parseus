import { PARSEUS_META_KEY } from '../helpers/constant'
import { parseFactory } from '../parses'
import { IParameterlessConstructor } from '../utils'

export class Parseus {
  static from(json: object): ParseusJSON {
    return new ParseusJSON(json)
  }

  static toJSON<T>(obj: T): object {
    return {}
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
