import { Parse, ParseFunction, IParseFunction } from './parse'
import { IFieldParse } from '../utils'
import Parseus from '../parseus'
import { Field } from '../decorators/fields/field'
import { FieldType } from '../decorators/options/field-options'

export class ArrayParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse) {
    super(model, metadata)
    this.parseArray = this.parseArray.bind(this)
  }

  protected getFieldTypes(): ParseFunction {
    return {
      array: this.parseArray
    }
  }

  private parseSimpleArray(acc: any[], item: any) {
    return function({ key, value, options, destination, toJSON }: IParseFunction) {
      class InnerClasss {
        @Field({
          type: typeof (options.factory as Function)() as FieldType,
          factory: options.factory!
        })
        value: any
      }
      const newValue = Parseus.from({ value: item }).to(InnerClasss)
      acc.push(newValue.value)
      return acc
    }
  }

  private parseArray(opts: IParseFunction) {
    const { key, value, options, destination, toJSON } = opts
    if (!Array.isArray(value)) return []
    const newModel = value.reduce((acc: any[], item: any) => {
      if (typeof item !== 'object') {
        return this.parseSimpleArray(acc, item)(opts)
      }

      const newValue = toJSON
        ? Parseus.toJSON(item, options.factory)
        : Parseus.from(item).to(options.factory!)
      acc.push(newValue)
      return acc
    }, [])

    return newModel
  }
}
