import { v1 } from 'uuid'

import { IFieldParse } from '../utils'
import { Parse, ParseFunction, IParseFunction } from './parse'

export class StringParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse) {
    super(model, metadata)
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

// export function parseCombine({  }: IParseFunction) {
//   // TODO: implement
// }
