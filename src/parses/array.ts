import { Parse, ParseFunction, IParseFunction } from './parse'
import { IFieldParse } from '../utils'
import Parseus from '../parseus'

export class ArrayParse<T> extends Parse<T> {
  constructor(model: T, metadata: IFieldParse) {
    super(model, metadata)
  }

  protected getFieldTypes(): ParseFunction {
    return {
      array: this.parseArray
    }
  }

  private parseArray({ key, value, options, destination, toJSON }: IParseFunction) {
    if (!Array.isArray(value)) return
    const newModel = value.reduce((acc: any[], item: any) => {
      const newValue = toJSON ? Parseus.toJSON(item) : Parseus.from(item).to(options.factory!)
      acc.push(newValue)
      return acc
    }, [])

    destination[key] = newModel
  }
}
