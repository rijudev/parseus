import Parseus, { Field } from '../src/parseus'

class Person {
  @Field({ isVirtual: true, name: 'age_1' })
  age1?: number

  @Field({ name: 'age2', isVirtual: true })
  age4?: number

  @Field()
  age5?: number
}

const data = {
  age_1: '26',
  age2: '27',
  age5: '27'
}

describe(`Parseus[type=number, isVirtual=true]`, () => {
  const result = Parseus.decode(data).to(Person)
  const result2 = Parseus.encode({ ...result }, Person)

  test('should keep virtual field for to operations and remove in from', () => {
    expect(result.age1).toBe(26)
    expect(result2.age_1).toBe(undefined)
  })

  test('from: remove virtualkey and to:: use custom name', () => {
    expect(result.age4).toBe(27)
    expect(result2.age4).toBe(undefined)
    expect(result2.age2).toBe(undefined)
  })
})
