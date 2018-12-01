import { IFieldParse } from '../utils'
import { FieldType, IFieldOptions } from '../decorators/options/field-options'

export type ParseFunction = {
  [type in FieldType]?: (key: string, value: any, options: IFieldOptions, data: any) => void
}

export abstract class Parse<T> {
  protected fields: IFieldParse
  protected model: any

  constructor(protected objectClass: T, protected metadata: IFieldParse) {
    this.model = objectClass
    this.findAndSetFields()
  }

  private findAndSetFields() {
    const fieldTypes = Object.keys(this.getFieldTypes()) as Array<FieldType>
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
      const options = this.fields[key]
      if (options.transformer) {
        // TODO: Here Transformer
        // field.transformer.to(data)
        return
      }

      const value: any = (data as any)[options.name!] || options.default
      if (!value && options.type !== 'unique') return

      const fieldFunc = this.getFieldTypes()[options.type!]
      if (!fieldFunc) return
      fieldFunc(key, value, options, data)
    })
    return this.model
  }

  // protected abstract parseKey(key: string, option: IFieldOptions, data: object): void
  protected abstract getFieldTypes(): ParseFunction
}
