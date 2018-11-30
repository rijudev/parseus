import { IFieldOptions, FieldType } from '../decorators/options/field-options'

export abstract class Parse<T> {
  protected fields: IFieldParse

  constructor(protected model: T, protected metadata: IFieldParse) {
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
      if (!fieldTypes.includes(option.type as FieldType)) {
        return acc
      }

      return {
        ...acc,
        [key]: option
      }
    }
  }

  abstract getFieldTypes(): Array<FieldType>
  abstract parse(data: object): T
}

export interface IFieldParse {
  [key: string]: IFieldOptions
}
