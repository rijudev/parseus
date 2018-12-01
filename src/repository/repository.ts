import { PARSEUS_META_KEY } from '../helpers/constant'
import { parseFactory, mashallFactory } from '../parses'
import { IParameterlessConstructor, IFieldParse } from '../utils'

function getMetadata<T>(obj: T): IFieldParse {
  return Reflect.getMetadata(PARSEUS_META_KEY, obj)
}

export class Parseus {
  static from(json: object): ParseusJSON {
    return new ParseusJSON(json)
  }

  static toJSON<T>(obj: T): object {
    const metadata = getMetadata(obj)
    return mashallFactory(obj, metadata)
  }
}

class ParseusJSON {
  constructor(private json: object) {}

  to<T>(model: IParameterlessConstructor<T>): T {
    const obj = new model()
    const metadata = getMetadata(obj)
    return parseFactory(obj, metadata, this.json)
  }
}
