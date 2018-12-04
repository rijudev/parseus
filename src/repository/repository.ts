import { PARSEUS_META_KEY } from '../helpers/constant'
import { parseFactory, mashallFactory } from '../parses'
import { IParameterlessConstructor, IFieldParse } from '../utils'

function getMetadata<T>(obj: T): IFieldParse {
  return Reflect.getMetadata(PARSEUS_META_KEY, obj)
}

export class Parseus<T> {
  static from(json: object): ParseusJSON {
    return new ParseusJSON(json)
  }

  static toJSON<T>(obj: T, model?: IParameterlessConstructor<T>): { [key: string]: any } {
    const metaObj = model ? new model() : obj
    const metadata = getMetadata(metaObj)
    return mashallFactory(obj, metadata)
  }

  constructor(private model: IParameterlessConstructor<T>) {}

  from(json: object): T {
    return Parseus.from(json).to(this.model)
  }

  toJSON(obj: T): { [key: string]: any } {
    return Parseus.toJSON(obj, this.model)
  }
}

class ParseusJSON {
  constructor(private json: object) {}

  to<T>(model: IParameterlessConstructor<T>): T {
    const obj = new model()
    const metadata = getMetadata(obj)
    return parseFactory(obj, metadata, this.json) as T
  }
}
