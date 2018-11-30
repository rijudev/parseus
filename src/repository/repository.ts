export interface IParameterlessConstructor<T> {
  new (): T
}

export class Parseus {
  static fromJSON(json: object) {
    return new ParseusJSON(json)
  }
}

class ParseusJSON {
  constructor(private json: object) {}

  to<T>(model: IParameterlessConstructor<T>): T {
    const obj = new model()
    // console.log(Reflect.getMetadata('design:parseus-field', obj))
    return obj
  }
}
