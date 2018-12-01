import { IFieldParse } from '../utils'
import { Parse, ParseFunction } from './parse'

export class BooleanParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse) {
    super(model, metadata)
    this.parseBoolean = this.parseBoolean.bind(this)
  }

  protected getFieldTypes(): ParseFunction {
    return {
      boolean: this.parseBoolean
    }
  }

  private parseBoolean(key: string, value: any) {
    this.model[key] = Boolean(value)
  }
}
