import Parseus, { Field } from '../src'

class Person {
  @Field({ type: 'string' })
  age?: string

  @Field({ readOnly: true })
  sibilings?: string

  @Field({ default: '23' })
  default?: string
}

const data = {
  age: 26,
  sibilings: 22,
  default: undefined
}

describe(`Parseus[type=string]`, () => {
  test('should convert number to string', () => {
    const result = Parseus.decode(data).to(Person)
    expect(typeof result.age).toBe('string')
    expect(result.age).toBe('26')
  })

  describe(`defaultValue`, () => {
    const result = Parseus.decode(data).to(Person)
    test('should set default value', () => {
      expect(result.default).toBe('23')
    })
  })

  describe(`readOnly`, () => {
    const result = Parseus.decode(data).to(Person)
    test('should convert to string and not allow mutation', () => {
      expect(typeof result.sibilings).toBe('string')
      result.sibilings = '25'
      expect(typeof result.sibilings).toBe('string')
      expect(result.sibilings).toBe('22')
    })

    test('shouldte allow mutation in not readOnly fields', () => {
      result.age = '5'
      expect(result.age).toBe('5')
    })
  })
})
