import Parseus, { Field } from '../src/parseus'

class Person {
  @Field({ type: 'decimal', precision: 4 })
  age?: number

  @Field({ type: 'decimal' })
  age2?: number
}

const data = {
  age: '26.12345',
  age2: '26.12344',
  age3: '264.12345'
}

describe(`Parseus[type=decimal]`, () => {
  const result = Parseus.from(data).to(Person)
  test('should convert string number to decimal fixed 4', () => {
    expect(result.age).toBe(26.1234)
  })

  test('should convert string number to decimal fixed default 5', () => {
    expect(result.age2).toBe(26.12344)
  })
})
