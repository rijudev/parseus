import { IFieldParse } from '../utils'
import { Parse, ParseFunction } from './parse'

export class DateParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse) {
    super(model, metadata)
    this.parseDate = this.parseDate.bind(this)
  }

  protected getFieldTypes(): ParseFunction {
    return {
      date: this.parseDate
    }
  }

  private parseDate(key: string, value: any) {
    this.model[key] = new Date(value)
  }
}
