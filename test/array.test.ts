import Parseus, { Field } from '../src/parseus'

class SubPerson {
  @Field({ type: 'string' })
  name?: string

  @Field({ type: 'number' })
  age?: number
}

class Person {
  @Field({ factory: SubPerson })
  people?: SubPerson[]

  @Field({
    type: 'array',
    default: [{ name: 'julian' }],
    factory: SubPerson
  })
  person2?: SubPerson[]

  @Field({ type: 'array', factory: SubPerson, readOnly: true })
  person3?: { name: string; age: number }[]
}

const data: any = {
  people: [{ name: 22, age: '3' }],
  person2: undefined,
  person3: [{ name: 22, age: '3' }]
}

describe(`Parseus[type=array]`, () => {
  const result = Parseus.decode(data).to(Person)
  test(`should convert array's properties`, () => {
    expect(Array.isArray(result.people)).toBeTruthy()
    expect(result.people![0].name).toBe('22')
    expect(result.people![0].age).toBe(3)
  })

  describe(`defaultValue`, () => {
    test('should set default value', () => {
      expect(result.person2![0].name).toBe('julian')
    })
  })

  describe(`readOnly`, () => {
    test(`should convert to array's properties and not allow mutation`, () => {
      result.person3 = undefined
      expect(Array.isArray(result.person3)).toBeTruthy()
      expect(result.person3![0].name).toBe('22')
      expect(result.person3![0].age).toBe(3)
    })
  })
})
