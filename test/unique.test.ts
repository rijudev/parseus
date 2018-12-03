import Parseus, { Field } from '../src/parseus'

class Person {
  @Field({ type: 'unique' })
  key?: string

  @Field({ type: 'unique' })
  key2?: string
}

const data = { key2: 23 }

describe(`Parseus[type=unique]`, () => {
  const result = Parseus.from(data).to(Person)
  test('should generate an id', () => {
    expect(typeof result.key).toBe('string')
  })

  test('should not generate an id there is a value already', () => {
    expect(result.key2).toBe(23)
  })
})
