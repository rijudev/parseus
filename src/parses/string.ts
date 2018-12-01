import { v1 } from 'uuid'

import { IFieldParse } from '../utils'
import { FieldType, IFieldOptions } from '../decorators/options/field-options'
import { Parse, ParseFunction, IParseFunction } from './parse'

export class StringParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse) {
    super(model, metadata)
  }

  protected getFieldTypes(): ParseFunction {
    return {
      string: this.parseString,
      unique: this.parseUnique,
      combine: undefined
    }
  }

  private parseUnique({ key, destination }: IParseFunction) {
    if (!destination[key]) {
      destination[key] = v1()
    }
  }

  private parseString({ key, value, destination }: IParseFunction) {
    if (!value) {
      return
    }

    if (typeof value === 'string') {
      destination[key] = value
    }

    destination[key] = `${value}`
  }
}
