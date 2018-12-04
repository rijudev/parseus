import { StringParse } from './string'
import { IFieldParse, ParseFunction } from '../utils'
import { NumberParse } from './number'
import { DateParse } from './date'
import { BooleanParse } from './boolean'
import { ObjectParse } from './object'
import { ArrayParse } from './array'

function getParseArray<T>(model: T, metadata: IFieldParse, parser: ParseFunction) {
  return [
    new StringParse(model, metadata, parser),
    new NumberParse(model, metadata, parser),
    new DateParse(model, metadata, parser),
    new BooleanParse(model, metadata, parser),
    new ObjectParse(model, metadata, parser),
    new ArrayParse(model, metadata, parser)
  ]
}

export function parseFactory<T>(
  model: T,
  metadata: IFieldParse,
  data: object,
  parser?: ParseFunction
): T {
  return getParseArray(model, metadata, parser!).reduce<T>((_, parser) => parser.parse(data), model)
}

export function mashallFactory<T>(model: T, metadata: IFieldParse, parser?: ParseFunction): object {
  const obj = {}
  return getParseArray(model, metadata, parser!).reduce((_, parser) => parser.marshal(obj), obj)
}
