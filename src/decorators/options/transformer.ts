import { IFieldOptions } from './field-options'

export interface ITransformerParams {
  key: string
  options: IFieldOptions
  data: any
}

/**
 * Interface for objects that deal with (un)marshalling data.
 */
export interface ITransformer {
  /**
   * Used to marshall data when writing to the new JSON.
   */
  to?(params: ITransformerParams): any
  /**
   * Used to unmarshall data when reading from the JSON .
   */
  from?(params: ITransformerParams): any
}
