import { IFieldParse } from '../utils'
import { Parse, ParseFunction, IParseFunction } from './parse'
import { IFieldOptions } from '../decorators/options/field-options'
import Parseus from '../parseus'

export class ObjectParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse) {
    super(model, metadata)
  }

  protected getFieldTypes(): ParseFunction {
    return {
      object: this.parseObject
    }
  }

  private parseObject({ key, value, options, destination, toJSON }: IParseFunction) {
    if (!options.factory || typeof options.factory !== 'function') {
      return
    }

    const newModel = toJSON
      ? Parseus.toJSON(value, options.factory)
      : Parseus.from(value).to(options.factory!)
    destination[key] = newModel
  }
}
