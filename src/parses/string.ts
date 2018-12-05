import * as uuid from 'uuid'

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
    return value || uuid.v1()
  }

  private parseString({ key, value, destination }: IParseFunction): string | undefined {
    if (!value) {
      return undefined
    }

    return typeof value === 'string' ? value : `${value}`
  }
}
