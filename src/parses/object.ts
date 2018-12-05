import { IFieldParse, ParseFunction, IParseFunction } from '../utils'
import { Parse } from './parse'
import Parseus from '../parseus'

export class ObjectParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse, parser: ParseFunction) {
    super(model, metadata, parser)
  }

  protected getFieldTypes(): ParseFunction {
    return {
      object: this.parseObject
    }
  }

  private parseObject({ key, value, options, destination, toJSON }: IParseFunction) {
    if (!options.factory || typeof options.factory !== 'function') {
      return undefined
    }

    const newModel = toJSON
      ? Parseus.encode(value, options.factory)
      : Parseus.decode(value).to(options.factory!)
    return newModel
  }
}
