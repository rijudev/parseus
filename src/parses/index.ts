import { StringParse } from './string'
import { IFieldParse } from '../utils'
import { NumberParse } from './number'

function getParseArray<T>(model: T, metadata: IFieldParse) {
  return [new StringParse(model, metadata), new NumberParse(model, metadata)]
}

export function parseFactory<T>(model: T, metadata: IFieldParse, data: object): T {
  return getParseArray(model, metadata).reduce<T>((_, parser) => parser.parse(data), model)
}

// export function asyncParseFactory<T>(model: T, metadata: IFieldParse, data: object): Promise<T> {

// }
