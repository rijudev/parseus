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
   * Used to marshal data when writing to the new JSON.
   */
  to?(params: ITransformerParams): any
  /**
   * Used to unmarshal data when reading from the JSON .
   */
  from?(params: ITransformerParams): any
}
