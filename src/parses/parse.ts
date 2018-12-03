import { IFieldParse } from '../utils'
import { FieldType, IFieldOptions } from '../decorators/options/field-options'

export interface IParseFunction {
  key: string
  value: any
  options: IFieldOptions
  data: any
  destination: any
  toJSON?: boolean
}

export type ParseFunction = { [type in FieldType]?: (options: IParseFunction) => void }

export abstract class Parse<T> {
  protected fields: IFieldParse
  private model: any

  constructor(protected source: T, protected metadata: IFieldParse) {
    this.model = source
    this.findAndSetFields()
  }

  private findAndSetFields() {
    const fieldTypes = Object.keys(this.getFieldTypes()) as Array<FieldType>
    this.fields = Object.keys({ ...this.metadata }).reduce<IFieldParse>(
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

  marshal(obj: any): object {
    Object.keys(this.fields).forEach(key => {
      const options = { ...this.fields[key] }
      if (options.transformer) {
        obj[options.name!] = options.transformer.to!({
          key: options.name!,
          options,
          data: this.model
        })
        return
      }

      const value: any = this.model[key]
      if (!value || options.isVirtual) return

      const fieldFunc = this.getFieldTypes()[options.type!]
      if (!fieldFunc) return
      fieldFunc({
        value,
        options,
        key: options.name!,
        data: this.model,
        destination: obj,
        toJSON: true
      })
    })

    return obj
  }

  parse(data: object): T {
    Object.keys(this.fields).forEach(key => {
      const options = { ...this.fields[key] }
      if (options.transformer) {
        this.model[key] = options.transformer.from!({ key, options, data })
        return
      }

      const value: any = (data as any)[options.name!] || options.default
      if (!value && options.type !== 'unique') return

      const fieldFunc = this.getFieldTypes()[options.type!]
      if (!fieldFunc) return
      fieldFunc({ key, value, options, data, destination: this.model })
    })
    return this.model
  }

  // protected abstract parseKey(key: string, option: IFieldOptions, data: object): void
  protected abstract getFieldTypes(): ParseFunction
}
