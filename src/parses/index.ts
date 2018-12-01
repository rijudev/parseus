import { StringParse } from './string'
import { IFieldParse } from '../utils'
import { NumberParse } from './number'
import { DateParse } from './date'
import { BooleanParse } from './boolean'
import { ObjectParse } from './object'
import { ArrayParse } from './array'

function getParseArray<T>(model: T, metadata: IFieldParse) {
  return [
    new StringParse(model, metadata),
    new NumberParse(model, metadata),
    new DateParse(model, metadata),
    new BooleanParse(model, metadata),
    new ObjectParse(model, metadata),
    new ArrayParse(model, metadata)
  ]
}

export function parseFactory<T>(model: T, metadata: IFieldParse, data: object): T {
  return getParseArray(model, metadata).reduce<T>((_, parser) => parser.parse(data), model)
}

export function mashallFactory<T>(model: T, metadata: IFieldParse): object {
  const obj = {}
  return getParseArray(model, metadata).reduce((_, parser) => parser.marshal(obj), obj)
}
