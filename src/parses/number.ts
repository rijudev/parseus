import { Parse, ParseFunction } from './parse'
import { IFieldParse } from '../utils'
import { FieldType, IFieldOptions } from '../decorators/options/field-options'

export class NumberParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse) {
    super(model, metadata)
    this.parseDecimal = this.parseDecimal.bind(this)
    this.parseNumber = this.parseNumber.bind(this)
  }

  protected getFieldTypes(): ParseFunction {
    return {
      number: this.parseNumber,
      decimal: this.parseDecimal
    }
  }

  private parseNumber(key: string, value: any) {
    if (typeof value === 'number') {
      this.model[key] = value
    }

    this.model[key] = parseInt(value, 10)
  }

  private parseDecimal(key: string, value: any, options: IFieldOptions) {
    if (typeof value === 'number') {
      this.model[key] = value
    }
    const precision = options.precision || 5
    this.model[key] = parseFloat(parseFloat(value).toFixed(precision))
  }
}
