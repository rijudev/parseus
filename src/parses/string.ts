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

  private parseUnique({ key, value, destination }: IParseFunction) {
    destination[key] = value || v1()
  }

  private parseString({ key, value, destination }: IParseFunction) {
    if (!value) {
      return
    }

    if (typeof value === 'string') {
      destination[key] = value
    }

    destination[key] = `${value}`
  }
}

// export function parseCombine({  }: IParseFunction) {
//   // TODO: implement
// }
