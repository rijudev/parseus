import { Parse } from './parse'
import { IFieldParse, ParseFunction, IParseFunction } from '../utils'
import { FieldType, IFieldOptions } from '../decorators/options/field-options'
import { DEFAULT_PRECISION } from '../helpers/constant'

export class NumberParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse, parser: ParseFunction) {
    super(model, metadata, parser)
  }

  protected getFieldTypes(): ParseFunction {
    return {
      number: this.parseNumber,
      decimal: this.parseDecimal
    }
  }

  private parseNumber({ key, value, destination }: IParseFunction) {
    return typeof value === 'number' ? value : parseInt(value, 10)
  }

  private parseDecimal({ key, value, options, destination }: IParseFunction) {
    if (typeof value === 'number') {
      return value
    }
    const precision = options.precision || DEFAULT_PRECISION
    return parseFloat(parseFloat(value).toFixed(precision))
  }
}
