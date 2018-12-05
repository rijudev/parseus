import { PARSEUS_META_KEY } from '../helpers/constant'
import { parseFactory, mashallFactory } from '../parses'
import { IParameterlessConstructor, IFieldParse, ParseFunction } from '../utils'
import { getMetadata } from '../helpers/metadata'

function getMetadataParse<T>(obj: T): IFieldParse {
  return getMetadata(PARSEUS_META_KEY, obj)
}

export class Parseus<T> {
  static decode(json: object): ParseusJSON {
    return new ParseusJSON(json)
  }

  static encode<T>(obj: T, model?: IParameterlessConstructor<T>): { [key: string]: any } {
    return new Parseus(model!).encode(obj)
  }

  static parseOverrride<T>(parser: ParseFunction, model: IParameterlessConstructor<T>) {
    return new Parseus(model).parseOverride(parser)
  }

  private parser: ParseFunction

  constructor(private model: IParameterlessConstructor<T>) {}

  decode(json: object): T {
    return new ParseusJSON(json, this.parser).to(this.model)
  }

  encode(obj: T): { [key: string]: any } {
    const metaObj = this.model ? new this.model() : obj
    const metadata = getMetadataParse(metaObj)
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
    const metadata = getMetadataParse(obj)
    return parseFactory(obj, metadata, this.json, this.parserOverride)
  }
}
