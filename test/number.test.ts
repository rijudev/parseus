import Parseus, { Field } from '../src'

class Person {
  @Field()
  age?: number

  @Field({ readOnly: true })
  sibilings?: number

  @Field({ default: 23 })
  default?: number
}

const data = {
  age: '26',
  sibilings: '22',
  default: undefined
}

describe(`Parseus[type=number]`, () => {
  test('should convert string number to number', () => {
    const result = Parseus.decode(data).to(Person)
    expect(typeof result.age).toBe('number')
    expect(result.age).toBe(26)
  })

  describe(`defaultValue`, () => {
    const result = Parseus.decode(data).to(Person)
    test('should set default value', () => {
      expect(result.default).toBe(23)
    })
  })

  describe(`readOnly`, () => {
    test('should convert to number and not allow mutation', () => {
      const result = Parseus.decode(data).to(Person)
      expect(typeof result.sibilings).toBe('number')
      result.sibilings = 29
      expect(result.sibilings).toBe(22)
    })

    test('should allow mutation in not readOnly fields', () => {
      const result = Parseus.decode(data).to(Person)
      result.age = 2
      expect(result.age).toBe(2)
    })
  })
})
