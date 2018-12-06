import { StringParse } from './string'
import { IFieldParse, ParseFunction } from '../utils'
import { NumberParse } from './number'
import { DateParse } from './date'
import { BooleanParse } from './boolean'
import { ObjectParse } from './object'
import { ArrayParse } from './array'

interface IParseParams<T> {
  model: T
  metadata: IFieldParse
  parser: ParseFunction
  data?: object
}

function getParseArray<T>({ model, metadata, parser }: IParseParams<T>) {
  return [
    new StringParse(model, metadata, parser),
    new NumberParse(model, metadata, parser),
    new DateParse(model, metadata, parser),
    new BooleanParse(model, metadata, parser),
    new ObjectParse(model, metadata, parser),
    new ArrayParse(model, metadata, parser)
  ]
}

export function parseFactory<T>(params: IParseParams<T>): T {
  return getParseArray(params).reduce<T>((_, parser) => parser.parse(params.data!), params.model)
}

export function mashallFactory<T>(params: IParseParams<T>): { [key: string]: any } {
  return getParseArray(params).reduce((acc, parser) => parser.marshall(acc), {})
}
