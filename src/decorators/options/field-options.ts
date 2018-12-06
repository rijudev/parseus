import { ITransformer } from './transformer'
import { IParameterlessConstructor } from '../../utils'

/**
 * Field Types to encode/decode
 */
export type FieldType =
  | 'string'
  | 'number'
  | 'decimal'
  | 'boolean'
  | 'unique'
  | 'date'
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
   * Indicates if field's value can not be set to null or undefined when marshall JSON
   */
  isRequired?: boolean

  /**
   * Indicates if field's value is ignored when marshall JSON
   */
  isVirtual?: boolean

  /**
   * Indicates the initial field's value
   */
  default?: any

  /**
   * Indicates if field's value is read only
   */
  readOnly?: boolean

  /**
   * The scale for a decimal (exact numeric) field (applies only for decimal field), which represents the number
   * of digits to the right of the decimal point
   */
  fixed?: number

  /**
   * Specifies a value transformer that is to be used to (un)marshal
   * this field when (un)marshal.
   */
  transformer?: ITransformer

  /**
   * Indicate the field's constructor class of target
   */
  factory?: IParameterlessConstructor<any>
}
