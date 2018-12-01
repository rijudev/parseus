import { IFieldParse } from '../utils'
import { Parse, ParseFunction } from './parse'
import { IFieldOptions } from '../decorators/options/field-options'
import Parseus from '../parseus'

export class ObjectParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse) {
    super(model, metadata)
    this.parseObject = this.parseObject.bind(this)
  }

  protected getFieldTypes(): ParseFunction {
    return {
      object: this.parseObject
    }
  }

  private parseObject(key: string, value: any, options: IFieldOptions, data: any) {
    if (!options.factory || typeof options.factory !== 'function') {
      return
    }

    const newModel = Parseus.from(value).to(options.factory!)
    this.model[key] = newModel
  }
}
