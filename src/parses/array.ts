import { Parse, ParseFunction } from './parse'
import { IFieldParse } from '../utils'
import { IFieldOptions } from '../decorators/options/field-options'
import Parseus from '../parseus'

export class ArrayParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse) {
    super(model, metadata)
    this.parseArray = this.parseArray.bind(this)
  }

  protected getFieldTypes(): ParseFunction {
    return {
      array: this.parseArray
    }
  }

  private parseArray(key: string, value: any, options: IFieldOptions, data: any) {
    if (!Array.isArray(value)) return
    const newModel = value.reduce((acc: any[], item: any) => {
      const newValue = Parseus.from(item).to(options.factory!)
      acc.push(newValue)
      return acc
    }, [])

    this.model[key] = newModel
  }
}
