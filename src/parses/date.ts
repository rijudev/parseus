import { IFieldParse } from '../utils'
import { Parse, ParseFunction, IParseFunction } from './parse'

export class DateParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse) {
    super(model, metadata)
  }

  protected getFieldTypes(): ParseFunction {
    return {
      date: this.parseDate
    }
  }

  private parseDate({ key, value, destination }: IParseFunction) {
    return new Date(value)
  }
}
