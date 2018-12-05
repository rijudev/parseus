import { IFieldParse, ParseFunction } from '../utils'
import { FieldType } from '../decorators/options/field-options'
import { cloneObject } from '../helpers/object'

export abstract class Parse<T> {
  protected fields: IFieldParse
  private model: any

  constructor(
    protected source: T,
    protected metadata: IFieldParse,
    protected parser?: ParseFunction
  ) {
    this.model = source
    this.findAndSetFields()

    this.getFieldTypes = this.getFieldTypes.bind(this)
    this.parse = this.parse.bind(this)
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

  marshall(obj: any): object {
    const setObj = (name: string, value: any) => (obj[name] = value)

    Object.keys(this.fields).forEach(key => {
      const options = { ...this.fields[key] }
      if (options.transformer) {
        const value = options.transformer.to!({
          key: options.name!,
          options: cloneObject(options),
          data: cloneObject(this.model)
        })
        setObj(options.name!, value)
        return
      }

      const value: any = this.model[key]
      if (!value || options.isVirtual) return

      const fieldTypes = {
        ...this.getFieldTypes(),
        ...this.parser
      }

      const fieldFunc = fieldTypes[options.type!]
      if (!fieldFunc) return
      const returnValue = fieldFunc({
        value,
        key: options.name!,
        options: cloneObject(options),
        data: cloneObject(this.model),
        destination: obj,
        isEncoding: true
      })
      setObj(options.name!, returnValue)
    })

    return obj
  }

  parse(data: object): T {
    Object.keys(this.fields).forEach(key => {
      const options = { ...this.fields[key] }
      if (options.transformer) {
        const value = options.transformer.from!({
          key,
          options: cloneObject(options),
          data: cloneObject(data)
        })
        this.setModel(key, value)
        return
      }

      const value: any = (data as any)[options.name!] || options.default
      if (!value && options.type !== 'unique') return

      const fieldTypes = {
        ...this.getFieldTypes(),
        ...this.parser
      }

      const fieldFunc = fieldTypes[options.type!]
      if (!fieldFunc) return

      const returnValue = fieldFunc({
        key,
        value,
        options: cloneObject(options),
        data: cloneObject(data),
        destination: cloneObject(this.model)
      })
      this.setModel(key, returnValue)
    })
    return this.model
  }

  protected abstract getFieldTypes(): ParseFunction
}
