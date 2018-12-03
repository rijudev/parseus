import { IFieldOptions, FieldType } from '../decorators/options/field-options'
import { Field } from '../decorators/fields/field'

export interface IFieldParse {
  [key: string]: IFieldOptions
}

export interface IParameterlessConstructor<T> {
  new (): T
}
