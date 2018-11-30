import { Transformer } from './transformer'

export type FieldType =
  | 'string'
  | 'number'
  | 'decimal'
  | 'boolean'
  | 'unique'
  | 'date'
  | 'date-time'
  | 'combine'
  | 'array'
  | 'object'

/**
 * Describe all field's options
 */
export interface IFieldOptions {
  /**
   * Field type. Must be one of the values from the FieldType
   */
  type?: FieldType

  /**
   * Field name in JSON
   */
  name?: string

  /**
   * Field type's length.
   */
  length?: number

  /**
   * Indicates if field's value can not be set to null or undefined when marshal JSON
   */
  isRequired?: boolean

  /**
   * Indicates if field's value is ignored when marshal JSON
   */
  isVirtual?: boolean

  /**
   * Indicates the initial field's value
   */
  default?: any

  /**
   * The precision for a decimal (exact numeric) field (applies only for decimal column), which is the maximum
   * number of digits that are stored for the values.
   */
  precision?: number

  /**
   * Specifies a value transformer that is to be used to (un)marshal
   * this column when (un)marshal.
   */
  transformer?: Transformer
}
