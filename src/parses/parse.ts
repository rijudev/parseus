import { IFieldParse } from '../utils'
import { FieldType, IFieldOptions } from '../decorators/options/field-options'

export abstract class Parse<T> {
  protected fields: IFieldParse
  protected model: any

  constructor(protected objectClass: T, protected metadata: IFieldParse) {
    this.model = objectClass
    this.findAndSetFields()
  }

  private findAndSetFields() {
    const fieldTypes = this.getFieldTypes()
    this.fields = Object.keys(this.metadata).reduce<IFieldParse>(
      this.reduceFields(fieldTypes, this.metadata),
      {}
    )
  }

  private reduceFields(fieldTypes: Array<FieldType>, metadata: IFieldParse) {
    return function(acc: IFieldParse, key: string): IFieldParse {
      const option = { ...metadata[key] }
      if (!fieldTypes.includes(option.type!)) {
        return acc
      }

      return {
        ...acc,
        [key]: option
      }
    }
  }

  parse(data: object): T {
    Object.keys(this.fields).forEach(key => {
      const field = this.fields[key]
      if (field.transformer) {
        // TODO: Here Transformer
        // field.transformer.to(data)
        return
      }

      this.parseKey(key, field, data)
    })
    return this.model
  }

  protected abstract parseKey(key: string, option: IFieldOptions, data: object): void
  protected abstract getFieldTypes(): Array<FieldType>
}
