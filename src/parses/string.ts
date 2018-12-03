import { v1 } from 'uuid'

import { IFieldParse } from '../utils'
import { Parse, ParseFunction, IParseFunction } from './parse'

export class StringParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse) {
    super(model, metadata)
  }

  protected getFieldTypes(): ParseFunction {
    return {
      string: parseString,
      unique: parseUnique
      // combine: parseCombine
    }
  }
}

// export function parseCombine({  }: IParseFunction) {
//   // TODO: implement
// }

export function parseUnique({ key, value, destination }: IParseFunction) {
  destination[key] = value || v1()
}

export function parseString({ key, value, destination }: IParseFunction) {
  if (!value) {
    return
  }

  if (typeof value === 'string') {
    destination[key] = value
  }

  destination[key] = `${value}`
}
