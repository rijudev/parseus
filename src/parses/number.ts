import { Parse } from './parse'
import { IFieldParse } from '../utils'
import { FieldType, IFieldOptions } from '../decorators/options/field-options'

export class NumberParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse) {
    super(model, metadata)
  }

  protected getFieldTypes(): Array<FieldType> {
    return ['number', 'decimal']
  }

  private parseNumber(key: string, value: any) {
    if (typeof value === 'number') {
      this.model[key] = value
    }

    this.model[key] = parseInt(value, 10)
  }

  protected parseKey(key: string, option: IFieldOptions, data: any): void {
    const value: any = data[option.name!]
    if (!value) return

    if (option.type === 'number') {
      this.parseNumber(key, value)
      return
    }
  }
}
