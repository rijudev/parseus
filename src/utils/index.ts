import { IFieldOptions, FieldType } from '../decorators/options/field-options'

export interface IFieldParse {
  [key: string]: IFieldOptions
}

export interface IParameterlessConstructor<T> {
  new (): T
}

export interface IParseFunction {
  key: string
  value: any
  options: IFieldOptions
  data: any
  destination: any
  isEncoding?: boolean
}

export type ParseFunction = { [type in FieldType]?: (options: IParseFunction) => any }
