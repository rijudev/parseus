import Parseus, { Field } from '../src'

class SubPerson {
  @Field({ type: 'string' })
  name?: string

  @Field({ type: 'number' })
  age?: number
}

class Person {
  @Field({ type: 'object' })
  person: SubPerson

  @Field({ type: 'object', default: { name: 'julian' }, factory: SubPerson })
  person2: { name: string; age: number }

  @Field({ type: 'object', factory: SubPerson, readOnly: true })
  person3?: { name: string; age: number }
}

const data: any = {
  person: { name: 22, age: '3' },
  person2: undefined,
  person3: { name: 22, age: '3' }
}

describe(`Parseus[type=object]`, () => {
  const result = Parseus.decode(data).to(Person)
  test(`should convert object's properties`, () => {
    expect(typeof result.person).toBe('object')
    expect(result.person.name).toBe('22')
    expect(result.person.age).toBe(3)
  })

  describe(`defaultValue`, () => {
    test('should set default value', () => {
      expect(result.person2.name).toBe('julian')
    })
  })

  describe(`readOnly`, () => {
    test(`should convert to object's properties and not allow mutation`, () => {
      result.person3 = undefined
      expect(typeof result.person3).toBe('object')
      expect(result.person3!.name).toBe('22')
      expect(result.person3!.age).toBe(3)
    })
  })
})
