import { IFieldParse, ParseFunction, IParseFunction } from '../utils'
import { Parse } from './parse'

export class BooleanParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse, parser: ParseFunction) {
    super(model, metadata, parser)
  }

  protected getFieldTypes(): ParseFunction {
    return {
      boolean: this.parseBoolean
    }
  }

  private parseBoolean({ value }: IParseFunction) {
    return Boolean(value)
  }
}
