import { v1 } from 'uuid'

import { IFieldParse } from '../utils'
import { FieldType, IFieldOptions } from '../decorators/options/field-options'
import { Parse } from './parse'

export class StringParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse) {
    super(model, metadata)
  }

  protected getFieldTypes(): Array<FieldType> {
    return ['string', 'unique', 'combine']
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

  protected parseKey(key: string, option: IFieldOptions, data: any): void {
    if (option.type === 'unique') {
      this.parseUnique(key)
      return
    }

    const value: any = data[option.name!]
    if (option.type === 'string') {
      this.parseString(key, value)
      return
    }
  }
}
