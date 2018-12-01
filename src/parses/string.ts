import { v1 } from 'uuid'

import { IFieldParse } from '../utils'
import { FieldType, IFieldOptions } from '../decorators/options/field-options'
import { Parse, ParseFunction } from './parse'

export class StringParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse) {
    super(model, metadata)
    this.parseString = this.parseString.bind(this)
    this.parseUnique = this.parseUnique.bind(this)
  }

  protected getFieldTypes(): ParseFunction {
    return {
      string: this.parseString,
      unique: this.parseUnique,
      combine: undefined
    }
  }

  private parseUnique(key: string) {
    if (!this.model[key]) {
      this.model[key] = v1()
    }
  }

  private parseString(key: string, value: any) {
    if (!value) {
      return
    }

    if (typeof value === 'string') {
      this.model[key] = value
    }

    this.model[key] = `${value}`
  }
}
