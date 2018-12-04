import Parseus, { Field } from '../src/parseus'

class Person {
  @Field({ precision: 4 })
  age?: number

  @Field()
  age2?: number
}

const data = {
  age: '26.12345',
  age2: '26.12344',
  age3: '264.12345'
}

const newParseus = Parseus.parseOverrride({ number: () => 2 }, Person)

// const Wrapper = Model => Parseus.parseOverrride({}, Model)
// const Wrapper = Model => new Parseus(Model)

describe(`Parseus[type=decimal]`, () => {
  const result = newParseus.from(data)
  test('should convert string number to decimal fixed 4', () => {
    expect(result.age).toBe(2)
  })

  test('should convert string number to decimal fixed default 5', () => {
    expect(result.age2).toBe(2)
  })
})
