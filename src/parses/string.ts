import { Parse, IFieldParse } from '../utils'
import { FieldType } from '../decorators/options/field-options'

export class StringParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse) {
    super(model, metadata)
  }

  getFieldTypes(): Array<FieldType> {
    return ['string', 'unique', 'combine']
  }

  parse(data: object): T {
    console.log(data)
    return this.model
  }
}
