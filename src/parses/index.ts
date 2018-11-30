import { StringParse } from './string'
import { Parse, IFieldParse } from '../utils'

export function parseFactory<T>(model: T, metadata: IFieldParse, data: object): T {
  return [new StringParse(model, metadata)].reduce<T>((_, parser) => parser.parse(data), model)
}
