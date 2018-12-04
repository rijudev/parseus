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

export type ParseFunction = { [type in FieldType]?: (options: IParseFunction) => any }

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

  private setModel(name: string, value: any) {
    this.model[name] = value
  }

  marshal(obj: any): object {
    const setObj = (name: string, value: any) => (obj[name] = value)

    Object.keys(this.fields).forEach(key => {
      const options = { ...this.fields[key] }
      if (options.transformer) {
        const value = options.transformer.to!({
          key: options.name!,
          options,
          data: this.model
        })
        setObj(options.name!, value)
        return
      }

      const value: any = this.model[key]
      if (!value || options.isVirtual) return

      const fieldFunc = this.getFieldTypes()[options.type!]
      if (!fieldFunc) return
      const returnValue = fieldFunc({
        value,
        options,
        key: options.name!,
        data: this.model,
        destination: obj,
        toJSON: true
      })
      setObj(options.name!, returnValue)
    })

    return obj
  }

  parse(data: object): T {
    Object.keys(this.fields).forEach(key => {
      const options = { ...this.fields[key] }
      if (options.transformer) {
        const value = options.transformer.from!({ key, options, data })
        this.setModel(key, value)
        return
      }

      const value: any = (data as any)[options.name!] || options.default
      if (!value && options.type !== 'unique') return

      const fieldFunc = this.getFieldTypes()[options.type!]
      if (!fieldFunc) return

      const returnValue = fieldFunc({ key, value, options, data, destination: this.model })
      this.setModel(key, returnValue)
    })
    return this.model
  }

  // protected abstract parseKey(key: string, option: IFieldOptions, data: object): void
  protected abstract getFieldTypes(): ParseFunction
}
