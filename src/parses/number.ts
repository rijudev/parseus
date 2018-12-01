import { Parse, ParseFunction, IParseFunction } from './parse'
import { IFieldParse } from '../utils'
import { FieldType, IFieldOptions } from '../decorators/options/field-options'

export class NumberParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse) {
    super(model, metadata)
  }

  protected getFieldTypes(): ParseFunction {
    return {
      number: this.parseNumber,
      decimal: this.parseDecimal
    }
  }

  private parseNumber({ key, value, destination }: IParseFunction) {
    if (typeof value === 'number') {
      destination[key] = value
    }

    destination[key] = parseInt(value, 10)
  }

  private parseDecimal({ key, value, options, destination }: IParseFunction) {
    if (typeof value === 'number') {
      destination[key] = value
    }
    const precision = options.precision || 5
    destination[key] = parseFloat(parseFloat(value).toFixed(precision))
  }
}
