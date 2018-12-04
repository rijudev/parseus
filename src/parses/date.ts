import { IFieldParse, ParseFunction, IParseFunction } from '../utils'
import { Parse } from './parse'

export class DateParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse, parser: ParseFunction) {
    super(model, metadata, parser)
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
