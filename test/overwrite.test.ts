import Parseus, { Field } from '../src'

class Person {
  @Field({ fixed: 4 })
  age?: number

  @Field({ type: 'string' })
  age2?: string
}

const data = {
  age: '26.12345',
  age2: '26.12344',
  age3: '264.12345'
}

const newParseus = Parseus.parseOverrride({ number: () => 2, string: () => 'hello' }, Person)

describe(`Parseus[New Parseus Instance]`, () => {
  const result = newParseus.decode(data)
  test('should convert all number fields in 2', () => {
    expect(result.age).toBe(2)
  })

  test('should convert all string fields in "hello"', () => {
    expect(result.age2).toBe('hello')
  })
})
