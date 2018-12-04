import { IFieldParse } from '../utils'
import { Parse, ParseFunction, IParseFunction } from './parse'

export class BooleanParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse) {
    super(model, metadata)
  }

  protected getFieldTypes(): ParseFunction {
    return {
      boolean: this.parseBoolean
    }
  }

  private parseBoolean({ key, value, destination }: IParseFunction) {
    return Boolean(value)
  }
}
