import { PARSEUS_META_KEY } from '../helpers/constant'
import { parseFactory, mashallFactory } from '../parses'
import { IParameterlessConstructor, IFieldParse, ParseFunction } from '../utils'
import { getMetadata } from '../helpers/metadata'

/**
 * Returns object metadata from model using our custom PARSEUS_META_KEY
 * @param {T} obj
 */
function getMetadataParse<T>(obj: T): IFieldParse {
  return getMetadata(PARSEUS_META_KEY, obj)
}

/**
 * Encoder class
 */
export class Parseus<T> {
  /**
   * Returns a decoder instance ready to decode into a Model
   * @param {object} json
   * @returns {Decoder}
   */
  static decode(json: object): Decoder {
    return new Decoder(json)
  }

  /**
   * Returns an encoded object
   * @param {T} obj
   * @param {IParameterlessConstructor<T>} model
   */
  static encode<T>(obj: T, model?: IParameterlessConstructor<T>): { [key: string]: any } {
    return new Parseus(model!).encode(obj)
  }

  /**
   * Returns a enconde instance with custom parser types declarations ready to encode into an new object
   * @param {ParseFunction} parser
   * @param {IParameterlessConstructor<T>} model
   * @returns {Parseus<T>}
   */
  static parseOverrride<T>(parser: ParseFunction, model: IParameterlessConstructor<T>): Parseus<T> {
    return new Parseus(model, parser)
  }

  constructor(private model: IParameterlessConstructor<T>, private parser?: ParseFunction) {}

  /**
   * Returns a decoded model instance with their fields populated
   * @param {object} json
   * @returns {T} model instance
   */
  decode(json: object): T {
    return new Decoder(json, this.parser).to(this.model)
  }

  /**
   * Returns an encoded object
   * @param {T} obj
   * @returns {object}
   */
  encode(obj: T): { [key: string]: any } {
    const metaObj = this.model ? new this.model() : obj
    const metadata = getMetadataParse(metaObj)
    return mashallFactory({
      metadata,
      model: obj,
      parser: this.parser!
    })
  }
}

/**
 * Decoder Class
 */
class Decoder {
  constructor(private json: object, private parserOverride?: ParseFunction) {}

  /**
   * Returns a decoded model instance
   * @param {IParameterlessConstructor<T>} model
   * @returns {T}
   */
  to<T>(model: IParameterlessConstructor<T>): T {
    const obj = new model()
    const metadata = getMetadataParse(obj)
    return parseFactory({
      metadata,
      model: obj,
      parser: this.parserOverride!,
      data: this.json
    })
  }
}
