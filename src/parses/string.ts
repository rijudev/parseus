import v1 from 'uuid/v1'

import { IFieldParse, ParseFunction, IParseFunction } from '../utils'
import { Parse } from './parse'

export class StringParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse, parser: ParseFunction) {
    super(model, metadata, parser)
  }

  protected getFieldTypes(): ParseFunction {
    return {
      string: this.parseString,
      unique: this.parseUnique
      // combine: parseCombine
    }
  }

  private parseUnique({ key, value, destination }: IParseFunction): string {
    return value || v1()
  }

  private parseString({ key, value, destination }: IParseFunction): string | undefined {
    if (!value) {
      return undefined
    }

    return typeof value === 'string' ? value : `${value}`
  }
}
