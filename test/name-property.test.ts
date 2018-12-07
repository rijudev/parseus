import Parseus, { Field } from '../src/parseus'

class Obj {
  @Field({ name: 'incoming' })
  local?: number
}

class Obj2 {
  @Field()
  local2?: number
}
class Person {
  @Field({ name: 'age2' })
  age?: number

  @Field({
    factory: Obj,
    type: 'object'
  })
  deep: Obj

  @Field({ factory: Obj2 })
  deepArr?: Obj2[]
}

const data: any = {
  age2: '26',
  deep: { incoming: '33' },
  deepArr: [{ local2: '44' }]
}

describe(`Parseus[type=number, name=age]`, () => {
  const result = Parseus.decode(data).to(Person)

  test('should convert string number to number and read from age2 property as age', () => {
    expect(typeof result.age).toBe('number')
    expect(result.age).toBe(26)
  })

  test('From:: should convert string number to number and read from age2 and use age2 as property', () => {
    expect(typeof result.age).toBe('number')
    expect(result.age).toBe(26)
  })

  test('From:: should convert deep object prop name', () => {
    expect(result.deep.local).toBe(33)
  })

  test('deepArr', () => {
    expect(result.deepArr![0].local2).toBe(44)
  })
})
