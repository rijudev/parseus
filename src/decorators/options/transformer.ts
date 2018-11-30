/**
 * Interface for objects that deal with (un)marshalling data.
 */
export interface Transformer {
  /**
   * Used to marshal data when writing to the new JSON.
   */
  to?(value: any): any
  /**
   * Used to unmarshal data when reading from the JSON .
   */
  from?(value: any): any
}
