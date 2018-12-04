import { PARSEUS_META_KEY } from '../helpers/constant'
import { parseFactory, mashallFactory } from '../parses'
import { IParameterlessConstructor, IFieldParse, ParseFunction } from '../utils'

function getMetadata<T>(obj: T): IFieldParse {
  return Reflect.getMetadata(PARSEUS_META_KEY, obj)
}

export class Parseus<T> {
  static from(json: object): ParseusJSON {
    return new ParseusJSON(json)
  }

  static toJSON<T>(obj: T, model?: IParameterlessConstructor<T>): { [key: string]: any } {
    return new Parseus(model!).toJSON(obj)
  }

  static parseOverrride<T>(parser: ParseFunction, model: IParameterlessConstructor<T>) {
    return new Parseus(model).parseOverride(parser)
  }

  private parser: ParseFunction

  constructor(private model: IParameterlessConstructor<T>) {}

  from(json: object): T {
    return new ParseusJSON(json, this.parser).to(this.model)
  }

  toJSON(obj: T): { [key: string]: any } {
    const metaObj = this.model ? new this.model() : obj
    const metadata = getMetadata(metaObj)
    return mashallFactory(obj, metadata, this.parser)
    // return Parseus.toJSON(obj, this.model)
  }

  parseOverride(parser: ParseFunction) {
    this.parser = parser
    return this
  }
}

class ParseusJSON {
  constructor(private json: object, private parserOverride?: ParseFunction) {}

  to<T>(model: IParameterlessConstructor<T>): T {
    const obj = new model()
    const metadata = getMetadata(obj)
    return parseFactory(obj, metadata, this.json, this.parserOverride) as T
  }
}
