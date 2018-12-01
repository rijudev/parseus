import { IFieldOptions } from '../decorators/options/field-options'

export interface IFieldParse {
  [key: string]: IFieldOptions
}

export interface IParameterlessConstructor<T> {
  new (): T
}
